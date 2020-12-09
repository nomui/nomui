import Component from '../Component/index'
import { isString } from '../util/index'

class AlertContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: null,
            description: null,
            icon: null,
            type: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var title = this.props.title;
        if (isString(title)) {
            title = {
                children: this.props.title
            }
        };

        var description = this.props.description;
        if (isString(description)) {
            description = {
                children: this.props.description
            }
        };

        this.setProps({
            children: [
                title,
                description
            ]
        })
    }
}

Component.register(AlertContent)

export default AlertContent