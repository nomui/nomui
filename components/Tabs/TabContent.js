import Component from '../Component/index'
import { isFunction, isString } from '../util/index'
import TabPanel from './TabPanel'

class TabContent extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(TabContent.defaults, props), ...mixins)
  }

  _created() {
    this.panels = {}
    this.shownPanel = null
  }

  _config() {
    const { panels } = this.props
    const children = []
    if (Array.isArray(panels) && panels.length > 0) {
      for (let i = 0; i < panels.length; i++) {
        let panel = panels[i]
        panel = Component.extendProps({}, this.props.panelDefaults, panel)
        children.push(panel)
      }
    }

    this.setProps({
      children: children,
    })
  }

  createPanel(param) {
    this.props.panels.push(param)
    new TabPanel({
      reference: this.element,
      ...param
    })
  }

  getPanel(param) {
    let retPanel = null

    if (isString(param)) {
      return this.panels[param]
    }
    if (isFunction(param)) {
      for (const panel in this.panels) {
        if (this.panels.hasOwnProperty(panel)) {
          if (param.call(this.panels[panel]) === true) {
            retPanel = this.panels[panel]
            break
          }
        }
      }
    }

    return retPanel
  }

  showPanel(param) {
    const panel = this.getPanel(param)
    if (panel === null) {
      return false
    }
    panel.show()
  }

  removePanel(param) {
    this.panels[param] && delete this.panels[param]
    this.props.panels = this.props.panels.filter(x => {
      return x.key !== param
    })
    const panel = this.getPanel(param)
    if (panel) {
      panel.remove()
    }
  }
}
TabContent.defaults = {
  panels: [],
  panelDefaults: { component: TabPanel },
}
Component.register(TabContent)

export default TabContent
