import Component from '../Component/index'
import LayoutHeader from './LayoutHeader'
import LayoutBody from './LayoutBody'
import LayoutFooter from './LayoutFooter'
import LayoutSider from './LayoutSider'

class Layout extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            header: null,
            body: null,
            footer: null,
            sider: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps(
            {
                tag: 'div',
                header: this.props.header && { component: LayoutHeader },
                body: this.props.body && { component: LayoutBody },
                footer: this.props.footer && { component: LayoutFooter },
                sider: this.props.sider && { component: LayoutSider }
            }
        )

        if (this.props.sider) {
            this.setProps({
                classes: {
                    'p-has-sider': true
                },
                children: [
                    this.props.sider && this.props.sider,
                    this.props.body && this.props.body
                ]
            })
        }
        else {
            this.setProps({
                children: [
                    this.props.header && this.props.header,
                    this.props.body && this.props.body,
                    this.props.footer && this.props.footer
                ]
            })
        }
    }
}

Component.register(Layout)

export default Layout