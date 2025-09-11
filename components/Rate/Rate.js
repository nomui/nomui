import Component from '../Component/index'
import Field from '../Field/index'
import { getValidValue } from '../Slider/helper.js'
import { isFunction, isNumeric } from '../util/index'
import RateStar from './RateStar'

class Rate extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Rate.defaults, props), ...mixins)
  }

  _config() {
    this.rate = this
    const rateRef = this
    this._initValue()

    this.setProps({
      // RadioList,CheckboxList等div组件不为 focusable 元素
      // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
      attrs: { tabindex: this.props.tabindex || 0 },
      control: {
        children: {
          tag: 'ul',
          classes: {
            'nom-rate-content': true,
          },
          _created() {
            rateRef._content = this
          },
          _config() {
            const children = rateRef._getRateChildren()
            this.setProps({
              children: children,
            })
          },
          // children: children,
        },
      },
    })

    super._config()
  }

  _initValue() {
    const { value, count, allowHalf } = this.props
    // value值应在 [0, count]之间
    this.initValue = getValidValue(value, count)

    // 不允许半星则向下取取整
    if (!allowHalf) {
      this.initValue = Math.floor(this.initValue)
    }

    this.currentValue = this.initValue
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
          value: this.currentValue,
          index,
          tooltip: tooltips && tooltips.length && tooltips[index],
        }
      })
  }

  triggerEdit() {
    return false
  }

  handleValueChange(value) {
    this._setValue(value)
  }

  _getValue() {
    return this.tempValue
  }

  _setValue(value) {
    const _value = value === null ? 0 : value
    if (!isNumeric(_value) || _value < 0 || _value > this.props.count) return

    this.tempValue = _value
    if (_value !== this.oldValue) {
      super._onValueChange()
      this.oldValue = this.currentValue
      this.currentValue = _value
      this._content.update()
    }
  }
}
Rate.defaults = {
  allowClear: true,
  allowHalf: false,
  disable: false,
  rateIcon: '',
  value: null,
  disabled: false,
  count: 5,
  character: null,
  tooltips: null,
}
Component.register(Rate)

export default Rate
