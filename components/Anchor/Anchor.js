import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'

class Anchor extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      container: null,
      items: [],
      border: 'left',
      onItemClick: null,
      width: 180,
      sticky: false,
      itemDefaults: null,
      offset: 0,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.container = isFunction(this.props.container)
      ? this.props.container()
      : this.props.container

    this.containerElem = document

    this.onWindowScroll = () => {
      this._fixPosition()
      this._onContainerScroll()
    }
  }

  _config() {
    const that = this
    const { items, border, width, itemDefaults } = this.props
    const myWidth = isNumeric(width) ? `${width}px` : width

    this.setProps({
      classes: {
        'nom-anchor-border-left': border === 'left',
        'nom-anchor-border-right': border === 'right',
      },
      attrs: {
        style: {
          'min-width': myWidth,
        },
      },
      children: {
        component: 'Menu',
        ref: (c) => {
          that.menu = c
        },
        itemSelectable: {
          byClick: true,
        },
        items: items,
        itemDefaults: {
          ...itemDefaults,
          ...{
            onClick: function (args) {
              const key = args.sender.key
              that.props.onItemClick && that._callHandler(that.props.onItemClick, key)
              that._scrollToKey(key)
            },
          },
        },
      },
    })
  }

  _rendered() {
    const that = this

    this.position = null
    this.size = null

    if (this.props.sticky) {
      if (this.props.sticky === true) {
        this.scrollParent = window

        window.addEventListener('scroll', this.onWindowScroll)
      } else {
        if (isFunction(this.props.sticky)) {
          this.scrollParent = this.props.sticky()
        } else {
          this.scrollParent = this.props.sticky
        }

        this.scrollParent._on('scroll', function () {
          that._fixPosition()
        })
      }
    }

    if (this.container !== window) {
      this.container._on('scroll', function () {
        that.containerElem = that.container.element
        that._onContainerScroll()
      })
    } else {
      // 判断是否滚动完毕，再次添加滚动事件
      let temp = 0
      setTimeout(function judge() {
        const temp1 = document.getElementsByTagName('html')[0].scrollTop
        if (temp !== temp1) {
          // 两次滚动高度不等，则认为还没有滚动完毕
          setTimeout(judge, 500)
          temp = temp1 // 滚动高度赋值
        } else {
          window.addEventListener('scroll', this.onWindowScroll)
          temp = null // 放弃引用
        }
      }, 500)
    }
  }

  _scrollToKey(target) {
    const container = this.containerElem.getElementsByClassName(`nom-anchor-target-${target}`)
    if (container.length) {
      container[0].scrollIntoView({ behavior: 'smooth' })
    }
  }

  _fixPosition() {
    this.element.style.transform = `translateY(0px)`
    let pRect = null
    if (this.props.sticky === true) {
      pRect = {
        top: 0,
        height: window.innerHeight,
      }
    } else {
      pRect = this.scrollParent.element.getBoundingClientRect()
    }

    const gRect = this.element.getBoundingClientRect()

    if (gRect.top < pRect.top) {
      this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
    }
  }

  _onContainerScroll() {
    if (this.menu.element.offsetParent === null) {
      return
    }

    const domlist = this.containerElem.getElementsByClassName('nom-anchor-content')
    if (!domlist.length) return
    const list = []
    for (let i = 0; i < domlist.length; i++) {
      if (domlist[i].offsetParent !== null) {
        list.push(domlist[i])
      }
    }

    const pRect =
      this.container === window
        ? { top: 0, bottom: window.innerHeight }
        : this.containerElem.getBoundingClientRect()
    let current = 0
    for (let i = 0; i < list.length; i++) {
      const top = list[i].getBoundingClientRect().top
      const lastTop = i > 0 ? list[i - 1].getBoundingClientRect().top : 0
      if (top < pRect.bottom && lastTop < pRect.top) {
        current = i
      }
    }
    const classes = list[current].classList.value
    const idx = classes.indexOf('target-')
    const result = classes.slice(idx + 7)

    this._activeAnchor(result)
  }

  _activeAnchor(key) {
    this.menu.selectItem(key, {
      scrollIntoView: false,
    })
  }

  _remove() {
    window.removeEventListener('scroll', this.onWindowScroll)
  }
}

Component.register(Anchor)

export default Anchor
