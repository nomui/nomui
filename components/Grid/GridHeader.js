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

  _rendered() {
    if (this.grid.props.container) {
      const parent = this.grid.props.container
      parent.setProps({
        attrs: {
          onscroll: () => {
            this.element.style.transform = `translateY(0px)`
            const pRect = parent.element.getBoundingClientRect()
            const mRect = this.element.getBoundingClientRect()
            // const gRect = this.grid.element.getBoundingClientRect()
            if (mRect.top < pRect.top) {
              this.element.style.transform = `translateY(${pRect.top - mRect.top}px)`
            }
            // if (gRect.height > pRect.height) {
            // }
          },
        },
      })
    }
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

Component.register(GridHeader)

export default GridHeader
