import Component from '../Component/index'
import { isNumeric } from '../util/index'

class SkeletonImage extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(SkeletonImage.defaults, props), ...mixins)
  }

  _config() {
    const width = isNumeric(this.props.width) ? `${this.props.width}px` : this.props.width
    const height = isNumeric(this.props.height) ? `${this.props.height}px` : this.props.height
    let fontSize = '2.5rem'
    if (width || height) {
      const num = Math.max(parseInt(width, 10), parseInt(height, 10))

      if (num > 200) {
        fontSize = '4rem'
      }
      if (num > 400) {
        fontSize = '5rem'
      }
    }

    this.setProps({
      attrs: {
        style: {
          width: width,
          height: height,
          fontSize: fontSize,
        },
      },
      children: {
        component: 'Icon',
        type: 'image',
      },
    })
  }
}

SkeletonImage.defaults = {
  width: null,
  height: null,
}

Component.register(SkeletonImage)

export default SkeletonImage
