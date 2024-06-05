import Component from '../Component/index'

class AnchorContent extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(AnchorContent.defaults, props), ...mixins)
  }

  _rendered() {
    this.element.setAttribute('anchor-key', this.props[this.props.keyField])
  }
}

AnchorContent.defaults = {
  key: null,
  keyField: 'key'
}

Component.register(AnchorContent)

export default AnchorContent
