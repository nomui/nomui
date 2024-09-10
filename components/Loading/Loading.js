import Component from '../Component/index'
import Layer from '../Layer/index'
import Spinner from '../Spinner/index'
import FailIcon from './fail-icon'
import SuccessIcon from './success-icon'

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
        ref: (c) => {
          this.iconRef = c
        },
        children: {
          component: Spinner,
        },
      },
      onClick({ event }) {
        event.stopPropagation()
      },
    })

    this.referenceElement.classList.add('nom-loading-container')

    super._config()
  }

  close(args) {
    if (!args || !args.type) {
      this.remove()
    }
    else {
      const { type } = args
      if (type === 'fail' || type === "danger") {
        this.iconRef.update({
          children: {
            component: FailIcon
          }
        })
      }
      else if (type === 'success') {
        this.iconRef.update({
          children: {
            component: SuccessIcon
          }
        })
      }

      setTimeout(() => {
        this.element.classList.add('nom-loading-animate-hide')
      }, 1500)

      setTimeout(() => {
        this.remove()
      }, 1500 + 200)
    }



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
