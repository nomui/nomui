import Component from '../Component/index'
import Layer from '../Layer/index'

class PasswordPopup extends Layer {
    constructor(props, ...mixins) {
        const defaults = {
            trigger: null,
            triggerAction: 'click',
            align: 'bottom left',
            alignOuter: true,

            closeOnClickOutside: true,
            placement: 'append',

            autoRender: false,

            uistyle: 'default',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        super._created()
        this.setProps({
            children: [
                '大写已开启',
                {
                    ref: (c) => {
                        this.arrow = c
                    },
                    classes: { 'nom-password-arrow': true },
                    children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
                },
            ],

        })
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
        if (this.opener.props.disabled !== true && !this.props.PasswordPopupHidden) {
            this.props.PasswordPopupHidden !== true ? this.show() : this.hide()
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


Component.register(PasswordPopup)

export default PasswordPopup
