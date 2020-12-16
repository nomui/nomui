import Component from '../Component/index'
import PanelHeader from './PanelHeader'
import PanelBody from './PanelBody'
import PanelFooter from './PanelFooter'

class Panel extends Component {
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
        let footerProps
        let headerProps = Component.extendProps({ component: PanelHeader }, header)
        let bodyProps = Component.extendProps({ component: PanelBody }, body)
        if (footer) {
            footerProps = Component.extendProps({ component: PanelFooter }, footer)
        }

        this.setProps({
            children: [
                headerProps,
                bodyProps,
                footerProps,
            ]
        })
    }
}

Component.register(Panel)

export default Panel