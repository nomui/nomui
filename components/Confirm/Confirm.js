import Component from '../Component/index'
import Modal from '../Modal/index'
import ConfirmContent from './ConfirmContent'

class Confirm extends Modal {
  constructor(props, ...mixins) {
    super(Component.extendProps(Confirm.defaults, props), ...mixins)
  }

  _config() {
    const { onOk } = this.props
    this.setProps({
      content: {
        component: ConfirmContent,
      },
      onOk: (e) => {
        if (onOk(e) !== false) {
          e.sender.close()
        }
      },
    })

    super._config()
  }
}
Confirm.defaults = {
  icon: 'question-circle',
  title: null,
  description: null,
  action: null,
}

Component.register(Confirm)

export default Confirm
