import Component from '../Component/index'
import Th from './Th'

class TheadTr extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tr',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.thead = this.parent
    this.table = this.thead.table
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
}

Component.register(TheadTr)

export default TheadTr
