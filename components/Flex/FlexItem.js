import Component from '../Component/index'

class FlexItem extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      grow: false,
      shrink: false,
      isBody: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['grow', 'shrink', 'isBody']

    const { span } = this.props

    if (span) {
      this.setProps({
        styles: {
          col: span,
        },
      })
    }
  }
}

Component.register(FlexItem)

export default FlexItem
