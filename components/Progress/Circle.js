import Component from '../Component/index'
import CirclePath from './CirclePath'
import { validProgress } from './utils'

class ProgressCircle extends Component {
  static _prefixClass = 'nom-progress'

  constructor(props, ...mixins) {
    const defaults = {
      width: 120,
      // strokeWidth:6
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _getGapDegree() {
    const { gapDegree, type } = this.props
    // Support gapDeg = 0 when type = 'dashboard'
    if (gapDegree || gapDegree === 0) {
      return gapDegree
    }
    if (type === 'dashboard') {
      return 75
    }
    return undefined
  }

  _getPercentage({ percent, success }) {
    const ptg = validProgress(percent)
    const realSuccessPercent = success.percent
    if (!realSuccessPercent) {
      return ptg
    }
    return [
      validProgress(realSuccessPercent),
      validProgress(ptg - validProgress(realSuccessPercent)),
    ]
  }

  _getStrokeColor() {
    const { success = {}, strokeColor } = this.props
    const color = strokeColor || null
    const realSuccessPercent = success.percent
    if (!realSuccessPercent) {
      return color
    }
    return ['#52c41a', color]
  }

  _config() {
    const {
      width,
      strokeLinecap,
      percent,
      strokeWidth,
      gapPosition,
      trailColor,
      type,
      success = {},
      children,
    } = this.props

    const circleWidth = strokeWidth || 6
    const gapPos = gapPosition || (type === 'dashboard' && 'bottom') || 'top'

    // using className to style stroke color
    const strokeColor = this._getStrokeColor()
    const isGradient = Object.prototype.toString.call(strokeColor) === '[object Object]'
    const successPercent = this._getPercentage({ percent, success })
    const gapDegree = this._getGapDegree()
    this.setProps({
      classes: {
        [`${ProgressCircle._prefixClass}-inner`]: true,
        [`${ProgressCircle._prefixClass}-circle-gradient`]: isGradient,
      },
      attrs: {
        style: {
          width: `${width}px`,
          height: `${width}px`,
          fontSize: width * 0.15 + 6,
        },
      },
      children: [
        {
          component: CirclePath,
          percent: successPercent,
          strokeWidth: circleWidth,
          trailWidth: circleWidth,
          strokeColor: strokeColor,
          strokeLinecap: strokeLinecap,
          trailColor: trailColor,
          prefixCls: ProgressCircle._prefixClass,
          gapDegree: gapDegree,
          gapPosition: gapPos,
        },
        children,
      ],
    })
  }
}

export default ProgressCircle
