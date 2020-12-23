import Component from '../Component/index'

class ModalHeader extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            icon: null,
            image: null,
            title: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.modalContent = this.parent
        this.modal = this.modalContent.modal
    }

    _config() {
        var that = this;

        this.setProps({
            children: [
                { tag: 'h5', children: this.props.title },
                {
                    component: 'Button', 
                    icon: 'close',                     
                    attrs: {
                        onclick: function () {
                            that.modal.close();
                        }
                    }
                }
            ]
        });
    }
}

Component.register(ModalHeader)

export default ModalHeader