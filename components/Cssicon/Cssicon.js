import Component from '../Component/index'

class Cssicon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            type: '',
            tag: 'i'
        }

        super(Component.extendProps(defaults, props), ...mixins);
    }

    _config() {
        var classes = {};
        classes['icon-' + this.props.type] = true;

        this.setProps({
            classes: classes
        });
    }
}

Component.register(Cssicon)

export default Cssicon