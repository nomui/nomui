import Component from '../Component/index'
import Empty from '../Empty/index'
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
    if (popMenu && popMenu.length) {
      this.setProps({
        children: {
          classes: {
            'nom-cascader-pop-container': true,
          },
          component: Layout,
          body: {
            children: {
              component: CascaderList,
              popMenu,
            },
          },
        },
      })
    } else {
      this.setProps({
        children: {
          styles: {
            padding: 2,
          },
          component: Layout,
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

Component.register(CascaderPopup)

export default CascaderPopup
