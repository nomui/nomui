import Component from '../Component/index'
import { isNumeric } from '../util/index'

class Image extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Image.defaults, props), ...mixins)
  }

  _config() {
    const { src } = this.props
    let { width, height } = this.props
    const size = this.sizeComputing(width, height)
    width = isNumeric(width) ? `${width}px` : width
    height = isNumeric(height) ? `${height}px` : height
    this.setProps({
      children: [
        {
          component: 'Icon',
          classes: {
            'nom-image-pending': true,
          },
          ref: (c) => {
            this.pendingRef = c
          },
          type: 'image-pending',
          attrs: {
            style: {
              width,
              height,
              'font-size': `${size}rem`,
            },
          },
        },
        {
          tag: 'img',
          ref: (c) => {
            this.imgRef = c
          },
          hidden: true,
          attrs: {
            src,
            style: {
              width,
              height,
            },
          },
        },
      ],
    })
  }

  sizeComputing(val1, val2) {
    val1 = val1 || 200
    val2 = val2 || 100
    if (val1 > val2) {
      return parseInt(val2 / 22, 10)
    }
    return parseInt(val1 / 22, 10)
  }

  _rendered() {
    const img = this.imgRef.element
    const that = this
    img.onload = img.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        that.pendingRef.remove()
        that.imgRef.show()
      }
    }
  }
}
Image.defaults = {
  src: null,
  width: null,
  height: null,
}

Component.register(Image)

export default Image
