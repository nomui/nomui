import Component from '../Component/index'
import Modal, { ModalDialog } from '../Modal/index'
import AlertContent from './AlertContent'

class Alert extends Modal {
  constructor(props, ...mixins) {
    const defaults = {
      type: 'default',
      icon: null,
      title: null,
      description: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      children: {
        component: ModalDialog,
        children: {
          component: AlertContent,
          type: this.props.type,
          icon: this.props.icon,
          title: this.props.title,
          description: this.props.description,
        },
      },
    })
  }
}

Component.register(Alert)

export default Alert
