import Component from '../Component/index'

class AnchorContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      key: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _rendered() {
    const { key } = this.props

    this.element.classList.add(`nom-anchor-target-${key}`)
  }
}

Component.register(AnchorContent)

export default AnchorContent
