import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import ControlAction from './ControlAction'

class FieldContent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }

    _created() {
        this.field = this.parent
        this.field.content = this
    }

    _config() {
        const { control, lastControlAddons, controlAction } = this.field.props
        this.setProps({
            children: [
                n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [ControlMixin]),
                lastControlAddons && Component.extendProps(lastControlAddons, { classes: { 'nom-control-addon': true } }),
                controlAction && { component: ControlAction, children: { component: 'List', items: controlAction } }
            ]
        })
    }
}

Component.register(FieldContent)

export default FieldContent
