export default {
    _create: function () {
        this.checkboxList = this.parent
        this.checkboxList.optionList = this
    },
    _config: function () {
        let listProps = this.checkboxList.props
        this.setProps({
            items: listProps.options,
            itemDefaults: listProps.optionDefaults,
            itemSelectable: {
                byClick: true,
                multiple: true
            },
            selectedItems: listProps.value,
            events: {
                itemSelectionChange: () => {
                    this.checkboxList._onValueChange()
                }
            }
        })
    }
}