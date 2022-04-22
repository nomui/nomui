import Component from '../Component/index'
import Layer from '../Layer/index'
import Spinner from '../Spinner/index'

class Loading extends Layer {
  constructor(props, ...mixins) {
    const defaults = {
      container: document.body,
    }
    super(Component.extendProps(defaults, Loading.defaults, props), ...mixins)
  }

  _create() {
    this.setProps({
      reference: this.props.container,
      alignTo: this.getElement(this.props.container),
    })
  }

  _config() {
    this.setProps({
      children: {
        component: Spinner,
      },
      onClick({ event }) {
        event.stopPropagation()
      },
    })

    this.referenceElement.classList.add('nom-loading-container')

    super._config()
  }

  _remove() {
    this.referenceElement && this.referenceElement.classList.remove('nom-loading-container')

    super._remove()
  }
}
Loading.defaults = {
  align: 'center',
  backdrop: true,
  collision: 'none',
}
Component.register(Loading)

export default Loading
