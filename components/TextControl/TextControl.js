import Component from '../Component/index'
import Control from '../Control/index'

class TextControl extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            value: null,
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            children: this.props.value
        })
        super._config()
    }
}

Component.register(TextControl)

export default TextControl