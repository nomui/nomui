import Component from '../Component/index'

class Button extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'button',
      text: null,
      icon: null,
      rightIcon: null,
      type: 'default', // null(default) primary,dashed,text,link
      ghost: false,
      danger: false,
      borderless: false,
      block: false,
      inline: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['ghost', 'size', 'shape', 'danger', 'block', 'borderless']
    const { icon, text, rightIcon, href, target, inline, rightBadge } = this.props

    if (icon || rightIcon) {
      this.setProps({
        classes: {
          'p-with-icon': true,
        },
      })

      if (!text) {
        this.setProps({
          classes: {
            'p-only-icon': true,
          },
        })
      }
    }

    let badgeProps = null
    if (rightBadge) {
      badgeProps = Component.extendProps({
        component: 'Badge',
        ref: (c) => {
          this.badgeRef = c
        },
      }, rightBadge)
    }

    this.setProps({
      children: [
        Component.normalizeIconProps(icon),
        text && { tag: 'span', children: text },
        badgeProps,
        Component.normalizeIconProps(rightIcon),
      ],
    })

    if (inline) {
      this.setProps({
        tag: 'a',
        classes: {
          'nom-button-inline': true,
        },
      })
    }

    if (href) {
      this.setProps({
        tag: 'a',
        attrs: {
          ...this.props.attrs,
          href: href,
          target: target || '_self',
        },
      })
    }
  }

  updateBadge(props) {
    this.badgeRef.update(props)
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }

  _enable() {
    this.element.removeAttribute('disabled')
  }
}

Component.register(Button)

export default Button
