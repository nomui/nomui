import Component from '../Component/index'
import Empty from '../Empty/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import AutoCompleteList from './AutoCompleteList'

class AutoCompletePopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.autoCompleteControl = this.opener.field
  }

  _config() {
    const { options } = this.props

    if (options && options.length) {
      this.setProps({
        attrs: {
          style: {
            width: `${this.autoCompleteControl.control.offsetWidth()}px`,
          },
        },
        children: {
          component: Layout,
          body: {
            children: {
              component: AutoCompleteList,
              options: this.props.options,
            },
          },
        },
      })
    } else {
      this.setProps({
        attrs: {
          style: {
            width: `${this.autoCompleteControl.control.offsetWidth()}px`,
          },
        },
        children: {
          component: Layout,
          styles: {
            padding: 2,
          },
          body: {
            children: {
              component: Empty,
            },
          },
        },
      })
    }

    super._config()
  }
}

export default AutoCompletePopup
