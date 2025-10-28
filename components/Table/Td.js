import Component from '../Component/index'
import {
  clone,
  deepEqual,
  getStyle,
  isFunction,
  isNumeric,
  isPlainObject,
  isString,
} from '../util/index'

class Td extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'td',
      data: null,
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tr = this.parent
    this.table = this.tr.table
    this.col = this.table.colRefs[this.props.column.field]
    this.col.tdRefs[this.key] = this
    this.tr.tdRefs[this.props.column.field] = this
  }

  _config() {
    this.props.children = ''
    const { level, isLeaf } = this.tr.props
    const { column } = this.props
    const { treeConfig } = this.table.props

    const { parentField } = treeConfig
    const { grid } = this.table

    const { editable, excelMode } = grid?.props || {}
    if (excelMode && excelMode.alwaysEdit) {
      this.props.editMode = true
    }

    let cellDisabled = false

    if (
      editable &&
      editable.isCellEditable &&
      editable.isCellEditable({
        rowData: this.tr.props.data,
        field: this.props.column.field,
      }) === false
    ) {
      cellDisabled = true
    }

    if (
      excelMode &&
      excelMode.isCellEditable &&
      excelMode.isCellEditable({
        rowData: this.tr.props.data,
        field: this.props.column.field,
      }) === false
    ) {
      cellDisabled = true
    }

    // 处理树结构关联关系

    if (grid) {
      const { keyField } = grid.props

      grid.nodeList[`__key${this.tr.props.data[keyField]}`] = this.tr
      this.tr.childrenNodes = {}

      if (this.tr.props.parentKey || this.tr.props.data[parentField]) {
        const key = this.tr.props.parentKey || this.tr.props.data[parentField]
        this.tr.parentNode = grid.nodeList[`__key${key}`]
      }

      if (this.tr.parentNode) {
        if (this.tr.props.data[keyField]) {
          this.tr.parentNode.childrenNodes[`__key${this.tr.props.data[keyField]}`] = this.tr
        }
      }
    }

    let spanProps = null

    let children = this.props.data

    const isEllipsis =
      ((this.table.props.ellipsis === 'both' || this.table.props.ellipsis === 'body') &&
        this.props.column.ellipsis !== false &&
        this.props.column.field !== 'nom-grid-row-checker') ||
      this.props.column.ellipsis === true

    if (column.type === 'checker') {
      children = this._renderCombinedChecker({
        row: this.tr,
        rowData: this.tr.props.data,
        index: this.tr.props.index,
      })
    }

    if (column.type === 'order') {
      children = this._renderRowOrder({ index: this.tr.props.index })
    }

    if (column.type === 'checker&order') {
      children = this._renderCombinedChecker({
        row: this.tr,
        rowData: this.tr.props.data,
        index: this.tr.props.index,
        renderOrder: true,
      })
    }

    if (
      column.isChecker &&
      column.field === 'nom-grid-row-checker' &&
      this.table.hasGrid &&
      this.table.grid.props.rowCheckable &&
      !this.table.grid.props.rowCheckable.checkboxOnNodeColumn
    ) {
      children = this._renderRowChecker({
        row: this.tr,
        rowData: this.tr.props.data,
        index: this.tr.props.index,
      })
    }

    if ((this.tr.props.editMode || this.props.editMode) && !cellDisabled && column.editRender) {
      const propsMinxin = {
        ref: (c) => {
          this.editor = c
        },
        invalidTip: {
          align: 'bottom',
          reference: document.body,
          ignoreMouseEvent: true,
        },
        compact: true,
        minPopupWidth: this.table.hasGrid && this.table.grid.props.minPopupWidth,
      }
      if (this.table.hasGrid) {
        if ((grid.props.excelMode && !grid.props.excelMode.alwaysEdit) || grid.props.editable)
          propsMinxin.variant = 'borderless'
        if (column.immediateChange) {
          propsMinxin.onValueChange = () => {
            this.endEdit()
            grid.lastEditTd = null
          }
        }
      }

      children = {
        ...column.editRender({
          cell: this,
          row: this.tr,
          talbe: this.table,
          cellData: this.props.data,
          rowData: this.tr.props.data,
          index: this.tr.props.index,
        }),
        ...propsMinxin,
      }
    } else if (isFunction(column.cellRender)) {
      children = column.cellRender({
        cell: this,
        row: this.tr,
        talbe: this.table,
        cellData: this.props.data,
        rowData: this.tr.props.data,
        index: this.tr.props.index,
      })
    } else if (isFunction(this.props.column.render)) {
      children = this.props.column.render.call(
        this,
        this.props.data,
        this.props.record,
        this.tr.props.index,
      )
    }

    // if (isEllipsis && !this.props.column.autoWidth) {
    //   children = {
    //     component: 'Ellipsis',
    //     // fitContent: true,
    //     text: children
    //   }
    // }

    if (isFunction(column.cellMerge)) {
      spanProps = column.cellMerge({
        cell: this,
        row: this.tr,
        talbe: this.table,
        cellData: this.props.data,
        rowData: this.tr.props.data,
        index: this.tr.props.index,
      })
    }

    const isTreeNodeColumn = treeConfig.treeNodeColumn && column.field === treeConfig.treeNodeColumn

    if (isTreeNodeColumn) {
      this.setProps({
        expanded: treeConfig.initExpandLevel === -1 || treeConfig.initExpandLevel > level,
        expandable: {
          byClick: true,
          target: () => {
            return this.tr.props.childTrs
          },
          byIndicator: treeConfig.byIndicator,
          indicator: {
            component: 'Icon',
            classes: { 'nom-tr-expand-indicator': true },
            expandable: {
              expandedProps: {
                type: 'sort-down',
              },
              collapsedProps: {
                type: 'sort-right',
              },
            },
          },
        },
      })

      if (isPlainObject(treeConfig.indicator)) {
        this.setProps({
          expandable: {
            indicator: treeConfig.indicator,
          },
        })
      }

      if (isLeaf) {
        this.setProps({
          expandable: {
            indicator: {
              attrs: {
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        })
      }

      children = {
        classes: {
          'nom-grid-td-cell-tree': true,
        },
        children: [
          {
            tag: 'span',
            attrs: {
              style: {
                paddingLeft: `${level * treeConfig.indentSize}px`,
              },
            },
          },
          this.getExpandableIndicatorProps(),
          this.table.hasGrid &&
            this.table.grid.props.rowCheckable &&
            this.table.grid.props.rowCheckable.checkboxOnNodeColumn &&
            this._renderCombinedChecker({
              row: this.tr,
              rowData: this.tr.props.data,
              index: this.tr.props.index,
            }),
          { tag: 'span', classes: { 'nom-tree-grid-td': true }, children: children },
        ],
      }
    }

    if (column.toolbar) {
      if (column.toolbar.align === 'left') {
        children = {
          classes: {
            'nom-grid-column-with-tools': true,
          },
          align: 'center',
          component: 'Flex',
          cols: [
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.toolbar.hover,
                'nom-grid-column-tools-hide': !(
                  this.props.column.toolbar.placement === 'body' ||
                  this.props.column.toolbar.placement === 'both'
                ),
              },
              children: {
                forceVisible: true,
                ...this.props.column.toolbar.render({
                  cell: this,
                  row: this.tr,
                  cellData: this.props.data,
                  rowData: this.tr.props.data,
                  index: this.tr.props.index,
                }),
              },
            },
            {
              children: children,
            },
          ],
        }
      } else if (column.toolbar.align === 'right') {
        children = {
          align: 'center',
          component: 'Flex',

          cols: [
            {
              classes: {
                'nom-grid-td-cell-ellipsis': true,
              },
              grow: true,
              children: children,
            },
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.toolbar.hover,
                'nom-grid-column-tools-hide': !(
                  this.props.column.toolbar.placement === 'body' ||
                  this.props.column.toolbar.placement === 'both'
                ),
              },
              children: {
                forceVisible: true,
                ...this.props.column.toolbar.render({
                  cell: this,
                  row: this.tr,
                  cellData: this.props.data,
                  rowData: this.tr.props.data,
                  index: this.tr.props.index,
                }),
              },
            },
          ],
        }
      } else {
        children = {
          align: 'center',
          component: 'Flex',
          cols: [
            {
              classes: {
                'nom-grid-td-cell-ellipsis': true,
              },
              children: children,
            },
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.toolbar.hover,
                'nom-grid-column-tools-hide': !(
                  this.props.column.toolbar.placement === 'body' ||
                  this.props.column.toolbar.placement === 'both'
                ),
              },
              children: {
                forceVisible: true,
                ...this.props.column.toolbar.render({
                  cell: this,
                  row: this.tr,
                  cellData: this.props.data,
                  rowData: this.tr.props.data,
                  index: this.tr.props.index,
                }),
              },
            },
          ],
        }
      }
    }

    const colSpan =
      spanProps && spanProps.colSpan !== null && spanProps.colSpan !== undefined
        ? spanProps.colSpan
        : this.props.column.colSpan

    const rowSpan =
      spanProps && spanProps.rowSpan !== null && spanProps.rowSpan !== undefined
        ? spanProps.rowSpan
        : this.props.column.rowSpan

    if (rowSpan > 1) {
      this.table.hasRowGroup = true
    }

    const showTitle =
      (((this.table.hasGrid && this.table.grid.props.showTitle) || this.table.props.showTitle) &&
        this.props.column.showTitle !== false) ||
      this.props.column.showTitle === true

    let columnAlign = this.table.hasGrid ? this.table.grid.props.columnAlign : 'left'
    if (column.isChecker && !column.toolbar && this.table.grid.props.rowCheckable.align) {
      columnAlign = this.table.grid.props.rowCheckable.align
    }

    const isExcelMode = this.table.hasGrid && this.table.grid.props.excelMode

    children = {
      tag: 'span',
      classes: {
        'nom-table-cell-content': !!column.cellRender || !!column.render,
        'nom-table-cell-content-ellipsis-wrapper': isEllipsis && !column.autoWidth,
        'nom-table-cell-static-ellipsis':
          isEllipsis && (nomui.utils.isString(children) || nomui.utils.isNumeric(children)),
      },
      children,
    }

    if (this.table.hasGrid && this.table.grid.props.editable) {
      children = {
        classes: {
          'nom-td-editable-inner': true,
          'nom-td-auto-width': column.autoWidth,
          'nom-td-with-editor': !!column.editRender,
          'nom-td-edit-disabled': cellDisabled,
        },
        children: [
          {
            grow: true,
            children,
          },
          {
            component: 'Icon',
            classes: {
              'nom-grid-td-edit-trigger': true,
            },
            hidden:
              (this.table.grid.props.editable &&
                this.table.grid.props.editable.onlyleaf &&
                !isLeaf) ||
              this.table.parent.componentType === 'GridFooter',
            type: this._getEditIconType(),
            onClick: ({ event }) => {
              event.stopPropagation()

              if (grid.lastEditTd && grid.lastEditTd.props && grid.lastEditTd !== this) {
                grid.lastEditTd.endEdit()
              }
              if (grid.lastEditTd && grid.lastEditTd === this) {
                return
              }

              if (column.editRender) {
                if (!cellDisabled) {
                  this.edit({ type: 'editable' })
                  setTimeout(() => {
                    this.editor.triggerEdit()
                  }, 200)
                }
                grid.lastEditTd = this
              } else {
                grid.lastEditTd = null
              }
            },
          },
        ],
      }
    }

    if (isExcelMode) {
      children = {
        tag: 'span',
        classes: {
          'nom-td-excel-mode-inner': true,
          'nom-td-auto-width': column.autoWidth,
        },
        children,
      }
      this.setProps({
        classes: {
          'nom-td-excel-mode': true,
          'nom-td-with-editor': !!column.editRender,
          'nom-td-edit-disabled': cellDisabled,
        },
        onClick: ({ event }) => {
          event.stopPropagation()

          grid.props.onRowClick &&
            !this.props.editMode &&
            grid._callHandler(grid.props.onRowClick, { event, rowData: this.tr.props.data })
          if (grid.lastEditTd && grid.lastEditTd.props && grid.lastEditTd !== this) {
            grid.lastEditTd.endEdit()
          }
          if (grid.lastEditTd && grid.lastEditTd === this) {
            return
          }

          if (column.editRender) {
            if (!cellDisabled) {
              this.edit({ type: 'excel' })
              setTimeout(() => {
                this.editor.triggerEdit()
              }, 200)
            }
            grid.lastEditTd = this
          } else {
            grid.lastEditTd = null
          }
        },
      })
    } else if (this.table.hasGrid && this.table.grid.props.editable) {
      this.setProps({
        classes: {
          'nom-td-editable': true,
        },
        onClick: ({ event }) => {
          event.stopPropagation()

          grid.props.onRowClick &&
            !this.props.editMode &&
            grid._callHandler(grid.props.onRowClick, { event, rowData: this.tr.props.data })

          if (grid.lastEditTd && grid.lastEditTd.props && grid.lastEditTd !== this) {
            grid.lastEditTd.endEdit()
          }
          if (grid.lastEditTd && grid.lastEditTd === this) {
            return
          }

          grid.lastEditTd = null
        },
      })
    }

    this.setProps({
      children: children,
      attrs: {
        colspan: colSpan,
        rowspan: rowSpan,
        align: this.props.column.align || columnAlign,
        'data-field': this.props.column.field,
        title: this._getAttrTitle(children, isEllipsis, showTitle),
      },
      hidden: colSpan === 0 || rowSpan === 0,
      classes: {
        'nom-td-tree-node': isTreeNodeColumn,
        'nom-td-tree-node-leaf': isTreeNodeColumn && isLeaf,
        'nom-table-fixed-left': this.props.column.fixed === 'left',
        'nom-table-fixed-left-last': this.props.column.lastLeft,
        'nom-table-fixed-right': this.props.column.fixed === 'right',
        'nom-table-fixed-right-first': this.props.column.firstRight,
        'nom-table-ellipsis': isEllipsis,
        'nom-table-checker': this.props.column.isChecker,
        'nom-table-checker-with-toolbar':
          !!this.props.column.toolbar && this.props.column.isChecker,
        'nom-td-always-edit': excelMode && excelMode.alwaysEdit,
      },
    })
  }

  _getAttrTitle(children, isEllipsis, showTitle) {
    // 因为isEllipsis = true时，已经使用span包了一层，所以具体的title为children.children

    if (isEllipsis || showTitle) {
      let _title = ''
      if (isEllipsis && isPlainObject(children) && children.children) {
        _title = children.children
      } else {
        _title = children
      }

      if (isString(_title) || isNumeric(_title)) {
        // 字符#开头 children将以 html格式输出
        return _title[0] === '#' ? null : _title
      }
    }
    return null
  }

  _rendered() {
    this.props.column.autoWidth && this._parseTdWidth()
    const fixed = this.props.column.fixed
    if (fixed && !this._skipFixed) {
      this._setTdsPosition()
    }
    // if (this.props.column.toolbar && this.props.column.toolbar.align === 'left') {
    //   this._fixThToolsPosition()
    // }
  }

  _renderRowOrder({ index }) {
    return index + 1
  }

  _renderRowChecker({ row, rowData, index }) {
    const grid = this.table.grid

    const { rowCheckable } = grid.props

    let normalizedRowCheckable = rowCheckable
    if (!isPlainObject(rowCheckable)) {
      normalizedRowCheckable = {}
    }
    const { checkedRowKeys = [], checkboxRender } = normalizedRowCheckable
    const checkedRowKeysHash = {}
    checkedRowKeys.forEach((rowKey) => {
      checkedRowKeysHash[rowKey] = true
    })

    let _checkboxProps = {}
    // 根据传入的 checkboxRender 计算出对应的 props: {hidden, value, disabled}
    if (checkboxRender && isFunction(checkboxRender)) {
      _checkboxProps = checkboxRender({ row, rowData, index })
    }

    // 计算得到当前的 checkbox的状态
    _checkboxProps.value = _checkboxProps.value || checkedRowKeysHash[row.key] === true

    if (_checkboxProps.value === true) {
      row._check()
    }

    if (checkedRowKeysHash[row.key] === true || _checkboxProps.value) {
      grid.checkedRowRefs[grid.getKeyValue(rowData)] = row
    }

    // const { keyField } = grid.props
    // const { parentField } = grid.props.treeConfig
    // grid.nodeList[`__key${rowData[keyField]}`] = row
    // row.childrenNodes = {}

    // if (rowData[parentField]) {
    //   row.parentNode = grid.nodeList[`__key${rowData[parentField]}`]
    // }

    // if (row.parentNode) {
    //   if (rowData[keyField]) {
    //     row.parentNode.childrenNodes[`__key${rowData[keyField]}`] = row
    //   }
    // }

    if (rowCheckable.type === 'checker&order') {
      return {
        classes: {
          'nom-grid-checker-and-order': true,
        },
        children: [
          {
            component: 'Checkbox',
            classes: {
              'nom-grid-checkbox': true,
            },
            plain: true,
            _created: (inst) => {
              row._checkboxRef = inst
            },
            _config() {
              this.setProps(_checkboxProps)
            },
            attrs: {
              'data-key': row.key,
            },
            onValueChange: (args) => {
              if (args.newValue === true) {
                grid.check(row)
              } else {
                grid.uncheck(row)
              }
              grid.changeCheckAllState()
            },
            onClick: ({ event }) => {
              event.stopPropagation()
            },
          },
          {
            classes: {
              'nom-grid-order-text': true,
            },
            children: index + 1,
          },
        ],
      }
    }

    return {
      component: 'Checkbox',
      classes: {
        'nom-grid-checkbox': true,
      },
      plain: true,
      _created: (inst) => {
        row._checkboxRef = inst
      },
      _config() {
        this.setProps(_checkboxProps)
      },
      attrs: {
        'data-key': row.key,
      },
      onValueChange: (args) => {
        if (args.newValue === true) {
          grid.check(row)
        } else {
          grid.uncheck(row)
        }
        grid.changeCheckAllState()
      },
    }
  }

  _renderCombinedChecker({ row, rowData, index, renderOrder }) {
    const grid = this.table.grid
    const { rowCheckable } = grid.props

    let normalizedRowCheckable = rowCheckable
    if (!isPlainObject(rowCheckable)) {
      normalizedRowCheckable = {}
    }
    const { checkedRowKeys = [], checkboxRender } = normalizedRowCheckable
    const checkedRowKeysHash = {}
    checkedRowKeys.forEach((rowKey) => {
      checkedRowKeysHash[rowKey] = true
    })
    let _checkboxProps = {}
    // 根据传入的 checkboxRender 计算出对应的 props: {hidden, value, disabled}
    if (checkboxRender && isFunction(checkboxRender)) {
      _checkboxProps = checkboxRender({ row, rowData, index })
    }

    // 计算得到当前的 checkbox的状态
    _checkboxProps.value = _checkboxProps.value || checkedRowKeysHash[row.key] === true

    if (checkedRowKeysHash[row.key] === true || _checkboxProps.value) {
      grid.checkedRowRefs[grid.getKeyValue(rowData)] = row
    }

    if (renderOrder) {
      return {
        classes: {
          'nom-grid-checker-and-order': true,
        },
        children: [
          {
            component: 'Checkbox',
            classes: {
              'nom-grid-checkbox': true,
            },
            onClick: ({ event }) => {
              event.stopPropagation()
            },
            plain: true,
            _created: (inst) => {
              row._checkboxRef = inst
            },
            _config() {
              this.setProps(_checkboxProps)
            },
            attrs: {
              'data-key': row.key,
              style: {
                paddingRight: '.25rem',
              },
            },
            onValueChange: (args) => {
              if (args.newValue === true) {
                grid.check(row)
              } else {
                grid.uncheck(row)
              }

              grid._checkboxAllRef && grid.changeCheckAllState()
            },
          },
          {
            classes: {
              'nom-grid-order-text': true,
            },
            children: index + 1,
          },
        ],
      }
    }

    return {
      component: 'Checkbox',
      classes: {
        'nom-grid-checkbox': true,
      },
      plain: true,
      _created: (inst) => {
        row._checkboxRef = inst
      },
      _config() {
        this.setProps(_checkboxProps)
      },
      onClick: ({ event }) => {
        event.stopPropagation()
      },
      attrs: {
        'data-key': row.key,
        style: {
          paddingRight: '.25rem',
        },
      },
      onValueChange: (args) => {
        if (args.newValue === true) {
          grid.check(row)
        } else {
          grid.uncheck(row)
        }

        grid._checkboxAllRef && grid.changeCheckAllState()
      },
    }
  }

  _setTdsPosition() {
    const fixed = this.props.column.fixed
    const el = this.element
    const tableWrapper = el.closest('.nom-grid-body')
    if (!tableWrapper) return

    const scrollbarWidth = this.table.grid.props.scrollbarWidth

    if (fixed === 'left') {
      const elRect = el.getBoundingClientRect()
      const wrapperRect = tableWrapper.getBoundingClientRect()
      this._stickyPos = elRect.left - wrapperRect.left
    } else if (fixed === 'right') {
      const elRect = el.getBoundingClientRect()
      const wrapperRect = tableWrapper.getBoundingClientRect()
      this._stickyPos = wrapperRect.right - elRect.right - scrollbarWidth
    }

    this._stickyPos = Math.max(0, this._stickyPos)
    this._setStyle({ [fixed]: `${this._stickyPos}px` })
  }

  _parseTdWidth() {
    let tdWidth = 0
    // Td的左右padding 10+10, 预留1px的buffer
    let tdPaddingWidth = 21
    // 右侧固定第一列, padding-left: 15
    if (this.props.column.firstRight) tdPaddingWidth += 5
    // 自定义列设置 && 右侧固定最後一列的th的 padding-right: 40
    const needRightPadding =
      !!this.table.grid.props.columnsCustomizable && this.props.column.lastRight

    Array.from(this.element.children).forEach((child) => {
      const { marginLeft, marginRight } = getStyle(child)
      tdWidth +=
        Math.max(child.offsetWidth, child.scrollWidth) +
        this._parseCssNumber(marginLeft) +
        this._parseCssNumber(marginRight)
    })

    if (this.table.hasGrid) {
      let maxTdWidth = tdWidth + tdPaddingWidth
      // fix: td宽度不够导致 操作 二字换行
      maxTdWidth = maxTdWidth < 80 && needRightPadding ? maxTdWidth + 30 : maxTdWidth
      // 需要同时更新header,body,footer
      this.table.grid.setAllTableColMaxTdWidth({
        field: this.props.column.field,
        maxTdWidth,
      })
    } else {
      this.col.setMaxTdWidth(this.element.offsetWidth + tdPaddingWidth)
    }
  }

  _fixThToolsPosition() {
    const w = this.element.querySelector('.nom-grid-column-tools').offsetWidth
    const f = this.props.column.field
    const target = this.table.grid.header.element
      .querySelector(`thead [data-field="${f}"]`)
      .querySelector('.nom-grid-column-th-tools')
    if (target) target.style.width = `${w}px`
  }

  /**
   * 解析css宽度字符，取出其中的数字部分
   * @param {*} str 12px
   * @returns 12
   */
  _parseCssNumber(str) {
    return +str.match(/\d+/g)
  }

  _expand() {
    this.tr._onExpand()
  }

  _collapse() {
    this.tr._onCollapse()
  }

  _getEditIconType() {
    const { column } = this.props
    const { editRender } = column
    if (!editRender) {
      return null
    }

    const regex = /component:\s*'(\w+)'/
    const match = editRender.toString().match(regex)

    const iconMap = {
      AutoComplete: 'down',
      Cascader: 'down',
      Checkbox: 'edit',
      CheckboxList: 'edit',
      CheckboxTree: 'edit',
      ColorPicker: 'down',
      DatePicker: 'calendar',
      DateRangePicker: 'calendar',
      Field: 'edit',
      Form: 'edit',
      Group: 'edit',
      GroupGrid: 'edit',
      GroupTree: 'edit',
      GroupList: 'edit',
      IconPicker: 'down',
      ListSetter: 'edit',
      MultilineTextbox: 'edit',
      Numberbox: 'edit',
      NumberInput: 'edit',
      PartialDatePicker: 'calendar',
      PartialDateRangePicker: 'calendar',
      Password: 'edit',
      RadioList: 'edit',
      Rate: 'edit',
      Select: 'down',
      Slider: 'edit',
      StaticText: 'edit',
      Switch: 'edit',
      Textbox: 'edit',
      TimePicker: 'clock',
      TimeRangePicker: 'clock',
      Transfer: 'edit',
      TreeSelect: 'down',
      Uploader: 'upload',
      Upload: 'upload',
    }
    return column.editorIcon || iconMap[match[1]] || 'edit'
  }

  edit({ type = 'excel' }) {
    this._skipFixed = true
    this.update({
      editMode: true,
      classes: {
        'nom-td-excel-mode-active': type === 'excel',
        'nom-td-editable-active': type === 'editable',
      },
    })
    this._skipFixed = false
    this.editor.validate()
  }

  endEdit(options) {
    if (!this.props.editMode || !this.editor) {
      return
    }
    if (!options) {
      options = { ignoreChange: false }
    }
    if (options.ignoreChange !== true) {
      this._updateTdData()
    }
    this._skipFixed = true
    this.update({
      editMode: false,
      classes: {
        'nom-td-excel-mode-active': false,
        'nom-td-editable-active': false,
      },
    })
    this._skipFixed = false
    if (this.table.grid.props.summary) {
      this.table.grid.updateSummary()
    }
  }

  saveEditData() {
    this._updateTdData()
  }

  _updateTdData() {
    if (!this.editor.validate()) {
      this.table.grid.props.editable.onValidateFailed &&
        this.table.grid._callHandler(this.table.grid.props.editable.onValidateFailed, {
          field: this.editor,
          value: this.editor.getValue(),
        })
      this.table.grid.props.excelMode.onValidateFailed &&
        this.table.grid._callHandler(this.table.grid.props.excelMode.onValidateFailed, {
          field: this.editor,
          value: this.editor.getValue(),
        })
      return
    }

    const newData = this.editor.getValue()

    if (!deepEqual(this.props.data, newData)) {
      const oldData = clone(this.props.data)

      this.props.data = newData

      const { data } = this.tr.props
      const field = this.props.column.field
      data[field] = newData

      const grid = this.table.grid
      if (grid.props.data.length) {
        for (let i = 0; i < grid.props.data.length; i++) {
          if (grid.props.data[i][grid.props.keyField] === data[grid.props.keyField]) {
            grid.props.data[i] = data
          }
        }
      }
      grid._processModifedRows(data[grid.props.keyField])
      this._onCellValueChange({ newValue: newData, oldValue: oldData })
    }
  }

  _onCellValueChange({ newValue, oldValue }) {
    this.table.grid.props.editable.onCellValueChange &&
      this.table.grid._callHandler(this.table.grid.props.editable.onCellValueChange, {
        newValue,
        oldValue,
        field: this.props.column.field,
        rowKey: this.tr.props.data[this.table.grid.props.keyField],
        cell: this,
      })
    this.table.grid.props.excelMode.onCellValueChange &&
      this.table.grid._callHandler(this.table.grid.props.excelMode.onCellValueChange, {
        newValue,
        oldValue,
        field: this.props.column.field,
        rowKey: this.tr.props.data[this.table.grid.props.keyField],
        cell: this,
      })
  }
}

Component.register(Td)

export default Td
