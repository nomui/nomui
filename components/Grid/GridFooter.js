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
      attrs: {
        onscroll: () => {
          const { scrollLeft } = this.element

          this.grid.header.element.scrollLeft = scrollLeft
          this.grid.header.scrollbar && this.grid.header.scrollbar.setScrollLeft(scrollLeft)
        },
      },
    })
  }

  _getSummaryColumns() {
    const { columns, rowCheckable } = this.grid.props
    if (rowCheckable) {
      columns[0].cellRender = () => {}
    }
    return columns
  }

  _getSummaryData() {
    const { data, summary, columns, rowCheckable } = this.grid.props
    const { method, text = '总计' } = summary
    // let { columns } = this.grid.props

    let res = {}
    // rowCheckable: false, 处理第一列的文字
    // rowCheckable: true, 处理第二列的文字
    if (method && isFunction(method)) {
      res = method({ columns, data })

      res[columns[rowCheckable ? 1 : 0].field] = text
    } else {
      columns.forEach((col, index) => {
        if ((index === 0 && !rowCheckable) || (rowCheckable && index === 1)) {
          res[col.field] = text
          return
        }

        const values = data.map((item) => Number(item[col.field]))
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

  resizeCol(data) {
    const col = this.table.colRefs[data.field]
    const tdWidth = this.table.element.rows[0].cells[col.props.index].offsetWidth
    const colWidth = col.props.column.width || tdWidth

    let result = colWidth + data.distance

    if (result < 60) {
      result = 60
    }
    col.update({ column: { width: result } })
  }
}

Component.register(GridFooter)

export default GridFooter
