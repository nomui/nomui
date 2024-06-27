import Component from '../Component/index'
// import { isPlainObject } from '../util'
import DateTimePickerWrapper from './TimePickerWrapper'

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
      onValueChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.datePicker = this.parent.parent.parent.opener.parent.parent
    this.datePicker.timePicker = this

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
    this.defaultValue = this.defaultValue || this.props.value
    if (this.datePicker.props.showTime && this.datePicker.props.showTime !== true) {
      this.props = { ...this.props, ...this.datePicker.props.showTime }
    }
    this._getMinTime()
    this._getMaxTime()
    this.timeRange = {
      hour: [this.minTime.hour, this.maxTime.hour],
      minute: ['00', '59'],
      second: ['00', '59'],
    }
    this._calcTimeRangeByTime()

    this.setProps({
      children: {
        component: 'Flex',
        rows: [
          {
            classes: {
              'time-display': true,
            },

            ref: (c) => {
              that.timeText = c
            },
          },
          {
            component: DateTimePickerWrapper,
          },
        ],
      },
    })
    super._config()
  }

  // 计算timeRange的min值
  _getMinTime() {
    const { startTime, minTime = '00:00:00' } = this.props
    // 比较 datePicker.minDate的time 和 showTime.minTime
    const _tempStartTime = new Date(`2020/01/01 ${startTime}`)
    const _tempMinTime = new Date(`2020/01/01 ${minTime}`)

    // startTime 不为默认 && startTime 比 minTime后面
    // 取后者
    const isStartTimeAfterMinTime = startTime !== '00:00:00' && _tempStartTime.isAfter(_tempMinTime)
    const time = isStartTimeAfterMinTime ? _tempStartTime : _tempMinTime
    this.minTime = {
      hour: this.getDoubleDigit(time.getHours()),
      minute: this.getDoubleDigit(time.getMinutes()),
      second: this.getDoubleDigit(time.getSeconds()),
    }
  }

  // 计算timeRange的max值
  _getMaxTime() {
    const { endTime, maxTime = '23:59:59' } = this.props
    // 比较 datePicker.minDate的time 和 showTime.maxTime
    const _tempEndTime = new Date(`2020/01/01 ${endTime}`)
    const _tempMaxTime = new Date(`2020/01/01 ${maxTime}`)
    // endTime 不为默认 && endTime 比 maxTime后面
    // 取更前面的时间节点
    const isEndTimeBeforeMaxTime = endTime !== '23:59:59' && _tempEndTime.isBefore(_tempMaxTime)
    const time = isEndTimeBeforeMaxTime ? _tempEndTime : _tempMaxTime
    this.maxTime = {
      hour: this.getDoubleDigit(time.getHours()),
      minute: this.getDoubleDigit(time.getMinutes()),
      second: this.getDoubleDigit(time.getSeconds()),
    }
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
    this.timeText && this.timeText.props && this.timeText.update({ children: c })
    this.defaultValue = c
    const t = c.split(':')
    this.time.hour = t[0] || '00'
    this.time.minute = t[1] || '00'
    this.time.second = t[2] || '00'
    this.resetList()
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
    this.defaultValue = result
  }

  resetList() {
    const that = this
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].resetTime()
    })
  }

  clearTime() {
    const that = this
    this.props.value = null
    this.defaultValue = null
    this.defaultTime = this.time = {
      hour: '00',
      minute: '00',
      second: '00',
    }

    this.timeText.update({
      children: '',
    })
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].resetTime()
    })
  }

  onShow() {
    this.timeText &&
      this.timeText.props &&
      this.timeText.update({
        children: this.defaultValue,
      })
    this.resetList()
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
    const beforeHourFlag = this._isHourOverRange
    const beforeMinuteFlag = this._isMinuteOverRange

    const { hour, minute, second } = this.timeRange
    const beforeTimeRangeStr = `${hour}-${minute}-${second}`
    this._calcTimeRangeByTime()

    this.empty = false

    // 比较 timeRange 是否发生变化
    const { hour: aHour, minute: aMinute, second: aSecond } = this.timeRange
    const afterTimeRangeStr = `${aHour}-${aMinute}-${aSecond}`

    let needRefreshList = []
    if (afterTimeRangeStr !== beforeTimeRangeStr) {
      needRefreshList = ['hour', 'minute', 'second']
    } else if (beforeHourFlag !== this._isHourOverRange) {
      needRefreshList = ['minute', 'second']
    } else if (beforeMinuteFlag !== this._isMinuteOverRange) {
      needRefreshList = ['second']
    }
    // 更新timeList的数据
    needRefreshList.forEach(function (key) {
      that.timeList[key].refresh()
    })
  }

  // 根据当前选择 time 更新计算得到真正的 timeRange
  // hour值在 min~max之间时, minute和second的range = ['00', '59']
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

Component.register(TimePickerPanel)
export default TimePickerPanel
