import Component from '../Component/index'

class CollapseItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      key: null,
      title: null,
      content: null,
      collapsed: true,
      onChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.menu = this.parent.parent.parent
    this.menu.itemRef[this.props.key] = this
  }

  _config() {
    const { key, title, content, collapsed } = this.props
    const that = this
    this.setProps({
      children: [
        {
          tag: 'div',
          classes: {
            'nom-collapse-item-title': true,
            'nom-collapse-item-open': !this.props.collapsed,
          },
          key: key,
          children: [
            {
              ...Component.normalizeIconProps(
                collapsed ? that.menu.props.icon.default : that.menu.props.icon.open,
              ),
              classes: {
                'nom-collapse-right-icon': that.menu.props.icon.align === 'right',
              },
              onClick: function () {
                if (!that.menu.props.iconOnly) return
                that._handleCollapse()
              },
            },
            { tag: 'span', children: title },
          ],
          onClick: function () {
            if (that.menu.props.iconOnly) return
            that._handleCollapse()
          },
        },
        {
          tag: 'div',
          classes: { 'nom-collapse-item-content': true },
          hidden: collapsed,
          children: content,
        },
      ],
    })
  }

  close() {
    this.update({
      collapsed: true,
    })
  }

  _handleCollapse() {
    this.setProps({
      collapsed: this.props.collapsed !== true,
    })

    this.update(this.props.collapsed)
    this.menu._onCollapse(this.props.key, !this.props.collapsed)
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(CollapseItem)

export default CollapseItem
