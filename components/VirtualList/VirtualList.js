import Component from '../Component/index'

class VirtualList extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      listData: [], // 列表数据源
      height: '400', // 容器高度
      size: 30, // 每个列表项高度预估值
      bufferScale: 1, // 缓冲区比例
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    // 起始索引
    this.start = 0
    // 结束索引
    this.end = 0
    // 用于列表项渲染后存储 每一项的高度以及位置信息
    this.positions = [
      // {
      //   top:0,
      //   bottom:100,
      //   height:100
      // }
    ]
    // 当前列表项arry
    this.itemsRefs = []
    // 所有列表数据
    this.listData = this.props.listData
    // 可视区域高度
    this.screenHeight = this.props.height
    // 预估高度
    this.estimatedItemSize = this.props.size
    // 缓冲区比例
    this.bufferScale = this.props.bufferScale
    this.initPositions()
  }

  _config() {
    const listArry = this.getList(this.visibleData())
    const height = this.positions[this.positions.length - 1].bottom
    this.setProps({
      children: {
        ref: (c) => {
          this.listRef = c
        },
        classes: {
          'nom-virtual-list-container': true,
        },
        attrs: {
          style: {
            height: `${this.screenHeight}px`,
          },
        },
        children: [
          {
            ref: (c) => {
              this.phantomRef = c
            },
            classes: {
              'nom-virtual-list-phantom': true,
            },
            attrs: {
              style: {
                height: `${height}px`,
              },
            },
            children: '',
          },
          {
            ref: (c) => {
              this.contentRef = c
            },
            classes: {
              'nom-virtual-list-content': true,
            },
            children: listArry,
          },
        ],
      },
    })
  }

  _rendered() {
    this.listRef.element.addEventListener('scroll', () => {
      this.scrollEvent()
    })
    // let isScroll = false
    // this.listRef.element.addEventListener('scroll', () => {
    //   if (isScroll) return
    //   isScroll = true
    //   this.scrollEvent()
    //   setTimeout(() => {
    //     isScroll = false
    //   }, 500)
    // })
  }

  getList(arry) {
    const _that = this
    this.itemsRefs = []
    return arry.map(function (items) {
      return {
        ref: (c) => {
          if (c) _that.itemsRefs.push(c)
        },
        classes: {
          'nom-virtual-list-item': true,
        },
        attrs: {
          'data-key': items._index,
        },
        children: items.item,
      }
    })
  }

  // 需要在 渲染完成后，获取列表每项的位置信息并缓存
  updated() {
    if (!this.itemsRefs || !this.itemsRefs.length) {
      return
    }
    // 获取真实元素大小，修改对应的尺寸缓存
    this.updateItemsSize()
    // 更新列表总高度
    const height = this.positions[this.positions.length - 1].bottom
    this.phantomRef.update({
      attrs: {
        style: {
          height: `${height}px`,
        },
      },
    })

    this.contentRef.update({
      attrs: {
        style: {
          transform: `translate3d(0,${this.setStartOffset()}px,0)`,
        },
      },
      children: this.getList(this.visibleData()),
    })
  }

  // 初始时根据 estimatedItemSize对 positions进行初始化
  initPositions() {
    this.positions = this.listData.map((d, index) => ({
      index,
      height: this.estimatedItemSize,
      top: index * this.estimatedItemSize,
      bottom: (index + 1) * this.estimatedItemSize,
    }))
  }

  // 获取列表起始索引
  getStartIndex(scrollTop = 0) {
    // 二分法查找
    return this.binarySearch(this.positions, scrollTop)
  }

  binarySearch(list, value) {
    let start = 0
    let end = list.length - 1
    let tempIndex = null

    while (start <= end) {
      const midIndex = parseInt((start + end) / 2, 10)
      const midValue = list[midIndex].bottom
      if (midValue === value) {
        return midIndex + 1
      }
      if (midValue < value) {
        start = midIndex + 1
      } else if (midValue > value) {
        if (tempIndex === null || tempIndex > midIndex) {
          tempIndex = midIndex
        }
        end -= 1
      }
    }
    return tempIndex
  }

  // 获取列表项的当前尺寸
  updateItemsSize() {
    const nodes = this.itemsRefs
    nodes.forEach((node) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      const height = rect.height
      const index = +node.element.dataset.key.slice(1)
      const oldHeight = this.positions[index].height
      const dValue = oldHeight - height
      // 存在差值
      if (dValue) {
        this.positions[index].bottom -= dValue
        this.positions[index].height = height
        for (let k = index + 1; k < this.positions.length; k++) {
          this.positions[k].top = this.positions[k - 1].bottom
          this.positions[k].bottom -= dValue
        }
      }
    })
  }

  // 设置当前的偏移量
  setStartOffset() {
    let startOffset
    if (this.start >= 1) {
      const size =
        this.positions[this.start].top -
        (this.positions[this.start - this.aboveCount()]
          ? this.positions[this.start - this.aboveCount()].top
          : 0)
      startOffset = this.positions[this.start - 1].bottom - size
    } else {
      startOffset = 0
    }
    return startOffset
  }

  // 滚动事件
  scrollEvent() {
    // 当前滚动位置
    const scrollTop = this.listRef.element.scrollTop
    // 此时的开始索引
    this.start = this.getStartIndex(scrollTop)
    // 此时的结束索引
    this.end = this.start + this.visibleCount()
    // 更新列表
    this.updated()
  }

  _listData() {
    return this.listData.map((item, index) => {
      return {
        _index: `_${index}`,
        item,
      }
    })
  }

  // 可显示的列表项数
  visibleCount() {
    return Math.ceil(this.screenHeight / this.estimatedItemSize)
  }

  // 可视区上方渲染条数
  aboveCount() {
    return Math.min(this.start, this.bufferScale * this.visibleCount())
  }

  // 可视区下方渲染条数
  belowCount() {
    return Math.min(this.listData.length - this.end, this.bufferScale * this.visibleCount())
  }

  // 获取真实显示列表数据
  visibleData() {
    const start = this.start - this.aboveCount()
    const end = this.end + this.belowCount()
    return this._listData().slice(start, end)
  }
}

Component.register(VirtualList)

export default VirtualList
