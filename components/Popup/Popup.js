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
      content: null,

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
    this.opener.on('remove', () => {
      this.remove()
    })
    this.props.alignTo = this.opener.element
    this.showTimer = null
    this.hideTimer = null
    this.addRel(this.opener.element)
    this._bindTrigger()
  }

  _config() {
    if (this.props.content && this.componentType === 'Popup') {
      this.setProps({
        classes: {
          'nom-popup-adapt-to-screen': true,
        },
        children: {
          children: this.props.content,
        },
      })
    }

    super._config()
  }

  setPosition() {
    super.setPosition()
    if (this.props.content) {
      const t = this.element.style.top || 10
      const h = `calc(100vh - ${parseInt(t, 10) + 20}px)`
      this.element.style.maxHeight = h
    }
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

  _unbindTrigger() {
    if (!this.opener) return
    const { triggerAction } = this.props

    if (triggerAction === 'click') {
      this.opener._off('click', this._onOpenerClickHandler)
    }
    if (triggerAction === 'hover') {
      this.opener._off('mouseenter', this._showHandler)
      this.opener._off('mouseleave', this._hideHandler)
    }
    if (triggerAction === 'both') {
      this.opener._off('click', this._onOpenerClickHandler)
      this.opener._off('mouseenter', this._showHandler)
      this.opener._off('mouseleave', this._hideHandler)
    }
  }

  _remove() {
    this._unbindTrigger()
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
      const refName = this.props.popup.refName || 'popup'
      this[refName] = new Popup(this.props.popup)
    }
  },
})

Component.register(Popup)

export default Popup
