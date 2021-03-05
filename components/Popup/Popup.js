import Component from '../Component/index'
import Layer from '../Layer/index'

class Popup extends Layer {
  constructor(props, ...mixins) {
    const defaults = {
      trigger: null,
      triggerAction: 'click',
      align: 'bottom left',
      alignOuter: true,

      closeOnClickOutside: true,
      placement: 'append',

      autoRender: false,
      hidden: true,

      uistyle: 'default',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this._showHandler = this._showHandler.bind(this)
    this._hideHandler = this._hideHandler.bind(this)
    this._onOpenerClickHandler = this._onOpenerClickHandler.bind(this)

    this.opener = this.props.trigger
    this.props.alignTo = this.opener.element
    this.showTimer = null
    this.hideTimer = null
    this.addRel(this.opener.element)
    this._bindTrigger()
  }

  _bindTrigger() {
    const { triggerAction } = this.props
    if (triggerAction === 'click') {
      this._bindClick()
    }
    if (triggerAction === 'hover') {
      this._bindHover()
    }
    if (triggerAction === 'both') {
      this._bindClick()
      this._bindHover()
    }
  }

  _bindClick() {
    this.opener._on('click', this._onOpenerClickHandler)
  }

  _bindHover() {
    this.opener._on('mouseenter', this._showHandler)
    this.opener._on('mouseleave', this._hideHandler)
  }

  _onOpenerClickHandler() {
    if (this.opener.props.disabled !== true) {
      this.toggleHidden()
    }
  }

  _showHandler() {
    if (this.opener.props.disabled !== true) {
      clearTimeout(this.hideTimer)
      this.hideTimer = null
      this.showTimer = setTimeout(() => {
        this.show()
      }, this.delay)
    }
  }

  _hideHandler() {
    if (this.opener.props.disabled !== true) {
      clearTimeout(this.showTimer)
      this.showTimer = null

      if (this.props.hidden === false) {
        this.hideTimer = setTimeout(() => {
          this.hide()
        }, this.delay)
      }
    }
  }

  _show() {
    super._show()
    if (this.props.triggerAction === 'hover') {
      this._off('mouseenter')
      this._on('mouseenter', () => {
        clearTimeout(this.hideTimer)
      })
      this._off('mouseleave')
      this._on('mouseleave', this._hideHandler)
    }
  }
}

Component.mixin({
  _rendered: function () {
    if (this.props.popup) {
      this.props.popup.trigger = this
      this.popup = new Popup(this.props.popup)
    }
  },
})

Component.register(Popup)

export default Popup
