import Component from '../Component/index'

class FlexItem extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }
}

Component.register(FlexItem)

export default FlexItem