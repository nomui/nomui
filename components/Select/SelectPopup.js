import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import SelectList from './SelectList'

class SelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    super._create()

    this.selectControl = this.opener
  }

  _config() {
    this.setProps({
      attrs: {
        style: {
          width: `${this.selectControl.offsetWidth()} px`,
        },
      },
      children: {
        component: Layout,
        body: {
          children: {
            component: SelectList,
          },
        },
      },
    })

    super._config()
  }
}

Component.register(SelectPopup)

export default SelectPopup
