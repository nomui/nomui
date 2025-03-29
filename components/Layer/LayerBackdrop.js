import Component from '../Component/index'

class LayerBackdrop extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      zIndex: 2,
      classes: {
        'nom-layer-backdrop': true,
      },
      attrs: {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          userSelect: 'none',
        },
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      attrs: {
        style: {
          zIndex: this.props.zIndex,
        },
      },
      classes: {
        'nom-layer-mask-animate-show': this.props.animate,
        'nom-layer-backdrop-transparent': this.props.transparent,
      },
      onClick({ event }) {
        event.stopPropagation()
      },
    })

    if (this.referenceElement === document.body) {
      this.setProps({
        attrs: {
          style: {
            position: 'fixed',
          },
        },
      })
    }
  }
}

Component.register(LayerBackdrop)

export default LayerBackdrop
