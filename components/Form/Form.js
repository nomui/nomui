import Component from '../Component/index'
import Control from '../Control/index'
import Field from '../Field/index'
import { isPlainObject } from '../util/index'

class Form extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            fields: [],
            fieldDefaults: {
                component: Field
            },

            value: {},

            inline: false,
            striped: false,
            bordered: false,
            splitline: false,

            space: 'md',
            size: 'md'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var children = [];
        for (var i = 0; i < this.props.fields.length; i++) {
            var field = this.props.fields[i]
            if (isPlainObject(this.props.value)) {
                if (field.value === null || field.value === undefined) {
                    field.value = this.props.value[field.name]
                }
            }
            children.push(field)
        }
        this.setProps({
            children: children,
            childDefaults: this.props.fieldDefaults
        })
    }
}

Component.register(Form)

export default Form