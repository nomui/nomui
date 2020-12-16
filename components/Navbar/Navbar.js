import Component from '../Component/index'
import Caption from "../Caption/index";
import Cols from "../Cols/index";
import NavbarCaption from './NavbarCaption'
import NavbarNav from './NavbarNav'
import NavbarTools from './NavbarTools'
import { isPlainObject } from '../util/index'

class Navbar extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            caption: null,
            nav: null,
            tools: null,
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    config() {
        let { caption, nav, tools } = this.props
        let toolsProps
        let captionProps = caption ? Component.extendProps({ component: Caption, titleLevel: 3 }, caption) : null
        let navProps = nav ? Component.extendProps({ component: Cols }, nav) : null
        if (Array.isArray(tools)) {
            toolsProps = { component: Cols, items: tools }
        }
        else if (isPlainObject(tools)) {
            toolsProps = Component.extendProps({ component: Cols }, tools)
        }

        this.setProps({
            children: [
                captionProps && { component: NavbarCaption, children: captionProps },
                navProps && { component: NavbarNav, children: navProps },
                toolsProps && { component: NavbarTools, children: toolsProps },
            ]
        })
    }
}

Component.register(Navbar)

export default Navbar