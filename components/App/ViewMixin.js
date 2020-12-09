export default {
    _create: function () {
        this.viewLevel = this.app.lastLevel
        this.app.lastLevel++
        this._scoped = true
    },
    _remove: function () {
        delete this.app.views[this.viewLevel]
    }
}