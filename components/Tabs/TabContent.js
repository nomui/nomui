import Component from '../Component/index'
import TabPanel from './TabPanel'
import { isString, isFunction } from '../util/index'

class TabContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            panels: [],
            panelDefaults: { component: TabPanel }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.panels = {}
        this.shownPanel = null
    }

    _config() {
        var panels = this.props.panels
        var children = []
        if (Array.isArray(panels) && panels.length > 0) {
            for (var i = 0; i < panels.length; i++) {
                var panel = panels[i]
                panel = Component.extendProps({}, this.props.panelDefaults, panel)
                children.push(panel)
            }
        }

        this.setProps({
            children: children
        })
    }

    getPanel(param) {
        var retPanel = null

        if (isString(param)) {
            return this.panels[param]
        }
        else if (isFunction(param)) {
            for (var panel in this.panels) {
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
        var panel = this.getPanel(param);
        if (panel === null) {
            return false
        }
        panel.show()
    }
}

Component.register(TabContent)

export default TabContent