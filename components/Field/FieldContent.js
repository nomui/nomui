import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import { isPlainObject } from '../util/index'

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
        const { type: fieldType, control, fields, fieldDefaults, value } = this.field.props
        let children = null
        let childDefaults = null
        if (fieldType === 'single') {
            children = control
            childDefaults = n(null, { value: value }, null, [ControlMixin])
        }
        else if (fieldType === 'group') {
            children = []
            for (let i = 0; i < fields.length; i++) {
                const fieldProps = fields[i]
                if (isPlainObject(value)) {
                    if (fieldProps.flatValue === true) {
                        fieldProps.value = value
                    }
                    else if (fieldProps.value === null || fieldProps.value === undefined) {
                        fieldProps.value = value[fieldProps.name]
                    }
                }
                children.push(fieldProps)
            }
            childDefaults = fieldDefaults
        }

        this.setProps({
            children: children,
            childDefaults: childDefaults
        })
    }
}

Component.register(FieldContent)

export default FieldContent
