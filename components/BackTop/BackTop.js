import Component from '../Component/index'
import Tween from './Tween.js'

class BackTop extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      duration: 100,
      target: 'body',
      visibilityHeight: 400,
      animations: 'Linear',
      right: 30,
      bottom: 30,
      parent: '',
      onClick: () => {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const { parent, target } = this.props
    if (target === 'body') {
      this.parentNode = document.getElementsByTagName('body')
    } else if (this.hasClass(parent.element, target)) {
      this.parentNode = parent.element
    } else {
      this.parentNode = parent.element.getElementsByClassName(target)[0]
    }
    this.parentNode.style.position = 'relative'

    this.once = true
    this.initRequestAnimationFrame()
  }

  _config() {
    const { right, bottom } = this.props
    this.setProps({
      children: {
        ref: (c) => {
          this.backtopRef = c
        },
        classes: {
          'nom-back-top-container': true,
        },
        attrs: {
          style: {
            right: `${right}px`,
            bottom: `${bottom}px`,
          },
        },
        children: {
          ref: (c) => {
            this.iconRef = c
          },
          autoRender: false,
          component: 'Icon',
          type: 'up',
        },
        onClick: () => {
          this.backTopEvent()
        },
      },
    })
  }

  _rendered() {
    const { visibilityHeight } = this.props
    this.parentNode.addEventListener('scroll', () => {
      if (this.once === true) {
        this.once = false
        this.iconRef.update()
        if (this.hasClass(this.parentNode, 'nom-virtual-list-container')) {
          this.parentNode.parentElement.style.position = 'relative'
          this.parentNode.parentElement.appendChild(this.backtopRef.element)
        }
      }
      if (this.parentNode.scrollTop >= visibilityHeight) {
        this.backtopRef.show()
      } else {
        this.backtopRef.hide()
      }
    })
  }
  /**
   * ele: html 元素
   * className (string): 要判断的类名
   * 返回值: 元素含有该类名返回 true,不包含返回 false
   */

  hasClass(ele, className) {
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
    return reg.test(ele.className)
  }

  initRequestAnimationFrame() {
    let lastTime = 0
    const vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
      window.cancelAnimationFrame =
        window[`${vendors[x]}CancelAnimationFrame`] || // name has changed in Webkit
        window[`${vendors[x]}CancelRequestAnimationFrame`]
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function (callback) {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
        const id = window.setTimeout(function () {
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function (id) {
        clearTimeout(id)
      }
    }
  }

  backTopEvent() {
    const { target, animations, duration } = this.props
    const nowScroll = document.getElementsByClassName(target)[0]

    // 当前时间
    let start = 0
    // 初始值
    const begin = nowScroll.scrollTop
    // 变化量
    const end = -nowScroll.scrollTop
    // 持续时间
    const during = Math.round((duration * 10) / 167)

    const funScroll = function () {
      if (nowScroll.scrollTop === 0) return false
      // 当前的运动位置
      const top = Tween[animations](start, begin, end, during)
      nowScroll.scrollTop = top
      // 时间递增
      start++
      // 如果还没有运动到位，继续
      if (start <= during && nowScroll.scrollTop !== 0) {
        requestAnimationFrame(funScroll)
      } else {
        // 动画结束，这里可以插入回调...
        // callback()...
      }
    }

    if (nowScroll) {
      funScroll()
    }
  }
}

Component.mixin({
  _rendered: function () {
    if (this.props.backtop) {
      this.backtop = new BackTop(
        Component.extendProps({}, this.props.backtop, {
          parent: this,
        }),
      )
    }
  },
})

Component.register(BackTop)

export default BackTop
