import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import FieldContentAction from './FieldContentAction'

class FieldContent extends Component {
    constructor(props, ...mixins) {
        super(props, ...mixins)
    }

    _created() {
        this.field = this.parent
        this.field.content = this
    }

    _config() {
        const { control, lastControlAddons, contentActions } = this.field.props
        this.setProps({
            children: [
                n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [ControlMixin]),
                lastControlAddons && Component.extendProps(lastControlAddons, { classes: { 'nom-control-addon': true } }),
                contentActions && { component: FieldContentAction, children: { component: 'List', items: contentActions } }
            ]
        })
    }
}

Component.register(FieldContent)

export default FieldContent
