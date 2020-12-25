import Component from '../Component/index'
import Modal from '../Modal/index'
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
            content: {
                component: AlertContent,
                type: this.props.type,
                icon: this.props.icon,
                title: this.props.title,
                description: this.props.description
            }
        })

        super._config()
    }
}

Component.register(Alert)

export default Alert