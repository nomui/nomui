import Component from '../Component/index'

class Button extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'button',
      text: null,
      icon: null,
      rightIcon: null,
      type: null, // null(default) primary,dashed,text,link
      ghost: false,
      danger: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['type', 'ghost', 'size', 'shape', 'danger', 'block']
    const { icon, text, rightIcon, href, target } = this.props

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

    this.setProps({
      children: [
        Component.normalizeIconProps(icon),
        text && { tag: 'span', children: text },
        Component.normalizeIconProps(rightIcon),
      ],
    })

    if (href) {
      this.setProps({
        tag: 'a',
        attrs: {
          href: href,
          target: target || '_self',
        },
      })
    }
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
