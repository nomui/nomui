import Component from '../Component/index'
import Textbox from '../Textbox/index'
import TimePickerPopup from './TimePickerPopup'

class TimePicker extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(TimePicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.defaultValue = this.props.value
    this.timeList = []

    // this.confirm = false
    this.empty = !this.props.value

    this.minTime = {
      hour: '00',
      minute: '00',
      second: '00',
    }
    this.maxTime = {
      hour: '23',
      minute: '59',
      second: '59',
    }

    this.time = {
      hour: '00',
      minute: '00',
      second: '00',
    }

    if (this.props.value) {
      const t = this.props.value.split(':')
      this.time.hour = t[0] || '00'
      this.time.minute = t[1] || '00'
      this.time.second = t[2] || '00'
    }

    this.defaultTime = this.time

    this.hasPopup = false
  }

  _config() {
    if (this.props.minTime) {
      const time = new Date(`2000 ${this.props.minTime}`)

      this.minTime = {
        hour: this.getDoubleDigit(time.getHours()),
        minute: this.getDoubleDigit(time.getMinutes()),
        second: this.getDoubleDigit(time.getSeconds()),
      }
    }
    if (this.props.maxTime) {
      const time = new Date(`2000 ${this.props.maxTime}`)
      this.maxTime = {
        hour: this.getDoubleDigit(time.getHours()),
        minute: this.getDoubleDigit(time.getMinutes()),
        second: this.getDoubleDigit(time.getSeconds()),
      }
    }

    this.timeRange = {
      hour: [this.minTime.hour, this.maxTime.hour],
      minute: ['00', '59'],
      second: ['00', '59'],
    }
    this._calcTimeRangeByTime()

    this.setProps({
      leftIcon: 'clock',
      clearProps: {
        component: 'Icon',
        type: 'times',
        classes: {
          'nom-field-clear-handler': true,
        },
        hidden: !this.props.allowClear || this.props.disabled,
        onClick: (args) => {
          if (this.props.disabled) return false
          this.clearTime()
          args.event && args.event.stopPropagation()
        },
      },
    })

    super._config()
  }

  _rendered() {
    const that = this

    this.popup = new TimePickerPopup({
      trigger: this.control,
      onHide: () => {
        that.getValue() !== that.defaultValue && that.handleChange()
      },
      onShow: () => {
        this.defaultValue = this.props.value
        this.resetList()
      },
    })
  }

  getHour() {
    const hour = []
    if (this.props.hourStep) {
      hour.push({
        key: '00',
        children: '00',
      })
      for (let i = 0; i < 24; i++) {
        if ((i + 1) % this.props.hourStep === 0 && i !== 23) {
          hour.push({
            key: this.getDoubleDigit(i + 1),
            children: this.getDoubleDigit(i + 1),
          })
        }
      }
      return hour
    }
    for (let i = 0; i < 24; i++) {
      hour.push({
        key: this.getDoubleDigit(i),
        children: this.getDoubleDigit(i),
      })
    }
    return hour
  }

  getMinute() {
    const minute = []
    if (this.props.minuteStep) {
      minute.push({
        key: '00',
        children: '00',
      })
      for (let i = 0; i < 60; i++) {
        if ((i + 1) % this.props.minuteStep === 0 && i !== 59) {
          minute.push({
            key: this.getDoubleDigit(i + 1),
            children: this.getDoubleDigit(i + 1),
          })
        }
      }
      return minute
    }
    for (let i = 0; i < 60; i++) {
      minute.push({
        key: this.getDoubleDigit(i),
        children: this.getDoubleDigit(i),
      })
    }
    return minute
  }

  getSecond() {
    const second = []
    if (this.props.secondStep) {
      second.push({
        key: '00',
        children: '00',
      })
      for (let i = 0; i < 60; i++) {
        if ((i + 1) % this.props.secondStep === 0 && i !== 59) {
          second.push({
            key: this.getDoubleDigit(i + 1),
            children: this.getDoubleDigit(i + 1),
          })
        }
      }
      return second
    }
    for (let i = 0; i < 60; i++) {
      second.push({
        key: this.getDoubleDigit(i),
        children: this.getDoubleDigit(i),
      })
    }
    return second
  }

  setTime(data) {
    this.time[data.type] = data.value

    if (this.time.hour <= this.minTime.hour) {
      this.time.hour = this.minTime.hour
      if (this.time.minute <= this.minTime.minute) {
        this.time.minute = this.minTime.minute
      }
      if (this.time.minute <= this.minTime.minute) {
        if (this.time.second <= this.minTime.second) {
          this.time.second = this.minTime.second
        }
      }
    }
    if (this.time.hour >= this.maxTime.hour) {
      this.time.hour = this.maxTime.hour
      if (this.time.minute >= this.maxTime.minute) {
        this.time.minute = this.maxTime.minute
      }
      if (this.time.minute >= this.maxTime.minute) {
        if (this.time.second >= this.maxTime.second) {
          this.time.second = this.maxTime.second
        }
      }
    }
    this.checkTimeRange()
    const result = new Date(
      '2000',
      '01',
      '01',
      this.time.hour,
      this.time.minute,
      this.time.second,
    ).format(this.props.format)

    this.setValue(result)
    this.resetList()
  }

  clearTime() {
    this.setValue(null)
    this.empty = true

    this.time = {
      hour: '00',
      minute: '00',
      second: '00',
    }
    this.resetList()
    this.popup.hide()
  }

  setNow() {
    const c = new Date().format('HH:mm:ss')
    const t = c.split(':')
    this.time.hour = t[0]
    this.time.minute = t[1]
    this.time.second = t[2]
    this.checkTimeRange()
    this.setValue(c.format(this.props.format))

    this.empty = false
    this.resetList()
    this.popup.hide()
  }

  resetList() {
    const that = this
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].resetTime()
    })
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  _onBlur() {
    if (this.getValue() && !Date.isValid(this.getValue(), this.props.format)) {
      this.clearTime()
    }
    super._onBlur()
  }

  showPopup() {
    this.popup.show()
  }

  getDoubleDigit(num) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

  checkTimeRange() {
    const that = this
    const beforeHourFlag = this._isHourOverRange
    const beforeMinuteFlag = this._isMinuteOverRange

    const { hour, minute, second } = this.timeRange
    const beforeTimeRangeStr = `${hour}-${minute}-${second}`
    this._calcTimeRangeByTime()
    this.empty = false

    const { hour: aHour, minute: aMinute, second: aSecond } = this.timeRange
    const afterTimeRangeStr = `${aHour}-${aMinute}-${aSecond}`

    let needRefreshList = []
    // timeRange 发生变化, 所有list更新
    if (afterTimeRangeStr !== beforeTimeRangeStr) {
      needRefreshList = ['hour', 'minute', 'second']
    } else if (beforeHourFlag !== this._isHourOverRange) {
      // hourOverRange变化，分和秒更新
      needRefreshList = ['minute', 'second']
    } else if (beforeMinuteFlag !== this._isMinuteOverRange) {
      // minuteOverRange变化, 秒更新
      needRefreshList = ['second']
    }

    needRefreshList.forEach(function (key) {
      that.timeList[key].refresh()
    })
  }

  // 重新计算timeRange 和 overRange
  _calcTimeRangeByTime() {
    const { time, timeRange, minTime, maxTime } = this
    this._isHourOverRange = time.hour < minTime.hour || time.hour > maxTime.hour
    this._isMinuteOverRange =
      (time.hour === minTime.hour && time.minute < minTime.minute) ||
      (time.hour === maxTime.hour && time.minute > maxTime.minute)

    if (time.hour <= minTime.hour) {
      timeRange.hour = [minTime.hour, maxTime.hour]
      timeRange.minute = [minTime.minute, '59']
      if (time.minute <= minTime.minute) {
        timeRange.second = [minTime.second, '59']
      } else {
        timeRange.second = ['00', '59']
      }
    } else if (time.hour >= maxTime.hour) {
      timeRange.minute = ['00', maxTime.minute]
      if (time.minute >= maxTime.minute) {
        timeRange.second = ['00', maxTime.second]
      } else {
        timeRange.second = ['00', '59']
      }
    } else {
      timeRange.minute = timeRange.second = ['00', '59']
    }
  }
}

TimePicker.defaults = {
  allowClear: true,
  value: null,
  format: 'HH:mm:ss',
  hourStep: null,
  minuteStep: null,
  secondStep: null,
  readonly: false,
  restrictInput: true,
  placeholder: null,
  showNow: true,
  minTime: null,
  maxTime: null,
  nowText: '此刻',
  resetText: '重置',
}

Component.register(TimePicker)
export default TimePicker
