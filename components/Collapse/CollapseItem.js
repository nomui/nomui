import Component from '../Component/index'

class CollapseItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      key: null,
      title: null,
      content: null,
      collapsed: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { key, title, content, collapsed } = this.props
    const that = this
    this.setProps({
      children: [
        {
          tag: 'div',
          classes: { 'nom-collapse-item-title': true },
          styles: {
            padding: '3px',
          },
          key: key,
          children: [
            {
              ...Component.normalizeIconProps(
                collapsed ? that.parent.props.icon.default : that.parent.props.icon.open,
              ),
              onClick: function () {
                if (!that.parent.props.iconOnly) return
                that.setProps({
                  collapsed: collapsed !== true,
                })
                that.parent.setProps({
                  activeKey: that.props.key,
                })
                that.update(collapsed)
              },
            },
            { tag: 'span', children: title },
          ],
          onClick: function () {
            if (that.parent.props.iconOnly) return
            that.setProps({
              collapsed: collapsed !== true,
            })
            that.parent.setProps({
              activeKey: that.props.key,
            })
            that.update(collapsed)
          },
        },
        {
          tag: 'div',
          classes: { 'nom-collapse-item-content': true },
          styles: {
            padding: '3px',
          },
          hidden: collapsed,
          children: content,
        },
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(CollapseItem)

export default CollapseItem
