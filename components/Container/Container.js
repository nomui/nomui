import Component from '../Component/index'

class Container extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Container.defaults, props), mixins)
  }

  _config() {
    this._addPropStyle('breakpoint', 'fluid')
  }
}
Container.defaults = {
  fluid: false,
  // type: null,
  breakpoint: null,
}
Component.register(Container)

export default Container
