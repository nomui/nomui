import Component from '../Component/index'

class Button extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'button',
            text: null,
            icon: null,
            rightIcon: null,
            hoverable: true
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        let { icon, text, rightIcon, href } = this.props
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
                        window.location.hash = href;
                    }
                }
            })
        }
    }

    _disable() {
        this.element.prop('disabled', true)
    }
}

Component.register(Button)

export default Button