import Component from '../Component/index'
import Textbox from '../Textbox/index'
import TimePickerPopup from './TimePickerPopup'

class TimePicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      allowClear: false,
      value: '06:06:06',
      format: 'HH:mm:ss',
      hourStep: 0,
      minuteStep: 0,
      secondStep: 0,
      readOnly: true,
      placeholder: null,
      showNow: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.defaultValue = this.props.value
    this.timeList = []

    this.confirm = false

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
    this.setProps({
      leftIcon: 'clock',
    })

    super._config()
  }

  _rendered() {
    const that = this
    this.popup = new TimePickerPopup({
      trigger: this.control,
      onHide: () => {
        if (this.confirm === false) {
          this.setValue(this.defaultValue)
          Object.keys(this.timeList).forEach(function (key) {
            that.timeList[key].resetTime()
          })
        }
      },
      onShown: () => {
        this.confirm = false
        Object.keys(this.timeList).forEach(function (key) {
          that.timeList[key].scrollToKey()
        })
      },
    })
  }

  getHour() {
    const hour = []
    if (this.props.hourStep) {
      hour.push({
        children: '00',
      })
      for (let i = 0; i < 24; i++) {
        if ((i + 1) % this.props.hourStep === 0 && i !== 23) {
          if (i < 9) {
            hour.push({
              key: `0${i + 1}`,
              children: `0${i + 1}`,
            })
          } else {
            hour.push({
              key: `${i + 1}`,
              children: `${i + 1}`,
            })
          }
        }
      }
      return hour
    }
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        hour.push({
          key: `0${i}`,
          children: `0${i}`,
        })
      } else {
        hour.push({
          key: `${i}`,
          children: `${i}`,
        })
      }
    }
    return hour
  }

  getMinute() {
    const minute = []
    if (this.props.minuteStep) {
      minute.push({
        children: '00',
      })
      for (let i = 0; i < 60; i++) {
        if ((i + 1) % this.props.minuteStep === 0 && i !== 59) {
          if (i < 9) {
            minute.push({
              key: `0${i + 1}`,
              children: `0${i + 1}`,
            })
          } else {
            minute.push({
              key: `${i + 1}`,
              children: `${i + 1}`,
            })
          }
        }
      }
      return minute
    }
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        minute.push({
          key: `0${i}`,
          children: `0${i}`,
        })
      } else {
        minute.push({
          key: `${i}`,
          children: `${i}`,
        })
      }
    }
    return minute
  }

  getSecond() {
    const second = []
    if (this.props.secondStep) {
      second.push({
        children: '00',
      })
      for (let i = 0; i < 60; i++) {
        if ((i + 1) % this.props.secondStep === 0 && i !== 59) {
          if (i < 9) {
            second.push({
              key: `0${i + 1}`,
              children: `0${i + 1}`,
            })
          } else {
            second.push({
              key: `${i + 1}`,
              children: `${i + 1}`,
            })
          }
        }
      }
      return second
    }
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        second.push({
          key: `0${i}`,
          children: `0${i}`,
        })
      } else {
        second.push({
          key: `${i}`,
          children: `${i}`,
        })
      }
    }
    return second
  }

  setTime(data) {
    this.time[data.type] = data.value

    const realTime = this.props.format
      .replace('HH', this.time.hour)
      .replace('mm', this.time.minute)
      .replace('ss', this.time.second)
    this.setValue(realTime)
  }

  clearTime() {
    this.setValue(undefined)
  }
}

Component.register(TimePicker)
export default TimePicker
