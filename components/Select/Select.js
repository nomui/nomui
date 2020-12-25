import Component from '../Component/index'
import Control from '../Control/index'
import List from '../List/index'
import SelectPopup from './DefaultSelectPopup'
import Icon from '../Icon/index'

class Select extends Control {
    constructor(props, ...mixins) {
        const defaults = {
            options: [],
            optionDefaults: {},
            selectedSingle: {
                classes: {
                    'nom-select-single': true
                },
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
            multiple: false,
            showArrow: true,
            minItemsForSearch: 20
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var that = this
        let { multiple, selectedMultiple, selectedSingle, showArrow } = this.props,
            children = []

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
        })

        if (multiple) {
            children.push(selectedMultiple)
        }
        else {
            children.push(selectedSingle)
        }

        if (showArrow) {
            children.push({
                component: Icon,
                type: 'angle-down',
                classes: {
                    'nom-select-arrow': true
                }
            })
        }

        this.setProps({
            children: children,
        })

        super._config()
    }

    _render() {
        let { value, multiple } = this.props

        this.popup = new SelectPopup({ trigger: this })

        if (multiple === true) {
            this.selectedMultiple.update({ items: this._getOptions(value) })
        }
        else {
            this.selectedSingle.update(this._getOption(value))
        }
    }

    selectOption(option) {
        this.optionList.selectItem(option)
    }

    selectOptions(options) {
        this.optionList.selectItems(options)
    }

    getSelectedOption() {
        if (!this.optionList) {
            return null
        }
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

    _setValue(value, triggerChange) {
        triggerChange = triggerChange !== false
        this.optionList.unselectAllItems({ triggerSelectionChange: false })
        this.selectOptions(value, { triggerSelectionChange: triggerChange })
    }

    _getOption(value) {
        let option = null,
            { options } = this.props
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                option = options[i]
                break
            }
        }
        return option
    }

    _getOptions(value) {
        let retOptions = [],
            { options } = this.props
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === value) {
                retOptions.push(options[i])
            }
        }
        return retOptions
    }

    appendOption() {

    }
}

Component.register(Select)

export default Select