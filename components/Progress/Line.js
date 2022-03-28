import Component from '../Component/index'
import { handleGradient, validProgress } from './utils'

class ProgressLine extends Component {
  static _prefixClass = 'nom-progress'

  constructor(props, ...mixins) {
    super(Component.extendProps(ProgressLine.defaults, props), ...mixins)
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
              [`${ProgressLine._prefixClass}-success-bg`]: true,
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
            [`${ProgressLine._prefixClass}-outer`]: true,
          },
          children: {
            classes: {
              [`${ProgressLine._prefixClass}-inner`]: true,
            },
            attrs: {
              style: trailStyle,
            },
            children: [
              {
                classes: {
                  [`${ProgressLine._prefixClass}-bg`]: true,
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

ProgressLine.defaults = {
  // steps:100,
  // strokeColor:'',
  strokeWidth: 10,
}

export default ProgressLine
