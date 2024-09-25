import Component from '../Component/index'

Object.defineProperty(Component.prototype, '$modal', {
  get: function () {
    let cur = this
    while (cur) {
      if (cur.__isModalContent === true) {
        return cur.modal
      }

      cur = cur.parent
    }
    return null
  },
})

export default {
  _created: function () {
    this.modal = this.parent.modal
    this.__isModalContent = true
    this.parent.parent.modalContent = this
  },

  _config: function () {
    this.setProps({
      classes: {
        'nom-modal-content': true,
        'nom-modal-content-animate-show': this.modal.props.animate,
      },
    })
  },
}
