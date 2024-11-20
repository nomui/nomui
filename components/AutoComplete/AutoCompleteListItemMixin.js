export default {
  _config: function () {
    const { onSelect, onUnselect } = this.props
    const { filterName, optionFields } = this.parent.parent.parent.autoCompleteControl.props

    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.autoCompleteControl.props.multiple === false,
      },
      onSelect: () => {
        const { autoCompleteControl } = this.list

        const autoCompleteOption = {
          value: filterName === 'select' ? this.props.text : this.props.value,
          option: this.props,
        }
        if (optionFields && optionFields.value && optionFields.text) {
          autoCompleteOption.value = this.props[optionFields.text]
        }

        autoCompleteControl.input.update(autoCompleteOption)
        this._callHandler(onSelect)
      },
      onUnselect: () => {
        this._callHandler(onUnselect)
      },
      onClick: () => {
        const { autoCompleteControl } = this.list
        autoCompleteControl.props.animate && autoCompleteControl.popup.animateHide()
        !autoCompleteControl.props.animate && autoCompleteControl.popup.hide()
      }
    })
  },
}
