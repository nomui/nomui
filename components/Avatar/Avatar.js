import Component from '../Component/index'

class Avatar extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Avatar.defaults, props), ...mixins)
  }

  static _queueSetScale(instance) {
    Avatar._scaleQueue.add(instance)

    if (Avatar._scaleRaf) {
      return
    }

    Avatar._scaleRaf = requestAnimationFrame(() => {
      Avatar._scaleRaf = null
      const queue = [...Avatar._scaleQueue]
      Avatar._scaleQueue.clear()

      const measurements = queue.map((avatar) => avatar._measureScale()).filter(Boolean)
      measurements.forEach(({ textElement, transformString, cacheKey }) => {
        textElement.style.msTransform = transformString
        textElement.style.webkitTransform = transformString
        textElement.style.transform = transformString
        textElement.__avatarScaleCacheKey = cacheKey
      })
    })
  }

  static _getIntersectionObserver() {
    if (!Avatar._intersectionObserver) {
      Avatar._intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const avatar = Avatar._observerTargets.get(entry.target)
          if (avatar && entry.isIntersecting) {
            avatar._setScale()
          }
        })
      })
    }

    return Avatar._intersectionObserver
  }

  _config() {
    const { text, icon, src, alt, extra } = this.props
    this._propStyleClasses = ['size']

    this.setProps({
      classes: {
        'avatar-image': !!src,
      },
      children: [
        extra,
        src && {
          tag: 'img',
          ref: (c) => {
            this.imgRef = c
          },
          attrs: {
            alt: alt,
          },
        },
        icon && {
          component: 'Icon',
          type: icon,
          ref: (c) => {
            this.iconRef = c
          },
        },
        !icon && {
          ref: (c) => {
            this.textRef = c
          },
          tag: 'span',
          classes: { 'nom-avatar-string': true },
          children: text || 'NA',
        },
      ],
    })
  }

  _setScale() {
    Avatar._queueSetScale(this)
  }

  _measureScale() {
    if (!this.props || this.props.icon || !this.element || !this.textRef) {
      return null
    }

    const textElement = this.textRef.element
    if (!textElement) {
      return null
    }

    const { gap } = this.props
    const childrenWidth = textElement.offsetWidth
    const nodeWidth = this.element.offsetWidth

    if (childrenWidth === 0 || nodeWidth === 0 || gap * 2 >= nodeWidth) {
      return null
    }

    const availableWidth = nodeWidth - gap * 2
    const scale = availableWidth < childrenWidth ? availableWidth / childrenWidth : 1
    const transformString = `scale(${scale}) translateX(-50%)`
    const cacheKey = `${childrenWidth}-${nodeWidth}-${gap}-${transformString}`

    if (textElement.__avatarScaleCacheKey === cacheKey) {
      return null
    }

    return { textElement, transformString, cacheKey }
  }

  _loadImageAsync() {
    const { src } = this.props
    if (!src) {
      return Promise.reject(new Error('No image source provided'))
    }

    // Convert single string src to array for consistent handling
    const srcArray = Array.isArray(src) ? [...src] : [src]
    if (srcArray.length === 0) {
      return Promise.reject()
    }

    let currentIndex = 0
    const image = this.imgRef.element

    return new Promise((resolve, reject) => {
      const tryNextImage = () => {
        if (currentIndex >= srcArray.length) {
          reject()
          return
        }

        const currentSrc = srcArray[currentIndex]
        currentIndex++

        image.src = currentSrc
        image.onload = () => {
          this.textRef && this.textRef.hide()
          this.iconRef && this.iconRef.hide()
          resolve()
        }
        image.onerror = () => {
          tryNextImage()
        }
      }

      tryNextImage()
    })
  }

  _rendered() {
    if (this.props.src && this.props.src.length) {
      this._loadImageAsync().catch(() => {
        console.warn('Failed to load avatar images:')
        this.imgRef && this.imgRef.hide()
      })
    }
    this._setScale()
  }

  _created() {
    super._created()
    Avatar._observerTargets.set(this.referenceElement, this)
    Avatar._getIntersectionObserver().observe(this.referenceElement)
  }

  _remove() {
    Avatar._scaleQueue.delete(this)
    if (Avatar._intersectionObserver) {
      Avatar._intersectionObserver.unobserve(this.referenceElement)
    }
    Avatar._observerTargets.delete(this.referenceElement)
    super._remove()
  }
}
Avatar._scaleQueue = new Set()
Avatar._scaleRaf = null
Avatar._observerTargets = new Map()
Avatar._intersectionObserver = null
Avatar.defaults = {
  tag: 'span',
  size: 'default',
  alt: '图片',
  gap: 4, // 字符类型距离左右两侧边界单位像素
  text: null, // 文本
  icon: null, // 图标
  src: null, // 图片地址
}

Component.register(Avatar)

export default Avatar
