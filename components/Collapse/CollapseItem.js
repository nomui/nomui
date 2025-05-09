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
      classes: {
        'align-right': that.menu.props.icon.align === 'right',
      },
      children: [
        {
          component: 'Flex',
          classes: {
            'nom-collapse-item-title': true,
            'nom-collapse-item-open': !collapsed,
          },
          key: key,
          align: 'center',
          cols: [
            {
              children: {
                ...Component.normalizeIconProps(
                  collapsed ? that.menu.props.icon.default : that.menu.props.icon.open,
                ),
                ref: (c) => {
                  that.iconRef = c
                },
                onClick: ({ sender }) => {
                  if (sender.props.type === that.menu.props.icon.default) {
                    sender.update({ type: that.menu.props.icon.open })
                  } else {
                    sender.update({ type: that.menu.props.icon.default })
                  }
                  if (!that.menu.props.iconOnly) return
                  that._handleCollapse()
                },
              },
            },
            {
              grow: true,
              children: title,
            },
          ],
          onClick: function () {
            if (that.menu.props.iconOnly) return
            that._handleCollapse()
          },
        },
        {
          tag: 'div',
          classes: {
            'nom-collapse-item-content': true,
          },
          ref: (c) => {
            that.contentRef = c
          },
          hidden: collapsed,
          children: content,
        },
      ],
    })
  }

  close() {
    this.contentRef.hide()
    this.props.collapsed = true
    this.iconRef.update({ type: this.menu.props.icon.default })
  }

  _handleCollapse() {
    this.setProps({
      collapsed: this.props.collapsed !== true,
    })
    if (this.props.collapsed) {
      this.contentRef.hide()
    } else {
      this.contentRef.show()
    }

    this.menu._onCollapse(this.props.key, !this.props.collapsed)
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(CollapseItem)

export default CollapseItem
