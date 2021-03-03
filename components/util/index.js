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
  if (isPlainObject(from)) {
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

export default {
  extend,
  isFunction,
}
