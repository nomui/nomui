import Component from '../Component/index'
import { extend, isFunction } from '../util/index'
import ListItemWrapper from './ListItemWrapper'

class ListContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.list = this.parent
    this.list.content = this
    if (this.list.props.virtualOpen === true || typeof this.list.props.virtualOpen === 'number') {
      // console.log(this.list, '进入虚拟渲染了')
      const { items, virtualSupport } = this.list.props
      this.vir = {
        // 起始索引
        start: 0,
        // 结束索引
        end: 0,
        // 用于列表项渲染后存储 每一项的高度以及位置信息
        positions: [
          // {
          //   top:0,
          //   bottom:100,
          //   height:100
          // }
        ],
        // 当前列表项arry
        itemsRefs: [],
        // 所有列表数据
        listData: items,
        // 可视区域高度
        screenHeight: virtualSupport.height,
        // 预估高度
        estimatedItemSize: virtualSupport.size,
        // 缓冲区比例
        bufferScale: virtualSupport.bufferScale,
      }
      this.virInitPositions()
    }
  }

  _config() {
    this._addPropStyle('gutter', 'line', 'align', 'justify', 'cols')
    const { items, wrappers, wrapperDefaults, virtualOpen } = this.list.props
    const children = []

    if (Array.isArray(wrappers) && wrappers.length > 0) {
      for (let i = 0; i < wrappers.length; i++) {
        let wrapper = wrappers[i]
        wrapper = Component.extendProps(
          {},
          { component: ListItemWrapper },
          wrapperDefaults,
          wrapper,
        )
        children.push(wrapper)
      }
    } else if (Array.isArray(items) && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        children.push({ component: ListItemWrapper, item: items[i] })
      }
    }

    // 开启虚拟列表功能
    if (virtualOpen === true || typeof virtualOpen === 'number') {
      this.vir.listData = children
      this.vir.wrapperDefaults = wrapperDefaults
      this.virProps()
    } else {
      this.setProps({
        children: children,
        childDefaults: wrapperDefaults,
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
    return this.selectItems(this.getChildren(), selectOption)
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
    const children = this.getChildren()
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
    const children = this.getChildren()
    for (let i = 0; i < children.length; i++) {
      const { item } = children[i]
      if (item.props.selected) {
        selectedItems.push(item)
      }
    }
    return selectedItems
  }

  appendItem(itemProps) {
    itemProps = Component.extendProps({}, this.props.itemDefaults, itemProps)
    const itemWrapperProps = { component: ListItemWrapper, item: itemProps }
    this.appendChild(itemWrapperProps)
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

  /* 虚拟列表支持函数-start */
  virProps() {
    const listArry = this.virGetList(this.virVisibleData())
    const height = this.vir.positions[this.vir.positions.length - 1].bottom
    this.setProps({
      children: {
        ref: (c) => {
          this.virListRef = c
        },
        classes: {
          'nom-virtual-list-container': true,
        },
        attrs: {
          style: {
            height: `${this.vir.screenHeight}px`,
          },
          onscroll: () => {
            this.virScrollEvent()
          },
        },
        children: [
          {
            ref: (c) => {
              this.virPhantomRef = c
            },
            classes: {
              'nom-virtual-list-phantom': true,
            },
            attrs: {
              style: {
                height: `${height}px`,
              },
            },
            children: '',
          },
          {
            ref: (c) => {
              this.virContentRef = c
            },
            classes: {
              'nom-virtual-list-content': true,
            },
            children: listArry,
            childDefaults: this.vir.wrapperDefaults,
          },
        ],
      },
    })
  }

  virGetList(arry) {
    const _that = this
    this.vir.itemsRefs = []
    return arry.map(function (items) {
      return {
        ref: (c) => {
          if (c) _that.vir.itemsRefs.push(c)
        },
        classes: {
          'nom-virtual-list-item': true,
        },
        attrs: {
          'data-key': items._index,
        },
        children: items.item,
      }
    })
  }

  // 需要在 渲染完成后，获取列表每项的位置信息并缓存
  virUpdated() {
    if (!this.vir.itemsRefs || !this.vir.itemsRefs.length) {
      return
    }
    // 获取真实元素大小，修改对应的尺寸缓存
    this.virUpdateItemsSize()
    // 更新列表总高度
    const height = this.vir.positions[this.vir.positions.length - 1].bottom
    this.virPhantomRef.update({
      attrs: {
        style: {
          height: `${height}px`,
        },
      },
    })

    this.virContentRef.update({
      attrs: {
        style: {
          transform: `translate3d(0,${this.virSetStartOffset()}px,0)`,
        },
      },
      children: this.virGetList(this.virVisibleData()),
    })
  }

  // 初始时根据 estimatedItemSize对 positions进行初始化
  virInitPositions() {
    this.vir.positions = this.vir.listData.map((d, index) => ({
      index,
      height: this.vir.estimatedItemSize,
      top: index * this.vir.estimatedItemSize,
      bottom: (index + 1) * this.vir.estimatedItemSize,
    }))
  }

  // 获取列表起始索引
  virGetStartIndex(scrollTop = 0) {
    // 二分法查找
    return this.virBinarySearch(this.vir.positions, scrollTop)
  }

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
    const nodes = this.vir.itemsRefs
    nodes.forEach((node) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      const height = rect.height
      const index = +node.element.dataset.key.slice(1)
      const oldHeight = this.vir.positions[index].height
      const dValue = oldHeight - height
      // 存在差值
      if (dValue) {
        this.vir.positions[index].bottom -= dValue
        this.vir.positions[index].height = height
        for (let k = index + 1; k < this.vir.positions.length; k++) {
          this.vir.positions[k].top = this.vir.positions[k - 1].bottom
          this.vir.positions[k].bottom -= dValue
        }
      }
    })
  }

  // 设置当前的偏移量
  virSetStartOffset() {
    let startOffset
    if (this.vir.start >= 1) {
      const size =
        this.vir.positions[this.vir.start].top -
        (this.vir.positions[this.vir.start - this.virAboveCount()]
          ? this.vir.positions[this.vir.start - this.virAboveCount()].top
          : 0)
      startOffset = this.vir.positions[this.vir.start - 1].bottom - size
    } else {
      startOffset = 0
    }
    return startOffset
  }

  // 滚动事件
  virScrollEvent() {
    // 当前滚动位置
    const scrollTop = this.virListRef.element.scrollTop
    // 此时的开始索引
    this.vir.start = this.virGetStartIndex(scrollTop)
    // 此时的结束索引
    this.vir.end = this.vir.start + this.virVisibleCount()
    // 更新列表
    this.virUpdated()
  }

  virListData() {
    return this.vir.listData.map((item, index) => {
      return {
        _index: `_${index}`,
        item,
      }
    })
  }

  // 可显示的列表项数
  virVisibleCount() {
    return Math.ceil(this.vir.screenHeight / this.vir.estimatedItemSize)
  }

  // 可视区上方渲染条数
  virAboveCount() {
    return Math.min(this.vir.start, this.vir.bufferScale * this.virVisibleCount())
  }

  // 可视区下方渲染条数
  virBelowCount() {
    return Math.min(
      this.vir.listData.length - this.vir.end,
      this.vir.bufferScale * this.virVisibleCount(),
    )
  }

  // 获取真实显示列表数据
  virVisibleData() {
    const start = this.vir.start - this.virAboveCount()
    const end = this.vir.end + this.virBelowCount()
    return this.virListData().slice(start, end)
  }
  /* 虚拟列表支持函数-end */
}

Component.register(ListContent)

export default ListContent
