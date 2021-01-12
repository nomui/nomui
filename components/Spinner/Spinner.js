import Component from '../Component/index'

class Spinner extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      spinning: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { spinning } = this.props

    this.setProps({
      classes: {
        'p-type-border': spinning,
      },
    })
  }
}

Component.register(Spinner)

export default Spinner
