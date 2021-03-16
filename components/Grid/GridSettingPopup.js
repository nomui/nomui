import Component from '../Component/index'
import Layer from '../Layer/index'
import Layout from '../Layout/index'

class GridSettingPopup extends Layer {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.grid = this.props.grid
  }

  _config() {
    const that = this

    this.setProps({
      attrs: {
        style: {
          width: 300,
        },
      },
      children: {
        component: Layout,
        styles: {
          color: 'white',
          border: true,
          padding: 'small',

          rounded: 'sm',
        },
        body: {
          children: {
            component: 'Tree',
            treeData: that.grid.props.columns,
            selectedNodes: that.grid.props.selectedColumns,
            multiple: true,
            leafOnly: false,
            onCheck: function (data) {
              that.grid.handleColumnsSetting(data)
            },
          },
        },
      },
    })

    super._config()
  }
}

Component.register(GridSettingPopup)

export default GridSettingPopup
