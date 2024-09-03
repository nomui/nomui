import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'

class Anchor extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Anchor.defaults, props), ...mixins)
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
    this.currentKey = null
    this.itemsKeyList = []
  }

  _config() {
    const that = this
    const { items, border, width, itemDefaults, menuProps } = this.props
    const myWidth = isNumeric(width) ? `${width}px` : width
    this.itemKeyList = this._getItemKeyList()

    this.setProps({
      classes: {
        'nom-anchor-border-left': border === 'left',
        'nom-anchor-border-right': border === 'right',
        'nom-anchor-border-bottom': border === 'bottom',
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
        ...menuProps,
        itemDefaults: {
          key: function () {
            return this.props[that.props.keyField]
          },
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

    if (this.props.activeKey) {
      setTimeout(() => {
        this.scrollToKey(this.props.activeKey)
      }, 500)
    }
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
      this._checkContainer()
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

  scrollToItem(key) {
    this._scrollToKey(key)
  }

  getCurrentItem() {
    if (!this.currentKey) {

      return this.props.items.length ? this.props.items[0][this.props.keyField] : null
    }
    return this.currentKey
  }

  _bindScroll() {
    const that = this
    this.container._on('scroll', function () {
      that.containerElem = that.container.element
      that._onContainerScroll()
    })
  }

  _checkContainer() {
    this.intervalFunc = setInterval(() => {
      if (!this.props) {
        return
      }
      this.container = isFunction(this.props.container)
        ? this.props.container()
        : this.props.container
      if (this.container) {
        clearInterval(this.intervalFunc)
        this._bindScroll()
      }
    }, 500)
  }

  _getItemKeyList() {
    const me = this
    const arr = []
    function mapList(data) {
      data.forEach(function (item) {
        if (item.items) {
          mapList(item.items)
        }
        arr.push(item[me.props.keyField])
      })
    }
    mapList(this.props.items)

    return arr
  }

  scrollToKey(key) {
    this._scrollToKey(key)
  }

  _scrollToKey(target) {
    const ele = this.containerElem.querySelector(`[anchor-key=${target}]`)
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth' })
    }
  }

  _fixPosition() {
    this.element.style.transform = `translateY(0px)`
    let pRect = null
    if (this.props.sticky === true) {
      pRect = {
        top: this.props.offsetTop,
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

      if (
        domlist[i].offsetParent !== null &&
        this.itemKeyList.includes(domlist[i].getAttribute('anchor-key'))
      ) {
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



    const result = list[current] ? list[current].getAttribute('anchor-key') : null

    result && this._activeAnchor(result)
  }

  _activeAnchor(key) {
    this.menu.selectItem(key, {
      scrollIntoView: false,
    })


    if (this.currentKey && key !== this.currentKey && this.props.onChange) {
      this._callHandler(this.props.onChange, { key: key })
    }
    this.currentKey = key
  }

  _remove() {
    window.removeEventListener('scroll', this.onWindowScroll)
  }
}

Anchor.defaults = {
  container: null,
  items: [],
  border: 'left',
  onItemClick: null,
  width: 200,
  offsetTop: 0,
  sticky: false,
  itemDefaults: null,
  activeKey: null,
  onChange: null,
  menuProps: {},
  keyField: 'key'
}

Component.register(Anchor)

export default Anchor
