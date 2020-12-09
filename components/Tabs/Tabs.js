import Component from '../Component/index'
import TabList from './TabList'
import TabContent from './TabContent'

class Tabs extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tabs: [],
            selectedTab: 0
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var that = this
        var tabItems = []
        var tabPanles = []
        for (var i = 0; i < this.props.tabs.length; i++) {
            var tab = this.props.tabs[i]
            tab.item.name = tab.item.name || 'tab' + i
            tab.panel.name = tab.panel.name || 'tab' + i
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
                    return that.tabContent;
                }
            },
            tabContent: {
                component: TabContent,
                panels: tabPanles,
                _create: function () {
                    that.tabContent = this
                }
            }
        })

        this.setProps({
            children: [
                this.props.tabList,
                this.props.tabContent
            ]
        })
    }
}

Component.register(Tabs)

export default Tabs