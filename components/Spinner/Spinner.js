import Component from '../Component/index'

class Spinner extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      type: 'border',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }
}

Component.register(Spinner)

export default Spinner
