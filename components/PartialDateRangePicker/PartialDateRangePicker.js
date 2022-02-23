import Component from '../Component/index'
import Group from '../Group/index'

class PartialDateRangePicker extends Group {
  constructor(props, ...mixins) {
    const defaults = {
      mode: 'year',
      minDate: null,
      maxDate: null,
      yearRange: [50, 20],
      allowClear: true,
      onChange: null,
      fieldName: {
        start: 'start',
        end: 'end',
      },
      autoPopupEnd: true,
      flatValue: true,
      startPickerProps: {
        placeholder: '开始日期',
      },
      endPickerProps: {
        placeholder: '结束日期',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const {
      allowClear,
      minDate,
      maxDate,
      yearRange,
      mode,
      required,
      requiredMessage,
      rules,
      startPickerProps,
      endPickerProps,
    } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'PartialDatePicker',
          name: that.props.fieldName.start,
          ref: (c) => {
            that.startPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          allowClear,
          minDate,
          maxDate,
          yearRange,
          mode,
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
          component: 'PartialDatePicker',
          name: that.props.fieldName.end,
          ref: (c) => {
            that.endPicker = c
          },
          onChange: function (args) {
            that.checkRange(args.sender.name)
          },
          allowClear,
          minDate,
          maxDate,
          yearRange,
          mode,
          required,
          requiredMessage,
          rules,
          ...endPickerProps,
        },
      ],
    })

    super._config()
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

Component.register(PartialDateRangePicker)
export default PartialDateRangePicker
