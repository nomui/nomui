import Component from '../Component/index'
import Scrollbar from '../Scrollbar/index'
import Table from '../Table/index'
import { isFunction } from '../util/index'
import GridTableMixin from './GridTableMixin'

class GridHeader extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Table },
    }

    super(Component.extendProps(defaults, props), GridTableMixin, ...mixins)
  }

  _created() {
    this.grid = this.parent
    this.grid.header = this
  }

  _config() {
    const { summary } = this.grid.props
    const minWidth = this.grid.minWidth

    this._summaryHeight = summary ? 36 : 0

    this.setProps({
      classes: { 'nom-grid-highlight-col': this.grid.props.highlightCol },
      attrs: {
        style: {
          paddingRight: `${this.grid.props.scrollbarWidth}px`,
        },
      },
      children: {
        component: Table,
        columns: this.grid.props.columns,
        data: this.grid.data,
        attrs: {
          style: {
            minWidth: `${minWidth}px`,
          },
        },
        onlyHead: true,
        line: this.props.line,
      },
    })
  }

  _rendered() {
    const that = this

    this._fixSettingHeight()

    if (this.grid.props.allowSortColumns) {
      this._initColumnSorting()
    }
    // this._fixRightPadding()
    if (!this.grid.props.sticky) {
      return
    }
    if (!this.scrollbar) {
      this.scrollbar = new Scrollbar({
        target: this.grid,
      })
    }
    this._hideScrolls()
    this.position = null
    this.size = null

    if (this.grid.props.sticky === true) {
      this.scrollParent = window
      this.scrollParent.onscroll = function () {
        that._onPageScroll()
      }
    } else {
      if (isFunction(this.grid.props.sticky)) {
        this.scrollParent = this.grid.props.sticky()
      } else {
        this.scrollParent = this.grid.props.sticky
      }

      this.scrollParent._on('scroll', function () {
        that._onPageScroll()
      })
      setTimeout(() => {
        if (this.scrollParent) {
          this.scrollParent.element.scrollTop += 1
          this.scrollParent.element.scrollTop -= 1
        }
      }, 0)
    }
  }

  _initColumnSorting() {
    const { table } = this
    if (!table || !table.thRefs) return

    const thList = Object.values(table.thRefs)
    const grid = this.grid

    let startIndex = -1
    let lastTargetTh = null // 当前高亮的目标 th

    thList.forEach((th, index) => {
      const el = th.element
      if (!el) return

      el.setAttribute('draggable', true)

      // === 拖拽开始 ===
      el.addEventListener('dragstart', (e) => {
        startIndex = index
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', '')
        el.classList.add('dragging')
      })

      // === 拖拽经过（根据鼠标位置高亮左右边框）===
      el.addEventListener('dragover', (e) => {
        e.preventDefault()
        const rect = el.getBoundingClientRect()
        const offset = e.clientX - rect.left
        const middle = rect.width / 2
        const insertBefore = offset < middle

        // 清理上一个目标
        if (lastTargetTh && lastTargetTh !== el) {
          clearHighlight(lastTargetTh)
          lastTargetTh = null
        }

        // 当前目标添加高亮
        if (insertBefore) {
          el.classList.add('drag-over-left')
          el.classList.remove('drag-over-right')
          highlightCells(el, 'left')
        } else {
          el.classList.add('drag-over-right')
          el.classList.remove('drag-over-left')
          highlightCells(el, 'right')
        }
        lastTargetTh = el
      })

      // === 离开目标 ===
      el.addEventListener('dragleave', () => {
        if (lastTargetTh === el) {
          clearHighlight(el)
          lastTargetTh = null
        }
      })

      // === 放下执行重排 ===
      el.addEventListener('drop', (e) => {
        e.preventDefault()
        const rect = el.getBoundingClientRect()
        const offset = e.clientX - rect.left
        const middle = rect.width / 2
        const insertBefore = offset < middle

        const thArray = Object.values(table.thRefs)
        const endIndex = thArray.indexOf(th)
        if (startIndex === endIndex) {
          cleanup()
          return
        }

        const reordered = grid.props.columns.slice()
        const [moved] = reordered.splice(startIndex, 1)
        const insertIndex = insertBefore ? endIndex : endIndex + 1
        reordered.splice(insertIndex > reordered.length ? reordered.length : insertIndex, 0, moved)

        if (grid && typeof grid.handleColumnsSetting === 'function') {
          const frozenLeft = grid.props.frozenLeftCols || 0
          grid.handleColumnsSetting(reordered, frozenLeft)
        }

        cleanup()
      })

      // === 拖拽结束 ===
      el.addEventListener('dragend', cleanup)

      // ==== 内部函数 ====
      function highlightCells(thEl, side) {
        const field = thEl.getAttribute('data-field')
        if (!field || !grid || !grid.element) return
        const cells = grid.element.querySelectorAll(`[data-field="${field}"]`)
        cells.forEach((td) => {
          if (side === 'left') {
            td.classList.add('drag-over-left')
            td.classList.remove('drag-over-right')
          } else {
            td.classList.add('drag-over-right')
            td.classList.remove('drag-over-left')
          }
        })
      }

      function clearHighlight(thEl) {
        thEl.classList.remove('drag-over-left', 'drag-over-right')
        const field = thEl.getAttribute('data-field')
        if (!field || !grid || !grid.element) return
        const cells = grid.element.querySelectorAll(`[data-field="${field}"]`)
        cells.forEach((td) => td.classList.remove('drag-over-left', 'drag-over-right'))
      }

      function cleanup() {
        el.classList.remove('dragging')
        if (lastTargetTh) {
          clearHighlight(lastTargetTh)
          lastTargetTh = null
        }
      }
    })
  }

  _remove() {
    this.scrollbar && this.scrollbar._remove()
  }

  _fixSettingHeight() {
    const h = this.element.offsetHeight
    const settingEl = this.grid.element.querySelector('.nom-grid-setting')
    if (settingEl) settingEl.style.height = `${h - 1}px`
  }

  _fixRightPadding() {
    this.element.style.overflowY = 'auto'
    setTimeout(() => {
      if (!this.element) {
        return
      }
      const offset = this.element.offsetWidth - this.element.scrollWidth
      if (!offset > 1) {
        this.element.style.overflowY = 'hidden'
      }
    }, 200)
  }

  _hideScrolls() {
    const scrolls = document.getElementsByClassName('nom-scrollbar')
    if (!scrolls.length) {
      return
    }
    for (let i = 0; i < scrolls.length; i++) {
      scrolls[i].classList.add('s-hidden')
    }
  }

  _onPageScroll() {
    if (!this.props) {
      return
    }
    this.element.style.transform = `translateY(0px)`
    let pRect = null
    if (this.grid.props.sticky === true) {
      pRect = {
        top: 0,
        height: window.innerHeight,
      }
    } else {
      pRect = this.scrollParent.element.getBoundingClientRect()
    }
    const gRect = this.grid.element.getBoundingClientRect()

    !this.position &&
      this._setScrollerRect({
        pRect: pRect,
        gRect: gRect,
      })

    this._setScrollerVisible({
      pRect: pRect,
      gRect: gRect,
    })
  }

  _setScrollerRect(data) {
    const { pRect, gRect } = data
    const innerWidth = this.element.scrollWidth

    const bottom = window.innerHeight - (pRect.top + pRect.height)

    this.position = {
      left: `${gRect.left}px`,
      bottom: `${bottom < 0 ? 0 : bottom}px`,
    }
    this.size = {
      width: `${gRect.width}px`,
      innerWidth: `${innerWidth}px`,
    }

    this.scrollbar.update({
      position: this.position,
      size: this.size,
    })
  }

  _setScrollerVisible(data) {
    const { pRect, gRect } = data
    const { scrollbarWidth } = this.grid.props

    if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
      this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
      if (this.grid.settingContainer) {
        this.grid.settingContainer.element.style.transform = `translateY(${
          pRect.top - gRect.top - 2
        }px)`
      }
    } else if (this.grid.settingContainer) {
      this.grid.settingContainer.element.style.transform = `translateY(0px)`
    }

    if (
      gRect.top < pRect.height + pRect.top &&
      gRect.top + gRect.height - scrollbarWidth - this._summaryHeight > pRect.top + pRect.height
    ) {
      this.scrollbar.show()
    } else {
      this.scrollbar.hide()
    }
  }

  /**
   * 存在多列固定，设置固定列的列宽时，对其余列的 style.left style.right 的重新计算处理
   * @param {number} triggerTh 触发的 th 实例
   */
  _processFixedColumnSticky(triggerTh) {
    const { table } = triggerTh
    const { thRefs } = table
    const { colList } = table.colGroup

    colList.forEach((col) => {
      if (col.column.fixed) {
        thRefs[col.name] && thRefs[col.name].setStickyPosition(true)
      }
    })
  }
}

Component.register(GridHeader)

export default GridHeader
