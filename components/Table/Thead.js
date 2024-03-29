import Component from '../Component/index'
import TheadTr from './TheadTr'

class Thead extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'thead',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.table = this.parent
  }

  _config() {
    const columns = this.getColumns()

    const arr = this.mapHeadData(columns)

    this.table.hasMultipleThead = arr.length > 1

    const children = []
    for (let i = 0; i < arr.length; i++) {
      children.push({ component: TheadTr, columns: arr[i], isRootTr: i === 0 })
    }

    this.setProps({
      children: children,
    })
  }

  getColumns() {
    return this.table.props.columns
  }

  mapHeadData(rootColumns) {
    const rows = []

    function fillRowCells(columns, colIndex, rowIndex) {
      // Init rows
      rows[rowIndex] = rows[rowIndex] || []

      let currentColIndex = colIndex
      const colSpans = columns.filter(Boolean).map((column) => {
        const cell = { ...column }

        let colSpan = 1

        const subColumns = column.children
        if (subColumns && subColumns.length > 0) {
          colSpan = fillRowCells(subColumns, currentColIndex, rowIndex + 1).reduce(
            (total, count) => total + count,
            0,
          )
          cell.hasSubColumns = true
        }

        // if ('colSpan' in column) {
        //   ;({ colSpan } = column)
        // }

        if ('rowSpan' in column) {
          cell.rowSpan = column.rowSpan
        }

        cell.colSpan = colSpan
        // cell.colEnd = cell.colStart + colSpan - 1
        rows[rowIndex].push(cell)

        currentColIndex += colSpan

        return colSpan
      })

      return colSpans
    }

    // Generate `rows` cell data
    fillRowCells(rootColumns, 0, 0)

    // Handle `rowSpan`
    const rowCount = rows.length

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
      rows[rowIndex].forEach((cell) => {
        if (!('rowSpan' in cell) && !cell.hasSubColumns) {
          cell.rowSpan = rowCount - rowIndex
        }
      })
    }

    return rows
  }
}

Component.register(Thead)

export default Thead
