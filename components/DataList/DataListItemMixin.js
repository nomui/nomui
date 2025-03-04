export default {
    _created: function () {
        this.list = this.parent
    },
    _config: function () {
        const { selected, disabled } = this.props
        const listProps = this.list.props
        const { disabledKeys } = this.list.props
        const selectedItems =
            listProps.selectedKeys !== null && listProps.selectedKeys !== undefined
                ? Array.isArray(listProps.selectedKeys)
                    ? listProps.selectedKeys
                    : [listProps.selectedKeys]
                : []

        const disabledItems = disabledKeys !== null && disabledKeys !== undefined
            ? Array.isArray(disabledKeys)
                ? disabledKeys
                : [disabledKeys]
            : []

        this.setProps({
            classes: {
                'nom-data-list-item': true,
            },
            selected: selected === true || selectedItems.indexOf(this.key) !== -1,
            disabled: disabled === true || disabledItems.indexOf(this.key) !== -1,
            selectable: {
                byClick: listProps.itemSelectable.byClick,
                canRevert: listProps.itemSelectable.multiple === true,
                triggerOnInit: listProps.itemSelectable.triggerOnInit,
            },
            _shouldHandleClick: function () {
                if (listProps.disabled === true) {
                    return false
                }
            },
            onSelect: () => {
                const list = this.list
                if (listProps.itemSelectable.multiple === false) {
                    listProps.selectedKeys = this.key
                    if (list.selectedItem !== null) {
                        list.selectedItem.unselect({ triggerSelectionChange: false })
                    }
                    list.selectedItem = this
                }
                list._onItemSelected(this.props._itemData, this.key)
            },
            onUnselect: () => {
                const list = this.parent
                if (listProps.selectedKeys === this.key) {
                    listProps.selectedKeys = null
                }
                if (list.selectedItem === this) {
                    list.selectedItem = null
                }
                list._onItemUnselected(this.props._itemData, this.key)
            },
            onSelectionChange: () => {
                const list = this.parent
                list._onItemSelectionChange()
            },
        })
    },
    _rendered: function () {
        const list = this.parent
        const listProps = list.props
        if (listProps.itemSelectable.multiple === false) {
            if (this.props.selected) {
                list.selectedItem = this
                if (listProps.itemSelectable.scrollIntoView) {
                    list.scrollTo(list.selectedItem)
                }
            }
        }
    },
}
