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
      direction: 'horizontal',
      uistyle: 'plain',
      itemSelectable: {
        byClick: true,
      }
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['direction']
    this.setProps({
      selectedItems: this.props.selectedTab
    })

    super._config()
  }

  getTabContent() {
    return this.props.tabContent.call(this)
  }

  selectTab(param, selectOptions) {
    this.selectItems(param, selectOptions)
  }
}

Component.register(TabList)

export default TabList
