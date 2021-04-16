import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'

class TreeSelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.selectControl = this.opener.parent.parent.parent
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
            treeData: that.selectControl.props.treeData,
            selectedNodes: that.props.selectedNodes,
            multiple: that.selectControl.props.multiple,
            leafOnly: that.selectControl.props.leafOnly,
            onCheck: function (data) {
              that.selectControl.setValue(data)
            },
            _created: function () {
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
