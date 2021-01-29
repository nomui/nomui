import Component from '../Component/index'

class TabPanel extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      hidden: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tabContent = this.parent
    this.tabContent.panels[this.key] = this
  }

  _config() {
    this.setProps({
      hidden: this.key !== this.tabContent.props.selectedPanel,
    })
  }

  _show() {
    if (this.tabContent.shownPanel === this) {
      return
    }
    this.tabContent.shownPanel && this.tabContent.shownPanel.hide()
    this.tabContent.shownPanel = this
    this.tabContent.props.selectedPanel = this.key
  }
}

Component.register(TabPanel)

export default TabPanel
