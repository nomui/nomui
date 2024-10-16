import Component from '../Component/index'
import { isFunction } from '../util/index'
import TabContent from './TabContent'
import TabList from './TabList'

class Tabs extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tabs.defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('fit')
    const that = this
    const tabItems = []
    const tabPanles = []
    const { tabs, uistyle, disabledItems } = this.props
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
        disabledItems: disabledItems,
        _created: function () {
          this.tabs = that
          that.tabList = this
        },
        tabContent: function () {
          return that.tabContent
        },
        parentTab: this,
      },
      tabContent: {
        component: TabContent,
        panels: tabPanles,
        _created: function () {
          that.tabContent = this
        },
      },
    })

    if (this.props.tools) {
      this.setProps({
        children: [
          {
            component: 'Cols',
            fit: true,
            strechIndex: 0,
            gutter: 'xs',
            items: [
              this.props.tabList,
              this.props.tools
                ? {
                  classes: {
                    'nom-tabs-tools': true,
                  },
                  children: isFunction(this.props.tools) ? this.props.tools() : this.props.tools,
                }
                : null,
            ],
          },
          this.props.tabContent,
        ],
      })
    } else {
      this.setProps({
        children: [this.props.tabList, this.props.tabContent],
      })
    }
  }

  getSelectedTab() {
    return this.tabList.getSelectedItem()
  }

  selectTab(key) {
    return this.tabList.selectItem(key)
  }

  createTab(param) {
    this.props.tabs.push(param)
    const { key, item, panel } = param
    this.tabList.createItem({ key, ...item })
    this.tabContent.createPanel({ key, ...panel })
  }

  removeTab(key) {
    if (!this.tabList.getItem(key)) {
      console.warn(`The specified object was not found.`)
      return
    }
    if (this.getSelectedTab().key === key) {
      const newKey = this._getTabSibling(key)
      newKey && this.selectTab(newKey)
    }
    this.tabList.removeItem(key)
    this.tabContent.removePanel(key)
    this.props.tabs = this.props.tabs.filter(x => {
      return x.key !== key
    })
  }

  _getTabSibling(key) {
    const { tabs } = this.props
    const idx = tabs.findIndex(x => { return x.key === key })
    if (idx > 0) {
      return tabs[idx - 1].key
    }
    if (tabs[idx + 1]) {
      return tabs[idx + 1].key
    }
    return false

  }

  updatePanel(key, newPanelProps) {
    const panel = this.tabContent.getPanel(key)
    panel.update(newPanelProps)
  }
}
Tabs.defaults = {
  tabs: [],
  // selectedTab: 'tab0',
  uistyle: 'plain', // hat,card,line,pill
  onTabSelectionChange: null,
  disabledItems: [],
  tools: null,
}

Component.register(Tabs)

export default Tabs
