import Component from '../Component/index'
import Table from '../Table/index'
import { isFunction } from '../util/index'
import GridTableMixin from './GridTableMixin'

class GridFooter extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), GridTableMixin, ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.footer = this
  }

  _config() {
    this.setProps({
      children: {
        columns: this._getSummaryColumns(),
        data: this._getSummaryDataList(),
        attrs: {
          style: {
            minWidth: `${this.grid.minWidth}px`,
          },
        },
        onlyBody: true,
        line: this.props.line,
        rowDefaults: this.props.rowDefaults,
        treeConfig: this.grid.props.treeConfig,
        keyField: this.grid.props.keyField,
      },
    })
  }

  _getSummaryColumns() {
    const { summary } = this.grid.props
    const columns =
      this.grid.props.summary && this.grid.props.summary.columns
        ? this.grid.props.summary.columns
        : this.grid.props.columns

    const footColumns = [...columns]

    if (
      this.grid.props.rowCheckable &&
      footColumns.length &&
      footColumns.findIndex((n) => {
        return n.isCheckerSpace
      }) === -1
    ) {
      footColumns.splice(0, 1, {
        width: 50,
        resizable: false,
        isCheckerSpace: true,
      })
    }

    const ignoreCellRender = !!(summary && summary.ignoreCellRender)

    return footColumns.map((col) => {
      return {
        ...col,
        cellRender: col.cellRender && !ignoreCellRender ? col.cellRender : null,
      }
    })
  }

  _getSummaryDataList() {
    const { summary } = this.grid.props
    let list = []

    if (Array.isArray(summary)) {
      list = summary.map((i) => {
        return this._getSummaryData(i)
      })
    } else if (summary.rows) {
      list = summary.rows.map((i) => {
        return this._getSummaryData(i)
      })
    } else {
      list.push(this._getSummaryData(summary))
    }

    return list
  }

  _getMappedColumns(columns) {
    const arr = []
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.children) {
          mapColumns(item.children)
        }
        arr.push(item)
      })
    }
    mapColumns(columns)

    return arr
  }

  _getSummaryData(param) {
    const { data = [], rowCheckable, rowExpandable } = this.grid.props
    const columns =
      this.grid.props.summary && this.grid.props.summary.columns
        ? this.grid.props.summary.columns
        : this.grid.props.columns

    const { method, text = '总计' } = param

    const flatColumns = this._getMappedColumns(columns)

    let res = {}
    let textColumnIndex = 0
    rowCheckable && textColumnIndex++
    rowExpandable && textColumnIndex++

    if (method && isFunction(method)) {
      res = method({ columns: flatColumns, data, text: text })

      res[flatColumns[textColumnIndex].field] = text
    } else {
      flatColumns.forEach((col, index) => {
        if (index === textColumnIndex) {
          res[col.field] = text
          return
        }

        const values = (data || []).map((item) => Number(item[col.field]))
        let sum = 0

        for (let i = 0; i < values.length; i++) {
          if (Number.isNaN(values[i])) {
            res[col.field] = '-'
            return
          }
          sum += values[i]
        }
        res[col.field] = sum
      })
    }
    return res
  }
}

Component.register(GridFooter)

export default GridFooter
