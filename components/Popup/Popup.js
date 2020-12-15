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

            type: 'default'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        super._create()

        this.opener = this.props.trigger
        this.props.alignTo = this.opener.element
        this.showTimer = null, this.hideTimer = null
        this.addRel(this.opener.element)
        this._bindTrigger();
    }

    _bindTrigger() {
        var triggerAction = this.props.triggerAction;
        if (triggerAction === 'click') {
            this._bindClick()
        } else {
            this._bindHover()
        }
    }

    _bindClick() {
        this.opener._on('click', this.toggleHidden, this)
    }

    _bindHover() {
        var that = this
        var delay = 100
        this.opener._on('mouseenter', function () {
            clearTimeout(this.hideTimer)
            this.hideTimer = null
            this.showTimer = setTimeout(function () {
                that.show()
            }, delay)
        }, this)

        this.opener._on('mouseleave', this._leaveHandler, this)
    }

    _leaveHandler() {
        var that = this
        var delay = 100
        clearTimeout(this.showTimer)
        this.showTimer = null

        if (that.props.hidden === false) {
            this.hideTimer = setTimeout(function () {
                that.hide()
            }, delay)
        }
    }

    _show() {
        super._show()
        this._off('mouseenter')
        this._on('mouseenter', function () {
            clearTimeout(this.hideTimer)
        })
        this._off('mouseleave')
        this._on('mouseleave', this._leaveHandler)
    }
}

Component.mixin({
    _render: function () {
        if (this.props.popup) {
            this.props.popup.trigger = this
            this.popup = new Popup(this.props.popup)
        }
    }
})

Component.register(Popup)

export default Popup