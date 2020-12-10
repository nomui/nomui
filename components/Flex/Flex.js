import Component from '../Component/index'

class Flex extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            direction: 'horizontal',
            wrap: false
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {

    }
}

Component.register(Flex)

export default Flex