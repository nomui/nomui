import Component from '../Component/index'
import { getValidValue } from '../Slider/helper.js'
import { isFunction, isNumeric } from '../util/index'
import RateStar from './RateStar'

class Rate extends Component {
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

  _created() {
    // const { value, defaultValue, count } = this.props
    // this.value = getValidValue(value || defaultValue, count)
    // console.log('🚀 ~ file: .value', this.value)
    super._created()
  }

  _config() {
    // const rateRef = this
    this._initValue()

    const children = this._getRateChildren()

    console.log('🚀 ~ file: Rate.js ~  ~ children', children)

    this.setProps({
      tag: 'ul',
      children,
      // control: {
      // children: {
      //   component: 'List',
      //   items: Array(count).map(() => ({
      //     text: count,
      //   })),
      //   itemDefaults: {
      //     _config: function () {
      //       this.setProps({
      //         children: '123',
      //       })
      //     },
      //   },
      // },

      // },
    })

    super._config()
  }

  _initValue() {
    const { value, defaultValue, count, allowHalf } = this.props
    // value值在 [0, count]之间
    this._value = getValidValue(value || defaultValue, count)

    if (!allowHalf) {
      this._value = Math.floor(this._value)
    }
    console.log('🚀 ~ file: Rate. _initValue ~ this._value', this._value)
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
    const _value = value === null ? 0 : value
    if (!isNumeric(_value) || _value < 0 || _value > this.props.max) return
    if (this._handler && _value !== this.oldValue) {
      this._offset = _value
      this._handler.update()
      this._track.update()

      super._onValueChange()
      this.oldValue = this.currentValue
      this.currentValue = _value
    }
  }

  _handleKeyDown(e) {
    const { keyCode } = e
    const value = this.getValue()
    if (keyCode === 38) {
      if (value <= this.props.max) {
        this.setValue(value + 1)
      }
    } else if (keyCode === 40) {
      if (value >= 0) {
        this.setValue(value - 1)
      }
    }
  }
}

Component.register(Rate)

export default Rate
