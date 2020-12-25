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
        this.modal = this.parent.modal
        this.__isModalContent = true
    },

    _config: function () {
        this.setProps({
            classes: {
                'nom-modal-content': true
            }
        })
    }
}