export default {
  _config: function () {
    const { onSelect, onUnselect } = this.props

    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.autoCompleteControl.props.multiple === false,
      },
      onSelect: () => {
        const value = this.props.value
        const { autoCompleteControl: that } = this.list
        const { onSelect: _onSelect, options } = that.props
        const selected = options.find(({ value: v }) => v === value)

        const autoCompleteOption = {
          value: value,
          // text: this.props.text,
          option: this.props,
        }

        _onSelect && that._callHandler(_onSelect, { value, selected })
        that.input.update(autoCompleteOption)
        that.props.animate && that.popup.animateHide()
        !that.props.animate && that.popup.hide()

        this._callHandler(onSelect)
      },
      onUnselect: () => {
        this._callHandler(onUnselect)
      },
    })
  },
}
