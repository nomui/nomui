import { isFunction } from '../util/index.js'

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
        const { autoCompleteControl } = this.list
        const { onSelect: _onSelect, options } = autoCompleteControl.props
        const item = options.find(({ value: v }) => v === value)

        const autoCompleteOption = {
          value: value,
          // text: this.props.text,
          option: this.props,
        }

        isFunction(_onSelect) && _onSelect(value, item)
        autoCompleteControl.input.update(autoCompleteOption)
        autoCompleteControl.props.animate && autoCompleteControl.popup.animateHide()
        !autoCompleteControl.props.animate && autoCompleteControl.popup.hide()
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
