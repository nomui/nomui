import Component from '../Component/index'
import ColGroupCol from './ColGroupCol'

class ColGroup extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'colgroup',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.table = this.parent
    this.table.colGroup = this
    this.columns = this.table.props.columns
    this.colList = []
    this.hasColumnGroup = false
  }

  _config() {
    const children = []

    if (this.table.grid && this.table.grid.props.rowSortable) {
      children.push({
        component: ColGroupCol,
        column: {
          width: 30,
        },
      })
    }

    if (Array.isArray(this.columns)) {
      this.colList = []
      children.push(...this.createCols(this.columns))
    }

    this.table.colLength = children.length

    if (this.table.grid && this.table.parent.componentType !== 'GridBody') {
      children.push({
        component: ColGroupCol,
        classes: { 'nomui-grid-scrollbar-col': true },
        column: {
          width: this.table.grid.props.scrollbarWidth,
        },
      })
    }

    this.setProps({
      children: children,
    })
  }

  createCols(data) {
    const that = this
    let index = -1
    data.forEach(function (column) {
      if (column.children && column.children.length > 0) {
        that.createCols(column.children)
      } else {
        index += 1
        that.colList.push({
          component: ColGroupCol,
          name: column.field,
          column: column,
          index: index,
        })
      }
    })

    return that.colList
  }
}

Component.register(ColGroup)

export default ColGroup
