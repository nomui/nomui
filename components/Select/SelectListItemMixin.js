export default {
  _config: function () {
    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.selectControl.props.multiple === true,
      },
    })

    this.on('select', () => {
      const { selectControl } = this.list
      const selectProps = selectControl.props

      const selectedOption = { text: this.props.text, value: this.props.value }
      if (selectProps.multiple === false) {
        selectControl.selectedSingle.update(selectedOption)
        selectControl.popup.hide()
      } else {
        selectControl.selectedMultiple.appendItem(selectedOption)
      }
    })

    this.on('unselect', () => {
      const { selectControl } = this.list
      const selectProps = selectControl.props

      if (selectProps.multiple === true) {
        selectControl.selectedMultiple.removeItem(this.key)
      }
    })
  },
}
