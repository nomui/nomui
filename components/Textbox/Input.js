import Component from "../Component/index";

class Input extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            tag: 'input',
            attrs: {
                type: 'text',
                autocomplete: 'off'
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        this.textbox = this.parent
        this.textbox.input = this
        this.capsLock = false
    }

    _config() {
        this.setProps({
            attrs: {
                value: this.props.value,
                oninput: function () {
                    if (!this.capsLock) {
                        this.textbox._onValueChange()
                    }
                },
                onblur: function () {
                    this.textbox.trigger("blur")
                },
                oncompositionstart: function () {
                    this.capsLock = true
                },
                oncompositionend: function () {
                    this.capsLock = false
                    this.element.dispatchEvent(new Event('input'))
                }
            },
        })
    }

    _render() {
        if (this.textbox.props.autofocus === true) {
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

export default Input