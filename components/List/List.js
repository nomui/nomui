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

    this.setProps({
      children: children,
    })
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
}

Component.register(List)

export default List
