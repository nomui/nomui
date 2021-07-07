import Component from '../Component/index'
import { isFunction, isNumeric, isPlainObject, isString } from '../util/index'

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
  }

  _config() {
    const { level, isLeaf, data: rowData } = this.tr.props
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
            return rowData.children.map((subrowData) => {
              return this.table.grid.rowsRefs[subrowData[this.table.props.keyField]]
            })
          },
          indicator: {
            component: 'Icon',
            classes: { 'nom-tr-expand-indicator': true },
            expandable: {
              expandedProps: {
                type: 'down',
              },
              collapsedProps: {
                type: 'right',
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

    const showTitle =
      (((this.table.hasGrid && this.table.grid.props.showTitle) || this.table.props.showTitle) &&
        this.props.column.showTitle !== false) ||
      this.props.column.showTitle === true

    this.setProps({
      children: children,
      attrs: {
        colspan: colSpan,
        rowspan: rowSpan,
        'data-field': this.props.column.field,
        title:
          (isString(children) || isNumeric(children)) && (isEllipsis || showTitle)
            ? children
            : null,
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

  _rendered() {
    if (this.props.column.fixed === 'left') {
      this._setStyle({ left: `${this.element.offsetLeft}px` })
    } else if (this.props.column.fixed === 'right') {
      this._setStyle({
        right: `${
          this.parent.element.offsetWidth - this.element.offsetLeft - this.element.offsetWidth
        }px`,
      })
    }
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
