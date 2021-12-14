import Component from '../Component/index'
import { isNumeric } from '../util/index'

class SkeletonTitle extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const width = isNumeric(this.props.width) ? `${this.props.width}px` : this.props.width
    this.setProps({
      attrs: {
        style: {
          width: width,
          maxWidth: width,
        },
      },
    })
  }
}

Component.register(SkeletonTitle)

export default SkeletonTitle
