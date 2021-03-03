import Component from '../Component/index'
import Group from '../Group/index'

class TimeRangePicker extends Group {
  constructor(props, ...mixins) {
    const defaults = {
      allowClear: false,
      value: null,
      format: 'HH:mm:ss',
      hourStep: 0,
      minuteStep: 0,
      secondStep: 0,
      readOnly: true,
      placeholder: null,
      showNow: true,
      onChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const { format, hourStep, minuteStep, secondStep, allowClear } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'TimePicker',
          name: 'start',
          ref: (c) => {
            that.startPicker = c
          },
          onChange: () => {
            that.endPicker.focus()
            that.endPicker.showPopup()
          },
          format,
          hourStep,
          minuteStep,
          secondStep,
          allowClear,
        },
        {
          component: 'StaticText',
          value: '-',
        },
        {
          component: 'TimePicker',
          name: 'end',
          ref: (c) => {
            that.endPicker = c
          },
          onChange: () => {
            that.handleChange()
          },
          format,
          hourStep,
          minuteStep,
          secondStep,
          allowClear,
        },
      ],
    })

    super._config()
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }
}

Component.register(TimeRangePicker)
export default TimeRangePicker
