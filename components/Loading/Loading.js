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
        children: this.props.noSpinner
          ? ''
          : {
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

  _rendered() {
    if (this.props.noSpinner && this.firstRender) {
      this.close({ type: 'success' })
    }
    super._rendered()
  }

  _remove() {
    this.referenceElement && this.referenceElement.classList.remove('nom-loading-container')
    super._remove()
  }

  close(args = {}) {
    const { type } = args
    if (!type) {
      this.remove()
    } else {
      if (type === 'fail' || type === 'danger') {
        this.iconRef.update({
          children: {
            component: FailIcon,
          },
        })
      } else if (type === 'success') {
        this.iconRef.update({
          children: {
            component: SuccessIcon,
          },
        })
      }

      this.element.classList.add('nom-loading-animate-hide')
      setTimeout(() => {
        this.remove()
      }, 3000)
    }
  }

  static success(options = {}) {
    new nomui.Loading({ ...options, ...{ noSpinner: true } })
  }
}
Loading.defaults = {
  align: 'center',
  backdrop: true,
  collision: 'none',
}
Component.register(Loading)

export default Loading
