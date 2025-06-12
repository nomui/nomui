export * from '../util/sortable.core.esm'
export * from './browser-version.js'

String.prototype.trim = function (characters) {
  return this.replace(new RegExp(`^${characters}+|${characters}+$`, 'g'), '')
}

String.prototype.startWith = function (str) {
  const reg = new RegExp(`^${str}`)
  return reg.test(this)
}

String.prototype.trimEnd = function (characters) {
  return this.replace(new RegExp(`${characters}+$`, 'g'), '')
}

String.prototype.prepend = function (character) {
  if (this[0] !== character) {
    return (character + this).toString()
  }

  return this.toString()
}

String.prototype.format = function (args) {
  let result = this
  if (arguments.length > 0) {
    if (arguments.length === 1 && typeof args === 'object') {
      for (const key in args) {
        if (args[key] !== undefined) {
          const reg = new RegExp(`({${key}})`, 'g')
          result = result.replace(reg, args[key])
        }
      }
    } else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) {
          const reg = new RegExp(`({)${i}(})`, 'g')
          result = result.replace(reg, arguments[i])
        }
      }
    }
  }
  return result
}

String.prototype.contains = function (search, ignoreCase = true) {
  // 转义输入的搜索字符串
  const escapedSearchString = escapeRegExp(search)
  // 创建不区分大小写的正则表达式
  const regex = new RegExp(escapedSearchString, ignoreCase ? 'igm' : 'gm')
  // 使用 exec 方法查找匹配
  return regex.test(this)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

const { toString } = Object.prototype
const OBJECT_STRING = '[object Object]'
export function isPlainObject(obj) {
  if (Object.prototype.toString.call(obj) !== OBJECT_STRING) {
    return false
  }

  const prototype = Object.getPrototypeOf(obj)
  return prototype === null || prototype === Object.prototype
}

export function isString(obj) {
  // 判断对象是否是字符串
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isFunction(val) {
  return toString.call(val) === '[object Function]'
}

// 值为 null 或 undefined
export function isNullish(val) {
  return val === null || val === undefined
}

export function localeCompareString(prev, next, field) {
  if (!prev[field] && !next[field]) {
    return 0
  }
  if (!!prev[field] && !next[field]) {
    return 1
  }
  if (!prev[field] && !!next[field]) {
    return -1
  }
  return prev[field].localeCompare(next[field], 'zh')
}

export function ascCompare(prev, next, field) {
  if (!prev[field] && !next[field]) {
    return 0
  }
  if (!!prev[field] && !next[field]) {
    return 1
  }
  if (!prev[field] && !!next[field]) {
    return -1
  }

  return `${prev[field]}`.charCodeAt() - `${next[field]}`.charCodeAt()
}

/**
 * Hyphenate a camelCase string.
 *
 * @param {String} str
 * @return {String}
 */

const hyphenateRE = /([^-])([A-Z])/g
export function hyphenate(str) {
  return str.replace(hyphenateRE, '$1-$2').replace(hyphenateRE, '$1-$2').toLowerCase()
}

export function htmlEncode(value) {
  // Create a in-memory element, set its inner text (which is automatically encoded)
  // Then grab the encoded contents back out. The element never exists on the DOM.
  const textarea = document.createElement('textarea')
  textarea.textContent = value
  return textarea.innerHTML
}

export function extend() {
  let options
  let name
  let src
  let copy
  let _clone
  let target = arguments[0] || {}
  let i = 1
  const { length } = arguments
  let deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // Skip the boolean and the target
    target = arguments[i] || {}
    i++
  }
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {}
  }

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name]
        copy = options[name]
        // Prevent never-ending loop
        if (target === copy) {
          continue
        }
        // Recurse if we're merging plain objects
        if (deep && copy && isPlainObject(copy)) {
          _clone = src && isPlainObject(src) ? src : {}
          // Never move original objects, clone them
          target[name] = extend(deep, _clone, copy)
          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  // Return the modified object
  return target
}

export function clone(from) {
  if (isPlainObject(from) || Array.isArray(from)) {
    return JSON.parse(JSON.stringify(from))
  }

  return from
}

