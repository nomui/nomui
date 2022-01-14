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
    const { frozenHeader, summary } = this.grid.props
    const minWidth = frozenHeader ? this.grid.minWidth + 17 : this.grid.minWidth

    this._summaryHeight = summary ? 36 : 0

    this.setProps({
      classes: { 'nom-grid-highlight-col': this.grid.props.highlightCol },
      children: {
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
        }
      }, 0)
    }
  }

  _remove() {
    this.scrollbar && this.scrollbar._remove()
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

    if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
      this.element.style.transform = `translateY(${pRect.top - gRect.top - 2}px)`
    }

    if (
      gRect.top < pRect.height + pRect.top &&
      gRect.top + gRect.height - 17 - this._summaryHeight > pRect.top + pRect.height
    ) {
      this.scrollbar.show()
    } else {
      this.scrollbar.hide()
    }
  }
}

Component.register(GridHeader)

export default GridHeader
