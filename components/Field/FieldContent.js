import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'

class FieldContent extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }

    _created() {
        this.field = this.parent
        this.field.content = this
    }

    _config() {
        const { control } = this.field.props
        this.setProps({
            children: Component.extendProps(control, { classes: { 'nom-control': true } }),
            childDefaults: n(null, { 'nom-control': true }, null, [ControlMixin])
        })
    }
}

Component.register(FieldContent)

export default FieldContent
