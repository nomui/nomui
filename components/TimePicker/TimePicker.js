import Component from '../Component/index'
import Textbox from '../Textbox/index'
import TimePickerPopup from './TimePickerPopup'

class TimePicker extends Textbox {
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
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.defaultValue = this.props.value
    this.timeList = []

    this.confirm = false
    this.empty = !this.props.value

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
      rightIcon: {
        type: 'times',
        hidden: !this.props.allowClear,
        onClick: (args) => {
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
        if (this.confirm === false) {
          this.setValue(this.defaultValue)
          this.resetList()
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

  resetList() {
    const that = this
    Object.keys(this.timeList).forEach(function (key) {
      that.timeList[key].resetTime()
    })
  }

  clearTime() {
    this.setValue(null)
    this.empty = true
    this.defaultValue = null
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
    this.setValue(c)
    this.defaultValue = c
    const t = c.split(':')
    this.time.hour = t[0] || '00'
    this.time.minute = t[1] || '00'
    this.time.second = t[2] || '00'

    this.empty = false
    this.resetList()
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  showPopup() {
    this.popup.show()
  }
}

Component.register(TimePicker)
export default TimePicker
