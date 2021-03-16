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
    const { level, isLeaf } = this.tr.props
    const { column } = this.props
    const { treeField } = this.table.props

    let children = this.props.data

    if (isFunction(this.props.column.render)) {
      children = this.props.column.render.call(
        this,
        this.props.data,
        this.props.record,
        this.parent.props.index,
      )
    }

    if (treeField && column.field === treeField) {
      children = [
        {
          tag: 'span',
          attrs: {
            style: {
              paddingLeft: `${level * 15}px`,
            },
          },
        },
        !isLeaf && { component: 'Button', icon: 'plus' },
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

  _toggleSubrows() {}
}

Component.register(Td)

export default Td
