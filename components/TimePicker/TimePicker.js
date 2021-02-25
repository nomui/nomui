import Component from '../Component/index'
import Textbox from '../Textbox/index'
import TimePickerPopup from './TimePickerPopup'

class TimePicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      allowClear: false,
      value: null,
      format: 'HH:mm:ss',
      hourStep: 6,
      minuteStep: 15,
      inputReadOnly: true,
      placeholder: null,
      showNow: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    this.setProps({
      leftIcon: 'clock',
    })

    super._config()
  }

  _rendered() {
    this.popup = new TimePickerPopup({
      trigger: this.control,
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
          if (i < 10) {
            hour.push({
              children: `0${i + 1}`,
            })
          } else {
            hour.push({
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
          children: `0${i}`,
        })
      } else {
        hour.push({
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
          if (i < 10) {
            minute.push({
              children: `0${i + 1}`,
            })
          } else {
            minute.push({
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
          children: `0${i}`,
        })
      } else {
        minute.push({
          children: `${i}`,
        })
      }
    }
    return minute
  }

  getSecond() {
    const second = []
    for (let i = 0; i < 60; i++) {
      if (i < 10) {
        second.push({
          children: `0${i}`,
        })
      } else {
        second.push({
          children: `${i}`,
        })
      }
    }
    return second
  }

  // _getTimeData(count) {
  //   const data = []
  //   for (let i = 0; i < count; i++) {
  //     let val = `${i}`
  //     if (i < 10) {
  //       val = `0${i}`
  //     }
  //     data.push({
  //       text: val,
  //       value: val,
  //     })
  //   }

  //   return data
  // }
}

Component.register(TimePicker)
export default TimePicker
