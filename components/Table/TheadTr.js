import Component from '../Component/index'
import Th from './Th'

class TheadTr extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tr',
      columns: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.thead = this.parent
    this.table = this.thead.table
  }

  _config() {
    const { columns } = this.props
    const thArr = []

    if (
      this.table.grid &&
      this.table.grid.props.rowSortable &&
      !this.table.grid.props.rowSortable.customHandler
    ) {
      thArr.push({
        component: Th,
      })
    }

    const children =
      Array.isArray(columns) &&
      columns.map(function (column) {
        return {
          component: Th,
          column: column,
        }
      })

    thArr.push(...children)

    this.setProps({
      children: thArr,
    })
  }
}

Component.register(TheadTr)

export default TheadTr
