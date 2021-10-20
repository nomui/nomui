import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import { clone } from '../util/index'

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
    const { options, treeDataFields, flatOptions, multiple, leafOnly } = this.selectControl.props

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
            data: clone(options),
            dataFields: treeDataFields,
            flatData: flatOptions,
            multiple,
            leafOnly,
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
