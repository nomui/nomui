import Component from '../Component/index'

class MenuSub extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
      itemDefaults: {
        component: 'menu-item',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.wrapper = this.props.wrapper || this.parent
    this.wrapper.submenu = this
    this.menu = this.wrapper.menu
    this.props.itemDefaults = this.menu.props.itemDefaults
  }

  _config() {
    const that = this

    const children =
      Array.isArray(this.props.items) &&
      this.props.items.map(function (item) {
        return {
          component: 'MenuItemWrapper',
          item: Component.extendProps({}, that.props.itemDefaults, item),
          items: item.items,
        }
      })

    const typeClass = `nom-menu-${this.menu.props.type}`
    const classes = {}
    classes[typeClass] = true
    this.setProps({
      classes: classes,
      children: children,
    })
  }
}

Component.register(MenuSub)

export default MenuSub
