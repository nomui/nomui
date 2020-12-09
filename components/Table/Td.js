import Component from '../Component/index'

class Td extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'td',
            data: null,
            column: {}
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            children: this.props.data
        })
    }
}

Component.register(Td)

export default Td