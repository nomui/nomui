import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import Textbox from '../Textbox/index'
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
    const { searchable, options: originOptions } = this.selectControl.props
    this.setProps({
      attrs: {
        style: {
          width: `${this.selectControl.control.offsetWidth()}px`,
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
          children: {
            component: SelectList,
            virtual: this.props.virtual,
          },
        },
      },
    })
    super._config()
  }

  _rendered() {
    if (this.element.getAttribute('offset-y') !== '0') {
      this.addClass('nom-select-animate-bottom-show')
    } else {
      this.addClass('nom-select-animate-top-show')
    }
  }

  _show() {
    super._show()
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
