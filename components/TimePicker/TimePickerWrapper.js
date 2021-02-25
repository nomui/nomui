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
    this.setProps({
      children: {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            gutter: null,
            classes: {
              'timepicker-group': true,
            },
            fills: true,
            align: 'start',
            items: [
              {
                component: TimePickerList,
                type: 'hour',
              },
              {
                component: TimePickerList,
                type: 'minute',
              },
              {
                component: TimePickerList,
                type: 'second',
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
