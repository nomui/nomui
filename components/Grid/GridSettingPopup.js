import Component from '../Component/index'
import Modal from '../Modal/index'
import GridSettingTransfer from './GridSettingTransfer'

class GridSettingPopup extends Modal {
  constructor(props, ...mixins) {
    const defaults = {
      size: {
        width: 545
      }
    }

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
    const { okText, cancelText } = this.grid.props
    const rowCheckerCount = that.grid.props.rowCheckable && !that.grid.props.rowCheckable.checkboxOnNodeColumn ? 1 : 0
    this.setProps({
      classes: {
        'nom-grid-setting-panel': true,
      },

      content: {
        component: 'Panel',
        uistyle: 'card',
        header: {
          caption: {
            title: that.grid.props.columnSettingText
          },
        },
        body: {
          children: {
            component: GridSettingTransfer,
            ref: (c) => {
              that.transferRef = c
            },
            grid: this.grid,
            allowFrozenCols: that.grid.props.allowFrozenCols,
            frozenLimit: that.grid.props.frozenLimit,
            value: this.grid.getMappedColumns(this.grid.props.columns),
            frozenCount: that.grid.props.frozenLeftCols - rowCheckerCount,
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
                  text: okText,
                  onClick: function () {
                    that._fixDataOrder()
                  },
                },
              },
              {
                children: {
                  component: 'Button',
                  text: cancelText,
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

    const { columnsLimitTitle, columnsLimitDescription } = this.grid.props

    const list = this.transferRef.getSelectedData()
    const selected = JSON.parse(JSON.stringify(list))
    const frozenCount = this.transferRef.getFrozenCount()

    const lockedList = list.filter((n) => {
      return n.disabled === true
    })

    if (list.length === 0 || (list.length === lockedList.length && list.length === 1 && !(this.grid.props.rowCheckable && this.grid.props.rowCheckable.checkboxOnNodeColumn))) {
      new nomui.Alert({
        type: 'info',
        title: columnsLimitTitle,
        description: columnsLimitDescription,
      })
      return false
    }
    const originData = this.transferRef.getData()
    const result = this._mapTree(list, originData)

    this.grid._updateOriginColumns(result)

    this.grid.handleColumnsSetting(this._sortCustomizableColumns(selected), frozenCount)
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
    const that = this
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.isChecker === true || item.customizable === false) {
          item.hidden = true
          item.disabled = true
        }
        if (that.grid.props.treeConfig && that.grid.props.treeConfig.treeNodeColumn === item.field) {
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


    arr = arr.filter(n => {
      return n.customizable !== false
    })
    const disableColumns = this.grid.originColumns.filter(n => { return n.customizable === false })
    arr = [...arr, ...disableColumns]
    return arr
  }

  _toogleCheckall() {
    const { selectAllText, deselectAllText } = this.grid.props
    if (this.checkallBtn.props.text === selectAllText) {
      this.tree.checkAllNodes({ ignoreDisabled: true })
      this.checkallBtn.update({ text: deselectAllText })
    } else {
      this.tree.uncheckAllNodes({ ignoreDisabled: true })
      this.checkallBtn.update({ text: selectAllText })
    }
  }
}

Component.register(GridSettingPopup)

export default GridSettingPopup
