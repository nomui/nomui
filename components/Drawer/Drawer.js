import Component from '../Component/index'
import { isFunction, isNumeric, isPlainObject } from '../util/index'
import getzIndex from '../util/index-manager'
import { positionTool } from '../util/position'
import DrawerDialog from './DrawerDialog'

class Drawer extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Drawer.defaults, props), ...mixins)
  }

  _created() {
    this.relativeElements = []
    this._scoped = true
    this.bodyElem = document.body
    this._onDocumentMousedown = this._onDocumentMousedown.bind(this)
  }

  _config() {
    this._propStyleClasses = ['size', 'fit']
    const { size, animate, settle, content, closeOnClickBackdrop, maskClosable } = this.props
    if (settle === 'left' || settle === 'right') {
      this.props.fit = true
    }

    const _reference = this._getContainerElement()

    if (_reference !== document.body) {
      this.referenceElement = _reference
      if (!_reference.style.position || _reference.style.position === 'static') {
        _reference.style.position = 'relative'
      }

    }

    let sizeInfo = null

    if (size && isPlainObject(size)) {
      sizeInfo = {
        width: this.getSizeInfo(size.width),
        height: this.getSizeInfo(size.height),
      }
    }
    else if (this.props.width || this.props.height) {
      sizeInfo = { width: this.getSizeInfo(this.props.width), height: this.getSizeInfo(this.props.height) }
    }

    if (isPlainObject(content) && !content.body) {
      this.props.content = {
        body: {
          children: content
        },
        footer: this.props.footer
      }
    }



    this.setProps({
      classes: {
        'nom-drawer-absolute': _reference !== document.body,
        [`nom-drawer-${settle}`]: true,
        [`nom-drawer-animate-${settle}-show`]: animate,
      },
      children: [
        {
          classes: {
            'nom-drawer-backdrop': true,
            'nom-drawer-backdrop-animate-show': animate,
            'nom-drawer-backdrop-hidden': !this.props.showBackdrop || this.props.showMasker === false
          },
          onClick: () => {
            (closeOnClickBackdrop || maskClosable) && this.close()
          }
        },
        {
          component: DrawerDialog,
          size: sizeInfo
        },
      ]
    })
  }

  _rendered() {
    this.addRel(this.element)
  }

  addRel(elem) {
    this.relativeElements.push(elem)
  }


  _show() {
    this.setzIndex()
    this.checkScrollbar()
    this.setScrollbar()
    this._docClickHandler()
  }


  _remove() {
    document.removeEventListener('mousedown', this._onDocumentMousedown, false)
  }

  close(result) {
    const that = this
    document.removeEventListener('mousedown', this._onDocumentMousedown, false)
    if (!this.rendered) {
      return
    }

    if (this.element === undefined) {
      return
    }

    if (result === undefined) {
      result = that.returnValue
    }

    let { drawerCount } = this.bodyElem
    if (drawerCount) {
      drawerCount--
      this.bodyElem.drawerCount = drawerCount
      if (drawerCount === 0) {
        this.resetScrollbar()
      }
    }

    this._callHandler(this.props.onClose, { result: result })
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.remove()

  }

  animateHide() {
    if (!this.element) return false
    this.drawerContent.addClass('nom-drawer-content-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.addClass('nom-drawer-backdrop-animate-hide')
      setTimeout(() => {
        if (!this.element) return false
        this.remove()
      }, 90)
    }, 90)
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

  _docClickHandler() {
    if (this.props.closeOnClickOutside) {
      document.addEventListener('mousedown', this._onDocumentMousedown, false)
    }
  }


  getSizeInfo(data) {
    if (!data) {
      return undefined
    }
    return isNumeric(data) ? `${data}px` : data
  }

  _getContainerElement() {
    let el = document.body
    const { getContainer } = this.props

    let _reference = getContainer



    if (isFunction(_reference)) {
      _reference = _reference()
    }
    if (_reference instanceof Component && _reference.element) {
      el = _reference.element
    } else if (_reference instanceof HTMLElement) {
      el = _reference
    }
    return el
  }

  setzIndex() {
    this.element.style.zIndex = getzIndex()
  }

  checkScrollbar() {
    const fullWindowWidth = window.innerWidth
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = positionTool.scrollbarWidth()
  }

  setScrollbar() {
    /* var bodyPad = parseInt((this.bodyElem.css('padding-right') || 0), 10);
        this.originalBodyPad = document.body.style.paddingRight || '';
        this.originalBodyOverflow = document.body.style.overflow || '';
        if (this.bodyIsOverflowing) {
            this.bodyElem.css('padding-right', bodyPad + this.scrollbarWidth);
        }
        this.bodyElem.css("overflow", "hidden");
        var drawerCount = this.bodyElem.data('drawerCount');
        if (drawerCount) {
            drawerCount++;
            this.bodyElem.data('drawerCount', drawerCount);
        }
        else {
            this.bodyElem.data('drawerCount', 1);
        } */
  }

  resetScrollbar() {
    /* this.bodyElem.css('padding-right', this.originalBodyPad);
        this.bodyElem.css('overflow', this.originalBodyOverflow);
        this.bodyElem.removeData('drawerCount'); */
  }

  _handleOk() {
    this._callHandler(this.props.onOk)
  }

  _handleCancel() {
    this._callHandler(this.props.onCancel)
  }
}
Drawer.defaults = {
  content: {},
  closeOnClickBackdrop: false,
  closeOnClickOutside: false,
  showBackdrop: true,
  okText: '确 定',
  cancelText: '取 消',
  settle: 'right',
  onOk: (e) => {
    e.sender.close()
  },
  onCancel: (e) => {
    e.sender.close()
  },
  size: 'small',
  centered: true,
}
Component.register(Drawer)

export default Drawer
