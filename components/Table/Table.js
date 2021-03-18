import Component from '../Component/index'
import Loading from '../Loading/index'
import { isFunction, isPlainObject } from '../util/index'
import ColGroup from './ColGroup'
import Tbody from './Tbody'
import Thead from './Thead'

class Table extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'table',
      columns: [],
      rowDefaults: {},
      onlyHead: false,
      onlyBody: false,
      keyField: 'id',
      treeConfig: {
        childrenField: 'children',
        treeNodeColumn: null,
        initExpandLevel: -1,
        indentSize: 6,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.hasGrid = this.parent.parent.componentType === 'Grid'

    if (this.hasGrid) {
      this.grid = this.parent.parent
    }

    this.rowsRefs = {}
    this.checkedRowsRefs = {}
  }

  _config() {
    this._propStyleClasses = ['line', 'bordered']
    this.setProps({
      tag: 'table',
      children: [
        { component: ColGroup },
        this.props.onlyBody !== true && { component: Thead },
        this.props.onlyHead !== true && { component: Tbody },
      ],
    })
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }
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

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
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
}

Component.register(Table)

export default Table
