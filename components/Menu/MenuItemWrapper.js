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
      this.rootWrapper = this
    } else if (this.parent instanceof Component.components.MenuSub) {
      this.menu = this.parent.menu

      this.parentWrapper = this.parent.wrapper
      this.rootWrapper = this.parentWrapper.rootWrapper
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
      menuProps.direction === 'horizontal' ||
      menuProps.compact ||
      menuProps.itemExpandable.initExpandLevel === -1 ||
      menuProps.itemExpandable.initExpandLevel > this.level
    this.setProps({
      submenu: menuProps.submenu,
    })

    this.setProps({
      submenu: {
        component: MenuSub,
        name: 'submenu',
        attrs: menuProps.compact
          ? {
            style: {
              maxHeight: 'calc( 100vh - 5px )',
              'overflow-y': 'auto',
            },
          }
          : {},
        items: this.props.item.items,
        hidden: !expanded,
      },
    })

    if ((menuProps.direction === 'horizontal' || menuProps.compact) && !this.isLeaf) {
      let reference = document.body
      if (this.level > 0) {
        reference = this
      }
      let align = 'bottom left'
      if (menuProps.compact) {
        align = 'right top'
      }

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
            animate: this.props.animate,
            triggerAction: 'hover',
            align: align,
            reference: reference,
            children: {
              ...this.props.submenu,
              isPopup: true,
              classes: { 'nom-menu-popup-sub': true },
            },
            onShow: () => {
              this.onPopupMenuShow()
            },
          },
        },
      })
    }

    this.setProps({
      children: [
        this.props.item,
        !this.isLeaf &&
        menuProps.direction === 'vertical' &&
        !menuProps.compact &&
        this.props.submenu,
      ],
    })
  }

  onPopupMenuShow() {
    if (this.menu.selectedItemKey && this.menu.expandedRoot === this.rootWrapper) {
      this.submenu && this.menu.getItem(this.menu.selectedItemKey) && this.menu.getItem(this.menu.selectedItemKey).select()
      if (this.menu.getItem(this.menu.selectedItemKey) === null) {
        console.warn(`Could not find the item with specific key.`)
      }
    }
  }
}

Component.register(MenuItemWrapper)

export default MenuItemWrapper
