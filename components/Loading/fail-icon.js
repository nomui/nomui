import Component from '../Component/index'

class FailIcon extends Component {
    constructor(props, ...mixins) {
        const defaults = {
        }
        super(Component.extendProps(defaults, FailIcon.defaults, props), ...mixins)
    }


    _config() {
        this.setProps({
            classes: {
                'nom-loading-icon': true,
                'status-fail': true
            },
            children: `#<svg width="2rem" height="2rem" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"> <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="6" fill="none" stroke-dasharray="251.2 251.2" stroke-dashoffset="251.2"><animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="0.4s" fill="freeze" /></circle><path d="M30,30 L70,70" stroke="currentColor" stroke-width="6" fill="none" stroke-dasharray="60" stroke-dashoffset="60" opacity="0"><animate attributeName="stroke-dashoffset" from="40" to="0" dur="0.3s" begin="0.4s" fill="freeze" /><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.4s" fill="freeze" /></path><path d="M70,30 L30,70" stroke="currentColor" stroke-width="6" fill="none" stroke-dasharray="60" stroke-dashoffset="60" opacity="0"><animate attributeName="stroke-dashoffset" from="40" to="0" dur="0.3s" begin="0.7s" fill="freeze" /><animate attributeName="opacity" from="0" to="1" dur="0.3s" begin="0.7s" fill="freeze" /></path></svg>`
        })
    }
}

FailIcon.defaults = {
}

Component.register(FailIcon)

export default FailIcon
