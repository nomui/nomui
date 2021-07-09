import Component from '../Component/index'
import { accessProp, clone, extend } from '../util/index'
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

    if (this.table.hasGrid && this.props.data[this.table.props.keyField]) {
      this.table.grid.rowsRefs[this.props.data[this.table.props.keyField]] = this
    }
  }

  _config() {
    const columns = this.table.props.columns
    const { data, level } = this.props
    this.tdList = []
    const grid = this.table.grid

    const children = []
    let hidden = false
    if (grid) {
      const { treeConfig } = grid.props
      hidden = treeConfig.initExpandLevel !== -1 && treeConfig.initExpandLevel < level
    }

    if (grid && grid.props.rowSortable) {
      children.push({
        component: Td,
        classes: {
          'nom-grid-drag-handler': true,
        },
        data: {
          component: 'Icon',
          type: 'swap',
          attrs: {
            style: {
              cursor: 'pointer',
            },
          },
        },
      })
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

  check(checkOptions) {
    const grid = this.table.grid

    checkOptions = extend(
      {
        triggerChange: true,
      },
      checkOptions,
    )
    this._check()
    this._checkboxRef.setValue(true, false)
    grid.changeCheckAllState()
    if (checkOptions.triggerChange) {
      this._onCheck()
      grid._onRowCheck(this)
    }
  }

  _onCheck() {
    this._callHandler('onCheck')
  }

  _check() {
    this.props.checked = true
    this.addClass('s-checked')
    const grid = this.table.grid
    grid.checkedRowRefs[this.key] = clone(this.props.data)
  }

  uncheck(uncheckOptions) {
    const grid = this.table.grid
    uncheckOptions = extend(
      {
        triggerChange: true,
      },
      uncheckOptions,
    )
    this._checkboxRef.setValue(false, false)
    this._uncheck()
    grid.changeCheckAllState()
    if (uncheckOptions.triggerChange) {
      this._onUncheck()
      grid._onRowUncheck(this)
    }
  }

  _uncheck() {
    this.props.checked = false
    this.removeClass('s-checked')
    const grid = this.table.grid
    delete grid.checkedRowRefs[this.key]
  }

  _onUncheck() {
    this._callHandler('onUncheck')
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
