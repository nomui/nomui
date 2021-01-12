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

    const { line } = this.props

    this._calcMinWidth()

    this.setProps({
      classes: {
        'm-frozen-header': this.props.frozenHeader,
      },
      children: [
        { component: GridHeader, line: line },
        { component: GridBody, line: line },
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
}

Grid.defaults = {
  columns: [],
  data: [],
  frozenHeader: false,
}

Component.register(Grid)

export default Grid
