import Component from '../Component/index'

class Anchor extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {}
}

Component.register(Anchor)

export default Anchor
