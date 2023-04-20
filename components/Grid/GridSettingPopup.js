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
    let doubleGroupMode = false
    if (
      this.grid.props.columnsCustomizable &&
      this.grid.props.columnsCustomizable.doubleGroupMode
    ) {
      doubleGroupMode = true
    }
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
              doubleGroupMode,
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
            component: 'Flex',
            gutter: 'small',
            attrs: {
              style: {
                width: '100%',
              },
            },
            justify: 'end',
            cols: [
              !doubleGroupMode && {
                grow: true,
                children: {
                  component: 'Button',
                  text: '全选',
                  ref: (c) => {
                    this.checkallBtn = c
                  },
                  onClick: () => {
                    this._toogleCheckall()
                  },
                },
              },
              {
                children: {
                  component: 'Button',
                  type: 'primary',
                  text: '确定',
                  onClick: function () {
                    if (doubleGroupMode) {
                      const nodeRefs = that.tree.leftNodes.getChildren()
                      if (nodeRefs.length > 0) {
                        Object.keys(nodeRefs).forEach((nodeKey) => {
                          if (nodeRefs[nodeKey].props.disabled !== true) {
                            nodeRefs[nodeKey].props.checked = true
                          }
                        })
                      }
                    }
                    const list = that.tree.getCheckedNodesData(
                      null,
                      doubleGroupMode && that.tree.leftNodes,
                    )
                    const lockedList = list.filter((n) => {
                      return n.disabled === true
                    })

                    if (
                      list.length === 0 ||
                      (list.length === lockedList.length && list.length === 1)
                    ) {
                      new nomui.Alert({
                        type: 'info',
                        title: '提示',
                        description: '请至少保留一列数据',
                      })
                      return false
                    }
                    if (doubleGroupMode) {
                      const left = that.tree.getData(null, that.tree.leftNodes)
                      const right = that.tree.getData(null, that.tree.rightNodes)
                      that.grid.popupTreeData = that.grid.originColumns = that._sortCustomizableColumns(
                        [...left, ...right],
                      )
                    } else {
                      that.grid.popupTreeData = that.grid.originColumns = that._sortCustomizableColumns(
                        that.tree.getData(),
                      )
                    }
                    debugger
                    that.grid.handleColumnsSetting(that._sortCustomizableColumns(list))
                  },
                },
              },
              {
                children: {
                  component: 'Button',
                  text: '取消',
                  onClick: () => {
                    this.hide()
                  },
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
          item.disabled = true
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
      if (next.customizable === false && next.field !== 'checkbox') return -1
      return 0
    })
    return arr
  }

  _toogleCheckall() {
    if (this.checkallBtn.props.text === '全选') {
      this.tree.checkAllNodes({ ignoreDisabled: true })
      this.checkallBtn.update({ text: '取消全选' })
    } else {
      this.tree.uncheckAllNodes({ ignoreDisabled: true })
      this.checkallBtn.update({ text: '全选' })
    }
  }
}

Component.register(GridSettingPopup)

export default GridSettingPopup
