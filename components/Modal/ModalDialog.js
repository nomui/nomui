import Component from '../Component/index'
import Panel from '../Panel/index'
import ModalContentMixin from './ModalContentMixin'
import { isString, isPlainObject } from '../util/index'

class ModalDialog extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            children: { component: Panel }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modal = this.parent;
        let content = this.modal.props.content
        if (isString(content)) {
            require([content], (props) => {
                props = Component.extendProps({
                    component: Panel,
                    header: {
                        nav: {},
                        tools: [
                            {
                                component: 'Button',
                                icon: 'close',
                                styles: {
                                    border: 'none'
                                },
                                events: {
                                    click: function () {
                                        this.$modal.close()
                                    }
                                }
                            }
                        ]
                    }
                }, props)
                this.update({
                    children: { props: props, mixins: [ModalContentMixin] }
                })
            })
        }
    }

    _config() {
        let content = this.modal.props.content
        if (isPlainObject(content)) {
            this.setProps({
                children: { props: content, mixins: [ModalContentMixin] }
            })
        }
    }
}

Component.register(ModalDialog)

export default ModalDialog