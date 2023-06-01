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
    if (this.props.isPopup) {
      this.parent.popMenu = this
    }
  }

  _config() {
    const that = this

    const children =
      Array.isArray(this.props.items) &&
      this.props.items.map(function (item) {
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
              'nom-menu-divider-dashed': item.dashed === true,
            },
          }
        }

        return {
          component: 'MenuItemWrapper',
          animate: that.menu.props.animate,
          item: Component.extendProps({}, that.props.itemDefaults, item),
          isGroupItem: that.wrapper && that.wrapper.item.props.type === 'group',
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
