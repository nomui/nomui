import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import List from '../List/index'
import { clone, extend, isFunction, isString } from '../util/index'
import SelectPopup from './SelectPopup'

class Select extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Select.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.internalOptions = []

    if (this.props.extraOptions) {
      const extraOptions = this.props.extraOptions.map((n) => {
        return { ...n, isExtra: true }
      })
      this.props.options = [...this.props.options, ...extraOptions]
    }
  }

  _config() {
    const that = this
    const {
      multiple,
      showArrow,
      placeholder,
      disabled,
      showSearch,
      allowClear,
      options,
    } = this.props
    const children = []

    this._normalizeInternalOptions(options)

    this._normalizeSearchable()

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
          _config: function () {
            this.setProps({
              tag: 'span',
              onClick: (args) => {
                args.event.stopPropagation()
              },
              children: [
                {
                  tag: 'span',
                  classes: { 'nom-select-item-content': true },
                  children: this.props.text,
                },
                {
                  component: Icon,
                  type: 'close',
                  classes: {
                    'nom-select-item-remove': true,
                  },

                  attrs: {
                    style: {
                      cursor: 'pointer',
                    },
                  },
                  onClick: (args) => {
                    const key = args.sender.parent.key
                    that.selectedMultiple.removeItem(key)
                    const oldValue = that.getValue()
                    oldValue &&
                      oldValue.length &&
                      that.setValue(
                        oldValue.filter((n) => {
                          return n !== key
                        }),
                      )
                    that.optionList && that.optionList.unselectItem(key)
                    args.event && args.event.stopPropagation()
                  },
                },
              ],
            })
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
          this.element.value = this.props.text || ''
        },
        attrs: {
          autocomplete: 'false',
          oninput() {
            that.checked = false
            that.updateSearchPopup(this.value)
            isFunction(onSearch) && onSearch(this.value)
          },
          onchange() {
            if (that.checked) return
            this.value = that.checkedOption ? that.checkedOption.text : null
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

    if (allowClear) {
      children.push({
        component: Icon,
        type: 'times',
        classes: {
          'nom-select-clear': true,
          'nom-field-clear-handler': true,
        },
        hidden: true,
        ref: (c) => {
          this.clearIcon = c
        },
        onClick: (args) => {
          this.setValue(null)
          this.props.allowClear && this.clearIcon.hide()
          this.placeholder && this.placeholder.show()
          args.event && args.event.stopPropagation()
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
    const { value, virtual, popupContainer } = this.props
    let container
    if (popupContainer === 'self') {
      this.element.style.position = 'relative'
      container = this.element
    } else if (Object.prototype.toString.call(popupContainer) === '[object Function]') {
      const ref = popupContainer()
      ref.element.style.position = 'relative'
      container = ref.element
    }
    this.popup = new SelectPopup({
      reference: container,
      trigger: this.control,
      virtual,
      onShow: () => {
        this.optionList.update({
          selectedItems: this.getValue(),
        })
        this.optionList.scrollToSelected()
      },
    })

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

      if (Array.isArray(selValueOptions) && selValueOptions.length) {
        this.selectedMultiple.update({ items: selValueOptions })
        this.currentValue = selValueOptions.map(function (item) {
          return item.value
        })
      } else {
        this.selectedMultiple.update({ items: [] })
        this.currentValue = null
      }
    } else {
      if (options.asArray === true) {
        value = Array.isArray(value) ? value[0] : value
      }
      const selValueOption = this._getOption(value)
      if (selValueOption !== null) {
        this.selectedSingle.update(selValueOption)
        this.currentValue = selValueOption.value
        if (options.asArray === true) {
          this.currentValue = [selValueOption.value]
        }
      } else {
        this.selectedSingle.element.innerText = value
        this.currentValue = value
      }
    }
    // 解决select组件searchable模式，点清除、重置无法清掉原输入数据
    if (this.searchBox && this.searchBox.props && value === null) {
      this.searchBox._setValue('')
    }
  }

  selectOption(option) {
    this.optionList.selectItem(option)
  }

  selectOptions(options) {
    this.optionList.selectItems(options)
  }

  getMultipleValue(obj) {
    return Object.values(obj.itemRefs)
  }

  getSelectedOption() {
    if (!this.optionList || !this.optionList.props) {
      return null
    }
    if (this.props.multiple === false) {
      return this.optionList.getSelectedItem()
    }

    // console.log('旧---', this.optionList.getSelectedItems())
    // console.log('新---', this.getMultipleValue(this.optionList.selectControl.selectedMultiple))

    return this.getMultipleValue(this.optionList.selectControl.selectedMultiple)

    // return this.optionList.getSelectedItems()
  }

  _getOptionsByValue(value) {
    if (this.props.multiple === false) {
      return this._getOption(value)
    }

    return this._getOptions(value)
  }

  _getValueText(options, value) {
    const { valueOptions } = this.props
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    if (!this.optionList) {
      value = this.currentValue
    }

    const selected = value !== undefined ? this._getOptionsByValue(value) : this.getSelectedOption()

    if (selected !== null) {
      if (Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props ? item.props.text : item.text
        })

        return vals
      }
      if (options.asArray === true && !Array.isArray(selected)) {
        return selected.props ? [selected.props.text] : [selected.text]
      }

      if (!Array.isArray(selected)) {
        return selected.props ? selected.props.text : selected.text
      }
    }

    return null
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

    if (!this.optionList || !this.optionList.props) {
      return this.currentValue
    }

    if (showSearch) {
      const selectedSearch = this.getSelectedOption()
      if (selectedSearch && selectedSearch.props) return selectedSearch.props.value
      return this.currentValue
    }

    const selected = this.getSelectedOption()

    if (selected !== null) {
      if (Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props.value
        })

        return vals
      }
      if (options.asArray === true && !Array.isArray(selected)) {
        return [selected.props.value]
      }

      if (!Array.isArray(selected)) {
        return selected.props.value
      }
    }

    return null
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }
    if (this.props.showSearch) {
      const selectedOption = this.internalOptions.find((e) => e.value === value)
      if (selectedOption) {
        this.checked = true
        this.checkedOption = selectedOption
        this.updateSearchPopup(selectedOption && selectedOption.text)
        this._directSetValue(value)
      }
    } else {
      // 每次都会更新popup弹窗里面的 list的数据
      // 但如果当前实例 update过了, optionList会被销毁
      if (this.optionList && this.optionList.props) {
        this.optionList.unselectAllItems({ triggerSelectionChange: false })
        this.selectOptions(value, { triggerSelectionChange: options.triggerChange })
      }

      this._directSetValue(value)

      if (options.triggerChange) {
        this._onValueChange()
      }

      // if (this.optionList) {
      //   this.optionList.unselectAllItems({ triggerSelectionChange: false })
      //   this.selectOptions(value, { triggerSelectionChange: options.triggerChange })
      // } else {
      //   this._directSetValue(value)
      //   if (options.triggerChange) {
      //     this._onValueChange()
      //   }
      // }
    }
  }

  _getOption(value) {
    let option = null
    const options = this.internalOptions
    if (Array.isArray(value)) {
      value = value[0]
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        option = options[i]
        break
      }
    }
    return option
  }

  _getOptions(value) {
    let retOptions = null
    const options = this.internalOptions
    if (Array.isArray(value)) {
      retOptions = []
      for (let i = 0; i < options.length; i++) {
        if (value.indexOf(options[i].value) !== -1) {
          retOptions.push(options[i])
        }
      }
    }
    return retOptions
  }

  _valueChange(changed) {
    if (!this.props) return
    // 有值则展示 clearIcon, 无值隐藏
    changed.newValue
      ? this.props.allowClear && this.clearIcon.show()
      : this.props.allowClear && this.clearIcon.hide()

    if (this.placeholder) {
      // 多选时为空数组 || 单选时在options中无数据
      if (
        (Array.isArray(changed.newValue) && changed.newValue.length === 0) ||
        !this._getOption(changed.newValue)
      ) {
        this.placeholder.show()
      } else {
        this.placeholder.hide()
      }
    }
    // 此处有问题，暂时添加判断屏蔽报错，问题原因是调用了已销毁组件的方法导致this是个空对象
    if (this.props && this.props.showSearch) {
      const selectedOption = this.internalOptions.find((e) => e.value === changed.newValue)
      this.checkedOption = selectedOption
      this.updateSearchPopup(selectedOption && selectedOption.text)
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

  _normalizeSearchable() {
    const { searchable } = this.props
    if (searchable) {
      this.setProps({
        searchable: Component.extendProps(
          {
            placeholder: null,
            filter: ({ inputValue, options }) => {
              if (!inputValue) return options
              const reg = new RegExp(inputValue, 'i')
              const filteredOptions = []
              options.forEach((option) => {
                if (reg.test(option.text)) {
                  filteredOptions.push(option)
                }
              })

              return filteredOptions
            },
          },
          searchable,
        ),
      })
    }
  }

  _normalizeInternalOptions(options) {
    if (!Array.isArray(options) || !options.length) {
      this.internalOptions = []
      return
    }

    // if (this.props.extraOptions) {
    //   this.initHiddenOptions = this.props.extraOptions.map((n) => {
    //     return n[this.props.optionFields.value]
    //   })

    //   options = [...options, ...this.props.extraOptions]
    // }

    const { optionFields } = this.props
    this.internalOptions = clone(options)
    this.handleOptions(this.internalOptions, optionFields)
  }

  handleOptions(options, optionFields) {
    const { text: textField, value: valueField } = optionFields
    if (!Array.isArray(options)) return []
    const internalOptions = options
    for (let i = 0; i < internalOptions.length; i++) {
      const item = internalOptions[i]
      item.text = item[textField]
      item.value = item[valueField]
    }
  }
}

Select.defaults = {
  options: [],
  optionFields: { text: 'text', value: 'value' },
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
    classes: { 'nom-select-multiple': true },
    component: List,
    itemDefaults: {},
    itemSelectable: {
      scrollIntoView: true,
    },
    gutter: 'sm',
  },
  extraOptions: [],
  multiple: false,
  showArrow: true,
  minItemsForSearch: 20,
  filterOption: (text, options) => options.filter((o) => o.text.indexOf(text) >= 0),
  virtual: false,
  allowClear: true,
  popupContainer: 'body',
}

Component.register(Select)

export default Select
