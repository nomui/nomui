import Caption from '../Caption/index'
import Cols from '../Cols/index'
import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import PanelHeaderCaption from './PanelHeaderCaption'
import PanelHeaderNav from './PanelHeaderNav'
import PanelHeaderTools from './PanelHeaderTools'

class PanelHeader extends Component {
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
    const captionProps = caption ? Component.extendProps({ component: Caption }, caption) : null
    const navProps = nav ? Component.extendProps({ component: Cols }, nav) : null
    if (Array.isArray(tools)) {
      toolsProps = { component: Cols, items: tools }
    } else if (isPlainObject(tools)) {
      toolsProps = Component.extendProps({ component: Cols }, tools)
    }

    this.setProps({
      children: [
        captionProps && { component: PanelHeaderCaption, children: captionProps },
        navProps && { component: PanelHeaderNav, children: navProps },
        toolsProps && { component: PanelHeaderTools, children: toolsProps },
      ],
    })
  }
}

Component.register(PanelHeader)

export default PanelHeader
