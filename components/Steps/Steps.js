import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'
import { STATUS } from './helper'
import Step from './Step'

class Steps extends Component {
  constructor(props, ...mixins) {
    // active current
    super(Component.extendProps(Steps.defaults, props), ...mixins)
  }

  _config() {
    // const steps = this
    const { direction, current } = this.props
    this._handleCurrent(current)

    this.setProps({
      tag: 'div',
      classes: {
        'nom-steps-horizontal': direction === 'horizontal',
        'nom-steps-vertical': direction === 'vertical',
        'nom-steps-simple': this.props.simple
      },
    })

    this.setProps({ children: this._handleChild() })

    super._config()
  }

  _rendered() {
    this.props.simple && this.props.direction === 'horizontal' && this._fixPaddingLeft()
  }

  _fixPaddingLeft() {
    const me = this
    setTimeout(() => {
      const w = me.element.querySelector('.nom-step > .nom-step-item-content').offsetWidth / 2
      this.element.style.paddingLeft = `${parseInt(w, 10) + 14}px`
    }, 0)

  }

  _handleChild() {
    const { options, onChange, simple, direction } = this.props

    if (!options || !Array.isArray(options) || options.length === 0) return []

    return options.map((item, index) => ({
      status: this._getStatus(index, this.current),
      ...item,
      index,
      simple,
      direction,
      component: Step,
      onChange: isFunction(onChange) ? onChange : undefined,
    }))
  }

  _getStatus(index, current) {
    const { WAIT, PROCESS, FINISH } = STATUS
    if (index === current) return PROCESS

    return index < current ? FINISH : WAIT
  }

  _handleCurrent(cur) {
    let current = 0
    if (isNumeric(cur)) current = parseInt(cur, 10)

    this.current = current
  }
}

Steps.defaults = {
  direction: 'horizontal',
  current: 0,
  options: [],
  onChange: null,
  simple: false
}
Component.register(Steps)
export default Steps
