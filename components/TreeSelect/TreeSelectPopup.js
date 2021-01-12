import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'

class TreeSelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    super._create()

    this.selectControl = this.opener
  }

  _config() {
    const that = this

    this.setProps({
      attrs: {
        style: {
          width: `${this.selectControl.offsetWidth()}px`,
        },
      },
      children: {
        component: Layout,
        body: {
          children: {
            component: 'Tree',
            treeData: this.selectControl.props.treeData,
            selected: that.props.selected,
            multiple: that.selectControl.props.multiple,
            leafOnly: !that.selectControl.props.multiple,
            onCheck: function (data, key, status) {
              that.selectControl.setValue(data, key, status)
            },
            _create: function () {
              that.selectControl.tree = this
            },
          },
        },
      },
    })

    super._config()
  }
}

Component.register(TreeSelectPopup)

export default TreeSelectPopup
