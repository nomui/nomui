import Component from '../Component/index'

class MenuItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'a',
      url: null,
      icon: null,
      text: null,
      subtext: null,
      indicator: {
        component: 'Icon',
        expandable: {
          expandedProps: {
            type: 'up',
          },
          collapsedProps: {
            type: 'down',
          },
        },
        type: 'down',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.wrapper = this.parent
    this.wrapper.item = this
    this.menu = this.wrapper.menu
    this.level = this.wrapper.level
    this.isLeaf = this.wrapper.isLeaf
    this.menu.itemRefs[this.key] = this
    this.parentItem = null
    if (this.wrapper.parentWrapper) {
      this.parentItem = this.wrapper.parentWrapper.item
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  _config() {
    const { menu } = this
    const { onSelect, onUnselect } = this.props
    const menuProps = menu.props

    let indicatorIconType = 'down'
    if (menuProps.direction === 'horizontal' && this.level > 0) {
      indicatorIconType = 'right'
    }

    if (menuProps.direction === 'horizontal') {
      this.setProps({
        indicator: {
          expandable: false,
        },
      })
    }

    this.setProps({
      indicator: {
        type: indicatorIconType,
        classes: { 'nom-menu-toggler': true },
        _created() {
          this.parent.indicator = this
        },
      },
      selectable: {
        byClick: menuProps.itemSelectable.byClick,
      },
      expandable: {
        byClick: !this.isLeaf,
        target: function () {
          return this.wrapper.submenu
        },
      },
      attrs: {
        href: this.getItemUrl(this.props.url),
        style: {
          paddingLeft:
            menuProps.direction === 'vertical' ? `${(this.level + 1) * menuProps.indent}rem` : null,
        },
      },
      onSelect: () => {
        if (menu.selectedItem !== null) menu.selectedItem.unselect()
        menu.selectedItem = this
        this._callHandler(onSelect)
      },
      onUnselect: () => {
        if (menu.selectedItem === this) menu.selectedItem = null
        this._callHandler(onUnselect)
      },
    })

    this.setProps({
      children: [
        this.props.icon && {
          component: 'Icon',
          type: this.props.icon,
          classes: { 'nom-menu-item-icon': true },
        },
        { component: Component, tag: 'span', classes: { text: true }, children: this.props.text },
        this.props.subtext && {
          component: Component,
          tag: 'span',
          classes: { subtext: true },
          children: this.props.subtext,
        },
        this.props.indicator && !this.isLeaf && this.props.indicator,
      ],
    })
  }

  handleSelect() {

  }

  _collapse() {
    this.indicator && this.indicator.collapse()
    if (this.menu.props.itemExpandable.expandSingle === true) {
      this.wrapper.parent.expandedChildItem = null
    }
  }

  _expand() {
    this.indicator && this.indicator.expand()
    if (this.menu.props.itemExpandable.expandSingle === true) {
      if (this.wrapper.parent.expandedChildItem) {
        this.wrapper.parent.expandedChildItem.collapse()
      }
      this.wrapper.parent.expandedChildItem = this
    }
  }

  getItemUrl(url) {
    if (url) {
      return url
    }

    return 'javascript:void(0);'
  }
}

Component.register(MenuItem)

export default MenuItem
