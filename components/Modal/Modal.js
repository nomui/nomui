import Component from '../Component/index'
import { isNumeric, isPlainObject } from '../util/index'
import getzIndex from '../util/index-manager'
import { positionTool } from '../util/position'
import ModalDialog from './ModalDialog'

class Modal extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Modal.defaults, props), ...mixins)
  }

  _created() {
    this._scoped = true
    this.bodyElem = document.body
  }

  _config() {
    this._propStyleClasses = ['size', 'fit']
    const { size, animate, adaptToFit } = this.props

    let myWidth = null

    if (size) {
      if (isPlainObject(size)) {
        if (size.width) {
          myWidth = isNumeric(size.width) ? `${size.width}px` : size.width
        }
      }
    }

    this.setProps({
      classes: {
        'nom-modal-mask-animate-show': animate,
        'nom-modal-adapt-to-fit': adaptToFit,
      },
      children: {
        component: ModalDialog,
        attrs: {
          style: {
            width: myWidth || null,
          },
        },
      },
    })
  }

  _show() {
    this.setzIndex()
    this.checkScrollbar()
    this.setScrollbar()
  }

  close(result) {
    const that = this

    if (!this.rendered) {
      return
    }

    if (this.element === undefined) {
      return
    }

    if (result === undefined) {
      result = that.returnValue
    }

    let { modalCount } = this.bodyElem
    if (modalCount) {
      modalCount--
      this.bodyElem.modalCount = modalCount
      if (modalCount === 0) {
        this.resetScrollbar()
      }
    }

    this._callHandler(this.props.onClose, { result: result })
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.remove()
  }

  animateHide() {
    if (!this.element) return false
    this.modalContent.addClass('nom-modal-content-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.addClass('nom-modal-mask-animate-hide')
      setTimeout(() => {
        if (!this.element) return false
        this.remove()
      }, 90)
    }, 90)
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
        var modalCount = this.bodyElem.data('modalCount');
        if (modalCount) {
            modalCount++;
            this.bodyElem.data('modalCount', modalCount);
        }
        else {
            this.bodyElem.data('modalCount', 1);
        } */
  }

  resetScrollbar() {
    /* this.bodyElem.css('padding-right', this.originalBodyPad);
        this.bodyElem.css('overflow', this.originalBodyOverflow);
        this.bodyElem.removeData('modalCount'); */
  }

  _handleOk() {
    this._callHandler(this.props.onOk)
  }

  _handleCancel() {
    this._callHandler(this.props.onCancel)
  }
}
Modal.defaults = {
  content: {},
  closeOnClickOutside: false,
  fit: false,
  adaptToFit: false,
  okText: '确 定',
  cancelText: '取 消',
  onOk: (e) => {
    e.sender.close()
  },
  onCancel: (e) => {
    e.sender.close()
  },
  size: 'small',
  centered: true,
}
Component.register(Modal)

export default Modal
