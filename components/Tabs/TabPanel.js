import Component from '../Component/index'

class TabPanel extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            hidden: true
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.tabContent = this.parent
        this.tabContent.panels[this.name] = this
    }

    _config() {
        this.setProps({
            hidden: this.key !== this.tabContent.props.selectedPanel
        })
    }

    _show() {
        this.tabContent.shownPanel && this.tabContent.shownPanel.hide()
        this.tabContent.shownPanel = this
    }
}

Component.register(TabPanel)

export default TabPanel