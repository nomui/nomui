import Component from '../Component/index'

class Scrollbar extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      target: null,
      hidden: true,
      position: {
        left: 0,
        top: 0,
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
          top: position.top,
          'overflow-x': 'auto',
          'overflow-y': 'hidden',
        },
        onscroll: () => {
          const { scrollLeft } = this.element

          this.props.target.body.element.scrollLeft = scrollLeft
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
}

Component.register(Scrollbar)

export default Scrollbar
