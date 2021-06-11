import { isString } from '../util/index'

export default {
  _created: function () {
    this.checkboxList = this.parent.parent
    this.checkboxList.optionList = this
  },
  _config: function () {
    const { itemSelectionChange } = this.props
    const listProps = this.checkboxList.props
    const asArray = listProps.valueOptions.asArray
    this.setProps({
      disabled: listProps.disabled,
      items: listProps.options,
      itemDefaults: listProps.optionDefaults,
      itemSelectable: {
        byClick: true,
        multiple: true,
        scrollIntoView: false,
      },
      selectedItems:
        asArray === true
          ? listProps.value
          : isString(listProps.value)
          ? listProps.value.split(',')
          : null,
      onItemSelectionChange: () => {
        this.checkboxList._onValueChange()
        this._callHandler(itemSelectionChange)
      },
    })
  },
}
