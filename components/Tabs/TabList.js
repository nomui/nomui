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
      itemSelectable: {
        byClick: true,
      }
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['direction']

    super._config()
  }

  getTabContent() {
    return this.props.tabContent.call(this)
  }
}

Component.register(TabList)

export default TabList
