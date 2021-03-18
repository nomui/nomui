import Component from '../Component/index'
import Loading from '../Loading/index'
import { isFunction, isPlainObject } from '../util/index'
import GridBody from './GridBody'
import GridHeader from './GridHeader'

class Grid extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Grid.defaults, props), ...mixins)
  }

  _created() {
    this.minWidth = 0
    this.lastSortField = null
    this.rowsRefs = {}
    this.checkedRowsRefs = {}
  }

  _config() {
    this._propStyleClasses = ['bordered']

    const { line, rowDefaults, frozenLeftCols, frozenRightCols } = this.props

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
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  setSortDirection(sorter) {
    const c = this.props.columns.map(function (item) {
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
    return Object.keys(this.checkedRowsRefs).map((key) => {
      return this.checkedRowsRefs[key]
    })
  }

  getCheckedRowsKeys() {
    return Object.keys(this.checkedRowsRefs).map((key) => {
      return this.checkedRowsRefs[key].key
    })
  }

  checkAllRows(triggerChange) {
    Object.keys(this.rowsRefs).forEach((key) => {
      this.rowsRefs[key] && this.rowsRefs[key].check(triggerChange)
    })
  }

  uncheckAllRows(triggerChange) {
    Object.keys(this.rowsRefs).forEach((key) => {
      this.rowsRefs[key] && this.rowsRefs[key].uncheck(triggerChange)
    })
  }

  checkRows(rows) {
    rows = Array.isArray(rows) ? rows : [rows]
    rows.forEach((row) => {
      const rowRef = this.getRow(row)
      rowRef && rowRef.check()
    })
  }

  changeCheckAllState() {
    const checkedRowsLength = Object.keys(this.checkedRowsRefs).length
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
    indentSize: 6,
  },
}

Component.register(Grid)

export default Grid
