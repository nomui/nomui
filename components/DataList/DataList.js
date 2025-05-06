import Component, { n } from '../Component/index'
import { extend, isFunction, isPlainObject } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import Sortable from '../util/sortable.core.esm'
import DataListItemMixin from './DataListItemMixin'

function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

class DataList extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(DataList.defaults, props), ...mixins)
  }

  _config() {
    this.selectedItem = null

    const { data, showEmpty, itemSelectable, dataKey } = this.props

    this._addPropStyle('gap', 'line', 'align', 'justify', 'wrap', 'vertical', 'fills', 'cols')

    let empty = null

    if (isPlainObject(showEmpty)) {
      empty = {
        component: 'Empty',
        ...showEmpty,
      }
    } else if (showEmpty === true) {
      empty = {
        component: 'Empty',
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
    } else {
      children = empty
    }

    this.setProps({
      selectable: { byClick: false },
      children: children,
    })
  }

  selectItem(key, selectOption) {
    const found = this.findItem(key)
    if (found) {
      return found.select(selectOption)
    }
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
    return this.selectItems(this.getChildren(), selectOption)
  }

  unselectItem(key, selectOption) {
    const found = this.findItem(key)
    if (found) {
      found.unselect(selectOption)
    }
  }

  getSelected() {
    const { itemSelectable } = this.props
    if (itemSelectable && itemSelectable.multiple === true) {
      const selectedData = []
      const children = this.getChildren()
      for (let i = 0; i < children.length; i++) {
        const item = children[i]
        if (item.props.selected) {
          selectedData.push(item.props._itemData)
        }
      }
      return selectedData
    }

    if (this.selectedItem) {
      return this.selectedItem.props._itemData
    }

    return null
  }

  appendItem(itemData) {
    this.appendChild(this._getItemDescriptor(itemData))
  }

  prependItem(itemData) {
    this.prependChild(this._getItemDescriptor(itemData))
  }

  updateItem(key, newItemData) {
    const item = this.findItem(key)
    if (item) {
      item.replace(this._getItemDescriptor(newItemData))
    }
  }

  removeItem(key) {
    const item = this.findItem(key)
    if (item !== null) {
      item.remove()
    }
  }

  disableItem(key) {
    const item = this.findItem(key)
    if (item !== null) {
      item.disable()
    }
  }

  enableItem(key) {
    const item = this.findItem(key)
    if (item !== null) {
      item.enable()
    }
  }

  scrollTo(key) {
    const item = this.findItem(key)

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
    return this.findChild(key)
  }

  getItemKeys() {
    const keys = []
    const children = this.getChildren()
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      if (item.componentType !== 'Empty') {
        keys.push(item.key)
      }
    }
    return keys
  }

  getItemDatas() {
    const datas = []
    const children = this.getChildren()
    for (let i = 0; i < children.length; i++) {
      const item = children[i]
      if (item.componentType !== 'Empty') {
        datas.push(item.props._itemData)
      }
    }
    return datas
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

  handleDrag(event) {
    if (this.props.sortable && this.props.sortable.onEnd) {
      this._callHandler(this.props.sortable.onEnd, { event: event })
    }
  }

  _rendered() {
    const that = this
    const { sortable } = this.props

    if (sortable) {
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
  showEmpty: false,
  sortable: false,
}

Component.register(DataList)

export default DataList
