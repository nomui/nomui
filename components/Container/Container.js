import Component from '../Component/index'

class Container extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      fluid: false,
      // type: null,
      breakpoint: null,
    }

    super(Component.extendProps(defaults, props), mixins)
  }

  _config() {
    this._addPropStyle('breakpoint', 'fluid')
  }
}

Component.register(Container)

export default Container
