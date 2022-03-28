import Component from '../Component/index'

class AnchorContent extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(AnchorContent.defaults, props), ...mixins)
  }

  _rendered() {
    const { key } = this.props

    this.element.classList.add(`nom-anchor-target-${key}`)
  }
}

AnchorContent.defaults = {
  key: null,
}

Component.register(AnchorContent)

export default AnchorContent
