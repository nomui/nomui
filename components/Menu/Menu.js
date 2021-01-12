import Component from '../Component/index'
import { extend, isFunction } from '../util/index'
import MenuItem from './MenuItem'
import MenuItemWrapper from './MenuItemWrapper'

class Menu extends Component {
  constructor(props, ...mixins) {
    const defaults = {
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
        initExpandLevel: -1,
      },

      indent: 1.5,
      direction: 'vertical'
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.itemRefs = []
    this.selectedItem = null
  }

  _config() {
    this._addPropStyle('direction')
    const that = this
    const children = this.props.items.map(function (item) {
      return {
        component: MenuItemWrapper,
        item: Component.extendProps({}, that.props.itemDefaults, item),
      }
    })

    this.setProps({
      children: children,
    })
  }

  getItem(param) {
    let retItem = null

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
    return item.select(selectOption)
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
}

Component.register(Menu)

export default Menu
