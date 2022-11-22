import Component from '../Component/index'
import { accessProp, extend, isNullish } from '../util/index'
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
      this.tdList = []
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
    grid.checkedRowRefs[this.key] = this
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

  _remove() {
    const dataHaskeyField = !isNullish(this.props.data[this.table.props.keyField])
    if (this.table.hasGrid && dataHaskeyField) {
      // 重复key报错
      const _rowRefKey = this.props.data[this.table.props.keyField]

      delete this.table.grid.rowsRefs[_rowRefKey]
    }
  }
}

Component.register(Tr)

export default Tr
