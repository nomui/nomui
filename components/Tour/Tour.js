import Component from '../Component/index'
import { isFunction } from '../util/index'

class Tour extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tour.defaults, props), ...mixins)
  }

  _config() {

    const { steps } = this.props
    steps.forEach(n => {
      this._createStep(n)
    })

  }

  _createStep(item) {
    const { padding } = this.props
    const { target, align = 'top', render } = item

    let ele = isFunction(target) ? target() : target

    if (ele.element) {
      ele = ele.element
    }

    const info = ele.getBoundingClientRect()


    this.backdrop = new nomui.Layer({
      classes: {
        'nom-tour-backdrop': true
      },
      attrs: {
        style: {
          top: `${info.top - padding}px`,
          left: `${info.left - padding}px`,
          width: `${info.width + padding * 2}px`,
          height: `${info.height + padding * 2}px`
        }
      }
    })


    this.stepLayer = new nomui.Layer({
      alignOuter: true,
      align: align,
      alignTo: ele,
      classes: {
        'nom-tour-container': true
      },
      children: isFunction(render) ? render() : this._renderContent(item)
    })

  }

  _renderContent(item) {
    const { title, description } = item
    return {
      component: 'Flex',
      rows: [
        {
          classes: {
            'nom-tour-title': true
          },
          children: title
        },
        {
          classes: {
            'nom-tour-description': true
          },
          children: description
        }
      ]
    }
  }



}


Tour.defaults = {
  padding: 2,
  steps: [],
}

Component.register(Tour)

export default Tour
