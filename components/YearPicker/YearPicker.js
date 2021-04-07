import Component from '../Component/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'

class YearPicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      disabledTime: null,
      yearRange: [50, 20],
      allowClear: true,
      onChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const { disabled } = this.props

    const that = this

    this.setProps({
      leftIcon: 'calendar',
      rightIcon: {
        component: 'Icon',
        type: 'times',
        hidden: !this.props.allowClear,
        onClick: (args) => {
          this.clearTime()
          args.event && args.event.stopPropagation()
        },
      },
      control: {
        disabled: disabled,
        popup: {
          _created: function () {
            that.popup = this
          },
          styles: {
            padding: '1',
          },
          onShow: () => {
            that.props.showTime && that.timePicker.onShow()
          },
          onHide: () => {
            that.onPopupHide()
          },
          classes: {
            'nom-date-picker-popup': true,
            'nom-date-picker-with-time': this.props.showTime,
          },
          triggerAction: 'click',

          children: '123',
        },
      },
    })

    super._config()
  }

  _getYears() {
    const years = []
    const thisYear = new Date().getFullYear()

    for (let i = thisYear + this.props.yearRange[1]; i > thisYear - this.props.yearRange[0]; i--) {
      years.push({
        text: i,
        value: i,
      })
    }

    return years
  }

  _disable() {
    super._disable()
    if (this.firstRender === false) {
      this.control.disable()
    }
  }

  _enable() {
    super._enable()
    if (this.firstRender === false) {
      this.control.enable()
    }
  }

  clearTime() {
    this.setValue(null)
  }

  _onBlur() {
    if (!Date.isValid(this.getValue(), this.props.format)) {
      this.input.setText(null)
    }
    super._onBlur()
  }
}

Component.register(YearPicker)

export default YearPicker
