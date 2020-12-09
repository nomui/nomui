import Component from "../Component/index"
import ListItemWrapper from "./ListItemWrapper"
import { isFunction, extend } from "../util/index"

class List extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'ul',
            items: [],
            itemDefaults: {},

            selectedItems: null,

            itemSelectable: {
                multiple: false,
                byClick: false
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.itemRefs = {}
        this.selectedItem = null
    }

    _config() {
        var items = this.props.items
        var children = []
        if (Array.isArray(items) && items.length > 0) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i]
                item = Component.extendProps({}, this.props.itemDefaults, item)
                children.push({ component: ListItemWrapper, item: item })
            }
        }

        this.setProps({
            children: children
        })
    }

    _render() {
        let { selectItems } = this.props
        if (selectItems && selectItems.length) {
            this.trigger('itemSelectionChange', true)
        }
    }

    getItem(param) {
        var retItem = null

        if (isFunction(param)) {
            for (var key in this.itemRefs) {
                if (this.itemRefs.hasOwnProperty(key)) {
                    if (param.call(this.itemRefs[key]) === true) {
                        retItem = this.itemRefs[key]
                        break
                    }
                }
            }
        }
        else {
            return this.itemRefs[param]
        }

        return retItem
    }

    selectItem(param, selectOption) {
        var item = this.getItem(param)
        item && item.select(selectOption)
    }

    selectItems(param, selectOption) {
        selectOption = extend(
            {
                triggerSelect: true,
                triggerSelectionChange: true
            },
            selectOption
        );
        var itemSelectionChanged = false
        param = Array.isArray(param) ? param : [param]
        for (var i = 0; i < param.length; i++) {
            itemSelectionChanged = this.selectItem(param[i], { triggerSelect: selectOption.triggerSelect, triggerSelectionChange: false }) || itemSelectionChanged
        }
        if (selectOption.triggerSelectionChange === true && itemSelectionChanged) {
            this.trigger('itemSelectionChange')
        }
        return itemSelectionChanged
    }

    selectAllItems(selectOption) {
        return this.selectItems(this.getChildren(), selectOption)
    }

    unselectItem(param, unselectOption) {
        unselectOption = extend(
            {
                triggerUnselect: true,
                triggerSelectionChange: true
            },
            unselectOption
        );
        var item = this.getItem(param)
        item && item.unselect(unselectOption)
    }

    unselectItems(param, unselectOption) {
        unselectOption = extend(
            {
                triggerUnselect: true,
                triggerSelectionChange: true
            },
            unselectOption
        );
        var itemSelectionChanged = false
        if (Array.isArray(param)) {
            for (var i = 0; i < param.length; i++) {
                itemSelectionChanged = this.unselectItem(param[i], { triggerUnselect: unselectOption.triggerUnselect, triggerSelectionChange: false }) || itemSelectionChanged
            }
        }
        if (unselectOption.triggerSelectionChange && itemSelectionChanged) {
            this.trigger('itemSelectionChange')
        }
        return itemSelectionChanged;
    }

    unselectAllItems(unselectOption) {
        return this.unselectItems(this.getChildren(), unselectOption)
    }

    getAllItems() {
        var items = []
        var children = this.getChildren()
        for (var i = 0; i < children.length; i++) {
            var itemWrapper = children[i]
            items.push(itemWrapper.item)
        }
        return items
    }

    getSelectedItem() {
        return this.selectedItem
    }

    getSelectedItems() {
        var selectedItems = []
        var children = this.getChildren()
        for (var i = 0; i < children.length; i++) {
            var item = children[i].item
            if (item.props.selected) {
                selectedItems.push(item)
            }
        }
        return selectedItems
    }

    appendItem(itemProps) {
        itemProps = Component.extendProps({}, this.props.itemDefaults, itemProps)
        var itemWrapperProps = { component: ListItemWrapper, item: itemProps }
        this.appendChild(itemWrapperProps)
    }

    removeItem(param) {
        var item = this.getItem(param)
        if (item !== null) {
            item.wrapper.remove()
        }
    }

    removeItems(param) {
        if (Array.isArray(param)) {
            for (var i = 0; i < param.length; i++) {
                this.removeItem(param[i])
            }
        }
    }
}

Component.register(List)

export default List