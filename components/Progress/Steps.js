import Component from '../Component/index'

class Steps extends Component {
  static _prefixClass = 'nom-progress'

  constructor(props, ...mixins) {
    const defaults = {
      strokeWidth: 8,
      percent: 0,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { size, strokeColor, percent, strokeWidth, trailColor, steps, children } = this.props
    const current = Math.round(steps * (percent / 100))
    const stepWidth = size === 'small' ? 2 : 14
    const styledSteps = []
    for (let i = 0; i < steps; i += 1) {
      styledSteps.push({
        classes: {
          [`${Steps._prefixClass}-steps-item`]: true,
          [`${Steps._prefixClass}-steps-item-active`]: i <= current - 1,
        },
        attrs: {
          style: {
            backgroundColor: i <= current - 1 ? strokeColor : trailColor,
            width: `${stepWidth}px`,
            height: `${strokeWidth}px`,
          },
        },
      })
    }

    this.setProps({
      classes: {
        [`${Steps._prefixClass}-steps-outer`]: true,
      },
      children: [...styledSteps, children],
    })
  }
}

export default Steps
