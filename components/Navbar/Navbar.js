import Caption from '../Caption/index'
import Cols from '../Cols/index'
import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import NavbarCaption from './NavbarCaption'
import NavbarNav from './NavbarNav'
import NavbarTools from './NavbarTools'

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
    const { caption, nav, tools } = this.props
    let toolsProps
    const captionProps = caption
      ? Component.extendProps({ component: Caption, titleLevel: 3 }, caption)
      : null
    const navProps = nav ? Component.extendProps({ component: Cols }, nav) : null
    if (Array.isArray(tools)) {
      toolsProps = { component: Cols, items: tools }
    } else if (isPlainObject(tools)) {
      toolsProps = Component.extendProps({ component: Cols }, tools)
    }

    this.setProps({
      children: [
        captionProps && { component: NavbarCaption, children: captionProps },
        navProps && { component: NavbarNav, children: navProps },
        toolsProps && { component: NavbarTools, children: toolsProps },
      ],
    })
  }
}

Component.register(Navbar)

export default Navbar
