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
    this.hasContent = true
  }

  _config() {
    const { rowExpandable, columns } = this.table.grid.props

    const { parentRow } = this.props

    if (rowExpandable) {
      let normalizedRowExpandable = rowExpandable
      if (!isPlainObject(rowExpandable)) {
        normalizedRowExpandable = {}
      }

      const { render = () => {} } = normalizedRowExpandable

      const content = render({ parentRow, row: this, rowData: this.props.data, grid: this.grid })

      if (!content) {
        this.hasContent = false
        return
      }
      // 有内容才显示展开图标
      setTimeout(() => {
        parentRow.expandIndicotorIconRef.show()
        parentRow.expandIndicotorIconRef.update({
          expanded: !this.props.hidden,
        })
      }, 0)
      let colspan = columns.length
      if (this.grid && this.grid.props.rowSortable && !this.grid.props.rowSortable.customHandler) {
        colspan += 1
      }
      this.setProps({
        hidden: !normalizedRowExpandable.expanded,
        children: {
          component: ExpandedTrTd,
          attrs: {
            colspan: colspan,
          },
          classes: {
            'nom-table-expanded-tr-td-compact': normalizedRowExpandable.compact,
          },
          children: {
            ...content,
            onCreated: ({ inst }) => {
              this.subContent = inst
            },
          },
        },
      })
    }
  }
}

Component.register(ExpandedTr)

export default ExpandedTr
