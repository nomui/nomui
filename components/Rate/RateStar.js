import Component from '../Component/index'
import RateStarChild from './RateStarChild'

class RateStar extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      character: '',
      index: 0,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.rate = this.parent
  }

  _config() {
    const { value, index, character } = this.props
    const isFull = value >= index + 1
    const isZero = value <= index

    const rateIconProps = Component.normalizeIconProps('star')

    this.setProps({
      tag: 'li',
      classes: {
        'nom-rate-star-full': isFull,
        'nom-rate-star-half': !isFull && !isZero,
        'nom-rate-star-zero': isZero,
      },
      children: [
        {
          component: RateStarChild,
          classes: { 'nom-rate-star-first': true },
          children: character || rateIconProps,
          onClick: this.handleClickRateStarFirst.bind(this),
        },
        {
          component: RateStarChild,
          classes: { 'nom-rate-star-second': true },
          children: character || rateIconProps,
          onClick: this.handleClickRateStarSecond.bind(this),
        },
      ],
    })

    super._config()
  }

  // 点击设置半颗星
  handleClickRateStarFirst() {
    const { allowHalf } = this.rate.props
    const _newValue = this.props.index + (allowHalf ? 0.5 : 1)
    this._updateValue(_newValue)
  }

  // 点击设置整颗星
  handleClickRateStarSecond() {
    const _newValue = this.props.index + 1
    this._updateValue(_newValue)
  }

  _updateValue(newValue = 0) {
    if (this.rate.props.disabled) return
    const { allowClear } = this.rate.props
    const { value } = this.props

    // 不能清除 && 值相等 -> 不做更新操作
    if (!allowClear && newValue === value) return

    // 允许清除 && 值相等 -> newValue = 0
    if (allowClear && newValue === value) {
      newValue = 0
    }

    this.rate.update({
      value: newValue,
    })
  }
}

Component.register(RateStar)

export default RateStar
