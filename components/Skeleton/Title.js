import Component from '../Component/index'
import { isNumeric } from '../util/index'

class SkeletonTitle extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(SkeletonTitle.defaults, props), ...mixins)
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

SkeletonTitle.defaults = {}

Component.register(SkeletonTitle)

export default SkeletonTitle
