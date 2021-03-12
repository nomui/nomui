import Component from '../Component/index'
import Th from './Th'

class TheadTr extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tr',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.thead = this.parent
    this.table = this.thead.table
    this.theadList = []
  }

  _config() {
    const { columns } = this.table.props

    const children =
      Array.isArray(columns) &&
      columns.map(function (column) {
        return {
          component: Th,
          column: column,
        }
      })

    this.setProps({
      children: children,
    })
  }

  createTheads(data) {
    const that = this
    data.forEach(function (column) {
      if (column.children && column.children.length > 0) {
        that.createCols(column.children)
      } else {
        that.theadList.push({
          component: Th,
          column: column,
        })
      }
    })

    return that.theadList
  }
}

Component.register(TheadTr)

export default TheadTr
