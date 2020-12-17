import Component from '../Component/index'
import FieldLabel from './FieldLabel'
import FieldControl from './FieldControl'

class Field extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            label: '',
            labelAlign: 'right',
            invalidTipAlign: 'top right',
            control: {},
            value: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var classes = {}
        if (this.props.label !== null && this.props.label !== undefined) {
            classes['m-label-' + this.props.labelAlign] = true
        }

        this.setProps({
            classes: classes,
            children: [
                { component: FieldLabel },
                { component: FieldControl, value: this.props.value }
            ]
        })
    }    

    validate() {
        this.control.validate && this.control.validate()
    }
}

Component.register(Field)

export default Field