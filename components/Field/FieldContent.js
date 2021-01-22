import Component, { n } from '../Component/index'
import { isPlainObject } from '../util/index'
import ControlMixin from './ControlMixin'

class FieldContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            control: {},
        }

        super(Component.extendProps(defaults, props), ...mixins)
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
