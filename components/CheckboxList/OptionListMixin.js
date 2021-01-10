export default {
  _create: function () {
    this.checkboxList = this.parent
    this.checkboxList.optionList = this
  },
  _config: function () {
    const { itemSelectionChange } = this.props
    const listProps = this.checkboxList.props
    this.setProps({
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
      }
    })
  },
}
