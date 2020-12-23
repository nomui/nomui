import Component from '../Component/index'

Object.defineProperty(Component.prototype, '$modal', {
    get: function () {
        let cur = this
        while (cur) {
            if (cur.__isModalContent === true) {
                return cur.modal
            }
            else {
                cur = cur.parent
            }
        }
        return cur.modal
    }
})

export default {
    _create: function () {
        this.__isModalContent = true
    }
}