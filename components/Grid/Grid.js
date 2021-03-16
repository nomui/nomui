import Component from '../Component/index'
import Loading from '../Loading/index'
import { isFunction } from '../util/index'
import GridBody from './GridBody'
import GridHeader from './GridHeader'

class Grid extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Grid.defaults, props), ...mixins)
  }

  _created() {
    this.minWidth = 0
    this.lastSortField = null
  }

  _config() {
    this._propStyleClasses = ['bordered']

    const { line, rowDefaults, frozenLeftCols, frozenRightCols } = this.props

    if (frozenLeftCols || frozenRightCols) {
      const rev = this.props.columns.length - frozenRightCols

      const c = this.props.columns.map(function (n, i) {
        if (i + 1 < frozenLeftCols) {
          return {
            ...{
              fixed: 'left',
            },
            ...n,
          }
        }

        if (i + 1 === frozenLeftCols) {
          return {
            ...{
              fixed: 'left',
              lastLeft: true,
            },
            ...n,
          }
        }

        if (i === rev) {
          return {
            ...{
              fixed: 'right',
              firstRight: true,
            },
            ...n,
          }
        }

        if (i > rev) {
          return {
            ...{
              fixed: 'right',
            },
            ...n,
          }
        }

        return n
      })

      this.props.columns = c
    }

    this._calcMinWidth()

    this.setProps({
      classes: {
        'm-frozen-header': this.props.frozenHeader,
      },
      children: [
        { component: GridHeader, line: line },
        { component: GridBody, line: line, rowDefaults: rowDefaults },
      ],
    })
  }

  _calcMinWidth() {
    this.minWidth = 0
    const { props } = this
    for (let i = 0; i < props.columns.length; i++) {
      const column = props.columns[i]
      if (column.width) {
        this.minWidth += column.width
      } else {
        this.minWidth += 120
      }
    }
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  setSortDirection(sorter) {
    const c = this.props.columns.map(function (item) {
      if (item.field === sorter.field) {
        return {
          ...item,
          ...{
            sortDirection: sorter.sortDirection,
          },
        }
      }
      return {
        ...item,
        ...{
          sortDirection: null,
        },
      }
    })

    this.update({ columns: c })
  }

  handleSort(sorter) {
    const key = sorter.field
    if (!sorter.sortDirection) return

    if (isFunction(sorter.sortable)) {
      let arr = []
      if (this.lastSortField === key) {
        arr = this.props.data.reverse()
      } else {
        arr = this.props.data.sort(sorter.sortable)
      }
      this.setSortDirection(sorter)
      this.update({ data: arr })
      this.lastSortField = key
      return
    }

    this._callHandler(this.props.onSort, {
      field: sorter.field,
      sortDirection: sorter.sortDirection,
    })

    this.setSortDirection(sorter)
    this.lastSortField = key
  }

  // handlePinClick(data) {
  //   const { columns } = this.props

  //   const arr = columns.filter(function (item) {
  //     return item.field === data.field
  //   })
  // }
}

Grid.defaults = {
  columns: [],
  data: [],
  frozenHeader: false,
  frozenLeftCols: null,
  frozenRightCols: null,
  allowFrozenCols: false,
  onSort: null,
}

Component.register(Grid)

export default Grid
