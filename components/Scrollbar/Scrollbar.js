import Component from '../Component/index'

class Scrollbar extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      target: null,
      hidden: true,
      position: {
        left: 0,
        bottom: 0,
      },
      size: {
        width: 0,
        innerWidth: 0,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { position, size } = this.props

    this.setProps({
      attrs: {
        style: {
          width: size.width,
          left: position.left,
          bottom: position.bottom,
          'overflow-x': 'auto',
          'overflow-y': 'hidden',
        },
        onscroll: () => {
          const { scrollLeft } = this.element
          this._scrollLeft = scrollLeft

          if (!this._setScrollFlag) {
            this.props.target.body.element.scrollLeft = scrollLeft
          }
          this._setScrollFlag = false
        },
      },
      children: {
        classes: {
          'nom-scrollbar-inner': true,
        },
        attrs: {
          style: {
            width: size.innerWidth,
          },
        },
      },
    })
  }

  // 外部调用方法设置 scrollBar 的 scrollLeft
  setScrollLeft(scrollLeft) {
    // 当前scrollbar 隐藏，无法直接设置scrollLeft 的值
    // 所以先记录下来 在_rendered中再赋值
    if (this.props.hidden) {
      this._scrollLeft = scrollLeft
    } else {
      // _setScrollFlag: true 时：表示此次滚动条的变化为外部触发
      // 则无需再正向设置 gridbody scrollLeft, 导致触发其 onscroll事件
      this._setScrollFlag = true
      this.element.scrollLeft = scrollLeft
    }
  }

  _rendered() {
    this.element.scrollLeft = this._scrollLeft || 0
  }

  show() {
    this.props.hidden &&
      this.update({
        hidden: false,
      })
  }

  hide() {
    !this.props.hidden &&
      this.update({
        hidden: true,
      })
  }

  _remove() {
    this.element.remove()
  }
}

Component.register(Scrollbar)

export default Scrollbar
