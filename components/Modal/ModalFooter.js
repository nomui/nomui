import Component from '../Component/index'

class ModalFooter extends Component {
    constructor(props, ...mixins) {
        const defaults = {}

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modalContent = this.parent
        this.modal = this.modalContent.modal
    }
}

Component.register(ModalFooter)

export default ModalFooter