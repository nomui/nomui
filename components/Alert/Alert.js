import Component from '../Component/index'
import Modal from '../Modal/index'
import AlertContent from './AlertContent'

class Alert extends Modal {
  constructor(props, ...mixins) {
    super(Component.extendProps(Alert.defaults, props), ...mixins)
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
Alert.defaults = {
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
Component.register(Alert)

export default Alert
