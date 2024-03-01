import Component from '../Component/index'
import { isFunction } from '../util/index'

class Tour extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tour.defaults, props), ...mixins)
  }

  _created() {
    this.total = 0
  }

  _config() {

    const { steps } = this.props
    if (steps.length) {
      this.total = steps.length
      this._createStep(1)
    }

  }

  _createStep(index) {
    const { padding, steps, allowSkip } = this.props
    let { current } = this.props
    const item = steps[index - 1]
    const { target, align = 'top', render } = item

    current = index
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

    this.mask = new nomui.Layer({
      classes: {
        'nom-tour-mask': true
      },
    })


    this.stepLayer = new nomui.Layer({
      alignOuter: true,
      align: align,
      alignTo: ele,
      classes: {
        'nom-tour-container': true,
      },
      attrs: {
        'placement': align
      },
      children: [isFunction(render) ? render() : this._renderContent(item),
      {
        classes: {
          'nom-tour-close': true
        },
        hidden: !allowSkip,
        component: 'Icon',
        type: 'times',
        onClick: () => {
          this._destroyStep()
          this.props.onClose && this._callHandler(this.props.onClose, { current: current })
        }
      },
      {
        component: 'Flex',
        classes: {
          'nom-tour-navi': true
        },
        align: 'center',
        cols: [
          {
            grow: true,
            children: {
              classes: {
                'nom-tour-navi-text': true
              },
              children: `${current} of ${this.total}`
            }
          },
          {
            component: 'Button',
            size: 'small',
            hidden: current === 1 || this.total === 1,
            text: '上一步',
            onClick: () => {
              this._destroyStep()
              this._createStep(current - 1)

            }
          },
          {
            component: 'Button',
            size: 'small',
            hidden: current === this.total || this.total === 1,
            text: '下一步',
            onClick: () => {
              this._destroyStep()
              this._createStep(current + 1)
            }
          },
          {
            component: 'Button',
            size: 'small',
            hidden: current !== this.total && this.total !== 1,
            text: '完成',
            type: 'primary',
            onClick: () => {
              this._destroyStep()
              this.props.onFinish && this._callHandler(this.props.onFinish, { current })
            }
          }
        ]
      },
      {
        classes: { 'nom-tour-arrow': true },
        children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
      },]
    })

    this.props.onChange && this._callHandler(this.props.onChange, { current })

  }

  _destroyStep() {
    this.stepLayer.remove()
    this.mask.remove()
    this.backdrop.remove()
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
  allowSkip: true,
  onClose: null,
  onChange: null,
  onFinish: null,
  current: 1,
  scrollIntoView: true
}

Component.register(Tour)

export default Tour
