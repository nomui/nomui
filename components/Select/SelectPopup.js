import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import SelectList from './SelectList'
import Textbox from '../Textbox/index'

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
                      return result.then((value) => {
                        this.selectControl.props.options = value
                        this.selectControl.optionList.update()
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
          },
        },
      },
    })

    super._config()
  }

  _show() {
    super._show()
    this.selectControl.searchBox && this.selectControl.searchBox.focus()
  }
}

Component.register(SelectPopup)

export default SelectPopup
