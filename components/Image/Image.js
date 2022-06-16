import Component from '../Component/index'
import { isNumeric } from '../util/index'

class Image extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Image.defaults, props), ...mixins)
  }

  _config() {
    const { src } = this.props
    let { width, height } = this.props
    const size = this.sizeComputing(width, height)
    width = isNumeric(width) ? `${width}px` : width
    height = isNumeric(height) ? `${height}px` : height
    this.setProps({
      children: [
        {
          component: 'Icon',
          classes: {
            'nom-image-pending': true,
          },
          ref: (c) => {
            this.pendingRef = c
          },
          type: 'image-pending',
          attrs: {
            style: {
              width,
              height,
              'font-size': `${size}rem`,
            },
          },
        },
        {
          tag: 'img',
          ref: (c) => {
            this.imgRef = c
          },
          hidden: true,
          attrs: {
            src,
            style: {
              width,
              height,
            },
          },
        },
      ],
    })
  }

  imgPromise(src) {
    return new Promise((resolve, reject) => {
      const i = new Image()
      i.onload = () => resolve()
      i.onerror = reject
      i.src = src
    })
  }

  promiseFind(sourceList, imgPromise) {
    let done = false
    // 重新使用Promise包一层
    return new Promise((resolve, reject) => {
      const queueNext = (src) => {
        return imgPromise(src).then(() => {
          done = true
          // 加载成功 resolve
          resolve(src)
        })
      }

      const firstPromise = queueNext(sourceList.shift() || '')

      // 生成一条promise链[队列]，每一个promise都跟着catch方法处理当前promise的失败
      // 从而继续下一个promise的处理
      sourceList
        .reduce((p, src) => {
          // 如果加载失败 继续加载
          return p.catch(() => {
            if (!done) return queueNext(src)
          })
        }, firstPromise)
        // 全都挂了 reject
        .catch(reject)
    })
  }

  sizeComputing(val1, val2) {
    val1 = val1 || 200
    val2 = val2 || 100
    if (val1 > val2) {
      return parseInt(val2 / 22, 10)
    }
    return parseInt(val1 / 22, 10)
  }

  _rendered() {
    const img = this.imgRef.element
    const that = this
    img.onload = img.onreadystatechange = function () {
      if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
        that.pendingRef.remove()
        that.imgRef.show()
      }
    }

    // this.imgPromise(src)
    //   .then(() => {
    //     // 加载成功
    //     setLoading(false)
    //     setValue(src)
    //   })
    //   .catch((error) => {
    //     // 加载失败
    //     setLoading(false)
    //     setError(error)
    //   })
  }
}
Image.defaults = {
  src: null,
  alt: null,
  width: null,
  height: null,
  'icon-width': null,
  'icon-height': null,
}

Component.register(Image)

export default Image
