import Component from '../Component/index'
import { checkOverflowAncestor, isFunction, isNumeric } from '../util/index'

class Anchor extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Anchor.defaults, props), ...mixins)
  }

  _created() {
    this.container = this.props.container
    if (isFunction(this.props.container)) {
      this.container = this.props.container()
    }

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
              that._scrollToKey(key, true)
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
        } else if (this.props.sticky === 'auto') {
          this.scrollParent = checkOverflowAncestor(this.element).component
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

    if (this.props.activeKey && this.props.autoScroll !== false) {
      setTimeout(() => {
        this.scrollToKey(this.props.activeKey)
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
    if (this.container === window || this.container === document) {
      // 对于 window，使用 scrollingElement 或 documentElement
      that.containerElem = document.scrollingElement || document.documentElement
    } else if (this.container && this.container.element) {
      that.containerElem = this.container.element
    } else {
      that.containerElem = null
    }

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

      this.container = this.props.container
      if (isFunction(this.props.container)) {
        this.container = this.props.container()
      }

      if (this.props.container === 'auto') {
        this.container = checkOverflowAncestor(this.element).component
      }

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

  _flagLastContent() {
    const keys = this.itemKeyList || []
    if (keys.length) {
      const root =
        this.container === window || this.container === document
          ? document
          : this.containerElem || document
      const lastContentKey = keys[keys.length - 1]
      const lastContent = root.querySelector(
        `[anchor-key="${lastContentKey.replace(/"/g, '\\"')}"]`,
      )
      if (lastContent) {
        let endHook = lastContent.querySelector('.end-position-hook')
        if (!endHook) {
          endHook = document.createElement('div')
          endHook.className = 'end-position-hook'
          lastContent.appendChild(endHook)
        }
        endHook.style.position = 'absolute'
        endHook.style.bottom = '0'
        endHook.style.height = `${this.element.offsetHeight}px` // ✅ Anchor 高度
        endHook.style.width = '1px'
      }
    }
  }

  _scrollToKey(target, skipScrollWatching) {
    const scrollContainer = this.containerElem
    if (!scrollContainer) {
      setTimeout(() => this._scrollToKey(target, skipScrollWatching), 50)
      return
    }
    // this._flagLastContent()
    const ele = this.containerElem.querySelector(
      `[anchor-key="${String(target).replace(/"/g, '\\"')}"]`,
    )
    if (ele) {
      ele.style.position = 'relative'
      let hk = ele.querySelector('.position-hook')
      if (!hk) {
        // 如果不存在，则创建一个
        hk = document.createElement('div')
        hk.className = 'position-hook'
        ele.appendChild(hk)
      }
      hk.style.position = 'absolute'
      hk.style.top = `${0 - this.props.containerOffsetTop}px`

      const beforeScrollTop = scrollContainer.scrollTop
      hk.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const afterScrollTop = scrollContainer.scrollTop
        if (afterScrollTop === beforeScrollTop) {
          // 强制轻微滚动触发重绘
          scrollContainer.scrollTop += 1

          // 再次调用 scrollIntoView
          hk.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 50)

      // 控制是否临时跳过滚动监听高亮
      if (skipScrollWatching) {
        this._skipScrollWatching = true
        // 一段时间后恢复监听
        setTimeout(() => {
          this._skipScrollWatching = false
        }, 1000)
      }
    }
  }

  _fixPosition() {
    if (!this.element || !this.scrollParent) return
    this.element.style.transform = `translateY(0px)`

    const pRect =
      this.props.sticky === true
        ? { top: this.props.offsetTop }
        : this.scrollParent.element.getBoundingClientRect()

    const gRect = this.element.getBoundingClientRect()

    // ✅ 核心：检查当前 Anchor 的所有内容是否有任何在可视区域
    if (!this._isAnyContentVisible()) {
      this.element.style.transform = ''
      return
    }

    // 吸附逻辑
    if (gRect.top < pRect.top) {
      this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
    }
  }

  _isAnyContentVisible() {
    const keys = this.itemKeyList || []
    if (!keys.length) return false

    const root =
      this.container === window || this.container === document ? null : this.containerElem || null

    // 容器的可视范围
    const rootRect = root ? root.getBoundingClientRect() : { top: 0, bottom: window.innerHeight }

    for (const k of keys) {
      const sel = `[anchor-key="${String(k).replace(/"/g, '\\"')}"]`
      const el = root ? root.querySelector(sel) : document.querySelector(sel)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      // 判断元素是否与容器可视区域有交集
      if (rect.bottom > rootRect.top && rect.top < rootRect.bottom) {
        return true
      }
    }
    return false
  }

  _onContainerScroll() {
    if (this.menu.element.offsetParent === null) {
      return
    }

    if (this._skipScrollWatching) {
      // 如果临时跳过滚动监听，则不执行高亮逻辑
      return
    }

    // 获取所有锚点内容元素
    const domlist = this.containerElem.getElementsByClassName('nom-anchor-content')
    if (!domlist.length) return

    // 过滤有效的锚点元素
    const list = []
    for (let i = 0; i < domlist.length; i++) {
      if (
        domlist[i].offsetParent !== null &&
        this.itemKeyList.includes(domlist[i].getAttribute('anchor-key'))
      ) {
        list.push(domlist[i])
      }
    }
    if (!list.length) return

    // 获取视口尺寸
    const pRect =
      this.container === window
        ? { top: 0, bottom: window.innerHeight }
        : this.containerElem.getBoundingClientRect()

    const viewportHeight = pRect.bottom - pRect.top
    const centerLine = pRect.top + viewportHeight / 2
    const upperQuarter = pRect.top + viewportHeight / 4
    const lowerQuarter = pRect.top + (viewportHeight * 3) / 4

    let bestMatch = null
    let maxScore = -Infinity

    // 特殊检查：是否滚动到最顶部
    const firstItem = list[0]
    const firstItemRect = firstItem.getBoundingClientRect()
    const isAtTop = firstItemRect.top >= pRect.top && firstItemRect.top <= pRect.top + 10 // 允许10px误差

    // 特殊检查：是否滚动到最底部
    const lastItem = list[list.length - 1]
    const lastItemRect = lastItem.getBoundingClientRect()
    const isAtBottom =
      lastItemRect.bottom <= pRect.bottom && lastItemRect.bottom >= pRect.bottom - 10

    // 如果到达顶部，直接高亮第一项
    if (isAtTop) {
      bestMatch = firstItem
    }
    // 如果到达底部，直接高亮最后一项
    else if (isAtBottom) {
      bestMatch = lastItem
    } else {
      // 正常情况：计算每个可见项的评分
      for (let i = 0; i < list.length; i++) {
        const elem = list[i]
        const rect = elem.getBoundingClientRect()

        // 跳过完全不可见的元素
        if (rect.bottom <= pRect.top || rect.top >= pRect.bottom) continue

        // 计算可见比例
        const visibleHeight = Math.min(rect.bottom, pRect.bottom) - Math.max(rect.top, pRect.top)
        const visibleRatio = visibleHeight / rect.height

        // 计算元素中心位置
        const elementCenter = rect.top + rect.height / 2

        // 中心距离分数（0-1，越接近中心越高）
        const centerDistanceScore =
          1 - Math.min(1, Math.abs(elementCenter - centerLine) / (viewportHeight / 2))

        // 区域权重（上部1.2，中部1.0，下部0.8）
        let positionWeight = 1.0
        if (elementCenter < upperQuarter) positionWeight = 1.2
        else if (elementCenter > lowerQuarter) positionWeight = 0.8

        // 首尾项额外加分（但不主导决策）
        const isFirstItem = i === 0
        const isLastItem = i === list.length - 1
        const edgeBonus = isFirstItem || isLastItem ? Math.min(0.15, visibleRatio * 0.2) : 0

        // 综合评分
        const score = visibleRatio * centerDistanceScore * positionWeight + edgeBonus

        // 记录最高分项
        if (score > maxScore) {
          maxScore = score
          bestMatch = elem
        }
      }

      // 渐进式高亮保障：确保不会跳过中间项
      if (bestMatch && this.currentKey) {
        const currentIndex = this.itemKeyList.indexOf(this.currentKey)
        const newIndex = this.itemKeyList.indexOf(bestMatch.getAttribute('anchor-key'))

        if (Math.abs(newIndex - currentIndex) > 1) {
          const step = newIndex > currentIndex ? 1 : -1
          let intermediateIndex = currentIndex + step

          while (intermediateIndex !== newIndex) {
            const intermediateKey = this.itemKeyList[intermediateIndex]
            const intermediateElem = list.find(
              (el) => el.getAttribute('anchor-key') === intermediateKey,
            )

            if (intermediateElem) {
              const rect = intermediateElem.getBoundingClientRect()
              if (rect.bottom > pRect.top && rect.top < pRect.bottom) {
                const intermediateVisible =
                  Math.min(rect.bottom, pRect.bottom) - Math.max(rect.top, pRect.top)
                if (intermediateVisible >= 30) {
                  bestMatch = intermediateElem
                  break
                }
              }
            }
            intermediateIndex += step
          }
        }
      }
    }

    // 执行高亮
    const result = bestMatch ? bestMatch.getAttribute('anchor-key') : null
    if (result && result !== this.currentKey) {
      this._activeAnchor(result)
    }

    // --- 检查是否有元素在可视区域内 ---
    let anyVisible = false
    for (let i = 0; i < list.length; i++) {
      const r = list[i].getBoundingClientRect()
      // 有交集则认为可见（部分可见也算）
      if (r.bottom > pRect.top && r.top < pRect.bottom) {
        anyVisible = true
        break
      }
    }

    if (!anyVisible && this.props.sticky && this.props.autoHide) {
      // 全部不可见：取消吸附（清空 transform，让元素随文档流）
      this.element.style.transform = ''
    } else {
      // 有可见项：恢复吸附逻辑（使用现有的 _fixPosition）
      this._fixPosition()
    }
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
  containerOffsetTop: 0,
  sticky: false,
  itemDefaults: null,
  activeKey: null,
  onChange: null,
  menuProps: {},
  keyField: 'key',
  autoScroll: false,
}

Component.register(Anchor)

export default Anchor
