import Component from '../Component/index';
import NavbarBody from './NavbarBody'
import NavbarTitle from './NavbarTitle'
import NavbarTools from './NavbarTools'

class Navbar extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: null,
            body: {},
            tools: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    config() {
        this.setProps({
            title: { component: NavbarTitle },
            body: { component: NavbarBody },
            tools: { component: NavbarTools }
        })

        this.setProps({
            children: [
                this.props.title,
                this.props.body,
                this.props.tools
            ]
        })
    }
}

Component.register(Navbar)

export default Navbar