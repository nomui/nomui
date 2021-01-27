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
    let data = this.input.getText()
    if (data === '') {
      return null
    }
    data = parseFloat(data).toFixed(this.props.precision)
    if (Number.isNaN(data)) {
      data = null
    }
    return data
  }
}

Component.register(Numberbox)

export default Numberbox
