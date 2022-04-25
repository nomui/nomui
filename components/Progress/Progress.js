import Component from '../Component/index'
import Icon from '../Icon/index'
import Circle from './Circle'
import Line from './Line'
import Steps from './Steps'
import { validProgress } from './utils'

class Progress extends Component {
  static _prefixClass = 'nom-progress'

  static _progressStatuses = ['normal', 'exception', 'active', 'success']

  constructor(props, ...mixins) {
    super(Component.extendProps(Progress.defaults, props), ...mixins)
  }

  getPercentNumber() {
    const { percent, success } = this.props
    const { percent: successPercent } = success
    return parseInt(
      successPercent !== undefined ? successPercent.toString() : percent.toString(),
      10,
    )
  }

  getProgressStatus() {
    const { status } = this.props
    const successPercent = this.getPercentNumber()
    if (
      (status === undefined || Progress._progressStatuses.indexOf(status) !== 0) &&
      successPercent >= 100
    ) {
      return 'success'
    }
    return status || 'normal'
  }

  renderProcessInfo(progressStatus) {
    const { showInfo, format, type, percent, infoWidth } = this.props

    const successPercent = this.getPercentNumber()
    if (!showInfo) return null

    let text
    const textFormatter = format || ((percentNumber) => `${percentNumber}%`)
    const isLineType = type === 'line'
    if (format || (progressStatus !== 'exception' && progressStatus !== 'success')) {
      text = textFormatter(validProgress(percent), validProgress(successPercent))
    } else if (progressStatus === 'exception') {
      text = isLineType
        ? { component: Icon, type: 'close-circle' }
        : { component: Icon, type: 'close' }
    } else if (progressStatus === 'success') {
      text = isLineType
        ? { component: Icon, type: 'check-circle' }
        : { component: Icon, type: 'check' }
    }
    return {
      tag: 'span',
      classes: {
        [`${Progress._prefixClass}-text`]: true,
      },
      attrs: {
        title: typeof text === 'string' ? text : undefined,
        style: {
          width: infoWidth ? `${infoWidth}px` : '',
          flex: infoWidth ? `0 0 ${infoWidth}px` : '',
        },
      },
      children: text,
    }
  }

  _config() {
    const {
      size,
      type,
      steps,
      showInfo,
      success,
      strokeColor,
      strokeLinecap,
      percent,
      strokeWidth,
      trailColor,
      gapDegree,
      width,
    } = this.props
    const progressStatus = this.getProgressStatus()
    const progressInfo = this.renderProcessInfo(progressStatus)

    let children = {
      children: progressInfo,
      strokeColor: strokeColor,
      size,
      percent,
      strokeWidth,
      strokeLinecap,
      trailColor,
      success,
    }
    if (type === 'line') {
      if (steps) {
        children = {
          ...children,
          strokeColor: typeof strokeColor === 'string' ? strokeColor : undefined,
          component: Steps,
          steps,
        }
      } else {
        children = {
          ...children,
          component: Line,
        }
      }
    } else if (type === 'circle' || type === 'dashboard') {
      children = {
        ...children,
        component: Circle,
        type,
        width,
        strokeLinecap,
        progressStatus: progressStatus,
        children: progressInfo,
        gapDegree,
      }
    } else {
      throw new Error(`Progress 不受支持的类型：${type}`)
    }

    this.setProps({
      classes: {
        [`${Progress._prefixClass}-${
          (type === 'dashboard' && 'circle') || (steps && 'steps') || type
        }`]: true,
        [`${Progress._prefixClass}-status-${progressStatus}`]: true,
        [`${Progress._prefixClass}-show-info`]: showInfo,
        [`${Progress._prefixClass}-${size}`]: size,
      },
      children,
    })
  }
}

Progress.defaults = {
  type: 'line', // 'line', 'circle', 'dashboard' // 类型，可选 line circle dashboard
  percent: 0, // 百分比
  infoWidth: null,
  // format?:undefined, // (percentNumber,successPercent) => `${percentNumber}%` 内容的模板函数
  // status:undefined, // 'normal', 'exception', 'active', 'success' // 状态，可选：success exception normal active(仅限 line)
  showInfo: true, // 是否显示进度数值或状态图标
  // null for different theme definition
  trailColor: null,
  size: 'default', // 'default' ,'small'
  /**
   * type="line"
   *  进度条线的宽度，默认为10px，
   * type="circle"
   *  圆形进度条线的宽度，单位是进度条画布宽度的百分比 默认 6
   */
  // strokeWidth:10,
  strokeLinecap: 'round', //  'butt' | 'square' | 'round', // 进度条的样式
  // strokeColor: string |  { from: string; to: string; direction: string }, // 进度条的色彩，传入 object 时为渐变
  // trailColor: string, // 未完成的分段的颜色
  /**
   * type="circle" 圆形进度条画布宽度，单位 px 默认 132px
   * type="dashboard" 仪表盘进度条画布宽度，单位 px 默认 132px
   */
  // width: number,
  success: {}, //  { percent: number, strokeColor: string }, // 成功进度条相关配置
  // gapDegree: number,【type="dashboard"】 仪表盘进度条缺口角度，可取值 0 ~ 295默认75
  // gapPosition: 'top' | 'bottom' | 'left' | 'right', // 仪表盘进度条缺口位置 默认值 bottom
  // steps: number, // 【type="line"】进度条总共步数
}

Component.register(Progress)

export default Progress
