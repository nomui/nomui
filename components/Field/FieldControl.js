import Component, { n } from '../Component/index'
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
      children: this.props.control,
      childDefaults: n(null, null, null, [ControlMixin])
    })
  }
}

Component.register(FieldControl)

export default FieldControl
