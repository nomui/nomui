import Component from '../Component/index'
import Empty from '../Empty/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import Textbox from '../Textbox/index'
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

    // if (opts && opts.length) {
    //   this.setProps({
    //     attrs: {
    //       style: {
    //         width: `${this.autoCompleteControl.control.offsetWidth()}px`,
    //       },
    //     },
    //     children: {
    //       component: Layout,
    //       body: {
    //         children: {
    //           component: AutoCompleteList,
    //           options: opts,
    //         },
    //       },
    //     },
    //   })
    // } else {
    //   this.setProps({
    //     attrs: {
    //       style: {
    //         width: `${this.autoCompleteControl.control.offsetWidth()}px`,
    //       },
    //     },
    //     children: {
    //       component: Layout,
    //       body: {
    //         styles: {
    //           padding: 1,
    //         },
    //         children: {
    //           component: Empty,
    //         },
    //       },
    //     },
    //   })
    // }

    // super._config()
  }

  animateHide() {
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
    this.autoCompleteControl.props.animate && this.initAnimation()
  }

  initAnimation() {
    if (!this.element) return false
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-auto-complete-animate-bottom-show')
    } else {
      this.addClass('nom-auto-complete-animate-top-show')
    }
  }

  _getOptionList() {
    const { options } = this.props
    // const { searchable, value, filterOption } = this.autoCompleteControl.props
    const { searchable } = this.autoCompleteControl.props
    // const opts = isFunction(filterOption) ? filterOption(value || '', options) : options
    // console.log(opts, options, value)

    if (searchable) {
      return {
        component: AutoCompleteList,
        options,
      }
    }

    if (options && options.length) {
      return {
        component: AutoCompleteList,
        options,
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
