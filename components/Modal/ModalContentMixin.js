import Component from '../Component/index'

Object.defineProperty(Component.prototype, '$modal', {
    get: function () {
        let cur = this
        while (cur) {
            if (cur.__isModal === true) {
                return cur
            }
            else {
                cur = cur.parent
            }
        }
        return cur
    }
})

export default {
    _create: function () {
        this._scoped = true
        this.__isModal = true
    }
}