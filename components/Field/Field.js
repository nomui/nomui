import Component, { n } from '../Component/index'
import Tooltip from '../Tooltip/index'
import { clone, isFunction } from '../util/index'
import RuleManager from '../util/rule-manager'
import FieldActionMixin from './FieldActionMixin'
import FieldContent from './FieldContent'
import FieldLabel from './FieldLabel'

let nameSeq = 0

class Field extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      label: null,
      labelAlign: 'right',
      invalidTipAlign: 'top right',
      value: null,
      flatValue: false,
      span: null,
      notShowLabel: false,
      rules: [],
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const { name, value } = this.props
    this.initValue = value !== undefined ? clone(this.props.value) : null
    this.oldValue = null
    this.currentValue = this.initValue
    if (name) {
      this.name = name
      this._autoName = false
    } else {
      this._autoName = true
      this.name = `__field${++nameSeq}`
    }
    this.group = this.props.__group || null
    this.rootField = this.group === null ? this : this.group.rootField
  }

  _config() {
    delete this.errorTip
    
    this._addPropStyle('required', 'requiredMark', 'labelAlign', 'controlWidth')
    const {
      label,
      labelWidth,
      span,
      notShowLabel,
      required,
      requiredMessage,
      rules,
      action,
    } = this.props
    const showLabel = notShowLabel === false && label !== undefined && label !== null

    if (required === true) {
      rules.unshift({ type: 'required', message: requiredMessage })
    }

    if (span) {
      this.setProps({
        styles: {
          col: span,
        },
      })
    }

    let labelProps = showLabel ? { component: FieldLabel } : null
    if (labelProps && labelWidth) {
      labelProps = Component.extendProps(labelProps, {
        attrs: {
          style: {
            width: `${labelWidth}px`,
            maxWidth: `${labelWidth}px`,
            flexBasis: `${labelWidth}px`,
          },
        },
      })
    }

    let actionProps = null
    if (action) {
      actionProps = { component: 'List', classes: { 'nom-field-action': true } }
      if (Array.isArray(action)) {
        actionProps = Component.extendProps(actionProps, { items: action })
      } else {
        actionProps = Component.extendProps(actionProps, action)
      }
    }

    this.setProps({
      children: [
        labelProps,
        { component: FieldContent, value: this.props.value },
        actionProps && n(actionProps, [FieldActionMixin]),
      ],
    })
  }

  getValue(options) {
    const value = isFunction(this._getValue) ? this._getValue(options) : null
    return value
  }

  setValue(value) {
    isFunction(this._setValue) && this._setValue(value)
  }

  validate() {
    this.validateTriggered = true
    return this._validate()
  }

  _validate() {
    const { rules, disabled, hidden } = this.props
    if (disabled || hidden) {
      return true
    }
    const value = this._getRawValue ? this._getRawValue() : this.getValue()

    if (Array.isArray(rules) && rules.length > 0) {
      const validationResult = RuleManager.validate(rules, value)

      if (validationResult === true) {
        this.removeClass('s-invalid')
        this.trigger('valid')
        if (this.errorTip) {
          this.errorTip.remove()
          delete this.errorTip
        }
        return true
      }

      this.addClass('s-invalid')
      this.trigger('invalid', validationResult)
      this._invalid(validationResult)
      return false
    }

    return true
  }

  _invalid(message) {
    if (!this.errorTip) {
      this.errorTip = new Tooltip({
        trigger: this,
        reference: this.content,
        styles: {
          color: 'danger',
        },
        children: message,
      })

      if (this.element.contains(document.activeElement)) {
        this.errorTip.show()
      }
    } else {
      this.errorTip.update({
        children: message,
      })
    }
  }

  focus() {
    isFunction(this._focus) && this._focus()
  }

  blur() {
    isFunction(this._blur) && this._blur()
  }

  reset() {
    isFunction(this._reset) && this._reset()
  }

  clear() {
    isFunction(this._clear) && this._clear()
  }

  after(props) {
    if (props) {
      props.__group = this.group
    }
    return super.after(props)
  }

  _reset() {
    this.setValue(this.initValue)
  }

  _clear() {
    this.setValue(null)
  }

  _remove() {
    if (this.group && Array.isArray(this.group.fields)) {
      const fields = this.group.fields

      for (let i = 0; i < fields.length; i++) {
        if (fields[i] === this) {
          delete fields[i]
          fields.splice(i, 1)
        }
      }
    }
  }

  // 派生的控件子类内部适当位置调用
  _onValueChange() {
    const that = this
    this.oldValue = clone(this.currentValue)
    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    const changed = {
      name: this.props.name,
      oldValue: this.oldValue,
      newValue: this.currentValue,
    }

    setTimeout(function () {
      that._callHandler(that.props.onValueChange, changed)
      that.group && that.group._onValueChange(changed)
      isFunction(that._valueChange) && that._valueChange(changed)
      if (that.validateTriggered) {
        that._validate()
      }
    }, 0)
  }
}

Object.defineProperty(Field.prototype, 'fields', {
  get: function () {
    return this.control.getChildren()
  },
})

Component.register(Field)

export default Field
