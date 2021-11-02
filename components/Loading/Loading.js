import Component from '../Component/index'
import Layer from '../Layer/index'
import Spinner from '../Spinner/index'

class Loading extends Layer {
  constructor(props, ...mixins) {
    const defaults = {
      align: 'center',
      container: document.body,
      backdrop: true,
      collision: 'none',
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
    })

    this.referenceElement.classList.add('nom-loading-container')

    super._config()
  }

  _remove() {
    this.referenceElement.classList.remove('nom-loading-container')

    super._remove()
  }
}

Component.register(Loading)

export default Loading
