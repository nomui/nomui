export default {
  _created: function () {
    this.field = this.parent.field
    this.field.control = this
    this.form = this.field.form
  },
  _config: function () {
    const { onValueChange } = this.props
    this.setProps({
      onValueChange: (changed) => {
        this.field.props.value = changed.newValue
        this.field._onValueChange(changed)
        this._callHandler(onValueChange, changed)
      }
    })
  },
}
