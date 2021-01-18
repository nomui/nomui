import Component from '../Component/index'
import Control from '../Control/index'
import Field from '../Field/index'
import { extend, isPlainObject } from '../util/index'

class Form extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      fields: [],
      fieldDefaults: {
        component: Field,
      },

      value: {},

      inline: false,
      striped: false,
      bordered: false,
      splitline: false,

      line: null,

      requiredMark: true,

      space: 'md',
      size: 'md',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('inline', 'striped', 'line')

    const { fields, value, fieldDefaults } = this.props

    const children = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (isPlainObject(value)) {
        if (field.flatValue === true) {
          field.value = value
        }
        else if (field.value === null || field.value === undefined) {
          field.value = value[field.name]
        }
      }
      children.push(field)
    }
    this.setProps({
      children: children,
      childDefaults: fieldDefaults,
    })
  }

  getValue() {
    const value = {}
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.props.flatValue === true) {
        extend(value, field.getValue())
      }
      else if (field.getValue && field.props.name) {
        value[field.props.name] = field.getValue()
      }
    }
    return value
  }

  setValue(value) {
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.props.flatValue === true) {
        field.setValue(value)
      }
      else if (field.setValue && field.props.name) {
        field.setValue(value[field.props.name])
      }
    }
  }

  validate() {
    const invalids = []
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.validate) {
        const valResult = field.validate()

        if (valResult !== true) {
          invalids.push(field)
        }
      }
    }

    if (invalids.length > 0) {
      invalids[0].focus()
    }

    return invalids.length === 0
  }

  getField(fieldName) {
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.props.name === fieldName) {
        return field
      }
    }

    return null
  }

  _onValueChange(changed) {
    this._callHandler(this.props.onValueChange, changed)
  }
}

Component.register(Form)

export default Form
