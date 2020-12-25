
import Component from '../Component/index'

class Textarea extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'textarea',
            attrs: {
                autocomplete: 'off'
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.multilineTextbox = this.parent
        this.multilineTextbox.textarea = this

        this.capsLock = false
    }

    _config() {
        this.setProps({
            attrs: {
                'oninput': () => {
                    if (!this.capsLock) {
                        this.multilineTextbox._onValueChange();
                    }
                },
                'oncompositionstart': () => {
                    this.capsLock = true;
                },
                'oncompositionend': () => {
                    this.capsLock = false;
                    this.element.trigger('input');
                },
                'onblur': () => {
                    this.multilineTextbox.trigger("blur");
                }
            }
        })
    }

    _render() {
        if (this.multilineTextbox.props.autofocus === true) {
            this.focus()
        }
    }

    getText() {
        return this.element.value
    }

    setText(text) {
        this.element.value = text
    }

    focus() {
        this.element.focus()
    }
}

Component.register(Textarea)

export default Textarea