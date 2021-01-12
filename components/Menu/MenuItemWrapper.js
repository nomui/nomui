import Component from '../Component/index'
import MenuItem from './MenuItem'
import MenuSub from './MenuSub'

class MenuItemWrapper extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      item: {
        component: MenuItem,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.isLeaf = false
    this.level = 0
    this.parentWrapper = null

    if (this.parent instanceof Component.components.Menu) {
      this.menu = this.parent
    } else if (this.parent instanceof Component.components.MenuSub) {
      this.menu = this.parent.menu
      this.parentWrapper = this.parent.wrapper
    }

    if (this.parentWrapper) {
      this.level = this.parentWrapper.level + 1
    }

    this.isLeaf = !Array.isArray(this.props.item.items) || this.props.item.items.length < 1
  }

  _config() {
    const that = this
    const { menu } = this
    const menuProps = menu.props
    const expanded =
      menuProps.direction === 'horizontal' || menuProps.itemExpandable.initExpandLevel >= this.level

    this.setProps({
      submenu: menuProps.submenu,
    })

    this.setProps({
      submenu: {
        component: MenuSub,
        name: 'submenu',
        items: this.props.item.items,
        hidden: !expanded,
      },
    })

    if (menuProps.direction === 'horizontal' && !this.isLeaf) {
      let reference = document.body
      if (this.level > 0) {
        reference = this
      }
      let align = 'bottom left'
      if (this.level > 0) {
        align = 'right top'
      }

      this.setProps({
        submenu: {
          wrapper: that,
        },
      })

      this.setProps({
        item: {
          popup: {
            triggerAction: 'hover',
            align: align,
            reference: reference,
            children: this.props.submenu,
          },
        },
      })
    }

    this.setProps({
      children: [
        this.props.item,
        !this.isLeaf && menuProps.direction === 'vertical' && this.props.submenu,
      ],
    })
  }
}

Component.register(MenuItemWrapper)

export default MenuItemWrapper
