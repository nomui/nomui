import Component from '../Component/index'
import { isFunction } from '../util/index'

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
    this.table = this.parent.table
  }

  _config() {
    const { level, isLeaf, data: rowData } = this.tr.props
    const { column } = this.props
    const { treeConfig } = this.table.props

    let children = this.props.data

    if (isFunction(this.props.column.render)) {
      children = this.props.column.render.call(
        this,
        this.props.data,
        this.props.record,
        this.parent.props.index,
      )
    }

    const isTreeNodeColumn = treeConfig.treeNodeColumn && column.field === treeConfig.treeNodeColumn

    if (isTreeNodeColumn) {
      if (!isLeaf) {
        this.setProps({
          expanded: treeConfig.initExpandLevel === -1 || treeConfig.initExpandLevel > level,
        })

        this._setExpandable({
          byClick: true,
          target: () => {
            return rowData.children.map((subrowData) => {
              return this.table.rowRefs[subrowData[this.table.props.keyField]]
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
        })
      }

      children = [
        {
          tag: 'span',
          attrs: {
            style: {
              paddingLeft: `${level * 15}px`,
            },
          },
        },
        !isLeaf && this.props.expandable.indicator,
        { tag: 'span', children: children },
      ]
    }

    this.setProps({
      children: children,
      attrs: {
        colspan: this.props.column.colSpan,
        rowspan: this.props.column.rowSpan,
      },
      hidden: this.props.column.colSpan === 0 || this.props.column.rowSpan === 0,
      classes: {
        'nom-td-tree-node': isTreeNodeColumn,
        'nom-td-tree-node-leaf': isTreeNodeColumn && isLeaf,
        'nom-table-fixed-left': this.props.column.fixed === 'left',
        'nom-table-fixed-left-last': this.props.column.lastLeft,
        'nom-table-fixed-right': this.props.column.fixed === 'right',
        'nom-table-fixed-right-first': this.props.column.firstRight,
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
