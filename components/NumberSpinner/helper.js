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
