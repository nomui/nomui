import Component from '../Component/index'
import TabContent from './TabContent'
import TabList from './TabList'

class Tabs extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tabs: [],
      selectedTab: 0,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const tabItems = []
    const tabPanles = []
    for (let i = 0; i < this.props.tabs.length; i++) {
      const tab = this.props.tabs[i]
      tab.item.key = tab.item.key || `tab${i}`
      tab.panel.key = tab.panel.key || `tab${i}`
      tabItems.push(tab.item)
      tabPanles.push(tab.panel)
    }

    this.setProps({
      tabList: {
        component: TabList,
        name: 'tabList',
        items: tabItems,
        selectedItems: this.props.selectedTab,
        tabContent: function () {
          return that.tabContent
        },
      },
      tabContent: {
        component: TabContent,
        panels: tabPanles,
        _create: function () {
          that.tabContent = this
        },
      },
    })

    this.setProps({
      children: [this.props.tabList, this.props.tabContent],
    })
  }
}

Component.register(Tabs)

export default Tabs
