import Component from '../Component/index'

class AnchorContent extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(AnchorContent.defaults, props), ...mixins)
  }

  _rendered() {
    const { key } = this.props
    this.element.setAttribute('anchor-key', key)
  }
}

AnchorContent.defaults = {
  key: null,
}

Component.register(AnchorContent)

export default AnchorContent
