import Component from '../Component/index'
import { isFunction, isPlainObject } from '../util/index'

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
      key: function () {
        return this.props[this.props.keyField]
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

    let tools = null

    if (this.wrapper.props.item.toolsRender) {
      tools = this.wrapper.props.item.toolsRender(this, menu)
      tools.onClick = (args) => {
        args.event.stopPropagation()
      }
    }

    if (this.props.tools) {
      if (isFunction(this.props.tools)) {
        tools = this.props.tools(this, menu)
      } else if (isPlainObject(this.props.tools)) {
        tools = this.props.tools
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

    const groupOffset = this.wrapper.props.isGroupItem ? 0.5 : 0

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
        byClick: !menuProps.compact,
        target: function () {
          return this.wrapper.submenu
        },
      },
      attrs: {
        href: this.getItemUrl(this.props.url),
        target: this.props.target,
        style: {
          paddingLeft:
            menuProps.direction === 'vertical' && !menuProps.compact
              ? `${(this.level + 1 - groupOffset) * menuProps.indent}rem`
              : null,
        },
      },
      onSelect: () => {
        this._callHandler(onSelect)
        menu._onItemSelected({ item: this, key: this.key })
      },
      onUnselect: () => {
        this._callHandler(onUnselect)
      },
    })
    if (menuProps.itemSelectable.onlyleaf === true && this.isLeaf === false) {
      this.setProps({ selectable: false })
    }
    if (this.props.type === 'group') {
      this.setProps({
        indicator: false,
        selectable: false,
        expandable: false,
        tag: 'span',
        classes: { text: true, 'nom-menu-group-title': true },
        children: this.props.text,
      })
    } else {
      this.setProps({
        children: [
          this.props.icon && {
            component: 'Icon',
            type: this.props.icon,
            classes: { 'nom-menu-item-icon': true },
          },
          {
            tag: menuProps.compact ? 'div' : 'span',
            classes: { text: true, 'nom-menu-item-title': true },
            attrs: {
              style: { 'flex-grow': this.props.subtext ? null : '2' },
              title: this.props.text,
            },
            children: this.props.text,
          },
          this.props.subtext && {
            tag: 'span',
            classes: { subtext: true },
            attrs: {
              style: { 'flex-grow': '2' },
            },
            children: this.props.subtext,
          },
          tools && tools,
          this.props.indicator && !this.isLeaf && this.props.indicator,
        ],
      })
    }
  }

  _rendered() {
    if (this.props.selected) {
      this.list.selectedItem = this
    }
  }

  handleSelect() {}

  _collapse() {
    this.indicator && this.indicator.collapse()
    this.wrapper && this.wrapper.collapse()
    if (this.menu.props.itemExpandable.expandSingle === true) {
      this.wrapper.parent.expandedChildItem = null
    }
  }

  partSelect() {
    const siblings = this.menu.element.querySelectorAll('.nom-menu-item-submenu-selected')
    if (siblings.length) {
      siblings.forEach((n) => {
        n.classList.remove('nom-menu-item-submenu-selected')
      })
    }
    this.element.classList.add('nom-menu-item-submenu-selected')
  }

  _select() {
    const { menu } = this
    const menuProps = menu.props
    if (menu.selectedItem !== null) menu.selectedItem.unselect()
    menu.selectedItem = this
    menu.expandedRoot = this.wrapper.rootWrapper
    menu.selectedItemKey = this.key
    menuProps.compact && this.wrapper.rootWrapper.item.partSelect()
  }

  _unselect() {
    const { menu } = this
    if (menu.selectedItem === this) menu.selectedItem = null
  }

  _expand() {
    this.indicator && this.indicator.expand()
    this.wrapper && this.wrapper.expand()
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
