import Component from '../Component/index'

class Avatar extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Avatar.defaults, props), ...mixins)
  }

  _config() {
    const { text, icon, src, alt } = this.props
    this._propStyleClasses = ['size']

    this.setProps({
      classes: {
        'avatar-image': !!src,
      },
      children: [
        src && {
          tag: 'img',
          ref: (c) => {
            this.imgRef = c
          },
          attrs: {
            alt,
          },
        },
        icon && {
          component: 'Icon',
          type: icon,
          ref: (c) => {
            this.iconRef = c
          },
        },
        !icon && {
          ref: (c) => {
            this.textRef = c
          },
          tag: 'span',
          classes: { 'nom-avatar-string': true },
          children: text || 'NA',
        },
      ],
    })
  }

  _setScale() {
    if (!this.props) {
      return
    }
    const { gap, icon } = this.props

    if (icon) {
      return
    }

    const childrenWidth = this.element.lastChild.offsetWidth
    const nodeWidth = this.element.offsetWidth
    if (childrenWidth !== 0 && nodeWidth !== 0) {
      if (gap * 2 < nodeWidth) {
        const scale =
          nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1
        const transformString = `scale(${scale}) translateX(-50%)`
        const child = this.children[this.children.length - 1]
        child.update({
          attrs: {
            style: {
              '-ms-transform': transformString,
              '-webkit-transform': transformString,
              transform: transformString,
            },
          },
        })
      }
    }
  }

  _loadImageAsync() {
    const { src } = this.props
    return new Promise((resolve, reject) => {
      const image = this.imgRef.element
      this.imgRef.element.src = src
      image.onload = () => {
        this.textRef && this.textRef.hide()
        this.iconRef && this.iconRef.hide()
        resolve()
      }
      image.onerror = () => {
        this.imgRef.hide()
        reject()
      }
    })
  }

  _rendered() {
    this.props.src && this._loadImageAsync()
    this._setScale()
  }
}
Avatar.defaults = {
  tag: 'span',
  size: 'default',
  alt: '图片',
  gap: 4, // 字符类型距离左右两侧边界单位像素
  text: null, // 文本
  icon: null, // 图标
  src: null, // 图片地址
}

Component.register(Avatar)

export default Avatar
