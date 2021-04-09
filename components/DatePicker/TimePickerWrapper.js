import Component from '../Component/index'
import TimePickerList from './TimePickerList'

class TimePickerWrapper extends Component {
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
        ],
      },
    })
  }
}

Component.register(TimePickerWrapper)
export default TimePickerWrapper
