export const CSS_PREFIX = 'nom-statistic-'

// 给数字添加千分位符号
export function formatDecimal(num, groupSeparator, decimalSeparator) {
  const isNegative = num.toString().startWith('-')
  const absoluteValue = num.toString().replace(/^-/, '')

  let result
  let decimal = ''
  let absoluteInteger = absoluteValue

  if (absoluteInteger.includes('.')) {
    ;[absoluteInteger, decimal] = absoluteValue.split('.')
  }

  const len = absoluteInteger.length
  if (len <= 3) return num.toString()

  let temp = ''
  const remainder = len % 3
  if (decimal) temp = `${decimalSeparator}${decimal}`

  if (remainder > 0) {
    result = `${absoluteInteger.slice(0, remainder)},${absoluteInteger
      .slice(remainder, len)
      .match(/\d{3}/g)
      .join(groupSeparator)}${temp}`
  } else {
    result = `${absoluteInteger.slice(0, len).match(/\d{3}/g).join(groupSeparator)}${temp}`
  }

  return isNegative ? `-${result}` : result
}
