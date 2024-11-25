import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import ExpandedTrTd from './ExpandedTrTd'

class ExpandedTr extends Component {
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
    this.grid = this.table.grid
  }

  _config() {
    const { rowExpandable, columns } = this.table.grid.props

    if (rowExpandable) {
      let normalizedRowExpandable = rowExpandable
      if (!isPlainObject(rowExpandable)) {
        normalizedRowExpandable = {}
      }

      const { render = () => { } } = normalizedRowExpandable

      const content = render({ row: this, rowData: this.props.data, grid: this.grid })

      if (!content) {
        return
      }
      this.setProps({
        children: {
          component: ExpandedTrTd,
          attrs: {
            colspan: columns.length,
          },
          children: content,
        },
      })
    }
  }
}

Component.register(ExpandedTr)

export default ExpandedTr
