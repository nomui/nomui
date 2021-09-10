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
    this.selectControl = this.opener.parent.parent
  }

  _config() {
    const that = this
    const { nodeSelectable, nodeCheckable } = that.props
    this.setProps({
      attrs: {
        style: {
          width: `${this.selectControl.content.offsetWidth()}px`,
        },
      },
      children: {
        component: Layout,
        body: {
          children: {
            component: 'Tree',
            expandable: {
              byIndicator: true,
            },
            data: that.selectControl.props.treeData,
            dataFields: that.selectControl.props.treeDataFields,
            multiple: that.selectControl.props.multiple,
            leafOnly: that.selectControl.props.leafOnly,
            nodeSelectable,
            nodeCheckable,
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
