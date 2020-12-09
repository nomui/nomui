import Component from "../Component/index";
import Control from "../Control/index";
import Input from "./Input";
import { } from "../Cssicon/index";

class Textbox extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            leftIcon: null,
            rightIcon: null,
            autofocus: false,
            placeholder: null,
            value: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        super._config()

        this.setProps({
            leftIcon: Component.normalizeIconProps(this.props.leftIcon),
            rightIcon: Component.normalizeIconProps(this.props.rightIcon),
            input: {
                component: Input,
                name: 'input',
                attrs: {
                    value: this.props.value,
                    placeholder: this.props.placeholder
                }
            }
        })

        this.setProps({
            tag: 'div',
            classes: {
                'm-with-left-icon': !!this.props.leftIcon,
                'm-with-right-icon': !!this.props.rightIcon
            },
            children: [
                this.props.input,
                this.props.leftIcon && this.props.leftIcon,
                this.props.rightIcon && this.props.rightIcon
            ]
        })
    }

    getText() {
        return this.input.getText()
    }

    _getValue() {
        var inputText = this.getText()
        if (inputText === '') {
            return null
        }
        return inputText
    }

    _setValue(value) {
        this.input.setText(value)
    }

    focus() {
        this.input.focus()
    }
}

Component.register(Textbox)

export default Textbox