import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import Textbox from '../Textbox/index'
import { isFunction, isNumeric } from '../util/index'
import SelectList from './SelectList'

class SelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.selectControl = this.opener.field
  }

  _config() {
    const { searchable, options: originOptions, popupWidth, extraTools } = this.selectControl.props

    let { maxPopupWidth } = this.selectControl.props
    if (isNumeric(maxPopupWidth)) {
      maxPopupWidth = `${maxPopupWidth}px`
    }

    let w = `${this.selectControl.control.offsetWidth()}px`
    if (isNumeric(popupWidth)) {
      w = `${popupWidth}px`
    } else if (popupWidth === 'auto') {
      w = 'auto'
    }

    this.setProps({
      attrs: {
        style: {
          width: w,
          maxWidth: maxPopupWidth || `${this.selectControl.control.offsetWidth()}px`,
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
                  this.selectControl.searchBox = inst
                },
                onValueChange: ({ newValue }) => {
                  this.timer && clearTimeout(this.timer)
                  this.timer = setTimeout(() => {
                    const loading = new nomui.Loading({
                      container: this.selectControl.optionList.parent,
                    })
                    const result = searchable.filter({
                      inputValue: newValue,
                      options: originOptions,
                    })
                    if (result && result.then) {
                      return result
                        .then((value) => {
                          this.selectControl.props.options = value
                          this.selectControl.optionList.update()
                          loading && loading.remove()
                        })
                        .catch(() => {
                          loading && loading.remove()
                        })
                    }
                    loading && loading.remove()

                    this.selectControl.props.options = result
                    result && this.selectControl.optionList.update()
                  }, 300)
                },
              },
            }
          : null,
        body: {
          children: [
            {
              component: SelectList,
              virtual: this.props.virtual,
              onRendered: ({ inst }) => {
                if (!this.emptyTipRef) return
                if (inst.props.items && inst.props.items.length) {
                  this.emptyTipRef.hide()
                } else {
                  this.emptyTipRef.show()
                }
              },
            },
            searchable &&
              searchable.emptyTip && {
                ref: (c) => {
                  this.emptyTipRef = c
                },
                hidden: true,
                classes: {
                  'nom-select-popup-empty-tip': true,
                },
                children: searchable.emptyTip,
              },
          ],
        },
        footer: extraTools
          ? {
              classes: {
                'nom-select-popup-extra-tools': true,
              },
              children: isFunction(extraTools)
                ? extraTools({ popup: this, inst: this.selectControl })
                : extraTools,
            }
          : null,
      },
    })
    super._config()
  }

  _rendered() {
    this.removeClass('nom-layer-animate-show')
    this.selectControl.props.animate && this.animateInit()
  }

  animateInit() {
    if (!this.element) return false
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-select-animate-bottom-show')
    } else {
      this.addClass('nom-select-animate-top-show')
    }
  }

  _show() {
    super._show()
    this.removeClass('nom-layer-animate-show')
    const { searchBox, props } = this.selectControl
    if (searchBox) {
      searchBox.focus()
      // 上一次搜索无数据，则清除搜索条件
      if (!props.options || !props.options.length) {
        searchBox.clear()
      }
    }
  }

  animateHide() {
    if (!this.element) return false
    let animateName
    if (this.element.getAttribute('offset-y') !== '0') {
      animateName = 'nom-select-animate-bottom-hide'
    } else {
      animateName = 'nom-select-animate-top-hide'
    }
    this.addClass(animateName)
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
      this.removeClass(animateName)
    }, 160)
  }
}

Component.register(SelectPopup)

export default SelectPopup
