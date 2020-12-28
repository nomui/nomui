import Component from '../Component/index'
import List from '../List/index'

class Pager extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      displayItemCount: 5,
      edgeItemCount: 1,

      prevShowAlways: true,
      nextShowAlways: true,

      texts: {
        prev: '上一页',
        next: '下一页',
        ellipse: '...',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const pager = this

    this.setProps({
      children: {
        component: List,
        gutter: 'md',
        items: pager.getPageItems(),
        itemDefaults: {
          tag: 'a',
          key() {
            return this.props.pageNumber
          },
          _config: function () {
            this.setProps({
              children: `${this.props.text}`,
            })
          },
        },
        itemSelectable: {
          byClick: true,
        },
        selectedItems: pager.props.pageIndex,
        events: {
          itemSelectionChange: function () {
            pager.props.pageIndex = this.selectedItem.props.pageNumber
            pager.trigger('pageChange', {
              pageIndex: pager.props.pageIndex,
              pageSize: pager.props.pageSize,
            })
          },
        },
      },
    })
  }

  /**
   * 极端分页的起始和结束点，取决于pageIndex 和 displayItemCount.
   * @返回 {数组(Array)}
   */
  _getInterval() {
    const { props } = this
    const { pageIndex } = props
    const displayItemHalf = Math.floor(props.displayItemCount / 2)
    const pageCount = this._getPageCount()
    const upperLimit = pageCount - props.displayItemCount
    const start =
      pageIndex > displayItemHalf
        ? Math.max(Math.min(pageIndex - displayItemHalf, upperLimit), 1)
        : 1
    const end =
      pageIndex > displayItemHalf
        ? Math.min(pageIndex + displayItemHalf, pageCount)
        : Math.min(props.displayItemCount, pageCount)
    return [start, end]
  }

  _getPageCount() {
    return Math.ceil(this.props.totalCount / this.props.pageSize)
  }

  getPageItems() {
    const items = []
    const { props } = this
    if (props.totalCount === 0) {
      return items
    }
    const { pageIndex } = props
    const interval = this._getInterval()
    const pageCount = this._getPageCount()

    // 产生"Previous"-链接
    if (props.texts.prev && (pageIndex > 1 || props.prevShowAlways)) {
      items.push({
        pageNumber: pageIndex - 1,
        text: props.texts.prev,
        classes: { prev: true },
      })
    }
    // 产生起始点
    if (interval[0] > 1 && props.edgeItemCount > 0) {
      const end = Math.min(props.edgeItemCount, interval[0] - 1)
      for (let i = 1; i <= end; i++) {
        items.push({
          pageNumber: i,
          text: i,
          classes: '',
        })
      }
      if (props.edgeItemCount < interval[0] - 1 && props.texts.ellipse) {
        items.push({
          pageNumber: null,
          text: props.texts.ellipse,
          classes: { space: true },
          space: true,
        })
      }
    }

    // 产生内部的那些链接
    for (let i = interval[0]; i <= interval[1]; i++) {
      items.push({
        pageNumber: i,
        text: i,
        classes: '',
      })
    }
    // 产生结束点
    if (interval[1] < pageCount && props.edgeItemCount > 0) {
      if (pageCount - props.edgeItemCount > interval[1] && props.texts.ellipse) {
        items.push({
          pageNumber: null,
          text: props.texts.ellipse,
          classes: { space: true },
          space: true,
        })
      }
      const begin = Math.max(pageCount - props.edgeItemCount + 1, interval[1])
      for (let i = begin; i <= pageCount; i++) {
        items.push({
          pageNumber: i,
          text: i,
          classes: '',
        })
      }
    }
    // 产生 "Next"-链接
    if (props.texts.next && (pageIndex < pageCount || props.nextShowAlways)) {
      items.push({
        pageNumber: pageIndex + 1,
        text: props.texts.next,
        classes: { next: true },
      })
    }

    return items
  }
}

Component.register(Pager)

export default Pager
