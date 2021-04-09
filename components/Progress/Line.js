import Component from '../Component/index'
import { handleGradient, validProgress } from './utils'

class Line extends Component {
  static _prefixClass = 'nom-progress'

  constructor(props, ...mixins) {
    const defaults = {
      // steps:100,
      // strokeColor:'',
      strokeWidth: 10,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const {
      size,
      strokeLinecap,
      strokeColor,
      percent,
      strokeWidth,
      trailColor,
      success = {},
      children,
    } = this.props

    const successPercent = success.percent

    const successSegment =
      successPercent !== undefined
        ? {
            classes: {
              [`${Line._prefixClass}-success-bg`]: true,
            },
            attrs: {
              style: {
                width: `${validProgress(successPercent)}%`,
                height: `${strokeWidth}px` || (size === 'small' ? '6px' : '8px'),
                borderRadius: strokeLinecap === 'square' ? 0 : '',
                backgroundColor: success.strokeColor,
              },
            },
          }
        : null

    const trailStyle = trailColor
      ? {
          backgroundColor: trailColor,
        }
      : undefined

    const backgroundProps =
      strokeColor && typeof strokeColor !== 'string'
        ? handleGradient(strokeColor)
        : {
            background: strokeColor,
          }

    const percentStyle = {
      width: `${validProgress(percent)}%`,
      height: `${strokeWidth || (size === 'small' ? 6 : 8)}px`,
      borderRadius: strokeLinecap === 'square' ? 0 : '',
      ...backgroundProps,
    }

    this.setProps({
      children: [
        {
          classes: {
            [`${Line._prefixClass}-outer`]: true,
          },
          children: {
            classes: {
              [`${Line._prefixClass}-inner`]: true,
            },
            attrs: {
              style: trailStyle,
            },
            children: [
              {
                classes: {
                  [`${Line._prefixClass}-bg`]: true,
                },
                attrs: {
                  style: percentStyle,
                },
              },
              successSegment,
            ],
          },
        },
        children,
      ],
    })
  }
}

export default Line
