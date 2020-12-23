import Component from '../Component/index'
import ModalContent from './ModalContent'
import { isString, isPlainObject } from '../util/index'

class ModalDialog extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            children: { component: ModalContent }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modal = this.parent;
        let content = this.modal.props.content
        if (isString(content)) {
            require([content], (props) => {
                this.update({
                    children: props
                })
            })
        }
    }

    _config() {
        let content = this.modal.props.content
        if (isPlainObject(content)) {
            this.setProps({
                children: content
            })
        }
    }
}

Component.register(ModalDialog)

export default ModalDialog