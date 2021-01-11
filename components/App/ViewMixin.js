import Component from '../Component/index'

Object.defineProperty(Component.prototype, '$view', {
  get: function () {
    let cur = this
    while (cur) {
      if (cur.__isView === true) {
        return cur
      }

      cur = cur.parent
    }
    return cur
  },
})

export default {
  _created: function () {
    this.viewLevel = this.$app.lastLevel
    this.$app.lastLevel++
    this._scoped = true
    this.__isView = true
  },
  _remove: function () {
    delete this.$app.views[this.viewLevel]
  },
}
