import Component from '../Component/index'

class Bsicon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            type: '',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var classes = { 'bi': true }
        classes['bi-' + this.props.type] = true

        this.setProps({
            tag: 'i',
            classes: classes,
        })
    }
}

Component.register(Bsicon)

export default Bsicon