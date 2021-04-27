import Component from '../Component/index'
import Scrollbar from '../Scrollbar/index'
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
      if (!this.scrollbar) {
        this.scrollbar = new Scrollbar({
          target: this.grid,
        })
      }
      let position = null,
        size = null

      parent.setProps({
        attrs: {
          onscroll: () => {
            this.element.style.transform = `translateY(0px)`
            const pRect = parent.element.getBoundingClientRect()
            const gRect = this.grid.element.getBoundingClientRect()
            const innerWidth = this.element.scrollWidth
            if (!position) {
              position = {
                left: `${gRect.left}px`,
                top: `${pRect.top + pRect.height - 17}px`,
              }
              size = {
                width: `${gRect.width}px`,
                innerWidth: `${innerWidth}px`,
              }

              this.scrollbar.update({
                position: position,
                size: size,
              })
            }
            if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
              this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
            }
            if (gRect.height > pRect.height) {
              if (
                gRect.top > pRect.height ||
                gRect.top + gRect.height - 17 < pRect.height + pRect.top
              ) {
                this.scrollbar.hide()
              } else {
                this.scrollbar.show()
              }
            } else {
              this.scrollbar.hide()
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
