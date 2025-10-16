import Component from '../Component/index'
import Textbox from '../Textbox/index'
import { clone, extend, isFunction, isPromiseLike } from '../util/index'
import AutoCompletePopup from './AutoCompletePopup'

class AutoComplete extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(AutoComplete.defaults, props), ...mixins)
    this._init.bind(this)
    this._handleSearch.bind(this)
    this._doSearch.bind(this)
  }

  _created() {
    super._created()
    this.placeholder = this.props.placeholder
    this.imeInputing = false
    this.searchMode = false
    this.clearContent = true
    this.internalOptions = {}
  }

  _rendered() {
    const { searchable } = this.props
    if ((!searchable || searchable.sharedInput !== false) && this.input) {
      this._init()
    }
    const { options } = this.props

    this.popup = new AutoCompletePopup({
      trigger: this.control,
      options,
      onShow: () => {
        if (this.optionList) {
          this.optionList.update({
            selectedItems: this.getValue(),
          })
          this.optionList.scrollToSelected()
        }
      },
    })
  }

  _remove() {
    this.timer && clearTimeout(this.timer)
  }

  _config() {
    const autoCompleteRef = this
    const { allowClear, options } = this.props
    this._normalizeSearchable()

    this._normalizeInternalOptions(options)

    if (allowClear && this.currentValue) {
      this.setProps({
        clearProps: {
          component: 'Icon',
          type: 'times',
          ref: (c) => {
            this.clearIcon = c
          },
          classes: {
            'nom-auto-complete-clear': true,
            'nom-field-clear-handler': true,
          },
          onClick: ({ event }) => {
            event.stopPropagation()
            autoCompleteRef.clear()
            this.props.onClear && this._callHandler(this.props.onClear)
            this.clearIcon.hide()
            autoCompleteRef.popup && autoCompleteRef.popup.hide()
          },
        },
      })
    }

    if (options && this.popup) {
      this.popup.update({ options })
    }

    super._config()
  }

  _init() {
    const autoComplete = this

    this.input.element.addEventListener('focus', function () {
      autoComplete.currentValue = this.value
      if (autoComplete.clearContent) {
        this.placeholder = this.value
        this.value = ''
      } else {
        autoComplete.clearContent = true
      }
      autoComplete.popup && autoComplete.popup.update({ options: autoComplete.props.options })
    })
    this.input.element.addEventListener('input', function () {
      if (!autoComplete.imeInputing) {
        autoComplete._handleSearch(this.value)
      }
    })
    this.input.element.addEventListener('blur', function () {
      // 没有输入则需重置,此动作只能在blur事件而非change事件中进行
      if (!autoComplete.searchMode) {
        // 重置
        this.value = autoComplete.currentValue
      }
      this.placeholder = autoComplete.placeholder || ''
      autoComplete.searchMode = false
      const { filterName } = autoComplete.props
      if (filterName === 'select' && !autoComplete._getValue()) {
        autoComplete.setProps({ text: '' })
        autoComplete.clear()
      }
      if (autoComplete.props.delayValueChange) {
        setTimeout(() => {
          !autoComplete.optionClicked && autoComplete._onValueChange({ fromBlur: true })
        }, 200)
      }
    })
    // 中文介入
    this.input.element.addEventListener('compositionstart', function () {
      autoComplete.imeInputing = true
    })
    this.input.element.addEventListener('compositionend', function () {
      autoComplete.imeInputing = false
      autoComplete._handleSearch(this.value)
    })
  }

  _getValue() {
    const { options, filterName, optionFields } = this.props
    const inputText = this._getInputText()

    if (filterName === 'select' || (optionFields.text && optionFields.value)) {
      const currOption = options.find((item) => item[optionFields.text] === inputText)
      if (currOption) {
        return currOption[optionFields.value] || currOption[optionFields.text]
      }
    }
    if (inputText === '') {
      return null
    }
    return inputText
  }

  _getInputText() {
    const { trimValue } = this.props
    let inputText = this.getText()
    inputText = trimValue ? inputText.trimLeft().trimRight() : inputText
    return inputText
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }
    const { filterName, options: opt, optionFields } = this.props

    let _value = value
    if (filterName === 'select') {
      const selectedOption = opt.find((e) => e[optionFields.value] === value)
      if (selectedOption) {
        _value = selectedOption[optionFields.text]
      } else {
        this.input.setText('')
        this.currentValue = null
        super._onValueChange()
        return
      }
    }
    this.input.setText(_value)
    const newValue = this.getValue()
    this.oldValue = this.currentValue

    if (options.triggerChange) {
      if (newValue !== this.oldValue) {
        super._onValueChange()
      }
    }
    this.currentValue = newValue
  }

  getSelectedOption() {
    const { options, value, optionFields } = this.props
    if (value) {
      const currOption = options.find((item) => item[optionFields.value] === value)
      return currOption
    }
    return null
  }

  _valueChange(changed) {
    changed.newValue
      ? this.props.allowClear && this.clearIcon.show()
      : this.props.allowClear && this.clearIcon.hide()
    const { filterName } = this.props
    filterName === 'select' && this.setProps({ text: this._getInputText() })
  }

  _onValueChange(args = {}) {
    if (args.fromSelect) {
      this.optionClicked = true
    } else {
      this.optionClicked = false
    }

    const that = this
    this.oldValue = clone(this.currentValue)

    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    args = extend(true, args, {
      name: this.props.name,
      oldValue: this.oldValue,
      newValue: this.currentValue,
    })

    if (!this.props.delayValueChange || args.fromSelect || args.fromBlur) {
      setTimeout(function () {
        that.props && that.props.onValueChange && that._callHandler(that.props.onValueChange, args)
        that.group && that.group._onValueChange({ changedField: args.changedField || that })

        isFunction(that._valueChange) && that._valueChange(args)
        if (that.validateTriggered) {
          that._validate()
        }
      }, 0)
    }
    this._triggerDependencyValueChange()
  }

  blur() {
    super.blur()
  }

  focus() {
    this.clearContent = false
    super.focus()
  }

  _isFocus() {
    if (!this.input) return false
    return document.activeElement === this.input.element
  }

  _handleSearch(txt) {
    const autoComplete = this
    this.popup && this.popup.show()
    const { debounce, interval } = this.props
    // 防抖
    this.timer && clearTimeout(this.timer)
    if (debounce) {
      this.timer = setTimeout(function () {
        autoComplete._doSearch(txt)
      }, interval)
    } else {
      autoComplete._doSearch(txt)
    }
  }

  _doSearch(txt) {
    this.searchMode = true
    const { onSearch, filterOption, searchable } = this.props

    const options = this.internalOptions
    this.setProps({ text: txt })

    if (searchable && searchable.sharedInput !== false && isFunction(searchable.onSearch)) {
      const loading = new nomui.Loading({
        container: this.optionList.parent,
      })
      const searchPromise = searchable.onSearch({
        inputValue: txt,
        options,
      })
      if (isPromiseLike(searchPromise)) {
        return searchPromise
          .then((val) => {
            this.props.options = val
            this.optionList.update()
            loading && loading.remove()
          })
          .catch(() => {
            loading && loading.remove()
          })
      }

      loading && loading.remove()
      this.props.options = searchPromise
      searchPromise && this.optionList.update()
    } else if (isFunction(filterOption)) {
      this.popup.update({ options: filterOption(txt, options) })
    }

    isFunction(onSearch) && onSearch({ text: txt, sender: this })
  }

  _normalizeSearchable() {
    const { searchable, onSearch } = this.props
    if (searchable) {
      this.setProps({
        searchable: Component.extendProps(
          {
            placeholder: null,
            onSearch,
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
    const { optionFields, filterName } = this.props
    this.internalOptions = clone(options)
    this.handleOptions(this.internalOptions, optionFields, filterName)
  }

  handleOptions(options, optionFields, filterName) {
    const { text: textField, value: valueField } = optionFields
    if (!Array.isArray(options)) return []
    const internalOptions = options
    for (let i = 0; i < internalOptions.length; i++) {
      const item = internalOptions[i]
      item.value = item[valueField]
      if (filterName === 'select') item.text = item[textField]
    }
  }
}

AutoComplete.defaults = {
  options: [],
  debounce: true,
  interval: 300,
  optionFields: { value: 'value' },
  filterOption: (txt, options) => {
    return options
  },
  allowClear: true,
  filterName: 'text', // text,select
  optionDefaults: {},
  autoFocus: false, // 自动聚焦搜索框
  popupWidth: null,
  delayValueChange: false,
}

Component.register(AutoComplete)

export default AutoComplete
