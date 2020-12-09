import Component from '../Component/index'
import MenuItemWrapper from './MenuItemWrapper'
import MenuItem from './MenuItem'
import { isFunction, extend } from '../util/index'

class Menu extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'ul',
            items: [],
            itemDefaults: {
                component: MenuItem
            },
            itemSelectable: {
                onlyleaf: false
            },
            itemExpandable: {
                expandSingle: true,
                initExpandLevel: -1
            },

            indent: 1.5,

            type: 'vertical'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.itemRefs = []
        this.selectedItem = null
    }

    _config() {
        var that = this;
        var children = this.props.items.map(function (item) {
            return { component: MenuItemWrapper, item: Component.extendProps({}, that.props.itemDefaults, item) }
        })

        this.setProps({
            children: children
        })
    }

    getItem(param) {
        var retItem = null

        if (isFunction(param)) {
            for (var key in this.itemRefs) {
                if (this.itemRefs.hasOwnProperty(key)) {
                    if (param.call(this.itemRefs[key]) === true) {
                        retItem = this.itemRefs[key];
                        break
                    }
                }
            }
        }
        else {
            return this.itemRefs[param] || null
        }

        return retItem
    }

    selectItem(param, selectOption) {
        var item = this.getItem(param)
        if (item === null || item === undefined) {
            return false
        }
        return item.select(selectOption)
    }

    unselectItem(param, unselectOption) {
        unselectOption = extend(
            {
                triggerUnselect: true,
                triggerSelectionChange: true
            },
            unselectOption
        )
        var item = this.getItem(param);
        if (item === null) {
            return false
        } else {
            return item.unselect(unselectOption)
        }
    }

    getSelectedItem() {
        return this.selectedItem
    }

    expandToItem(param) {
        var item = this.getItem(param)
        if (item !== null) {
            var p = item.parentItem
            while (p) {
                p.expand();
                p = p.parentItem
            }
        }
    }
}

Component.register(Menu)

export default Menu