export function accessProp(options, key) {
  if (typeof key === 'string') {
    // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
    const parts = key.split('.')
    let curOption
    key = parts.shift()
    if (parts.length) {
      curOption = options[key]
      for (let i = 0; i < parts.length - 1; i++) {
        curOption[parts[i]] = curOption[parts[i]] || {}
        curOption = curOption[parts[i]]
      }
      key = parts.pop()
      return curOption[key] === undefined ? null : curOption[key]
    }

    return options[key] === undefined ? null : options[key]
  }
}

export function pathCombine() {
  let path = ''
  const args = Array.from(arguments)

  args.forEach(function (item, index) {
    if (index > 0) {
      path += `/${item.trim('/')}`
    } else {
      path += item.trimEnd('/')
    }
  })

  return path
}

const uppercaseRegex = /[A-Z]/g
function toLowerCase(capital) {
  return `-${capital.toLowerCase()}`
}
export function normalizeKey(key) {
  return key[0] === '-' && key[1] === '-'
    ? key
    : key === 'cssFloat'
    ? 'float'
    : key.replace(uppercaseRegex, toLowerCase)
}

export function isNumeric(val) {
  const num = Number(val)
  const type = typeof val
  return (
    (val != null &&
      type !== 'boolean' &&
      (type !== 'string' || val.length) &&
      !Number.isNaN(num) &&
      Number.isFinite(num)) ||
    false
  )
}

export function newGuid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (n) {
    // eslint-disable-next-line no-bitwise
    const t = (Math.random() * 16) | 0
    // eslint-disable-next-line no-bitwise
    const i = n === 'x' ? t : (t & 3) | 8
    return i.toString(16)
  })
}

export function isPromiseLike(promiseLike) {
  return (
    promiseLike !== null &&
    (typeof promiseLike === 'object' || typeof promiseLike === 'function') &&
    typeof promiseLike.then === 'function'
  )
}

export function formatDate(date, format) {
  if (!date) {
    return null
  }

  let mydate = null

  // 直接处理 ISO 8601 日期字符串（包括时区信息）
  if (typeof date === 'string') {
    mydate = new Date(date) // 直接使用构造函数解析字符串
  } else if (typeof date === 'number') {
    mydate = new Date(date) // 时间戳
  } else if (date instanceof Date) {
    mydate = date // 已是 Date 对象
  }

  // 检查是否是有效日期
  if (Number.isNaN(mydate.getTime())) {
    throw new Error('Invalid date')
  }

  return new Date(mydate).format(format)
}

export function isDate(date) {
  return toString.call(date) === '[object Date]'
}

export function isValidDate(date) {
  // date是纯数字的话在1000-3000区间是合法年份值
  if (isNumeric(date) && date < 3000 && date > 999) {
    return true
  }
  // date非纯数字则判断是否能转换成毫秒
  if (!isNumeric(date) && isNumeric(Date.parse(date))) {
    return true
  }
  return false
}

/**
 * 解析url中的query转换成对象
 * @param {string} url 要解析的url
 * @returns Object
 */
export function parseToQuery(url) {
  // 提取url中？后面的字符串
  if (url.indexOf('?') < 0 || url.indexOf('?') === url.length - 1) {
    return {}
  }
  const queryStr = /.+\?(.+)$/.exec(url)[1]

  const queryArr = queryStr.split('&')
  const paramsObj = {}
  queryArr.forEach((param) => {
    if (/=/.test(param)) {
      // 使用= 分隔键和值
      // eslint-disable-next-line prefer-const
      let [key, val] = param.split('=')
      // 解码
      val = decodeURIComponent(val)
      // 判断是否数字，并转换
      val = /^\d+$/.test(val) ? parseFloat(val) : val
      // 如果有重复的key，则转换为数组
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else {
        paramsObj[key] = val
      }
    }
    // 没有=赋值的算作true
    else {
      paramsObj[param] = true
    }
  })

  return paramsObj
}

/**
 * 将对象转换成string query形式
 * @param {object}} obj
 * @returns
 */
export function parseToQueryString(obj) {
  const result = []
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      result.push(`${key}=${encodeURIComponent(value)}`)
    }
  }
  return result.join('&')
}

export function isFalsy(value) {
  if (value === 0) return false
  return !value
}

// 防抖函数
export function debounce(func, wait) {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      func.apply(context, args)
    }, wait)
  }
}

