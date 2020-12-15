export default {
    _create: function () {
        this.wrapper = this.parent
        this.wrapper.item = this
        this.list = this.wrapper.list
        this.list.itemRefs[this.key] = this
    },
    _config: function () {
        var listProps = this.list.props
        var selectedItems = this.list.selectedItems !== null
            ? Array.isArray(listProps.selectedItems)
                ? listProps.selectedItems
                : [listProps.selectedItems]
            : []

        this.on('select', function () {
            if (listProps.itemSelectable.multiple === false) {
                listProps.selectedItems = this.key
                if (this.list.selectedItem !== null) {
                    this.list.selectedItem.unselect({ triggerSelectionChange: false })
                }
                this.list.selectedItem = this
            }
        });
        this.on('unselect', function () {
            if (listProps.selectedItems === this.key) {
                listProps.selectedItems = null
            }
            if (this.list.selectedItem === this) {
                this.list.selectedItem = null
            }
        });
        this.on('selectionChange', function () {
            this.list.trigger('itemSelectionChange')
        });

        this.setProps({
            selected: selectedItems.indexOf(this.key) !== -1,
            selectable: {
                byClick: listProps.itemSelectable.byClick,
                canRevert: listProps.itemSelectable.multiple === true
            }
        })
    },
    _render: function () {
        var listProps = this.list.props
        if (listProps.itemSelectable.multiple === false) {
            if (this.props.selected) {
                this.list.selectedItem = this
            }
        }
    },
    _remove: function () {
        delete this.list.itemRefs[this.key]
    }
}