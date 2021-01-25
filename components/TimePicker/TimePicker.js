import Field from '../Field/index'

class TimePicker extends Field {
  // constructor(props, ...mixins) {}

  _getTimeData(count) {
    const data = []
    for (let i = 0; i < count; i++) {
      let val = `${i}`
      if (i < 10) {
        val = `0${i}`
      }
      data.push({
        text: val,
        value: val,
      })
    }

    return data
  }
}

export default TimePicker
