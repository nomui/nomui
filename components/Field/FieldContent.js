import Component from '../Component/index'

class FieldContent extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }

    _created() {
        this.field = this.parent
    }

    _config() {
        const { content } = this.field.props

        this.setProps({
            children: content
        })
    }
}

Component.register(FieldContent)

export default FieldContent
