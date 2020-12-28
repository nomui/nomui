import Component from '../Component/index'
import ControlMixin from './ControlMixin'

class FieldControl extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      control: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.field = this.parent
  }

  _config() {
    this.setProps({
      control: {
        value: this.props.value,
      },
    })
    this.setProps({
      control: this.field.props.control,
    })

    this.setProps({
      children: function () {
        return {
          props: this.props.control,
          mixins: [ControlMixin],
        }
      },
    })
  }
}

Component.register(FieldControl)

export default FieldControl
