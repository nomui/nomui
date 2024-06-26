import Component from '../Component/index'
import Field from '../Field/index'
import Input from '../Textbox/Input'
import { isFunction, isNumeric } from '../util/index'
import {
  COMMA_REG,
  SPINNER_POSITION,
  STYLE,
  currencyToValue,
  isNil,
  precentToValue,
} from './helper'

class NumberSpinner extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(NumberSpinner.defaults, props), ...mixins)
    this._handleSpinnerIcon = this._handleSpinnerIcon.bind(this)
  }

  _config() {
    const numberSpinner = this
    const rules = this._handleRules()

    this.setProps({ rules })

    const {
      placeholder,
      precision,
      min,
      max,
      align,
      showSpinner,
      component: com,
      reference,
      tag,
      ref,
      style,
      value,
      formatter,
      parser,
      ...otherProps
    } = this.props

    numberSpinner._initNumberFormat()

    const { left, right, horizontal } = SPINNER_POSITION

    const inputProps = {
      component: Input,
      name: 'input',
      ...otherProps,
      // value: isFunction(formatter) ? formatter(value) : numberSpinner._formatter.format(value),
      value: value === null ? null : numberSpinner._format(value),
      _created() {
        this.textbox = numberSpinner
        this.textbox.input = this
      },
      classes: {
        'spinner-input-with-left-icon': align === left && showSpinner === true,
        'spinner-input-with-right-icon': align === right && showSpinner === true,
        'spinner-input-with-double-icon': align === horizontal && showSpinner === true,
      },
      attrs: {
        placeholder,
        onkeydown(key) {
          if (key.keyCode === 38) {
            key.preventDefault()
            numberSpinner._handlePlus()
          } else if (key.keyCode === 40) {
            key.preventDefault()
            numberSpinner._handleMinus()
          }
        },
        onfocus() {
          const txt = this.value
          if (txt) {
            this.selectionStart = this.value.length
            this.selectionEnd = this.value.length
          }
        },
        onchange() {
          const v = this.value.replace(COMMA_REG, '')

          // 如果输入的内容不能解析为数字则不进行转化
          if (!isNumeric(v)) return

          const formatterStr = isFunction(formatter) ? formatter(v) : numberSpinner._format(v)

          numberSpinner.isChange = true

          numberSpinner.setValue(formatterStr)
        },
      },
    }

    const spinner = numberSpinner._handleSpinnerIcon()

    this.setProps({
      control: {
        children: [...this._getLeftSpinner(), inputProps, ...spinner],
      },
    })

    super._config()
  }

  _getFormatValue() {
    const text = this.getText()
    if (text === '') return null

    const { min, max } = this._getLimit()
    const { precision, parser } = this.props

    if (isFunction(parser)) return parser(text)

    let parseString = text.toString()

    if (this.props.style === STYLE.PERCENT) parseString = parseString.replace(/%$/, '')
    if (this.props.style === STYLE.CURRENCY) parseString = parseString.replace(/^\D*/, '')
    parseString = parseString.replace(COMMA_REG, '')

    if (!isNumeric(parseString)) return null

    const value = Number(parseString).toFixed(precision)

    if (value > max) return max
    if (value < min) return min

    return value
  }

  _getValue() {
    const t = this.getText()
    if (t === '') {
      return null
    }
    return t
  }

  _setValue(value) {
    if (this.isChange) {
      this.input && this.input.setText(value)
      this.isChange = false
      return
    }
    const { max, min } = this._getLimit()

    if (value > max) {
      value = max
    } else if (value < min) {
      value = min
    }

    const formatValue = value === null ? value : this._format(value)
    this.input && this.input.setText(formatValue)
  }

  getText() {
    return this.input.getText()
  }

  getValueText() {
    return this.input.getText()
  }

  focus() {
    this.input.focus()
  }

  blur() {
    this.input.blur()
  }

  _disable() {
    this.input.disable()
  }

  _enable() {
    this.input.enable()
  }

  _onBlur() {
    this._callHandler(this.props.onBlur)
  }

  _handleRules() {
    const { precision } = this.props
    const rules = []

    if (precision === -1) rules.push({ type: 'number' })

    if (precision === 0) {
      rules.push({
        type: 'regex',
        value: {
          pattern: '^(\\-|\\+)?(0|[1-9][0-9]*)$',
        },
        message: this.props.integerText,
      })
    }

    if (this.props.precision > 0) {
      const str = this.props.precisionText.replace('{{precision}}', this.props.precision)
      rules.push({
        type: 'regex',
        value: {
          pattern: `^(\\-|\\+)?(0|[1-9][0-9]*)(\\.\\d{${this.props.precision}})$`,
        },
        message: str,
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

    return rules
  }

  _getLeftSpinner() {
    const { align, showSpinner, simple } = this.props
    if (showSpinner === false) return []

    const numberSpinner = this


    if (align === 'left') {
      return [
        {
          // tag: 'span',
          _created(c) {
            numberSpinner.iconContainer = c
          },
          classes: {
            [`nom-textbox-${align}-icon-container`]: true,
            'nom-number-spinner-vertical-trigger': true
          },
          children: [
            {
              component: 'Icon',
              type: simple ? 'up' : 'minus',
              styles: {
                flex: 'grow',
              },
              onClick(args) {
                numberSpinner._handlePlus(args)
              },
            },
            {
              component: 'Icon',
              type: simple ? 'down' : 'plus',
              styles: {
                flex: 'grow',
              },
              onClick(args) {
                numberSpinner._handleMinus(args)
              },
            },
          ],
        }
      ]
    }

    if (align === 'horizontal') {
      return [{
        component: 'Icon',
        type: simple ? 'down' : 'minus',
        classes: {
          'nom-textbox-left-icon-container': true,
          'nom-textbox-right-icon-container-large': !simple
        },
        onClick(args) {
          numberSpinner._handleMinus(args)
        },
      }]
    }
    return []
  }

  _handleSpinnerIcon() {
    const { align, showSpinner, simple } = this.props
    if (showSpinner === false) return []

    const numberSpinner = this


    if (align === 'right') {
      return [
        {
          // tag: 'span',
          _created(c) {
            numberSpinner.iconContainer = c
          },
          classes: {
            [`nom-textbox-${align}-icon-container`]: true,
            'nom-number-spinner-vertical-trigger': true
          },
          children: [
            {
              component: 'Icon',
              type: simple ? 'up' : 'minus',
              styles: {
                flex: 'grow',
              },
              onClick(args) {
                numberSpinner._handlePlus(args)
              },
            },
            {
              component: 'Icon',
              type: simple ? 'down' : 'plus',
              styles: {
                flex: 'grow',
              },
              onClick(args) {
                numberSpinner._handleMinus(args)
              },
            },
          ],
        },
      ]
    }

    if (align === 'horizontal') {
      return [{
        component: 'Icon',
        type: simple ? 'up' : 'plus',
        classes: {
          'nom-textbox-right-icon-container': true,
          'nom-textbox-right-icon-container-large': !simple
        },
        onClick(args) {
          numberSpinner._handlePlus(args)
        },
      }]
    }

    return []
  }

  _isFocus() {
    if (!this.input) return false
    return document.activeElement === this.input.element
  }

  _handlePlus(args) {
    if (this.props.disabled) return
    if (args) {
      const { event } = args
      if (event) {
        event.preventDefault && event.preventDefault()
        event.stopPropagation && event.stopPropagation()
      }
    }

    let { step } = this.props
    const { style, parser } = this.props
    const { max } = this._getLimit()

    if (!isNumeric(step)) {
      step = 1
    } else {
      step = Number(step)
    }

    let value = this._getFormatValue()
    if (isNil(value)) {
      value = 0
    }
    value = Number(value)

    if (!this._formatter) this._initNumberFormat()
    const result = value + step
    const displayValue = this._format(result)

    let newValue = ''

    if (isFunction(parser)) {
      newValue = parser(displayValue)
    } else if (style === STYLE.CURRENCY) {
      newValue = currencyToValue(displayValue)
    } else if (style === STYLE.PERCENT) {
      // newValue = Number(displayValue.replace(COMMA_REG, ''))
      newValue = precentToValue(displayValue)
    } else {
      newValue = Number(displayValue.replace(COMMA_REG, ''))
    }

    if (newValue > max) {
      this.setValue(max)
    } else {
      this.setValue(newValue)
      if (isFunction(this.props.onStep))
        this.props.onStep(this.getValue(), { offset: step, type: 'plus' })
    }

    !this._isFocus() && this.focus()
  }

  _handleMinus(args) {
    if (this.props.disabled) return
    if (args) {
      const { event } = args
      if (event) {
        event.preventDefault && event.preventDefault()
        event.stopPropagation && event.stopPropagation()
      }
    }

    let { step } = this.props
    const { style, parser } = this.props
    const { min } = this._getLimit()

    if (!isNumeric(step)) {
      step = 1
    } else {
      step = Number(step)
    }

    let value = this._getFormatValue()
    if (isNil(value)) {
      value = 0
    }
    value = Number(value)

    if (!this._formatter) this._initNumberFormat()
    // currency 格式化之后不是数字了
    let result = value - step
    if (result < 0 && style !== 'decimal') {
      result = 0
    }
    const displayValue = this._format(result)

    let newValue = ''

    if (isFunction(parser)) {
      newValue = parser(displayValue)
    } else if (style === STYLE.CURRENCY) {
      newValue = currencyToValue(displayValue)
    } else if (style === STYLE.PERCENT) {
      newValue = precentToValue(displayValue)
    } else {
      newValue = Number(displayValue.replace(COMMA_REG, ''))
    }

    if (newValue < min) {
      this.setValue(min)
    } else {
      this.setValue(newValue)
      if (isFunction(this.props.onStep))
        this.props.onStep(this.getValue(), { offset: step, type: 'minus' })
    }

    !this._isFocus() && this.focus()
  }

  _getLimit() {
    let { max, min } = this.props
    const { style } = this.props

    if (isNil(max) || !isNumeric(max)) {
      max = style === STYLE.PERCENT ? 100 : Number.MAX_SAFE_INTEGER
    }

    if (isNil(min) || !isNumeric(min)) {
      min = style === STYLE.PERCENT ? 0 : Number.MIN_SAFE_INTEGER
    }

    return { max, min }
  }

  _initNumberFormat() {
    const { formatter, precision, style, currency } = this.props

    // 如果用户提供了自定义的formatter，就不用内置的formatter了
    if (isFunction(formatter)) {
      this._format = formatter
      return
    }

    if (style !== STYLE.CURRENCY) {
      this._formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: precision,
      })

      if (style === STYLE.DECIMAL) {
        this._format = this._formatter.format
      } else if (style === STYLE.PERCENT) {
        this._format = function (value) {
          return `${this._formatter.format(value)}%`
        }
      }
    } else {
      this._formatter = new Intl.NumberFormat(undefined, {
        style: STYLE.CURRENCY,
        currency,
        minimumFractionDigits: precision,
      })

      this._format = this._formatter.format
    }
  }
}

NumberSpinner.defaults = {
  // min: Number.MIN_SAFE_INTEGER,
  // max: Number.MAX_SAFE_INTEGER,
  min: null,
  max: null,
  precision: 0,
  formatter: null,
  parser: null,
  step: 1,
  showSpinner: true,
  align: 'right',
  simple: true,

  // decimal,currency,percent
  style: STYLE.DECIMAL,
  currency: 'CNY',
  integerText: '请输入有效整数',
  precisionText: '请输入有效数字，且包含{{precision}}位小数'
}

Component.register(NumberSpinner)

export default NumberSpinner
