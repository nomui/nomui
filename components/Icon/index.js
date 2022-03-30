import Icon from './Icon'
import options from './options'

Object.keys(options).forEach((cat) => {
  const icons = options[cat]

  icons.forEach((item) => {
    const { type, useCurrentColor } = item
    let { svg } = item

    svg = parseSvgFill(svg, useCurrentColor)

    svg = svg.replace(/width=('|")\w+('|")/, 'width="1em"') // 替换width
    svg = svg.replace(/height=('|")\w+('|")/, 'height="1em"') // 替换height

    Icon.add(type, svg, cat)
  })
})

/**
 * 处理 svg中的 fill参数
 * @param {*} svg
 * @param {boolean} useCurrentColor false: fill不等于 currentColor
 * @returns
 */
function parseSvgFill(svg, useCurrentColor) {
  if (useCurrentColor === false) {
    svg = svg.replace(/fill="currentColor"/, '') // useCurrentColor: false, 去掉svg中的配置
  } else if (svg.indexOf('fill=' === -1)) {
    svg = svg.replace(/<svg /, '<svg fill="currentColor"') // fill无值，加上该属性
  } else {
    svg = svg.replace(/fill=('|")\w+('|")/, 'fill="currentColor"') // fill有值 & 不为 currentColor, 替换掉
  }
  return svg
}

export default Icon
