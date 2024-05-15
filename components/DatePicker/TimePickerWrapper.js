import Component from '../Component/index'
import DateTimePickerList from './TimePickerList'

class DateTimePickerWrapper extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.pickerControl = this.parent.parent.parent
  }

  _config() {
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
                classes: {
                  'nom-datepicker-time-overcont': true
                },
                hidden: !this.pickerControl.props.format.includes('HH'),
                children: {
                  component: DateTimePickerList,
                  type: 'hour',
                },
              },
              {
                classes: {
                  'nom-datepicker-time-overcont': true
                },
                hidden: !this.pickerControl.props.format.includes('mm'),
                children: {
                  component: DateTimePickerList,
                  type: 'minute',
                },
              },
              {
                classes: {
                  'nom-datepicker-time-overcont': true
                },
                hidden: !this.pickerControl.props.format.includes('ss'),
                children: {
                  component: DateTimePickerList,
                  type: 'second',
                },
              },
            ],
          },
        ],
      },
    })
  }
}

Component.register(DateTimePickerWrapper)
export default DateTimePickerWrapper
