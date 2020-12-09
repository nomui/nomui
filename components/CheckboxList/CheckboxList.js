import Component from "../Component/index";
import Control from "../Control/index";
import List from '../List/index'

class CheckboxList extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            options: [],
            optionDefaults: {
                tag: 'label',
                children: '<span class="checkbox"></span><span class="text">{{this.props.text}}</span>'
            },
            type: 'check'
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        super._config()

        var that = this

        this.setProps({
            optionDefaults: {
                key: function () {
                    return this.props.value;
                }
            }
        })

        this.setProps({
            optionList: {
                component: List,
                _create: function () {
                    that.optionList = this;
                },
                items: this.props.options,
                itemDefaults: this.props.optionDefaults,
                itemSelectable: {
                    byClick: true,
                    multiple: true
                },
                selectedItems: this.props.value,
                events: {
                    itemSelectionChange: function () {
                        that._onValueChange();
                        that.trigger('optionSelectionChange')
                    }
                }
            }
        })

        this.setProps({
            children: this.props.optionList
        })
    }

    getSelectedOptions() {
        return this.optionList.getSelectedItems()
    }

    _getValue() {
        var selected = this.getSelectedOptions();
        if (selected !== null && Array.isArray(selected)) {
            var vals = selected.map(function (item) {
                return item.props.value
            })

            return vals
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

Component.register(CheckboxList)

export default CheckboxList