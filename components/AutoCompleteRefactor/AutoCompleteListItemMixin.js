export default {
  _config: function () {
    const { onSelect, onUnselect } = this.props
    const { propsMode } = this.parent.parent.parent.autoCompleteControl.props
    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.autoCompleteControl.props.multiple === false,
      },
      onSelect: () => {
        const { autoCompleteControl } = this.list

        const autoCompleteOption = {
          value: propsMode === 'select' ? this.props.text : this.props.value,
          option: this.props,
        }
        autoCompleteControl.input.update(autoCompleteOption)
        autoCompleteControl.props.animate && autoCompleteControl.popup.animateHide()
        !autoCompleteControl.props.animate && autoCompleteControl.popup.hide()

        this._callHandler(onSelect)
      },
      onUnselect: () => {
        this._callHandler(onUnselect)
      },
    })
  },
}
