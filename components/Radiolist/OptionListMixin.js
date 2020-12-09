export default {
    _create: function () {
        this.radioList = this.parent
        this.radioList.optionList = this
    },
    _config: function () {
        let listProps = this.radioList.props
        this.setProps({
            items: listProps.options,
            itemDefaults: listProps.optionDefaults,
            itemSelectable: {
                byClick: true
            },
            selectedItems: listProps.value,
            events: {
                itemSelectionChange: () => {
                    this.radioList._onValueChange()
                }
            }
        })
    }
}