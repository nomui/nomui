import Component from '../Component/index'

class Carousel extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      imgs: [],
      height: 100,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.imgs = this.props.imgs
    this.positions = [
      // {
      //   left:0,
      //   width:100,
      //   height:100
      // }
    ]
    this.activeId = 1
    this.activeIdOld = 1
    this.sildeRefs = []
    this.paginationRef = []
    this.initPositions()
  }

  _config() {
    this.setProps({
      children: {
        classes: {
          'nom-carousel-container': true,
        },
        children: [
          {
            ref: (c) => {
              this.wrapperRef = c
            },
            classes: {
              'nom-carousel-wrapper': true,
            },
            children: this.slideList(),
          },
          {
            classes: {
              'nom-carousel-pagination': true,
            },
            children: this.paginationList(),
          },
          {
            classes: {
              'nom-carousel-buttons': true,
            },
            children: [
              {
                classes: {
                  'nom-carousel-button-prev': true,
                },
                onClick: () => {
                  this.prevClick()
                },
                component: 'Icon',
                type: 'left',
              },
              {
                classes: {
                  'nom-carousel-button-next': true,
                },
                onClick: () => {
                  this.nextClick()
                },
                component: 'Icon',
                type: 'right',
              },
            ],
          },
        ],
      },
    })
  }

  _rendered() {
    this.updateItemsSize()
  }

  slideList() {
    const newList = [...this.imgs]
    const _that = this
    // newList.push(this.imgs[0])
    return newList.map(function (item) {
      return {
        ref: (c) => {
          if (c) _that.sildeRefs.push(c)
        },
        classes: {
          'nom-carousel-slide': true,
        },
        attrs: {
          style: {
            height: `${_that.props.height}px`,
          },
        },
        children: {
          tag: 'img',
          attrs: {
            src: item,
          },
          children: '',
        },
      }
    })
  }

  paginationList() {
    const _that = this
    return this.imgs.map(function (d, index) {
      return {
        ref: (c) => {
          if (c) _that.paginationRef.push(c)
        },
        classes: {
          'nom-carousel-pagination-bullet': true,
          'nom-carousel-pagination-bullet-active': index === 0,
        },
        attrs: {
          'data-index': index + 1,
        },
        tag: 'span',
        children: index + 1,
        onClick: () => {
          _that.paginationClick(index + 1)
        },
      }
    })
  }

  paginationClick(index) {
    this.activeId = index
    console.log(this.activeId)
    this.animate()
  }

  prevClick() {
    this.activeId -= 1
    console.log(this.activeId)
    this.animate()
  }

  nextClick() {
    this.activeId += 1
    console.log(this.activeId)
    this.animate()
  }

  animate() {
    const left = this.positions[this.activeId - 1].left
    this.wrapperRef.update({
      attrs: {
        style: {
          transform: `translate3d(${-left}px, 0, 0)`,
        },
      },
    })
    this.paginationRef[this.activeIdOld - 1].update({
      classes: {
        'nom-carousel-pagination-bullet-active': false,
      },
    })

    this.paginationRef[this.activeId - 1].update({
      classes: {
        'nom-carousel-pagination-bullet-active': true,
      },
    })
    this.activeIdOld = this.activeId
  }

  initPositions() {
    this.positions = this.imgs.map(() => ({
      left: 0,
      width: 0,
      height: 0,
    }))
  }

  updateItemsSize() {
    const nodes = this.sildeRefs
    nodes.forEach((node, index) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      console.log(rect)
      const width = rect.width
      const height = rect.height
      this.positions[index].width = width
      this.positions[index].height = height
      let left = 0
      for (let i = 0; i < index; i++) {
        left += this.positions[i].width
      }
      this.positions[index].left = left
    })
    console.log(this.positions)
  }
}

Component.register(Carousel)

export default Carousel
