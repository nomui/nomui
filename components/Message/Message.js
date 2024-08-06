import Component from '../Component/index'
import Layer from '../Layer/index'

class Message extends Layer {
  constructor(props, ...mixins) {
    super(Component.extendProps(Message.defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('type')
    const iconMap = {
      info: 'info-circle-fill',
      success: 'check-circle-fill',
      error: 'close-circle-fill',
      warning: 'warning-circle-fill',
    }

    const icon = this.props.icon || iconMap[this.props.type]
    let iconProps = Component.normalizeIconProps(icon)
    if (iconProps) {
      iconProps = Component.extendProps(iconProps, { classes: { 'nom-message-icon': true } })
    }
    this.props.content = Component.normalizeTemplateProps(this.props.content)
    this.setProps({
      classes: {
        'nom-message-popup': !!this.props.position,
      },
      content: {
        classes: {
          'nom-message-content': true,
        },
      },
    })
    this.setProps({
      children: [iconProps, this.props.content],
    })

    super._config()
  }

  close() {
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.remove()
  }

  animateHide() {
    if (!this.element) return false
    this.addClass('nom-layer-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.remove()
    }, 90)
  }

  _rendered() {
    const that = this
    const { props } = this

    if (props.duration) {
      setTimeout(function () {
        that.close()
      }, 1000 * props.duration)
    }
  }
}
Message.defaults = {
  type: null,
  icon: null,
  content: null,
  duration: 2,
  closeToRemove: true,
  position: {
    my: 'center center',
    at: 'center center',
    of: window,
  },
}
Component.register(Message)

export default Message
