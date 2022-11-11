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
      tools: null,
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

    let tools = null

    if (this.wrapper.props.item.toolsRender) {
      tools = this.wrapper.props.item.toolsRender(this, menu)
      tools.onClick = (args) => {
        args.event.stopPropagation()
      }
    }

    let indicatorIconType = menuProps.compact ? 'right' : 'down'

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
        attrs: {
          style: {
            'padding-left': '.5rem',
          },
        },
        _created() {
          this.parent.indicator = this
        },
      },
      selectable: {
        byClick: menuProps.itemSelectable.byClick,
      },
      expandable: {
        byClick: !this.isLeaf && !menuProps.compact,
        target: function () {
          return this.wrapper.submenu
        },
      },
      attrs: {
        href: this.getItemUrl(this.props.url),
        style: {
          paddingLeft:
            menuProps.direction === 'vertical' && !menuProps.compact
              ? `${(this.level + 1) * menuProps.indent}rem`
              : null,
        },
      },
      onSelect: () => {
        if (menu.selectedItem !== null) menu.selectedItem.unselect()
        menu.selectedItem = this
        menu.expandedRoot = this.wrapper.rootWrapper
        menu.selectedItemKey = this.key
        menuProps.compact && this.wrapper.rootWrapper.item.expand()
        this._callHandler(onSelect)
      },
      onUnselect: () => {
        if (menu.selectedItem === this) menu.selectedItem = null
        this._callHandler(onUnselect)
      },
    })
    if (menuProps.itemSelectable.onlyleaf === true && this.isLeaf === false) {
      this.setProps({ selectable: false })
    }

    this.setProps({
      children: [
        this.props.icon && {
          component: 'Icon',
          type: this.props.icon,
          classes: { 'nom-menu-item-icon': true },
        },
        {
          component: Component,
          tag: menuProps.compact ? 'div' : 'span',
          classes: { text: true, 'nom-menu-item-title': true },
          attrs: {
            style: { 'flex-grow': this.props.subtext ? null : '2' },
            title: this.props.text,
          },
          children: this.props.text,
        },
        this.props.subtext && {
          component: Component,
          tag: 'span',
          classes: { subtext: true },
          attrs: {
            style: { 'flex-grow': '2' },
          },
          children: this.props.subtext,
        },
        menu.props.direction !== 'horizontal' && tools && tools,
        this.props.indicator && !this.isLeaf && this.props.indicator,
      ],
    })
  }

  _rendered() {
    if (this.props.selected) {
      this.list.selectedItem = this
    }
  }

  handleSelect() {}

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
