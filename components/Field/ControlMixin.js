export default {
  _create: function () {
    this.field = this.parent.field
    this.field.control = this
    this.form = this.field.form
  },
  _config: function () {
    const { onValueChange } = this.props
    this.setProps({
      onValueChange: (changed) => {
        this.field._onValueChange(changed)
        this._callHandler(onValueChange, changed)
      }
    })
  },
}
