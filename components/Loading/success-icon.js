import Component from '../Component/index'

class SuccessIcon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
        }
        super(Component.extendProps(defaults, SuccessIcon.defaults, props), ...mixins)
    }


    _config() {
        this.setProps({
            classes: {
                'nom-loading-icon': true,
                'status-success': true
            },
            children: `#<svg width="2rem" height="2rem" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <!-- 圆环 --> <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="6" fill="none" stroke-dasharray="251.2 251.2" stroke-dashoffset="251.2"> <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="0.4s" fill="freeze" /> </circle> <path d="M25,50 L45,70 L75,35" stroke="currentColor" stroke-width="6" fill="none" stroke-dasharray="100" stroke-dashoffset="100" opacity="0"> <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.3s" begin="0.4s" fill="freeze" /> <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="0.4s" fill="freeze" /> </path> </svg>`
        })
    }
}

SuccessIcon.defaults = {
}

Component.register(SuccessIcon)

export default SuccessIcon
