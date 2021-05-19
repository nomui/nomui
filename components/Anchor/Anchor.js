import Component from '../Component/index'
import { isFunction, isNumeric } from '../util/index'

class Anchor extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      content: null,
      items: [],
      border: 'left',
      onItemClick: null,
      width: 180,
      sticky: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { items, border, width } = this.props
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
          onClick: function (args) {
            that.props.onItemClick &&
              that._callHandler(that.props.onItemClick, args.sender.props.key)
            that._scrollToKey(args.sender.props.key)
          },
        },
      },
    })
  }

  _rendered() {
    const that = this
    if (!this.props.sticky) {
      return
    }
    this.position = null
    this.size = null

    if (this.props.sticky === true) {
      this.scrollParent = window
      this.scrollParent.onscroll = function () {
        that._fixPosition()
      }
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

    this.props.content._on('scroll', function () {
      that._onContentScroll()
    })
  }

  _scrollToKey(target) {
    const content = this.props.content.element.getElementsByClassName(`nom-anchor-target-${target}`)
    content.length && content[0].scrollIntoView({ behavior: 'smooth' })
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

  _onContentScroll() {
    const list = this.props.content.element.getElementsByClassName('nom-anchor-content')
    const pRect = this.props.content.element.getBoundingClientRect()
    let current = 0
    for (let i = 0; i < list.length; i++) {
      const top = list[i].getBoundingClientRect().top
      if (top < pRect.bottom) {
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
}

Component.register(Anchor)

export default Anchor
