import Component from '../Component/index'
import Layer from '../Layer/index'

class GridSettingPopup extends Layer {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.grid = this.props.grid
    this.tree = null
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
        component: 'Panel',
        uistyle: 'card',
        fit: true,
        styles: {
          shadow: 'sm',
          rounded: 'sm',
        },
        classes: {
          'nom-grid-setting-panel': true,
        },
        header: {
          caption: {
            title: '列设置',
          },
        },
        body: {
          children: {
            component: 'Tree',
            showline: true,
            treeData: that.grid.originColumns,
            selectedNodes: that.grid.props.visibleColumns
              ? that.getMappedColumns(that.grid.props.visibleColumns)
              : that.grid.getMappedColumns(),
            multiple: true,
            leafOnly: false,
            ref: (c) => {
              this.tree = c
            },
            fields: {
              title: 'title',
              value: 'key',
            },
          },
        },
        footer: {
          children: {
            component: 'Cols',
            gutter: 'xs',
            items: [
              {
                component: 'Button',
                text: '确定',
                onClick: function () {
                  const list = that.tree.getSelectedTree()
                  that.grid.handleColumnsSetting(list)
                },
              },
              {
                component: 'Button',
                text: '取消',
              },
            ],
          },
        },
      },
    })

    super._config()
  }

  getMappedColumns(param) {
    const arr = []
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.children) {
          mapColumns(item.children)
        }
        arr.push(item.key)
      })
    }
    mapColumns(param)
    return arr
  }
}

Component.register(GridSettingPopup)

export default GridSettingPopup
