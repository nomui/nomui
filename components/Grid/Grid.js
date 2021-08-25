import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Icon from '../Icon/index'
import Loading from '../Loading/index'
import ExpandedTr from '../Table/ExpandedTr'
import { STORAGE_KEY_GRID_COLUMNS } from '../util/constant'
import { clone, isFunction, isNullish, isPlainObject } from '../util/index'
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

    this.originColumns = clone(this.props.columns)
    this.filter = {}
  }

  _parseColumnsCustom() {
    const { columnsCustomizable, visibleColumns } = this.props
    // 未设置自定义列展示
    if (!columnsCustomizable) return
    // 设置过后，无需再从selected和cache中取值
    if (visibleColumns && visibleColumns.length) return

    this.props.visibleColumns = null
    const { selected, cache: cacheKey } = columnsCustomizable

    if (selected && selected.length) {
      // 从originColumns 过滤selected存在的列
      this.props.visibleColumns = this._getColsFromSelectCols(this.originColumns, selected)
    }
    // 缓存中有数据则读取缓存中的col的field数据
    if (cacheKey) {
      let storeFields = localStorage.getItem(`${STORAGE_KEY_GRID_COLUMNS}_${cacheKey}`)
      if (storeFields && storeFields.length) {
        storeFields = JSON.parse(storeFields)
        // 从originColumns 过滤storeFields存在的列
        this.props.visibleColumns = this._getColsFromFields(this.originColumns, storeFields)
      }
    }
  }

  _config() {
    const that = this
    // 切换分页 data数据更新时 此两项不重置会导致check表现出错
    this.rowsRefs = {}
    this.checkedRowRefs = {}
    this._propStyleClasses = ['bordered']

    const { line, rowDefaults, frozenLeftCols, frozenRightCols } = this.props
    this._parseColumnsCustom()
    this._processCheckableColumn()
    this._processExpandableColumn()

    if (this.props.visibleColumns) {
      this.props.columns = this.props.visibleColumns
    }

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
        this.props.columnsCustomizable && {
          children: {
            component: 'Button',
            icon: 'setting',
            size: 'small',
            // type: 'text',
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

    if (this.props.rowCheckable && this._checkboxAllRef) {
      this.changeCheckAllState()
    }

    if (this.props.data && this.props.autoMergeColumns && this.props.autoMergeColumns.length > 0) {
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

  getMappedColumns(columns) {
    const arr = []
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.children) {
          mapColumns(item.children)
        }
        arr.push(item.field)
      })
    }
    mapColumns(columns || this.originColumns)

    return arr
  }

  setSortDirection(sorter) {
    const c = this.getColumns().map(function (item) {
      if (!sorter) {
        return {
          ...item,
          ...{
            sortDirection: null,
          },
        }
      }
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

    if (this.props.visibleColumns) {
      const vc = this.props.visibleColumns.map(function (item) {
        if (!sorter) {
          return {
            ...item,
            ...{
              sortDirection: null,
            },
          }
        }
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
      this.props.visibleColumns = vc
    }
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

  resetSort() {
    if (this.lastSortField) {
      this.header.table.thRefs[this.lastSortField].resetSort()
    }
    this.lastSortField = null
  }

  resetColumnsCustom() {
    const {
      columnsCustomizable: { cache },
    } = this.props
    if (cache) {
      localStorage.removeItem(`${STORAGE_KEY_GRID_COLUMNS}_${cache}`)
    }
    this.update({
      visibleColumns: this.originColumns,
    })
  }

  handleFilter(isReset) {
    const that = this
    if (
      !isReset &&
      Object.keys(this.filter).filter(function (key) {
        return key !== 'sender' && that.filter[key] !== null
      }) < 1
    ) {
      return
    }
    this.props.onFilter && this._callHandler(this.props.onFilter, this.filter)
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
    return Object.keys(this.checkedRowRefs)
      .map((key) => {
        return this.checkedRowRefs[key]
      })
      .filter((rowRef) => !isNullish(rowRef.key))
  }

  getCheckedRowKeys() {
    return Object.keys(this.checkedRowRefs)
      .map((key) => {
        return this.checkedRowRefs[key].key
      })
      .filter((key) => !isNullish(key))
  }

  // 遍历 rowTr 实例，调用其check方法
  checkAllRows(options) {
    const { rowsRefs } = this
    Object.keys(rowsRefs).forEach((key) => {
      const refItem = rowsRefs[key]
      if (refItem.props && !isNullish(refItem.props.data[this.props.keyField])) {
        refItem.check(options)
      }
    })
  }

  uncheckAllRows(options) {
    const { rowsRefs } = this
    Object.keys(rowsRefs).forEach((key) => {
      const refItem = rowsRefs[key]
      if (refItem.props && !isNullish(refItem.props.data[this.props.keyField])) {
        refItem.uncheck(options)
      }
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

    let treeInfo = null
    function findTreeInfo(origin, key) {
      origin.forEach(function (item) {
        if (item.children) {
          findTreeInfo(item.children, key)
        }
        if (item.field === key) {
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
            if (key !== 'children') {
              item[key] = myinfo[key]
            }
          })
        }
      })
    }

    addTreeInfo(tree)
    const { columnsCustomizable } = this.props
    const { cache: cacheKey } = columnsCustomizable
    if (cacheKey) {
      localStorage.setItem(
        `${STORAGE_KEY_GRID_COLUMNS}_${cacheKey}`,
        JSON.stringify(this.getMappedColumns(tree)),
      )
    }

    columnsCustomizable.callback && this._callHandler(columnsCustomizable.callback(tree))

    this.update({ visibleColumns: tree })
    this.popup.hide()
  }

  handleDrag() {
    if (this.props.rowSortable && this.props.rowSortable.onEnd) {
      this._callHandler(this.props.rowSortable.onEnd)
    }
  }

  getData() {
    const that = this
    const keys = this.getDataKeys()
    const data = keys.map(function (key) {
      return that.props.data.filter(function (item) {
        return parseInt(item[that.props.keyField], 10) === parseInt(key, 10)
      })
    })
    return data
  }

  getDataKeys() {
    const order = []
    const trs = this.body.table.element.rows
    for (let i = 0; i < trs.length; i++) {
      order.push(trs[i].dataset.key)
    }
    return order
  }

  appendRow(rowProps) {
    this.body.table.appendRow(rowProps)
  }

  _processCheckableColumn() {
    const grid = this
    const { rowCheckable, visibleColumns } = this.props
    let { columns } = this.props
    columns = visibleColumns && visibleColumns.length ? visibleColumns : columns
    if (rowCheckable) {
      if (columns.filter((item) => item.isChecker).length > 0) {
        return
      }
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { checkedRowKeys = [] } = normalizedRowCheckable
      const checkedRowKeysHash = {}
      checkedRowKeys.forEach((rowKey) => {
        checkedRowKeysHash[rowKey] = true
      })
      this.setProps({
        visibleColumns: [
          {
            width: 50,
            isChecker: true,
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
          },
          ...columns,
        ],
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

  _getColsFromSelectCols(originCols = [], selectCols = []) {
    return selectCols.reduce((acc, curr) => {
      const sameCol = originCols.find((originCol) => originCol.field === curr.field)

      if (sameCol) {
        acc.push({
          ...curr,
          children: this._getColsFromSelectCols(sameCol.children, curr.children),
        })
      }
      return acc
    }, [])
  }

  _getColsFromFields(columns = [], fields = []) {
    return columns.reduce((acc, curr) => {
      if (fields.includes(curr.field)) {
        acc.push({ ...curr, children: this._getColsFromFields(curr.children, fields) })
      }
      return acc
    }, [])
  }

  _processExpandableColumn() {
    const { rowExpandable, visibleColumns } = this.props
    let { columns } = this.props
    columns = visibleColumns && visibleColumns.length ? visibleColumns : columns
    if (rowExpandable) {
      if (columns.filter((item) => item.isTreeMark).length > 0) {
        return
      }
      this.setProps({
        visibleColumns: [
          {
            width: 50,
            isTreeMark: true,
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
          },
          ...columns,
        ],
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

  getRows() {
    return this.body.table.getRows()
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
  data: null,
  frozenHeader: false,
  frozenLeftCols: null,
  frozenRightCols: null,
  allowFrozenCols: false,
  onSort: null,
  onFilter: null,
  keyField: 'id',
  treeConfig: {
    childrenField: 'children',
    treeNodeColumn: null,
    initExpandLevel: -1,
    indentSize: 16,
  },
  columnsCustomizable: false,
  // columnsCustomizable.selected: 若存在，则展示selected 的列数据
  // columnsCustomizable.cache: 设置列的结果保存至localstorage，cache的值为对应的key
  // columnsCustomizable.callback: 设置列保存回调
  autoMergeColumns: null,
  visibleColumns: null,
  columnResizable: false,
  striped: false,
  showTitle: false,
  ellipsis: false,
  sticky: false,
  line: 'row',
  bordered: true,
}

Component.register(Grid)

export default Grid
