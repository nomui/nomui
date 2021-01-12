import Component from '../Component/index'
import Control from '../Control/index'
import Field from '../Field/index'
import { isPlainObject } from '../util/index'

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

      requiredMark: true,

      space: 'md',
      size: 'md',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('inline')

    const children = []
    for (let i = 0; i < this.props.fields.length; i++) {
      const field = this.props.fields[i]
      if (isPlainObject(this.props.value)) {
        if (field.value === null || field.value === undefined) {
          field.value = this.props.value[field.name]
        }
      }
      children.push(field)
    }
    this.setProps({
      children: children,
      childDefaults: this.props.fieldDefaults,
    })
  }

  getValue() {
    const value = {}
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.getValue && field.props.name) {
        value[field.props.name] = field.getValue()
      }
    }
    return value
  }

  setValue(value) {
    for (let i = 0; i < this.children.length; i++) {
      const field = this.children[i]
      if (field.setValue && field.props.name) {
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
