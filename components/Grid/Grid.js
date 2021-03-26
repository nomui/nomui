import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Icon from '../Icon/index'
import Loading from '../Loading/index'
import ExpandedTr from '../Table/ExpandedTr'
import { isFunction, isPlainObject } from '../util/index'
import GridBody from './GridBody'
import GridHeader from './GridHeader'
import GridSettingPopup from './GridSettingPopup'

class Grid extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Grid.defaults, props), ...mixins)
  }

  _created() {
    this.minWidth = 0
    this.lastSortField = null
    this.rowsRefs = {}
    this.checkedRowRefs = {}
  }

  _config() {
    const that = this
    this._propStyleClasses = ['bordered']

    const { line, rowDefaults, frozenLeftCols, frozenRightCols } = this.props

    if (this.firstRender === false) {
      this.props.columns = this.originColumns.slice()
    } else {
      this.originColumns = this.props.columns.slice()
    }

    this._processCheckableColumn()
    this._processExpandableColumn()

    if (frozenLeftCols || frozenRightCols) {
      const rev = this.props.columns.length - frozenRightCols

      const c = this.props.columns.map(function (n, i) {
        if (i + 1 < frozenLeftCols) {
          return {
            ...{
              fixed: 'left',
            },
            ...n,
          }
        }

        if (i + 1 === frozenLeftCols) {
          return {
            ...{
              fixed: 'left',
              lastLeft: true,
            },
            ...n,
          }
        }

        if (i === rev) {
          return {
            ...{
              fixed: 'right',
              firstRight: true,
            },
            ...n,
          }
        }

        if (i > rev) {
          return {
            ...{
              fixed: 'right',
            },
            ...n,
          }
        }

        return n
      })

      this.props.columns = c
    }

    this._calcMinWidth()

    this.setProps({
      classes: {
        'm-frozen-header': this.props.frozenHeader,
      },
      children: [
        this.props.allowCustomColumns && {
          children: {
            component: 'Button',
            icon: 'setting',
            size: 'small',
            type: 'text',
            classes: {
              'nom-grid-setting': true,
            },
            tooltip: '列设置',
            onClick: () => {
              that.showSetting()
            },
          },
        },
        { component: GridHeader, line: line },
        { component: GridBody, line: line, rowDefaults: rowDefaults },
      ],
    })
  }

  _calcMinWidth() {
    this.minWidth = 0
    const { props } = this
    for (let i = 0; i < props.columns.length; i++) {
      const column = props.columns[i]
      if (column.width) {
        this.minWidth += column.width
      } else {
        this.minWidth += 120
      }
    }
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }

    if (this.props.autoMergeColumns && this.props.autoMergeColumns.length > 0) {
      this.autoMergeCols()
    }
  }

  getColumns() {
    return this.props.columns
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  getMappedColumns() {
    const arr = []
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.children) {
          mapColumns(item.children)
        }
        arr.push(item.key)
      })
    }
    mapColumns(this.originColumns)
    return arr
  }

  setSortDirection(sorter) {
    const c = this.getColumns().map(function (item) {
      if (item.field === sorter.field) {
        return {
          ...item,
          ...{
            sortDirection: sorter.sortDirection,
          },
        }
      }
      return {
        ...item,
        ...{
          sortDirection: null,
        },
      }
    })

    this.update({ columns: c })
  }

  handleSort(sorter) {
    const key = sorter.field
    if (!sorter.sortDirection) return

    if (isFunction(sorter.sortable)) {
      let arr = []
      if (this.lastSortField === key) {
        arr = this.props.data.reverse()
      } else {
        arr = this.props.data.sort(sorter.sortable)
      }
      this.setSortDirection(sorter)
      this.update({ data: arr })
      this.lastSortField = key
      return
    }

    this._callHandler(this.props.onSort, {
      field: sorter.field,
      sortDirection: sorter.sortDirection,
    })

    this.setSortDirection(sorter)
    this.lastSortField = key
  }

  getRow(param) {
    let result = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.rowsRefs) {
        if (this.rowsRefs.hasOwnProperty(key)) {
          if (param.call(this.rowsRefs[key]) === true) {
            result = this.rowsRefs[key]
            break
          }
        }
      }
    } else if (isPlainObject(param)) {
      return this.rowsRefs[param[this.props.keyField]]
    } else {
      return this.rowsRefs[param]
    }

    return result
  }

  getCheckedRows() {
    return Object.keys(this.checkedRowRefs).map((key) => {
      return this.checkedRowRefs[key]
    })
  }

  getCheckedRowKeys() {
    return Object.keys(this.checkedRowRefs).map((key) => {
      return this.checkedRowRefs[key].key
    })
  }

  checkAllRows(options) {
    Object.keys(this.rowsRefs).forEach((key) => {
      this.rowsRefs[key] && this.rowsRefs[key].check(options)
    })
  }

  uncheckAllRows(options) {
    Object.keys(this.rowsRefs).forEach((key) => {
      this.rowsRefs[key] && this.rowsRefs[key].uncheck(options)
    })
  }

  checkRows(rows, options) {
    rows = Array.isArray(rows) ? rows : [rows]
    rows.forEach((row) => {
      const rowRef = this.getRow(row)
      rowRef && rowRef.check(options)
    })
  }

  changeCheckAllState() {
    const checkedRowsLength = Object.keys(this.checkedRowRefs).length
    if (checkedRowsLength === 0) {
      this._checkboxAllRef.setValue(false, false)
    } else {
      const allRowsLength = Object.keys(this.rowsRefs).length
      if (allRowsLength === checkedRowsLength) {
        this._checkboxAllRef.setValue(true, false)
      } else {
        this._checkboxAllRef.partCheck(false)
      }
    }
  }

  getKeyValue(rowData) {
    return rowData[this.props.keyField]
  }

  showSetting() {
    this.popup = new GridSettingPopup({
      align: 'center',
      alignTo: window,
      grid: this,
    })
  }

  handleColumnsSetting(params) {
    const tree = params

    const that = this
    that.props.visibleColumns = params

    let treeInfo = null
    function findTreeInfo(origin, key) {
      origin.forEach(function (item) {
        if (item.children) {
          findTreeInfo(item.children, key)
        }
        if (item.key === key) {
          treeInfo = item
        }
      })
      if (treeInfo !== null) return treeInfo
    }

    function addTreeInfo(data) {
      data.forEach(function (item) {
        if (item.children) {
          addTreeInfo(item.children)
        }

        const myinfo = findTreeInfo(that.originColumns, item.key)
        if (myinfo) {
          Object.keys(myinfo).forEach(function (key) {
            item[key] = myinfo[key]
          })
        }
      })
    }
    addTreeInfo(tree)
    this.update({ columns: tree })
    this.popup.hide()
  }

  _processCheckableColumn() {
    const grid = this
    const { rowCheckable, columns } = this.props
    if (rowCheckable) {
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { checkedRowKeys = [] } = normalizedRowCheckable
      const checkedRowKeysHash = {}
      checkedRowKeys.forEach((rowKey) => {
        checkedRowKeysHash[rowKey] = true
      })

      columns.unshift({
        width: 50,
        header: {
          component: Checkbox,
          plain: true,
          _created: (inst) => {
            grid._checkboxAllRef = inst
          },
          onValueChange: (args) => {
            if (args.newValue === true) {
              grid.checkAllRows(false)
            } else {
              grid.uncheckAllRows(false)
            }
          },
        },
        cellRender: ({ row, rowData }) => {
          if (checkedRowKeysHash[row.key] === true) {
            grid.checkedRowRefs[grid.getKeyValue(rowData)] = row
          }
          return {
            component: Checkbox,
            plain: true,
            _created: (inst) => {
              row._checkboxRef = inst
            },
            value: checkedRowKeysHash[row.key] === true,
            onValueChange: (args) => {
              if (args.newValue === true) {
                row._check()
                row._onCheck()
                grid._onRowCheck(row)
              } else {
                row._uncheck()
                row._onUncheck()
                grid._onRowUncheck(row)
              }
              grid.changeCheckAllState()
            },
          }
        },
      })
      this.setProps({
        columns: columns,
      })
    }
  }

  autoMergeCols() {
    const that = this
    this.props.autoMergeColumns.forEach(function (key) {
      that._mergeColumn(key)
    })
  }

  _mergeColumn(key) {
    const el = this.body.element.getElementsByTagName('table')[0]
    function getIndex(data) {
      for (let i = 0; i < el.rows[0].cells.length; i++) {
        if (el.rows[0].cells[i].getAttribute('data-field') === data) {
          return i
        }
      }
    }
    const index = getIndex(key)

    for (let i = el.rows.length - 1; i > 0; i--) {
      el.rows[i].cells[index].rowSpan = el.rows[i].cells[index].rowSpan || 1
      if (el.rows[i].cells[index].innerHTML === el.rows[i - 1].cells[index].innerHTML) {
        el.rows[i - 1].cells[index].rowSpan = el.rows[i].cells[index].rowSpan + 1
        el.rows[i].cells[index].rowSpan = 0
        el.rows[i].cells[index].style.display = 'none'
      }
    }
  }

  resizeCol(data) {
    this.header && this.header.resizeCol(data)
    this.body && this.body.resizeCol(data)
  }

  _processExpandableColumn() {
    const { rowExpandable, columns } = this.props
    if (rowExpandable) {
      columns.unshift({
        width: 50,
        cellRender: ({ row, rowData }) => {
          return {
            component: Icon,
            expandable: {
              byClick: true,
              expandedProps: {
                type: 'minus-square',
              },
              collapsedProps: {
                type: 'plus-square',
              },
              target: () => {
                if (!row.expandedRow) {
                  row.expandedRow = row.after({
                    component: ExpandedTr,
                    data: rowData,
                  })
                }
                return row.expandedRow
              },
            },
          }
        },
      })
      this.setProps({
        columns: columns,
      })
    }
  }

  _onRowCheck(row) {
    const { rowCheckable } = this.props
    if (rowCheckable) {
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { onCheck } = normalizedRowCheckable
      this._callHandler(onCheck, { row: row })
    }
  }

  _onRowUncheck(row) {
    const { rowCheckable } = this.props
    if (rowCheckable) {
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { onUncheck } = normalizedRowCheckable
      this._callHandler(onUncheck, { row: row })
    }
  }

  // handlePinClick(data) {
  //   const { columns } = this.props

  //   const arr = columns.filter(function (item) {
  //     return item.field === data.field
  //   })
  // }
}

Grid.defaults = {
  columns: [],
  data: [],
  frozenHeader: false,
  frozenLeftCols: null,
  frozenRightCols: null,
  allowFrozenCols: false,
  onSort: null,
  keyField: 'id',
  treeConfig: {
    childrenField: 'children',
    treeNodeColumn: null,
    initExpandLevel: -1,
    indentSize: 16,
  },
  allowCustomColumns: false,
  autoMergeColumns: null,
  visibleColumns: null,
  columnResizable: false,
  striped: false,
  showTitle: false,
  ellipsis: false,
}

Component.register(Grid)

export default Grid
