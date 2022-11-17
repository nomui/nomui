export default {
  _config: function () {
    const { onSelect, onUnselect } = this.props

    this.setProps({
      selectable: {
        byClick: true,
        canRevert: this.list.selectControl.props.multiple === true,
      },
      hidden: !!this.props.isExtra,
      onSelect: () => {
        const { selectControl } = this.list
        const selectProps = selectControl.props
        const selectedOption = {
          option: this.props,
        }

        Object.keys(this.wrapper.props.children).forEach((item) => {
          selectedOption[item] = this.props[item]
        })

        selectControl.placeholder && selectControl.placeholder.hide()

        if (selectProps.multiple === false) {
          selectControl.selectedSingle.update(selectedOption)
          selectControl.props.animate && selectControl.popup.animateHide()
          !selectControl.props.animate && selectControl.popup.hide()
        } else {
          selectControl.selectedMultiple.update({
            items: [
              ...selectControl.selectedMultiple.props.items,
              {
                [selectControl.props.optionFields.text]: selectedOption.text,
                [selectControl.props.optionFields.value]: selectedOption.value,
              },
            ],
          })
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
          selectControl.selectedMultiple.update({
            items: selectControl.selectedMultiple.props.items.filter((n) => {
              return n[selectControl.props.optionFields.value] !== this.key
            }),
          })
        }

        if (selectProps.virtual === true) {
          const { selectedItems } = this.list.virtual
          selectedItems.splice(
            selectedItems.findIndex(
              (item) =>
                item[selectControl.props.optionFields.value] ===
                this.props[selectControl.props.optionFields.value],
            ),
            1,
          )
        }

        this._callHandler(onUnselect)
      },
    })
  },
}
