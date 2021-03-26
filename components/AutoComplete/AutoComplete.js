import Component from '../Component/index'
import Textbox from '../Textbox/index'
import { isFunction } from '../util/index'
import AutoCompletePopup from './AutoCompletePopup'

class AutoComplete extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
    }

    super(Component.extendProps(defaults, props), ...mixins)
    this._init.bind(this)
    this._handleSearch.bind(this)
    this._handleChange.bind(this)
  }

  _created() {
    this.capsLock = false
    this.searchMode = false
  }

  _rendered() {
    if (this.firstRender && this.input) {
      this._init()
    }
    this.popup = new AutoCompletePopup({
      trigger: this.control,
    })
  }

  _init() {
    const autoComplete = this

    this.input.element.addEventListener('focus', function () {
      this.value = ''
    })
    this.input.element.addEventListener('input', function () {
      if (!autoComplete.capsLock) {
        autoComplete._handleSearch(this.value)
      }
    })
    this.input.element.addEventListener('change', function () {
      // autoComplete._handleChange(this.value)
    })
    this.input.element.addEventListener('blur', function () {
      // 没有输入则需重置
      console.log('mode', autoComplete.searchMode)
      if (!autoComplete.searchMode) {
        this.value = autoComplete._getValue()
      }
      autoComplete.searchMode = false
    })
    this.input.element.addEventListener('compositionstart', function () {
      autoComplete.capsLock = true
    })
    this.input.element.addEventListener('compositionend', function () {
      autoComplete.capsLock = false
      autoComplete._handleSearch(this.value)
    })
  }

  _getValue() {
    return this.searchMode ? this.currentValue : super._getValue()
  }

  _isFocus() {
    if (!this.input) return false
    return document.activeElement === this.input.element
  }

  _handleSearch(txt) {
    this.searchMode = true
    const { onSearch } = this.props
    if (isFunction(onSearch)) {
      onSearch(txt)
    }
  }

  _handleChange(txt) {
    console.log('current value', this.currentValue)
    const { onChange } = this.props
    if (isFunction(onChange)) {
      onChange(txt)
    }
  }
}

Component.register(AutoComplete)

export default AutoComplete
