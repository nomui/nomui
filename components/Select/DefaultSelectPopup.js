import Component from '../Component/index'
import Popup from '../Popup/index'
import SelectList from './DefaultSelectList'

class SelectPopup extends Popup {
    constructor(props, ...mixins) {
        const defaults = {

        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        super._create()

        this.select = this.opener
    }

    _config() {
        this.setProps({
            children: {
                component: SelectList
            }
        })

        super._config()
    }
}

Component.register(SelectPopup)

export default SelectPopup