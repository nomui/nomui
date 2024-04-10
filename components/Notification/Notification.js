import Component from '../Component/index'
import Layer from '../Layer/index'
import { newGuid } from '../util/index'
import NotificationContent from './NotificationContent'

class Notification extends Layer {
  static NOMUI_NOTIFICATION_DEFAULTS = {
    align: 'topRight',
    duration: 4500,
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
    super(Component.extendProps(Notification.defaults, props), ...mixins)
  }

  static open(config) {
    let align = 'topRight'

    if (config.align) {
      const alignInfo = config.align.toLowerCase()
      if (alignInfo.includes('top')) {
        if (alignInfo.includes('left')) {
          align = 'topLeft'
        } else {
          align = 'topRight'
        }
      } else if (alignInfo.includes('bottom')) {
        if (alignInfo.includes('left')) {
          align = 'bottomLeft'
        } else {
          align = 'bottomRight'
        }
      }
    }
    if (!Notification.NOMUI_NOTIFICATION_CONTAINER) {
      Notification.NOMUI_NOTIFICATION_CONTAINER = {
        topLeft: new nomui.Component({
          classes: {
            'nom-notification-container': true,
            'nom-notification-align-topleft': true,
          },
        }),
        topRight: new nomui.Component({
          classes: {
            'nom-notification-container': true,
            'nom-notification-align-topright': true,
          },
        }),
        bottomLeft: new nomui.Component({
          classes: {
            'nom-notification-container': true,
            'nom-notification-align-bottomleft': true,
          },
        }),
        bottomRight: new nomui.Component({
          classes: {
            'nom-notification-container': true,
            'nom-notification-align-bottomright': true,
          },
        }),
      }
    }

    const curInsance = Notification.NOMUI_NOTIFICATION_INSTANCES[config.key]

    if (!curInsance) {
      return new nomui.Notification({
        ...config,
        reference: Notification.NOMUI_NOTIFICATION_CONTAINER[align],
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

  _registerDuritionClose() { }

  close() {
    this.timer && clearTimeout(this.timer)
    const { key } = this.props

    delete Notification.NOMUI_NOTIFICATION_INSTANCES[key]
    this.props.onClose && this.props.onClose()
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.remove()
  }

  _config() {
    const that = this
    this._propStyleClasses = ['type']
    const {
      styles,
      attrs = {},
      icon,
      type,
      closeIcon,
      title,
      btn,
      description,
      align,
      animate,
      okText
    } = this.props
    const classes = {}
    let alignInfo = 'topright'
    if (align) {
      alignInfo = align.toLowerCase()
      if (alignInfo.includes('left')) {
        classes['nom-notification-animate-left-show'] = animate
      } else if (alignInfo.includes('right')) {
        classes['nom-notification-animate-right-show'] = animate
      }
    } else {
      classes['nom-notification-animate-right-show'] = animate
    }

    this.setProps({
      closeToRemove: true,
      styles,
      alignInfo,
      align: null,
      alignTo: null,
      classes,
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
        okText,
        onClose: () => {
          that.close()
        },
      },
    })

    super._config()
  }

  animateHide() {
    if (!this.element) return false
    if (this.props.alignInfo.includes('left')) {
      this.addClass('nom-notification-animate-left-hide')
    } else if (this.props.alignInfo.includes('right')) {
      this.addClass('nom-notification-animate-right-hide')
    }
    setTimeout(() => {
      if (!this.element) return false
      this.remove()
    }, 240)
  }
}
Notification.defaults = {
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
  okText: '确定'
}
Component.register(Notification)

export default Notification
