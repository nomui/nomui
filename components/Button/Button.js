import Component from '../Component/index'

class Button extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'button',
            text: null,
            icon: null,
            rightIcon: null,
            hoverable: true,
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this._propStyleClasses = ['size']
        let { icon, text, rightIcon, href } = this.props

        if (icon || rightIcon) {
            this.setProps({
                classes: {
                    'p-with-icon': true
                }
            })
        }

        this.setProps({
            children: [
                Component.normalizeIconProps(icon),
                text && { tag: 'span', children: text },
                Component.normalizeIconProps(rightIcon)
            ]
        })

        if (href) {
            this.setProps({
                attrs: {
                    onclick: () => {
                        window.location = href;
                    }
                }
            })
        }
    }

    _disable() {
        this.element.setAttribute('disabled', 'disabled')
    }
}

Component.register(Button)

export default Button