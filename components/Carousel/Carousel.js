import Component from '../Component/index'

class Carousel extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      imgs: [],
      height: 100,
      arrows: false,
      autoplay: false,
      autoplaySpeed: 1000,
      speed: 300,
      dots: true,
      defaultActiveIndex: 1,
      easing: 'linear',
      pauseOnHover: true,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const { imgs, defaultActiveIndex } = this.props
    const cloneImgs = [...imgs]
    cloneImgs.push(imgs[0])
    this.loopImgs = cloneImgs
    this.positions = [
      // {
      //   left:0,
      //   width:100
      // }
    ]
    this.activeId = defaultActiveIndex
    this.activeIdOld = defaultActiveIndex
    this.sildeRefs = []
    this.paginationRef = []
    this.slideWidth = null
    this.autoplayInterval = null
  }

  _config() {
    this.setProps({
      children: {
        ref: (c) => {
          this.containerRef = c
        },
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
              'nom-carousel-pagination-show': this.props.dots,
            },
            children: this.paginationList(),
          },
          {
            classes: {
              'nom-carousel-buttons': true,
              'nom-carousel-buttons-show': this.props.arrows,
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
    const { autoplay, autoplaySpeed, pauseOnHover, defaultActiveIndex } = this.props

    this.initPositions()

    if (autoplay) {
      this.autoplayInterval = setInterval(() => {
        this.nextClick()
      }, autoplaySpeed)
    }

    if (pauseOnHover) {
      this.containerRef.element.addEventListener('mouseover', () => {
        clearInterval(this.autoplayInterval)
      })
      this.containerRef.element.addEventListener('mouseout', () => {
        if (autoplay) {
          this.autoplayInterval = setInterval(() => {
            this.nextClick()
          }, autoplaySpeed)
        }
      })
    }

    setTimeout(() => {
      this.paginationClick(defaultActiveIndex)
    }, 500)
  }

  slideList() {
    const _that = this
    return this.loopImgs.map(function (item) {
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
    return this.props.imgs.map(function (d, index) {
      return {
        ref: (c) => {
          if (c) _that.paginationRef.push(c)
        },
        classes: {
          'nom-carousel-pagination-bullet': true,
          'nom-carousel-pagination-bullet-active': index === _that.defaultActiveIndex - 1,
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
    this.animate('pagination')
  }

  prevClick() {
    this.activeId -= 1
    if (this.activeId <= 0) {
      this.activeId = this.loopImgs.length - 1
    }
    this.animate()
  }

  nextClick() {
    this.activeId += 1
    if (this.activeId > this.loopImgs.length) {
      this.activeId = 2
    }
    this.animate()
  }

  animate(val) {
    this.updateSlideSize()
    if (
      this.activeId === this.loopImgs.length - 1 &&
      this.activeIdOld === 1 &&
      val !== 'pagination'
    ) {
      // 首去末
      this.wrapperRef.element.setAttribute(
        'style',
        `transform:translate3d(${-this.positions[this.loopImgs.length - 1]
          .left}px, 0, 0);transition: transform 0ms;`,
      )
      setTimeout(() => {
        this.wrapperRef.element.setAttribute(
          'style',
          `transform:translate3d(${-this.positions[this.loopImgs.length - 2]
            .left}px, 0, 0);transition: transform ${this.props.speed}ms ${this.props.easing};`,
        )
      }, 0)
    } else {
      this.wrapperRef.element.setAttribute(
        'style',
        `transform:translate3d(${-this.positions[this.activeId - 1]
          .left}px, 0, 0);transition: transform ${this.props.speed}ms ${this.props.easing};`,
      )
    }
    // 分页器
    this.paginationRef[this.activeIdOld - 1].element.classList.remove(
      'nom-carousel-pagination-bullet-active',
    )

    if (this.activeId === this.loopImgs.length) {
      // 末去首
      this.paginationRef[0].element.classList.add('nom-carousel-pagination-bullet-active')
      this.activeIdOld = 1
      setTimeout(() => {
        this.wrapperRef.element.setAttribute(
          'style',
          `transform:translate3d(0, 0, 0);transition: transform 0ms;`,
        )
      }, 300)
    } else {
      this.paginationRef[this.activeId - 1].element.classList.add(
        'nom-carousel-pagination-bullet-active',
      )
      this.activeIdOld = this.activeId
    }
  }

  // 初始设置值
  initPositions() {
    this.positions = this.loopImgs.map(() => ({
      left: 0,
      width: 0,
    }))
  }

  // 更新
  updateSlideSize() {
    const nodes = this.sildeRefs
    let firstLeft = 0
    if (this.slideWidth === nodes[0].element.getBoundingClientRect().width) return
    nodes.forEach((node, index) => {
      if (!node.rendered) return
      const rect = node.element.getBoundingClientRect()
      this.positions[index].width = rect.width
      if (index === 0) {
        this.positions[index].left = 0
        firstLeft = rect.left
        this.slideWidth = rect.width
      } else {
        this.positions[index].left = rect.left - firstLeft
      }
    })
  }
}

Component.register(Carousel)

export default Carousel
