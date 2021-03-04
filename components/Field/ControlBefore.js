import Component from '../Component/index'

class ControlBefore extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }
}

Component.register(ControlBefore)

export default ControlBefore
