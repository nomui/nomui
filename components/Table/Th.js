import Component from '../Component/index'
import { isFunction, isPlainObject, isString } from '../util/index'

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
    this._stickyPos = 0 // 记录当前 th的sticy.style.left(right) 的值
    this.table.thRefs[this.props.column.field] = this
    this.filterValue = null
  }

  _config() {
    const that = this

    this.filterValue = this.table.hasGrid ? this.table.grid.filter[this.props.column.field] : null

    const columnAlign = this.table.hasGrid ? this.table.grid.props.columnAlign : 'left'

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

    let titleStr = this.props.column.header || this.props.column.title
    if (!isString(titleStr)) {
      titleStr = null
    }

    let thContent = this.props.column.header || this.props.column.title

    if (
      this.props.column.isChecker ||
      this.props.column.type === 'checker' ||
      this.props.column.type === 'checker&order'
    ) {
      thContent = {
        component: 'Checkbox',
        attrs: {
          style: {
            display: 'inline-flex',
            paddingRight: '.25rem',
          },
        },
        uncheckPart: true,
        plain: true,
        _created: (inst) => {
          that.table.grid._checkboxAllRef = inst
        },
        onValueChange: (args) => {
          if (args.newValue === true) {
            that.table.grid.checkAllRows(false)
          } else {
            that.table.grid.uncheckAllRows(false)
          }
        },
        onClick: ({ event }) => {
          event.stopPropagation()
        },
      }
    }

    const headerProps = {
      tag: 'span',
      attrs: {
        title: isEllipsis ? titleStr : null,
      },
      classes: { 'nom-table-cell-title': true },
      // children: isEllipsis ? {
      //   classes: {
      //     'nom-table-cell-ellipsis': true
      //   },
      //   children: thContent
      // } : thContent
      children: thContent,
    }

    if (that.props.column.sortable && that.props.column.colSpan > 0) {
      headerProps.onClick = function () {
        that.onSortChange()
      }
    }

    this.resizable =
      this.table.hasGrid &&
      this.table.grid.props.columnResizable &&
      this.props.column.resizable !== false &&
      this.props.column.colSpan === 1

    // 外部设置不允许拖拽固定列
    if (
      this.table.hasGrid &&
      this.table.grid.props.columnResizable.allowFixedCol === false &&
      this.props.column.fixed
    ) {
      this.resizable = false
    }

    let children = [
      this.props.column.toolbar &&
        this.props.column.toolbar.align === 'left' && {
          classes: {
            'nom-grid-column-th-tools': true,
            'nom-grid-column-th-tools-hover': this.props.column.toolbar.hover,
            'nom-grid-column-th-tools-hide': !(
              this.props.column.toolbar.placement === 'header' ||
              this.props.column.toolbar.placement === 'both'
            ),
          },
          children: {
            forceVisible: true,
            ...this.props.column.toolbar.render({
              isHeader: true,
              field: this.props.column.field,
            }),
          },
        },
      headerProps,
      this.props.column.sortable &&
        this.props.column.colSpan > 0 && {
          component: 'Icon',
          classes: {
            'nom-table-sort-handler': true,
          },
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
          classes: {
            'nom-table-filter-handler': true,
          },
          attrs: {
            style: {
              cursor: 'pointer',
            },
          },
          tooltip: this.filterValue
            ? this.table.grid.filterValueText[this.props.column.field]
            : null,
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
                        text: this.table.props.okText,
                        size: 'small',
                        onClick: () => {
                          this.onFilterChange()
                        },
                      },
                      {
                        component: 'Button',
                        text: this.table.props.resetText,
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
        that.table.grid.props.allowFrozenCols &&
        that.table.grid.props.allowFrozenCols.showPinner &&
        !this.table.hasMultipleThead &&
        !(this.props.column.width && this.props.column.width > 600) &&
        !this.props.column.isChecker &&
        !this.props.column.isTreeMark &&
        this.props.column.fixed !== 'right' &&
        this.props.column.frozenable !== false && {
          component: 'Icon',
          type: this.props.column.fixed ? 'pin-fill' : 'pin',
          attrs: {
            title: this.props.column.fixed
              ? this.table.props.unfreezeText
              : this.table.props.freezeText,
          },
          classes: {
            'nom-table-pin-handler': true,
          },
          onClick: function () {
            that.table.grid.handlePinClick(that.props.column)
          },
        },
      this.props.column.toolbar &&
        this.props.column.toolbar.align !== 'left' && {
          classes: {
            'nom-grid-column-th-tools': true,
            'nom-grid-column-th-tools-float-right': this.props.column.toolbar.align === 'right',
            'nom-grid-column-th-tools-hover': this.props.column.toolbar.hover,
            'nom-grid-column-th-tools-hide': !(
              this.props.column.toolbar.placement === 'header' ||
              this.props.column.toolbar.placement === 'both'
            ),
          },
          children: {
            forceVisible: true,
            ...this.props.column.toolbar.render({
              isHeader: true,
              field: this.props.column.field,
            }),
          },
        },
      that.resizable && {
        // component: 'Icon',
        ref: (c) => {
          that.resizer = c
        },
        // type: 'resize-handler',
        classes: { 'nom-table-resize-handler': true },
      },
    ]
    // 用span包一层，为了伪元素的展示
    if (isEllipsis) {
      children = {
        tag: 'span',
        classes: { 'nom-table-cell-content': true },
        children: children,
      }
    }

    if (that.table.hasGrid) {
      const { column } = this.props
      const { treeConfig, rowCheckable } = that.table.grid.props

      if (rowCheckable && rowCheckable.checkboxOnNodeColumn) {
        const isTreeNodeColumn =
          treeConfig.treeNodeColumn && column.field === treeConfig.treeNodeColumn
        if (isTreeNodeColumn) {
          children.unshift({
            component: 'Checkbox',
            attrs: {
              style: {
                display: 'inline-flex',
                paddingRight: '.25rem',
              },
            },
            plain: true,
            _created: (inst) => {
              that.table.grid._checkboxAllRef = inst
            },
            onValueChange: (args) => {
              if (args.newValue === true) {
                that.table.grid.checkAllRows(false)
              } else {
                that.table.grid.uncheckAllRows(false)
              }
            },
          })
        }
      }
    }

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
        'nom-table-filter': !!(this.props.column.filter && this.props.column.colSpan > 0),
        'nom-table-ellipsis': isEllipsis,
        'nom-table-checker-column': !!this.props.column.isChecker,
        'nom-table-checker-with-toolbar':
          !!this.props.column.toolbar && this.props.column.isChecker,
      },
      attrs: {
        colspan: this.props.column.colSpan,
        rowspan: this.props.column.rowSpan,
        align: this.props.column.align || columnAlign,
        'data-field': this.props.column.field,
        onmouseenter:
          this.table.grid &&
          function () {
            const mask = that.table.grid.highlightMask
            mask &&
              !that.mouseDowning &&
              mask.update({
                attrs: {
                  style: {
                    zIndex: that.props.column.fixed ? 99 : null,
                    left: `${this.offsetLeft}px`,
                    width: `${this.offsetWidth}px`,
                  },
                },
              })
          },
        onmouseleave: this._hideHighLightMask.bind(this),
      },
    })
  }

  _rendered() {
    this.props.column.filter && this.props.column.colSpan > 0 && this.resetFilterStatus()
    // 未设置冻结列则无需定时器
    const fixed = this.props.column.fixed

    if (fixed) {
      setTimeout(() => {
        this.setStickyPosition()
      }, 0)
    }

    this.resizer && this.handleResize()
  }

  /**
   * 当拖拽固定列后，往后的th width都需要更新 style.left
   * @param {boolean} externalTrigger 是外部触发，
   * @returns
   */
  setStickyPosition(externalTrigger = false) {
    // 设置排序时会出发两次_render，则此时设置的第一个定时器中的this.props已被销毁
    if (!this.props) return
    if (externalTrigger) {
      this._setPositionByExter()
    } else {
      this._setPositionByIndide()
    }
    this._setAllTdsPosition()
  }

  // 内部更新，通过 自身的 offsetLeft和offsetWidth计算得出
  _setPositionByIndide() {
    const fixed = this.props.column.fixed
    const el = this.element
    const parentEl = this.parent.element

    if (fixed === 'left') {
      this._stickyPos = el.offsetLeft
    } else if (fixed === 'right') {
      this._stickyPos = parentEl.clientWidth - el.offsetLeft - el.offsetWidth
    }

    this._setStyle({ [fixed]: `${this._stickyPos}px` })
  }

  // 外部更新，通过 preEl 或 nextEl 的offsetWidth 计算得出
  _setPositionByExter() {
    const fixed = this.props.column.fixed
    const el = this.element
    if (fixed === 'left') {
      const preEl = el.previousElementSibling
      this._stickyPos = preEl ? preEl.component._stickyPos + preEl.offsetWidth : 0
    } else if (fixed === 'right') {
      const nextEl = el.nextElementSibling
      this._stickyPos = nextEl ? nextEl.component._stickyPos + nextEl.offsetWidth : 0
    }

    this._setStyle({ [fixed]: `${this._stickyPos}px` })
  }

  _gridBodyHasScrollbar() {
    if (!this.table.grid) {
      return false
    }
    const body = this.table.grid.element.querySelector('.nom-grid-body')
    // 判断纵向滚动条
    const hasVScrollbar = body && body.scrollHeight > body.clientHeight
    return hasVScrollbar
  }

  _setAllTdsPosition() {
    const { table, props } = this
    const { body, footer } = table.grid
    const { field } = props.column
    if (body) {
      this._setTdsPosition(body.table.colRefs[field].tdRefs)
    }
    if (footer) {
      this._setTdsPosition(footer.table.colRefs[field].tdRefs)
    }
  }

  _setTdsPosition(tdRefs) {
    const { props, _stickyPos } = this
    const { fixed } = props.column

    Object.keys(tdRefs).forEach((key) => {
      tdRefs[key]._setStyle({ [fixed]: `${_stickyPos}px` })
    })
  }

  handleResize() {
    const resizer = this.resizer.element
    const that = this
    const { columnResizable } = this.table.grid.props

    resizer.onmousedown = function (evt) {
      isPlainObject(columnResizable) &&
        columnResizable.onStart &&
        that.table.grid._callHandler(columnResizable.onStart)
      const startX = evt.clientX
      that.lastDistance = 0
      that._hideHighLightMask()
      that.mouseDowning = true

      document.onmousemove = function (e) {
        const endX = e.clientX
        const moveLen = endX - startX

        const distance = moveLen - that.lastDistance
        that._triggerGridResize(distance)
        that.lastDistance = moveLen
        isPlainObject(columnResizable) &&
          columnResizable.onMove &&
          that.table.grid._callHandler(columnResizable.onMove)
      }
      document.onmouseup = function () {
        that.mouseDowning = false
        const grid = that.table.grid
        if (that.resizable && grid.props.columnResizable.cache) {
          grid.storeColsWidth(that.props.column.field)
        }
        // 移动列宽，需重新计算渲染 scroller 的宽度
        const header = grid.header
        if (header.scrollbar) {
          const gRect = grid.element.getBoundingClientRect()
          const size = {
            width: `${gRect.width}px`,
            innerWidth: `${header.element.scrollWidth}px`,
          }
          header.scrollbar.update({ size })
        }
        header && header._processFixedColumnSticky(that)
        that._triggerGridResize(0)

        isPlainObject(columnResizable) &&
          columnResizable.onEnd &&
          that.table.grid._callHandler(columnResizable.onEnd)
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }

  _hideHighLightMask() {
    if (!this.table.grid) return
    const mask = this.table.grid.highlightMask
    mask && mask.update({ attrs: { style: { width: 0 } } })
  }

  /**
   * @param {number} distance 偏移量
   */
  _triggerGridResize(distance) {
    this.table.grid.calcResizeCol(
      {
        field: this.props.column.field,
        distance: distance,
      },
      this,
    )
  }

  onSortChange() {
    const that = this
    that.table.grid._setScrollPlace()
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
      this.filterValue = {
        ...this.filterGroup.getValue(),
      }
    }

    this.table.grid.filter = { ...this.table.grid.filter, ...this.filterGroup.getValue() }
    this.table.grid.filterValueText[this.props.column.field] = this.filterGroup
      .getField(this.props.column.field)
      .getValueText()
      .toString()

    this.filterPopup.hide()
    this.table.grid.handleFilter(isReset)
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
