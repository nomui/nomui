import Component from '../Component/index'
import Layer from '../Layer/index'

class Message extends Layer {
  constructor(props, ...mixins) {
    const defaults = {
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

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {   
    this._addPropStyle('type')
    const iconMap = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'close-circle',
      warning: 'exclamation-circle',
    }

    const icon = this.props.icon || iconMap[this.props.type]
    let iconProps = Component.normalizeIconProps(icon)
    if (iconProps) {
      iconProps = Component.extendProps(iconProps, { classes: { 'nom-message-icon': true } })
    }
    this.props.content = Component.normalizeTemplateProps(this.props.content)
    this.setProps({
      content: {
        classes: {
          'nom-message-content': true,
        },
      },
    })
    this.setProps({
      children: [
        iconProps,
        this.props.content,
      ],
    })

    super._config()
  }

  close() {
    this.remove()
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

Component.register(Message)

export default Message
