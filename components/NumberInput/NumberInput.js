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
    if (!this.props.showSpinner) {
      return false
    }
    return {
      component: 'Component',
      classes: {
        'nom-number-input-controler': true,
      },
      disabled: this.props.disabled,
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
    this._setPrecision()
  }

  _setPrecision() {
    const { precision } = this.props
    let v = this.getValue()
    if (precision && precision > 0) {
      const n = parseFloat(v)
      v = n.toFixed(precision)
      this.lastValue = v
      this.currentValue = v
      this.setValue(v, { triggerChange: false })
    }
  }

  _checkValue() {
    const { min, max } = this.props
    let v = this.getValue()

    if (Number.isNaN(Number(v))) {
      this.setValue(this.lastValue, { triggerChange: false })
    }
    else {
      let shouldChange = false
      if (min && v < min) {
        v = min
        shouldChange = true
      }
      if (max && v > max) {
        v = max
        shouldChange = true
      }

      this.lastValue = v
      this.currentValue = v

      shouldChange && this.setValue(v, { triggerChange: false })
    }
  }



  _onPlus() {
    const { step, max } = this.props;
    let v = parseFloat(this.getValue({ asNumber: true })) || 0

    const decimalPlaces = (v.toString().split('.')[1] || '').length
    v += step
    v = parseFloat(v.toFixed(decimalPlaces))
    this.setValue((max && v > max) ? max : v)
    this._setPrecision()

  }

  _onMinus() {

    const { step, min } = this.props
    let v = parseFloat(this.getValue({ asNumber: true })) || 0

    const decimalPlaces = (v.toString().split('.')[1] || '').length
    v -= step
    v = parseFloat(v.toFixed(decimalPlaces))

    this.setValue((min && v < min) ? min : v)
    this._setPrecision()
  }

  _getValue(options) {
    if (!options) {
      options = {}
    }
    const text = this.input.getText()
    if (!text || !text.length) {
      return null
    }

    const value = this.parserFunc(text)


    if ((this.props.stringMode || (this.props.precision && this.props.precision > 0) || this.props.formatter) && !options.asNumber) {
      return value
    }
    return Number(value)
  }

  _setValue(value, options) {
    if (this.props.stringMode || this.props.formatter) {
      value = value ? `${value}` : ''
    }
    const { precision } = this.props

    this.currentValue = this.getValue()
    this.lastValue = this.currentValue
    value = this.formatterFunc(value)

    if (Number.isNaN(value)) {
      value = ''
    }


    if (precision && precision > 0) {
      const n = parseFloat(value)
      value = n.toFixed(precision)
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
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  showSpinner: true,
  stringMode: false,
  precision: -1,
  integerText: '请输入有效整数',
  precisionText: '请输入有效数字，且包含{{precision}}位小数',
  allowClear: false,
  formatter: null,
  parser: null
}
Component.register(NumberInput)

export default NumberInput
