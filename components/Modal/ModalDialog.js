import Component from '../Component/index'
import ModalContent from './ModalContent'
import { isString } from '../util/index'

class ModalDialog extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            children: { component: ModalContent }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modal = this.parent;
    }

    _config() {
        if (isString(this.props.content)) {
            this.setProps({
                component: 'view',
                url: this.props.content,
                view: {
                    component: ModalContent
                }
            });
        }
    }
}

Component.register(ModalDialog)

export default ModalDialog