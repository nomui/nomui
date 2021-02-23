import Caption from '../Caption/index'
import Cols from '../Cols/index'
import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import NavbarCaption from './NavbarCaption'
import NavbarCaptionBefore from './NavbarCaptionBefore'
import NavbarCaptionAfter from './NavbarCaptionAfter'
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
    this._addPropStyle('fit')
    const { caption, nav, tools, captionBefore, captionAfter } = this.props
    let toolsProps, captionBeforeProps, captionAfterProps
    const captionProps = caption
      ? Component.extendProps({ component: Caption, titleLevel: 3 }, caption)
      : null
    const navProps = nav ? Component.extendProps({ component: Cols }, nav) : null
    if (Array.isArray(tools)) {
      toolsProps = { component: Cols, items: tools }
    } else if (isPlainObject(tools)) {
      toolsProps = Component.extendProps({ component: Cols }, tools)
    }
    if (Array.isArray(captionBefore)) {
      captionBeforeProps = { component: Cols, items: captionBefore }
    } else if (isPlainObject(tools)) {
      captionBeforeProps = Component.extendProps({ component: Cols }, captionBefore)
    }
    if (Array.isArray(captionAfter)) {
      captionAfterProps = { component: Cols, items: captionAfter }
    } else if (isPlainObject(tools)) {
      captionAfterProps = Component.extendProps({ component: Cols }, captionAfter)
    }

    this.setProps({
      children: [
        captionBeforeProps && { component: NavbarCaptionBefore, children: captionBeforeProps },
        captionProps && { component: NavbarCaption, children: captionProps },
        captionAfterProps && { component: NavbarCaptionAfter, children: captionAfterProps },
        navProps && { component: NavbarNav, children: navProps },
        toolsProps && { component: NavbarTools, children: toolsProps },
      ],
    })
  }
}

Component.register(Navbar)

export default Navbar
