import Component from '../Component/index'

class Th extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'th',
      column: {},
      sortDirection: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tr = this.parent
    this.table = this.tr.table
  }

  _config() {
    const that = this
    let sortIcon = 'sort'
    if (this.props.column.sortDirection === 'asc') {
      sortIcon = 'sort-up'
    }

    if (this.props.column.sortDirection === 'desc') {
      sortIcon = 'sort-down'
    }

    const children = {
      component: 'Cols',
      align: 'center',
      justify: this.props.column.colSpan > 1 ? 'center' : null,
      items: [
        {
          children: this.props.column.header || this.props.column.title,
        },
        {
          component: 'Icon',
          type: sortIcon,
          hidden: !this.props.column.sortable || this.props.column.colSpan > 1,
          onClick: function () {
            that.onSortChange()
          },
        },
        {
          component: 'Icon',
          type: 'pin',
          hidden: !that.table.hasGrid || !that.table.grid.props.allowFrozenCols,
          onClick: function () {
            // that.table.grid.handlePinClick(that.props.column)
          },
        },
      ],
    }

    this.setProps({
      children: children,
      classes: {
        'nom-table-fixed-left': this.props.column.fixed === 'left',
        'nom-table-fixed-left-last': this.props.column.lastLeft,
        'nom-table-fixed-right': this.props.column.fixed === 'right',
        'nom-table-fixed-right-first': this.props.column.firstRight,
        'nom-table-parent-th': this.props.column.colSpan > 1,
      },
      attrs: {
        colspan: this.props.column.colSpan,
        rowspan: this.props.column.rowSpan,
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

  onSortChange() {
    const that = this
    if (that.props.column.sortDirection === 'asc') {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: 'desc' } },
      })
    } else if (that.props.column.sortDirection === 'desc') {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: null } },
      })
    } else {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: 'asc' } },
      })
    }
    that.table.grid.handleSort(that.props.column)
  }
}

Component.register(Th)

export default Th
