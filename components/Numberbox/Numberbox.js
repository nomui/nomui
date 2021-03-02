import Component from '../Component/index'
import Textbox from '../Textbox/index'

class Numberbox extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      min: null,
      max: null,
      precision: 0,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const rules = []
    if (this.props.precision === 0) {
      rules.push({
        type: 'regex',
        value: {
          pattern: '^(\\-|\\+)?(0|[1-9][0-9]*)$',
        },
        message: '请输入整数',
      })
    }
    if (this.props.precision > 0) {
      rules.push({
        type: 'regex',
        value: {
          pattern: `^(\\-|\\+)?(0|[1-9][0-9]*)(\\.\\d{${this.props.precision}})$`,
        },
        message: `请输入 ${this.props.precision} 位小数`,
      })
    }
    if (this.props.min) {
      rules.push({
        type: 'min',
        value: this.props.min,
      })
    }
    if (this.props.max) {
      rules.push({
        type: 'max',
        value: this.props.max,
      })
    }

    this.setProps({ rules: rules })

    super._config()
  }

  _getValue() {
    const { precision } = this.props

    let numberValue = null
    const textValue = this.input.getText()

    if (precision) {
      const dotCount = this._dotCount(textValue)
      if (precision >= 0 && dotCount > precision) {
        numberValue = this._toDecimal(textValue, precision)
      } else {
        numberValue = parseFloat(textValue)
      }
    } else {
      numberValue = parseFloat(textValue)
    }

    if (Number.isNaN(numberValue)) {
      numberValue = null
    }

    return numberValue
  }

  _setValue(value) {
    const { precision } = this.props

    this.currentValue = this.getValue()

    if (precision !== null && precision !== undefined) {
      if (precision >= 0) {
        const dotCount = this._dotCount(value)
        if (dotCount > precision) {
          value = this._toDecimal(value, precision)
        }
      }
    }

    if (Number.isNaN(value)) {
      value = ''
    }

    super._setValue(value)
  }

  _toDecimal(val, precision, notRound) {
    if (notRound === undefined) {
      notRound = false
    }
    let f = parseFloat(val)
    if (Number.isNaN(f)) {
      return
    }
    if (notRound === true) {
      f = Math.floor(val * 10 ** precision) / 10 ** precision
    } else {
      f = Math.round(val * 10 ** precision) / 10 ** precision
    }
    return f
  }

  _dotCount(val) {
    val = String(val)
    const dotPos = val.indexOf('.')
    const len = val.substr(dotPos + 1).length

    return len
  }

  _getRawValue() {
    return this.input.getText()
  }
}

Component.register(Numberbox)

export default Numberbox
