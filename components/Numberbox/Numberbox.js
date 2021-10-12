import Component from '../Component/index'
import Textbox from '../Textbox/index'

class Numberbox extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      min: null,
      max: null,
      precision: -1,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { precision = -1 } = this.props

    if (precision === -1) {
      this.rules.push({
        type: 'number',
      })
    }

    // 允许输入千分位加 , 的格式的数字
    if (this.props.precision === 0) {
      this.rules.push({
        type: 'regex',
        value: {
          pattern: /^-?(\d+|\d{1,3}(,\d{3})+)$/,
        },
        message: '请输入有效整数',
      })
    }

    if (this.props.precision > 0) {
      this.rules.push({
        type: 'regex',
        value: {
          // 在上面的规则的基础上添加了小数部分
          pattern: `^\\-?(\\d+|\\d{1,3}(,\\d{3})+)(\\.\\d{${this.props.precision}})$`,
        },
        message: `请输入有效 ${this.props.precision} 位小数`,
      })
    }

    if (this.props.min) {
      this.rules.push({
        type: 'min',
        value: this.props.min,
      })
    }
    if (this.props.max) {
      this.rules.push({
        type: 'max',
        value: this.props.max,
      })
    }

    super._config()
  }

  _getValue() {
    const { precision = -1 } = this.props

    let numberValue = null
    const textValue = this.input.getText().replaceAll(',', '')

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

  _setValue(value, options) {
    const { precision = -1 } = this.props

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

    super._setValue(value, options)
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
