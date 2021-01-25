import Component from '../Component/index'
import { isFunction, clone } from '../util/index'
import FieldContent from './FieldContent'
import FieldLabel from './FieldLabel'
import Tooltip from '../Tooltip/index'
import RuleManager from '../util/rule-manager'

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
    this.currentValue = null
    this.name = name || `__field${++nameSeq}`
    this.group = this.props.__group || null
    this.fields = []
    if (this.group) {
      this.group.fields.push(this)
    }
  }

  _config() {
    this._addPropStyle('required', 'requiredMark', 'labelAlign')
    const { label, span, type, notShowLabel, required, requiredMessage, rules } = this.props
    const showLabel = notShowLabel === false && (label !== undefined && label !== null)

    if (required === true) {
      rules.unshift({ type: 'required', message: requiredMessage })
    }

    if (showLabel === false) {
      this.props.labelAlign = null
    }

    if (span) {
      this.setProps({
        styles: {
          col: span,
        },
      })
    }

    if (type === 'Group') {
      this._addPropStyle('inline', 'striped', 'line')
    }

    this.setProps({
      children: [
        showLabel && { component: FieldLabel },
        { component: FieldContent, value: this.props.value },
      ],
    })
  }

  getValue() {
    const value = isFunction(this._getValue) ? this._getValue() : null
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
    const { rules } = this.props
    if (Array.isArray(rules) && rules.length > 0) {
      const validationResult = RuleManager.validate(rules, this.getValue())

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

  _reset() {
    this.setValue(this.initValue)
  }

  _clear() {
    this.setValue(null)
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
      this.group && this.group._onValueChange(changed)
      isFunction(that._valueChange) && that._valueChange(changed)
      if (that.validateTriggered) {
        that._validate()
      }
    }, 0)
  }
}

Component.register(Field)

export default Field
