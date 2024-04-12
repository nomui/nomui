import Component from '../Component/index'
import TimePickerList from './TimePickerList'

class TimePickerWrapper extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.parentPopup = this.parent.parent.parent
    this.pickerControl = this.parentPopup.pickerControl
  }

  _config() {
    const that = this
    const noStep =
      !that.pickerControl.props.hourStep &&
      !that.pickerControl.props.minuteStep &&
      !that.pickerControl.props.secondStep

    const nowInRange =
      (!(
        that.pickerControl.props.minTime &&
        that.pickerControl.props.minTime > new Date().format(that.pickerControl.props.format)
      ) &&
        !(
          that.pickerControl.props.maxTime &&
          that.pickerControl.props.maxTime < new Date().format(that.pickerControl.props.format)
        )) ||
      (!that.pickerControl.props.minTime && !that.pickerControl.props.maxTime)

    this.setProps({
      children: {
        component: 'Rows',
        gutter: null,
        items: [
          {
            component: 'Cols',
            gutter: null,
            classes: {
              'timepicker-group': true,
            },
            fills: true,
            align: 'stretch',
            children: [
              {
                hidden: !this.pickerControl.props.format.includes('HH'),
                children: {
                  component: TimePickerList,
                  type: 'hour',
                },
              },
              {
                hidden: !this.pickerControl.props.format.includes('mm'),
                children: {
                  component: TimePickerList,
                  type: 'minute',
                },
              },
              {
                hidden: !this.pickerControl.props.format.includes('ss'),
                children: {
                  component: TimePickerList,
                  type: 'second',
                },
              },
            ],
          },
          {
            component: 'Cols',
            justify: 'between',
            hidden: !that.pickerControl.defaultValue && !noStep,
            attrs: {
              style: {
                padding: '5px',
                'border-top': '1px solid #ddd',
              },
            },
            items: [
              noStep && {
                component: 'Button',
                size: 'small',
                text: that.pickerControl.props.nowText,
                disabled: !nowInRange,
                onClick: function () {
                  that.pickerControl.setNow()

                  that.pickerControl.popup.hide()
                  that.pickerControl.handleChange()
                },
              },
              that.pickerControl.props.defaultValue && {
                component: 'Button',
                size: 'small',
                text: that.pickerControl.props.resetText,
                onClick: function () {
                  that.pickerControl.popup.hide()
                  that.pickerControl.handleChange()
                  that.pickerControl.defaultValue = that.pickerControl.props.defaultValue
                },
              },
            ],
          },
        ],
      },
    })
  }
}

Component.register(TimePickerWrapper)
export default TimePickerWrapper
