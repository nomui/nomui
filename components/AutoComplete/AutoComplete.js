import Component from '../Component/index'
import Textbox from '../Textbox/index'
import { isFunction } from '../util/index'
import AutoCompletePopup from './AutoCompletePopup'

class AutoComplete extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
      debounce: true,
      interval: 300,
      filterOption: (value, options) => options.filter((o) => o.value.includes(value)),
      allowClear: true,
      // rightIcon: {
      //   compoent: 'Icon',
      //   type: 'close',
      //   hidden: true,
      //   onClick({ event }) {
      //     event.stopPropagation()
      //   },
      // },
    }

    super(Component.extendProps(defaults, props), ...mixins)
    this._init.bind(this)
    this._handleSearch.bind(this)
    this._doSearch.bind(this)
  }

  _created() {
    this.placeholder = this.props.placeholder
    this.capsLock = false
    this.searchMode = false
    this.clearContent = true
  }

  _rendered() {
    this.input && this._init()
    this.popup && this.popup.remove()

    this.popup = new AutoCompletePopup({
      trigger: this.control,
      options: this.props.options,
    })
  }

  _remove() {
    this.timer && clearTimeout(this.timer)
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
      if (!autoComplete.capsLock) {
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
    return super._getValue()
  }

  _setValue(value, options) {
    super._setValue(value, options)
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
    const { onSearch, filterOption, options } = this.props

    isFunction(filterOption) && this.popup.update({ options: filterOption(txt, options) })
    isFunction(onSearch) && onSearch(txt)
  }
}

Component.register(AutoComplete)

export default AutoComplete
