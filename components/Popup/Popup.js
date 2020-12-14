import Component from '../Component/index'
import Layer from '../Layer/index'

class Popup extends Layer {
    constructor(props, ...mixins) {
        const defaults = {
            trigger: null,
            triggerType: 'click',
            align: 'bottom left',
            alignOuter: true,

            closeOnClickOutside: true,
            placement: 'append',

            rendered: false,
            hidden: true,

            type: 'default'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        super._create()

        if (this.props.trigger instanceof Component) {
            this.triggerElem = this.props.trigger.element
            this.parent = this.props.trigger
        }
        else {
            this.triggerElem = this.props.trigger
        }
        this.props.alignTo = this.triggerElem
        this.showTimer = null, this.hideTimer = null
        this.addRel(this.triggerElem)
        this._bindTrigger();
    }

    _bindTrigger() {
        var triggerType = this.props.triggerType;
        if (triggerType === 'click') {
            this._bindClick()
        } else {
            this._bindHover()
        }
    }

    _bindClick() {
        this._on(this.triggerElem, 'click', this.toggleHidden)
    }

    _onTriggerMouseEnter() {

    }

    _bindHover() {
        var that = this
        var delay = 100

        this._on(this.triggerElem, 'mouseenter', function () {
            clearTimeout(this.hideTimer)
            this.hideTimer = null
            this.showTimer = setTimeout(function () {
                that.show()
            }, delay)
        }, false);
        this._on(this.triggerElem, 'mouseleave', this._leaveHandler)
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
        Layer.prototype._show.call(this)
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