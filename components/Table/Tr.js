import Component from '../Component/index'
import { accessProp } from '../util/index'
import Td from './Td'

class Tr extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'tr',
      data: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tbody = this.parent
    this.table = this.tbody.table
  }

  _config() {
    const columns = this.table.props.columns
    const data = this.props.data

    const children =
      Array.isArray(columns) &&
      columns.map(function (column) {
        return {
          component: Td,
          name: column.field,
          column: column,
          record: data,
          data: accessProp(data, column.field),
        }
      })

    this.setProps({
      key: data[this.table.props.keyField],
      children: children,
    })
  }
}

Component.register(Tr)

export default Tr
