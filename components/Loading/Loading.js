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

  _config() {
    this.setProps({
      reference: this.props.container,
      alignTo: this.getElement(this.props.container),
      children: {
        component: Spinner,
      },
    })

    if (this.props.container instanceof Component) {
      this.props.container.addClass('nom-loading-container')
    } else {
      this.props.container.component.addClass('nom-loading-container')
    }

    super._config()
  }

  _remove() {
    if (this.props.container instanceof Component) {
      this.props.container.removeClass('nom-loading-container')
    } else {
      this.props.container.component.removeClass('nom-loading-container')
    }

    super._remove()
  }
}

Component.register(Loading)

export default Loading
