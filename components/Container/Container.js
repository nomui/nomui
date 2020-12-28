import Component from '../Component/index'

class Container extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      fluid: false,
      type: null,
    }

    super(Component.extendProps(defaults, props), mixins)
  }
}

Component.register(Container)

export default Container
