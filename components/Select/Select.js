import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import List from '../List/index'
import { extend, isFunction, isString } from '../util/index'
import SelectPopup from './SelectPopup'

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
        gutter: 'md',
      },
      multiple: false,
      showArrow: true,
      minItemsForSearch: 20,
      filterOption: (text, options) => options.filter((o) => o.text.indexOf(text) >= 0),
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { multiple, showArrow, placeholder, disabled, showSearch } = this.props
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
    } else if (showSearch) {
      const { onSearch } = this.props
      that.checked = true
      that.checkedOption = that._getOption(this.props.value)
      const searchInput = {
        tag: 'input',
        classes: { 'nom-select-search-input': true },
        _created() {
          that.selectedSingle = this
        },
        _rendered() {
          this.element.value = this.props.text
        },
        attrs: {
          autocomplete: 'false',
          oninput() {
            that.checked = false
            that.updateSearchPopup(this.value)
            isFunction(onSearch) && onSearch(this.value)
          },
          onchange() {
            if (!that.checked) return
            this.value = that.checkedOption ? that.checkedOption?.text : null
            that.updateSearchPopup(this.value)
          },
        },
      }

      children.push(searchInput)
    } else {
      children.push(this.props.selectedSingle)
    }

    if (isString(placeholder)) {
      children.push({
        _created() {
          that.placeholder = this
        },
        classes: { 'nom-select-placeholder': true },
        children: placeholder,
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
        attrs: {
          style: { cursor: 'text' },
        },
        disabled: disabled,
        children: children,
      },
      onClick: () => {
        showSearch && this.selectedSingle.element.focus()
      },
    })

    super._config()
  }

  _rendered() {
    const { value } = this.props

    this.popup = new SelectPopup({ trigger: this.control })

    this._directSetValue(value)

    this._valueChange({ newValue: this.currentValue })
  }

  _directSetValue(value, options) {
    const { valueOptions } = this.props
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    const { multiple } = this.props
    if (multiple === true) {
      const selValueOptions = this._getOptions(value)
      if (selValueOptions.length) {
        this.selectedMultiple.update({ items: selValueOptions })
        this.currentValue = selValueOptions.map(function (item) {
          return item.value
        })
      } else {
        this.selectedMultiple.unselectAllItems()
      }
    } else {
      if (options.asArray === true) {
        value = value[0]
      }
      const selValueOption = this._getOption(value)
      if (selValueOption !== null) {
        this.selectedSingle.update(selValueOption)
        this.currentValue = selValueOption.value
      } else {
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

  _getValue(options) {
    const { valueOptions, showSearch } = this.props
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    if (!this.optionList) {
      return this.currentValue
    }

    if (showSearch) {
      const selectedSearch = this.getSelectedOption()
      if (selectedSearch && selectedSearch.props) return selectedSearch.props.value
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
      if (options.asArray === true) {
        return [selected.props.value]
      }

      return selected.props.value
    }

    return null
  }

  _setValue(value, triggerChange) {
    triggerChange = triggerChange !== false

    if (this.props.showSearch) {
      const selectedOption = this.props.options.find((e) => e.value === value)
      if (selectedOption) {
        this.checked = true
        this.checkedOption = selectedOption
        this.updateSearchPopup(selectedOption.text)
        this._directSetValue(value)
      }
    }

    if (this.optionList) {
      this.optionList.unselectAllItems({ triggerSelectionChange: value === null })
      this.selectOptions(value, { triggerSelectionChange: triggerChange })
    } else {
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
    if (Array.isArray(value)) {
      for (let i = 0; i < options.length; i++) {
        if (value.indexOf(options[i].value) !== -1) {
          retOptions.push(options[i])
        }
      }
    }
    return retOptions
  }

  _valueChange(changed) {
    if (this.placeholder) {
      if (
        (Array.isArray(changed.newValue) && changed.newValue.length === 0) ||
        changed.newValue === null ||
        changed.newValue === undefined
      ) {
        this.placeholder.show()
      } else {
        this.placeholder.hide()
      }
    }

    if (this.props.showSearch) {
      const selectedOption = this.props.options.find((e) => e.value === changed.newValue)
      this.checkedOption = selectedOption
      this.updateSearchPopup(selectedOption.text)
      this.checked = true
    }
  }

  _disable() {
    if (this.firstRender === false) {
      this.control.disable()
    }
  }

  _enable() {
    if (this.firstRender === false) {
      this.control.enable()
    }
  }

  appendOption() {}

  updateSearchPopup(text) {
    if (this.optionList) this.optionList.update({ text })
  }

  handleFilter(text, options) {
    const { filterOption } = this.props
    return filterOption(text, options)
  }
}

Component.register(Select)

export default Select
