export default {
  _created: function () {
    this.field = this.parent.field
    this.field.controlBefore = this
  },
}
