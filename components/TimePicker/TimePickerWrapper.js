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
            attrs: {
              style: {
                padding: '5px',
                'border-top': '1px solid #ddd',
              },
            },
            items: [
              {
                component: 'Button',
                size: 'small',
                text: '此刻',
                onClick: function () {
                  that.pickerControl.setNow()
                  that.pickerControl.confirm = true
                  that.pickerControl.popup.hide()
                  that.pickerControl.handleChange()
                },
              },
              {
                component: 'Button',
                type: 'Primary',
                size: 'small',
                text: '确定',
                onClick: function () {
                  that.pickerControl.confirm = true
                  that.pickerControl.popup.hide()
                  that.pickerControl.handleChange()
                  that.pickerControl.defaultValue = that.pickerControl.props.value
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
