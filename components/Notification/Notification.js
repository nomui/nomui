import Component from '../Component/index'
import Layer from '../Layer/index'
import { newGuid } from '../util/index'
import NotificationContent from './NotificationContent'

class Notification extends Layer {
  static NOMUI_NOTIFICATION_DEFAULTS = {
    align: 'top right',
    duration: 4500,
    bottom: 24,
    top: 24,
    left: 24,
    right: 24,
  }

  static NOMUI_NOTIFICATION_CONTAINER = null

  // 保存Notification实例,以key为键，实例对象为值
  static NOMUI_NOTIFICATION_INSTANCES = {}

  // /**
  //  * 全局受影响，配置默认参数
  //  * @param {*} props
  //  */
  // static configDefault(props) {
  //   Notification.NOMUI_NOTIFICATION_DEFAULTS = {
  //     ...Notification.NOMUI_NOTIFICATION_DEFAULTS,
  //     ...props,
  //   }
  // }

  constructor(props, ...mixins) {
    const defaults = {
      ...Notification.NOMUI_NOTIFICATION_DEFAULTS,
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
    if (!Notification.NOMUI_NOTIFICATION_CONTAINER) {
      Notification.NOMUI_NOTIFICATION_CONTAINER = new nomui.Layer({
        classes: {
          'nom-notification-container': true,
          'nom-notification-align-top':
            (config.align && config.align.includes('top')) || !config.align,
          'nom-notification-align-bottom': config.align && config.align.includes('bottom'),
          'nom-notification-align-left': config.align && config.align.includes('left'),
          'nom-notification-align-right':
            (config.align && config.align.includes('right')) || !config.align,
        },
      })
    }

    const curInsance = Notification.NOMUI_NOTIFICATION_INSTANCES[config.key]
    if (!curInsance) {
      return new nomui.Notification({
        ...config,
        reference: document.querySelector('.nom-notification-container'),
      })
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
    if (Notification.NOMUI_NOTIFICATION_INSTANCES[key]) {
      Notification.NOMUI_NOTIFICATION_INSTANCES[key].close()
    }
  }

  _created() {
    super._created()
    this.timer = null

    const { key } = this.props
    Notification.NOMUI_NOTIFICATION_INSTANCES[key] = this
  }

  _registerAutoClose(duration) {
    this.timer && clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.close()
    }, duration)
  }

  _rendered() {
    const { duration } = this.props
    const that = this
    if (duration !== null) {
      that._registerAutoClose(duration)

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
          that._registerAutoClose(duration)
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
    delete Notification.NOMUI_NOTIFICATION_INSTANCES[key]

    this.props.onClose && this.props.onClose()
    this.remove()
  }

  _config() {
    const that = this
    this._propStyleClasses = ['type']
    const { styles, attrs = {}, icon, type, closeIcon, title, btn, description } = this.props
    this.setProps({
      closeToRemove: true,
      styles,
      align: null,
      alignTo: null,
      attrs: {
        ...attrs,
        style: attrs.style,
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
