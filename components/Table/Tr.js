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
    this.tdList = []
  }

  _config() {
    const columns = this.table.props.columns
    const data = this.props.data

    let children = []

    if (Array.isArray(columns)) {
      this.TdList = []
      children = this.createTds(columns)
    }

    this.setProps({
      key: data[this.table.props.keyField],
      children: children,
    })
  }

  createTds(item) {
    const data = this.props.data
    const that = this
    item.forEach(function (column) {
      if (column.children && column.children.length > 0) {
        that.createTds(column.children)
      } else {
        that.tdList.push({
          component: Td,
          name: column.field,
          column: column,
          record: data,
          data: accessProp(data, column.field),
        })
      }
    })

    return that.tdList
  }
}

Component.register(Tr)

export default Tr
