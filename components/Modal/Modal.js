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
                children: this.props.content
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
}

Component.register(Modal)

export default Modal