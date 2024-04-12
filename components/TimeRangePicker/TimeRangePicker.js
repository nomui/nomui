import Component from '../Component/index'
import Group from '../Group/index'

class TimeRangePicker extends Group {
  constructor(props, ...mixins) {
    super(Component.extendProps(TimeRangePicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const {
      format,
      hourStep,
      minuteStep,
      secondStep,
      allowClear,
      minTime,
      maxTime,
      required,
      requiredMessage,
      rules,
      startPickerProps,
      endPickerProps,
      disabled,
    } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'TimePicker',
          name: that.props.fieldName.start,
          ref: (c) => {
            that.startPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          format,
          hourStep,
          minuteStep,
          secondStep,
          allowClear,
          disabled,
          minTime,
          maxTime,
          required,
          requiredMessage,
          rules,
          ...startPickerProps,
        },
        {
          component: 'StaticText',
          value: '-',
        },
        {
          component: 'TimePicker',
          name: that.props.fieldName.end,
          ref: (c) => {
            that.endPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },

          format,
          hourStep,
          minuteStep,
          secondStep,
          allowClear,
          disabled,
          minTime,
          maxTime,
          required,
          requiredMessage,
          rules,
          ...endPickerProps,
        },
      ],
    })

    super._config()
  }

  _getValueText() {
    const val = this.getValue()
    return `${val[this.props.fieldName.start]} - ${val[this.props.fieldName.end]}`
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  checkRange(type) {
    const that = this
    const active = type === this.props.fieldName.start ? this.startPicker : this.endPicker
    const opposite = type === this.props.fieldName.start ? this.endPicker : this.startPicker

    if (active.getValue()) {
      if (active.name === that.props.fieldName.start) {
        opposite.update({ minTime: active.getValue() })
        if (opposite.getValue() && opposite.getValue() < active.getValue()) {
          opposite.clearTime()
          opposite.focus()

          opposite.showPopup()
        } else if (!opposite.getValue()) {
          opposite.focus()
          that.props.autoPopupEnd && opposite.showPopup()
        }
      } else if (opposite.getValue() && opposite.getValue() > active.getValue()) {
        opposite.clearTime()
      }
    }

    if (active.getValue() && opposite.getValue()) {
      that.handleChange()
    }
  }
}

TimeRangePicker.defaults = {
  allowClear: true,
  value: null,
  format: 'HH:mm:ss',
  hourStep: 0,
  minuteStep: 0,
  secondStep: 0,
  readonly: true,
  placeholder: null,
  autoPopupEnd: true,
  showNow: true,
  onChange: null,
  fieldName: {
    start: 'start',
    end: 'end',
  },
  flatValue: true,
  startPickerProps: {
    placeholder: '开始时间',
  },
  endPickerProps: {
    placeholder: '结束时间',
  },
}
Component.register(TimeRangePicker)
export default TimeRangePicker
