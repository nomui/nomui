import Component from '../Component/index'
import Field from '../Field/index'

class StaticText extends Field {
    constructor(props, ...mixins) {
        const defaults = {
            value: null,
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            control: {
                children: this.props.value,
            }
        })
        super._config()
    }

    _setValue(value) {
        this.update({
            value,
        })
    }

    _getValue() {
        return this.props.value
    }
}

Component.register(StaticText)

export default StaticText
