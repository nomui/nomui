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
    this.columns = this.table.props.columns
    this.colList = []
  }

  _config() {
    let children = []

    if (Array.isArray(this.columns)) {
      this.colList = []
      children = this.createCols(this.columns)
    }

    if (
      this.table.parent.componentType === 'GridHeader' &&
      this.table.parent.parent.props.frozenHeader
    ) {
      children.push({
        component: ColGroupCol,
        column: {
          width: 17,
        },
      })
    }

    this.setProps({
      children: children,
    })
  }

  createCols(data) {
    const that = this
    data.forEach(function (column) {
      if (column.children && column.children.length > 0) {
        that.createCols(column.children)
      } else {
        that.colList.push({
          component: ColGroupCol,
          name: column.field,
          column: column,
        })
      }
    })

    return that.colList
  }
}

Component.register(ColGroup)

export default ColGroup
