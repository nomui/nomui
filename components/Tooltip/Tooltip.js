import Component from '../Component/index'
import Layer from '../Layer/index'
import { isString } from '../util/index'

class Tooltip extends Layer {
  constructor(props, ...mixins) {
    const defaults = {
      trigger: null,
      align: 'top',
      alignOuter: true,

      closeOnClickOutside: true,

      autoRender: false,
      hidden: false,

      styles: {
        color: 'black',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this._showHandler = this._showHandler.bind(this)
    this._hideHandler = this._hideHandler.bind(this)
    this._onOpenerFocusinHandler = this._onOpenerFocusinHandler.bind(this)
    this._onOpenerFocusoutHandler = this._onOpenerFocusoutHandler.bind(this)

    this._openerFocusing = false
    this.opener = this.props.trigger
    this.props.alignTo = this.opener.element
    this.showTimer = null
    this.hideTimer = null
    this.delay = 100
    this.addRel(this.opener.element)
    this._bindHover()
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
    if (this._openerFocusing === true) {
      return
    }
    clearTimeout(this.showTimer)
    this.showTimer = null

    if (this.props.hidden === false) {
      this.hideTimer = setTimeout(() => {
        this.hide()
      }, this.delay)
    }
  }

  _show() {
    super._show()
    this._off('mouseenter')
    this._on('mouseenter', function () {
      clearTimeout(this.hideTimer)
    })
    this._off('mouseleave', this._hideHandler)
    this._on('mouseleave', this._hideHandler)
  }
}

Component.mixin({
  _rendered: function () {
    if (this.props.tooltip) {
      if (isString(this.props.tooltip)) {
        this.tooltip = new Tooltip({ trigger: this, children: this.props.tooltip })
      } else {
        this.tooltip = new Tooltip(Component.extendProps({}, this.props.tooltip), {
          trigger: this,
        })
      }
    }
  },
})

Component.register(Tooltip)

export default Tooltip
