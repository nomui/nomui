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
              },
              {
                component: 'Button',
                type: 'Primary',
                size: 'small',
                text: '确定',
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
