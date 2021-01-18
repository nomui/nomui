import Component from '../Component/index'
import Modal from '../Modal/index'
import ConfirmContent from './ConfirmContent'

class Confirm extends Modal {
    constructor(props, ...mixins) {
        const defaults = {
            icon: 'question-circle',
            title: null,
            description: null,
            action: null,
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            content: {
                component: ConfirmContent,
            }
        })

        super._config()
    }
}

Component.register(Confirm)

export default Confirm
