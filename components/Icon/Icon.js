import Component from '../Component/index'
import ThemifyIcon from '../ThemifyIcon/index'
import { isString, isPlainObject } from '../util/index'

class Icon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            border: false,
            background: false,
            box: true,
            i: { 
                component: ThemifyIcon
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            i: {
                type: this.props.type
            }
        })
        this.setProps({
            tag: 'span',
            children: this.props.i
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
    else if (isPlainObject(props)) {
        iconProps = props
    }
    else {
        return null
    }
    iconProps.component = Icon

    return iconProps
}

Component.register(Icon)

export default Icon