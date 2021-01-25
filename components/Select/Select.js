import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import List from '../List/index'
import SelectPopup from './SelectPopup'
import { isString } from '../util/index'

class Select extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
      optionDefaults: {
        key() {
          return this.props.value
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedSingle: {
        classes: {
          'nom-select-single': true,
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedMultiple: {
        component: List,
        itemDefaults: {
          _config: function () {
            this.setProps({
              tag: 'span',
              children: this.props.text,
            })
          },
        },
        styles: {
          flex: 'row',
          gap: 'sm',
        },
      },
      multiple: false,
      showArrow: true,
      minItemsForSearch: 20,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { multiple, showArrow, placeholder } = this.props
    const children = []

    this.setProps({
      selectedSingle: {
        _created() {
          that.selectedSingle = this
        },
      },
      selectedMultiple: {
        itemDefaults: {
          key() {
            return this.props.value
          },
        },
        _created() {
          that.selectedMultiple = this
        },
      },
    })

    if (multiple) {
      children.push(this.props.selectedMultiple)
    } else {
      children.push(this.props.selectedSingle)
    }

    if (isString(placeholder)) {
      children.push({
        _created() {
          that.placeholder = this
        },
        classes: { 'nom-select-placeholder': true },
        children: placeholder
      })
    }

    if (showArrow) {
      children.push({
        component: Icon,
        type: 'down',
        classes: {
          'nom-select-arrow': true,
        },
      })
    }

    this.setProps({
      control: {
        children: children,
      }
    })

    super._config()
  }

  _rendered() {
    const { value } = this.props

    this.popup = new SelectPopup({ trigger: this.control })

    this._directSetValue(value)

    this._valueChange({ newValue: this.currentValue })
  }

  _directSetValue(value) {
    const { multiple } = this.props
    if (multiple === true) {
      const valueOptions = this._getOptions(value)
      if (valueOptions.length) {
        this.selectedMultiple.update({ items: valueOptions })
        this.currentValue = valueOptions.map(function (item) {
          return item.value
        })
      }
      else {
        this.selectedMultiple.unselectAllItems()
      }
    } else {
      const valueOption = this._getOption(value)
      if (valueOption !== null) {
        this.selectedSingle.update(valueOption)
        this.currentValue = valueOption.value
      }
      else {
        this.selectedSingle.emptyChildren()
      }
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

    return this.optionList.getSelectedItems()
  }

  _getValue() {
    if (!this.optionList) {
      return this.currentValue
    }

    const selected = this.getSelectedOption()
    if (selected !== null) {
      if (Array.isArray(selected)) {
        const vals = selected.map(function (item) {
          return item.props.value
        })

        return vals
      }

      return selected.props.value
    }

    return null
  }

  _setValue(value, triggerChange) {
    triggerChange = triggerChange !== false
    if (this.optionList) {
      this.optionList.unselectAllItems({ triggerSelectionChange: value === null })
      this.selectOptions(value, { triggerSelectionChange: triggerChange })
    }
    else {
      this._directSetValue(value)
      if (triggerChange) {
        this._onValueChange()
      }
    }
  }

  _getOption(value) {
    let option = null
    const { options } = this.props
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        option = options[i]
        break
      }
    }
    return option
  }

  _getOptions(value) {
    const retOptions = []
    const { options } = this.props
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        retOptions.push(options[i])
      }
    }
    return retOptions
  }

  _valueChange(changed) {
    if (this.placeholder) {
      if ((Array.isArray(changed.newValue) && changed.newValue.length === 0) || (changed.newValue === null || changed.newValue === undefined)) {
        this.placeholder.show()
      }
      else {
        this.placeholder.hide()
      }
    }
  }

  appendOption() { }
}

Component.register(Select)

export default Select
