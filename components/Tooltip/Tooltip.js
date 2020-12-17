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
            hidden: true,

            styles: {
                color: 'black'
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        super._create()

        this.opener = this.props.trigger
        this.props.alignTo = this.opener.element
        this.showTimer = null, this.hideTimer = null
        this.addRel(this.opener.element)
        this._bindHover()
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
        if (this.props.tooltip) {
            if (isString(this.props.tooltip)) {
                this.tooltip = new Tooltip({ trigger: this, children: this.props.tooltip })
            }
            else {
                this.tooltip = new Tooltip(Component.extendProps({}, this.props.tooltip), { trigger: this })
            }
        }
    }
})

Component.register(Tooltip)

export default Tooltip