export function isNotEmptyArray(array) {
  return Array.isArray(array) && array.length > 0
}

export function isHexColor(str) {
  if (!isString(str)) {
    return false
  }
  const regex = /^#([0-9A-Fa-f]{3}){1,2}([0-9A-Fa-f]{2})?$/
  return regex.test(str)
}

/**
 *
 * @param {HTMLElement} el dom元素
 * @param {string} pseudo 伪类名称
 * @returns
 */
export function getStyle(el, pseudo = null) {
  // 兼容IE和火狐谷歌等的写法
  if (window.getComputedStyle) {
    return getComputedStyle(el, pseudo)
  }
  return el.currentStyle // 兼容IE的写法
}

// 处理火狐浏览器下的 sortable 拖拽打开新标签页的bug
export function defaultSortableOndrop() {
  document.body.ondrop = function (event) {
    event.preventDefault()
    event.stopPropagation()
  }
}

export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // 转义正则元字符
}

// 比较对象是否内容相同
export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true
  }

  if (typeof obj1 !== typeof obj2) {
    return false
  }

  if (isString(obj1) && isValidDate(obj1) && Date.parse(obj1) === Date.parse(obj2)) {
    return true
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // 如果两个都是数组，比较数组元素
    return compareArrays(obj1, obj2)
  }

  if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
    // 如果两个都是对象，比较对象的键值对
    const keys1 = Object.keys(obj1),
      keys2 = Object.keys(obj2)
    if (keys1.length !== keys2.length) {
      return false
    }
    for (const key of keys1) {
      if (!Object.prototype.hasOwnProperty.call(obj2, key) || !deepEqual(obj1[key], obj2[key])) {
        return false
      }
    }
    return true
  }
  // 基本类型比较
  return false
}

function compareArrays(arr1, arr2) {
  // 检查两个数组长度是否相同
  if (arr1.length !== arr2.length) {
    return false
  }
  // 创建一个包含所有元素的集合
  const set1 = new Set(arr1.map((item) => JSON.stringify(item)))
  const set2 = new Set(arr2.map((item) => JSON.stringify(item)))
  // 比较集合的大小
  if (set1.size !== set2.size) {
    return false
  }
  // 比较集合中的元素
  for (const item of set1) {
    if (!set2.has(item)) {
      return false
    }
  }
  return true
}

// 复制字符串到剪贴板
export function copyToClipboard(text) {
  if (navigator.clipboard) {
    // 使用Clipboard API
    navigator.clipboard.writeText(text)
  } else {
    // 备用方法：使用文本区域
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed' // 防止滚动
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
    } catch (err) {
      console.error('Failed to copy text', err)
    } finally {
      document.body.removeChild(textarea) // 移除文本区域
    }
  }
}

/**
 * 计算传入日期属于哪一年的第几周  (根据当前后端计算规则：本年1月1日如果不是周一，则第一周从上一年12月XX号开始；同样如果本年12月31日不是周日，则这一周不算入本年，而算作来年第一周。)
 * @param {Date} date - 传入的日期   startWeekOnMonday - 每周是否从周一到周日，否则是周日到周六
 * @returns {Object} - 返回包含年份和周数的对象，如 { year: 2023, week: 12 }
 */
