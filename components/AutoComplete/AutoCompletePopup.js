import Component from '../Component/index'
import Empty from '../Empty/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import Textbox from '../Textbox/index'
import { isFunction } from '../util/index'
import AutoCompleteList from './AutoCompleteList'

class AutoCompletePopup extends Popup {
  constructor(props, ...mixins) {

    const defaults = {
      autoRender: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.autoCompleteControl = this.opener.field
  }

  _config() {
    const autoCompletePopupRef = this
    const { options } = this.props
    const { searchable, debounce, interval } = this.autoCompleteControl.props
    this.setProps({
      attrs: {
        style: {
          width: `${this.autoCompleteControl.control.offsetWidth()}px`,
        },
      },
      children: {
        component: Layout,
        header: searchable
          ? {
            children: {
              component: Textbox,
              placeholder: searchable.placeholder,
              _created: (inst) => {
                autoCompletePopupRef.autoCompleteControl.searchRef = inst
              },
              onValueChange({ newValue }) {
                if (debounce) {
                  autoCompletePopupRef.timer && clearTimeout(autoCompletePopupRef.timer)
                  autoCompletePopupRef.timer = setTimeout(() => {
                    const loading = new nomui.Loading({
                      container: autoCompletePopupRef.autoCompleteControl.optionList.parent,
                    })
                    const searchPromise = searchable.onSearch({
                      inputValue: newValue,
                      options,
                    })
                    if (autoCompletePopupRef._isPromise(searchPromise)) {
                      return searchPromise
                        .then((val) => {
                          autoCompletePopupRef.autoCompleteControl.props.options = val
                          autoCompletePopupRef.autoCompleteControl.optionList.update()
                          loading && loading.remove()
                        })
                        .catch(() => {
                          loading && loading.remove()
                        })
                    }

                    loading && loading.remove()
                    autoCompletePopupRef.autoCompleteControl.props.options = searchPromise
                    searchPromise && autoCompletePopupRef.autoCompleteControl.optionList.update()
                  }, interval)
                }
              },
            },
          }
          : null,
        body: {
          children: autoCompletePopupRef._getOptionList(),
        },
      },
    })

    super._config()
  }

  animateHide() {
    if (!this.element) return false
    let animateName
    if (this.element.getAttribute('offset-y') !== '0') {
      animateName = 'nom-auto-complete-animate-bottom-hide'
    } else {
      animateName = 'nom-auto-complete-animate-top-hide'
    }
    this.addClass(animateName)
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
      this.removeClass(animateName)
    }, 160)
  }

  _show() {
    super._show()
    this.autoCompleteControl.searchRef && this.autoCompleteControl.searchRef.focus()
    this.removeClass('nom-layer-animate-show')
    this.autoCompleteControl.props.animate && this.animateInit()
  }

  animateInit() {
    if (!this.element) return false
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-auto-complete-animate-bottom-show')
    } else {
      this.addClass('nom-auto-complete-animate-top-show')
    }
  }

  _getOptionList() {
    const options = this.autoCompleteControl.internalOptions
    const { searchable, value, filterOption, filterName, text = '' } = this.autoCompleteControl.props
    const _value = filterName === 'text' ? value : text
    const opts = isFunction(filterOption) ? filterOption(_value || '', options) : options
    if (searchable) {
      return {
        component: AutoCompleteList,
        options: opts,
      }
    }

    if (opts && opts.length) {
      return {
        component: AutoCompleteList,
        options: opts,
      }
    }
    this.autoCompleteControl.optionList = null
    return {
      component: Layout,
      body: {
        styles: { padding: 1 },
        children: {
          component: Empty,
        },
      },
    }
  }

  _isPromise(p) {
    if (!p) return false
    return p instanceof Promise
  }
}

export default AutoCompletePopup
