import Component from '../Component/index'
import TabContent from './TabContent'
import TabList from './TabList'

class Tabs extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tabs: [],
      // selectedTab: 'tab0',
      uistyle: 'plain', // hat,card,line,pill
      onTabSelectionChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('fit')
    const that = this
    const tabItems = []
    const tabPanles = []
    const { tabs, uistyle } = this.props
    let { selectedTab } = this.props
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i]
      const key = tab.key || `tab${i}`
      tab.item.key = key
      tab.panel.key = key
      tabItems.push(tab.item)
      tabPanles.push(tab.panel)
    }

    if (selectedTab === undefined) {
      selectedTab = tabItems[0] && tabItems[0].key
    }

    this.setProps({
      tabList: {
        component: TabList,
        name: 'tabList',
        items: tabItems,
        uistyle: uistyle,
        selectedTab: selectedTab,
        _created: function () {
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

  selectTab(key) {
    return this.tabList.selectItem(key)
  }

  updatePanel(key, newPanelProps) {
    const panel = this.tabContent.getPanel(key)
    panel.update(newPanelProps)
  }
}

Component.register(Tabs)

export default Tabs
