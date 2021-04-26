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
      const pt = 112

      parent.setProps({
        attrs: {
          onscroll: () => {
            this.element.style.transform = `translateY(0px)`
            const mt = this.element.getBoundingClientRect().top

            if (mt < pt) {
              this.element.style.transform = `translateY(${pt - mt}px)`
              console.log('pt', pt)
              console.log('mt', mt)
              console.log(pt - mt)
            }
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
