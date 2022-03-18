import Component from '../Component/index'
import Modal from '../Modal/index'

class GridSettingPopup extends Modal {
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
      classes: {
        'nom-grid-setting-panel': true,
      },

      content: {
        component: 'Panel',
        uistyle: 'card',
        header: {
          caption: {
            title: '列设置',
          },
        },
        body: {
          children: {
            attrs: {
              style: {
                maxHeight: '50vh',
                overflow: 'auto',
              },
            },
            component: 'Tree',
            showline: true,
            data: that.customizableColumns(that.grid.popupTreeData),
            nodeCheckable: {
              checkedNodeKeys: that.grid.getMappedColumns(that.grid.props.columns),
            },
            multiple: true,
            sortable: {
              showHandler: true,
            },

            ref: (c) => {
              this.tree = c
            },
            dataFields: {
              text: 'title',
              key: 'field',
            },
          },
        },
        footer: {
          children: {
            component: 'Cols',
            gutter: 'sm',
            items: [
              {
                component: 'Button',
                type: 'primary',
                text: '确定',
                onClick: function () {
                  const list = that.tree.getCheckedNodesData()
                  if (list.length === 0) {
                    new nomui.Alert({
                      type: 'info',
                      title: '提示',
                      description: '请至少保留一列数据',
                    })
                    return false
                  }
                  that.grid.popupTreeData = that.grid.originColumns = that._sortCustomizableColumns(
                    that.tree.getData(),
                  )
                  that.grid.handleColumnsSetting(that._sortCustomizableColumns(list))
                },
              },
              {
                component: 'Button',
                text: '取消',
                onClick: () => {
                  this.hide()
                },
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
        arr.push(item.field)
      })
    }
    mapColumns(param)
    return arr
  }

  customizableColumns(val) {
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.isChecker === true || item.customizable === false) {
          item.hidden = true
        }
        if (item.children) {
          mapColumns(item.children)
        }
      })
    }
    mapColumns(val)
    return val
  }

  // 将customizable: false的列排至后面
  _sortCustomizableColumns(arr) {
    arr.sort((curr, next) => {
      if (next.customizable === false) return -1
      return 0
    })
    return arr
  }
}

Component.register(GridSettingPopup)

export default GridSettingPopup
