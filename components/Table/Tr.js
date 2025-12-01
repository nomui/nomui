import Component from '../Component/index'
import { accessProp, extend, isFunction, isNullish } from '../util/index'
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
    this.tdRefs = {}

    // keyField(id) 不为 undefined, null
    const dataHaskeyField = !isNullish(this.props.data[this.table.props.keyField])
    if (this.table.hasGrid && dataHaskeyField) {
      // 重复key报错
      const _rowRefKey = this.props.data[this.table.props.keyField]
      const _rowRef = this.table.grid.rowsRefs[_rowRefKey]
      if (_rowRef) {
        // eslint-disable-next-line no-console
        console.warn(`Duplicate keys detected: '${_rowRefKey}'.This may cause an update error.`)
      } else {
        this.table.grid.rowsRefs[_rowRefKey] = this
      }
    }

    if (this.table.parent.componentType === 'GridFooter') {
      this.table.grid.footerTrRef = this
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

    if (grid && grid.props.rowSortable && !grid.props.rowSortable.customHandler) {
      children.push({
        component: Td,

        classes: {
          'nom-grid-drag-handler': true,
        },
        isDragHandler: true,
        column: {
          fixed:
            grid && grid.props.frozenLeftCols && grid.props.frozenLeftCols > 1 ? 'left' : undefined,
        },
        data: {
          component: 'Icon',
          type: 'drag',
          attrs: {
            style: {
              cursor: 'pointer',
            },
          },
        },
      })
    }

    if (Array.isArray(columns)) {
      this.tdList = []
      children.push(...this.createTds(columns))
    }

    if (this.table.hasGrid && this.table.grid.props && this.table.grid.props.editMode) {
      this.setProps({
        editMode: true,
      })
    }

    this.setProps({
      key: data[this.table.props.keyField],
      attrs: {
        level: level,
        isLeaf: this.props.isLeaf ? 'true' : undefined,
      },
      hidden: hidden,
      children: children,
    })
  }

  _rendered() {
    setTimeout(() => {
      this.props && this._processModifiedStyle()
    }, 0)
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
    grid._checkboxAllRef && grid.changeCheckAllState()
    if (checkOptions.triggerChange) {
      this._onCheck()
      grid._onRowCheck(this)
    }
  }

  partCheck() {
    const grid = this.table.grid
    this._checkboxRef.partCheck(false)
    this.props.checked = false
    this.props.partChecked = true
    this.removeClass('s-checked')
    delete grid.checkedRowRefs[this.key]
    grid.partCheckedRowRefs[this.key] = this
  }

  _onCheck() {
    this._callHandler('onCheck')
  }

  _check() {
    this.props.checked = true
    this.props.partChecked = false
    this.addClass('s-checked')
    const grid = this.table.grid
    grid.checkedRowRefs[this.key] = this
    delete grid.partCheckedRowRefs[this.key]
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
    grid._checkboxAllRef && grid.changeCheckAllState()
    if (uncheckOptions.triggerChange) {
      this._onUncheck()
      grid._onRowUncheck(this)
    }
  }

  _uncheck() {
    this.props.checked = false
    this.props.partChecked = false
    this.removeClass('s-checked')
    const grid = this.table.grid
    delete grid.checkedRowRefs[this.key]
    delete grid.partCheckedRowRefs[this.key]
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
          data: column.flatData ? data[column.field] : accessProp(data, column.field),
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

  _processModifiedStyle() {
    const { data } = this.props
    const { grid } = this.table
    if (!grid) {
      return
    }

    if (
      grid.props &&
      grid.props.highlightModifiedRows &&
      grid.modifiedRowKeys.includes(data[grid.props.keyField])
    ) {
      this.element.classList.add('nom-grid-tr-modified')
    }
  }

  _updateRowData(cellData) {
    let dataChanged = false
    const { data } = this.props

    if (cellData) {
      dataChanged = true
      data[cellData.field] = cellData.data
    } else {
      for (const key in this.tdRefs) {
        const item = this.tdRefs[key]
        const { editor } = item
        if (editor && data[key] !== editor.getValue()) {
          dataChanged = true
          data[key] = editor.getValue()
        }
      }
    }

    if (dataChanged) {
      this.props.data = data
      const grid = this.table.grid
      if (grid.props.data.length) {
        for (let i = 0; i < grid.props.data.length; i++) {
          if (grid.props.data[i][grid.props.keyField] === data[grid.props.keyField]) {
            grid.props.data[i] = data
          }
        }
      }
      grid._processModifedRows(data[grid.props.keyField])
    }
  }

  validate() {
    let validated = true
    for (const key in this.tdRefs) {
      const item = this.tdRefs[key]
      const { editor } = item
      if (editor) {
        let result = null
        if (!editor.validate || !isFunction(editor.validate)) {
          result = true
        } else {
          result = editor.validate()
        }
        if (result !== true) {
          validated = result
        }
      }
    }

    return validated
  }

  edit() {
    this.update({
      editMode: true,
    })
  }

  endEdit(options) {
    if (!options) {
      options = { ignoreChange: false }
    }
    if (options.ignoreChange !== true) {
      this._updateRowData()
    }
    this.update({
      editMode: false,
    })
  }

  saveEditData() {
    this._updateRowData()
  }

  // 遍历childTrs 调用show 展示
  _show() {
    if (this.firstRender) {
      return
    }
    const { childTrs, classes } = this.props

    // 注: 当前 tr 状态为expanded: false 时，无需展开childTr
    if (Array.isArray(childTrs) && classes['s-expanded']) {
      childTrs.forEach((_childTr) => {
        _childTr.show && _childTr.show()
      })
    }
  }

  // 遍历 childTrs 调用hide
  _hide() {
    if (this.firstRender) {
      return
    }
    const { childTrs } = this.props
    if (Array.isArray(childTrs)) {
      childTrs.forEach((_childTr) => {
        _childTr.hide && _childTr.hide()
      })
    }
  }

  remove(options = {}) {
    if (options.removeExpandedRow) {
      this.expandedRow.remove()
    }
    super.remove()
  }

  _remove() {
    const dataHaskeyField = !isNullish(this.props.data[this.table.props.keyField])
    if (this.table.hasGrid && dataHaskeyField) {
      // 重复key报错
      const _rowRefKey = this.props.data[this.table.props.keyField]

      delete this.table.grid.rowsRefs[_rowRefKey]
      this.table.grid._processRemovedRows(this.props.data)
    }
  }
}

Component.register(Tr)

export default Tr
