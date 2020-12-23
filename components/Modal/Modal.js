import Component from '../Component/index'
import getzIndex from '../util/index-manager'
import ModalDialog from './ModalDialog'
import { positionTool } from '../util/position'

class Modal extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            content: {},
            closeOnClickOutside: false
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.bodyElem = document.body
    }

    _config() {
        this.setProps({
            children: {
                component: ModalDialog,
            }
        })
    }

    _show() {
        this.setzIndex()
        this.checkScrollbar()
        this.setScrollbar()
    }

    close(result) {
        var that = this;

        if (!this.rendered) {
            return;
        }

        if (this.element === undefined) {
            return;
        }

        if (result !== undefined) {
            that.returnValue = result;
        }

        var modalCount = this.bodyElem.modalCount;
        if (modalCount) {
            modalCount--;
            this.bodyElem.modalCount = modalCount;
            if (modalCount === 0) {
                this.resetScrollbar();
            }
        }

        this.trigger('close', { result: result });
        this.remove();
    }

    setzIndex() {
        this.element.style.zIndex = getzIndex();
    }

    checkScrollbar() {
        var fullWindowWidth = window.innerWidth;
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = positionTool.scrollbarWidth();
    }

    setScrollbar() {
        /*var bodyPad = parseInt((this.bodyElem.css('padding-right') || 0), 10);
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
        }*/
    }

    resetScrollbar() {
        /*this.bodyElem.css('padding-right', this.originalBodyPad);
        this.bodyElem.css('overflow', this.originalBodyOverflow);
        this.bodyElem.removeData('modalCount');*/
    }
}

Component.register(Modal)

export default Modal