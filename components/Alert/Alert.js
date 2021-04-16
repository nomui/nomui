import Component from '../Component/index'
import Modal from '../Modal/index'
import AlertContent from './AlertContent'

class Alert extends Modal {
  constructor(props, ...mixins) {
    const defaults = {
      type: 'default',
      icon: null,
      title: null,
      description: null,
      okText: '知道了',
      onOk: (e) => {
        e.sender.close()
      },
      action: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { type, icon, title, description, okText, action } = this.props
    this.setProps({
      content: {
        component: AlertContent,
        type,
        icon,
        title,
        description,
        okText,
        action,
      },
    })

    super._config()
  }
}

Component.register(Alert)

export default Alert
