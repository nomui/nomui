export default {
    _created: function () {
        this.field = this.parent
        this.field.action = this
    }
}