import Component from '../Component/index'

class VirtualList extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      dataSource: [], // 列表数据源
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.data = this.props.dataSource // 元数据
    this.estimatedItemSize = 30 // 每个列表项高度预估值，默认值30
    this.lastMeasuredIndex = -1 // 最后一次计算尺寸、偏移的 index
    this.startIndex = 0
    this.sizeAndOffsetCahce = {} // 存储缓存结果
    this.visibleData = [] // 可见区域的数据
  }

  _config() {
    const listArry = this.getList(this.visibleData)
    this.setProps({
      children: {
        ref: (c) => {
          this.listRef = c
        },
        classes: {
          'list-view': true,
        },
        children: [
          {
            ref: (c) => {
              this.phantomRef = c
            },
            classes: {
              'list-view-phantom': true,
            },
            attrs: {
              style: {
                height: `${this.contentHeight()}px`,
              },
            },
            children: '',
          },
          {
            ref: (c) => {
              this.contentRef = c
            },
            autoRender: false,
            classes: {
              'list-view-content': true,
            },
            children: listArry,
          },
        ],
      },
    })
  }

  _rendered() {
    this.listRef.element.addEventListener('scroll', () => {
      this.handleScroll()
    })
    this.updateVisibleData()
  }

  getList(arry) {
    const _that = this
    return arry.map(function (item, index) {
      const h = _that.getItemSizeAndOffset(_that.startIndex + index).size
      // console.log(h)
      const list = {
        ref: (c) => {
          _that.itemRef = c
        },
        classes: {
          'list-view-item': true,
        },
        attrs: {
          'data-s': _that.startIndex,
          'data-i': index,
          style: {
            'border-bottom': '1px solid #eee',
            height: `${h}px`,
          },
        },
        children: `${item.value}`,
      }

      return list
    })
  }

  // 计算可滚动区域高度值
  contentHeight() {
    const { data, lastMeasuredIndex, estimatedItemSize } = this
    const itemCount = data.length
    if (lastMeasuredIndex >= 0) {
      const lastMeasuredSizeAndOffset = this.getLastMeasuredSizeAndOffset()
      return (
        lastMeasuredSizeAndOffset.offset +
        lastMeasuredSizeAndOffset.size +
        (itemCount - 1 - lastMeasuredIndex) * estimatedItemSize
      )
    }
    return itemCount * estimatedItemSize
  }

  // 获取列表项高度
  itemSizeGetter(item) {
    return 30 + (item.value % 10)
  }

  // 某个列表项在列表中的 top
  getItemSizeAndOffset(index) {
    console.log('getItemSizeAndOffset', index)
    const { lastMeasuredIndex, sizeAndOffsetCahce, data, itemSizeGetter } = this
    if (lastMeasuredIndex >= index) {
      return sizeAndOffsetCahce[index] || { offset: 0, size: 0 }
    }

    let offset = 0
    if (lastMeasuredIndex >= 0) {
      const lastMeasured = sizeAndOffsetCahce[lastMeasuredIndex]
      if (lastMeasured) {
        offset = lastMeasured.offset + lastMeasured.size
      }
    }

    for (let i = lastMeasuredIndex + 1; i <= index && i < data.length; i++) {
      const item = data[i]
      const size = itemSizeGetter.call(null, item, i)
      sizeAndOffsetCahce[i] = {
        size,
        offset,
      }
      offset += size
    }
    this.lastMeasuredIndex = Math.min(index, data.length - 1)
    return sizeAndOffsetCahce[index] || { offset: 0, size: 0 }
  }

  // 得到最后缓存值
  getLastMeasuredSizeAndOffset() {
    return this.lastMeasuredIndex >= 0
      ? this.sizeAndOffsetCahce[this.lastMeasuredIndex]
      : { offset: 0, size: 0 }
  }

  // 二分查找来优化已缓存的结果的搜索性能，把时间复杂度降低到 O(lgN)
  binarySearch(low, high, offset) {
    let index

    while (low <= high) {
      const middle = Math.floor((low + high) / 2)
      const middleOffset = this.getItemSizeAndOffset(middle).offset
      if (middleOffset === offset) {
        index = middle
        break
      } else if (middleOffset > offset) {
        high = middle - 1
      } else {
        low = middle + 1
      }
    }

    if (low > 0) {
      index = low - 1
    }

    if (typeof index === 'undefined') {
      index = 0
    }
    console.log('binarySearch', index)
    return index
  }

  exponentialSearch(scrollTop) {
    let bound = 1
    const data = this.data
    const start = this.lastMeasuredIndex >= 0 ? this.lastMeasuredIndex : 0
    while (
      start + bound < data.length &&
      this.getItemSizeAndOffset(start + bound).offset < scrollTop
    ) {
      bound *= 2
    }
    console.log('exponentialSearch binarySearch', bound)
    return this.binarySearch(
      start + Math.floor(bound / 2),
      Math.min(start + bound, data.length),
      scrollTop,
    )
  }

  // 计算可视区域的索引
  findNearestItemIndex(scrollTop) {
    // const { data } = this
    console.log('findNearestItemIndex', scrollTop)
    const lastMeasuredOffset = this.getLastMeasuredSizeAndOffset().offset
    if (lastMeasuredOffset > scrollTop) {
      return this.binarySearch(0, this.lastMeasuredIndex, scrollTop)
    }
    return this.exponentialSearch(scrollTop)
  }

  // 虚拟列表的更新逻辑
  updateVisibleData(scrollTop) {
    scrollTop = scrollTop || 0
    const start = this.findNearestItemIndex(scrollTop) // 取得可见区域的起始数据索引
    console.log('start', start)
    const end = this.findNearestItemIndex(scrollTop + this.listRef.element.clientHeight) + 1 // 取得可见区域的结束数据索引
    console.log('end', end)
    this.visibleData = this.data.slice(start, Math.min(end + 1, this.data.length)) // 计算出可见区域对应的数据
    console.log('visibleData', this.visibleData)
    this.startIndex = start
    const webkitTransform = `translate3d(0, ${this.getItemSizeAndOffset(start).offset}px, 0)` // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）
    // 更新可视区域
    this.contentRef.update({
      attrs: {
        style: {
          transform: webkitTransform,
        },
      },
      children: this.getList(this.visibleData),
    })
  }

  handleScroll() {
    const scrollTop = this.listRef.element.scrollTop
    // console.log(scrollTop)
    this.updateVisibleData(scrollTop)
  }
}

Component.register(VirtualList)

export default VirtualList
