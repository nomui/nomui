import Component from '../Component/index'
import { isFunction, isString } from '../util/index'
import TabPanel from './TabPanel'

class TabContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      panels: [],
      panelDefaults: { component: TabPanel },
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
}

Component.register(TabContent)

export default TabContent
