import Component from '../Component/index'
import { extend } from '../util/index'
import FieldContent from './FieldContent'
import FieldLabel from './FieldLabel'

let nameSeq = 0

class Field extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      label: null,
      labelAlign: 'right',
      invalidTipAlign: 'top right',
      control: {},
      fields: null,
      fieldDefaults: { component: Field },
      groupDefaults: null,
      type: 'Single', // single,group,list
      value: null,
      span: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.form = this.parent
    this.name = this.props.name || `__field${++nameSeq}`
    this.group = this.props.__group || null
    this.fields = []
    if (this.group) {
      this.group.fields.push(this)
    }
  }

  _config() {
    this._addPropStyle('type', 'required', 'requiredMark', 'labelAlign')
    const { label, span, type } = this.props
    const hasLabel = label !== null && label !== undefined

    if (!hasLabel) {
      this.props.labelAlign = null
    }

    if (span) {
      this.setProps({
        styles: {
          col: span
        }
      })
    }

    if (type === 'Group') {
      this._addPropStyle('inline', 'striped', 'line')
    }

    this.setProps({
      required: this.props.control.required,
      requiredMark: this.props.requiredMark,
      children: [
        hasLabel && { component: FieldLabel },
        { component: FieldContent, value: this.props.value },
      ],
    })
  }

  getValue() {
    const { type } = this.props
    let value = null

    if (type === 'Single') {
      if (this.control.getValue) {
        value = this.control.getValue()
      }
    }
    else if (type === 'Group') {
      value = {}
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i]
        if (field.getValue) {
          const fieldValue = field.getValue()
          if (field.props.flatValue === true) {
            extend(value, fieldValue)
          }
          else {
            value[field.name] = fieldValue
          }
        }
      }
    }

    return value
  }

  setValue(value) {
    const { type } = this.props

    if (type === 'Single') {
      if (this.control.setValue) {
        this.control.setValue(value)
      }
    }
    else if (type === 'Group') {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i]
        if (field.setValue) {
          if (field.props.flatValue === false) {
            value = value[field.name]
          }
          field.setValue(value)
        }
      }
    }
  }

  validate() {
    const { type } = this.props

    let valid = true

    if (type === 'Single') {
      if (this.control.validate) {
        valid = this.control.validate()
      }
    }
    else if (type === 'Group') {
      const invalids = []
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i]
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

      valid = invalids.length === 0
    }

    return valid
  }

  getField(fieldName) {
    if (typeof fieldName === 'string') {
      // Handle nested keys, e.g., "foo.bar"
      const parts = fieldName.split('.')
      let curField = this
      if (parts.length) {
        for (let i = 0; i < parts.length; i++) {
          let part = parts[i]
          curField = curField._getSubField(part)
          if (!curField) {
            break
          }
        }
      }

      return curField
    }
  }

  _getSubField(fieldName) {
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (field.name === fieldName) {
        return field
      }
    }

    return null
  }

  focus() {
    this.control.focus && this.control.focus()
  }

  blur() {
    this.control.blur && this.control.blur()
  }

  _onValueChange(changed) {
    this._callHandler(this.props.onValueChange, changed)
    this.group && this.group._onValueChange(changed)
  }
}

Component.register(Field)

export default Field
