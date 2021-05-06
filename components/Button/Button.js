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
    /* 执行父类有参数构造方法
    先将子类默认参数（defaults）与子类传参（props）合并，然后传递给父类的参数，父类参数（mixins）便有了所有当前的参数配置，然后super执行 */
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {

    /* 用来给当前组件加如‘p-size-small’式的样式（组件属性控制的样式类前缀 p-，例如 p-bordered） */
    this._propStyleClasses = ['type', 'ghost', 'size', 'shape', 'danger', 'block']
    const {
      icon,
      text,
      rightIcon,
      href,
      target
    } = this.props

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
        text && {
          tag: 'span',
          children: text
        },
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
