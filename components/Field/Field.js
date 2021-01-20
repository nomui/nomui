import Component from '../Component/index'
import FieldContent from './FieldContent'
import FieldLabel from './FieldLabel'
import { extend } from '../util/index'

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
      type: 'single', // single,group,list
      value: null,
      span: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.form = this.parent
    this.name = this.props.name || `field${++nameSeq}`
    this.group = this.props.__group || null
    this.fields = []
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

    if (type === 'group') {
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

    if (type === 'single') {
      if (this.control.getValue) {
        value = this.control.getValue()
      }
    }
    else if (type === 'group') {
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

    if (type === 'single') {
      if (this.control.setValue) {
        this.control.setValue(value)
      }
    }
    else if (type === 'group') {
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

    if (type === 'single') {
      if (this.control.validate) {
        valid = this.control.validate()
      }
    }
    else if (type === 'group') {
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
    for (let i = 0; i < this.fileds.length; i++) {
      const field = this.fileds[i]
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
