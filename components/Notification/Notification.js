import Component from '../Component/index'
import Layer from '../Layer/index'
import { newGuid } from '../util/index'
import NotificationContent from './NotificationContent'

let NOMUI_NOTIFICATION_DEFAULTS = {
  align: 'right top',
  duration: 4500,
  bottom: 24,
  top: 24,
  left: 24,
  right: 24,
}

// 保存Notification实例,以key为键，实例对象为值
const NOMUI_NOTIFICATION_INSTANCES = {}

class Notification extends Layer {
  /**
   * 全局受影响，配置默认参数
   * @param {*} props
   */
  static configDefault(props) {
    NOMUI_NOTIFICATION_DEFAULTS = {
      ...NOMUI_NOTIFICATION_DEFAULTS,
      ...props,
    }
  }

  constructor(props, ...mixins) {
    const defaults = {
      ...NOMUI_NOTIFICATION_DEFAULTS,
      // type:'',
      closeIcon: 'close',
      // alignTo: document.body,
      title: '',
      description: '',
      // btn:boolean||{text:''},
      // closeIcon:{},
      key: newGuid(),
      // onClose:()=>{},
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  static open(config) {
    const curInsance = NOMUI_NOTIFICATION_INSTANCES[config.key]
    if (!curInsance) {
      return new nomui.Notification(config)
    }
    curInsance.update({
      ...config,
    })
    return curInsance
  }

  static success(config) {
    Notification.open({
      ...config,
      type: 'success',
    })
  }

  static error(config) {
    Notification.open({
      ...config,
      type: 'error',
    })
  }

  static info(config) {
    Notification.open({
      ...config,
      type: 'info',
    })
  }

  static warning(config) {
    Notification.open({
      ...config,
      type: 'warning',
    })
  }

  static close(key) {
    if (NOMUI_NOTIFICATION_INSTANCES[key]) {
      NOMUI_NOTIFICATION_INSTANCES[key].close()
    }
  }

  _created() {
    super._created()
    this.timer = null

    const { key } = this.props
    NOMUI_NOTIFICATION_INSTANCES[key] = this
  }

  registerAutoClose(duration) {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.close()
    }, duration)
  }

  _rendered() {
    const { duration } = this.props
    const that = this
    if (duration === null) {
      that.registerAutoClose(duration)

      this.element.addEventListener(
        'mouseenter',
        function () {
          that.timer && clearTimeout(that.timer)
        },
        false,
      )

      this.element.addEventListener(
        'mouseleave',
        function () {
          that.registerAutoClose(duration)
        },
        false,
      )
    }
  }

  _registerDuritionClose() {}

  _getMarginStyle() {
    const { top, right, bottom, left } = this.props
    const aligns = this.props.align.split(' ')
    const style = {
      transform: '',
    }
    aligns.forEach((align) => {
      switch (align) {
        case 'top':
          style.transform += `translateY(${top}px) `
          break
        case 'right':
          style.transform += `translateX(-${right}px) `
          break
        case 'bottom':
          style.transform += `translateY(-${bottom}px) `
          break
        case 'left':
          style.transform += `translateX(${left}px) `
          break
        default:
          break
      }
    })
    style.transform = style.transform.trim()
    return style
  }

  close() {
    this.timer && clearTimeout(this.timer)
    const { key } = this.props
    delete NOMUI_NOTIFICATION_INSTANCES[key]

    this.props.onClose && this.props.onClose()
    this.remove()
  }

  _config() {
    const that = this
    this._propStyleClasses = ['type']
    const {
      align,
      alignTo,
      styles,
      attrs = {},
      icon,
      type,
      closeIcon,
      title,
      btn,
      description,
    } = this.props

    const style = this._getMarginStyle()
    this.setProps({
      // fixed: true,
      closeToRemove: true,
      alignOuter: true,
      align,
      alignTo,
      styles,
      attrs: {
        ...attrs,
        style: {
          ...style,
          ...attrs.style,
        },
      },
      children: {
        component: NotificationContent,
        type,
        icon,
        closeIcon,
        title,
        btn,
        description,
        onClose: () => {
          that.close()
        },
      },
    })

    super._config()
  }
}

Component.register(Notification)

export default Notification
