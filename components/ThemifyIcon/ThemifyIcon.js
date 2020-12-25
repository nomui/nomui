import Component from '../Component/index'

class ThemifyIcon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            type: '',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var classes = {}
        classes['ti-' + this.props.type] = true

        this.setProps({
            tag: 'i',
            classes: classes,
        })
    }
}

Component.register(ThemifyIcon)

export default ThemifyIcon