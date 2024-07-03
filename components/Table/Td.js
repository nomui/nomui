import Component from '../Component/index'
import { getStyle, isFunction, isNumeric, isPlainObject, isString } from '../util/index'

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
    if (this.col) this.col.tdRefs[this.key] = this
    this.tr.tdRefs[this.props.column.field] = this
  }

  _config() {
    const { level, isLeaf } = this.tr.props
    const { column } = this.props
    const { treeConfig } = this.table.props

    let spanProps = null

    let children = this.props.data

    const isEllipsis =
      ((this.table.props.ellipsis === 'both' || this.table.props.ellipsis === 'body') &&
        this.props.column.ellipsis !== false) ||
      this.props.column.ellipsis === true


    if (column.type === 'checker') {
      children = this._renderCombinedChecker({ row: this.tr, rowData: this.tr.props.data, index: this.tr.props.index })
    }

    if (column.type === 'order') {
      children = this._renderRowOrder({ index: this.tr.props.index })
    }

    if (column.type === 'checker&order') {
      children = this._renderCombinedChecker({ row: this.tr, rowData: this.tr.props.data, index: this.tr.props.index, renderOrder: true })
    }

    if (column.isChecker && column.field === 'nom-grid-row-checker' && this.table.hasGrid && this.table.grid.props.rowCheckable && !this.table.grid.props.rowCheckable.checkboxOnNodeColumn) {
      children = this._renderRowChecker({ row: this.tr, rowData: this.tr.props.data, index: this.tr.props.index })
    }


    if (this.tr.props.editMode && column.editRender) {
      children = {
        ...column.editRender({
          cell: this,
          row: this.tr,
          talbe: this.table,
          cellData: this.props.data,
          rowData: this.tr.props.data,
          index: this.tr.props.index,
        }), ref: (c) => {
          this.editor = c
        }
      }
    }
    else if (isFunction(column.cellRender)) {
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

    if (isEllipsis) {
      children = {
        component: 'Ellipsis',
        fitContent: true,
        text: children
      }
    }

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

    if (column.tools) {
      if (column.tools.align === 'left') {
        children = {
          classes: {
            'nom-grid-column-with-tools': true
          },
          align: 'center',
          component: 'Flex',
          cols: [
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.tools.hover,
                'nom-grid-column-tools-hide': !(this.props.column.tools.placement === 'body' || this.props.column.tools.placement === 'both')
              },
              children: this.props.column.tools.render({
                cell: this,
                row: this.tr,
                cellData: this.props.data,
                rowData: this.tr.props.data,
                index: this.tr.props.index,
              })
            },
            {
              children: children
            },

          ]
        }
      }
      else if (column.tools.align === 'right') {
        children = {
          align: 'center',
          component: 'Flex',
          cols: [
            {
              grow: true,
              children: children
            },
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.tools.hover,
                'nom-grid-column-tools-hide': !(this.props.column.tools.placement === 'body' || this.props.column.tools.placement === 'both')
              },
              children: this.props.column.tools.render({
                cell: this,
                row: this.tr,
                cellData: this.props.data,
                rowData: this.tr.props.data,
                index: this.tr.props.index,
              })
            },
          ]
        }
      }
      else {
        children = {
          align: 'center',
          component: 'Flex',
          cols: [
            {
              children: children
            },
            {
              classes: {
                'nom-grid-column-tools': true,
                'nom-grid-column-tools-hover': column.tools.hover,
                'nom-grid-column-tools-hide': !(this.props.column.tools.placement === 'body' || this.props.column.tools.placement === 'both')
              },
              children: this.props.column.tools.render({
                cell: this,
                row: this.tr,
                cellData: this.props.data,
                rowData: this.tr.props.data,
                index: this.tr.props.index,
              })
            },
          ]
        }
      }


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





      children = [
        {
          tag: 'span',
          attrs: {
            style: {
              paddingLeft: `${level * treeConfig.indentSize}px`,
            },
          },
        },
        this.getExpandableIndicatorProps(),
        this.table.hasGrid && this.table.grid.props.rowCheckable && this.table.grid.props.rowCheckable.checkboxOnNodeColumn && this._renderCombinedChecker({ row: this.tr, rowData: this.tr.props.data, index: this.tr.props.index }),
        { tag: 'span', children: children },
      ]


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


    // // 用span包一层，为了伪元素的展示
    // if (isEllipsis && !column.autoWidth) {
    //   debugger
    //   children = {
    //     tag: 'span',
    //     classes: { 'nom-table-cell-content': true },
    //     children,
    //   }
    // }

    const showTitle =
      (((this.table.hasGrid && this.table.grid.props.showTitle) || this.table.props.showTitle) &&
        this.props.column.showTitle !== false) ||
      this.props.column.showTitle === true

    const columnAlign = this.table.hasGrid ? this.table.grid.props.columnAlign : 'left'



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
      },
    })
  }

  _getAttrTitle(children, isEllipsis, showTitle) {
    // 因为isEllipsis = true时，已经使用span包了一层，所以具体的title为children.children
    if (isEllipsis || showTitle) {
      const _title = isEllipsis ? children.children : children
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
    if (fixed) {
      this._setTdsPosition()
    }
    // if (this.props.column.tools && this.props.column.tools.align === 'left') {
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

    const { keyField } = grid.props
    const { parentField } = grid.props.treeConfig

    if (rowData[keyField]) {
      grid.nodeList[`__key${rowData[keyField]}`] = row
      if (row.parentNode) {
        row.parentNode.childrenNodes[`__key${rowData[keyField]}`] = row
      }
    } else {
      console.warn(`Row data does not contain the field "${keyField}", which may cause an error.`)
    }

    row.childrenNodes = {}
    if (rowData[parentField]) {
      row.parentNode = grid.nodeList[`__key${rowData[parentField]}`]
    } else if (grid.props.rowCheckable.flatData) {
      console.warn(`Row data does not contain the field "${parentField}", which may cause an error.`)
    }



    if (rowCheckable.type === 'checker&order') {
      return {
        classes: {
          'nom-grid-checker-and-order': true
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
          },
          {
            classes: {
              'nom-grid-order-text': true
            },
            children: index + 1
          }
        ]
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

    const { keyField } = grid.props
    const { parentField } = grid.props.treeConfig
    grid.nodeList[`__key${rowData[keyField]}`] = row
    row.childrenNodes = {}
    row.parentNode = grid.nodeList[`__key${rowData[parentField]}`]
    if (row.parentNode) {
      row.parentNode.childrenNodes[`__key${rowData[keyField]}`] = row
    }

    if (renderOrder) {
      return {
        classes: {
          'nom-grid-checker-and-order': true
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
              style: {
                paddingRight: '.25rem'
              }
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
              'nom-grid-order-text': true
            },
            children: index + 1
          }
        ]
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
        style: {
          paddingRight: '.25rem'
        }
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
    const parentEl = this.parent.element

    if (fixed === 'left') {
      this._stickyPos = el.offsetLeft
    } else if (fixed === 'right') {
      this._stickyPos = parentEl.offsetWidth - el.offsetLeft - el.offsetWidth
      if (this.table.hasGrid && this.table.grid.props.frozenHeader) {
        this._stickyPos -= this.table.grid.props.scrollbarWidth
      }
    }
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
        Math.max(child.offsetWidth, child.scrollWidth) + this._parseCssNumber(marginLeft) + this._parseCssNumber(marginRight)
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
    const target = this.table.grid.header.element.querySelector(`thead [data-field="${f}"]`).querySelector('.nom-grid-column-th-tools')
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
}

Component.register(Td)

export default Td
