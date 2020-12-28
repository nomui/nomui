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
      type: 'horizontal',
      itemSelectable: {
        byClick: true,
      },
      gutter: 'md',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  getTabContent() {
    return this.props.tabContent.call(this)
  }
}

Component.register(TabList)

export default TabList
