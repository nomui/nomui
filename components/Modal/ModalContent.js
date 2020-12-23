import Component from '../Component/index'
import ModalHeader from './ModalHeader'
import ModalBody from './ModalBody'
import ModalFooter from './ModalFooter'
import ModalContentMixin from './ModalContentMixin'

class ModalContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            header: { component: ModalHeader },
            body: { component: ModalBody },
            footer: { component: ModalFooter }
        }

        super(Component.extendProps(defaults, props), ModalContentMixin, ...mixins)
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