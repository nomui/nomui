import Component from '../Component/index'
import List from '../List/index'
import TabItem from './TabItem'

class TabList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      itemDefaults: {
        component: TabItem,
      },
      tabContent: null,
      uistyle: 'plain',
      itemSelectable: {
        byClick: true,
      },
      onTabSelectionChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.firstSelect = true
  }

  _config() {
    this._addPropStyle('direction', 'fit')
    this.setProps({
      selectedItems: this.props.selectedTab,
    })

    super._config()
  }

  getTabContent() {
    return this.props.tabContent.call(this)
  }

  selectTab(param, selectOptions) {
    this.selectItems(param, selectOptions)
  }

  triggerChange() {
    if (this.parent.componentType && this.parent.componentType === 'Tabs') {
      this._callHandler(this.parent.props.onTabSelectionChange)
    } else {
      this._callHandler(this.props.onTabSelectionChange)
    }
  }
}

Component.register(TabList)

export default TabList
