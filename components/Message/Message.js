import Component from '../Component/index'
import Layer from '../Layer/index'

class Message extends Layer {
    constructor(props, ...mixins) {
        const defaults = {
            type: null,
            icon: null,
            content: null,
            commands: null,
            duration: 2,
            closeToRemove: true,
            showClose: false,
            position: {
                my: "center center",
                at: "center center",
                of: window
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        super._config()

        const iconMap = {
            info: 'info',
            success: 'success',
            error: 'warn',
            warning: 'warn'
        }

        var icon = this.props.icon || iconMap[this.props.type]
        let iconProps = Component.normalizeIconProps(icon)
        if (iconProps) {
            iconProps = Component.extendProps(iconProps, { classes: { 'nom-message-icon': true } })
        }
        this.props.content = Component.normalizeTemplateProps(this.props.content)
        this.setProps({
            content: {
                classes: {
                    'nom-message-content': true
                }
            }
        })
        this.setProps({
            children: [
                iconProps,
                this.props.content,
                this.props.showClose && { component: 'Button', icon: 'close' }
            ]
        })
    }

    _render() {
        var that = this, props = this.props

        if (props.duration) {
            setTimeout(function () {
                that.close()
            }, 1000 * props.duration)
        }
    }
}

Component.register(Message)

export default Message