export default {
    _config: function () {
        const { onSelect, onUnselect } = this.props

        this.setProps({
            selectable: {
                byClick: true,
                canRevert: this.list.selectControl.props.multiple === true,
            },
            onSelect: () => {
                const { selectControl } = this.list
                const selectProps = selectControl.props

                const selectedOption = { text: this.props.text, value: this.props.value, option: this.props }
                if (selectProps.multiple === false) {
                    selectControl.selectedSingle.update(selectedOption)
                    selectControl.popup.hide()
                } else {
                    selectControl.selectedMultiple.appendItem(selectedOption)
                }

                this._callHandler(onSelect)
            },
            onUnselect: () => {
                const { selectControl } = this.list
                const selectProps = selectControl.props

                if (selectProps.multiple === true) {
                    selectControl.selectedMultiple.removeItem(this.key)
                }

                this._callHandler(onUnselect)
            }

        })
    },
}