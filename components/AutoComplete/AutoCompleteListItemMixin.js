export default {
  _config: function () {
    const { onSelect, onUnselect } = this.props

    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.autoCompleteControl.props.multiple === false,
      },
      onSelect: () => {
        const { autoCompleteControl } = this.list
        // const selectProps = selectControl.props
        // const autoCompleteProps = autoCompleteControl.props

        const autoCompleteOption = {
          value: this.props.value,
          // text: this.props.text,
          option: this.props,
        }

        autoCompleteControl.input.update(autoCompleteOption)
        autoCompleteControl.popup.animateHide()
        // if (selectProps.multiple === false) {
        //   selectControl.selectedSingle.update(selectedOption)
        //   selectControl.popup.hide()
        // } else {
        //   selectControl.selectedMultiple.appendItem(selectedOption)
        // }

        this._callHandler(onSelect)
      },
      onUnselect: () => {
        // const { selectControl } = this.list
        // const selectProps = selectControl.props

        // if (selectProps.multiple === true) {
        //   selectControl.selectedMultiple.removeItem(this.key)
        // }

        this._callHandler(onUnselect)
      },
    })
  },
}
