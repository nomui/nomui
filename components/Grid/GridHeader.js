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
    const that = this
    if (!this.grid.props.sticky) {
      return
    }
    if (!this.scrollbar) {
      this.scrollbar = new Scrollbar({
        target: this.grid,
      })
    }
    this.position = null
    this.size = null

    if (this.grid.props.sticky === true) {
      this.scrollParent = window
      this.scrollParent.onscroll = function () {
        that._onWindowScroll()
      }
    } else {
      this.scrollParent = this.grid.props.sticky
      this.scrollParent._on('scroll', function () {
        that._onPageScroll()
      })
    }
  }

  _onWindowScroll() {
    const gRect = this.grid.element.getBoundingClientRect()
    const innerWidth = this.element.scrollWidth

    if (!this.position) {
      this.position = {
        left: `${gRect.left}px`,
        top: `${window.innerHeight - 17}px`,
      }
      this.size = {
        width: `${gRect.width}px`,
        innerWidth: `${innerWidth}px`,
      }

      this.scrollbar.update({
        position: this.position,
        size: this.size,
      })
    }
    if (gRect.top < 0 && gRect.top + gRect.height > 0) {
      this.element.style.transform = `translateY(${0 - gRect.top - 2}px)`
    }
    if (gRect.height > window.innerHeight) {
      if (gRect.top > window.innerHeight || gRect.top + gRect.height - 17 < window.innerHeight) {
        this.scrollbar.hide()
      } else {
        this.scrollbar.show()
      }
    } else {
      this.scrollbar.hide()
    }
  }

  _onPageScroll() {
    this.element.style.transform = `translateY(0px)`
    const pRect = this.scrollParent.element.getBoundingClientRect()
    const gRect = this.grid.element.getBoundingClientRect()
    const innerWidth = this.element.scrollWidth
    if (!this.position) {
      this.position = {
        left: `${gRect.left}px`,
        top: `${pRect.top + pRect.height - 17}px`,
      }
      this.size = {
        width: `${gRect.width}px`,
        innerWidth: `${innerWidth}px`,
      }

      this.scrollbar.update({
        position: this.position,
        size: this.size,
      })
    }
    if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
      this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
    }
    if (gRect.height > pRect.height) {
      if (gRect.top > pRect.height || gRect.top + gRect.height - 17 < pRect.height + pRect.top) {
        this.scrollbar.hide()
      } else {
        this.scrollbar.show()
      }
    } else {
      this.scrollbar.hide()
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
