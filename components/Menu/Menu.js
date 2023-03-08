import Component from '../Component/index'
import { extend, isFunction } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import MenuItem from './MenuItem'
import MenuItemWrapper from './MenuItemWrapper'

class Menu extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Menu.defaults, props), ...mixins)
  }

  _created() {
    this.itemRefs = []
    this.selectedItem = null
    this.selectedItemKey = null
    this.expandedRoot = null
  }

  _config() {
    this._addPropStyle('direction')

    if (this.props.direction !== 'vertical') {
      this.setProps({
        compact: false,
      })
    }

    const that = this
    const children = this.props.items.map(function (item) {
      if (!item) {
        return
      }
      if (
        (item.type && item.type.toLowerCase() === 'divider') ||
        (item.component && item.component === 'Divider')
      ) {
        return {
          tag: 'li',
          classes: {
            'nom-menu-divider': true,
          },
        }
      }
      return {
        component: MenuItemWrapper,
        animate: that.props.animate,
        item: Component.extendProps({}, that.props.itemDefaults, item),
      }
    })

    this.setProps({
      classes: {
        'nom-menu-compact': this.props.compact,
      },
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
      return this.itemRefs[param] || null
    }

    return retItem
  }

  selectItem(param, selectOption) {
    const item = this.getItem(param)
    if (item === null || item === undefined) {
      return false
    }
    item.select(selectOption)
    selectOption && selectOption.scrollIntoView && this.scrollTo(item)
    return item
  }

  selectToItem(param) {
    if (this.props.compact) {
      const target = this.getRootItem(param)
      if (target === null) {
        console.warn(`Could not find the item with specific key.`)
        return
      }
      this.getItem(target).partSelect()

      this.scrollTo(target)
      this.expandedRoot = this.getItem(target).wrapper
      this.selectedItemKey = param
    } else {
      this.expandToItem(param)
      this.selectItem(param)
      this.scrollTo(param)
    }
  }

  getRootItem(param) {
    const arr = this.props.items.filter((n) => {
      return JSON.stringify(n).includes(`"${param}"`)
    })

    if (arr.length) {
      const rootItem = arr[0][this.props.keyField]
      return this.itemRefs[rootItem]
    }
    return null
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
    if (item === null) {
      return false
    }
    return item.unselect(unselectOption)
  }

  getSelectedItem() {
    return this.selectedItem
  }

  expandToItem(param) {
    const item = this.getItem(param)
    if (item !== null) {
      let p = item.parentItem
      while (p) {
        p.expand()
        p = p.parentItem
      }
    }
  }

  scrollTo(
    param,
    scrollToOptions = {
      behavior: 'smooth',
      scrollMode: 'if-needed',
    },
  ) {
    const item = this.getItem(param)
    if (item && item.wrapper) {
      scrollIntoView(item.wrapper.element, scrollToOptions)
    }
  }

  scrollToSelected() {
    if (this.selectedItem) {
      this.scrollTo(this.selectedItem)
    }
  }

  _rendered() {
    super._rendered()
    this.scrollToSelected()
  }
}
Menu.defaults = {
  tag: 'ul',
  items: [],
  itemDefaults: {
    component: MenuItem,
  },
  itemSelectable: {
    onlyleaf: false,
    byClick: false,
  },
  itemExpandable: {
    expandSingle: true,
    initExpandLevel: 0,
  },
  compact: false,
  indent: 1.5,
  direction: 'vertical',
  keyField: 'key',
}
Component.register(Menu)

export default Menu
