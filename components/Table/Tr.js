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

    if (this.table.hasGrid && this.props.data[this.table.props.keyField]) {
      this.table.grid.rowsRefs[this.props.data[this.table.props.keyField]] = this
    }
  }

  _config() {
    const columns = this.table.props.columns
    const { data, level } = this.props

    const grid = this.table.grid

    const children = []
    let hidden = false
    if (grid) {
      const { treeConfig } = grid.props
      hidden = treeConfig.initExpandLevel !== -1 && treeConfig.initExpandLevel < level
    }

    if (Array.isArray(columns)) {
      this.TdList = []
      children.push(...this.createTds(columns))
    }

    this.setProps({
      key: data[this.table.props.keyField],
      attrs: {
        level: level,
      },
      hidden: hidden,
      children: children,
    })
  }

  check(triggerChange) {
    const grid = this.table.grid
    this._checkboxRef.setValue(true, triggerChange)
    grid.checkedRowsRefs[this.key] = this
  }

  uncheck(triggerChange) {
    const grid = this.table.grid
    this._checkboxRef.setValue(false, triggerChange)
    delete grid.checkedRowsRefs[[this.key]]
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

  _onExpand() {
    this.setProps({
      classes: {
        's-expanded': true,
      },
    })
    this.addClass('s-expanded')
    this._expanded = true
  }

  _onCollapse() {
    this.setProps({
      classes: {
        's-expanded': false,
      },
    })
    this.removeClass('s-expanded')
    this._expanded = false
  }

  _show() {
    if (this.firstRender) {
      return
    }
    const { data: rowData } = this.props

    if (Array.isArray(rowData.children)) {
      rowData.children.forEach((subrowData) => {
        if (this._expanded) {
          const row = this.table.grid.getRow(subrowData)
          row && row.show && row.show()
        }
      })
    }
  }

  _hide() {
    if (this.firstRender) {
      return
    }
    const { data: rowData } = this.props

    if (Array.isArray(rowData.children)) {
      rowData.children.forEach((subrowData) => {
        const row = this.table.grid.getRow(subrowData)
        row && row.hide && row.hide()
      })
    }
  }
}

Component.register(Tr)

export default Tr
