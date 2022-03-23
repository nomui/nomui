import Component from '../Component/index'

class Avatar extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Avatar.defaults, props), ...mixins)
  }

  _config() {
    const { text, icon, src, alt } = this.props
    this._propStyleClasses = ['size']
    if (src) {
      this.setProps({
        classes: {
          'avatar-image': true,
        },
        children: [
          {
            tag: 'img',
            attrs: {
              src,
              alt,
            },
          },
        ],
      })
    } else if (icon) {
      this.setProps({
        children: [Component.normalizeIconProps(icon)],
      })
    } else {
      const innerText = text || 'NA'
      this.setProps({
        children: [{ tag: 'span', classes: { 'nom-avatar-string': true }, children: innerText }],
      })
    }
  }

  _setScale() {
    const { gap, src, icon } = this.props
    if (src || icon) {
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

  _rendered() {
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
