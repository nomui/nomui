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
    let indicatorLine = null
    let lastTargetTh = null // 记录上一次 hover 的 th

    // 创建全局拖拽指示线
    function createIndicatorLine() {
      const line = document.createElement('div')
      line.className = 'nom-grid-drag-indicator'
      table.element.parentElement.appendChild(line)
      return line
    }

    thList.forEach((th, index) => {
      const el = th.element
      if (!el) return

      el.setAttribute('draggable', true)

      el.addEventListener('dragstart', (e) => {
        startIndex = index
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', '')
        el.classList.add('dragging')

        // 蓝色分割线紧贴当前 th 左侧
        indicatorLine = createIndicatorLine()
        const rect = el.getBoundingClientRect()
        const parentRect = table.element.getBoundingClientRect()
        indicatorLine.style.left = `${rect.left - parentRect.left}px`
      })

      el.addEventListener('dragover', (e) => {
        e.preventDefault()
        const rect = el.getBoundingClientRect()
        const parentRect = table.element.getBoundingClientRect()
        const offset = e.clientX - rect.left
        const middle = rect.width / 2
        const left = offset < middle

        // 移动灰色指示线
        if (indicatorLine) {
          indicatorLine.style.background = '#ccc'
          indicatorLine.style.left = left
            ? `${rect.left - parentRect.left}px`
            : `${rect.right - parentRect.left}px`
        }

        // 🔹 更新 hover 高亮的 th
        if (lastTargetTh && lastTargetTh !== el) {
          lastTargetTh.classList.remove('drag-over')
        }
        el.classList.add('drag-over')
        lastTargetTh = el
      })

      el.addEventListener('dragleave', () => {
        // 若快速离开目标列，清除高亮
        if (lastTargetTh === el) {
          el.classList.remove('drag-over')
          lastTargetTh = null
        }
      })

      el.addEventListener('drop', (e) => {
        e.preventDefault()
        if (!indicatorLine) return

        const dropRect = el.getBoundingClientRect()
        const offset = e.clientX - dropRect.left
        const middle = dropRect.width / 2
        const insertBefore = offset < middle

        const thArray = Object.values(table.thRefs)
        const endIndex = thArray.indexOf(th)
        if (startIndex === endIndex) {
          cleanup()
          return
        }

        // 重排列配置
        const reordered = grid.props.columns.slice()
        const [moved] = reordered.splice(startIndex, 1)
        const insertIndex = insertBefore ? endIndex : endIndex + 1
        reordered.splice(insertIndex > reordered.length ? reordered.length : insertIndex, 0, moved)

        // ✅ 保留原 frozenCount
        if (grid && typeof grid.handleColumnsSetting === 'function') {
          const frozenCount = grid.props.frozenLeftCols || 0
          grid.handleColumnsSetting(reordered, frozenCount)
        }

        cleanup()
      })

      el.addEventListener('dragend', cleanup)

      function cleanup() {
        el.classList.remove('dragging')
        if (lastTargetTh) {
          lastTargetTh.classList.remove('drag-over')
          lastTargetTh = null
        }
        if (indicatorLine) {
          indicatorLine.remove()
          indicatorLine = null
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
