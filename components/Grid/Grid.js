import Component from '../Component/index'
import Loading from '../Loading/index'
import GridBody from './GridBody'
import GridHeader from './GridHeader'

class Grid extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Grid.defaults, props), ...mixins)
  }

  _created() {
    this.minWidth = 0
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
}

Component.register(Grid)

export default Grid
