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
    const { columns } = this.grid.props
    return columns.map((col) => {
      return {
        ...col,
        cellRender: col.cellRender ? null : col.cellRender,
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
    } else {
      list.push(this._getSummaryData(summary))
    }

    return list
  }

  _getSummaryData(param) {
    const { data = [], columns, rowCheckable, rowExpandable } = this.grid.props

    const { method, text = '总计' } = param

    let res = {}
    let textColumnIndex = 0
    rowCheckable && textColumnIndex++
    rowExpandable && textColumnIndex++

    if (method && isFunction(method)) {
      res = method({ columns, data })

      res[columns[textColumnIndex].field] = text
    } else {
      columns.forEach((col, index) => {
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
