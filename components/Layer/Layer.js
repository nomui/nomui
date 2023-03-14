import Component from '../Component/index'
import getzIndex from '../util/index-manager'
import position from '../util/position'
import LayerBackdrop from './LayerBackdrop'

class Layer extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      within: window,
    }
    super(Component.extendProps(defaults, Layer.defaults, props), ...mixins)
  }

  _created() {
    this.relativeElements = []
    this._onDocumentMousedown = this._onDocumentMousedown.bind(this)
    this._onWindowResize = this._onWindowResize.bind(this)
    this.attachTo = this.props.attachTo
    this.attachTo && this.attachTo.on('remove', () => {
      this.remove()
    })
  }

  _config() {
    if (this.props.placement === 'replace') {
      this.props.position = null
    }

    this._normalizePosition()
    this._zIndex = getzIndex()
    this.setProps({
      attrs: {
        style: {
          zIndex: this._zIndex,
        },
      },
    })

    if (this.props.align || this.props.position) {
      this.setProps({
        attrs: {
          style: {
            position: this.props.fixed ? 'fixed' : 'absolute',
            left: 0,
            top: 0,
          },
        },
      })
    }

    this.props.animate && this.animateInit()
  }

  _rendered() {
    const that = this

    this.addRel(this.element)
    if (this.props.backdrop) {
      this.backdrop = new LayerBackdrop({
        zIndex: this._zIndex - 1,
        reference: this.props.reference,
        animate: this.props.animate,
      })

      if (this.props.closeOnClickBackdrop) {
        this.backdrop._on('click', function (e) {
          if (e.target !== e.currentTarget) {
            return
          }
          that.props.animate && that.animateHide()
          !that.props.animate && that.remove()
        })
      }
    }
  }

  animateInit() {
    this.nomappOverflow()
    this.setProps({
      classes: {
        'nom-layer-animate-show': true,
      },
    })
  }

  animateHide() {
    if (!this.element) return false
    this.addClass('nom-layer-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.remove()
    }, 90)
  }

  _show() {
    const { props } = this

    this.setPosition()
    this._docClickHandler()

    if (props.animate) {
      this.addClass('nom-layer-animate-show')
    }

    if (props.align) {
      window.removeEventListener('resize', this._onWindowResize, false)
      window.addEventListener('resize', this._onWindowResize, false)
    }
    this.props.onShow && this._callHandler(this.props.onShow)
  }

  _hide(forceRemove) {
    window.removeEventListener('resize', this._onWindowResize, false)
    document.removeEventListener('mousedown', this._onDocumentMousedown, false)

    if (this.props.animate) {
      this.removeClass('nom-layer-animate-show')
      this.removeClass('nom-layer-animate-hide')
    }

    if (forceRemove === true || this.props.closeToRemove) {
      this.props.onClose && this._callHandler(this.props.onClose)
      this.remove()
    }
  }

  _remove() {
    window.removeEventListener('resize', this._onWindowResize, false)
    document.removeEventListener('mousedown', this._onDocumentMousedown, false)

    if (this.backdrop) {
      this.backdrop.remove()
    }
  }

  _onWindowResize() {
    if (this.props.hidden === false) {
      this.setPosition()
    }
  }

  _onDocumentMousedown(e) {
    for (let i = 0; i < this.relativeElements.length; i++) {
      const el = this.relativeElements[i]
      if (el === e.target || el.contains(e.target)) {
        return
      }
    }

    const closestLayer = e.target.closest('.nom-layer')
    if (closestLayer !== null) {
      const idx = closestLayer.component._zIndex
      if (idx < this._zIndex) {
        this.hide()
      }
    } else {
      this.hide()
    }
  }

  nomappOverflow() {
    if (!window.nomapp) return
    window.nomapp.element.style.overflow = 'hidden'
    setTimeout(() => {
      window.nomapp.element.style.overflow = 'inherit'
    }, 300)
  }

  setPosition() {
    if (this.props.position) {
      position(this.element, this.props.position)
    }
  }

  addRel(elem) {
    this.relativeElements.push(elem)
  }

  _docClickHandler() {
    const that = this
    if (that.props.closeOnClickOutside) {
      document.addEventListener('mousedown', this._onDocumentMousedown, false)
    }
  }

  _normalizePosition() {
    const { props } = this

    if (props.align) {
      props.position = {
        of: window,
        collision: props.collision,
        within: props.within,
      }

      if (props.alignTo) {
        props.position.of = this.getElement(props.alignTo)
      }

      if (props.alignTo && props.alignOuter === true) {
        const arr = props.align.split(' ')
        if (arr.length === 1) {
          arr[1] = 'center'
        }

        const myArr = ['center', 'center']
        const atArr = ['center', 'center']

        if (arr[1] === 'left') {
          myArr[0] = 'left'
          atArr[0] = 'left'
        } else if (arr[1] === 'right') {
          myArr[0] = 'right'
          atArr[0] = 'right'
        } else if (arr[1] === 'top') {
          myArr[1] = 'top'
          atArr[1] = 'top'
        } else if (arr[1] === 'bottom') {
          myArr[1] = 'bottom'
          atArr[1] = 'bottom'
        }

        if (arr[0] === 'top') {
          myArr[1] = 'bottom'
          atArr[1] = 'top'
        } else if (arr[0] === 'bottom') {
          myArr[1] = 'top'
          atArr[1] = 'bottom'
        } else if (arr[0] === 'left') {
          myArr[0] = 'right'
          atArr[0] = 'left'
        } else if (arr[0] === 'right') {
          myArr[0] = 'left'
          atArr[0] = 'right'
        }

        props.position.my = `${myArr[0]} ${myArr[1]}`
        props.position.at = `${atArr[0]} ${atArr[1]}`
      } else {
        const rhorizontal = /left|center|right/
        const rvertical = /top|center|bottom/
        let pos = props.align.split(' ')
        if (pos.length === 1) {
          pos = rhorizontal.test(pos[0])
            ? pos.concat(['center'])
            : rvertical.test(pos[0])
              ? ['center'].concat(pos)
              : ['center', 'center']
        }
        pos[0] = rhorizontal.test(pos[0]) ? pos[0] : 'center'
        pos[1] = rvertical.test(pos[1]) ? pos[1] : 'center'

        props.position.my = `${pos[0]} ${pos[1]}`
        props.position.at = `${pos[0]} ${pos[1]}`
      }
    }
  }
}

Layer.defaults = {
  align: null,
  alignTo: null,
  alignOuter: false,
  within: window,
  collision: 'flipfit',
  onClose: null,
  onHide: null,
  onShow: null,

  closeOnClickOutside: false,
  closeToRemove: false,

  position: null,

  hidden: false,

  backdrop: false,
  closeOnClickBackdrop: false,
}
Component.register(Layer)

export default Layer
