export default {
  _created: function () {
    this.checkboxList = this.parent.parent
    this.checkboxList.optionList = this
  },
  _config: function () {
    const { itemSelectionChange } = this.props
    const listProps = this.checkboxList.props
    this.setProps({
      disabled: listProps.disabled,
      items: listProps.options,
      itemDefaults: listProps.optionDefaults,
      itemSelectable: {
        byClick: true,
        multiple: true,
      },
      selectedItems: listProps.value,
      onItemSelectionChange: () => {
        this.checkboxList._onValueChange()
        this._callHandler(itemSelectionChange)
      },
    })
  },
}
