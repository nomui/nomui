import Component from '../Component/index'
// import { isPlainObject } from '../util'
import TimePickerWrapper from './TimePickerWrapper'

class TimePickerPanel extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      allowClear: true,
      value: null,
      format: 'HH:mm:ss',
      hourStep: 0,
      minuteStep: 0,
      secondStep: 0,
      readOnly: true,
      placeholder: null,
      showNow: true,
      minValue: '10:10:10',
      maxValue: '20:20:20',
      onValueChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.datePicker = this.parent.parent.parent.opener.parent.parent
    this.datePicker.timePicker = this

    this.defaultValue = this.props.value
    this.timeList = []

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
  }

  _config() {
    const that = this
    if (this.datePicker.props.showTime && this.datePicker.props.showTime !== true) {
      this.props = { ...this.props, ...this.datePicker.props.showTime }
    }

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

    this.setProps({
      children: {
        component: 'Rows',
        gutter: 'xs',
        items: [
          {
            classes: {
              'time-display': true,
            },

            ref: (c) => {
              that.timeText = c
            },
          },
          {
            component: TimePickerWrapper,
          },
        ],
      },
    })

    super._config()
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

  setValue(c) {
    this.timeText.update({ children: c })
    this.props.onValueChange && this._callHandler(this.props.onValueChange(this.time))
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
    this.defaultValue = result
  }

  resetList() {
    const that = this
    this.defaultValue = null
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].resetTime()
    })
    this.timeText.update({ children: '' })
  }

  onShown() {
    const that = this
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].scrollToKey()
    })
  }

  setNow() {
    const c = new Date().format('HH:mm:ss')
    const t = c.split(':')
    this.time.hour = t[0]
    this.time.minute = t[1]
    this.time.second = t[2]
    this.checkTimeRange()
    this.setValue(c.format(this.props.format))

    this.defaultValue = c

    this.empty = false
    this.resetList()
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  getDoubleDigit(num) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

  checkTimeRange() {
    const that = this

    if (that.time.hour <= that.minTime.hour) {
      that.timeRange.hour = [that.minTime.hour, that.maxTime.hour]
      that.timeRange.minute = [that.minTime.minute, '59']
      if (that.time.minute <= that.minTime.minute) {
        that.timeRange.second = [that.minTime.second, '59']
      } else {
        that.timeRange.second = ['00', '59']
      }
    } else if (that.time.hour >= that.maxTime.hour) {
      that.timeRange.minute = ['00', that.maxTime.minute]
      if (that.time.minute >= that.maxTime.minute) {
        that.timeRange.second = ['00', that.maxTime.second]
      } else {
        that.timeRange.second = ['00', '59']
      }
    } else {
      that.timeRange.minute = that.timeRange.second = ['00', '59']
    }

    this.empty = false
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].refresh()
    })
  }
}

Component.register(TimePickerPanel)
export default TimePickerPanel
