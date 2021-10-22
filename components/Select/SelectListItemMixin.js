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

        const selectedOption = {
          text: this.props.text,
          value: this.props.value,
          option: this.props,
        }
        selectControl.placeholder.hide()
        if (selectProps.multiple === false) {
          selectControl.selectedSingle.update(selectedOption)
          selectControl.popup.hide()
        } else {
          selectControl.selectedMultiple.appendItem(selectedOption)
        }

        if (selectProps.virtual === true) {
          this.list.virtual.selectedItems.push(selectedOption)
        }

        this._callHandler(onSelect)
      },
      onUnselect: () => {
        const { selectControl } = this.list
        const selectProps = selectControl.props

        if (selectProps.multiple === true) {
          selectControl.selectedMultiple.removeItem(this.key)
        }

        if (selectProps.virtual === true) {
          const { selectedItems } = this.list.virtual
          selectedItems.splice(
            selectedItems.findIndex((item) => item.value === this.props.value),
            1,
          )
        }

        this._callHandler(onUnselect)
      },
    })
  },
}
