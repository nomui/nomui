import Component from '../Component/index'
import Tween from './Tween.js'

class BackTop extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      duration: 100,
      animations: 'Linear',
      target: 'window',
      height: 400,
      right: 30,
      bottom: 30,
      text: '',
      parent: '',
      onClick: () => {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const { parent, target } = this.props
    if (target === 'window') {
      this.parentNode = document.documentElement || document.body
      this.bindEle = window
    } else if (this.hasClass(parent.element, target)) {
      this.parentNode = parent.element
      this.bindEle = this.parentNode
    } else {
      this.parentNode = parent.element.getElementsByClassName(target)[0]
      this.bindEle = this.parentNode
    }

    this.once = true
    this.onWindowScroll = () => {
      this.backTopFun()
    }
    this.initRequestAnimationFrame()
  }

  _config() {
    const { right, bottom } = this.props
    this.setProps({
      children: {
        ref: (c) => {
          this.backTopRef = c
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
        children: this.backTopButton(),
        onClick: () => {
          this.backTopEvent()
        },
      },
    })
  }

  _rendered() {
    this.bindEle.addEventListener('scroll', this.onWindowScroll)
  }

  _remove() {
    this.bindEle.removeEventListener('scroll', this.onWindowScroll)
  }

  backTopFun() {
    const { height } = this.props

    if (this.once === true) {
      this.once = false
      this.iconRef.update()
      if (this.bindEle === window) {
        this.parentNode.appendChild(this.backTopRef.element)
        this.backTopRef.element.style.position = 'fixed'
      } else {
        this.parentNode.parentElement.style.position = 'relative'
        this.parentNode.parentElement.appendChild(this.backTopRef.element)
      }
    }
    if (this.parentNode.scrollTop >= height) {
      this.backTopRef.show()
    } else {
      this.backTopRef.hide()
    }
  }

  hasClass(ele, className) {
    const reg = new RegExp(`(^|\\s)${className}(\\s|$)`)
    return reg.test(ele.className)
  }

  backTopButton() {
    const { text } = this.props
    let obj
    if (text.length > 0) {
      obj = {
        ref: (c) => {
          this.iconRef = c
        },
        classes: {
          'nom-back-top-text': true,
        },
        autoRender: false,
        children: text,
      }
    } else {
      obj = {
        ref: (c) => {
          this.iconRef = c
        },
        classes: {
          'nom-back-top-icons': true,
        },
        autoRender: false,
        component: 'Icon',
        type: 'up',
      }
    }
    return obj
  }

  initRequestAnimationFrame() {
    let lastTime = 0
    const vendors = ['webkit', 'moz']
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
      window.cancelAnimationFrame =
        window[`${vendors[x]}CancelAnimationFrame`] ||
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
    const { animations, duration } = this.props
    const element = this.parentNode

    let start = 0
    const begin = element.scrollTop
    const end = -element.scrollTop
    const during = Math.round((duration * 10) / 167)
    const paramArry = animations.split('.')

    const scrollAnimation = function () {
      if (element.scrollTop === 0) return false
      let top

      // 当前的运动位置
      if (paramArry[1]) {
        top = Tween[paramArry[0]][paramArry[1]](start, begin, end, during)
      } else {
        top = Tween[paramArry[0]](start, begin, end, during)
      }

      element.scrollTop = top
      // 时间递增
      start++
      // 如果还没有运动到位，继续
      if (start <= during && element.scrollTop !== 0) {
        requestAnimationFrame(scrollAnimation)
      }
    }

    if (element) scrollAnimation()
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
