import Component from '../Component/index'

class Control extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }
}

Component.register(Control)

export default Control
