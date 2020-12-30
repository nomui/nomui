import Component from '../Component/index'

class Collapse extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size']
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(Collapse)

export default Collapse
