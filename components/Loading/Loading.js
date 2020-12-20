import Component from '../Component/index'
import Layer from '../Layer/index'
import Spinner from '../Spinner/index'

class Loading extends Layer {
    constructor(props, ...mixins) {
        const defaults = {
            align: 'center'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            alignTo: this.props.reference.element,
            children: {
                component: Spinner
            }
        })

        super._config()
    }
}

Component.register(Loading)

export default Loading