export function getWeekInYear({ date, weekFormat = '{year}年{week}周', startWeekOnMonday = true }) {
  date = new Date(date)
  let year = date.getFullYear()
  const firstDayOfYear = new Date(year, 0, 1) // 本年1月1日
  // const lastDayOfYear = new Date(year, 11, 31) // 本年12月31日

  // 找到本年第一个周一或周日
  let firstWeekStart
  if (startWeekOnMonday) {
    // 第一周从本年第一个周一开始
    const firstMondayOfYear = new Date(firstDayOfYear)
    firstMondayOfYear.setDate(firstDayOfYear.getDate() + ((1 - firstDayOfYear.getDay() + 7) % 7))
    firstWeekStart = new Date(firstMondayOfYear)
  } else {
    // 第一周从本年第一个周日开始
    const firstSundayOfYear = new Date(firstDayOfYear)
    firstSundayOfYear.setDate(firstDayOfYear.getDate() + ((7 - firstDayOfYear.getDay()) % 7))
    firstWeekStart = new Date(firstSundayOfYear)
  }

  // 如果1月1日不是周一（或周日），则第一周从上一年开始
  if (startWeekOnMonday && firstDayOfYear.getDay() !== 1) {
    firstWeekStart.setDate(firstWeekStart.getDate() - 7)
  } else if (!startWeekOnMonday && firstDayOfYear.getDay() !== 0) {
    firstWeekStart.setDate(firstWeekStart.getDate() - 7)
  }

  // 如果给定日期在第一周开始之前，则属于上一年的最后一周
  if (date < firstWeekStart) {
    return { year: year - 1, week: 52 } // 假设上一年的最后一周是第52周
  }

  // 计算给定日期所在的周数
  const delta = Math.floor((date - firstWeekStart) / (7 * 24 * 60 * 60 * 1000))
  let weekNumber = delta + 1

  // 如果日期在下一年的第一周，则调整年份和周数
  if (weekNumber > 52) {
    weekNumber = 1
    year++
  }

  const dates = getWeekDates({ date })

  return {
    year,
    week: weekNumber,
    dates,
    weekText: weekFormat
      .replace('{year}', year)
      .replace('{week}', weekNumber)
      .replace('{start}', dates[0])
      .replace(`{end}`, dates[6]),
  }
}

/**
 * 根据年份和周数计算目标周的起始日期
 * @param {number} year - 年份
 * @param {number} week - 周数
 * @param {boolean} startWeekOnMonday - 是否从周一开始计算
 * @returns {Date} - 目标周的起始日期
 */
function getDateFromYearAndWeek(year, week, startWeekOnMonday) {
  // 计算本年1月1日
  const firstDayOfYear = new Date(year, 0, 1)

  // 计算本年1月1日是周几（0=周日，1=周一，...，6=周六）
  const firstDayOfYearWeekday = firstDayOfYear.getDay()

  // 计算第一周的起始日期
  const firstWeekStart = new Date(firstDayOfYear)
  if (startWeekOnMonday) {
    // 如果从周一开始
    if (firstDayOfYearWeekday !== 1) {
      // 如果1月1日不是周一，则第一周从上一年12月的最后一个周一开始
      firstWeekStart.setDate(1 - ((firstDayOfYearWeekday + 6) % 7))
    }
  } else if (firstDayOfYearWeekday !== 0) {
    // 如果1月1日不是周日，则第一周从上一年12月的最后一个周日开始
    firstWeekStart.setDate(1 - firstDayOfYearWeekday)
  }

  // 计算目标周的起始日期
  const targetWeekStart = new Date(firstWeekStart)
  targetWeekStart.setDate(firstWeekStart.getDate() + (week - 1) * 7)

  return targetWeekStart
}

/**
 * 根据年份和周数，或者直接传入的日期，计算该周对应的7天日期
 * @param {Object} params - 参数对象
 * @param {number} [params.year] - 年份
 * @param {number} [params.week] - 周数
 * @param {string} [params.date] - 日期字符串（格式：'yyyy-MM-dd'）
 * @param {boolean} [params.startWeekOnMonday=true] - 是否从周一开始计算（默认是）
 * @returns {Array} - 返回包含7天日期的数组，格式为 'yyyy-MM-dd'
 */
export function getWeekDates({ year, week, date, startWeekOnMonday = true }) {
  let targetDate

  if (date) {
    // 如果传入了日期字符串，则直接解析为 Date 对象
    targetDate = new Date(date)
    if (Number.isNaN(targetDate.getTime())) {
      throw new Error('Invalid date string')
    }
  } else if (year !== undefined && week !== undefined) {
    // 如果传入了 year 和 week，则计算目标周的起始日期
    targetDate = getDateFromYearAndWeek(year, week, startWeekOnMonday)
  } else {
    throw new Error('Invalid parameters: must provide either { year, week } or { date }')
  }

  // 获取传入日期的星期几（0=周日，1=周一，...，6=周六）
  const dayOfWeek = targetDate.getDay()

  // 计算本周的起始日期（周一或周日）
  const weekStart = new Date(targetDate)
  if (startWeekOnMonday) {
    // 如果从周一开始
    weekStart.setDate(targetDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  } else {
    // 如果从周日开始
    weekStart.setDate(targetDate.getDate() - dayOfWeek)
  }

  // 生成本周的7天日期
  return Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(weekStart)
    currentDate.setDate(weekStart.getDate() + i)
    return new Date(currentDate).format('yyyy-MM-dd') // 格式化日期
  })
}

