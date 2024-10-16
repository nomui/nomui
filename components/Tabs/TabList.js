import Component from '../Component/index'
import List from '../List/index'
import TabItem from './TabItem'

class TabList extends List {
  constructor(props, ...mixins) {
    super(Component.extendProps(TabList.defaults, props), ...mixins)
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

  createItem(param) {
    this.appendItem(param)
  }

  getTabContent() {
    return this.props.tabContent.call(this)
  }

  selectTab(param, selectOptions) {
    this.selectItems(param, selectOptions)
  }

  triggerChange() {
    const selectedItem = this.getSelectedItem()
    if (this.props.parentTab) {
      this._callHandler(this.props.parentTab.props.onTabSelectionChange, {
        selectedItem: selectedItem,
        key: selectedItem.key,
      })
    } else {
      this._callHandler(this.props.onTabSelectionChange, {
        selectedItem: selectedItem,
        key: selectedItem.key,
      })
    }
  }
}
TabList.defaults = {
  itemDefaults: {
    component: TabItem,
  },
  tabContent: null,
  uistyle: 'plain',
  itemSelectable: {
    byClick: true,
    scrollIntoView: false,
  },
  onTabSelectionChange: null,
  disabledItems: [],
}
Component.register(TabList)

export default TabList
