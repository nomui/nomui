import Component from '../Component/index'
import List from '../List/index'
import TabItem from './TabItem'

class TabList extends List {
    constructor(props, ...mixins) {
        const defaults = {
            itemDefaults: {
                component: TabItem
            },
            tabContent: null,
            type: 'horizontal'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        super._create()

        this.tabContent = this.getRef(this.props.tabContent);
    }
}

Component.register(TabList)

export default TabList