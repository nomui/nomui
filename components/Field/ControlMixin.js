export default {
  _created: function () {
    this.field = this.parent.field
    this.field.control = this
    this.form = this.field.form
    this.__isControl = true
  },
}
