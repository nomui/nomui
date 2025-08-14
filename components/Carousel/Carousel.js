import Component from '../Component/index'
import { isNumeric } from '../util/index'

class Carousel extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Carousel.defaults, props), ...mixins)
  }

  _config() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
    }
    this.dotsRef = []
    this.positions = []
    this.slideWidth = null
    this.autoplayInterval = null
    this.sildeRefs = []
    const { imgs, defaultActiveIndex } = this.props
    const cloneImgs = [...imgs]
    cloneImgs.push(imgs[0])
    this.loopImgs = cloneImgs

    this.activeId = defaultActiveIndex
    this.activeIdOld = defaultActiveIndex
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
            ref: (c) => {
              this.paginationRef = c
            },
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
                type: 'prev',
              },
              {
                classes: {
                  'nom-carousel-button-next': true,
                },
                onClick: () => {
                  this.nextClick()
                },
                component: 'Icon',
                type: 'next',
              },
            ],
          },
        ],
      },
    })
  }

  _rendered() {
    const { autoplay, autoplaySpeed, pauseOnHover, defaultActiveIndex, triggerType } = this.props

    this.initPositions()

    // 是否自动播放
    if (autoplay) {
      this.autoplayInterval = setInterval(() => {
        this.nextClick()
      }, autoplaySpeed)
    }

    // 在鼠标悬浮时自动停止轮播
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

    // 初始被激活的轮播图
    setTimeout(() => {
      this.paginationClick(defaultActiveIndex)
    }, 500)

    // 锚点导航触发方式
    if (triggerType === 'hover') {
      this.dotsRef.forEach((item) => {
        item.element.onmouseenter = (e) => {
          const target = e.target
          if (target.nodeName === 'SPAN') {
            this.paginationClick(target.dataset.index)
          }
        }
      })
    } else {
      this.paginationRef.element.addEventListener('click', (e) => {
        const target = e.target
        if (target.nodeName === 'SPAN') {
          this.paginationClick(target.dataset.index)
        }
      })
    }
  }

  _remove() {
    clearInterval(this.autoplayInterval)
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
            height: isNumeric(_that.props.height) ? `${_that.props.height}px` : _that.props.height,
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
          if (c) _that.dotsRef.push(c)
        },
        classes: {
          'nom-carousel-pagination-bullet': true,
          'nom-carousel-pagination-bullet-active': index === _that.defaultActiveIndex - 1,
        },
        tag: 'span',
        attrs: {
          'data-index': index + 1,
        },
        children: index + 1,
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
    this.dotsRef[this.activeIdOld - 1].element.classList.remove(
      'nom-carousel-pagination-bullet-active',
    )

    if (this.activeId === this.loopImgs.length) {
      // 末去首
      this.dotsRef[0].element.classList.add('nom-carousel-pagination-bullet-active')
      this.activeIdOld = 1
      setTimeout(() => {
        this.wrapperRef.element.setAttribute(
          'style',
          `transform:translate3d(0, 0, 0);transition: transform 0ms;`,
        )
      }, this.props.speed + this.props.resetDelayCompensation)
    } else {
      this.dotsRef[this.activeId - 1].element.classList.add('nom-carousel-pagination-bullet-active')
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
Carousel.defaults = {
  imgs: [],
  height: 100,
  arrows: false,
  autoplay: false,
  autoplaySpeed: 1000,
  speed: 300,
  resetDelayCompensation: 50,
  dots: true,
  defaultActiveIndex: 1,
  easing: 'linear',
  pauseOnHover: true,
  triggerType: 'click',
}
Component.register(Carousel)

export default Carousel
