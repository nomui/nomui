String.prototype.trim = function (characters) {
  return this.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
}

String.prototype.startWith = function (str) {
  var reg = new RegExp("^" + str)
  return reg.test(this)
}

String.prototype.trimEnd = function (characters) {
  return this.replace(new RegExp(characters + '+$', 'g'), '')
}

String.prototype.prepend = function (character) {
  if (this[0] !== character) {
    return (character + this).toString()
  }
  else {
    return this.toString()
  }
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {Boolean}
 */

var toString = Object.prototype.toString
var OBJECT_STRING = '[object Object]'
export function isPlainObject(obj) {
  if (Object.prototype.toString.call(obj) !== OBJECT_STRING) {
    return false;
  }

  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
}

export function isString(obj) { //判断对象是否是字符串
  return Object.prototype.toString.call(obj) === "[object String]";
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

var hyphenateRE = /([^-])([A-Z])/g
export function hyphenate(str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export function htmlEncode(value) {
  // Create a in-memory element, set its inner text (which is automatically encoded)
  // Then grab the encoded contents back out. The element never exists on the DOM.
  var textarea = document.createElement('textarea');
  textarea.textContent = value;
  return textarea.innerHTML;
}

export function extend() {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;

    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) {
    target = {};
  }
  // Extend D itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name];
        copy = options[name];
        // Prevent never-ending loop
        if (target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isPlainObject(copy) ||
          (copyIsArray = Array.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }
          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy);
          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  // Return the modified object
  return target;
}

export function clone(from) {
  if (isPlainObject(from)) {
    return JSON.parse(JSON.stringify(from));
  }
  else {
    return from;
  }
}

export function accessProp(options, key) {
  if (typeof key === "string") {

    // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
    var parts = key.split(".")
    var curOption
    key = parts.shift()
    if (parts.length) {
      curOption = options[key]
      for (let i = 0; i < parts.length - 1; i++) {
        curOption[parts[i]] = curOption[parts[i]] || {};
        curOption = curOption[parts[i]]
      }
      key = parts.pop()
      return curOption[key] === undefined ? null : curOption[key]
    }
    else {
      return options[key] === undefined ? null : options[key]
    }
  }
}

export function pathCombine() {
  var path = ''
  var args = Array.from(arguments)

  args.forEach(function (item, index) {
    if (index > 0) {
      path += '/' + item.trim('/')
    }
    else {
      path += item.trimEnd('/')
    }
  })

  return path
}

var uppercaseRegex = /[A-Z]/g
function toLowerCase(capital) { return "-" + capital.toLowerCase() }
export function normalizeKey(key) {
  return key[0] === "-" && key[1] === "-" ? key :
    key === "cssFloat" ? "float" :
      key.replace(uppercaseRegex, toLowerCase)
}

export function isNumeric(val) {
  var num = Number(val),
    type = typeof val;
  return val != null && type != 'boolean' &&
    (type != 'string' || val.length) &&
    !isNaN(num) && isFinite(num) || false;
}