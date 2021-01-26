import Component from '../Component/index'
import TabContent from './TabContent'
import TabList from './TabList'

class Tabs extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tabs: [],
      selectedTab: 'tab0',
      uistyle: 'plain', // hat,card,line,pill
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const tabItems = []
    const tabPanles = []
    const { tabs, uistyle, selectedTab } = this.props
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
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
        uistyle: uistyle,
        selectedTab: selectedTab,
        created: function () {
          this.tabs = that
          that.tabList = this
        },
        tabContent: function () {
          return that.tabContent
        },
      },
      tabContent: {
        component: TabContent,
        panels: tabPanles,
        _created: function () {
          that.tabContent = this
        },
      },
    })

    this.setProps({
      children: [this.props.tabList, this.props.tabContent],
    })
  }

  getSelectedTab() {
    return this.tabList.getSelectedItem()
  }
}

Component.register(Tabs)

export default Tabs
