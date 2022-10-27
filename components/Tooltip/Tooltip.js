import Component from '../Component/index'
import Layer from '../Layer/index'
import { isString } from '../util/index'

class Tooltip extends Layer {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tooltip.defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this._showHandler = this._showHandler.bind(this)
    this._hideHandler = this._hideHandler.bind(this)
    this._onOpenerFocusinHandler = this._onOpenerFocusinHandler.bind(this)
    this._onOpenerFocusoutHandler = this._onOpenerFocusoutHandler.bind(this)

    this._openerFocusing = false
    this.opener = this.props.trigger
    this.props.alignTo = this.props.alignTo || this.opener.element
    this.showTimer = null
    this.hideTimer = null
    this.delay = 100
    this.addRel(this.opener.element)
    this._bindHover()
  }

  _config() {
    this.setProps({
      attrs: {
        'tooltip-align': this.props.align,
      },
      children: [
        this.props.children,
        {
          ref: (c) => {
            this.arrow = c
          },
          classes: { 'nom-tooltip-arrow': true },
          children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
        },
      ],
    })
    super._config()
  }

  _rendered() {
    const bg = getComputedStyle(this.element)['background-color']
    this.arrow.element.style.color = bg
  }

  _fixDirection() {
    if (!this.element) return false
    if (this.props.align === 'top' || this.props.align === 'bottom') {
      if (this.element.getAttribute('offset-y') !== '0') {
        this.element.setAttribute('tooltip-align', this.props.align === 'top' ? 'bottom' : 'top')
      } else {
        this.element.setAttribute('tooltip-align', this.props.align)
      }
    } else if (this.props.align === 'left' || this.props.align === 'right') {
      if (this.element.getAttribute('offset-x') !== '0') {
        this.element.setAttribute('tooltip-align', this.props.align === 'left' ? 'right' : 'left')
      } else {
        this.element.setAttribute('tooltip-align', this.props.align)
      }
    }
    if (this.props.animate) {
      let align = this.element.getAttribute('tooltip-align')
      const s = align.indexOf(' ')
      if (s !== -1) {
        align = align.substring(0, s)
      }
      this.addClass(`nom-tooltip-animate-${align}-show`)
    }
  }

  _remove() {
    this.opener._off('mouseenter', this._showHandler)
    this.opener._off('mouseleave', this._hideHandler)
    this.opener._off('focusin', this._onOpenerFocusinHandler)
    this.opener._off('focusout', this._onOpenerFocusoutHandler)

    this._off('mouseenter')
    this._off('mouseleave')
    clearTimeout(this.showTimer)
    this.showTimer = null
    clearTimeout(this.hideTimer)
    this.hideTimer = null
    super._remove()
  }

  _bindHover() {
    this.opener._on('mouseenter', this._showHandler)
    this.opener._on('mouseleave', this._hideHandler)
    this.opener._on('focusin', this._onOpenerFocusinHandler)
    this.opener._on('focusout', this._onOpenerFocusoutHandler)
  }

  _onOpenerFocusinHandler() {
    this._openerFocusing = true
    this._showHandler()
  }

  _onOpenerFocusoutHandler() {
    this._openerFocusing = false
    this._hideHandler()
  }

  _showHandler() {
    clearTimeout(this.hideTimer)
    this.hideTimer = null
    this.showTimer = setTimeout(() => {
      this.show()
    }, this.delay)
  }

  _hideHandler() {
    if (this._openerFocusing === true && this.opener.componentType !== 'Button') {
      return
    }
    clearTimeout(this.showTimer)
    this.showTimer = null

    if (this.props.hidden === false) {
      this.hideTimer = setTimeout(() => {
        this.props && this.props.animate && this.animateHide()
        this.props && !this.props.animate && this.hide()
      }, this.delay)
    }
  }

  animateHide() {
    if (!this.element) return false
    this.addClass('nom-tooltip-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
      this.removeClass('nom-tooltip-animate-hide')
    }, 90)
  }

  _show() {
    super._show()
    this._off('mouseenter')
    this._on('mouseenter', function () {
      clearTimeout(this.hideTimer)
    })
    this._off('mouseleave', this._hideHandler)
    this._on('mouseleave', this._hideHandler)
    const docTop = this.getScrollTop()
    if (docTop !== 0) {
      this.element.style.top = `${this.element.style.top.replace('px', '') - docTop}px`
    }
    this._fixDirection()
  }

  getScrollTop() {
    let scroll_top = 0
    if (document.documentElement && document.documentElement.scrollTop) {
      scroll_top = document.documentElement.scrollTop
    } else if (document.body) {
      scroll_top = document.body.scrollTop
    }
    return scroll_top
  }
}
Tooltip.defaults = {
  trigger: null,
  align: 'top',
  alignOuter: true,

  closeOnClickOutside: true,

  autoRender: false,
  hidden: false,
}
Component.mixin({
  _rendered: function () {
    if (this.props.tooltip) {
      if (isString(this.props.tooltip)) {
        this.tooltip = new Tooltip({ trigger: this, children: this.props.tooltip })
      } else {
        this.tooltip = new Tooltip(
          Component.extendProps({}, this.props.tooltip, {
            trigger: this,
          }),
        )
      }
    }
  },
})

Component.register(Tooltip)

export default Tooltip
