import Component from '../Component/index'
import { isFunction } from '../util/index'
import getClips from './useClips'

class Watermark extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Watermark.defaults, props), ...mixins)
  }

  _created() {
    this.fontGap = 3
  }

  _config() {
    const me = this
    const { content } = this.props

    this.setProps({

      children: [
        {
          classes: {
            'nom-watermark-mask': true
          },
          onCreated: ({ inst }) => {
            me.mask = inst
          }
        },
        content && isFunction(content) ? content() : content
      ]

    })




  }

  _rendered() {
    this.firstRender && this._initWatermark()
  }

  _initWatermark() {
    const { image, text } = this.props

    if (image) {
      const img = new window.Image()
      img.src = image
      img.onload = () => {
        this._drawCanvas(img)
      }
      img.onerror = () => {
        this._drawCanvas(text)
      }
      img.crossOrigin = 'anonymous'
      img.referrerPolicy = 'no-referrer'
      img.src = image
    } else {
      this._drawCanvas(text)
    }
  }

  _drawCanvas(item) {
    const { rotate, ratio, font, gap } = this.props
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const [markWidth, markHeight] = this._getMarkSize(ctx)

    const result = getClips(
      {
        content: item,
        rotate,
        ratio,
        width: markWidth,
        height: markHeight,
        font,
        gap
      }
    )

    setTimeout(() => {
      this.mask.element.style.backgroundImage = `url('${result[0]}')`
    }, 0)

  }


  _getMarkSize(ctx) {
    const { image, text, font, width = 120, height = 60 } = this.props
    const { fontSize, fontFamily } = font
    let defaultWidth = width
    let defaultHeight = height
    if (!image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`
      const items = Array.isArray(text) ? text : [text]
      const sizes = items.map((item) => {
        const metrics = ctx.measureText(item)

        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent]
      })
      defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])))
      defaultHeight =
        Math.ceil(Math.max(...sizes.map((size) => size[1]))) * items.length +
        (items.length - 1) * this.fontGap
    }
    return [defaultWidth, defaultHeight]
  }
}

Watermark.defaults = {
  image: null,
  text: '',
  content: null,
  ratio: 1,
  rotate: -35,
  gap: 100,
  font: {
    color: 'rgba(0,0,0,.15)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  }


}

Component.register(Watermark)

export default Watermark