function checkOverflowAncestor(ele, direction = 'vertical') {
  let currentElement = ele
  let overflowAncestor = null

  while (currentElement !== null && currentElement instanceof Element) {
    const style = window.getComputedStyle(currentElement)

    const hasOverflow =
      direction === 'vertical'
        ? ['auto', 'scroll'].includes(style.overflowY) ||
          ['auto', 'scroll'].includes(style.overflow)
        : ['auto', 'scroll'].includes(style.overflowX) ||
          ['auto', 'scroll'].includes(style.overflow)

    if (hasOverflow) {
      overflowAncestor = currentElement
      break
    }

    if (currentElement === document.documentElement) {
      break
    }

    currentElement = currentElement.parentNode
  }
  return overflowAncestor
}

const _nomScrollToEndCleanupMap = new WeakMap()

/**
 * 监听元素滚动到底部/右侧的事件
 * @param {Object} params - 参数对象
 * @param {Element|Object} params.target - 要监听的目标元素（或包含element属性的对象）
 * @param {Function} params.callback - 滚动到底部/右侧时触发的回调函数
 * @param {string} [params.direction='vertical'] - 滚动方向（'vertical'|'horizontal'）
 * @returns {Function} - 返回清除监听的函数
 */
export function watchScrollToEnd({ target, callback, direction = 'vertical' }) {
  if (target.element) {
    target = target.element
  }

  // 清理现有监听器
  if (_nomScrollToEndCleanupMap.has(target)) {
    _nomScrollToEndCleanupMap.get(target)()
  }

  let ele = target

  // 只有在目标本身不是滚动容器时才查找祖先
  const style = window.getComputedStyle(target)
  const isSelfScrollable =
    direction === 'vertical'
      ? ['auto', 'scroll'].includes(style.overflowY) || ['auto', 'scroll'].includes(style.overflow)
      : ['auto', 'scroll'].includes(style.overflowX) || ['auto', 'scroll'].includes(style.overflow)

  if (!isSelfScrollable) {
    ele = checkOverflowAncestor(target, direction) || target
  }

  const handleScroll = () => {
    const isAtEnd =
      direction === 'vertical'
        ? Math.abs(ele.scrollHeight - ele.scrollTop - ele.clientHeight) < 1
        : Math.abs(ele.scrollWidth - ele.scrollLeft - ele.clientWidth) < 1

    if (isAtEnd) callback()
  }

  ele.addEventListener('scroll', handleScroll)

  const cleanup = () => {
    ele.removeEventListener('scroll', handleScroll)
    _nomScrollToEndCleanupMap.delete(target)
  }

  _nomScrollToEndCleanupMap.set(target, cleanup)
  return cleanup
}

export function isTargetInViewport(target) {
  let el = target
  if (target.element) {
    el = target.element
  }
  if (!el) return false
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// 格式化svg图标，建议在控制台上使用，快速格式化成标准svg格式
export function formatSvg(svg, isColored) {
  if (!svg || typeof svg !== 'string') return ''

  // 去掉所有换行和多余空格，拼成连续字符串
  let result = svg
    .replace(/\s{2,}/g, ' ')
    .replace(/[\r\n]/g, '')
    .trim()

  // 统一设置svg标签的width和height为1em
  result = result.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
    // 移除原有width/height/fill属性
    const newAttrs = attrs
      .replace(/\swidth="[^"]*"/i, '')
      .replace(/\sheight="[^"]*"/i, '')
      .replace(/\sfill="[^"]*"/i, '')
    // 添加width和height
    return `<svg${newAttrs} width="1em" height="1em">`
  })

  if (!isColored) {
    // 给svg标签加fill="currentColor"
    result = result.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
      // 保证没有重复fill
      const newAttrs = attrs.replace(/\sfill="[^"]*"/i, '')
      return `<svg${newAttrs} fill="currentColor">`
    })
    // 删除所有非svg标签上的fill属性
    result = result.replace(/(<(?!svg\b)[^>]+)\sfill="[^"]*"/gi, '$1')
  }

  return result
}
