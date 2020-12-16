export default {
    _config: function () {
        this.field = this.parent.field
        this.field.control = this
    }
}