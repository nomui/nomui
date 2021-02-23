import Component from '../Component/index'
import LayoutHeader from './LayoutHeader'
import LayoutBody from './LayoutBody'
import LayoutFooter from './LayoutFooter'
import LayoutSider from './LayoutSider'
import LayoutAsider from './LayoutAsider'

class Layout extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            header: null,
            body: null,
            footer: null,
            sider: null,
            asider: null,
            fit: true
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const { header, body, footer, sider, asider } = this.props
        this._addPropStyle('fit')

        this.setProps(
            {
                tag: 'div',
                header: header && { component: LayoutHeader },
                body: body && { component: LayoutBody },
                footer: footer && { component: LayoutFooter },
                sider: sider && { component: LayoutSider },
                asider: asider && { component: LayoutAsider }
            }
        )

        if (sider || asider) {
            this.setProps({
                classes: {
                    'p-has-sider': true
                },
                children: [
                    this.props.sider,
                    this.props.body,
                    this.props.asider
                ]
            })
        }
        else {
            this.setProps({
                children: [
                    this.props.header,
                    this.props.body,
                    this.props.footer
                ]
            })
        }
    }
}

Component.register(Layout)

export default Layout