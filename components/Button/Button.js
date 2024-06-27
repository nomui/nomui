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
    const { icon, text, rightIcon, href, target, inline } = this.props

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

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }

  _enable() {
    this.element.removeAttribute('disabled')
  }
}

Component.register(Button)

export default Button
