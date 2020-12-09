import Component from '../Component/index'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'

class ModalContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            header: { component: ModalHeader },
            body: { component: ModalBody },
            footer: { component: ModalFooter }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modal = this.parent.modal
    }

    _config() {
        this.setProps({
            tag: 'div',
            children: [
                this.props.header,
                this.props.body,
                this.props.footer
            ]
        })
    }
}

Component.register(ModalContent)

export default ModalContent