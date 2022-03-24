import Component from '../Component/index'
import Statistic from '../Statistic/index'
import {} from '../util/date'
import { isDate, isFunction, isNumeric } from '../util/index'
import { formatTimeStr } from './helper'

class Countdown extends Statistic {
  constructor(props, ...mixins) {
    super(Component.extendProps(Countdown.defaults, props), ...mixins)
  }

  _created() {
    this._interval = null
  }

  _config() {
    const countdownRef = this
    this._handleDeadLine()
    this.setProps({ value: countdownRef._flashCountdown(this.props.format) })
    super._config()
  }

  _rendered() {
    // start timer
    this._startCountdown()
  }

  _remove() {
    clearInterval(this._interval)
    this._interval = undefined
  }

  _handleDeadLine() {
    const { value } = this.props
    let deadline = 0
    if (isDate(value)) {
      deadline = value.getTime()
    } else if (isNumeric(value)) {
      deadline = new Date(value).getTime()
    }
    this._deadline = deadline
  }

  _startCountdown() {
    const countdownRef = this
    const { interval, format } = this.props
    if (this._interval || !isNumeric(interval)) return

    this._interval = setInterval(() => {
      if (countdownRef._deadline < Date.now()) countdownRef._stopCountdown()
      countdownRef.valueRef.element.innerHTML = countdownRef._flashCountdown(format)
    }, interval)
  }

  _stopCountdown() {
    const { onComplete } = this.props
    if (this._interval) {
      clearInterval(this._interval)
      this._interval = undefined

      // const timestamp = getTimestamp(value)
      if (isFunction(onComplete) && this._deadline < Date.now()) {
        onComplete()
      }
    }
  }

  _flashCountdown(format) {
    const diff = Math.max(this._deadline - Date.now(), 0)
    return formatTimeStr(diff, format)
  }
}
Countdown.defaults = {
  format: 'HH:mm:ss',
  interval: 3000,
}
Component.register(Countdown)

export default Countdown
