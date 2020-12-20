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

    _create() {
        this.form = this.parent
    }

    _config() {
        var classes = {}
        if (this.props.label !== null && this.props.label !== undefined) {
            classes['m-label-' + this.props.labelAlign] = true
        }

        this.on('valueChange', function () {
            this.form.trigger('valueChange')
        })

        this.setProps({
            classes: classes,
            children: [
                { component: FieldLabel },
                { component: FieldControl, value: this.props.value }
            ]
        })
    }

    getValue() {
        if (this.control.getValue) {
            return this.control.getValue()
        }
        else {
            return null
        }
    }

    setValue(value) {
        if (this.control.setValue) {
            this.control.setValue(value)
        }
    }

    validate() {
        if (this.control.validate) {
            return this.control.validate()
        }
        else {
            return true
        }
    }

    focus() {
        this.control.focus && this.control.focus()
    }
}

Component.register(Field)

export default Field