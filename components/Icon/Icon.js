import Component from '../Component/index'
import Cssicon from '../Cssicon/index'
import { isString } from '../util/index'

class Icon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            border: false,
            background: false,
            iconPrefix: 'icon',
            tag: 'span',
            box: true,
            i: {
                component: Cssicon
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            children: [
                {
                    component: Cssicon,
                    type: this.props.type
                }
            ]
        })
    }
}

Component.normalizeIconProps = function (props) {
    if (props === null || props === undefined) {
        return null
    }
    var iconProps = {}
    if (isString(props)) {
        iconProps.type = props
    }
    else {
        iconProps = props
    }
    iconProps.component = Icon

    return iconProps
}

Component.register(Icon)

export default Icon