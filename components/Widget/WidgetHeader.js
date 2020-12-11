import Component from '../Component/index'
import Caption from "../Caption/index";
import Flex from "../Flex/index";
import WidgetHeaderCaption from './WidgetHeaderCaption'
import WidgetHeaderNav from './WidgetHeaderNav'
import WidgetHeaderTools from './WidgetHeaderTools'
import { isPlainObject } from '../util/index'

class WidgetHeader extends Component {
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
        let captionProps = caption ? Component.extendProps({ component: Caption }, caption) : null
        let navProps = nav ? Component.extendProps({ component: Flex }, nav) : null
        if (Array.isArray(tools)) {
            toolsProps = { component: Flex, items: tools }
        }
        else if (isPlainObject(tools)) {
            toolsProps = Component.extendProps({ component: Flex }, tools)
        }

        this.setProps({
            children: [
                captionProps && { component: WidgetHeaderCaption, children: captionProps },
                navProps && { component: WidgetHeaderNav, children: navProps },
                toolsProps && { component: WidgetHeaderTools, children: toolsProps },
            ]
        })
    }
}

Component.register(WidgetHeader)

export default WidgetHeader