import Component from '../Component/index'
import Table from '../Table/index'

class GridBody extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.body = this
  }

  _config() {
    this.setProps({
      children: {
        columns: this.grid.props.columns,
        data: this.grid.props.data,
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
        },
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
    col.update({ column: { width: result } })
  }
}

Component.register(GridBody)

export default GridBody
