import Component from '../Component/index'
import Table from '../Table/index'

class GridHeader extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.header = this
  }

  _config() {
    this.setProps({
      children: {
        columns: this.grid.props.columns,
        data: this.grid.data,
        attrs: {
          style: {
            minWidth: `${this.grid.minWidth}px`,
          },
        },
        onlyHead: true,
        line: this.props.line,
      },
    })
  }

  resizeCol(data) {
    const col = this.table.colRefs[data.field]
    const w = col.props.column.width
    let result = w + data.distance
    if (result < 60) {
      result = 60
    }
    console.log(result)
    col.update({ column: { width: result } })
  }
}

Component.register(GridHeader)

export default GridHeader
