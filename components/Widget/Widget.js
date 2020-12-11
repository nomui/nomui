import Component from '../Component/index'
import WidgetHeader from './WidgetHeader'
import WidgetBody from './WidgetBody'
import WidgetFooter from './WidgetFooter'

class Widget extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            header: null,
            body: null,
            footer: null,
            type: 'default',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        let { header, body, footer } = this.props

        let headerProps = Component.extendProps({ component: WidgetHeader }, header)
        let bodyProps = Component.extendProps({ component: WidgetBody }, body)
        let footerProps = Component.extendProps({ component: WidgetFooter }, footer)

        this.setProps({
            children: [
                headerProps,
                bodyProps,
                footerProps,
            ]
        })
    }
}

Component.register(Widget)

export default Widget