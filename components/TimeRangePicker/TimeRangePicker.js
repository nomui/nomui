import Component from '../Component/index'

class TimeRangePicker extends Component {
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
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    this.setProps({
      children: {
        component: 'Cols',
        items: [
          {
            component: 'TimePicker',
            type: 'start',
            ref: (c) => {
              that.startPicker = c
            },
            onChange: () => {
              that.endPicker.focus()
              that.endPicker.showPopup()
            },
          },
          {
            children: '~',
          },
          {
            component: 'TimePicker',
            type: 'end',
            ref: (c) => {
              that.endPicker = c
            },
            onChange: () => {
              that.handleChange()
            },
          },
        ],
      },
    })

    super._config()
  }

  handleChange() {
    const result = {
      start: this.startPicker.getValue(),
      end: this.endPicker.getValue(),
    }

    console.log(result)
  }
}

Component.register(TimeRangePicker)
export default TimeRangePicker
