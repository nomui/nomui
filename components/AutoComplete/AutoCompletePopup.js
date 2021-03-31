import Component from '../Component/index'
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

    super._config()
  }
}

export default AutoCompletePopup
