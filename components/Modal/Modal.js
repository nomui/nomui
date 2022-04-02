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
    const { size } = this.props

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
        'nom-modal-mask-animate-show': true,
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

    if (result !== undefined) {
      that.returnValue = result
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
    this.modalContent.removeClass('nom-modal-content-animate-show')
    this.modalContent.addClass('nom-modal-content-animate-hide')
    this.removeClass('nom-modal-mask-animate-show')
    this.addClass('nom-modal-mask-animate-hide')
    this.remove()
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
