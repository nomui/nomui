import Component, { n } from '../Component/index'
import { extend, hyphenate, isFunction, isPlainObject } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import Sortable from '../util/sortable.core.esm'
import DataListItemMixin from './DataListItemMixin'

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

class DataList extends Component {
  constructor(props, ...mixins) {
    props = props || {}
    const defaults = {
      virtualSupport: {
        height: typeof props.virtual === 'number' ? props.virtual : 310,
        size: 30,
        bufferScale: 1,
      },
    }
    super(Component.extendProps(DataList.defaults, defaults, props), ...mixins)
  }

  _config() {
    this.selectedItem = null

    const { data, showEmpty, itemSelectable, dataKey, virtual } = this.props

    this._addPropStyle('gap', 'line', 'align', 'justify', 'wrap', 'vertical', 'fills', 'cols')

    let empty = null

    if (isPlainObject(showEmpty)) {
      empty = {
        component: 'Empty',
        ...showEmpty,
        ref: (c) => {
          this.emptyRef = c
        },
      }
    } else if (showEmpty === true) {
      empty = {
        component: 'Empty',
        ref: (c) => {
          this.emptyRef = c
        },
      }
    }

    let children = []

    if (Array.isArray(data) && data.length > 0) {
      if (itemSelectable.defaultSelectFirst) {
        this.props.selectedKeys = data[0][dataKey]
      }
      children = data.map((itemData) => {
        return this._getItemDescriptor(itemData)
      })
      if (children.length > 80 && (virtual === true || typeof virtual === 'number')) {
        if (!this.virtual || this.firstRender) {
          this.virCreated(children)
        } else {
          this.virUpdateListData(children)
          this.virtual.start = this.virGetStartIndex(this.element ? this.element.scrollTop : 0) || 0
          this.virtual.end = this.virtual.start + this.virVisibleCount()
        }
        this.virChildren()
        return
      }
      if (empty) {
        children.unshift({ ...empty, hidden: true })
      }
    } else if (this.props.showEmpty) {
      children = [empty]
    }

    this.virtual = null
    this.setProps({
      selectable: { byClick: false },
      classes: {
        'nom-virtual-list-container': false,
      },
      attrs: {
        style: '',
        onscroll: null,
      },
      children: children,
    })
  }

  selectItem(key, selectOption) {
    const found = this.findItem(key)
    if (found) {
      return found.select(selectOption)
    }

    const itemData = this._getItemData(key)
    if (!itemData) {
      return false
    }

    selectOption = extend(
      {
        triggerSelect: true,
        triggerSelectionChange: true,
      },
      selectOption,
    )
    const { itemSelectable } = this.props
    if (itemSelectable.multiple === true) {
      const selectedKeys = this._getSelectedKeys()
      if (selectedKeys.indexOf(key) !== -1) {
        return false
      }
      selectedKeys.push(key)
      this.props.selectedKeys = selectedKeys
      this._unselectedKeys = this._getUnselectedKeys().filter((unselectedKey) => unselectedKey !== key)
    } else {
      if (this.props.selectedKeys === key) {
        return false
      }
      const selectedItem = this.selectedItem || this.findItem(this.props.selectedKeys)
      if (selectedItem) {
        selectedItem.unselect({ triggerSelectionChange: false })
      }
      this.props.selectedKeys = key
      this.selectedItem = null
    }

    if (selectOption.triggerSelect === true) {
      this._onItemSelected(itemData, key)
    }
    if (selectOption.triggerSelectionChange === true) {
      this._onItemSelectionChange()
    }
    return true
  }

