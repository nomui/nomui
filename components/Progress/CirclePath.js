import Component from '../Component/index'

let gradientSeed = 0

function stripPercentToNumber(percent) {
  return +percent.replace('%', '')
}

function toArray(symArray) {
  return Array.isArray(symArray) ? symArray : [symArray]
}

function getPathStyles(offset, percent, strokeColor, strokeWidth, gapDegree = 0, gapPosition) {
  const radius = 50 - strokeWidth / 2
  let beginPositionX = 0
  let beginPositionY = -radius
  let endPositionX = 0
  let endPositionY = -2 * radius
  switch (gapPosition) {
    case 'left':
      beginPositionX = -radius
      beginPositionY = 0
      endPositionX = 2 * radius
      endPositionY = 0
      break
    case 'right':
      beginPositionX = radius
      beginPositionY = 0
      endPositionX = -2 * radius
      endPositionY = 0
      break
    case 'bottom':
      beginPositionY = radius
      endPositionY = 2 * radius
      break
    default:
  }
  const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
   a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
   a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
  const len = Math.PI * 2 * radius
  const pathStyle = {
    stroke: strokeColor,
    'stroke-dasharray': `${(percent / 100) * (len - gapDegree)}px ${len}px`,
    'stroke-dashoffset': `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s', // eslint-disable-line
  }

  return {
    pathString,
    pathStyle,
  }
}

class CirclePath extends Component {
  constructor(props, ...mixins) {
    const defaults = {}
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const {
      prefixCls,
      strokeWidth,
      trailWidth,
      gapDegree,
      gapPosition,
      trailColor,
      strokeLinecap,
      style,
      strokeColor,
      percent,
    } = this.props

    gradientSeed += 1
    const gradientId = gradientSeed

    const { pathString, pathStyle } = getPathStyles(
      0,
      100,
      trailColor,
      strokeWidth,
      gapDegree,
      gapPosition,
    )
    const percentList = toArray(percent)
    const strokeColorList = toArray(strokeColor)
    const gradient = strokeColorList.find(
      (color) => Object.prototype.toString.call(color) === '[object Object]',
    )

    const getStokeList = () => {
      let stackPtg = 0
      return percentList
        .map((ptg, index) => {
          const color = strokeColorList[index] || strokeColorList[strokeColorList.length - 1]
          const stroke =
            Object.prototype.toString.call(color) === '[object Object]'
              ? `url(#${prefixCls}-gradient-${gradientId})`
              : ''
          const pathStyles = getPathStyles(
            stackPtg,
            ptg,
            color,
            strokeWidth,
            gapDegree,
            gapPosition,
          )
          stackPtg += ptg
          return {
            tag: 'path',
            classes: {
              [`${prefixCls}-circle-path`]: true,
            },
            attrs: {
              d: pathStyles.pathString,
              stroke: stroke,
              'stroke-linecap': strokeLinecap,
              'stroke-width': strokeWidth,
              opacity: ptg === 0 ? 0 : 1,
              'fill-opacity': '0',
              style: {
                ...pathStyles.pathStyle,
              },
            },
          }
        })
        .reverse()
    }

    this.setProps({
      tag: 'svg',
      classes: {
        [`${prefixCls}-circle`]: true,
      },
      attrs: {
        viewBox: '0 0 100 100',
        xmlns: 'http://www.w3.org/2000/svg',
        // 'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'xml:space': 'preserve',
        ...style,
      },
      children: [
        gradient
          ? {
              tag: 'defs',
              children: {
                tag: 'linearGradient',
                attrs: {
                  id: `${prefixCls}-gradient-${gradientId}`,
                  x1: '100%',
                  y1: '0%',
                  x2: '0%',
                  y2: '0%',
                },
                children: Object.keys(gradient)
                  .sort((a, b) => stripPercentToNumber(a) - stripPercentToNumber(b))
                  .map((key) => {
                    return {
                      tag: 'stop',
                      attrs: {
                        offset: key,
                        'stop-color': gradient[key],
                        'transition-duration': '.3s, .3s, .3s, .06s',
                      },
                    }
                  }),
              },
            }
          : undefined,
        {
          tag: 'path',
          classes: {
            [`${prefixCls}-circle-trail`]: true,
          },
          attrs: {
            d: pathString,
            stroke: trailColor,
            'stroke-linecap': strokeLinecap,
            'stroke-width': trailWidth || strokeWidth,
            'fill-opacity': '0',
            style: {
              ...pathStyle,
            },
          },
        },
        ...getStokeList(),
      ],
    })
  }
}

export default CirclePath
