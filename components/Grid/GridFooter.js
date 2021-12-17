import Component from '../Component/index'
import Table from '../Table/index'
import { isFunction } from '../util/index'

class GridFooter extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.footer = this
  }

  _config() {
    this.setProps({
      children: {
        columns: this._getSummaryColumns(),
        data: this._getSummaryData(),
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

  _getSummaryData() {
    const { data = [], summary, columns, rowCheckable, rowExpandable } = this.grid.props
    const { method, text = '总计' } = summary

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
    return [res]
  }

  calcResizeCol(data) {
    const col = this.table.colRefs[data.field]
    const tdWidth = this.table.element.rows[0].cells[col.props.index].offsetWidth
    const colWidth = col.props.column.width || tdWidth

    let result = colWidth + data.distance

    if (result < 60) {
      result = 60
    }
    col.update({ column: { width: result } })
  }

  resizeCol({ field, width = 0 }) {
    const col = this.table.colRefs[field]
    col.update({ column: { width } })
  }
}

Component.register(GridFooter)

export default GridFooter