  selectItems(keys, selectOption) {
    selectOption = extend(
      {
        triggerSelect: true,
        triggerSelectionChange: true,
      },
      selectOption,
    )
    let itemSelectionChanged = false
    keys = Array.isArray(keys) ? keys : [keys]
    for (let i = 0; i < keys.length; i++) {
      itemSelectionChanged =
        this.selectItem(keys[i], {
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
    return this.selectItems(this.getItemKeys(), selectOption)
  }

  unselectItem(key, selectOption) {
    const found = this.findItem(key)
    if (found) {
      return found.unselect(selectOption)
    }

    const itemData = this._getItemData(key)
    if (!itemData) {
      return false
    }

    selectOption = extend(
      {
        triggerUnselect: true,
        triggerSelectionChange: true,
      },
      selectOption,
    )
    const { itemSelectable } = this.props
    let changed = false
    if (itemSelectable.multiple === true) {
      const selectedKeys = this._getSelectedKeys()
      const newSelectedKeys = selectedKeys.filter((selectedKey) => selectedKey !== key)
      changed = newSelectedKeys.length !== selectedKeys.length || this._isItemSelected(itemData)
      this.props.selectedKeys = newSelectedKeys
      const unselectedKeys = this._getUnselectedKeys()
      if (unselectedKeys.indexOf(key) === -1) {
        unselectedKeys.push(key)
      }
      this._unselectedKeys = unselectedKeys
    } else if (this.props.selectedKeys === key) {
      this.props.selectedKeys = null
      this.selectedItem = null
      changed = true
    }

    if (!changed) {
      return false
    }
    if (selectOption.triggerUnselect === true) {
      this._onItemUnselected(itemData, key)
    }
    if (selectOption.triggerSelectionChange === true) {
      this._onItemSelectionChange()
    }
    return true
  }

  getSelected() {
    const { data, dataKey, itemSelectable, selectedKeys } = this.props
    if (itemSelectable && itemSelectable.multiple === true) {
      if (Array.isArray(data)) {
        const keys = this._getSelectedKeys()
        return data.filter((itemData) => {
          return (
            keys.indexOf(itemData[dataKey]) !== -1 ||
            (this._getUnselectedKeys().indexOf(itemData[dataKey]) === -1 && this._isItemSelected(itemData))
          )
        })
      }

      const selectedData = []
      const children = this._getItemsContainerChildren()
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        if (item.props.selected) {
          selectedData.push(item.props._itemData)
        }
      }
      return selectedData
    }

    if (Array.isArray(data) && selectedKeys !== null && selectedKeys !== undefined) {
      return data.find((itemData) => itemData[dataKey] === selectedKeys) || null
    }

    if (this.selectedItem) {
      return this.selectedItem.props._itemData
    }

    return null
  }

  appendItem(itemData) {
    if (Array.isArray(this.props.data)) {
      this.props.data.push(itemData)
    }
    if (this.virtual) {
      this.update({ data: this.props.data })
    } else {
      this.appendChild(this._getItemDescriptor(itemData))
    }
    this._setEmptyVisible()
  }

  prependItem(itemData) {
    if (Array.isArray(this.props.data)) {
      this.props.data.unshift(itemData)
    }
    if (this.virtual) {
      this.update({ data: this.props.data })
    } else {
      this.prependChild(this._getItemDescriptor(itemData))
    }
    this._setEmptyVisible()
  }

  updateItem(key, newItemData) {
    const index = this._getItemIndex(key)
    if (index !== -1) {
      this.props.data.splice(index, 1, newItemData)
    }
    if (this.virtual) {
      this.update({ data: this.props.data })
      return
    }

    const item = this.findItem(key)
    if (item) {
      item.replace(this._getItemDescriptor(newItemData))
    }
  }

  removeItem(key) {
    const index = this._getItemIndex(key)
    if (index !== -1) {
      this.props.data.splice(index, 1)
    }
    if (this.virtual) {
      this.update({ data: this.props.data })
    } else {
      const item = this.findItem(key)
      if (item !== null) {
        item.remove()
      }
    }
    this._setEmptyVisible()
  }

  _setEmptyVisible() {
    if (!this.props.showEmpty || !this.emptyRef) {
      return
    }
    if (this.getItemDatas().length) {
      this.emptyRef.hide()
    } else {
      this.emptyRef.show()
    }
  }

  disableItem(key) {
    const disabledKeys = this._getDisabledKeys()
    if (disabledKeys.indexOf(key) === -1) {
      disabledKeys.push(key)
      this.props.disabledKeys = disabledKeys
    }

    const item = this.findItem(key)
    if (item !== null) {
      item.disable()
    }
  }

  enableItem(key) {
    const disabledKeys = this._getDisabledKeys().filter((disabledKey) => disabledKey !== key)
    this.props.disabledKeys = disabledKeys

    const item = this.findItem(key)
    if (item !== null) {
      item.enable()
    }
  }

  scrollTo(key) {
    let item = key instanceof Component ? key : this.findItem(key)

    if (!item && this.virtual) {
      const index = this._getItemIndex(key)
      if (index !== -1) {
        this.element.scrollTop = this.virtual.positions[index].top
        this.virtual.start = this.virGetStartIndex(this.element.scrollTop)
        this.virtual.end = this.virtual.start + this.virVisibleCount()
        this.virUpdated()
        item = this.findItem(key)
      }
    }

    if (item) {
      const { itemSelectable } = this.props
      const itemElement = item.element
      const scrollOptions =
        itemSelectable &&
          itemSelectable.scrollIntoView &&
          isPlainObject(itemSelectable.scrollIntoView)
          ? itemSelectable.scrollIntoView
          : {}

      setTimeout(() => {
        scrollIntoView(
          itemElement,
          Component.extendProps(
            {
              behavior: 'smooth',
              scrollMode: 'if-needed',
            },
            scrollOptions,
          ),
        )
      }, 200)
    }
  }

  findItem(key) {
    const children = this._getItemsContainerChildren()
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child.key === key) {
        return child
      }
    }
    return null
  }

