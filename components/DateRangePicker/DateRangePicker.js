import Component from '../Component/index'
import Group from '../Group/index'

class DateRangePicker extends Group {
  constructor(props, ...mixins) {
    const defaults = {
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
      flatValue: true,
      required: false,
      requiredMessage: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
    } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'DatePicker',
          name: that.props.fieldName.start,
          placeholder: '开始日期',
          ref: (c) => {
            that.startPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          format,
          allowClear,
          minDate,
          maxDate,
          yearRange,
          showTime,
          required,
          requiredMessage,
          rules,
        },
        {
          component: 'StaticText',
          value: '-',
        },
        {
          component: 'DatePicker',
          name: that.props.fieldName.end,
          placeholder: '结束日期',
          ref: (c) => {
            that.endPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          format,
          allowClear,
          minDate,
          maxDate,
          yearRange,
          showTime,
          required,
          requiredMessage,
          rules,
        },
      ],
    })

    super._config()
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
        opposite.update({ minDate: active.getValue() })
        if (opposite.getValue() && opposite.getValue() < active.getValue()) {
          opposite.clearTime()
          opposite.focus()

          opposite.showPopup()
        } else if (!opposite.getValue()) {
          opposite.focus()

          opposite.showPopup()
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

Component.register(DateRangePicker)
export default DateRangePicker
