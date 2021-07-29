import Component from '../Component/index'
import Field from '../Field/index'
import { getValidValue } from '../Slider/helper.js'
import { isFunction } from '../util/index'
import RateStar from './RateStar'

class Rate extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      allowClear: true,
      allowHalf: false,
      disable: false,
      rateIcon: '',
      defaultValue: 0,
      value: null,
      disabled: false,
      count: 5,
      character: null,
      tooltips: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._initValue()

    const children = this._getRateChildren()

    this.setProps({
      control: {
        tag: 'ul',
        children,
      },
    })

    super._config()
  }

  _initValue() {
    const { value, defaultValue, count, allowHalf } = this.props
    // value值应在 [0, count]之间
    this._value = getValidValue(value || defaultValue, count)

    // 不允许半星则向下取取整
    if (!allowHalf) {
      this._value = Math.floor(this._value)
    }
  }

  _getRateChildren() {
    const { count, character, tooltips } = this.props
    return Array(count)
      .fill()
      .map((item, index) => {
        let char = character
        if (isFunction(character)) {
          char = character({ index })
        }
        return {
          component: RateStar,
          character: char,
          value: this._value,
          index,
          tooltip: tooltips && tooltips.length && tooltips[index],
        }
      })
  }

  _getValue() {
    return this.props.value
  }

  _setValue(value) {
    this.update({ value })
  }
}

Component.register(Rate)

export default Rate
