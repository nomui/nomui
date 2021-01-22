import Component from '../Component/index'

class FieldContent extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }

    _created() {
        this.field = this.parent
    }

    _config() {
        const { control } = this.field.props
        this.setProps({
            children: Component.extendProps(control, { classes: { 'nom-control': true } })
        })
    }
}

Component.register(FieldContent)

export default FieldContent
