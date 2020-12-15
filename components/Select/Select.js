import Component from "../Component/index";
import Control from "../Control/index";
import List from "../List/index";
import { } from '../Popup/index'

class Select extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            options: [],
            optionDefaults: {
                _config: function () {
                    this.setProps({
                        children: this.props.text
                    })
                }
            },
            selectedSingle: {
                _config: function () {
                    this.setProps({
                        children: this.props.text
                    })
                }
            },
            selectedMultiple: {
                component: List,
                itemDefaults: {
                    _config: function () {
                        this.setProps({
                            tag: 'span',
                            children: this.props.text
                        })
                    }
                },
                styles: {
                    flex: 'row',
                    gap: 'sm'
                }
            },
            arrow: {
                type: 'arrow-down'
            },
            multiple: false,
            showArrow: true,
            minItemsForSearch: 20
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        super._config()

        var that = this

        this.setProps({
            selectedSingle: {
                _create() {
                    that.selectedSingle = this
                }
            },
            selectedMultiple: {
                itemDefaults: {
                    key() {
                        return this.props.value;
                    }
                },
                _create() {
                    that.selectedMultiple = this
                }
            },
            optionDefaults: {
                key() {
                    return this.props.value;
                },
                selectable: {
                    byClick: true,
                    canRevert: true
                },
                events: {
                    select() {
                        var selectedOption = { text: this.props.text, value: this.props.value };
                        if (that.props.multiple === false) {
                            that.selectedSingle.update(selectedOption);
                            that.popup.hide();
                        }
                        else {
                            that.selectedMultiple.appendItem(selectedOption);
                        }
                    },
                    unselect() {
                        if (that.props.multiple === true) {
                            that.selectedMultiple.removeItem(this.key);
                        }
                    }
                }
            }
        })

        var children = this.props.multiple ? this.props.selectedMultiple : this.props.selectedSingle

        this.setProps({
            children: children,
            popup: {
                children: {
                    component: List,
                    _create() {
                        that.optionList = this;
                    },
                    items: this.props.options,
                    itemDefaults: this.props.optionDefaults,
                    itemSelectable: {
                        multiple: that.props.multiple,
                        byClick: true
                    },
                    classes: {
                        'nom-select-list': true
                    },
                    events: {
                        itemSelectionChange() {
                            that._onValueChange();
                        }
                    }
                },
                _config() {
                    this.setProps({
                        attrs: {
                            style: {
                                width: that.offsetWidth() + 'px'
                            }
                        }
                    })
                },
            }
        })
    }

    selectOption(option) {
        this.optionList.selectItem(option)
    }

    selectOptions(options) {
        this.optionList.selectItems(options)
    }

    getSelectedOption() {
        if (this.props.multiple === false) {
            return this.optionList.getSelectedItem()
        }
        else {
            return this.optionList.getSelectedItems()
        }
    }

    _getValue() {
        var selected = this.getSelectedOption()
        if (selected !== null) {
            if (Array.isArray(selected)) {
                var vals = selected.map(function (item) {
                    return item.props.value
                });

                return vals
            }
            else {
                return selected.props.value
            }
        }
        else {
            return null
        }
    }

    _setValue(value) {
        this.optionList.unselectAllItems({ triggerSelectionChange: false })
        this.selectOptions(value)
    }

    appendOption() {

    }
}

Component.register(Select)

export default Select