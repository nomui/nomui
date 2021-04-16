import { isNumeric } from '../util/index'

export const SPINNER_POSITION = {
  left: 'left',
  right: 'right',
  horizontal: 'horizontal',
}

export const STYLE = {
  DECIMAL: 'decimal',
  CURRENCY: 'currency',
  PERCENT: 'percent',
}

export function isNil(value) {
  return value == null
}

export const COMMA_REG = /,/g

// 给数字添加千分位符号
export function formatDecimal(num) {
  const isNegative = num.toString().startWith('-')
  const absoluteValue = num.toString().replace(/^-/, '')

  let result
  let decimal = ''
  let absoluteInteger = ''

  if (absoluteInteger.includes('.')) {
    ;[absoluteInteger, decimal] = absoluteValue.split('.')
  }

  const len = absoluteInteger.length
  if (len <= 3) return num.toString()

  let temp = ''
  const remainder = len % 3
  if (decimal) temp = `.${decimal}`

  if (remainder > 0) {
    result = `${absoluteInteger.slice(0, remainder)},${absoluteInteger
      .slice(remainder, len)
      .match(/\d{3}/g)
      .join(',')}${temp}`
  } else {
    result = `${absoluteInteger.slice(0, len).match(/\d{3}/g).join(',')}${temp}`
  }

  return isNegative ? `-${result}` : result
}

const CURRENCY_TO_VALUE_REG = /([^\d+-]*)([-]?)([\d,.]*)([^\d]*)/
function currencyReplacer(_match, _p1, p2, p3) {
  /*
   * US$-1,000.00
   * p1 前缀 US$
   * p2 符号 可能没有 -
   * p3 格式化数字 1,000.00
   * p4 后缀 可能没有
   *
   */
  const val = `${p2}${p3}`.replace(/,/, '')
  return isNumeric(val) ? Number(val) : null
}

// 格式化货币转数字
export function currencyToValue(curr) {
  return curr.replace(CURRENCY_TO_VALUE_REG, currencyReplacer)
}

export function precentToValue(precent) {
  const parseStr = precent.replace(/%$/, '').replace(/,/g, '')
  return isNumeric(parseStr) ? Number(parseStr) : null
}
