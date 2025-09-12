import Component from '../Component/index'

Object.defineProperty(Component.prototype, '$drawer', {
  get: function () {
    let cur = this
    while (cur) {
      if (cur.__isDrawerContent === true) {
        return cur.drawer
      }

      cur = cur.parent
    }
    return null
  },
})

export default {
  _created: function () {
    this.drawer = this.parent.drawer
    this.__isDrawerContent = true
    this.parent.parent.drawerContent = this
  },

  _config: function () {
    this.setProps({
      classes: {
        'nom-drawer-content': true,
        'nom-drawer-content-animate-show': this.drawer.props.animate,
      },
    })
  },
}
