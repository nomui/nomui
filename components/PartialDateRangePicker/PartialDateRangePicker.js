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
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const { allowClear, minDate, maxDate, yearRange, mode } = this.props

    this.setProps({
      inline: true,
      fields: [
        {
          component: 'PartialDatePicker',
          name: that.props.fieldName.start,
          placeholder: '开始日期',
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
        },
        {
          component: 'StaticText',
          value: '-',
        },
        {
          component: 'PartialDatePicker',
          name: that.props.fieldName.end,
          placeholder: '结束日期',
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

Component.register(PartialDateRangePicker)
export default PartialDateRangePicker
