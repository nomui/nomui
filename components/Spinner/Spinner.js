import Component from '../Component/index'

class Spinner extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Spinner.defaults, props), ...mixins)
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

Spinner.defaults = {
  spinning: true,
}

Component.register(Spinner)

export default Spinner
