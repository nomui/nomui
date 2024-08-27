import Component from '../Component/index'
import Textbox from '../Textbox/index'
import { isNullish } from '../util/index'

class NumberInput extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(NumberInput.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.lastValue = this.props.value
  }

  _config() {

    this._setFormatter()

    this.setProps({
      button: this._getControls(),

    })


    super._config()
  }


  _setFormatter() {
    const { formatter, parser } = this.props
    if (!formatter) {
      this.formatterFunc = (value) => {
        return value
      }
    }
    else {
      this.formatterFunc = formatter
    }
    if (!parser) {
      this.parserFunc = (value) => {
        return value
      }
    }
    else {
      this.parserFunc = parser
    }
  }

  _onValueChange() {

    const text = this.parserFunc(this.getText())

    const newText = `${this.formatterFunc(text)}`
    this.input.setText(newText)

    if (this.getValue() !== this.oldValue) {

      this._callHandler(this.props.onValueChange, { name: this.props.name, oldValue: this.oldValue, newValue: text, })
      this.oldValue = text
    }


  }

  _getControls() {
    return {
      component: 'Component',
      classes: {
        'nom-number-input-controler': true
      },
      children: {
        component: 'Flex',
        direction: 'column',
        fit: true,
        items: [
          {
            classes: {
              'nom-number-input-controler-button': true
            },
            children: {
              component: 'Icon',
              type: 'up',
            },
            onClick: ({ event }) => {
              event.stopPropagation()
              this._onPlus()
            }
          },
          {
            classes: {
              'divider': true
            },
            children: ''
          },
          {
            classes: {
              'nom-number-input-controler-button': true
            },
            children: {
              component: 'Icon',
              type: 'down'
            },
            onClick: ({ event }) => {
              event.stopPropagation()
              this._onMinus()
            }
          }
        ]
      }
    }
  }

  _onBlur() {
    this._checkValue()
  }

  _checkValue() {
    const v = this.getValue()
    if (Number.isNaN(Number(v))) {
      this.setValue(this.lastValue, { triggerChange: false })
    }
    else {
      this.lastValue = v
      this.currentValue = v
    }
  }



  _onPlus() {
    const { step, max } = this.props;
    let v = parseFloat(this.getValue({ asNumber: true })) || 0

    const decimalPlaces = (v.toString().split('.')[1] || '').length
    v += step
    v = parseFloat(v.toFixed(decimalPlaces))
    this.setValue((max && v > max) ? max : v)


  }

  _onMinus() {

    const { step, min } = this.props
    let v = parseFloat(this.getValue({ asNumber: true })) || 0

    const decimalPlaces = (v.toString().split('.')[1] || '').length
    v -= step
    v = parseFloat(v.toFixed(decimalPlaces))

    // 设置值，确保不会低于min
    this.setValue((min && v < min) ? min : v)
  }

  _getValue(opions) {
    if (!opions) {
      opions = {}
    }
    const text = this.input.getText()
    if (!text || !text.length) {
      return null
    }

    const value = this.parserFunc(text)


    if (this.props.stringMode && !opions.asNumber) {
      return value
    }
    return Number(value)
  }

  _setValue(value, options) {
    if (this.props.stringMode || this.props.formatter) {
      value = `${value}`
    }
    const { precision = -1 } = this.props

    this.currentValue = this.getValue()

    value = this.formatterFunc(value)

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
    if (isNullish(val)) return null

    if (notRound === undefined) {
      notRound = false
    }
    let f = parseFloat(val)
    if (Number.isNaN(f)) {
      return
    }
    if (notRound === true) {
      f = Math.floor(val * Math.pow(10, 2)) / Math.pow(10, 2)
    } else {
      f = Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2)
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
NumberInput.defaults = {
  step: 1,
  min: null,
  max: null,
  stringMode: false,
  precision: -1,
  maxPrecision: null,
  limitInput: false,
  maxPrecisionText: '请输入有效数字，且最多包含{{maxPrecision}}位小数',
  integerText: '请输入有效整数',
  precisionText: '请输入有效数字，且包含{{precision}}位小数',
  allowClear: false
}
Component.register(NumberInput)

export default NumberInput
