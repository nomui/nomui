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
    this.col.tdRefs[this.key] = this
  }

  _config() {
    const { level, isLeaf } = this.tr.props
    const { column } = this.props
    const { treeConfig } = this.table.props

    let spanProps = null

    let children = this.props.data === 0 ? '0' : this.props.data

    if (isFunction(column.cellRender)) {
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

    const isEllipsis =
      ((this.table.props.ellipsis === 'both' || this.table.props.ellipsis === 'body') &&
        this.props.column.ellipsis !== false) ||
      this.props.column.ellipsis === true

    // 用span包一层，为了伪元素的展示
    if (isEllipsis && !column.autoWidth) {
      children = {
        tag: 'span',
        classes: { 'nom-table-cell-content': true },
        children,
      }
    }

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
        child.offsetWidth + this._parseCssNumber(marginLeft) + this._parseCssNumber(marginRight)
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
