export default {
    _create: function () {
        this.selectControl = this.parent.selectControl
        this.selectControl.optionList = this
    },
    _config: function () {
        let selectProps = this.selectControl.props
        this.setProps({
            items: selectProps.options,
            itemDefaults: selectProps.optionDefaults,
            itemSelectable: {
                multiple: selectProps.multiple,
                byClick: true
            },
            selectedItems: selectProps.value,
            events: {
                itemSelectionChange: () => {
                    this.selectControl._onValueChange()
                }
            }
        })
    }
}