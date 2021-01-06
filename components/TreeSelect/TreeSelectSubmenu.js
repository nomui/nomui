import Component from '../Component/index'

class TreeSelectSubmenu extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    // this.wrapper = this.props.wrapper || this.parent
    // this.wrapper.submenu = this
    // this.menu = this.wrapper.menu
    // this.props.itemDefaults = this.menu.props.itemDefaults
  }

  _config() {
    const children =
      Array.isArray(this.props.items) &&
      this.props.items.map(function (item) {
        return {
          component: 'TreeSelectItem',
          title: item.title,
          value: item.value,
          key: item.key,
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

Component.register(TreeSelectSubmenu)

export default TreeSelectSubmenu
