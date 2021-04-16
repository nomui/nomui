import Component from '../Component/index'

class LayerBackdrop extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      zIndex: 2,
      attrs: {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          userSelect: 'none',
          opacity: 0.1,
          background: '#000',
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
