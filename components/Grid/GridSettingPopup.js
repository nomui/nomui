import Component from '../Component/index'
import Modal from '../Modal/index'
import GridSettingTransfer from './GridSettingTransfer'

class GridSettingPopup extends Modal {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.grid = this.props.grid
    this.tree = null
    this.tempArr = []
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
          // children: {
          //   attrs: {
          //     style: {
          //       maxHeight: '50vh',
          //       overflow: 'auto',
          //     },
          //   },
          //   component: 'Tree',
          //   showline: true,
          //   data: that.customizableColumns(that.grid.popupTreeData),
          //   nodeCheckable: {
          //     checkedNodeKeys: that.grid.getMappedColumns(that.grid.props.columns),
          //   },
          //   multiple: true,
          //   sortable: {
          //     showHandler: true,
          //   },

          //   ref: (c) => {
          //     this.tree = c
          //   },
          //   dataFields: {
          //     text: 'title',
          //     key: 'field',
          //   },
          // },
          children: {
            component: GridSettingTransfer,
            ref: (c) => {
              that.transferRef = c
            },
            value: that.grid.getMappedColumns(that.grid.props.columns),
            data: that.customizableColumns(that.grid.popupTreeData),
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
            cols: [
              {
                grow: true,
              },
              {
                children: {
                  component: 'Button',
                  type: 'primary',
                  text: '确定',
                  onClick: function () {
                    that._fixDataOrder()
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

  _fixDataOrder() {
    const list = this.transferRef.getSelectedData()
    const frozenCount = this.transferRef.getFronzenCount()

    const lockedList = list.filter((n) => {
      return n.disabled === true
    })

    if (list.length === 0 || (list.length === lockedList.length && list.length === 1)) {
      new nomui.Alert({
        type: 'info',
        title: '提示',
        description: '请至少保留一列数据',
      })
      return false
    }

    const originData = this.transferRef.getData()
    const result = this._mapTree(list, originData)

    this.grid.popupTreeData = this.grid.originColumns = this._sortCustomizableColumns(result)
    this.grid.handleColumnsSetting(this._sortCustomizableColumns(list), frozenCount)
  }

  _findItem(arr, key) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].field === key) {
        this.tempArr = arr[i].children
        break
      }
      if (arr[i].children) {
        this._findItem(arr[i].children, key)
      }
    }
  }

  _mapTree(data, origin) {
    data = this._concatArr(data, origin)
    for (let i = 0; i < data.length; i++) {
      if (data[i].children) {
        this._findItem(origin, data[i].field)
        const related = this.tempArr
        data[i].children = this._mapTree(data[i].children, related || [])
      }
    }

    return data
  }

  _concatArr(target, related) {
    const restItem = related.filter((n) => {
      return (
        target.findIndex((x) => {
          return x.field === n.field
        }) === -1
      )
    })

    return [...target, ...restItem]
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
