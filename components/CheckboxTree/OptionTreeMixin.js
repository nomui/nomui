export default {
  _created: function () {
    this.checkboxTree = this.parent.parent
    this.checkboxTree.optionTree = this
  },
  _config: function () {
    const checkboxTreeProps = this.checkboxTree.props
    this.setProps({
      disabled: checkboxTreeProps.disabled,
      nodeCheckable: {
        checkedNodeKeys: checkboxTreeProps.value,
        onCheckChange: () => {
          this.checkboxTree._onValueChange()
        },
      },
    })
  },
}
