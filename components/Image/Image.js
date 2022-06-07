import Component from '../Component/index'

class Image extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Image.defaults, props), ...mixins)
  }

  _config() {
    const { src, width, height, size } = this.props
    this.setProps({
      children: [
        {
          component: 'Icon',
          ref: (c) => {
            this.pendingRef = c
          },
          type: 'image-pending',
          attrs: {
            style: {
              width: typeof width === 'number' ? `${width}px` : width,
              height: typeof height === 'number' ? `${height}px` : height,
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
              width: typeof width === 'number' ? `${width}px` : width,
              height: typeof height === 'number' ? `${height}px` : height,
            },
          },
        },
      ],
    })
  }

  _rendered() {
    new nomui.Loading({
      container: this.pendingRef,
    })
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
  width: '',
  height: '',
  size: 10,
}

Component.register(Image)

export default Image
