import Component from '../Component/index'

class WidgetBody extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }
}

Component.register(WidgetBody)

export default WidgetBody