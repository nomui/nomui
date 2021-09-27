import Component from '../Component/index'
import { isFunction } from '../util/index'

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
    this.resizer = null
    this.lastDistance = 0
    this.table.thRefs[this.props.column.field] = this
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

    const isEllipsis =
      (this.table.props.ellipsis === 'both' || this.table.props.ellipsis === 'header') &&
      this.props.column.ellipsis !== false

    const headerProps = {
      tag: 'span',
      attrs: {
        title: isEllipsis ? this.props.column.header || this.props.column.title : null,
      },
      children: this.props.column.header || this.props.column.title,
    }

    if (that.props.column.sortable && that.props.column.colSpan > 0) {
      headerProps.onClick = function () {
        that.onSortChange()
      }
    }

    const children = [
      headerProps,
      this.props.column.sortable &&
        this.props.column.colSpan > 0 && {
          component: 'Icon',
          type: sortIcon,
          onClick: function () {
            that.onSortChange()
          },
        },
      this.props.column.filter &&
        this.props.column.colSpan > 0 && {
          component: 'Icon',
          type: 'filter',
          ref: (c) => {
            this.filterBtn = c
          },
          attrs: {
            style: {
              cursor: 'pointer',
            },
          },
          popup: {
            align: 'bottom right',
            ref: (c) => {
              this.filterPopup = c
            },
            onShow: () => {
              that.filterGroup && that.filterGroup.setValue(that.filterValue)
            },
            children: {
              attrs: {
                style: {
                  padding: '10px',
                  'min-width': '180px',
                  'max-width': '250px',
                },
              },
              children: [
                {
                  component: 'Group',
                  ref: (c) => {
                    this.filterGroup = c
                  },
                  fields: [
                    {
                      ...(isFunction(that.props.column.filter)
                        ? that.props.column.filter()
                        : that.props.column.filter),
                      name: that.props.column.field,
                    },
                  ],
                },
                {
                  attrs: {
                    style: {
                      'text-align': 'right',
                      padding: '0 10px',
                    },
                  },
                  children: {
                    component: 'Cols',
                    justify: 'end',
                    gutter: 'sm',
                    items: [
                      {
                        component: 'Button',
                        text: '确定',
                        size: 'small',
                        onClick: () => {
                          this.onFilterChange()
                        },
                      },
                      {
                        component: 'Button',
                        text: '重置',
                        size: 'small',
                        onClick: () => {
                          this.onFilterReset()
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
      that.table.hasGrid &&
        that.table.grid.props.allowFrozenCols && {
          component: 'Icon',
          type: 'pin',
          onClick: function () {
            // that.table.grid.handlePinClick(that.props.column)
          },
        },
      that.table.hasGrid &&
        that.table.grid.props.columnResizable &&
        this.props.column.resizable !== false &&
        this.props.column.colSpan === 1 && {
          component: 'Icon',
          ref: (c) => {
            that.resizer = c
          },
          type: 'resize-handler',
          classes: { 'nom-table-resize-handler': true },
          onClick: function () {
            // that.table.grid.handlePinClick(that.props.column)
          },
        },
    ]

    this.setProps({
      children: children,
      classes: {
        'nom-table-fixed-left': this.props.column.fixed === 'left',
        'nom-table-fixed-left-last': this.props.column.lastLeft,
        'nom-table-fixed-right': this.props.column.fixed === 'right',
        'nom-table-fixed-right-first': this.props.column.firstRight,
        'nom-table-parent-th': this.props.column.colSpan > 1,
        'nom-table-leaf-th': this.props.column.colSpan === 1,
        'nom-table-sortable': !!(this.props.column.sortable && this.props.column.colSpan > 0),
        'nom-table-ellipsis': isEllipsis,
      },
      attrs: {
        colspan: this.props.column.colSpan,
        rowspan: this.props.column.rowSpan,
      },
    })
  }

  _rendered() {
    // 未设置冻结列则无需定时器
    const {grid = {}} = this.table
    const {frozenLeftCols, frozenRightCols} = grid.props || {}
    if(frozenLeftCols || frozenRightCols) {
      setTimeout(() => {
        this.setStickyPosition()
      }, 0);
    }

    this.resizer && this.handleResize()
  }

  setStickyPosition() {
    // 设置排序时会出发两次_render，则此时设置的第一个定时器中的this.props已被销毁
    if(!this.props) return
    if (this.props.column.fixed === 'left') {
      this._setStyle({ left: `${this.element.offsetLeft}px` })
    } else if (this.props.column.fixed === 'right') {
      this._setStyle({
        right: `${
          this.parent.element.offsetWidth - this.element.offsetLeft - this.element.offsetWidth
        }px`,
      })
    }

    this.resizer && this.handleResize()
  }

  handleResize() {
    const resizer = this.resizer.element
    const that = this

    resizer.onmousedown = function (evt) {
      const startX = evt.clientX
      that.lastDistance = 0

      document.onmousemove = function (e) {
        const endX = e.clientX
        const moveLen = endX - startX

        const distance = moveLen - that.lastDistance
        that.table.grid.resizeCol({
          field: that.props.column.field,
          distance: distance,
        })
        that.lastDistance = moveLen
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
    }
  }

  onSortChange() {
    const that = this
    if (that.props.column.sortDirection === 'desc') {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: 'asc' } },
      })
    } else if (that.props.column.sortDirection === 'asc') {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: null } },
      })
    } else {
      that.update({
        column: { ...that.props.column, ...{ sortDirection: 'desc' } },
      })
    }
    that.table.grid.handleSort(that.props.column)
  }

  resetSort() {
    this.update({ column: { sortDirection: null } })
    this.table.grid && this.table.grid.setSortDirection()
  }

  onFilterChange(isReset) {
    if (this.filterGroup.getValue()[this.props.column.field]) {
      this.filterValue = this.filterGroup.getValue()
    }
    this.table.grid.filter = { ...this.table.grid.filter, ...this.filterGroup.getValue() }
    this.filterPopup.hide()
    this.table.grid.handleFilter(isReset)
    this.resetFilterStatus()
  }

  onFilterReset() {
    this.filterGroup.reset()
    this.filterValue = null
    this.onFilterChange(true)
  }

  resetFilterStatus() {
    this.filterBtn.update({
      classes: {
        'nom-filter-active': !!this.filterValue,
      },
    })
  }
}

Component.register(Th)

export default Th
