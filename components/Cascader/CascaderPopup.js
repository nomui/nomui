import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import CascaderList from './CascaderList'

class CascaderPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.cascaderControl = this.opener.field
  }

  _config() {
    const { popMenu } = this.props
    this.setProps({
      children: {
        component: Layout,
        body: {
          children: {
            component: CascaderList,
            popMenu,
          },
        },
      },
    })

    super._config()
  }
}

Component.register(CascaderPopup)

export default CascaderPopup