  getItemKeys(usedom) {
    const { data, dataKey } = this.props
    if (usedom !== true && Array.isArray(data)) {
      return data.map((itemData) => itemData[dataKey])
    }

    const keys = []
    const children = this._getItemsContainerChildren()
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      if (item.componentType !== 'Empty') {
        keys.push(item.key)
      }
    }
    return keys
  }

  getItemDatas(usedom) {
    const { data } = this.props
    if (usedom !== true && Array.isArray(data)) {
      return data.slice()
    }

    const datas = []
    const children = this._getItemsContainerChildren()
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      if (item.componentType !== 'Empty') {
        datas.push(item.props._itemData)
      }
    }
    return datas
  }

  _getItemsContainerChildren() {
    if (this.virtual && this.virtual.itemsContentRef) {
      return this.virtual.itemsContentRef.getChildren()
    }
    return this.getChildren()
  }

  _getItemIndex(key) {
    const { data, dataKey } = this.props
    if (!Array.isArray(data)) {
      return -1
    }
    return data.findIndex((itemData) => itemData[dataKey] === key)
  }

  _getItemData(key) {
    const index = this._getItemIndex(key)
    return index === -1 ? null : this.props.data[index]
  }

  _getSelectedKeys() {
    const { selectedKeys } = this.props
    if (selectedKeys === null || selectedKeys === undefined) {
      return []
    }
    return Array.isArray(selectedKeys) ? selectedKeys.slice() : [selectedKeys]
  }

  _getDisabledKeys() {
    const { disabledKeys } = this.props
    if (disabledKeys === null || disabledKeys === undefined) {
      return []
    }
    return Array.isArray(disabledKeys) ? disabledKeys.slice() : [disabledKeys]
  }

  _getUnselectedKeys() {
    return Array.isArray(this._unselectedKeys) ? this._unselectedKeys.slice() : []
  }

  _isItemSelected(itemData) {
    const descriptor = this._getItemDescriptor(itemData)
    const itemProps = descriptor && descriptor.getProps ? descriptor.getProps() : descriptor
    return itemProps && itemProps.selected === true
  }

  _onItemSelectionChange() {
    this._callHandler(this.props.onItemSelectionChange)
  }

  _onItemSelected(itemData, key) {
    this._callHandler(this.props.onItemSelected, { itemData, key })
  }

  _onItemUnselected(itemData, key) {
    this._callHandler(this.props.onItemUnselected, { itemData, key })
  }

  _getItemDescriptor(itemData) {
    const { dataKey, itemRender } = this.props

    if (isObject(itemData)) {
      let itemProps = { key: itemData[dataKey], _itemData: itemData }
      if (isFunction(itemRender)) {
        itemProps = Component.extendProps(itemProps, itemRender({ itemData, list: this }))
      }
      return n(null, itemProps, null, [DataListItemMixin])
    }
  }

  /* 虚拟列表支持函数-start */

  virCreated(listData) {
    const { virtualSupport } = this.props
    this.virtual = {
      virtualTimer: null,
      start: 0,
      end: 0,
      positions: [],
      itemsRefs: [],
      listData,
      ListHeight: virtualSupport.height,
      estimatedSize: virtualSupport.size,
      bufferScale: virtualSupport.bufferScale,
      toolDivRef: null,
      itemsContentRef: null,
    }
    this.virInitPositions()
  }

  virUpdateListData(listData) {
    const { estimatedSize, positions } = this.virtual
    let top = 0
    this.virtual.listData = listData
    this.virtual.positions = listData.map((d, index) => {
      const height = positions[index] ? positions[index].height : estimatedSize
      const itemPosition = {
        index,
        height,
        top,
        bottom: top + height,
      }
      top = itemPosition.bottom
      return itemPosition
    })
  }

  virChildren() {
    const { positions, ListHeight } = this.virtual
    const toolDivHeight = positions[positions.length - 1].bottom
    this.setProps({
      selectable: { byClick: false },
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
            if (this.virtual) {
              this.virtual.toolDivRef = c
            }
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
        {
          ref: (c) => {
            if (this.virtual) {
              this.virtual.itemsContentRef = c
            }
          },
          _list: this,
          classes: this._getVirtualContentClasses(),
          attrs: {
            style: {
              transform: `translate3d(0,${this.virSetStartOffset()}px,0)`,
            },
          },
          children: this.virGetList(this.virVisibleData()),
        },
      ],
    })
  }

  _getVirtualContentClasses() {
    const classes = {
      'nom-data-list': true,
      'nom-virtual-list-content': true,
    }
      ;['gap', 'line', 'align', 'justify', 'wrap', 'vertical', 'fills', 'cols'].forEach((prop) => {
        const value = this.props[prop]
        if (value !== null && value !== undefined) {
          if (value === true) {
            classes[`p-${hyphenate(prop)}`] = true
          } else if (typeof value === 'string' || typeof value === 'number') {
            classes[`p-${hyphenate(prop)}-${hyphenate(String(value))}`] = true
          }
        }
      })
    return classes
  }

  virGetList(arry) {
    this.virtual.itemsRefs = []
    return arry.map((obj) => {
      const descriptor = obj.item
      const itemProps = descriptor.getProps ? descriptor.getProps() : descriptor
      const mixins = descriptor.mixins || []
      return n(
        null,
        Component.extendProps({}, itemProps, {
          ref: (c) => {
            if (c) this.virtual.itemsRefs.push(c)
          },
          classes: {
            ...itemProps.classes,
            'nom-virtual-list-item': true,
          },
          attrs: {
            ...itemProps.attrs,
            'data-key': obj._index,
          },
        }),
        null,
        mixins,
      )
    })
  }

  virUpdated() {
    if (!this.virtual.itemsRefs || !this.virtual.itemsRefs.length) {
      return
    }
    const { positions, toolDivRef, itemsContentRef } = this.virtual
    this.virUpdateItemsSize()
    const toolDivHeight = positions[positions.length - 1].bottom
    toolDivRef.element.style.height = `${toolDivHeight}px`

    itemsContentRef.update({
      attrs: {
        style: {
          transform: `translate3d(0,${this.virSetStartOffset()}px,0)`,
        },
      },
      children: this.virGetList(this.virVisibleData()),
    })
  }

  virInitPositions() {
    const { estimatedSize, listData } = this.virtual
    this.virtual.positions = listData.map((d, index) => ({
      index,
      height: estimatedSize,
      top: index * estimatedSize,
      bottom: (index + 1) * estimatedSize,
    }))
  }

  virGetStartIndex(scrollTop = 0) {
    return this.virBinarySearch(this.virtual.positions, scrollTop)
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

  virUpdateItemsSize() {
    const { itemsRefs, positions } = this.virtual
    const gapSize = this.virGetGapSize()
    itemsRefs.forEach((node) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      const index = +node.element.dataset.key.slice(1)
      const height = rect.height + (index < positions.length - 1 ? gapSize : 0)
      const oldHeight = positions[index].height
      const dValue = oldHeight - height
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

  virGetGapSize() {
    const { itemsContentRef } = this.virtual
    if (!itemsContentRef || !itemsContentRef.element || typeof window === 'undefined') {
      return 0
    }

    const style = window.getComputedStyle(itemsContentRef.element)
    const gap = parseFloat(style.rowGap || style.gap)
    return Number.isNaN(gap) ? 0 : gap
  }

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

  virScrollEvent() {
    const scrollTop = this.element.scrollTop
    this.virtual.virtualTimer && clearTimeout(this.virtual.virtualTimer)
    this.virtual.virtualTimer = setTimeout(() => {
      this.virtual.start = this.virGetStartIndex(scrollTop)
      this.virtual.end = this.virtual.start + this.virVisibleCount()
      this.virUpdated()
    }, 100)
  }

  virListData() {
    return this.virtual.listData.map((item, index) => {
      return {
        item,
        _index: `_${index}`,
      }
    })
  }

  virVisibleCount() {
    return Math.ceil(this.virtual.ListHeight / this.virtual.estimatedSize)
  }

  virAboveCount() {
    return Math.min(this.virtual.start, this.virtual.bufferScale * this.virVisibleCount())
  }

  virBelowCount() {
    return Math.min(
      this.virtual.listData.length - this.virtual.end,
      this.virtual.bufferScale * this.virVisibleCount(),
    )
  }

  virVisibleData() {
    const start = this.virtual.start - this.virAboveCount()
    const end = this.virtual.end + this.virBelowCount()
    return this.virListData().slice(start, end)
  }
  /* 虚拟列表支持函数-end */

  handleDrag(event) {
    if (this.props.sortable && this.props.sortable.onEnd) {
      this._callHandler(this.props.sortable.onEnd, { event: event })
    }
  }

  _rendered() {
    const that = this
    const { sortable, virtual } = this.props

    if (sortable && !virtual) {
      const options = {
        group: this.key,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        handle: sortable.handle,
        filter: '.s-disabled',
        onEnd: function (event) {
          that.handleDrag(event)
        },
      }

      new Sortable(this.element, options)
    }
  }
}

DataList.defaults = {
  tag: 'div',
  data: null,
  dataKey: 'id',

  selectedKeys: null,

  itemSelectable: {
    multiple: false,
    byClick: false,
    scrollIntoView: false,
    defaultSelectFirst: false,
    triggerOnInit: false,
  },

  disabledItemKeys: [],
  virtual: false,
  showEmpty: false,
  sortable: false,
}

Component.register(DataList)

export default DataList
