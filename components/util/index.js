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
  if (typeof date === 'string') {
    const arr = date
      .replace(/\d+(?=\/[^/]+$)|\d+(?=-[^-]+$)/, function (a) {
        return parseInt(a, 10) - 1
      })
      .match(/\d+/g)
    mydate = new Date(...arr)
  } else if (typeof date === 'number') {
    mydate = new Date(date)
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
