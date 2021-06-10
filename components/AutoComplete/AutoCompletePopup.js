import Component from '../Component/index'
import Empty from '../Empty/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
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
    const { options } = this.props
    const { filterOption, value } = this.autoCompleteControl.props
    const opts = isFunction(filterOption) ? filterOption(value || '', options) : options

    if (opts && opts.length) {
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
              options: opts,
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
          body: {
            // styles: {
            //   padding: 2,
            // },
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
