import Component from "../Component/index";
import Control from "../Control/index";
import OptionList from './DefaultOptionList'

class RadioList extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            options: [],
            type: 'radio'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        super._config()

        this.setProps({
            optionDefaults: {
                key() {
                    return this.props.value
                }
            }
        })

        this.setProps({
            optionList: {
                component: OptionList
            }
        });

        this.setProps({
            children: this.props.optionList
        });
    }

    getSelectedOption() {
        return this.optionList.getSelectedItem()
    }

    _getValue() {
        var selected = this.getSelectedOption()
        if (selected !== null) {
            return selected.props.value
        }
        else {
            return null
        }
    }

    _setValue(value) {
        this.optionList.selectItem(function () {
            return this.props.value === value
        })
    }
}

Component.register(RadioList)

export default RadioList