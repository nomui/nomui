import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'
import { CSS_PREFIX, formatDecimal } from './helper'

class Statistic extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      groupSeparator: ',',
      decimalSeparator: '.',
      precision: 0,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const statisticRef = this
    const {
      title,
      value,
      precision,
      groupSeparator,
      decimalSeparator,
      formatter,
      prefix,
      suffix,
    } = this.props

    // 非数字则不格式化了
    let formatValue = decimalSeparator ? value.replace(decimalSeparator, '.') : value

    if (isNumeric(formatValue)) {
      formatValue = isFunction(formatter)
        ? formatter(value)
        : formatDecimal(Number(formatValue).toFixed(precision), groupSeparator, decimalSeparator)
    }

    const content = []

    prefix &&
      content.push({
        tag: 'span',
        _created() {
          statisticRef.prefixRef = this
        },
        classes: { [`${CSS_PREFIX}content-prefix`]: true },
        children: prefix,
      })

    value &&
      content.push({
        tag: 'span',
        _created() {
          statisticRef.valueRef = this
        },
        classes: { [`${CSS_PREFIX}content-value`]: true },
        children: formatValue,
      })

    suffix &&
      content.push({
        tag: 'span',
        _created() {
          statisticRef.suffixRef = this
        },
        classes: { [`${CSS_PREFIX}content-suffix`]: true },
        children: suffix,
      })

    this.setProps({
      children: [
        {
          _created() {
            statisticRef.captionRef = this
          },
          classes: { [`${CSS_PREFIX}title`]: true },
          children: title,
        },
        {
          classes: { 'nom-statistic-content': true },
          children: content,
        },
      ],
    })
  }
}

Component.register(Statistic)

export default Statistic
