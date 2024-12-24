import Component from '../Component/index'
import Group from '../Group/index'

class DateRangePicker extends Group {
  constructor(props, ...mixins) {
    super(Component.extendProps(DateRangePicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const {
      format,
      allowClear,
      minDate,
      maxDate,
      yearRange,
      showTime,
      required,
      requiredMessage,
      rules,
      startPickerProps,
      endPickerProps,
      disabled,
      animate,
    } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'DatePicker',
          name: that.props.fieldName.start,
          ref: (c) => {
            that.startPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          animate,
          format,
          allowClear,
          minDate,
          maxDate,
          yearRange,
          showTime,
          required,
          requiredMessage,
          rules,
          disabled,
          ...startPickerProps,
        },
        {
          component: 'StaticText',
          value: '-',
        },
        {
          component: 'DatePicker',
          name: that.props.fieldName.end,
          ref: (c) => {
            that.endPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          animate,
          format,
          allowClear,
          minDate,
          maxDate,
          yearRange,
          showTime,
          required,
          requiredMessage,
          rules,
          disabled,
          ...endPickerProps,
        },
      ],
    })

    super._config()
  }

  triggerEdit() {
    this.startPicker.triggerEdit()
  }

  handleChange() {
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  _getValueText() {
    const val = this.getValue()
    return `${val[this.props.fieldName.start]} - ${val[this.props.fieldName.end]}`
  }

  checkRange(type) {
    const that = this
    const active = type === this.props.fieldName.start ? this.startPicker : this.endPicker
    const opposite = type === this.props.fieldName.start ? this.endPicker : this.startPicker

    if (active.getValue()) {
      if (active.name === that.props.fieldName.start) {
        opposite.update({ minDate: active.getValue() })
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
DateRangePicker.defaults = {
  format: 'yyyy-MM-dd',
  disabledTime: null,
  minDate: null,
  maxDate: null,
  yearRange: [50, 20],
  showTime: false,
  allowClear: true,
  onChange: null,
  fieldName: {
    start: 'start',
    end: 'end',
  },
  autoPopupEnd: true,
  flatValue: true,
  required: false,
  requiredMessage: null,
  startPickerProps: {
    placeholder: '开始日期',
  },
  endPickerProps: {
    placeholder: '结束日期',
  },
}
Component.register(DateRangePicker)
export default DateRangePicker
