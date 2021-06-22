export default {
  _created: function () {
    this.parent.content = this
  },
  _config: function () {
    const { onSelect, onUnselect, selected } = this.props
    const listProps = this.parent.parent.parent.props
    const selectedItems =
      listProps.selectedItems !== null && listProps.selectedItems !== undefined
        ? Array.isArray(listProps.selectedItems)
          ? listProps.selectedItems
          : [listProps.selectedItems]
        : []

    this.setProps({
      classes: {
        'nom-list-item-content': true,
      },
      selected: selected === true || selectedItems.indexOf(this.key) !== -1,
      selectable: {
        byClick: listProps.itemSelectable.byClick,
        canRevert: listProps.itemSelectable.multiple === true,
      },
      _shouldHandleClick: function () {
        if (listProps.disabled === true) {
          return false
        }
      },
      onSelect: () => {
        const list = this.parent.parent.parent
        if (listProps.itemSelectable.multiple === false) {
          listProps.selectedItems = this.key
          if (list.selectedItem !== null) {
            list.selectedItem.unselect({ triggerSelectionChange: false })
          }
          list.selectedItem = this
        }

        this._callHandler(onSelect)
      },
      onUnselect: () => {
        const list = this.parent.parent.parent
        if (listProps.selectedItems === this.key) {
          listProps.selectedItems = null
        }
        if (list.selectedItem === this) {
          list.selectedItem = null
        }

        this._callHandler(onUnselect)
      },
      onSelectionChange: () => {
        const list = this.parent.parent.parent
        list._onItemSelectionChange()
      },
    })
  },
  _rendered: function () {
    const list = this.parent.parent.parent
    const listProps = list.props
    if (listProps.itemSelectable.multiple === false) {
      if (this.props.selected) {
        list.selectedItem = this
        if (listProps.itemSelectable.multiple.scrollIntoValue) {
          list.scrollTo(list.selectedItem)
        }
      }
    }
  },
}
