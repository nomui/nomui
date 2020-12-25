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

            requiredMark: true,

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

    getValue() {
        let value = {}
        for (let i = 0; i < this.children.length; i++) {
            let field = this.children[i]
            if (field.getValue && field.props.name) {
                value[field.props.name] = field.getValue()
            }
        }
        return value
    }

    setValue(value) {
        for (let i = 0; i < this.children.length; i++) {
            let field = this.children[i]
            if (field.setValue && field.props.name) {
                field.setValue(value[field.props.name])
            }
        }
    }

    validate() {
        let invalids = [];
        for (let i = 0; i < this.children.length; i++) {
            let field = this.children[i]
            if (field.validate) {
                let valResult = field.validate()

                if (valResult !== true) {
                    invalids.push(field)
                }
            }
        }

        if (invalids.length > 0) {
            invalids[0].focus();
        }

        return invalids.length === 0
    }

    getField(fieldName) {
        for (let i = 0; i < this.children.length; i++) {
            let field = this.children[i]
            if (field.props.name === fieldName) {
                return field
            }
        }

        return null
    }
}

Component.register(Form)

export default Form