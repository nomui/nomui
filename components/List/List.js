import Component from '../Component/index'
import { extend, isFunction, isPlainObject } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import ListContent from './ListContent'

class List extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      items: [],
      itemDefaults: {},

      selectedItems: null,

      itemSelectable: {
        multiple: false,
        byClick: false,
        scrollIntoView: true,
      },
      virtual: false,
      virtualSupport: {
        height: typeof props.virtual === 'number' ? props.virtual : 400, // 容器高度
        size: 30, // 每个列表项高度预估值
        bufferScale: 1, // 缓冲区比例
      },
      showEmpty: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { virtual } = this.props
    if (this.firstRender && (virtual === true || typeof virtual === 'number')) {
      this.virCreated()
    }
    this.itemRefs = {}
    this.selectedItem = null

    this._addPropStyle('gutter', 'line', 'align', 'justify', 'cols')

    let empty = null

    if (isPlainObject(this.props.showEmpty)) {
      empty = {
        component: 'Empty',
        ...this.props.showEmpty,
      }
    } else {
      empty = {
        component: 'Empty',
      }
    }

    const children =
      !this.props.items.length && this.props.showEmpty ? empty : { component: ListContent }
    if (virtual === true || typeof virtual === 'number') {
      this.virChildren(children)
    } else {
      this.setProps({
        children: children,
      })
    }
  }

  getItem(param) {
    let retItem = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.itemRefs) {
        if (this.itemRefs.hasOwnProperty(key)) {
          if (param.call(this.itemRefs[key]) === true) {
            retItem = this.itemRefs[key]
            break
          }
        }
      }
    } else {
      return this.itemRefs[param]
    }

    return retItem
  }

  selectItem(param, selectOption) {
    const item = this.getItem(param)
    item && item.select(selectOption)
    if (this.props.itemSelectable.scrollIntoView) {
      this.scrollTo(item)
    }
  }

  selectItems(param, selectOption) {
    selectOption = extend(
      {
        triggerSelect: true,
        triggerSelectionChange: true,
      },
      selectOption,
    )
    let itemSelectionChanged = false
    param = Array.isArray(param) ? param : [param]
    for (let i = 0; i < param.length; i++) {
      itemSelectionChanged =
        this.selectItem(param[i], {
          triggerSelect: selectOption.triggerSelect,
          triggerSelectionChange: false,
        }) || itemSelectionChanged
    }
    if (selectOption.triggerSelectionChange === true && itemSelectionChanged) {
      this._onItemSelectionChange()
    }
    return itemSelectionChanged
  }

  selectAllItems(selectOption) {
    return this.selectItems(this.content.getChildren(), selectOption)
  }

  unselectItem(param, unselectOption) {
    unselectOption = extend(
      {
        triggerUnselect: true,
        triggerSelectionChange: true,
      },
      unselectOption,
    )
    const item = this.getItem(param)
    item && item.unselect(unselectOption)
  }

  unselectItems(param, unselectOption) {
    unselectOption = extend(
      {
        triggerUnselect: true,
        triggerSelectionChange: true,
      },
      unselectOption,
    )
    let itemSelectionChanged = false
    if (Array.isArray(param)) {
      for (let i = 0; i < param.length; i++) {
        itemSelectionChanged =
          this.unselectItem(param[i], {
            triggerUnselect: unselectOption.triggerUnselect,
            triggerSelectionChange: false,
          }) || itemSelectionChanged
      }
    }
    if (unselectOption.triggerSelectionChange && itemSelectionChanged) {
      this._onItemSelectionChange()
    }
    return itemSelectionChanged
  }

  unselectAllItems(unselectOption) {
    return this.unselectItems(this.getAllItems(), unselectOption)
  }

  getAllItems() {
    const items = []
    const children = this.content.getChildren()
    for (let i = 0; i < children.length; i++) {
      const itemWrapper = children[i]
      items.push(itemWrapper.item)
    }
    return items
  }

  _onItemSelectionChange() {
    this._callHandler(this.props.onItemSelectionChange)
  }

  getSelectedItem() {
    return this.selectedItem
  }

  getSelectedItems() {
    const selectedItems = []
    const children = this.content.getChildren()
    for (let i = 0; i < children.length; i++) {
      const { item } = children[i]
      if (item.props.selected) {
        selectedItems.push(item)
      }
    }
    return selectedItems
  }

  appendItem(itemProps) {
    this.content.appendItem(itemProps)
  }

  removeItem(param) {
    const item = this.getItem(param)
    if (item !== null) {
      item.wrapper.remove()
    }
  }

  removeItems(param) {
    if (Array.isArray(param)) {
      for (let i = 0; i < param.length; i++) {
        this.removeItem(param[i])
      }
    }
  }

  scrollTo(param) {
    const item = this.getItem(param)
    if (item) {
      scrollIntoView(item.wrapper.element, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
      })
    }
  }

  scrollToSelected() {
    if (this.selectedItem) {
      this.scrollTo(this.selectedItem)
    }
  }

  /* 虚拟列表支持函数-start */

  virCreated() {
    const { items, virtualSupport } = this.props
    this.virtual = {
      start: 0,
      end: 0,
      positions: [
        // {
        //   top:0,
        //   bottom:100,
        //   height:100,
        // }
      ],
      itemsRefs: [], // 当前列表项arry
      listData: items, // 所有列表数据
      ListHeight: virtualSupport.height, // 可视区域高度
      estimatedSize: virtualSupport.size, // 预估高度
      bufferScale: virtualSupport.bufferScale, // 缓冲区比例
      toolDivRef: null,
    }
    this.virInitPositions()
  }

  virChildren(childObj) {
    const { positions, ListHeight } = this.virtual
    const toolDivHeight = positions[positions.length - 1].bottom
    this.setProps({
      classes: {
        'nom-virtual-list-container': true,
      },
      attrs: {
        style: {
          height: `${ListHeight}px`,
        },
        onscroll: () => {
          this.virScrollEvent()
        },
      },
      children: [
        {
          ref: (c) => {
            this.virtual.toolDivRef = c
          },
          classes: {
            'nom-virtual-list-tooldiv': true,
          },
          attrs: {
            style: {
              height: `${toolDivHeight}px`,
            },
          },
          children: '',
        },
        childObj,
      ],
    })
  }

  virGetList(arry) {
    this.virtual.itemsRefs = []
    const _that = this
    return arry.map(function (obj) {
      return Component.extendProps(obj, {
        ref: (c) => {
          if (c) _that.virtual.itemsRefs.push(c)
        },
        classes: {
          'nom-virtual-list-item': true,
        },
        attrs: {
          'data-key': obj._index,
        },
      })
    })
  }

  // 需要在 渲染完成后，获取列表每项的位置信息并缓存
  virUpdated() {
    if (!this.virtual.itemsRefs || !this.virtual.itemsRefs.length) {
      return
    }
    const { positions, toolDivRef } = this.virtual
    this.virUpdateItemsSize()
    const toolDivHeight = positions[positions.length - 1].bottom
    toolDivRef.element.style.height = `${toolDivHeight}px`

    this.content.update({
      attrs: {
        style: {
          transform: `translate3d(0,${this.virSetStartOffset()}px,0)`,
        },
      },
    })
  }

  // 初始化位置信息
  virInitPositions() {
    const { estimatedSize, listData } = this.virtual
    this.virtual.positions = listData.map((d, index) => ({
      index,
      height: estimatedSize,
      top: index * estimatedSize,
      bottom: (index + 1) * estimatedSize,
    }))
  }

  // 获取列表起始索引
  virGetStartIndex(scrollTop = 0) {
    return this.virBinarySearch(this.virtual.positions, scrollTop)
  }

  // 二分法
  virBinarySearch(list, value) {
    let start = 0
    let end = list.length - 1
    let tempIndex = null

    while (start <= end) {
      const midIndex = parseInt((start + end) / 2, 10)
      const midValue = list[midIndex].bottom
      if (midValue === value) {
        return midIndex + 1
      }
      if (midValue < value) {
        start = midIndex + 1
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex
        }
        end -= 1
      }
    }
    return tempIndex
  }

  // 获取列表项的当前尺寸
  virUpdateItemsSize() {
    const { itemsRefs, positions } = this.virtual
    itemsRefs.forEach((node) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      const height = rect.height
      const index = +node.element.dataset.key.slice(1)
      const oldHeight = positions[index].height
      const dValue = oldHeight - height
      // 存在差值
      if (dValue) {
        positions[index].bottom -= dValue
        positions[index].height = height
        for (let k = index + 1; k < positions.length; k++) {
          positions[k].top = positions[k - 1].bottom
          positions[k].bottom -= dValue
        }
      }
    })
  }

  // 设置当前的偏移量
  virSetStartOffset() {
    const { start, positions } = this.virtual
    let startOffset
    if (start >= 1 && positions[start]) {
      const size =
        positions[start].top -
        (positions[start - this.virAboveCount()] ? positions[start - this.virAboveCount()].top : 0)
      startOffset = positions[start - 1].bottom - size
    } else {
      startOffset = 0
    }
    return startOffset
  }

  // 滚动事件
  virScrollEvent() {
    // 当前滚动位置
    const scrollTop = this.element.scrollTop
    if (!this.virGetStartIndex(scrollTop)) return
    // 此时的开始索引
    this.virtual.start = this.virGetStartIndex(scrollTop)
    // 此时的结束索引
    this.virtual.end = this.virtual.start + this.virVisibleCount()
    // 更新列表
    this.virUpdated()
  }

  virListData() {
    return this.virtual.listData.map((obj, index) => {
      return {
        ...obj,
        _index: `_${index}`,
      }
    })
  }

  // 可显示的列表项数
  virVisibleCount() {
    return Math.ceil(this.virtual.ListHeight / this.virtual.estimatedSize)
  }

  // 可视区上方渲染条数
  virAboveCount() {
    return Math.min(this.virtual.start, this.virtual.bufferScale * this.virVisibleCount())
  }

  // 可视区下方渲染条数
  virBelowCount() {
    return Math.min(
      this.virtual.listData.length - this.virtual.end,
      this.virtual.bufferScale * this.virVisibleCount(),
    )
  }

  // 获取真实显示列表数据
  virVisibleData() {
    const start = this.virtual.start - this.virAboveCount()
    const end = this.virtual.end + this.virBelowCount()
    return this.virListData().slice(start, end)
  }
  /* 虚拟列表支持函数-end */
}

Component.register(List)

export default List
