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
        const { control, lastControlAddons } = this.field.props
        this.setProps({
            children: [
                n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [ControlMixin]),
                lastControlAddons && Component.extendProps(lastControlAddons, { classes: { 'nom-control-addon': true } })
            ]
        })
    }
}

Component.register(FieldContent)

export default FieldContent
