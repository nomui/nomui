function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
/**
 *
 *       nomui v1.1.19
 *       License: MIT
 *       Copyright (c) 2021-2021, Wetrial
 *
 */ (function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      factory((global.nomui = {})));
})(this, function (exports) {
  "use strict"; // 初始化时存下浏览器的版本信息
  window.BROWSER_INFO = getBrowser();
  /**
   * 获取浏览器的版本信息
   * @returns {type: string, version: number}
   */ function getBrowser() {
    const UserAgent = navigator.userAgent.toLowerCase();
    const browserInfo = {};
    const browserArray = {
      IE: window.ActiveXObject || "ActiveXObject" in window, // IE
      Chrome:
        UserAgent.indexOf("chrome") > -1 && UserAgent.indexOf("safari") > -1, // Chrome浏览器
      Firefox: UserAgent.indexOf("firefox") > -1, // 火狐浏览器
      Opera: UserAgent.indexOf("opera") > -1, // Opera浏览器
      Safari:
        UserAgent.indexOf("safari") > -1 && UserAgent.indexOf("chrome") === -1, // safari浏览器
      Edge: UserAgent.indexOf("edge") > -1, // Edge浏览器
      QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
      WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
    };
    for (const i in browserArray) {
      if (browserArray[i]) {
        let version = "";
        if (i === "IE") {
          version = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
        } else if (i === "Chrome") {
          version = UserAgent.match(/chrome\/([\d.]+)/)[1];
        } else if (i === "Firefox") {
          version = UserAgent.match(/firefox\/([\d.]+)/)[1];
        } else if (i === "Opera") {
          version = UserAgent.match(/opera\/([\d.]+)/)[1];
        } else if (i === "Safari") {
          version = UserAgent.match(/version\/([\d.]+)/)[1];
        } else if (i === "Edge") {
          version = UserAgent.match(/edge\/([\d.]+)/)[1];
        } else if (i === "QQBrowser") {
          version = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
        }
        browserInfo.type = i;
        browserInfo.version = parseInt(version, 10);
      }
    }
    return browserInfo;
  } // 支持 position: sticky 属性的最小版本
  // 参考 https://caniuse.com/?search=sticky
  const SUPPORT_STICKY_MIN_BROWSER_VERSION_MAP = {
    Chrome: 56,
    Firefox: 59,
    Opera: 42,
    Safari: 6,
    Edge: 16,
    QQBrowser: 10,
  }; // 浏览器是否支持sticky
  function isBrowerSupportSticky() {
    if (window.BROWSER_INFO.type === "IE") return false; //
    // 低于 minVersion 版本的浏览器，都不支持
    const minVersion =
      SUPPORT_STICKY_MIN_BROWSER_VERSION_MAP[window.BROWSER_INFO.type];
    if (minVersion && minVersion > window.BROWSER_INFO.version) {
      return false;
    } // 未知的浏览器版本都默认支持
    return true;
  }
  function isChrome49() {
    return (
      window.BROWSER_INFO.type === "Chrome" &&
      window.BROWSER_INFO.version === 49
    );
  }
  String.prototype.trim = function (characters) {
    return this.replace(new RegExp(`^${characters}+|${characters}+$`, "g"), "");
  };
  String.prototype.startWith = function (str) {
    const reg = new RegExp(`^${str}`);
    return reg.test(this);
  };
  String.prototype.trimEnd = function (characters) {
    return this.replace(new RegExp(`${characters}+$`, "g"), "");
  };
  String.prototype.prepend = function (character) {
    if (this[0] !== character) {
      return (character + this).toString();
    }
    return this.toString();
  };
  String.prototype.format = function (args) {
    let result = this;
    if (arguments.length > 0) {
      if (arguments.length === 1 && typeof args === "object") {
        for (const key in args) {
          if (args[key] !== undefined) {
            const reg = new RegExp(`({${key}})`, "g");
            result = result.replace(reg, args[key]);
          }
        }
      } else {
        for (let i = 0; i < arguments.length; i++) {
          if (arguments[i] !== undefined) {
            const reg = new RegExp(`({)${i}(})`, "g");
            result = result.replace(reg, arguments[i]);
          }
        }
      }
    }
    return result;
  };
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   *
   * @param {*} obj
   * @return {Boolean}
   */ const { toString } = Object.prototype;
  const OBJECT_STRING = "[object Object]";
  function isPlainObject(obj) {
    if (Object.prototype.toString.call(obj) !== OBJECT_STRING) {
      return false;
    }
    const prototype = Object.getPrototypeOf(obj);
    return prototype === null || prototype === Object.prototype;
  }
  function isString(obj) {
    // 判断对象是否是字符串
    return Object.prototype.toString.call(obj) === "[object String]";
  }
  function isFunction(val) {
    return toString.call(val) === "[object Function]";
  } // 值为 null 或 undefined
  function isNullish(val) {
    return val === null || val === undefined;
  }
  function localeCompareString(prev, next, field) {
    if (!prev[field] && !next[field]) {
      return 0;
    }
    if (!!prev[field] && !next[field]) {
      return 1;
    }
    if (!prev[field] && !!next[field]) {
      return -1;
    }
    return prev[field].localeCompare(next[field], "zh");
  }
  function ascCompare(prev, next, field) {
    if (!prev[field] && !next[field]) {
      return 0;
    }
    if (!!prev[field] && !next[field]) {
      return 1;
    }
    if (!prev[field] && !!next[field]) {
      return -1;
    }
    return `${prev[field]}`.charCodeAt() - `${next[field]}`.charCodeAt();
  }
  /**
   * Hyphenate a camelCase string.
   *
   * @param {String} str
   * @return {String}
   */ const hyphenateRE = /([^-])([A-Z])/g;
  function hyphenate(str) {
    return str
      .replace(hyphenateRE, "$1-$2")
      .replace(hyphenateRE, "$1-$2")
      .toLowerCase();
  }
  function htmlEncode(value) {
    // Create a in-memory element, set its inner text (which is automatically encoded)
    // Then grab the encoded contents back out. The element never exists on the DOM.
    const textarea = document.createElement("textarea");
    textarea.textContent = value;
    return textarea.innerHTML;
  }
  function extend$1() {
    let options;
    let name;
    let src;
    let copy;
    let _clone;
    let target = arguments[0] || {};
    let i = 1;
    const { length } = arguments;
    let deep = false; // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target; // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    } // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name]; // Prevent never-ending loop
          if (target === copy) {
            continue;
          } // Recurse if we're merging plain objects
          if (deep && copy && isPlainObject(copy)) {
            _clone = src && isPlainObject(src) ? src : {}; // Never move original objects, clone them
            target[name] = extend$1(deep, _clone, copy); // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    } // Return the modified object
    return target;
  }
  function clone$1(from) {
    if (isPlainObject(from) || Array.isArray(from)) {
      return JSON.parse(JSON.stringify(from));
    }
    return from;
  }
  function accessProp(options, key) {
    if (typeof key === "string") {
      // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
      const parts = key.split(".");
      let curOption;
      key = parts.shift();
      if (parts.length) {
        curOption = options[key];
        for (let i = 0; i < parts.length - 1; i++) {
          curOption[parts[i]] = curOption[parts[i]] || {};
          curOption = curOption[parts[i]];
        }
        key = parts.pop();
        return curOption[key] === undefined ? null : curOption[key];
      }
      return options[key] === undefined ? null : options[key];
    }
  }
  function pathCombine() {
    let path = "";
    const args = Array.from(arguments);
    args.forEach(function (item, index) {
      if (index > 0) {
        path += `/${item.trim("/")}`;
      } else {
        path += item.trimEnd("/");
      }
    });
    return path;
  }
  const uppercaseRegex = /[A-Z]/g;
  function toLowerCase(capital) {
    return `-${capital.toLowerCase()}`;
  }
  function normalizeKey(key) {
    return key[0] === "-" && key[1] === "-"
      ? key
      : key === "cssFloat"
      ? "float"
      : key.replace(uppercaseRegex, toLowerCase);
  }
  function isNumeric(val) {
    const num = Number(val);
    const type = typeof val;
    return (
      (val != null &&
        type !== "boolean" &&
        (type !== "string" || val.length) &&
        !Number.isNaN(num) &&
        Number.isFinite(num)) ||
      false
    );
  }
  function newGuid() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (n) {
      // eslint-disable-next-line no-bitwise
      const t = (Math.random() * 16) | 0; // eslint-disable-next-line no-bitwise
      const i = n === "x" ? t : (t & 3) | 8;
      return i.toString(16);
    });
  }
  function isPromiseLike$1(promiseLike) {
    return (
      promiseLike !== null &&
      (typeof promiseLike === "object" || typeof promiseLike === "function") &&
      typeof promiseLike.then === "function"
    );
  }
  function formatDate(date, format) {
    if (!date) {
      return null;
    }
    let mydate = null;
    if (typeof date === "string") {
      const arr = date
        .replace(/\d+(?=\/[^/]+$)|\d+(?=-[^-]+$)/, function (a) {
          return parseInt(a, 10) - 1;
        })
        .match(/\d+/g);
      mydate = new Date(...arr);
    } else if (typeof date === "number") {
      mydate = new Date(date);
    }
    return new Date(mydate).format(format);
  }
  function isDate(date) {
    return toString.call(date) === "[object Date]";
  }
  function isValidDate$1(date) {
    // date是纯数字的话在1000-3000区间是合法年份值
    if (isNumeric(date) && date < 3000 && date > 999) {
      return true;
    } // date非纯数字则判断是否能转换成毫秒
    if (!isNumeric(date) && isNumeric(Date.parse(date))) {
      return true;
    }
    return false;
  }
  /**
   * 解析url中的query转换成对象
   * @param {string} url 要解析的url
   * @returns Object
   */ function parseToQuery(url) {
    // 提取url中？后面的字符串
    if (url.indexOf("?") < 0 || url.indexOf("?") === url.length - 1) {
      return {};
    }
    const queryStr = /.+\?(.+)$/.exec(url)[1];
    const queryArr = queryStr.split("&");
    const paramsObj = {};
    queryArr.forEach((param) => {
      if (/=/.test(param)) {
        // 使用= 分隔键和值
        // eslint-disable-next-line prefer-const
        let [key, val] = param.split("="); // 解码
        val = decodeURIComponent(val); // 判断是否数字，并转换
        val = /^\d+$/.test(val) ? parseFloat(val) : val; // 如果有重复的key，则转换为数组
        if (paramsObj.hasOwnProperty(key)) {
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else {
          paramsObj[key] = val;
        }
      } // 没有=赋值的算作true
      else {
        paramsObj[param] = true;
      }
    });
    return paramsObj;
  }
  /**
   * 将对象转换成string query形式
   * @param {object}} obj
   * @returns
   */ function parseToQueryString(obj) {
    const result = [];
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        result.push(`${key}=${encodeURIComponent(value)}`);
      }
    }
    return result.join("&");
  }
  function isFalsy(value) {
    if (value === 0) return false;
    return !value;
  } // 防抖函数
  function debounce(func, wait) {
    let timer = null;
    return function () {
      const context = this;
      const args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }
  function isNotEmptyArray(array) {
    return Array.isArray(array) && array.length > 0;
  }
  /**
   *
   * @param {HTMLElement} el dom元素
   * @param {string} pseudo 伪类名称
   * @returns
   */ function getStyle(el, pseudo = null) {
    // 兼容IE和火狐谷歌等的写法
    if (window.getComputedStyle) {
      return getComputedStyle(el, pseudo);
    }
    return el.currentStyle; // 兼容IE的写法
  } // 处理火狐浏览器下的 sortable 拖拽打开新标签页的bug
  function defaultSortableOndrop() {
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
  }
  var index$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    isPlainObject: isPlainObject,
    isString: isString,
    isFunction: isFunction,
    isNullish: isNullish,
    localeCompareString: localeCompareString,
    ascCompare: ascCompare,
    hyphenate: hyphenate,
    htmlEncode: htmlEncode,
    extend: extend$1,
    clone: clone$1,
    accessProp: accessProp,
    pathCombine: pathCombine,
    normalizeKey: normalizeKey,
    isNumeric: isNumeric,
    newGuid: newGuid,
    isPromiseLike: isPromiseLike$1,
    formatDate: formatDate,
    isDate: isDate,
    isValidDate: isValidDate$1,
    parseToQuery: parseToQuery,
    parseToQueryString: parseToQueryString,
    isFalsy: isFalsy,
    debounce: debounce,
    isNotEmptyArray: isNotEmptyArray,
    getStyle: getStyle,
    defaultSortableOndrop: defaultSortableOndrop,
    isBrowerSupportSticky: isBrowerSupportSticky,
    isChrome49: isChrome49,
  }); // Events
  // -----------------
  // Thanks to:
  //  - https://github.com/documentcloud/backbone/blob/master/backbone.js
  //  - https://github.com/joyent/node/blob/master/lib/events.js
  // Regular expression used to split event strings
  const eventSplitter = /\s+/; // A module that can be mixed in to *any object* in order to provide it
  // with custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = new Events();
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  function Events() {} // Bind one or more space separated events, `events`, to a `callback`
  // function. Passing `"all"` will bind the callback to all events fired.
  Events.prototype.on = function (events, callback, context) {
    if (!callback) return this;
    const cache = this.__events || (this.__events = {});
    events = events.split(eventSplitter);
    let event;
    let list;
    while ((event = events.shift())) {
      list = cache[event] || (cache[event] = []);
      list.push(callback, context);
    }
    return this;
  };
  Events.prototype.once = function (events, callback, context) {
    const that = this;
    const cb = function () {
      that.off(events, cb);
      callback.apply(context || that, arguments);
    };
    return this.on(events, cb, context);
  }; // Remove one or many callbacks. If `context` is null, removes all callbacks
  // with that function. If `callback` is null, removes all callbacks for the
  // event. If `events` is null, removes all bound callbacks for all events.
  Events.prototype.off = function (events, callback, context) {
    let cache;
    let event;
    let list;
    let i; // No events, or removing *all* events.
    if (!(cache = this.__events)) return this;
    if (!(events || callback || context)) {
      delete this.__events;
      return this;
    }
    events = events ? events.split(eventSplitter) : Object.keys(cache); // Loop through the callback list, splicing where appropriate.
    while ((event = events.shift())) {
      list = cache[event];
      if (!list) continue;
      if (!(callback || context)) {
        delete cache[event];
        continue;
      }
      for (i = list.length - 2; i >= 0; i -= 2) {
        if (
          !(
            (callback && list[i] !== callback) ||
            (context && list[i + 1] !== context)
          )
        ) {
          list.splice(i, 2);
        }
      }
    }
    return this;
  }; // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.prototype.trigger = function (events) {
    let cache;
    let event;
    let all;
    let list;
    let i;
    let len;
    const rest = [];
    let returned = true;
    if (!(cache = this.__events)) return this;
    events = events.split(eventSplitter); // Fill up `rest` with the callback arguments.  Since we're only copying
    // the tail of `arguments`, a loop is much faster than Array#slice.
    for (i = 1, len = arguments.length; i < len; i++) {
      rest[i - 1] = arguments[i];
    } // For each event, walk through the list of callbacks twice, first to
    // trigger the event, then to trigger any `"all"` callbacks.
    while ((event = events.shift())) {
      // Copy callback lists to prevent modification.
      if ((all = cache.all)) all = all.slice();
      if ((list = cache[event])) list = list.slice(); // Execute event callbacks except one named "all"
      if (event !== "all") {
        returned = triggerEvents(list, rest, this) && returned;
      } // Execute "all" callbacks.
      returned = triggerEvents(all, [event].concat(rest), this) && returned;
    }
    return returned;
  };
  Events.prototype.emit = Events.prototype.trigger; // Mix `Events` to object instance or Class function.
  Events.mixTo = function (receiver) {
    const proto = Events.prototype;
    if (isFunction(receiver)) {
      for (const key in proto) {
        if (proto.hasOwnProperty(key)) {
          receiver.prototype[key] = proto[key];
        }
      }
      Object.keys(proto).forEach(function (key) {
        receiver.prototype[key] = proto[key];
      });
    } else {
      const event = new Events();
      for (const key in proto) {
        if (proto.hasOwnProperty(key)) {
          copyProto(key, event);
        }
      }
    }
    function copyProto(key, event) {
      receiver[key] = function () {
        proto[key].apply(event, Array.prototype.slice.call(arguments));
        return this;
      };
    }
  }; // Execute callbacks
  function triggerEvents(list, args, context) {
    let pass = true;
    if (list) {
      let i = 0;
      const l = list.length;
      const a1 = args[0];
      const a2 = args[1];
      const a3 = args[2]; // call is faster than apply, optimize less than 3 argu
      // http://blog.csdn.net/zhengyinhui100/article/details/7837127
      switch (args.length) {
        case 0:
          for (; i < l; i += 2) {
            pass = list[i].call(list[i + 1] || context) !== false && pass;
          }
          break;
        case 1:
          for (; i < l; i += 2) {
            pass = list[i].call(list[i + 1] || context, a1) !== false && pass;
          }
          break;
        case 2:
          for (; i < l; i += 2) {
            pass =
              list[i].call(list[i + 1] || context, a1, a2) !== false && pass;
          }
          break;
        case 3:
          for (; i < l; i += 2) {
            pass =
              list[i].call(list[i + 1] || context, a1, a2, a3) !== false &&
              pass;
          }
          break;
        default:
          for (; i < l; i += 2) {
            pass =
              list[i].apply(list[i + 1] || context, args) !== false && pass;
          }
          break;
      }
    } // trigger will return false if one of the callbacks return false
    return pass;
  }
  class ComponentDescriptor {
    constructor(tagOrComponent, props, children, mixins) {
      this.tagOrComponent = tagOrComponent;
      this.props = props || {};
      this.children = children;
      this.mixins = Array.isArray(mixins) ? mixins : [];
    }
    getProps() {
      if (this.props instanceof ComponentDescriptor) {
        this.mixins = this.mixins.concat(this.props.mixins);
        this.props = this.props.getProps();
      }
      if (this.tagOrComponent) {
        this.props.component = this.tagOrComponent;
      }
      if (this.children) {
        this.props.children = this.children;
      }
      return this.props;
    }
  }
  const components = {};
  const MIXINS = [];
  let keySeq = 0;
  class Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "div",
        reference: document.body,
        placement: "append",
        autoRender: true,
        renderIf: true,
        animate: true,
        hidden: false,
        disabled: false,
        selected: false,
        expanded: false,
        selectable: {
          byClick: false,
          byHover: false,
          canRevert: false,
          selectedProps: null,
          unselectedProps: null,
        },
        expandable: {
          byClick: false,
          byHover: false,
          target: null,
          indicator: null,
          byIndicator: false,
          expandedProps: false,
          collapsedProps: false,
        },
        prefixClass: "nom-",
      };
      this.props = Component.extendProps(defaults, props);
      this.parent = null;
      this.root = null;
      this.rendered = false;
      this.mixins = [];
      this.firstRender = true;
      this._propStyleClasses = [];
      mixins && this._mixin(mixins);
      this._setKey();
      isFunction(this._create) && this._create();
      this.referenceComponent =
        this.props.reference instanceof Component
          ? this.props.reference
          : this.props.reference.component;
      if (this.referenceComponent) {
        if (
          this.props.placement === "append" ||
          this.props.placement === "prepend"
        ) {
          this.parent = this.referenceComponent;
        } else {
          this.parent = this.referenceComponent.parent;
        }
      }
      this.referenceElement =
        this.props.reference instanceof Component
          ? this.props.reference.element
          : this.props.reference;
      if (this.parent === null) {
        this.root = this;
      } else {
        this.root = this.parent.root;
      }
      if (this.props.ref) {
        this.props.ref(this);
      }
      this.componentType = this.__proto__.constructor.name;
      this.create();
      if (this.props.autoRender === true) {
        this.config();
        this.render();
      } else {
        this._mountPlaceHolder();
      }
    }
    create() {
      this.__handleClick = this.__handleClick.bind(this);
      this.__handleMouseEnter = this.__handleMouseEnter.bind(this);
      this.__handleMouseLeave = this.__handleMouseLeave.bind(this);
      isFunction(this._created) && this._created();
      this._callMixin("_created");
      this.props._created && this.props._created.call(this, this);
      isFunction(this.props.onCreated) &&
        this.props.onCreated({ inst: this, props: this.props });
    }
    _created() {}
    _setKey() {
      if (this.props.key) {
        this.key = this.props.key;
        if (isFunction(this.props.key)) {
          this.key = this.props.key.call(this, this);
        }
      }
      if (this.key === undefined || this.key === null) {
        this.key = `__key${++keySeq}`;
      }
    }
    config() {
      this._setExpandableProps();
      this._setSelectableProps();
      this.props._config && this.props._config.call(this, this);
      isFunction(this.props.onConfig) &&
        this.props.onConfig({ inst: this, props: this.props });
      if (this._callMixin("_config") !== false) {
        isFunction(this._config) && this._config();
      }
      this._setExpandableProps();
      this._setSelectableProps();
      this._setStatusProps();
    }
    _config() {}
    render() {
      if (this.rendered === true) {
        this.emptyChildren();
      } else {
        this._mountElement();
      }
      this._renderChildren();
      this._handleAttrs();
      this._handleStyles();
      this.props.disabled === true &&
        isFunction(this._disable) &&
        this._disable();
      this.props.selected === true &&
        isFunction(this._select) &&
        this._select();
      this.props.hidden === false && isFunction(this._show) && this._show();
      this.props.expanded === true &&
        isFunction(this._expand) &&
        this._expand();
      this._callRendered();
    }
    _callRendered() {
      this.rendered = true;
      isFunction(this._rendered) && this._rendered();
      this._callMixin("_rendered");
      isFunction(this.props._rendered) && this.props._rendered.call(this, this);
      isFunction(this.props.onRendered) &&
        this.props.onRendered({
          inst: this,
          props: this.props,
          isUpdate: this.firstRender === false,
        });
      this.firstRender = false;
    }
    _rendered() {} // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
    remove() {
      const el = this._removeCore();
      this.parent && this.parent.removeChild(this);
      el.parentNode.removeChild(el);
    }
    update(props) {
      isFunction(this._update) && this._update(props);
      this._propStyleClasses.length = 0;
      this.setProps(props);
      this._off();
      this.off();
      this.config();
      this.render();
    }
    replace(props) {
      return Component.create(
        Component.extendProps(props, { placement: "replace", reference: this })
      );
    }
    emptyChildren() {
      while (this.element.firstChild && this.element.firstChild.component) {
        this.element.firstChild.component.remove();
      }
    }
    offsetWidth() {
      return this.element.offsetWidth;
    }
    _mountPlaceHolder() {
      const { placement } = this.props;
      this._placeHolderElement = document.createElement("div");
      this._placeHolderElement.classList.add("placeholder");
      if (placement === "append") {
        this.referenceElement.appendChild(this._placeHolderElement);
      } else if (placement === "prepend") {
        this.referenceElement.insertBefore(
          this._placeHolderElement,
          this.referenceElement.firstChild
        );
      } else if (placement === "after") {
        this.referenceElement.insertAdjacentElement(
          "afterend",
          this._placeHolderElement
        );
      } else if (placement === "before") {
        this.referenceElement.insertAdjacentElement(
          "beforebegin",
          this._placeHolderElement
        );
      } else if (placement === "replace") {
        this._placeHolderElement = this.referenceElement;
      }
    }
    _mountElement() {
      const { placement } = this.props;
      this.element = document.createElement(this.props.tag);
      this.element.component = this;
      if (this._placeHolderElement) {
        this._placeHolderElement.parentNode.replaceChild(
          this.element,
          this._placeHolderElement
        );
        return;
      }
      if (placement === "append") {
        this.referenceElement.appendChild(this.element);
      } else if (placement === "prepend") {
        this.referenceElement.insertBefore(
          this.element,
          this.referenceElement.firstChild
        );
      } else if (placement === "replace") {
        if (this.referenceComponent) {
          this.referenceComponent._removeCore();
        }
        this.referenceElement.parentNode.replaceChild(
          this.element,
          this.referenceElement
        );
      } else if (placement === "after") {
        this.referenceElement.insertAdjacentElement("afterend", this.element);
      } else if (placement === "before") {
        this.referenceElement.insertAdjacentElement(
          "beforebegin",
          this.element
        );
      }
    }
    getComponent(componentOrElement) {
      return componentOrElement instanceof Component
        ? componentOrElement
        : componentOrElement.component;
    }
    getElement(componentOrElement) {
      return componentOrElement instanceof Component
        ? componentOrElement.element
        : componentOrElement;
    }
    _renderChildren() {
      const { children } = this.props;
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          if (children[i] && children[i].renderIf !== false) {
            this.appendChild(children[i]);
          }
        }
      } else if (children === 0) {
        this.appendChild(`${children}`);
      } else if (children && children.renderIf !== false) {
        this.appendChild(children);
      }
    }
    _removeCore() {
      let el = this.element;
      if (el) {
        this.emptyChildren();
      } else {
        el = this._placeHolderElement;
      }
      this.props &&
        isFunction(this.props._remove) &&
        this.props._remove.call(this, this);
      this.props &&
        isFunction(this.props.onRemove) &&
        this.props.onRemove({ inst: this, props: this.props });
      this._callMixin("_remove");
      isFunction(this._remove) && this._remove();
      this.trigger("remove");
      this._off();
      this.off();
      this.props.ref && this.props.ref(null);
      for (const p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
      return el;
    }
    _remove() {}
    _callMixin(hookType) {
      const mixinsList = [...MIXINS, ...this.mixins];
      let abort = false; // 钩子函数执行完如果return false则判定跳过后续代码
      for (let i = 0; i < mixinsList.length; i++) {
        const mixin = mixinsList[i];
        const hookContinue =
          mixin[hookType] && mixin[hookType].call(this, this);
        if (hookContinue === false) {
          abort = true;
        }
      }
      if (abort) {
        return false;
      }
    }
    setProps(newProps) {
      this.props = Component.extendProps(this.props, newProps);
    }
    assignProps(newProps) {
      this.props = Object.assign({}, this.props, newProps);
    }
    appendChild(child) {
      if (!child) {
        return;
      }
      const childDefaults = this.props.childDefaults;
      let childDefaultsProps = {};
      let childDefaultsMixins = [];
      let childProps = {};
      let childMixins = [];
      let props = {};
      let mixins = [];
      if (childDefaults) {
        if (isPlainObject(childDefaults)) {
          childDefaultsProps = childDefaults;
        } else if (childDefaults instanceof ComponentDescriptor) {
          childDefaultsProps = childDefaults.getProps();
          childDefaultsMixins = childDefaults.mixins;
        }
      }
      if (isPlainObject(child)) {
        childProps = child;
      } else if (child instanceof ComponentDescriptor) {
        childProps = child.getProps();
        childMixins = child.mixins;
      } else if (isString(child) || isNumeric(child)) {
        if (isPlainObject(childDefaults)) {
          childProps = { children: child };
        } else if (child[0] === "#") {
          this.element.innerHTML = child.slice(1);
          return;
        } else {
          this.element.textContent = child;
          return;
        }
      } else if (child instanceof DocumentFragment) {
        this.element.appendChild(child);
        return;
      }
      props = Component.extendProps({}, childDefaultsProps, childProps, {
        reference: this.element,
        placement: "append",
      });
      mixins = [...childDefaultsMixins, ...childMixins];
      const compt = Component.create(props, ...mixins);
      return compt;
    }
    prependChild(child) {
      if (!child) {
        return;
      }
      const childDefaults = this.props.childDefaults;
      let childDefaultsProps = {};
      let childDefaultsMixins = [];
      let childProps = {};
      let childMixins = [];
      let props = {};
      let mixins = [];
      if (childDefaults) {
        if (isPlainObject(childDefaults)) {
          childDefaultsProps = childDefaults;
        } else if (childDefaults instanceof ComponentDescriptor) {
          childDefaultsProps = childDefaults.getProps();
          childDefaultsMixins = childDefaults.mixins;
        }
      }
      if (isPlainObject(child)) {
        childProps = child;
      } else if (child instanceof ComponentDescriptor) {
        childProps = child.getProps();
        childMixins = child.mixins;
      } else if (isString(child) || isNumeric(child)) {
        if (isPlainObject(childDefaults)) {
          childProps = { children: child };
        } else if (child[0] === "#") {
          this.element.innerHTML = child.slice(1);
          return;
        } else {
          this.element.textContent = child;
          return;
        }
      } else if (child instanceof DocumentFragment) {
        this.referenceElement.insertBefore(
          child,
          this.referenceElement.firstChild
        );
        return;
      }
      props = Component.extendProps({}, childDefaultsProps, childProps, {
        reference: this.element,
        placement: "prepend",
      });
      mixins = [...childDefaultsMixins, ...childMixins];
      const compt = Component.create(props, ...mixins);
      return compt;
    }
    before(props) {
      if (!props) {
        return;
      }
      const { normalizedProps, mixins } = this._normalizeProps(props);
      const extNormalizedProps = Component.extendProps({}, normalizedProps, {
        reference: this.element,
        placement: "before",
      });
      return Component.create(extNormalizedProps, ...mixins);
    }
    after(props) {
      if (!props) {
        return;
      }
      let { normalizedProps, mixins } = this._normalizeProps(props);
      normalizedProps = Component.extendProps({}, normalizedProps, {
        reference: this.element,
        placement: "after",
      });
      if (this.parent && this.parent.props.childDefaults) {
        const {
          normalizedProps: childDefaultsProps,
          mixins: childDefaultsMixins,
        } = this._normalizeProps(this.parent.props.childDefaults);
        normalizedProps = Component.extendProps(
          childDefaultsProps,
          normalizedProps
        );
        mixins = [...childDefaultsMixins, ...mixins];
      }
      return Component.create(normalizedProps, ...mixins);
    }
    _normalizeProps(props) {
      let normalizedProps = {};
      let mixins = [];
      if (isPlainObject(props)) {
        normalizedProps = props;
      } else if (props instanceof ComponentDescriptor) {
        normalizedProps = props.getProps();
        mixins = props.mixins;
      } else if (isString(props) || isNumeric(props)) {
        normalizedProps = { children: props };
      }
      return { normalizedProps, mixins };
    }
    disable() {
      if (!this.rendered || this.props.disabled === true) {
        return;
      }
      this.props.disabled = true;
      this.addClass("s-disabled");
      isFunction(this._disable) && this._disable();
    }
    enable() {
      if (!this.rendered || this.props.disabled === false) {
        return;
      }
      this.props.disabled = false;
      this.removeClass("s-disabled");
      isFunction(this._enable) && this._enable();
    }
    show() {
      if (!this.rendered) {
        this.setProps({ hidden: false });
        this.config();
        this.render();
        return;
      }
      if (this.props.hidden === false) {
        return;
      }
      this.props.hidden = false;
      this.removeClass("s-hidden");
      isFunction(this._show) && this._show();
      this._callHandler(this.props.onShow);
    }
    hide() {
      if (!this.rendered || this.props.hidden === true) {
        return;
      }
      this.props.hidden = true;
      this.addClass("s-hidden");
      isFunction(this._hide) && this._hide();
      this._callHandler(this.props.onHide);
    }
    select(selectOption) {
      if (!this.rendered) {
        return;
      }
      selectOption = extend$1(
        { triggerSelect: true, triggerSelectionChange: true },
        selectOption
      );
      if (this.props.selected === false) {
        this.props.selected = true;
        this.addClass("s-selected");
        const { selectedProps } = this.props.selectable;
        if (selectedProps) {
          this.update(selectedProps);
        }
        isFunction(this._select) && this._select();
        selectOption.triggerSelect === true &&
          this._callHandler(this.props.onSelect, null, selectOption.event);
        selectOption.triggerSelectionChange === true &&
          this._callHandler(this.props.onSelectionChange);
        return true;
      }
      return false;
    }
    unselect(unselectOption) {
      if (!this.rendered) {
        return;
      }
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      if (this.props.selected === true) {
        this.props.selected = false;
        this.removeClass("s-selected");
        const { unselectedProps } = this.props.selectable;
        if (unselectedProps) {
          this.update(unselectedProps);
        }
        isFunction(this._unselect) && this._unselect();
        if (unselectOption.triggerUnselect === true && this.props) {
          this._callHandler(this.props.onUnselect, null, unselectOption.event);
        }
        if (unselectOption.triggerSelectionChange === true && this.props) {
          this._callHandler(this.props.onSelectionChange);
        }
        return true;
      }
      return false;
    }
    toggleSelect(event) {
      if (!this.rendered) return;
      const { selected, selectable } = this.props;
      if (selectable && selectable.canRevert === false && selected === true) {
        return;
      }
      this.props.selected === true
        ? this.unselect({ event: event })
        : this.select({ event });
    }
    expand() {
      if (!this.rendered) return;
      if (this.props.expanded === true) return;
      this.props.expanded = true;
      this.addClass("s-expanded");
      const expandTarget = this._getExpandTarget();
      if (expandTarget !== null && expandTarget !== undefined) {
        if (Array.isArray(expandTarget)) {
          expandTarget.forEach((t) => {
            // t.addClass('nom-expandable-animate-show')
            t.show && t.show();
          });
        } else {
          // expandTarget.addClass('nom-expandable-animate-show')
          expandTarget.show && expandTarget.show();
        }
      }
      this._expandIndicator && this._expandIndicator.expand();
      const { expandedProps } = this.props.expandable;
      if (expandedProps) {
        this.update(expandedProps);
      }
      isFunction(this._expand) && this._expand();
    }
    collapse() {
      if (!this.rendered) return;
      if (this.props.expanded === false) return;
      this.props.expanded = false;
      this.removeClass("s-expanded");
      const expandTarget = this._getExpandTarget();
      if (expandTarget !== null && expandTarget !== undefined) {
        if (Array.isArray(expandTarget)) {
          expandTarget.forEach((t) => {
            t.hide && t.hide(); // t.addClass('nom-expandable-animate-hide')
            // setTimeout(() => {
            //   t.hide && t.hide()
            //   t.removeClass('nom-expandable-animate-show')
            //   t.removeClass('nom-expandable-animate-hide')
            // }, 120)
          });
        } else {
          expandTarget.hide && expandTarget.hide(); // expandTarget.addClass('nom-expandable-animate-hide')
          // setTimeout(() => {
          //   expandTarget.hide && expandTarget.hide()
          //   expandTarget.removeClass('nom-expandable-animate-show')
          //   expandTarget.removeClass('nom-expandable-animate-hide')
          // }, 120)
        }
      }
      this._expandIndicator && this._expandIndicator.collapse();
      isFunction(this._collapse) && this._collapse();
      const { collapsedProps } = this.props.expandable;
      if (collapsedProps) {
        this.update(collapsedProps);
      }
    }
    toggleExpand() {
      this.props.expanded === true ? this.collapse() : this.expand();
    }
    toggleHidden() {
      this.props.hidden === true ? this.show() : this.hide();
    }
    addClass(className) {
      this.element.classList.add(className);
    }
    removeClass(className) {
      this.element.classList.remove(className);
    }
    _setExpandableProps() {
      const that = this;
      const { expandable, expanded } = this.props;
      if (isPlainObject(expandable)) {
        if (isPlainObject(expandable.indicator)) {
          this.setProps({
            expandable: {
              indicator: {
                expanded: expanded,
                _created: function () {
                  that._expandIndicator = this;
                },
              },
            },
          });
        }
        if (this.props.expanded) {
          if (expandable.expandedProps) {
            this.setProps(expandable.expandedProps);
          }
        } else if (expandable.collapsedProps) {
          this.setProps(expandable.collapsedProps);
        }
      }
    }
    _setSelectableProps() {
      const { selectable, selected } = this.props;
      if (isPlainObject(selectable)) {
        if (selected) {
          if (selectable.selectedProps) {
            this.setProps(selectable.selectedProps);
          }
        } else if (selectable.unselectedProps) {
          this.setProps(selectable.unselectedProps);
        }
      }
    }
    _setStatusProps() {
      const { props } = this;
      this.setProps({
        classes: {
          "s-disabled": props.disabled,
          "s-selected": props.selected,
          "s-hidden": props.hidden,
          "s-expanded": props.expanded,
        },
      });
    }
    _getExpandTarget() {
      const { target } = this.props.expandable;
      if (target === undefined || target === null) {
        return null;
      }
      if (target instanceof Component) {
        return target;
      }
      if (isFunction(target)) {
        return target.call(this, this);
      }
    }
    getExpandableIndicatorProps(expanded = null) {
      const that = this;
      const {
        indicator,
        byIndicator,
        byClick,
        byHover,
      } = this.props.expandable;
      if (expanded == null) {
        expanded = this.props.expanded;
      }
      if (indicator === undefined || indicator === null) {
        return null;
      }
      if (isPlainObject(indicator)) {
        this.setProps({
          expandable: {
            indicator: {
              expanded: expanded,
              _created: function () {
                that._expandIndicator = this;
              },
            },
          },
        });
        if (byIndicator === true) {
          if (byClick === true) {
            this.setProps({
              expandable: {
                indicator: {
                  attrs: {
                    onclick: (event) => {
                      that.toggleExpand();
                      event.stopPropagation();
                    },
                  },
                },
              },
            });
          }
          if (byHover === true) {
            this.setProps({
              expandable: {
                indicator: {
                  attrs: {
                    onmouseenter: (event) => {
                      that.expand();
                      event.stopPropagation();
                    },
                    onmouseleave: (event) => {
                      that.collapse();
                      event.stopPropagation();
                    },
                  },
                },
              },
            });
          }
        }
      }
      return this.props.expandable.indicator;
    }
    getChildren() {
      const children = [];
      for (let i = 0; i < this.element.childNodes.length; i++) {
        children.push(this.element.childNodes[i].component);
      }
      return children;
    }
    _handleAttrs() {
      this._processClick();
      this._processHover();
      for (const name in this.props.attrs) {
        const value = this.props.attrs[name];
        if (value == null) continue;
        if (name === "style") {
          this._setStyle(value);
        } else if (name[0] === "o" && name[1] === "n") {
          this._on(name.slice(2), value);
        } else if (
          name !== "list" &&
          name !== "tagName" &&
          name !== "form" &&
          name !== "type" &&
          name !== "size" &&
          name in this.element
        ) {
          this.element[name] = value == null ? "" : value;
        } else {
          this.element.setAttribute(name, value);
        }
      }
    }
    _handleStyles() {
      const { props } = this;
      const classes = [];
      let propClasses = [];
      const componentTypeClasses = this._getComponentTypeClasses(this);
      for (let i = 0; i < componentTypeClasses.length; i++) {
        const componentTypeClass = componentTypeClasses[i];
        classes.push(`${props.prefixClass}${hyphenate(componentTypeClass)}`);
      }
      propClasses = propClasses.concat(this._propStyleClasses);
      if (props.type) {
        propClasses.push("type");
      }
      if (props.uistyle) {
        propClasses.push("uistyle");
      }
      for (let i = 0; i < propClasses.length; i++) {
        const modifier = propClasses[i];
        const modifierVal = this.props[modifier];
        if (modifierVal !== null && modifierVal !== undefined) {
          if (modifierVal === true) {
            classes.push(`p-${hyphenate(modifier)}`);
          } else if (
            typeof modifierVal === "string" ||
            typeof modifierVal === "number"
          ) {
            classes.push(
              `p-${hyphenate(modifier)}-${hyphenate(String(modifierVal))}`
            );
          }
        }
      }
      if (isPlainObject(props.classes)) {
        for (const className in props.classes) {
          if (
            props.classes.hasOwnProperty(className) &&
            props.classes[className] === true
          ) {
            classes.push(className);
          }
        }
      }
      const { styles } = props;
      if (isPlainObject(styles)) {
        addStylesClass(styles);
      }
      function addStylesClass(_styles, className) {
        className = className || "";
        if (isPlainObject(_styles)) {
          for (const style in _styles) {
            if (_styles.hasOwnProperty(style)) {
              addStylesClass(_styles[style], `${className}-${style}`);
            }
          }
        } else if (Array.isArray(_styles)) {
          for (let i = 0; i < _styles.length; i++) {
            if (isString(_styles[i]) || isNumeric(_styles)) {
              classes.push(`u${className}-${_styles[i]}`);
            } else if (_styles[i] === true) {
              classes.push(`u${className}`);
            }
          }
        } else if (isString(_styles) || isNumeric(_styles)) {
          classes.push(`u${className}-${_styles}`);
        } else if (_styles === true) {
          classes.push(`u${className}`);
        }
      }
      if (classes.length) {
        const classNames = classes.join(" ");
        this.element.setAttribute("class", classNames);
      }
    }
    _processClick() {
      const { onClick, selectable, expandable } = this.props;
      if (
        onClick ||
        (selectable && selectable.byClick === true) ||
        (expandable && expandable.byClick && !expandable.byIndicator)
      ) {
        this.setProps({ attrs: { onclick: this.__handleClick } });
      }
    }
    __handleClick(event) {
      if (
        this.props._shouldHandleClick &&
        this.props._shouldHandleClick.call(this, this) === false
      ) {
        return;
      }
      if (this.props.disabled === true) {
        return;
      }
      const { onClick, selectable, expandable } = this.props;
      onClick && this._callHandler(onClick, null, event);
      if (selectable && selectable.byClick === true) {
        this.toggleSelect(event);
      }
      if (
        expandable &&
        expandable.byClick === true &&
        !expandable.byIndicator
      ) {
        this.toggleExpand();
      }
    }
    _processHover() {
      const { onClick, selectable, expandable } = this.props;
      if (
        onClick ||
        (selectable && selectable.byHover === true) ||
        (expandable && expandable.byHover && !expandable.byIndicator)
      ) {
        this.setProps({
          attrs: {
            onmouseenter: this.__handleMouseEnter,
            onmouseleave: this.__handleMouseLeave,
          },
        });
      }
    }
    __handleMouseEnter() {
      const {
        _shouldHandleClick,
        disabled,
        selectable,
        expandable,
      } = this.props;
      if (_shouldHandleClick && _shouldHandleClick.call(this, this) === false) {
        return;
      }
      if (disabled === true) {
        return;
      }
      if (selectable && selectable.byHover === true) {
        this.select();
      }
      if (expandable && expandable.byHover === true) {
        this.expand();
      }
    }
    __handleMouseLeave() {
      const {
        _shouldHandleClick,
        disabled,
        selectable,
        expandable,
      } = this.props;
      if (_shouldHandleClick && _shouldHandleClick.call(this, this) === false) {
        return;
      }
      if (disabled === true) {
        return;
      }
      if (selectable && selectable.byHover === true) {
        this.unselect();
      }
      if (expandable && expandable.byHover === true) {
        this.collapse();
      }
    }
    _callHandler(handler, argObj, event) {
      argObj = isPlainObject(argObj) ? argObj : {};
      event && (argObj.event = event);
      argObj.sender = this;
      if (handler) {
        if (isFunction(handler)) {
          return handler(argObj);
        }
        if (isString(handler) && isFunction(this.props[handler])) {
          return this.props[handler](argObj);
        }
      }
    }
    _setStyle(style) {
      const { element } = this;
      if (typeof style !== "object") {
        // New style is a string, let engine deal with patching.
        element.style.cssText = style;
      } else {
        // `old` is missing or a string, `style` is an object.
        element.style.cssText = ""; // Add new style properties
        for (const key in style) {
          const value = style[key];
          if (value != null)
            element.style.setProperty(normalizeKey(key), String(value));
        }
      }
    }
    _getComponentTypeClasses(instance) {
      const classArray = [];
      let ctor = instance.constructor;
      while (ctor && ctor.name !== "Component") {
        classArray.unshift(ctor.name);
        ctor = ctor.__proto__.prototype.constructor;
      }
      return classArray;
    }
    _on(event, callback) {
      /* if (context) {
              callback = callback.bind(context)
          }
          else {
              callback = callback.bind(this)
          } */ const cache =
        this.__htmlEvents || (this.__htmlEvents = {});
      const list = cache[event] || (cache[event] = []);
      list.push(callback);
      this.element.addEventListener(event, callback, false);
    }
    _off(event, callback) {
      let cache;
      let i; // No events, or removing *all* events.
      if (!(cache = this.__htmlEvents)) return this;
      if (!(event || callback)) {
        for (const key in this.__htmlEvents) {
          if (this.__htmlEvents.hasOwnProperty(key)) {
            const _list = this.__htmlEvents[key];
            if (!_list) continue;
            for (i = _list.length - 1; i >= 0; i -= 1) {
              this.element.removeEventListener(key, _list[i], false);
            }
          }
        }
        delete this.__htmlEvents;
        return this;
      }
      const list = cache[event];
      if (!list) return;
      if (!callback) {
        delete cache[event];
        return;
      }
      for (i = list.length - 1; i >= 0; i -= 1) {
        if (list[i] === callback) {
          list.splice(i, 1);
          this.element.removeEventListener(event, callback, false);
        }
      }
    }
    _trigger(eventName) {
      const event = new Event(eventName);
      this.element.dispatchEvent(event);
    }
    _addPropStyle(...props) {
      props.forEach((value) => {
        this._propStyleClasses.push(value);
      });
    }
    _mixin(mixins) {
      for (let i = 0; i < mixins.length; i++) {
        const mixin = mixins[i];
        if (isPlainObject(mixin) && isPlainObject(mixin.methods)) {
          for (const key in mixin.methods) {
            if (mixin.methods.hasOwnProperty(key)) {
              if (!this[key]) {
                this[key] = mixin.methods[key];
              }
            }
          }
        }
      }
      this.mixins = [...this.mixins, ...mixins];
    }
    static create(componentProps, ...mixins) {
      let componentType = componentProps.component;
      if (isString(componentType)) {
        componentType = components[componentType];
      }
      if (componentType === undefined || componentType === null) {
        componentType = Component;
      }
      return new componentType(componentProps, ...mixins);
    }
    static register(component, name) {
      if (name !== undefined) {
        components[name] = component;
      } else {
        components[component.name] = component;
      }
    }
    static extendProps(...args) {
      return extend$1(true, {}, ...args);
    }
    static mixin(mixin) {
      MIXINS.push(mixin);
    }
  }
  Component.normalizeTemplateProps = function (props) {
    if (props === null || props === undefined) {
      return null;
    }
    let templateProps = {};
    if (isString(props)) {
      templateProps.children = props;
    } else {
      templateProps = props;
    }
    return templateProps;
  };
  Component.components = components;
  Component.mixins = MIXINS;
  Object.assign(Component.prototype, Events.prototype);
  Object.defineProperty(Component.prototype, "children", {
    get: function () {
      return this.getChildren();
    },
  });
  function n$1(tagOrComponent, props, children, mixins) {
    if (arguments.length === 2) {
      return new ComponentDescriptor(null, tagOrComponent, null, props);
    }
    return new ComponentDescriptor(tagOrComponent, props, children, mixins);
  }
  let zIndex = 6666;
  function getzIndex() {
    zIndex++;
    return ++zIndex;
  }
  /* eslint-disable no-shadow */ let cachedScrollbarWidth;
  const { max } = Math;
  const { abs } = Math;
  const rhorizontal = /left|center|right/;
  const rvertical = /top|center|bottom/;
  const roffset = /[\+\-]\d+(\.[\d]+)?%?/;
  const rposition = /^\w+/;
  const rpercent = /%$/;
  function getOffsets(offsets, width, height) {
    return [
      parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
      parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1),
    ];
  }
  function parseCss(element, property) {
    return parseInt(getComputedStyle(element)[property], 10) || 0;
  }
  function isWindow(obj) {
    return obj != null && obj === obj.window;
  }
  function getScrollTop(el) {
    const hasScrollTop = "scrollTop" in el;
    return hasScrollTop
      ? el.scrollTop
      : isWindow(el)
      ? el.pageYOffset
      : el.defaultView.pageYOffset;
  }
  function getScrollLeft(el) {
    const hasScrollLeft = "scrollLeft" in el;
    return hasScrollLeft
      ? el.scrollLeft
      : isWindow(el)
      ? el.pageXOffset
      : el.defaultView.pageXOffset;
  }
  function getOffsetParent(el) {
    return el.offsetParent || el;
  }
  function setOffset(elem, coordinates) {
    const parentOffset = getOffsetParent(elem).getBoundingClientRect();
    let props = {
      top: coordinates.top - parentOffset.top,
      left: coordinates.left - parentOffset.left,
    };
    if (getOffsetParent(elem).tagName.toLowerCase() === "body") {
      props = { top: coordinates.top, left: coordinates.left };
    }
    if (getComputedStyle(elem).position === "static")
      props.position = "relative";
    elem.style.top = `${props.top}px`;
    elem.style.left = `${props.left}px`;
    elem.style.position = props.position;
  }
  function getOffset$1(elem) {
    if (
      document.documentElement !== elem &&
      !document.documentElement.contains(elem)
    )
      return { top: 0, left: 0 };
    const obj = elem.getBoundingClientRect();
    return {
      left: obj.left + window.pageXOffset,
      top: obj.top + window.pageYOffset,
      width: Math.round(obj.width),
      height: Math.round(obj.height),
    };
  }
  function getDimensions(elem) {
    if (elem.nodeType === 9) {
      return {
        width: elem.documentElement.scrollWidth,
        height: elem.documentElement.scrollHeight,
        offset: { top: 0, left: 0 },
      };
    }
    if (isWindow(elem)) {
      return {
        width: elem.innerWidth,
        height: elem.innerHeight,
        offset: { top: elem.pageYOffset, left: elem.pageXOffset },
      };
    }
    if (elem.preventDefault) {
      return {
        width: 0,
        height: 0,
        offset: { top: elem.pageY, left: elem.pageX },
      };
    }
    const elemOffset = elem.getBoundingClientRect();
    return {
      width: elem.offsetWidth,
      height: elem.offsetHeight,
      offset: {
        left: elemOffset.left + window.pageXOffset,
        top: elemOffset.top + window.pageYOffset,
      },
    };
  }
  const positionTool = {
    scrollbarWidth: function () {
      if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
      }
      const scrollDiv = document.createElement("div");
      scrollDiv.className = "modal-scrollbar-measure";
      document.body.appendChild(scrollDiv);
      const scrollbarWidth =
        scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      cachedScrollbarWidth = scrollbarWidth;
      return cachedScrollbarWidth;
    },
    getScrollInfo: function (within) {
      const overflowX =
        within.isWindow || within.isDocument
          ? ""
          : getComputedStyle(within.element).overflowX;
      const overflowY =
        within.isWindow || within.isDocument
          ? ""
          : getComputedStyle(within.element).overflowY;
      const hasOverflowX =
        overflowX === "scroll" ||
        (overflowX === "auto" && within.width < within.element.scrollWidth);
      const hasOverflowY =
        overflowY === "scroll" ||
        (overflowY === "auto" && within.height < within.element.scrollHeight);
      return {
        width: hasOverflowY ? positionTool.scrollbarWidth() : 0,
        height: hasOverflowX ? positionTool.scrollbarWidth() : 0,
      };
    },
    getWithinInfo: function (element) {
      const withinElement = element || window;
      const isElemWindow = isWindow(withinElement);
      const isDocument = !!withinElement && withinElement.nodeType === 9;
      const hasOffset = !isElemWindow && !isDocument;
      return {
        element: withinElement,
        isWindow: isElemWindow,
        isDocument: isDocument,
        offset: hasOffset ? getOffset$1(element) : { left: 0, top: 0 },
        scrollLeft: getScrollLeft(withinElement),
        scrollTop: getScrollTop(withinElement),
        width: isWindow ? withinElement.innerWidth : withinElement.offsetWidth,
        height: isWindow
          ? withinElement.innerHeight
          : withinElement.offsetHeight,
      };
    },
  };
  const positionFns = {
    fit: {
      left: function (position, data) {
        const { within } = data;
        const withinOffset = within.isWindow
          ? within.scrollLeft
          : within.offset.left;
        const outerWidth = within.width;
        const collisionPosLeft =
          position.left - data.collisionPosition.marginLeft;
        const overLeft = withinOffset - collisionPosLeft;
        const overRight =
          collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
        let newOverRight; // Element is wider than within
        if (data.collisionWidth > outerWidth) {
          // Element is initially over the left side of within
          if (overLeft > 0 && overRight <= 0) {
            newOverRight =
              position.left +
              overLeft +
              data.collisionWidth -
              outerWidth -
              withinOffset;
            position.left += overLeft - newOverRight; // Element is initially over right side of within
          } else if (overRight > 0 && overLeft <= 0) {
            position.left = withinOffset; // Element is initially over both left and right sides of within
          } else if (overLeft > overRight) {
            position.left = withinOffset + outerWidth - data.collisionWidth;
          } else {
            position.left = withinOffset;
          } // Too far left -> align with left edge
        } else if (overLeft > 0) {
          position.left += overLeft; // Too far right -> align with right edge
        } else if (overRight > 0) {
          position.left -= overRight; // Adjust based on position and margin
        } else {
          position.left = max(position.left - collisionPosLeft, position.left);
        }
      },
      top: function (position, data) {
        const { within } = data;
        const withinOffset = within.isWindow
          ? within.scrollTop
          : within.offset.top;
        const outerHeight = data.within.height;
        const collisionPosTop = position.top - data.collisionPosition.marginTop;
        const overTop = withinOffset - collisionPosTop;
        const overBottom =
          collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
        let newOverBottom; // Element is taller than within
        if (data.collisionHeight > outerHeight) {
          // Element is initially over the top of within
          if (overTop > 0 && overBottom <= 0) {
            newOverBottom =
              position.top +
              overTop +
              data.collisionHeight -
              outerHeight -
              withinOffset;
            position.top += overTop - newOverBottom; // Element is initially over bottom of within
          } else if (overBottom > 0 && overTop <= 0) {
            position.top = withinOffset; // Element is initially over both top and bottom of within
          } else if (overTop > overBottom) {
            position.top = withinOffset + outerHeight - data.collisionHeight;
          } else {
            position.top = withinOffset;
          } // Too far up -> align with top
        } else if (overTop > 0) {
          position.top += overTop; // Too far down -> align with bottom edge
        } else if (overBottom > 0) {
          position.top -= overBottom; // Adjust based on position and margin
        } else {
          position.top = max(position.top - collisionPosTop, position.top);
        }
      },
    },
    flip: {
      left: function (position, data) {
        const { within } = data;
        const withinOffset = within.offset.left + within.scrollLeft;
        const outerWidth = within.width;
        const offsetLeft = within.isWindow
          ? within.scrollLeft
          : within.offset.left;
        const collisionPosLeft =
          position.left - data.collisionPosition.marginLeft;
        const overLeft = collisionPosLeft - offsetLeft;
        const overRight =
          collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
        const myOffset =
          data.my[0] === "left"
            ? -data.elemWidth
            : data.my[0] === "right"
            ? data.elemWidth
            : 0;
        const atOffset =
          data.at[0] === "left"
            ? data.targetWidth
            : data.at[0] === "right"
            ? -data.targetWidth
            : 0;
        const offset = -2 * data.offset[0];
        let newOverRight;
        let newOverLeft;
        if (overLeft < 0) {
          newOverRight =
            position.left +
            myOffset +
            atOffset +
            offset +
            data.collisionWidth -
            outerWidth -
            withinOffset;
          if (newOverRight < 0 || newOverRight < abs(overLeft)) {
            position.left += myOffset + atOffset + offset;
          }
          position.offsetX = myOffset + atOffset + offset;
        } else if (overRight > 0) {
          newOverLeft =
            position.left -
            data.collisionPosition.marginLeft +
            myOffset +
            atOffset +
            offset -
            offsetLeft;
          if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
            position.left += myOffset + atOffset + offset;
          }
          position.offsetX = myOffset + atOffset + offset;
        }
      },
      top: function (position, data) {
        const { within } = data;
        const withinOffset = within.offset.top + within.scrollTop;
        const outerHeight = within.height;
        const offsetTop = within.isWindow
          ? within.scrollTop
          : within.offset.top;
        const collisionPosTop = position.top - data.collisionPosition.marginTop;
        const overTop = collisionPosTop - offsetTop;
        const overBottom =
          collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
        const top = data.my[1] === "top";
        const myOffset = top
          ? -data.elemHeight
          : data.my[1] === "bottom"
          ? data.elemHeight
          : 0;
        const atOffset =
          data.at[1] === "top"
            ? data.targetHeight
            : data.at[1] === "bottom"
            ? -data.targetHeight
            : 0;
        const offset = -2 * data.offset[1];
        let newOverTop;
        let newOverBottom;
        if (overTop < 0) {
          newOverBottom =
            position.top +
            myOffset +
            atOffset +
            offset +
            data.collisionHeight -
            outerHeight -
            withinOffset;
          if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
            position.top += myOffset + atOffset + offset;
          }
          position.offsetY = myOffset + atOffset + offset;
        } else if (overBottom > 0) {
          newOverTop =
            position.top -
            data.collisionPosition.marginTop +
            myOffset +
            atOffset +
            offset -
            offsetTop;
          if (newOverTop > 0 || abs(newOverTop) < overBottom) {
            position.top += myOffset + atOffset + offset;
          }
          position.offsetY = myOffset + atOffset + offset;
        }
      },
    },
    flipfit: {
      left: function () {
        positionFns.flip.left.apply(this, arguments);
        positionFns.fit.left.apply(this, arguments);
      },
      top: function () {
        positionFns.flip.top.apply(this, arguments);
        positionFns.fit.top.apply(this, arguments);
      },
    },
  };
  function position(elem, options) {
    if (!options || !options.of) {
      return;
    } // Make a copy, we don't want to modify arguments
    options = extend$1({}, options);
    const target = options.of;
    const within = positionTool.getWithinInfo(options.within);
    const scrollInfo = positionTool.getScrollInfo(within);
    const collision = (options.collision || "flip").split(" ");
    const offsets = {};
    const dimensions = getDimensions(target);
    if (target.preventDefault) {
      // Force left top to allow flipping
      options.at = "left top";
    }
    const targetWidth = dimensions.width;
    const targetHeight = dimensions.height;
    const targetOffset = dimensions.offset; // Clone to reuse original targetOffset later
    const basePosition = extend$1({}, targetOffset); // Force my and at to have valid horizontal and vertical positions
    // if a value is missing or invalid, it will be converted to center
    ["my", "at"].forEach(function (item) {
      let pos = (options[item] || "").split(" ");
      if (pos.length === 1) {
        pos = rhorizontal.test(pos[0])
          ? pos.concat(["center"])
          : rvertical.test(pos[0])
          ? ["center"].concat(pos)
          : ["center", "center"];
      }
      pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
      pos[1] = rvertical.test(pos[1]) ? pos[1] : "center"; // Calculate offsets
      const horizontalOffset = roffset.exec(pos[0]);
      const verticalOffset = roffset.exec(pos[1]);
      offsets[item] = [
        horizontalOffset ? horizontalOffset[0] : 0,
        verticalOffset ? verticalOffset[0] : 0,
      ]; // Reduce to just the positions without the offsets
      options[item] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
    }); // Normalize collision option
    if (collision.length === 1) {
      collision[1] = collision[0];
    }
    if (options.at[0] === "right") {
      basePosition.left += targetWidth;
    } else if (options.at[0] === "center") {
      basePosition.left += targetWidth / 2;
    }
    if (options.at[1] === "bottom") {
      basePosition.top += targetHeight;
    } else if (options.at[1] === "center") {
      basePosition.top += targetHeight / 2;
    }
    const atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];
    const elemWidth = elem.offsetWidth;
    const elemHeight = elem.offsetHeight;
    const marginLeft = parseCss(elem, "marginLeft");
    const marginTop = parseCss(elem, "marginTop");
    const collisionWidth =
      elemWidth + marginLeft + parseCss(elem, "marginRight") + scrollInfo.width;
    const collisionHeight =
      elemHeight +
      marginTop +
      parseCss(elem, "marginBottom") +
      scrollInfo.height;
    const position = extend$1({}, basePosition);
    const myOffset = getOffsets(
      offsets.my,
      elem.offsetWidth,
      elem.offsetHeight
    );
    if (options.my[0] === "right") {
      position.left -= elemWidth;
    } else if (options.my[0] === "center") {
      position.left -= elemWidth / 2;
    }
    if (options.my[1] === "bottom") {
      position.top -= elemHeight;
    } else if (options.my[1] === "center") {
      position.top -= elemHeight / 2;
    }
    position.left += myOffset[0];
    position.top += myOffset[1];
    const collisionPosition = { marginLeft: marginLeft, marginTop: marginTop };
    ["left", "top"].forEach(function (dir, i) {
      if (positionFns[collision[i]]) {
        positionFns[collision[i]][dir](position, {
          targetWidth: targetWidth,
          targetHeight: targetHeight,
          elemWidth: elemWidth,
          elemHeight: elemHeight,
          collisionPosition: collisionPosition,
          collisionWidth: collisionWidth,
          collisionHeight: collisionHeight,
          offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
          my: options.my,
          at: options.at,
          within: within,
          elem: elem,
        });
      }
    }); // 如果元素定位过程中发生了翻转，则将偏移数据记录在其dom属性中
    elem.setAttribute("offset-x", position.offsetX || "0");
    elem.setAttribute("offset-y", position.offsetY || "0");
    setOffset(elem, position);
  }
  class PanelBody extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(PanelBody);
  class PanelFooter extends Component {
    // constructor(props, ...mixins) {
    //     super(props, ...mixins)
    // }
  }
  Component.register(PanelFooter);
  class Icon extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Icon.defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        // eslint-disable-next-line prefer-template
        children: Icon.svgs[this.props.type]
          ? "#" + Icon.svgs[this.props.type].svg
          : null,
      });
    }
  }
  Icon.defaults = { type: "", tag: "i" };
  Icon.svgs = {};
  Icon.add = function (type, svg, cat) {
    Icon.svgs[type] = { type, svg, cat };
  };
  Component.normalizeIconProps = function (props) {
    if (props === null || props === undefined) {
      return null;
    }
    let iconProps = {};
    if (isString(props)) {
      iconProps.type = props;
    } else if (isPlainObject(props)) {
      iconProps = props;
    } else {
      return null;
    }
    iconProps.component = Icon;
    return iconProps;
  };
  Component.register(Icon);
  /* Direction */ let cat = "Direction";
  Icon.add(
    "prev",
    `<svg t="1648458859637" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3969" width="1em" height="1em"><path d="M378.24 512l418.88 418.88L704 1024 192 512l512-512 93.12 93.12z" fill="currentColor" p-id="3970"></path></svg>`,
    cat
  );
  Icon.add(
    "next",
    `<svg t="1648458872022" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4111" width="1em" height="1em"><path d="M610.88 512L192 93.12 285.12 0l512 512-512 512L192 930.88z" fill="currentColor" p-id="4112"></path></svg>`,
    cat
  );
  Icon.add(
    "angle-up",
    `<svg t="1648459016487" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4253" width="1em" height="1em"><path d="M512 378.24l-418.88 418.88L0 704l512-512 512 512-93.12 93.12z" fill="currentColor" p-id="4254"></path></svg>`,
    cat
  );
  Icon.add(
    "angle-down",
    `<svg t="1648459032734" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4395" width="1em" height="1em"><path d="M512 610.88L930.88 192 1024 285.12l-512 512-512-512L93.12 192z" fill="currentColor" p-id="4396"></path></svg>`,
    cat
  );
  Icon.add(
    "up",
    `<svg focusable="false" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"><path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>`,
    cat
  );
  Icon.add(
    "down",
    `<svg focusable="false" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"><path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>`,
    cat
  );
  Icon.add(
    "left",
    `<svg focusable="false" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>`,
    cat
  );
  Icon.add(
    "right",
    `<svg focusable="false" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>`,
    cat
  );
  Icon.add(
    "swap",
    `<svg t="1623828423357" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3532" width="1em" height="1em" fill="currentColor"><path d="M922.345786 372.183628l-39.393195 38.687114L676.138314 211.079416l0 683.909301-54.713113 0L621.425202 129.010259l53.320393 0L922.345786 372.183628zM349.254406 894.989741 101.654214 651.815349l39.393195-38.687114 206.814276 199.792349L347.861686 129.010259l54.713113 0 0 765.978459L349.254406 894.988718z" p-id="3533"></path></svg>`,
    cat
  );
  Icon.add(
    "refresh",
    `<svg t="1611710311642" viewBox="0 0 1204 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9191" width="1em" height="1em"><path d="M822.704457 813.250853a384.466659 384.466659 0 0 1-225.260731 68.644008 419.812302 419.812302 0 0 1-31.552158-1.625779c-4.214983-0.361284-8.429966-1.083853-12.705163-1.565566a430.048689 430.048689 0 0 1-24.326473-3.73327c-4.937551-0.903211-9.754675-2.167706-14.571798-3.251558-7.827825-1.806421-15.535223-3.673057-23.182407-5.900977-3.673057-1.144067-7.225685-2.408562-10.898741-3.612842a375.916265 375.916265 0 0 1-26.07268-9.453605c-1.926849-0.782783-3.793485-1.685993-5.66012-2.52899a388.862284 388.862284 0 0 1-29.324239-14.029871l-1.324709-0.602141a388.380572 388.380572 0 0 1-111.757262-91.284488c-1.505351-1.806421-3.010702-3.853699-4.516053-5.720334a376.518405 376.518405 0 0 1-84.359873-237.243325h89.23721c2.288134 0 4.516053-1.204281 5.720334-3.371987a6.081618 6.081618 0 0 0-0.30107-6.442902l-149.932965-222.671528a6.563331 6.563331 0 0 0-10.838527 0L1.023639 491.467012a6.202046 6.202046 0 0 0-0.30107 6.503116c1.204281 2.107491 3.4322 3.311772 5.720334 3.311773H95.740327a494.357286 494.357286 0 0 0 89.598495 283.969422c0.722569 1.144067 1.204281 2.348348 1.926849 3.4322 5.900976 8.309538 12.343879 15.896507 18.666353 23.724333 2.288134 3.010702 4.516053 6.021404 6.924615 8.911678a511.819358 511.819358 0 0 0 29.083382 31.672586c1.023639 1.023639 1.866635 2.047277 2.83006 2.950488a499.294837 499.294837 0 0 0 153.967306 103.929437c3.070916 1.324709 6.081618 2.769846 9.272962 4.094555 10.718099 4.395625 21.677055 8.18911 32.756439 11.862166 5.238622 1.806421 10.417029 3.612843 15.655651 5.178408 9.754675 2.83006 19.629778 5.178408 29.504881 7.586969 6.623545 1.505351 13.247089 3.13113 19.991062 4.395625 2.709632 0.60214 5.419264 1.384923 8.128895 1.806422 9.393391 1.685993 18.846995 2.589204 28.240386 3.73327 3.371986 0.361284 6.743973 0.963425 10.115959 1.324709 16.920146 1.625779 33.719864 2.709632 50.579796 2.709632 102.905798 0 203.282606-31.13066 289.4489-90.923204a59.792544 59.792544 0 0 0 14.933082-83.697518 61.117253 61.117253 0 0 0-84.660943-14.75244z m285.595202-311.908738a494.4175 494.4175 0 0 0-89.176996-283.307069c-0.842997-1.384923-1.445137-2.769846-2.288134-4.03434-7.045043-9.875103-14.632012-19.087851-22.158768-28.3006l-2.649417-3.371987a500.318476 500.318476 0 0 0-189.072093-140.539574l-5.96119-2.709632a599.009291 599.009291 0 0 0-35.586499-12.885805c-4.395625-1.445137-8.670822-3.010702-13.066447-4.275197A492.731507 492.731507 0 0 0 716.547101 13.789016C710.525697 12.404093 704.684935 10.958956 698.723745 9.814889c-3.010702-0.60214-5.780548-1.445137-8.731037-1.987064-7.948254-1.384923-16.016935-1.987063-24.025402-3.010702-5.539692-0.662354-11.01917-1.505351-16.558862-2.107491a540.481242 540.481242 0 0 0-40.162766-1.987063c-2.408562 0-4.817123-0.361284-7.225685-0.361285l-1.324709 0.120428a505.797954 505.797954 0 0 0-289.027402 90.501706 59.73233 59.73233 0 0 0-14.933083 83.697518c19.268493 27.216747 57.20334 33.840292 84.660944 14.75244A384.466659 384.466659 0 0 1 604.789839 120.789368c11.500882 0.060214 22.760908 0.60214 33.840292 1.62578l10.236387 1.324709c9.152534 1.083853 18.244855 2.408562 27.156533 4.154768 3.913913 0.722569 7.827825 1.746207 11.681524 2.589204 8.79125 1.987063 17.522286 4.094555 26.132894 6.623545 2.709632 0.842997 5.35905 1.806421 8.008468 2.709632 9.875103 3.13113 19.449136 6.623545 28.90274 10.477243l2.890274 1.204281c56.6012 24.145831 106.277784 61.297895 144.995413 107.662707l0.722569 0.963425a376.458191 376.458191 0 0 1 87.430789 241.157239h-89.23721a6.503117 6.503117 0 0 0-5.720334 3.371986 6.141832 6.141832 0 0 0 0.30107 6.442902l149.993179 222.671528a6.442903 6.442903 0 0 0 5.419263 2.83006c2.22792 0 4.214983-1.083853 5.419264-2.83006l149.932965-222.671528a6.202046 6.202046 0 0 0 0.30107-6.442902 6.503117 6.503117 0 0 0-5.720334-3.371986h-89.176996z" p-id="9192"></path></svg>`,
    cat
  );
  /* Prompt */ cat = "Prompt";
  Icon.add(
    "info-circle",
    `<svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"></path></svg>`,
    cat
  );
  Icon.add(
    "question-circle",
    `<svg viewBox="64 64 896 896" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>`,
    cat
  );
  Icon.add(
    "exclamation-circle",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path></svg>`,
    cat
  );
  Icon.add(
    "close-circle",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 .3L512 465.6l-99.3-118.4-66.1-.3c-4.4 0-8 3.5-8 8 0 1.9.7 3.7 1.9 5.2l130.1 155L340.5 670a8.32 8.32 0 00-1.9 5.2c0 4.4 3.6 8 8 8l66.1-.3L512 564.4l99.3 118.4 66 .3c4.4 0 8-3.5 8-8 0-1.9-.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"></path><path d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`,
    cat
  );
  Icon.add(
    "check-circle",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"></path><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path></svg>`,
    cat
  );
  Icon.add(
    "check",
    `<svg viewBox="64 64 896 896"  focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474c-6.1-7.7-15.3-12.2-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1 0.4-12.8-6.3-12.8z" p-id="4091"></path></svg>`,
    cat
  );
  Icon.add(
    "question-circle",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="question-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>`,
    cat
  );
  Icon.add(
    "close",
    `<svg t="1610503666305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" p-id="2041" width="1em" height="1em"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2042"></path></svg>`,
    cat
  );
  Icon.add(
    "ellipsis",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>`,
    cat
  );
  Icon.add(
    "eye",
    `<svg focusable="false" class="" data-icon="eye" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path></svg>`,
    cat
  );
  Icon.add(
    "eye-invisible",
    `<svg focusable="false" class="" data-icon="eye-invisible" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896"><path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"></path><path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"></path></svg>`,
    cat
  );
  Icon.add(
    "pin",
    `<svg t="1639617300925" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6674"  fill="currentColor" width="1em" height="1em"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z m-25.450666 58.730667l-30.549334 70.464-134.826666 135.04-149.973334 11.157333 265.408 265.6 10.538667-146.474667 136.704-136.874666 70.336-31.146667-167.637333-167.765333z" p-id="6675"></path></svg>`,
    cat
  );
  Icon.add(
    "pin-fill",
    `<svg t="1639617366341" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6806"  fill="currentColor" width="1em" height="1em"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z" p-id="6807"></path></svg>`,
    cat
  );
  Icon.add(
    "drag",
    `<svg t="1640832231565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4362" fill="currentColor" width="1em" height="1em"><path d="M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4363"></path><path d="M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4364"></path><path d="M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4365"></path><path d="M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4366"></path><path d="M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4367"></path><path d="M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="4368"></path></svg>`,
    cat
  );
  Icon.add(
    "sort",
    `<svg t="1648697046294" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2976" width="1em" height="1em"><path d="M788.8384 580.2496c31.6416 0 39.5776 32.768 18.944 53.9648l-267.776 275.968a40.2432 40.2432 0 0 1-56.1152 0l-267.7248-275.968c-20.5824-21.1968-12.5952-53.9648 18.944-53.9648z m-248.832-466.432l267.776 275.968c20.6336 21.1968 12.6976 53.9648-18.944 53.9648H235.1104c-31.5392 0-39.5264-32.768-18.944-53.9648l267.7248-275.968a40.2432 40.2432 0 0 1 56.1664 0z" fill="currentColor" p-id="2977"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-down",
    `<svg t="1648705739912" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8280" width="1em" height="1em"><path d="M804.571429 402.285714a36.205714 36.205714 0 0 1-10.861715 25.709715l-256 256C530.870857 690.834286 521.691429 694.857143 512 694.857143s-18.870857-3.986286-25.709714-10.861714l-256-256A36.425143 36.425143 0 0 1 219.428571 402.285714c0-20.004571 16.566857-36.571429 36.571429-36.571428h512c20.004571 0 36.571429 16.566857 36.571429 36.571428z" fill="currentColor" p-id="8281"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-up",
    `<svg t="1648705802934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8415" width="1em" height="1em"><path d="M804.571429 694.857143c0 20.004571-16.566857 36.571429-36.571429 36.571428H256c-20.004571 0-36.571429-16.566857-36.571429-36.571428a36.205714 36.205714 0 0 1 10.861715-25.709714l256-256C493.129143 406.308571 502.308571 402.285714 512 402.285714s18.870857 3.986286 25.709714 10.861715l256 256A36.425143 36.425143 0 0 1 804.571429 694.857143z" fill="currentColor" p-id="8416"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-right",
    `<svg t="1648705834389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8550" width="1em" height="1em"><path d="M676.571429 512a36.205714 36.205714 0 0 1-10.861715 25.709714l-256 256A36.425143 36.425143 0 0 1 384 804.571429c-20.004571 0-36.571429-16.566857-36.571429-36.571429V256c0-20.004571 16.566857-36.571429 36.571429-36.571429a36.205714 36.205714 0 0 1 25.709714 10.861715l256 256A36.425143 36.425143 0 0 1 676.571429 512z" fill="currentColor" p-id="8551"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-left",
    `<svg t="1648705869847" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8685" width="1em" height="1em"><path d="M676.571429 256v512c0 20.004571-16.566857 36.571429-36.571429 36.571429a36.205714 36.205714 0 0 1-25.709714-10.861715l-256-256C351.451429 530.870857 347.428571 521.691429 347.428571 512s3.986286-18.870857 10.861715-25.709714l256-256A36.425143 36.425143 0 0 1 640 219.428571c20.004571 0 36.571429 16.566857 36.571429 36.571429z" fill="currentColor" p-id="8686"></path></svg>`,
    cat
  );
  Icon.add(
    "filter",
    `<svg t="1621992626834" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3088" width="1em" height="1em" fill="currentColor" ><path d="M426.666667 597.333333L170.666667 213.333333V128h682.666666v85.333333l-256 384v256l-170.666666 85.333334z" p-id="3089"></path></svg>`,
    cat
  );
  Icon.add(
    "filter-remove",
    `<svg t="1621992691799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3229" width="1em" height="1em" fill="currentColor" ><path d="M295.637333 21.973333L898.986667 625.365333l-60.330667 60.330667-163.114667-163.072L597.333333 640v298.666667h-170.666666v-298.666667L170.666667 256H128V170.666667h195.626667l-88.32-88.362667L295.637333 21.973333zM896 170.666667v85.333333h-42.666667l-81.706666 122.538667L563.754667 170.666667H896z" p-id="3230"></path></svg>`,
    cat
  );
  Icon.add(
    "setting",
    `<svg t="1615863726011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3943" width="1em" height="1em"><path d="M785.183686 139.674311c-14.716642-25.494575-50.839308-46.344043-80.272592-46.344044H326.227815c-29.433284 0-65.55595 20.849468-80.272592 46.344044L56.618935 467.614608c-14.716642 25.494575-14.716642 67.193511 0 92.688087l189.336288 327.951c14.716642 25.494575 50.839308 46.344043 80.272592 46.344043h378.683279c29.433284 0 65.55595-20.849468 80.272592-46.344043L974.530677 560.302695c14.716642-25.494575 14.716642-67.193511 0-92.688087L785.183686 139.674311zM741.932814 813.332609c-14.716642 25.494575-50.839308 46.344043-80.272593 46.344043H369.478688c-29.433284 0-65.55595-20.849468-80.272592-46.344043l-146.074712-253.019211c-14.716642-25.494575-14.716642-67.193511 0-92.688087L289.206096 214.595397c14.716642-25.494575 50.839308-46.344043 80.272592-46.344043H661.660221c29.433284 0 65.55595 20.849468 80.272593 46.344043l146.096118 253.019211c14.716642 25.494575 14.716642 67.193511 0 92.688087L741.932814 813.332609z" fill="currentColor" p-id="3944"></path><path d="M515.574806 358.743567c-85.731129 0-155.225788 69.494659-155.225787 155.225787s69.494659 155.225788 155.225787 155.225788 155.225788-69.494659 155.225788-155.225788-69.494659-155.225788-155.225788-155.225787z m0 235.519786c-44.278362 0-80.304701-36.026339-80.304701-80.304702s36.026339-80.304701 80.304701-80.304701 80.304701 36.026339 80.304701 80.304701-36.026339 80.304701-80.304701 80.304702z" fill="currentColor" p-id="3945"></path></svg>`,
    cat
  );
  Icon.add(
    "resize-handler",
    `<svg t="1616466190070" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2516" width="1em" height="1em"><path d="M938.666667 938.666667 853.333333 938.666667 853.333333 853.333333 938.666667 853.333333 938.666667 938.666667M938.666667 768 853.333333 768 853.333333 682.666667 938.666667 682.666667 938.666667 768M768 938.666667 682.666667 938.666667 682.666667 853.333333 768 853.333333 768 938.666667M768 768 682.666667 768 682.666667 682.666667 768 682.666667 768 768M597.333333 938.666667 512 938.666667 512 853.333333 597.333333 853.333333 597.333333 938.666667M938.666667 597.333333 853.333333 597.333333 853.333333 512 938.666667 512 938.666667 597.333333Z"  fill="currentColor" p-id="2517"></path></svg>`,
    cat
  );
  Icon.add(
    "plus-square",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="plus-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>`,
    cat
  );
  Icon.add(
    "minus-square",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="minus-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"></path><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z"></path></svg>`,
    cat
  );
  /* Editor */ cat = "Editor";
  Icon.add(
    "form",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="form" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M904 512h-56c-4.4 0-8 3.6-8 8v320H184V184h320c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z"></path><path d="M355.9 534.9L354 653.8c-.1 8.9 7.1 16.2 16 16.2h.4l118-2.9c2-.1 4-.9 5.4-2.3l415.9-415c3.1-3.1 3.1-8.2 0-11.3L785.4 114.3c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-415.8 415a8.3 8.3 0 00-2.3 5.6zm63.5 23.6L779.7 199l45.2 45.1-360.5 359.7-45.7 1.1.7-46.4z"></path></svg>`,
    cat
  );
  Icon.add(
    "plus",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>`,
    cat
  );
  Icon.add(
    "minus",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M896 469.333333H128a42.666667 42.666667 0 0 0 0 85.333334h768a42.666667 42.666667 0 0 0 0-85.333334z" p-id="4498"></path></svg>`,
    cat
  );
  Icon.add(
    "edit",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg>`,
    cat
  );
  Icon.add(
    "delete",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>`,
    cat
  );
  Icon.add(
    "blank-square",
    `<svg t="1609925372510" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1811" width="1em" height="1em"><path d="M845 179v666H179V179h666m0-64H179c-35.3 0-64 28.7-64 64v666c0 35.3 28.7 64 64 64h666c35.3 0 64-28.7 64-64V179c0-35.3-28.7-64-64-64z" p-id="1812"></path></svg>`,
    cat
  );
  Icon.add(
    "checked-square",
    `<svg t="1609925474194" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2089" width="1em" height="1em"><path d="M844 116H180c-35.3 0-64 28.7-64 64v664c0 35.3 28.7 64 64 64h664c35.3 0 64-28.7 64-64V180c0-35.3-28.7-64-64-64z m0 728H180V180h664v664z" p-id="2090"></path><path d="M433.4 670.6c6.2 6.2 14.4 9.4 22.6 9.4s16.4-3.1 22.6-9.4l272-272c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L456 602.7 342.6 489.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l136.1 135.9z" p-id="2091"></path></svg>`,
    cat
  );
  Icon.add(
    "half-square",
    `<svg t="1609936930955" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1365" width="1em" height="1em"><path d="M844 116H180c-35.3 0-64 28.7-64 64v664c0 35.3 28.7 64 64 64h664c35.3 0 64-28.7 64-64V180c0-35.3-28.7-64-64-64z m0 728H180V180h664v664z" p-id="1366"></path><path d="M320 544h384c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-17.7 0-32 14.3-32 32s14.3 32 32 32z" p-id="1367"></path></svg>`,
    cat
  );
  Icon.add(
    "times",
    `<svg t="1610503666305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2041" width="1em" height="1em" fill="currentColor"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2042"></path></svg>`,
    cat
  );
  Icon.add(
    "search",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="search" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>`,
    cat
  );
  /* Logo */ cat = "Logo";
  Icon.add(
    "github",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="github" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></svg>`,
    cat
  );
  Icon.add(
    "nomui",
    `<svg width="1em" height="1em" version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve"><rect y="0" fill="none" width="64" height="64"/><g><polygon fill="currentColor" points="12.78,5.61 0,58.39 13.78,58.39 20.17,30.17 26.56,58.39 39.51,58.39 52.21,5.61 39.01,5.61 33.12,30.92 26.89,5.61"/><polygon fill="currentColor" points="56.85,32.83 50.88,58.39 64,58.39 	"/></g></svg>`,
    cat
  );
  /* Uncategorized */ cat = "Uncategorized";
  Icon.add(
    "clock",
    `<svg t="1614131772688" class="icon" viewBox="0 0 1024 1024" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" p-id="2901" width="1em" height="1em"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z" p-id="2902"></path><path d="M695.466667 567.466667l-151.466667-70.4V277.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v238.933334c0 12.8 6.4 23.466667 19.2 29.866666l170.666667 81.066667c4.266667 2.133333 8.533333 2.133333 12.8 2.133333 12.8 0 23.466667-6.4 29.866666-19.2 6.4-14.933333 0-34.133333-17.066666-42.666666z" p-id="2903"></path></svg>`,
    cat
  );
  Icon.add(
    "calendar",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>`,
    cat
  );
  Icon.add(
    "image",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="file-image" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M553.1 509.1l-77.8 99.2-41.1-52.4a8 8 0 00-12.6 0l-99.8 127.2a7.98 7.98 0 006.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 00-12.7 0zM360 442a40 40 0 1080 0 40 40 0 10-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>`,
    cat
  );
  Icon.add(
    "table",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="table" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 208H676V232h212v136zm0 224H676V432h212v160zM412 432h200v160H412V432zm200-64H412V232h200v136zm-476 64h212v160H136V432zm0-200h212v136H136V232zm0 424h212v136H136V656zm276 0h200v136H412V656zm476 136H676V656h212v136z"></path></svg>`,
    cat
  );
  Icon.add(
    "profile",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="profile" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM492 400h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zm0 144h184c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H492c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8zM340 368a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0zm0 144a40 40 0 1080 0 40 40 0 10-80 0z"></path></svg>`,
    cat
  );
  Icon.add(
    "user",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>`,
    cat
  );
  Icon.add(
    "hospital",
    `<svg t="1638944150401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4298" id="mx_n_1638944150402" width="1em" height="1em"><path d="M597.333333 85.333333H187.733333a102.4 102.4 0 0 0-102.4 102.4v682.666667a68.266667 68.266667 0 0 0 68.266667 68.266667h512a34.133333 34.133333 0 0 0 34.133333-34.133334V187.733333a102.4 102.4 0 0 0-102.4-102.4z m2.56 68.352A34.133333 34.133333 0 0 1 631.466667 187.733333v682.666667H153.6V187.733333a34.133333 34.133333 0 0 1 34.133333-34.133333h409.6l2.56 0.085333z" fill="#444444" p-id="4299"></path><path d="M870.4 426.666667H665.6a34.133333 34.133333 0 0 0-34.133333 34.133333v443.733333a34.133333 34.133333 0 0 0 34.133333 34.133334h204.8a68.266667 68.266667 0 0 0 68.266667-68.266667V494.933333a68.266667 68.266667 0 0 0-68.266667-68.266666zM699.733333 870.4V494.933333h170.666667v375.466667H699.733333z" fill="#444444" p-id="4300"></path><path d="M426.666667 290.133333v136.533334h136.533333v68.266666h-136.533333v136.533334h-68.266667v-136.533334h-136.533333v-68.266666h136.533333v-136.533334h68.266667z" fill="#00B386" p-id="4301"></path></svg>`,
    cat
  );
  Icon.add(
    "company",
    `<svg t="1638944443633" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6346" width="1em" height="1em"><path d="M956.624449 922.846357h-29.442936V592.832598c0-17.701887-8.850944-41.545246-29.984829-50.396189l-267.334627-174.851297V93.747751l-2.890104-6.141471C614.869642 57.802081 588.316811 42.809667 555.622508 48.770506L136.376786 173.586876c-23.843359 8.850944-41.545246 32.694302-41.545246 59.427765v689.831716H64.84671c-18.243782 0-29.98483 14.992415-29.98483 29.98483 0 18.243782 12.102311 29.98483 29.98483 29.98483h891.777739c18.243782 0 29.98483-12.102311 29.98483-29.98483-0.180632-18.243782-12.282942-29.98483-29.98483-29.98483z m-89.231964-333.265126v333.265126H629.862057V435.683189l237.530428 153.898042zM153.536779 233.014641l415.994355-124.81637v814.648086H153.536779V233.014641z" p-id="6347"></path><path d="M450.856236 325.136708H272.753572c-18.243782 0-29.98483 11.741048-29.98483 29.98483 0 18.243782 12.102311 29.98483 29.98483 29.98483h178.102664c18.243782 0 29.98483-11.741048 29.984829-29.98483 0-18.424413-12.282942-29.98483-29.984829-29.98483zM450.856236 503.058741H272.753572c-18.243782 0-29.98483 12.102311-29.98483 29.984829v0.361263c0 18.243782 12.102311 29.98483 29.98483 29.98483h178.102664c18.243782 0 29.98483-12.102311 29.984829-29.98483v-0.180631-0.180632c0-18.243782-12.282942-29.98483-29.984829-29.984829zM450.856236 681.703299H272.753572c-18.243782 0-29.98483 11.741048-29.98483 29.984829v0.361263c0 18.243782 12.102311 29.98483 29.98483 29.98483h178.102664c18.243782 0 29.98483-11.741048 29.984829-29.98483v-0.180631-0.180632c0-18.243782-12.282942-29.98483-29.984829-29.984829zM688.747927 712.049391c0 18.243782 12.102311 29.98483 29.98483 29.98483h59.427765c18.243782 0 29.98483-11.741048 29.98483-29.98483v-0.180631-0.180632c0-18.243782-12.102311-29.98483-29.98483-29.984829h-59.427765c-18.243782 0-29.98483 11.741048-29.98483 29.984829v0.361263z" p-id="6348"></path></svg>`,
    cat
  );
  Icon.add(
    "image-pending",
    `<svg t="1655976918344" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4066" width="1em" height="1em"><path d="M766.112 289.888s103.328-1.024 103.328 101.28c0 0 9.568 99.04-103.328 101.216 0 0-101.152 2.176-100.128-101.216 0.032-0.064-1.088-91.744 100.128-101.28z m203.552-155.616S1024.032 138.528 1024.032 186.464v714.912s-3.232 51.136-54.368 52.256v-819.36zM0 901.44s2.176 52.256 52.256 52.256h917.408V802.4h-100l-203.68-206.752-153.44 154.432L303.712 492.32 98.08 800.288l-45.76 1.024-1.152-614.752H0.032l-0.032 714.88z m969.664-767.168H52.256S0 133.184 0 186.464h969.664v-52.192z" fill="currentColor" p-id="4067"></path></svg>`,
    cat
  );
  Icon.add(
    "image-fail",
    `<svg t="1655976783496" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2264" width="1em" height="1em"><path d="M696.43 465.25c40.61 0 73.53-32.72 73.53-73.09s-32.96-73.08-73.53-73.08-73.54 32.72-73.54 73.08 32.92 73.09 73.54 73.09zM535.74 650.62l-273.61-259.4a56.19 56.19 0 0 0-15.36 11.58l-114 119.63-6-222.77c-0.73-26.82 20.84-49.41 47.67-50.14l201.77-5.44 47.34-50-250.43 6.75C119 202.33 76.33 247.17 77.78 301l7.32 271.4 4.5 166.78C91.06 793 136.05 835.47 190.2 834l176-4.75 12-0.32 47.34-50 116.18-122.64z" p-id="2265" fill="currentColor"></path><path d="M861.71 214.8l-242.83-33.86-55.09 41.46L855 263a49.05 49.05 0 0 1 41.79 55.13l-54.33 389.59-120.87-159.05A59.86 59.86 0 0 0 638.06 537l-44 33.08 65.07 86.15L603.84 698l-79.57 60.1-54.92 41.48 34.17 4.76 270.73 37.76a97.55 97.55 0 0 0 109.88-79.6 22.37 22.37 0 0 0 0.65-3.44l60.53-434.16c7.44-53.32-29.95-102.62-83.6-110.1z" p-id="2266" fill="currentColor"></path></svg>`,
    cat
  );
  Icon.add(
    "sandbox",
    `<svg t="1653360277625" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2488" width="1em" height="1em"><path d="M709.6 210l0.4-0.2h0.2L512 96 313.9 209.8h-0.2l0.7 0.3L151.5 304v416L512 928l360.5-208V304l-162.9-94zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3v313.4zM238.2 321.5l134.7-77.8 138.9 79.7 139.1-79.9 135.2 78-273.9 158-274-158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1v175.2z" p-id="2489"></path></svg>`
  );
  /* common */ cat = "Common";
  Icon.add(
    "cloud-upload",
    `<svg t="1655198146842" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2389" width="1em" height="1em"><path d="M767.9 441c-24.2-121.3-128-214-255.9-214-100.3 0-186.7 57.1-228.2 142.7C176.5 383.9 97 473.1 97 583.7c0 117.7 93.4 213.9 207.5 213.9H754c96.8 0 172.9-78.5 172.9-178.3 0.1-92.7-72.5-171.2-159-178.3zM581.2 542.3V672c0 7.2-5.8 13-13 13H455.8c-7.2 0-13-5.8-13-13V542.3h-73.1c-11.5 0-17.3-13.8-9.3-22l142.3-146.7c5.1-5.3 13.5-5.3 18.6 0l142.3 146.7c8 8.2 2.1 22-9.3 22h-73.1z" p-id="2390" fill="currentColor"></path></svg>`,
    cat
  );
  Icon.add(
    "upload",
    `<svg t="1648175489426" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8288" fill="currentColor" width="1em" height="1em"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163c-3.2-4.1-9.4-4.1-12.6 0l-112 141.7c-4.1 5.3-0.4 13 6.3 13z" p-id="8289"></path><path d="M878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" p-id="8290"></path></svg>`,
    cat
  );
  Icon.add(
    "download",
    `<svg t="1648175417253" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6484" fill="currentColor" width="1em" height="1em"><path d="M505.7 661c3.2 4.1 9.4 4.1 12.6 0l112-141.7c4.1-5.2 0.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8z" p-id="6485"></path><path d="M878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" p-id="6486"></path></svg>`,
    cat
  );
  /** star */ Icon.add(
    "star",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path></svg>`,
    cat
  );
  /* Loading */ cat = "Loading";
  Icon.add(
    "loading",
    `<svg width="1em" height="1em" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50" xml:space="preserve"><path fill='#4263eb' d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>`,
    cat
  );
  /* FileType */ cat = "FileType"; // Icon.add(
  //   'default',
  //   `<svg t="1609743512982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26933" width="1em" height="1em"><path d="M0 0h1024v1024H0z" fill="#D8D8D8" fill-opacity="0" p-id="26934"></path><path d="M553.356 187.733L768 402.823v342.649c0 40.719-33.01 73.728-73.728 73.728H329.728c-40.719 0-73.728-33.01-73.728-73.728v-484.01c0-40.72 33.01-73.729 73.728-73.729h223.628z" fill="#DBDFE7" p-id="26935"></path><path d="M549.85 187.733L768 405.883v3.717H644.437c-54.291 0-98.304-44.012-98.304-98.304V187.733h3.716z" fill="#C0C4CC" p-id="26936"></path></svg>`,
  //   cat,
  // )
  Icon.add(
    "file-error",
    `<svg t="1609815861438" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2630" width="1em" height="1em"><path d="M960.002941 320.008822H576.004901V0h63.989218v256.003921H960.002941v64.004901zM339.197745 678.411175l300.796374-300.812057 44.808136 44.808136-300.796374 300.796373-44.808136-44.792452z" p-id="2631" fill="#f03e3e"></path><path d="M339.197745 422.407254l44.808136-44.808136 300.796374 300.812057-44.808136 44.792452-300.796374-300.796373z" p-id="2632" fill="#f03e3e"></path><path d="M870.355302 1024h-716.741971A89.616272 89.616272 0 0 1 64.012743 934.399412V89.600588A89.616272 89.616272 0 0 1 153.613331 0h486.380788l319.946087 249.604999v684.794413a89.616272 89.616272 0 0 1-89.584904 89.600588z m-716.741971-959.995099c-19.196765 0-25.595687 12.797844-25.595687 25.595687v844.798824a25.595687 25.595687 0 0 0 25.595687 25.61137h716.741971c19.196765 0 25.595687-12.797844 25.595687-25.595687V275.200686L620.797353 64.004901z" p-id="2633" fill="#f03e3e"></path></svg>`,
    cat
  );
  Icon.add(
    "folder",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="folder" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"></path></svg>`,
    cat
  );
  Icon.add(
    "folder-filled",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="folder" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"></path></svg>`,
    cat
  );
  Icon.add(
    "file",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="file" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z"></path></svg>`,
    cat
  );
  class Caption extends Component {
    constructor(props, ...mixins) {
      const tagProp = props.href ? { tag: "a" } : {};
      super(Component.extendProps(Caption.defaults, props, tagProp), ...mixins);
    }
    _config() {
      this._addPropStyle("subtitleWrap");
      const { title, subtitle, icon, image, href, titleLevel } = this.props;
      const children = [];
      if (isPlainObject(image)) {
        children.push(
          Component.extendProps(
            { tag: "img", classes: { "nom-caption-image": true } },
            image
          )
        );
      } else if (isString(image)) {
        children.push({
          tag: "img",
          classes: { "nom-caption-image": true },
          attrs: { src: image },
        });
      } else if (icon) {
        children.push(
          Component.extendProps(
            { classes: { "nom-caption-icon": true } },
            Component.normalizeIconProps(icon)
          )
        );
      }
      const titleTag = `h${titleLevel}`;
      children.push({
        tag: titleTag,
        classes: { "nom-caption-title": true },
        children: [title, subtitle && { tag: "small", children: subtitle }],
      });
      if (href) {
        this.setProps({ attrs: { href: href } });
      }
      this.setProps({ children: children });
    }
  }
  Caption.defaults = {
    title: "",
    subtitle: "",
    icon: null,
    image: null,
    titleLevel: 5,
  };
  Component.register(Caption);
  class Col extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(Col);
  class Cols extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        wrap: false,
        items: [],
        itemDefaults: null,
        gutter: "sm",
        childDefaults: { component: Col },
        strechIndex: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = [
        "gutter",
        "align",
        "justify",
        "fills",
        "inline",
      ];
      const { items } = this.props;
      const children = [];
      if (Array.isArray(items) && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          if (isString(item)) {
            item = { children: item };
          }
          item = Component.extendProps({}, this.props.itemDefaults, item);
          if (
            isNumeric(this.props.strechIndex) &&
            this.props.strechIndex === i
          ) {
            children.push({
              component: Col,
              classes: { "nom-col-strech": true },
              children: item,
            });
          } else {
            children.push({ component: Col, children: item });
          }
        }
        this.setProps({ children: children });
      } else if (this.props.showEmpty) {
        if (isPlainObject(this.props.showEmpty)) {
          this.setProps({
            children: Object.assign(
              { component: "Empty" },
              this.props.showEmpty
            ),
          });
        } else {
          this.setProps({ children: { component: "Empty" } });
        }
      }
    }
  }
  Component.register(Cols);
  class PanelHeaderCaption extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(PanelHeaderCaption);
  class PanelHeaderNav extends Component {
    // constructor(props, ...mixins) {
    //     super(props, ...mixins)
    // }
  }
  Component.register(PanelHeaderNav);
  class PanelHeaderTools extends Component {
    // constructor(props, ...mixins) {
    //     super(props, ...mixins)
    // }
  }
  Component.register(PanelHeaderTools);
  class PanelHeader extends Component {
    constructor(props, ...mixins) {
      const defaults = { caption: null, nav: null, tools: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { caption, nav, tools } = this.props;
      let toolsProps, navProps;
      const captionProps = caption
        ? Component.extendProps({ component: Caption }, caption)
        : null;
      if (Array.isArray(nav)) {
        navProps = { component: Cols, items: nav };
      } else if (isPlainObject(nav)) {
        navProps = Component.extendProps({ component: Cols }, nav);
      }
      if (Array.isArray(tools)) {
        toolsProps = { component: Cols, items: tools };
      } else if (isPlainObject(tools)) {
        toolsProps = Component.extendProps({ component: Cols }, tools);
      }
      this.setProps({
        children: [
          captionProps && {
            component: PanelHeaderCaption,
            children: captionProps,
          },
          navProps && { component: PanelHeaderNav, children: navProps },
          toolsProps && { component: PanelHeaderTools, children: toolsProps },
        ],
      });
    }
  }
  Component.register(PanelHeader);
  class Panel extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Panel.defaults, props), ...mixins);
    }
    _config() {
      this._addPropStyle("fit");
      const { header, body, footer, startAddons, endAddons } = this.props;
      let footerProps;
      const headerProps =
        header !== false &&
        Component.extendProps({ component: PanelHeader }, header);
      const bodyProps = Component.extendProps({ component: PanelBody }, body);
      if (footer) {
        footerProps = Component.extendProps({ component: PanelFooter }, footer);
      }
      this.setProps({
        children: [
          headerProps,
          ...startAddons,
          bodyProps,
          ...endAddons,
          footerProps,
        ],
      });
    }
  }
  Panel.defaults = {
    header: null,
    body: null,
    footer: null,
    uistyle: "default", // splitline,outline,card,bordered,plain
    startAddons: [],
    endAddons: [],
    fit: false,
  };
  Component.register(Panel);
  Object.defineProperty(Component.prototype, "$modal", {
    get: function () {
      let cur = this;
      while (cur) {
        if (cur.__isModalContent === true) {
          return cur.modal;
        }
        cur = cur.parent;
      }
      return cur.modal;
    },
  });
  var ModalContentMixin = {
    _created: function () {
      this.modal = this.parent.modal;
      this.__isModalContent = true;
      this.parent.parent.modalContent = this;
    },
    _config: function () {
      this.setProps({
        classes: {
          "nom-modal-content": true,
          "nom-modal-content-animate-show": this.modal.props.animate,
        },
      });
    },
  };
  class ModalDialog extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Panel, uistyle: "plain" } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      const modal = (this.modal = this.parent);
      const { content } = this.modal.props;
      if (isString(content)) {
        require([content], (contentConfig) => {
          let props = contentConfig;
          if (isFunction(props)) {
            const pNames = this.getParameterNames(props);
            if (pNames.length && pNames[0] === "{") {
              const args = modal.props.args || {};
              props = contentConfig({ modal: modal, args: args });
              if (props.then) {
                props.then((result) => {
                  props = result;
                  props = Component.extendProps(
                    this._getDefaultPanelContent(props),
                    props
                  );
                  this.update({
                    children: n$1(null, props, null, [ModalContentMixin]),
                  });
                });
              } else {
                props = Component.extendProps(
                  this._getDefaultPanelContent(props),
                  props
                );
                this.update({
                  children: n$1(null, props, null, [ModalContentMixin]),
                });
              }
            } else {
              props = contentConfig.call(this, modal);
              props = Component.extendProps(
                this._getDefaultPanelContent(props),
                props
              );
              this.update({
                children: n$1(null, props, null, [ModalContentMixin]),
              });
            }
          }
        });
      }
    }
    _getDefaultPanelContent(contentProps) {
      const modal = this.modal;
      modal.setProps({
        okText: contentProps.okText,
        onOk: contentProps.onOk,
        cancelText: contentProps.cancelText,
        onCancel: contentProps.onCancel,
        okButton: contentProps.okButton,
      });
      const {
        okText,
        cancelText,
        fit,
        okButton = {},
        cancelButton = {},
      } = modal.props;
      return {
        component: Panel,
        fit: fit,
        uistyle: "plain",
        header: {
          nav: {},
          tools: [
            {
              component: "Button",
              icon: "close",
              styles: { border: "none" },
              onClick: function () {
                modal.close();
              },
            },
          ],
        },
        footer: {
          children: {
            component: "Cols",
            items: [
              okButton !== false &&
                Component.extendProps(
                  {
                    component: "Button",
                    type: "primary",
                    text: okText,
                    onClick: () => {
                      modal._handleOk();
                    },
                  },
                  okButton
                ),
              cancelButton !== false &&
                Component.extendProps(
                  {
                    component: "Button",
                    text: cancelText,
                    onClick: () => {
                      modal._handleCancel();
                    },
                  },
                  cancelButton
                ),
            ],
          },
        },
      };
    }
    _config() {
      const { content } = this.modal.props;
      if (isPlainObject(content)) {
        const extendContent = {};
        if (isFunction(content.footer)) {
          extendContent.footer = content.footer.call(this.modal, this.modal);
        }
        const contentProps = Component.extendProps(
          this._getDefaultPanelContent(content),
          content,
          extendContent
        );
        this.setProps({
          children: n$1(null, contentProps, null, [ModalContentMixin]),
        });
      }
      this.setProps({
        classes: { "nom-modal-dialog-centered": this.modal.props.centered },
      });
    }
    getParameterNames(fn) {
      const code = fn.toString();
      const result = code
        .slice(code.indexOf("(") + 1, code.indexOf(")"))
        .match(/([^\s,]+)/g);
      return result === null ? [] : result;
    }
  }
  Component.register(ModalDialog);
  class Modal extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Modal.defaults, props), ...mixins);
    }
    _created() {
      this._scoped = true;
      this.bodyElem = document.body;
    }
    _config() {
      this._propStyleClasses = ["size", "fit"];
      const { size, animate } = this.props;
      let myWidth = null;
      if (size) {
        if (isPlainObject(size)) {
          if (size.width) {
            myWidth = isNumeric(size.width) ? `${size.width}px` : size.width;
          }
        }
      }
      this.setProps({
        classes: { "nom-modal-mask-animate-show": animate },
        children: {
          component: ModalDialog,
          attrs: { style: { width: myWidth || null } },
        },
      });
    }
    _show() {
      this.setzIndex();
      this.checkScrollbar();
      this.setScrollbar();
    }
    close(result) {
      const that = this;
      if (!this.rendered) {
        return;
      }
      if (this.element === undefined) {
        return;
      }
      if (result !== undefined) {
        that.returnValue = result;
      }
      let { modalCount } = this.bodyElem;
      if (modalCount) {
        modalCount--;
        this.bodyElem.modalCount = modalCount;
        if (modalCount === 0) {
          this.resetScrollbar();
        }
      }
      this._callHandler(this.props.onClose, { result: result });
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.remove();
    }
    animateHide() {
      if (!this.element) return false;
      this.modalContent.addClass("nom-modal-content-animate-hide");
      setTimeout(() => {
        if (!this.element) return false;
        this.addClass("nom-modal-mask-animate-hide");
        setTimeout(() => {
          if (!this.element) return false;
          this.remove();
        }, 90);
      }, 90);
    }
    setzIndex() {
      this.element.style.zIndex = getzIndex();
    }
    checkScrollbar() {
      const fullWindowWidth = window.innerWidth;
      this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
      this.scrollbarWidth = positionTool.scrollbarWidth();
    }
    setScrollbar() {
      /* var bodyPad = parseInt((this.bodyElem.css('padding-right') || 0), 10);
          this.originalBodyPad = document.body.style.paddingRight || '';
          this.originalBodyOverflow = document.body.style.overflow || '';
          if (this.bodyIsOverflowing) {
              this.bodyElem.css('padding-right', bodyPad + this.scrollbarWidth);
          }
          this.bodyElem.css("overflow", "hidden");
          var modalCount = this.bodyElem.data('modalCount');
          if (modalCount) {
              modalCount++;
              this.bodyElem.data('modalCount', modalCount);
          }
          else {
              this.bodyElem.data('modalCount', 1);
          } */
    }
    resetScrollbar() {
      /* this.bodyElem.css('padding-right', this.originalBodyPad);
          this.bodyElem.css('overflow', this.originalBodyOverflow);
          this.bodyElem.removeData('modalCount'); */
    }
    _handleOk() {
      this._callHandler(this.props.onOk);
    }
    _handleCancel() {
      this._callHandler(this.props.onCancel);
    }
  }
  Modal.defaults = {
    content: {},
    closeOnClickOutside: false,
    okText: "确 定",
    cancelText: "取 消",
    onOk: (e) => {
      e.sender.close();
    },
    onCancel: (e) => {
      e.sender.close();
    },
    size: "small",
    centered: true,
  };
  Component.register(Modal);
  class Button extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "button",
        text: null,
        icon: null,
        rightIcon: null,
        type: "default", // null(default) primary,dashed,text,link
        ghost: false,
        danger: false,
        inline: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = [
        "type",
        "ghost",
        "size",
        "shape",
        "danger",
        "block",
      ];
      const { icon, text, rightIcon, href, target, inline } = this.props;
      if (icon || rightIcon) {
        this.setProps({ classes: { "p-with-icon": true } });
        if (!text) {
          this.setProps({ classes: { "p-only-icon": true } });
        }
      }
      this.setProps({
        children: [
          Component.normalizeIconProps(icon),
          text && { tag: "span", children: text },
          Component.normalizeIconProps(rightIcon),
        ],
      });
      if (inline) {
        this.setProps({ tag: "a", classes: { "nom-button-inline": true } });
      }
      if (href) {
        this.setProps({
          tag: "a",
          attrs: Object.assign({}, this.props.attrs, {
            href: href,
            target: target || "_self",
          }),
        });
      }
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
    _enable() {
      this.element.removeAttribute("disabled");
    }
  }
  Component.register(Button);
  class AlertContent extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        title: null,
        description: null,
        icon: null,
        type: null,
        okText: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { title, description, type, okText, action } = this.props;
      let { icon } = this.props;
      const alertInst = this.modal;
      const iconMap = {
        info: "info-circle",
        success: "check-circle",
        error: "close-circle",
        warning: "exclamation-circle",
      };
      icon = icon || iconMap[type];
      const iconProps = icon
        ? Component.extendProps(Component.normalizeIconProps(icon), {
            classes: { "nom-alert-icon": true },
          })
        : null;
      const titleProps = title
        ? Component.extendProps(Component.normalizeTemplateProps(title), {
            classes: { "nom-alert-title": true },
          })
        : null;
      const descriptionProps = description
        ? Component.extendProps(Component.normalizeTemplateProps(description), {
            classes: { "nom-alert-description": true },
          })
        : null;
      const okButtonProps = {
        component: Button,
        type: "primary",
        text: okText,
        onClick: () => {
          alertInst._handleOk();
        },
      };
      let actionProps = { component: Cols, justify: "end" };
      if (!action) {
        actionProps.items = [okButtonProps];
      } else if (isPlainObject(action)) {
        actionProps = Component.extendProps(actionProps, action);
      } else if (Array.isArray(action)) {
        actionProps.items = action;
      }
      this.setProps({
        children: [
          {
            classes: { "nom-alert-body": true },
            children: [
              iconProps
                ? {
                    classes: { "nom-alert-body-icon": true },
                    children: iconProps,
                  }
                : undefined,
              {
                classes: { "nom-alert-body-content": true },
                children: [titleProps, descriptionProps],
              },
            ],
          },
          { classes: { "nom-alert-actions": true }, children: actionProps },
        ],
      });
    }
  }
  Component.register(AlertContent);
  class Alert extends Modal {
    constructor(props, ...mixins) {
      super(Component.extendProps(Alert.defaults, props), ...mixins);
    }
    _config() {
      const { type, icon, title, description, okText, action } = this.props;
      this.setProps({
        content: {
          component: AlertContent,
          type,
          icon,
          title,
          description,
          okText,
          action,
        },
      });
      super._config();
    }
  }
  Alert.defaults = {
    type: "default",
    icon: null,
    title: null,
    description: null,
    okText: "知道了",
    onOk: (e) => {
      e.sender.close();
    },
    action: null,
  };
  Component.register(Alert);
  class Anchor extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Anchor.defaults, props), ...mixins);
    }
    _created() {
      this.container = isFunction(this.props.container)
        ? this.props.container()
        : this.props.container;
      this.containerElem = document;
      this.onWindowScroll = () => {
        this._fixPosition();
        this._onContainerScroll();
      };
      this.currentKey = null;
      this.itemsKeyList = [];
    }
    _config() {
      const that = this;
      const { items, border, width, itemDefaults } = this.props;
      const myWidth = isNumeric(width) ? `${width}px` : width;
      this.itemKeyList = this._getItemKeyList();
      this.setProps({
        classes: {
          "nom-anchor-border-left": border === "left",
          "nom-anchor-border-right": border === "right",
        },
        attrs: { style: { "min-width": myWidth } },
        children: {
          component: "Menu",
          ref: (c) => {
            that.menu = c;
          },
          itemSelectable: { byClick: true },
          items: items,
          itemDefaults: Object.assign({}, itemDefaults, {
            onClick: function (args) {
              const key = args.sender.key;
              that.props.onItemClick &&
                that._callHandler(that.props.onItemClick, key);
              that._scrollToKey(key);
            },
          }),
        },
      });
      if (this.props.activeKey) {
        setTimeout(() => {
          this.scrollToKey(this.props.activeKey);
        }, 500);
      }
    }
    _rendered() {
      const that = this;
      this.position = null;
      this.size = null;
      if (this.props.sticky) {
        if (this.props.sticky === true) {
          this.scrollParent = window;
          window.addEventListener("scroll", this.onWindowScroll);
        } else {
          if (isFunction(this.props.sticky)) {
            this.scrollParent = this.props.sticky();
          } else {
            this.scrollParent = this.props.sticky;
          }
          this.scrollParent._on("scroll", function () {
            that._fixPosition();
          });
        }
      }
      if (this.container !== window) {
        this.container._on("scroll", function () {
          that.containerElem = that.container.element;
          that._onContainerScroll();
        });
      } else {
        // 判断是否滚动完毕，再次添加滚动事件
        let temp = 0;
        setTimeout(function judge() {
          const temp1 = document.getElementsByTagName("html")[0].scrollTop;
          if (temp !== temp1) {
            // 两次滚动高度不等，则认为还没有滚动完毕
            setTimeout(judge, 500);
            temp = temp1; // 滚动高度赋值
          } else {
            window.addEventListener("scroll", this.onWindowScroll);
            temp = null; // 放弃引用
          }
        }, 500);
      }
    }
    scrollToItem(key) {
      this._scrollToKey(key);
    }
    getCurrentItem() {
      if (!this.currentKey) {
        return this.props.items.length ? this.props.items[0].key : null;
      }
      return this.currentKey;
    }
    _getItemKeyList() {
      const arr = [];
      function mapList(data) {
        data.forEach(function (item) {
          if (item.items) {
            mapList(item.items);
          }
          arr.push(item.key);
        });
      }
      mapList(this.props.items);
      return arr;
    }
    scrollToKey(key) {
      this._scrollToKey(key);
    }
    _scrollToKey(target) {
      const ele = this.containerElem.querySelector(`[anchor-key=${target}]`);
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth" });
      }
    }
    _fixPosition() {
      this.element.style.transform = `translateY(0px)`;
      let pRect = null;
      if (this.props.sticky === true) {
        pRect = { top: 0, height: window.innerHeight };
      } else {
        pRect = this.scrollParent.element.getBoundingClientRect();
      }
      const gRect = this.element.getBoundingClientRect();
      if (gRect.top < pRect.top) {
        this.element.style.transform = `translateY(${
          pRect.top - gRect.top - 2
        }px)`;
      }
    }
    _onContainerScroll() {
      if (this.menu.element.offsetParent === null) {
        return;
      }
      const domlist = this.containerElem.getElementsByClassName(
        "nom-anchor-content"
      );
      if (!domlist.length) return;
      const list = [];
      for (let i = 0; i < domlist.length; i++) {
        if (
          domlist[i].offsetParent !== null &&
          this.itemKeyList.includes(domlist[i].getAttribute("anchor-key"))
        ) {
          list.push(domlist[i]);
        }
      }
      const pRect =
        this.container === window
          ? { top: 0, bottom: window.innerHeight }
          : this.containerElem.getBoundingClientRect();
      let current = 0;
      for (let i = 0; i < list.length; i++) {
        const top = list[i].getBoundingClientRect().top;
        const lastTop = i > 0 ? list[i - 1].getBoundingClientRect().top : 0;
        if (top < pRect.bottom && lastTop < pRect.top) {
          current = i;
        }
      }
      const result = list[current]
        ? list[current].getAttribute("anchor-key")
        : null;
      result && this._activeAnchor(result);
    }
    _activeAnchor(key) {
      this.menu.selectItem(key, { scrollIntoView: false });
      if (this.currentKey && key !== this.currentKey && this.props.onChange) {
        this._callHandler(this.props.onChange, { key: key });
      }
      this.currentKey = key;
    }
    _remove() {
      window.removeEventListener("scroll", this.onWindowScroll);
    }
  }
  Anchor.defaults = {
    container: null,
    items: [],
    border: "left",
    onItemClick: null,
    width: 180,
    sticky: false,
    itemDefaults: null,
    offset: 0,
    activeKey: null,
    onChange: null,
  };
  Component.register(Anchor);
  class AnchorContent extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(AnchorContent.defaults, props), ...mixins);
    }
    _rendered() {
      const { key } = this.props;
      this.element.setAttribute("anchor-key", key);
    }
  }
  AnchorContent.defaults = { key: null };
  Component.register(AnchorContent);
  class Route {
    constructor(defaultPath) {
      const that = this;
      this.hash = window.location.hash;
      if (!this.hash) {
        this.hash = `#${defaultPath}`;
      }
      this.path = this.hash.substring(1);
      this.paths = [];
      this.query = {};
      this.queryStr = "";
      const queryIndex = this.hash.indexOf("?");
      if (this.hash.length > 1) {
        if (queryIndex > -1) {
          this.path = this.hash.substring(1, queryIndex);
          const paramStr = (this.queryStr = this.hash.substring(
            queryIndex + 1
          ));
          const paramArr = paramStr.split("&");
          paramArr.forEach(function (e) {
            const item = e.split("=");
            const key = item[0];
            const val = item[1];
            if (key !== "") {
              that.query[key] = decodeURIComponent(val);
            }
          });
        }
      }
      const pathArr = this.path.split("!");
      this.maxLevel = pathArr.length - 1;
      pathArr.forEach(function (path, index) {
        that.paths[index] = path;
      });
    }
    push(route) {
      if (isString(route)) {
        window.location.href = `#${route}`;
      } else {
        const pathname = route.pathname || this.path;
        let strQuery = parseToQueryString(route.query || {});
        if (strQuery) {
          strQuery = `?${strQuery}`;
        }
        window.location.href = `#${pathname}${strQuery}`;
      }
    }
    iterateHash(callback) {
      let hash = this.hash;
      let result = callback(hash);
      if (!(result === false)) {
        if (this.queryStr !== "") {
          hash = `#${this.path}`;
          result = callback(hash);
        }
        if (!(result === false)) {
          while (hash.indexOf("!") > 0) {
            hash = hash.substring(0, hash.lastIndexOf("!"));
            result = callback(`${hash}!`);
            if (result === false) {
              hash = "";
            }
          }
        }
      }
    }
  }
  class Router extends Component {
    constructor(props, ...mixins) {
      const defaults = { defaultPath: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.currentView = null;
      this.path = null;
      this.level = this.$app.lastLevel;
      this.$app.routers[this.level] = this;
      this.handleHashChange = this.handleHashChange.bind(this);
      this.$app.on("hashChange", this.handleHashChange, this);
    }
    render() {
      this._mountElement();
      this.routeView();
    }
    handleHashChange(changed) {
      this._callHandler(this.props.onHashChange, changed); // 可以在这里做路由变更前处理
      if (
        changed.queryChanged &&
        (changed.changedLevel === null || this.level < changed.changedLevel)
      ) {
        this._callHandler(this.props.onQueryChange, changed);
      }
      if (changed.changedLevel === null) {
        return;
      }
      if (this.level > changed.changedLevel) {
        this.remove();
      } else if (this.level === changed.changedLevel) {
        this.routeView();
      } else if (this.level === changed.changedLevel - 1) {
        this._callHandler(this.props.onSubpathChange, changed);
      }
    }
    getSubpath() {
      let subpath = null;
      const { paths } = this.$app.currentRoute;
      if (this.level < paths.length) {
        subpath = paths[this.level + 1];
      }
      return subpath;
    }
    _removeCore() {}
    remove() {
      this.$app.off("hashChange", this.handleHashChange);
      delete this.$app.routers[this.level];
      for (const p in this) {
        if (this.hasOwnProperty(p)) {
          delete this[p];
        }
      }
    }
    routeView() {
      this.emptyChildren();
      this.$app.lastLevel = this.level + 1;
      const level = this.level;
      const defaultPath = this.props.defaultPath;
      const { paths } = this.$app.currentRoute;
      if (defaultPath) {
        if (!paths[level]) {
          paths[level] = defaultPath;
        }
      }
      let url = this.getRouteUrl(level);
      url = `${pathCombine(this.$app.props.viewsDir, url)}.js`;
      require([url], (viewPropsOrRouterPropsFunc) => {
        let routerProps = {};
        if (isFunction(viewPropsOrRouterPropsFunc)) {
          routerProps = viewPropsOrRouterPropsFunc.call(this, {
            route: this.$app.currentRoute,
            app: this.$app,
            router: this,
            context: this.$app.context,
          });
          if (routerProps.then) {
            routerProps.then((result) => {
              routerProps = result;
              this.processProps(routerProps);
            });
          } else {
            this.processProps(routerProps);
          }
        } else {
          routerProps.view = viewPropsOrRouterPropsFunc;
          this.processProps(routerProps);
        }
      });
    }
    processProps(routerProps) {
      const that = this;
      const defaultPath = this.props.defaultPath;
      const element = this.element;
      Router.plugins.forEach((plugin) => {
        plugin(routerProps);
      });
      if (isString(routerProps.title)) {
        document.title = routerProps.title;
      }
      if (isFunction(routerProps.view)) {
        routerProps.view = routerProps.view.call(this);
      }
      const viewOptions = Component.extendProps(routerProps.view, {
        reference: element,
        placement: "replace",
      });
      this.currentView = Component.create(viewOptions, {
        _rendered: function () {
          that.element = this.element;
        },
      });
      delete this.props;
      this.props = { defaultPath: defaultPath };
      this.setProps(routerProps);
      this._callRendered();
    }
    getRouteUrl(level) {
      const paths = this.$app.currentRoute.paths;
      const maxLevel = this.$app.currentRoute.maxLevel;
      let path = paths[level];
      if (level < maxLevel) {
        path = pathCombine(path, "_layout");
      }
      path = prefix(path, level);
      function prefix(patharg, levelarg) {
        if (levelarg === 0) {
          return patharg;
        }
        if (patharg[0] !== "/") {
          patharg = pathCombine(paths[levelarg - 1], patharg);
          return prefix(patharg, levelarg - 1);
        }
        return patharg;
      }
      return path;
    }
  }
  Router.plugins = [];
  Component.register(Router);
  /* eslint-disable no-shadow */ class App extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "body",
        placement: "replace",
        defaultPath: "!",
        viewsDir: "/",
        isFixedLayout: true,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.lastLevel = 0;
      this.previousRoute = null;
      this.currentRoute = new Route(this.props.defaultPath);
      this.routers = {};
      this.contextGetted = false;
      Object.defineProperty(Component.prototype, "$app", {
        get: function () {
          return this.root;
        },
      });
      Object.defineProperty(Component.prototype, "$route", {
        get: function () {
          return this.$app.currentRoute;
        },
      });
      const { context } = this.props;
      if (isFunction(context)) {
        const contextResult = context({ route: this.currentRoute });
        if (contextResult.then) {
          contextResult.then((result) => {
            this.context = result;
            this.contextGetted = true;
            this.update();
          });
        } else {
          this.context = context;
          this.contextGetted = true;
        }
      } else {
        this.context = context;
        this.contextGetted = true;
      }
    }
    _config() {
      if (this.contextGetted === true) {
        this.setProps({ children: { component: Router } });
        if (this.props.isFixedLayout === true) {
          document.documentElement.setAttribute("class", "app");
        }
      }
    }
    _rendered() {
      const that = this;
      window.addEventListener("hashchange", function () {
        that.handleRoute();
      });
    }
    handleRoute() {
      const route = new Route(this.props.defaultPath);
      /* console.info(JSON.stringify(route))

      route.iterateHash((hash) => {
        console.log(hash)
      }) */ let changedLevel = null;
      let queryChanged = false;
      this.previousRoute = this.currentRoute;
      this.currentRoute = route;
      if (this.previousRoute !== null) {
        const currentRoutePaths = this.currentRoute.paths;
        const previousRoutePaths = this.previousRoute.paths;
        const length = Math.min(
          previousRoutePaths.length,
          currentRoutePaths.length
        );
        for (let i = 0; i < length; i++) {
          if (previousRoutePaths[i] !== currentRoutePaths[i]) {
            changedLevel = i;
            break;
          }
        }
        if (
          (this.previousRoute.queryStr || "") !== this.currentRoute.queryStr
        ) {
          queryChanged = true;
        }
      }
      this.trigger("hashChange", {
        changedLevel,
        queryChanged,
        route: this.currentRoute,
        app: this,
      });
    }
  }
  Component.register(App);
  class LayerBackdrop extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        zIndex: 2,
        classes: { "nom-layer-backdrop": true },
        attrs: {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            userSelect: "none",
          },
        },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        attrs: { style: { zIndex: this.props.zIndex } },
        classes: { "nom-layer-mask-animate-show": this.props.animate },
        onClick({ event }) {
          event.stopPropagation();
        },
      });
      if (this.referenceElement === document.body) {
        this.setProps({ attrs: { style: { position: "fixed" } } });
      }
    }
  }
  Component.register(LayerBackdrop);
  class Layer extends Component {
    constructor(props, ...mixins) {
      const defaults = { within: window };
      super(Component.extendProps(defaults, Layer.defaults, props), ...mixins);
    }
    _created() {
      this.relativeElements = [];
      this._onDocumentMousedown = this._onDocumentMousedown.bind(this);
      this._onWindowResize = this._onWindowResize.bind(this);
    }
    _config() {
      if (this.props.placement === "replace") {
        this.props.position = null;
      }
      this._normalizePosition();
      this._zIndex = getzIndex();
      this.setProps({ attrs: { style: { zIndex: this._zIndex } } });
      if (this.props.align || this.props.position) {
        this.setProps({
          attrs: {
            style: {
              position: this.props.fixed ? "fixed" : "absolute",
              left: 0,
              top: 0,
            },
          },
        });
      }
      this.props.animate && this.animateInit();
    }
    _rendered() {
      const that = this;
      this.addRel(this.element);
      if (this.props.backdrop) {
        this.backdrop = new LayerBackdrop({
          zIndex: this._zIndex - 1,
          reference: this.props.reference,
          animate: this.props.animate,
        });
        if (this.props.closeOnClickBackdrop) {
          this.backdrop._on("click", function (e) {
            if (e.target !== e.currentTarget) {
              return;
            }
            that.props.animate && that.animateHide();
            !that.props.animate && that.remove();
          });
        }
      }
    }
    animateInit() {
      this.nomappOverflow();
      this.setProps({ classes: { "nom-layer-animate-show": true } });
    }
    animateHide() {
      if (!this.element) return false;
      this.addClass("nom-layer-animate-hide");
      setTimeout(() => {
        if (!this.element) return false;
        this.remove();
      }, 90);
    }
    _show() {
      const { props } = this;
      this.setPosition();
      this._docClickHandler();
      if (props.animate) {
        this.addClass("nom-layer-animate-show");
      }
      if (props.align) {
        window.removeEventListener("resize", this._onWindowResize, false);
        window.addEventListener("resize", this._onWindowResize, false);
      }
      this.props.onShow && this._callHandler(this.props.onShow);
    }
    _hide(forceRemove) {
      window.removeEventListener("resize", this._onWindowResize, false);
      document.removeEventListener(
        "mousedown",
        this._onDocumentMousedown,
        false
      );
      if (this.props.animate) {
        this.removeClass("nom-layer-animate-show");
        this.removeClass("nom-layer-animate-hide");
      }
      if (forceRemove === true || this.props.closeToRemove) {
        this.props.onClose && this._callHandler(this.props.onClose);
        this.remove();
      }
    }
    _remove() {
      window.removeEventListener("resize", this._onWindowResize, false);
      document.removeEventListener(
        "mousedown",
        this._onDocumentMousedown,
        false
      );
      if (this.backdrop) {
        this.backdrop.remove();
      }
    }
    _onWindowResize() {
      if (this.props.hidden === false) {
        this.setPosition();
      }
    }
    _onDocumentMousedown(e) {
      for (let i = 0; i < this.relativeElements.length; i++) {
        const el = this.relativeElements[i];
        if (el === e.target || el.contains(e.target)) {
          return;
        }
      }
      const closestLayer = e.target.closest(".nom-layer");
      if (closestLayer !== null) {
        const idx = closestLayer.component._zIndex;
        if (idx < this._zIndex) {
          this.hide();
        }
      } else {
        this.hide();
      }
    }
    nomappOverflow() {
      if (!window.nomapp) return;
      window.nomapp.element.style.overflow = "hidden";
      setTimeout(() => {
        window.nomapp.element.style.overflow = "inherit";
      }, 300);
    }
    setPosition() {
      if (this.props.position) {
        position(this.element, this.props.position);
      }
    }
    addRel(elem) {
      this.relativeElements.push(elem);
    }
    _docClickHandler() {
      const that = this;
      if (that.props.closeOnClickOutside) {
        document.addEventListener(
          "mousedown",
          this._onDocumentMousedown,
          false
        );
      }
    }
    _normalizePosition() {
      const { props } = this;
      if (props.align) {
        props.position = {
          of: window,
          collision: props.collision,
          within: props.within,
        };
        if (props.alignTo) {
          props.position.of = this.getElement(props.alignTo);
        }
        if (props.alignTo && props.alignOuter === true) {
          const arr = props.align.split(" ");
          if (arr.length === 1) {
            arr[1] = "center";
          }
          const myArr = ["center", "center"];
          const atArr = ["center", "center"];
          if (arr[1] === "left") {
            myArr[0] = "left";
            atArr[0] = "left";
          } else if (arr[1] === "right") {
            myArr[0] = "right";
            atArr[0] = "right";
          } else if (arr[1] === "top") {
            myArr[1] = "top";
            atArr[1] = "top";
          } else if (arr[1] === "bottom") {
            myArr[1] = "bottom";
            atArr[1] = "bottom";
          }
          if (arr[0] === "top") {
            myArr[1] = "bottom";
            atArr[1] = "top";
          } else if (arr[0] === "bottom") {
            myArr[1] = "top";
            atArr[1] = "bottom";
          } else if (arr[0] === "left") {
            myArr[0] = "right";
            atArr[0] = "left";
          } else if (arr[0] === "right") {
            myArr[0] = "left";
            atArr[0] = "right";
          }
          props.position.my = `${myArr[0]} ${myArr[1]}`;
          props.position.at = `${atArr[0]} ${atArr[1]}`;
        } else {
          const rhorizontal = /left|center|right/;
          const rvertical = /top|center|bottom/;
          let pos = props.align.split(" ");
          if (pos.length === 1) {
            pos = rhorizontal.test(pos[0])
              ? pos.concat(["center"])
              : rvertical.test(pos[0])
              ? ["center"].concat(pos)
              : ["center", "center"];
          }
          pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
          pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
          props.position.my = `${pos[0]} ${pos[1]}`;
          props.position.at = `${pos[0]} ${pos[1]}`;
        }
      }
    }
  }
  Layer.defaults = {
    align: null,
    alignTo: null,
    alignOuter: false,
    within: window,
    collision: "flipfit",
    onClose: null,
    onHide: null,
    onShow: null,
    closeOnClickOutside: false,
    closeToRemove: false,
    position: null,
    hidden: false,
    backdrop: false,
    closeOnClickBackdrop: false,
  };
  Component.register(Layer);
  class Tooltip extends Layer {
    constructor(props, ...mixins) {
      super(Component.extendProps(Tooltip.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this._showHandler = this._showHandler.bind(this);
      this._hideHandler = this._hideHandler.bind(this);
      this._onOpenerFocusinHandler = this._onOpenerFocusinHandler.bind(this);
      this._onOpenerFocusoutHandler = this._onOpenerFocusoutHandler.bind(this);
      this._openerFocusing = false;
      this.opener = this.props.trigger;
      this.props.alignTo = this.props.alignTo || this.opener.element;
      this.showTimer = null;
      this.hideTimer = null;
      this.delay = 100;
      this.addRel(this.opener.element);
      this._bindHover();
    }
    _config() {
      this.setProps({
        attrs: { "tooltip-align": this.props.align },
        children: [
          this.props.children,
          {
            ref: (c) => {
              this.arrow = c;
            },
            classes: { "nom-tooltip-arrow": true },
            children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
          },
        ],
      });
      super._config();
    }
    _rendered() {
      const bg = getComputedStyle(this.element)["background-color"];
      this.arrow.element.style.color = bg;
    }
    _fixDirection() {
      if (!this.element) return false;
      if (this.props.align === "top" || this.props.align === "bottom") {
        if (this.element.getAttribute("offset-y") !== "0") {
          this.element.setAttribute(
            "tooltip-align",
            this.props.align === "top" ? "bottom" : "top"
          );
        } else {
          this.element.setAttribute("tooltip-align", this.props.align);
        }
      } else if (this.props.align === "left" || this.props.align === "right") {
        if (this.element.getAttribute("offset-x") !== "0") {
          this.element.setAttribute(
            "tooltip-align",
            this.props.align === "left" ? "right" : "left"
          );
        } else {
          this.element.setAttribute("tooltip-align", this.props.align);
        }
      }
      if (this.props.animate) {
        let align = this.element.getAttribute("tooltip-align");
        const s = align.indexOf(" ");
        if (s !== -1) {
          align = align.substring(0, s);
        }
        this.addClass(`nom-tooltip-animate-${align}-show`);
      }
    }
    _remove() {
      this.opener._off("mouseenter", this._showHandler);
      this.opener._off("mouseleave", this._hideHandler);
      this.opener._off("focusin", this._onOpenerFocusinHandler);
      this.opener._off("focusout", this._onOpenerFocusoutHandler);
      this._off("mouseenter");
      this._off("mouseleave");
      clearTimeout(this.showTimer);
      this.showTimer = null;
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
      super._remove();
    }
    _bindHover() {
      this.opener._on("mouseenter", this._showHandler);
      this.opener._on("mouseleave", this._hideHandler);
      this.opener._on("focusin", this._onOpenerFocusinHandler);
      this.opener._on("focusout", this._onOpenerFocusoutHandler);
    }
    _onOpenerFocusinHandler() {
      this._openerFocusing = true;
      this._showHandler();
    }
    _onOpenerFocusoutHandler() {
      this._openerFocusing = false;
      this._hideHandler();
    }
    _showHandler() {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
      this.showTimer = setTimeout(() => {
        this.show();
      }, this.delay);
    }
    _hideHandler() {
      if (
        this._openerFocusing === true &&
        this.opener.componentType !== "Button"
      ) {
        return;
      }
      clearTimeout(this.showTimer);
      this.showTimer = null;
      if (this.props.hidden === false) {
        this.hideTimer = setTimeout(() => {
          this.props && this.props.animate && this.animateHide();
          this.props && !this.props.animate && this.hide();
        }, this.delay);
      }
    }
    animateHide() {
      if (!this.element) return false;
      this.addClass("nom-tooltip-animate-hide");
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
        this.removeClass("nom-tooltip-animate-hide");
      }, 90);
    }
    _show() {
      super._show();
      this._off("mouseenter");
      this._on("mouseenter", function () {
        clearTimeout(this.hideTimer);
      });
      this._off("mouseleave", this._hideHandler);
      this._on("mouseleave", this._hideHandler);
      const docTop = this.getScrollTop();
      if (docTop !== 0) {
        this.element.style.top = `${
          this.element.style.top.replace("px", "") - docTop
        }px`;
      }
      this._fixDirection();
    }
    getScrollTop() {
      let scroll_top = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        scroll_top = document.documentElement.scrollTop;
      } else if (document.body) {
        scroll_top = document.body.scrollTop;
      }
      return scroll_top;
    }
  }
  Tooltip.defaults = {
    trigger: null,
    align: "top",
    alignOuter: true,
    closeOnClickOutside: true,
    autoRender: false,
    hidden: false,
  };
  Component.mixin({
    _rendered: function () {
      if (this.props.tooltip) {
        if (isString(this.props.tooltip)) {
          this.tooltip = new Tooltip({
            trigger: this,
            children: this.props.tooltip,
          });
        } else {
          this.tooltip = new Tooltip(
            Component.extendProps({}, this.props.tooltip, { trigger: this })
          );
        }
      }
    },
  });
  Component.register(Tooltip);
  /* eslint-disable no-useless-escape */ const RuleManager = {};
  RuleManager.ruleTypes = {
    required: {
      validate: function (value) {
        return !isEmpty(value);
      },
      message: "必填",
    },
    number: {
      validate: function (value) {
        return !isEmpty(value)
          ? /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)
          : true;
      },
      message: "请输入有效的数字",
    },
    digits: {
      validate: function (value) {
        return !isEmpty(value) ? /^\d+$/.test(value) : true;
      },
      message: "只能输入数字",
    },
    regex: {
      validate: function (value, ruleValue) {
        return !isEmpty(value)
          ? new RegExp(ruleValue.pattern, ruleValue.attributes).test(value)
          : true;
      },
    },
    email: {
      validate: function (value) {
        return !isEmpty(value)
          ? /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
              value
            )
          : true;
      },
      message: "请输入有效的 Email 地址",
    },
    url: {
      validate: function (value) {
        return !isEmpty(value)
          ? /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
              value
            )
          : true;
      },
      message: "请输入有效的 URL",
    },
    min: {
      validate: function (value, ruleValue) {
        return !isEmpty(value)
          ? Number(value.replace(/,/g, "")) >= ruleValue
          : true;
      },
      message: "输入值不能小于 {0}",
    },
    max: {
      validate: function (value, ruleValue) {
        return !isEmpty(value)
          ? Number(value.replace(/,/g, "")) <= ruleValue
          : true;
      },
      message: "输入值不能大于 {0}",
    },
    range: {
      validate: function (value, ruleValue) {
        return !isEmpty(value)
          ? Number(value.replace(/,/g, "")) >= ruleValue[0] &&
              Number(value.replace(/,/g, "")) <= ruleValue[1]
          : true;
      },
      message: "输入值必须介于 {0} 和 {1} 之间",
    },
    minlength: {
      validate: function (value, ruleValue) {
        if (!isEmpty(value)) {
          let length = 0;
          if (Array.isArray(value)) {
            length = value.length;
          } else {
            length = value.trim().length;
          }
          return length >= ruleValue;
        }
        return true;
      },
      message: "不能少于 {0} 个字",
    },
    maxlength: {
      validate: function (value, ruleValue) {
        if (!isEmpty(value)) {
          let length = 0;
          if (Array.isArray(value)) {
            length = value.length;
          } else {
            length = value.trim().length;
          }
          return length <= ruleValue;
        }
        return true;
      },
      message: "不能多于 {0} 个字",
    },
    rangelength: {
      validate: function (value, ruleValue) {
        if (!isEmpty(value)) {
          let length = 0;
          if (Array.isArray(value)) {
            length = value.length;
          } else {
            length = value.trim().length;
          }
          return ruleValue[0] <= length && length <= ruleValue[1];
        }
        return true;
      },
      message: "输入字数在 {0} 个到 {1} 个之间",
    },
    remote: {
      validate: function (value, ruleValue) {
        const data = {};
        data[ruleValue[1]] = value;
        const response = $.ajax({
          url: ruleValue[0],
          dataType: "json",
          data: data,
          async: false,
          cache: false,
          type: "post",
        }).responseText;
        return response === "true";
      },
      message: "Please fix this field",
    },
    date: {
      validate: function () {
        return true;
      },
      message: "请输入有效的日期格式.",
    },
    identifier: {
      validate: function (value) {
        return !isEmpty(value) ? /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value) : true;
      },
      message: "只能输入字母、数字、下划线且必须以字母开头",
    },
    phoneNumber: {
      validate: function (value) {
        return !isEmpty(value) ? /^1[1-9][0-9]{9}$/.test(value) : true;
      },
      message: "请输入正确的手机号",
    },
    telephone: {
      validate: function (value) {
        return !isEmpty(value)
          ? /^((\d{3,4}\-)|)\d{7,8}(|([-\u8f6c]{1}\d{1,5}))$/.test(value)
          : true;
      },
      message: "请输入正确的固话号码",
    },
    IDCard: {
      validate: function (value) {
        return !isEmpty(value) ? checkIDCard(value) : true;
      },
      message: "请输入正确的身份证号码",
    },
    noScript: {
      validate: function (value) {
        return !isEmpty(value) ? !hasScriptLabel(value) : true;
      },
      message: '禁止输入"<script>"或"</script>"危险标签',
    },
    func: {
      validate: function (value, ruleValue) {
        if (isFunction(ruleValue)) {
          return ruleValue(value);
        }
        return true;
      },
    },
  };
  RuleManager.validate = function (rules, controlValue) {
    for (let i = 0; i < rules.length; i++) {
      const checkResult = checkRule(rules[i], controlValue);
      if (checkResult !== true) {
        return checkResult;
      }
    }
    return true;
  };
  function isEmpty(val) {
    return (
      val === undefined ||
      val === null ||
      val === "" ||
      (Array.isArray(val) && !val.length)
    );
  }
  function checkRule(ruleSettings, controlValue) {
    const rule = RuleManager.ruleTypes[ruleSettings.type];
    if (rule) {
      let ruleValue = ruleSettings.value || null;
      if (!rule.validate(controlValue, ruleValue)) {
        let message = ruleSettings.message || rule.message;
        if (ruleValue !== null) {
          if (!Array.isArray(ruleValue)) {
            ruleValue = [ruleValue];
          }
          for (let i = 0; i < ruleValue.length; i++) {
            message = message.replace(
              new RegExp(`\\{${i}\\}`, "g"),
              ruleValue[i]
            );
          }
        }
        return message;
      }
    }
    return true;
  }
  function checkIDCard(idcode) {
    // 加权因子
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 校验码
    const check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    const code = `${idcode}`;
    const last = idcode[17];
    const seventeen = code.substring(0, 17); // 判断最后一位校验码是否正确
    const arr = seventeen.split("");
    const len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
      num += arr[i] * weight_factor[i];
    }
    const resisue = num % 11;
    const last_no = check_code[resisue];
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */ const idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    const format = idcard_patter.test(idcode); // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return !!(last === last_no && format);
  }
  function hasScriptLabel(str) {
    return new RegExp(".*?script[^>]*?.*?(</.*?script.*?>)*", "ig").test(str);
  }
  var FieldActionMixin = {
    _created: function () {
      this.field = this.parent;
      this.field.action = this;
    },
  };
  var ControlActionMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlAction = this;
    },
  };
  var ControlAfterMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlAfter = this;
    },
  };
  var ControlBeforeMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlBefore = this;
    },
  };
  var ControlMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.control = this;
      this.form = this.field.form;
      this.__isControl = true;
    },
  };
  class FieldContent extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props, ...mixins) {
      super(props, ...mixins);
    }
    _created() {
      this.field = this.parent;
      this.field.content = this;
    }
    _config() {
      const {
        control,
        controlBefore,
        controlAfter,
        controlAction,
        extra,
        controlWidth,
      } = this.field.props;
      let controlProps = control;
      if (isNumeric(controlWidth)) {
        controlProps = Component.extendProps(controlProps, {
          attrs: {
            style: {
              width: `${controlWidth}px`,
              maxWidth: `${controlWidth}px`,
              flexBasis: `${controlWidth}px`,
            },
          },
        });
      }
      let controlAfterProps = null;
      if (controlAfter) {
        controlAfterProps = {
          component: "List",
          classes: { "nom-control-after": true },
        };
        if (Array.isArray(controlAfter)) {
          controlAfterProps = Component.extendProps(controlAfterProps, {
            items: controlAfter,
          });
        } else {
          controlAfterProps = Component.extendProps(
            controlAfterProps,
            controlAfter
          );
        }
      }
      let controlBeforeProps = null;
      if (controlBefore) {
        controlBeforeProps = {
          component: "List",
          classes: { "nom-control-before": true },
        };
        if (Array.isArray(controlAfter)) {
          controlBeforeProps = Component.extendProps(controlBeforeProps, {
            items: controlBefore,
          });
        } else {
          controlBeforeProps = Component.extendProps(
            controlBeforeProps,
            controlBefore
          );
        }
      }
      let controlActionProps = null;
      if (controlAction) {
        controlActionProps = {
          component: "List",
          gutter: "sm",
          classes: { "nom-control-action": true },
        };
        if (Array.isArray(controlAction)) {
          controlActionProps = Component.extendProps(controlActionProps, {
            items: controlAction,
          });
        } else {
          controlActionProps = Component.extendProps(
            controlActionProps,
            controlAction
          );
        }
      }
      this.setProps({
        children: [
          controlBeforeProps && n$1(controlBeforeProps, [ControlBeforeMixin]),
          n$1(
            null,
            Component.extendProps(controlProps, {
              classes: { "nom-control": true },
            }),
            null,
            [ControlMixin]
          ),
          extra && {
            tag: "div",
            classes: { "nom-control-extra": true },
            children: extra,
          },
          controlAfterProps && n$1(controlAfterProps, [ControlAfterMixin]),
          controlActionProps && n$1(controlActionProps, [ControlActionMixin]),
        ],
      });
    }
  }
  Component.register(FieldContent);
  class FieldLabel extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
    _created() {
      this.field = this.parent;
    }
    _config() {
      this.setProps({
        children: {
          tag: "label",
          classes: { "nom-label": true },
          children: this.field.props.label,
        },
      });
    }
  }
  Component.register(FieldLabel);
  let nameSeq$1 = 0;
  class Field extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Field.defaults, props), ...mixins);
    }
    _created() {
      const { name, value } = this.props;
      this.initValue = value !== undefined ? clone$1(this.props.value) : null;
      this.oldValue = null;
      this.currentValue = this.initValue;
      if (name) {
        this.name = name;
        this._autoName = false;
      } else {
        this._autoName = true;
        this.name = `__field${++nameSeq$1}`;
      }
      this.group = this.props.__group || null;
      if (this.parent && this.parent.__isControl === true) {
        this.group = this.parent.field;
      }
      this.rootField = this.group === null ? this : this.group.rootField;
      this.rules = [];
    }
    _config() {
      delete this.errorTip;
      this._addPropStyle(
        "required",
        "requiredMark",
        "labelAlign",
        "controlWidth",
        "plain"
      );
      const {
        label,
        labelWidth,
        span,
        notShowLabel,
        required,
        requiredMessage,
        rules = [],
        action,
      } = this.props;
      const showLabel =
        notShowLabel === false && label !== undefined && label !== null;
      this.rules = this.rules.concat(rules);
      if (required === true) {
        this.rules.unshift({ type: "required", message: requiredMessage });
      }
      if (span) {
        this.setProps({ styles: { col: span } });
      }
      let labelProps = showLabel ? { component: FieldLabel } : null;
      if (labelProps && labelWidth) {
        labelProps = Component.extendProps(labelProps, {
          attrs: {
            style: {
              width: `${labelWidth}px`,
              maxWidth: `${labelWidth}px`,
              flexBasis: `${labelWidth}px`,
            },
          },
        });
      }
      let actionProps = null;
      if (action) {
        actionProps = {
          component: "List",
          classes: { "nom-field-action": true },
          gutter: "sm",
        };
        if (Array.isArray(action)) {
          actionProps = Component.extendProps(actionProps, { items: action });
        } else {
          actionProps = Component.extendProps(actionProps, action);
        }
      }
      this.setProps({
        // RadioList,CheckboxList等div组件不为 focusable 元素
        // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
        attrs: { tabindex: this.props.tabindex || 0 },
        children: [
          labelProps,
          { component: FieldContent, value: this.props.value },
          actionProps && n$1(actionProps, [FieldActionMixin]),
        ],
      });
    }
    _update() {
      this.rules = [];
    }
    getValue(options) {
      const value = isFunction(this._getValue) ? this._getValue(options) : null;
      return value;
    }
    setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      isFunction(this._setValue) && this._setValue(value, options);
    }
    getValueText(options, value) {
      return isFunction(this._getValueText)
        ? this._getValueText(options, value)
        : this.getValue();
    }
    validate(options) {
      this.validateTriggered = true;
      return this._validate(options);
    }
    _validate(options) {
      const { disabled, hidden } = this.props;
      if (disabled || hidden) {
        return true;
      }
      let rules = this.rules;
      const value = this._getRawValue ? this._getRawValue() : this.getValue();
      if (Array.isArray(rules) && rules.length > 0) {
        if (options && options.ignoreRequired) {
          rules = rules.filter((item) => {
            return item.type !== "required";
          });
        }
        const validationResult = RuleManager.validate(rules, value);
        if (validationResult === true) {
          this.removeClass("s-invalid");
          this.trigger("valid");
          if (this.errorTip) {
            this.errorTip.remove();
            delete this.errorTip;
          }
          return true;
        }
        this.addClass("s-invalid");
        this.trigger("invalid", validationResult);
        this._invalid(validationResult);
        return false;
      }
      return true;
    }
    _invalid(message) {
      if (!this.errorTip) {
        this.errorTip = new Tooltip(
          extend$1(
            {},
            {
              trigger: this,
              reference: this.content,
              alignTo: this.content,
              hidden: true,
              styles: { color: "danger" },
              children: message,
            },
            this.props.invalidTip
          )
        );
        if (this.element.contains(document.activeElement)) {
          this.errorTip.show();
        }
      } else {
        this.errorTip.update({ children: message });
      }
    }
    focus() {
      isFunction(this._focus) && this._focus();
      this.element.focus();
    }
    blur() {
      isFunction(this._blur) && this._blur();
    }
    reset() {
      isFunction(this._reset) && this._reset();
    }
    clear() {
      isFunction(this._clear) && this._clear();
    }
    after(props) {
      if (props) {
        props.__group = this.group;
      }
      return super.after(props);
    }
    _reset() {
      this.setValue(this.initValue);
    }
    _clear() {
      this.setValue(null);
    }
    _remove() {
      if (this.group && Array.isArray(this.group.fields)) {
        const fields = this.group.fields;
        for (let i = 0; i < fields.length; i++) {
          if (fields[i] === this) {
            delete fields[i];
            fields.splice(i, 1);
          }
        }
      }
    } // 派生的控件子类内部适当位置调用
    _onValueChange(args) {
      const that = this;
      this.oldValue = clone$1(this.currentValue);
      this.currentValue = clone$1(this.getValue());
      this.props.value = this.currentValue;
      args = extend$1(true, args, {
        name: this.props.name,
        oldValue: this.oldValue,
        newValue: this.currentValue,
      });
      setTimeout(function () {
        that._callHandler(that.props && that.props.onValueChange, args);
        that.group &&
          that.group._onValueChange({
            changedField: args.changedField || that,
          });
        isFunction(that._valueChange) && that._valueChange(args);
        if (that.validateTriggered) {
          that._validate();
        }
      }, 0);
    }
  }
  Field.defaults = {
    label: null,
    labelAlign: "right",
    invalidTip: {},
    value: null,
    flatValue: false,
    span: null,
    notShowLabel: false,
    rules: [],
    extra: null,
    tabindex: null,
  };
  Object.defineProperty(Field.prototype, "fields", {
    get: function () {
      if (!this.control) return [];
      return this.control.getChildren();
    },
  });
  Component.register(Field);
  class Input extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "input",
        attrs: { type: "text", autocomplete: "off" },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.capsLock = false;
    }
    _config() {
      this.setProps({
        attrs: {
          value: this.props.value,
          oninput: () => {
            if (!this.capsLock) {
              this.textbox._onValueChange();
              this.textbox._onInput && this.textbox._onInput();
            }
          },
          onblur: () => {
            this.textbox.trigger("blur");
            this.textbox._onBlur();
          },
          oncompositionstart: () => {
            this.capsLock = true;
          },
          oncompositionend: () => {
            this.capsLock = false;
            this.element.dispatchEvent(new Event("input"));
          },
        },
      });
    }
    _rendered() {
      if (this.textbox.props.autofocus === true) {
        this.focus();
      }
    }
    getText() {
      return this.element.value;
    }
    setText(text) {
      this.element.value = text;
    }
    focus() {
      this.element.focus();
    }
    blur() {
      this.element.blur();
    }
    disable() {
      this.element.setAttribute("disabled", "disabled");
    }
    enable() {
      this.element.removeAttribute("disabled", "disabled");
    }
  }
  class Textbox extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Textbox.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const {
        allowClear,
        clearProps,
        leftIcon,
        prefix,
        rightIcon,
        suffix,
        minlength,
        maxlength,
        showWordLimit,
        placeholder,
        value,
        htmlType,
        button,
        readonly,
        disabled,
      } = this.props; // 左侧icon
      let leftIconProps = Component.normalizeIconProps(leftIcon);
      if (leftIconProps != null) {
        leftIconProps = Component.extendProps(leftIconProps, {
          classes: { "nom-textbox-left-icon": true },
        });
      } // 右侧icon
      let rightIconProps = Component.normalizeIconProps(rightIcon);
      if (rightIconProps != null) {
        rightIconProps = Component.extendProps(rightIconProps, {
          classes: { "nom-textbox-right-icon": true },
        });
      }
      const buttonProps = isPlainObject(button)
        ? Component.extendProps(
            { component: Button, classes: { "nom-textbox-button": true } },
            button
          )
        : null;
      const inputProps = {
        component: Input,
        name: "input",
        attrs: {
          value: value,
          placeholder: placeholder,
          maxlength,
          minlength,
          type: htmlType,
          readonly: readonly ? "readonly" : null,
        },
        _created: function () {
          this.textbox = that;
          this.textbox.input = this;
        },
      };
      const selfClearProps = {
        component: Icon,
        type: "times",
        classes: { "nom-textbox-clear": true, "nom-field-clear-handler": true },
        hidden: !this.props.value,
        ref: (c) => {
          this.clearIcon = c;
        },
        onClick: (args) => {
          this.setValue(null);
          this.props.allowClear && this.clearIcon.hide();
          args.event && args.event.stopPropagation();
        },
      }; // 前缀或后缀文案
      const getAffixSpan = (affix, type = "prefix") => ({
        tag: "span",
        classes: { "nom-input-affix": true, [`nom-input-${type}`]: true },
        children: affix,
      });
      const getSuffix = () => {
        const child = []; // 优先取外部传入的
        if (allowClear && !disabled) {
          if (this._ignoreReadonlyClear()) {
            child.push(clearProps || selfClearProps);
          } else if (!readonly) {
            child.push(clearProps || selfClearProps);
          }
        }
        if (rightIcon) {
          child.push(rightIconProps);
        } else if (suffix && isString(suffix)) {
          child.push(suffix);
        }
        return {
          tag: "div",
          classes: { "nom-input-affix": true, "nom-input-suffix": true },
          children: child,
        };
      }; // 输入长度限制
      const getWordLimitSpan = () => ({
        tag: "span",
        classes: { "nom-input-affix": true, [`nom-input-count`]: true },
        ref: (c) => {
          this.wordLimitRef = c;
        },
        children: `${(value || "").length}/${maxlength}`,
      });
      this.hasWordLimit =
        htmlType === "text" &&
        showWordLimit &&
        maxlength &&
        !readonly &&
        !disabled; // 无左icon 有prefixx || 无右icon 有suffix
      const affixWrapper =
        allowClear ||
        leftIcon ||
        prefix ||
        rightIcon ||
        suffix ||
        this.hasWordLimit;
      const baseTextProps = [
        leftIcon && leftIconProps,
        !leftIcon && prefix && isString(prefix) && getAffixSpan(prefix),
        inputProps,
        getSuffix(),
        this.hasWordLimit && getWordLimitSpan(),
      ];
      this.setProps({
        attrs: { readonly: readonly || null },
        classes: { "p-with-button": buttonProps !== null },
        control: {
          disabled: disabled,
          children: affixWrapper
            ? [
                {
                  // 有左右图标，则再用 wrapper包一层，为了展示
                  classes: { "nom-textbox-affix-wrapper": true },
                  children: baseTextProps,
                },
                buttonProps,
              ]
            : [...baseTextProps, buttonProps],
        },
      });
      super._config();
    } // 以下组件在 readonly时，还是需要展示 清除按钮
    _ignoreReadonlyClear() {
      return ["DatePicker", "TimePicker", "PartialDatePicker"].includes(
        this.componentType
      );
    }
    _rendered() {
      const that = this;
      if (this.props.onEnter) {
        this.input._on("keydown", function (event) {
          if (event.keyCode && event.keyCode === 13) {
            that._callHandler(that.props.onEnter, { value: that.getValue() });
          }
        });
      }
    }
    _updateWodLimit() {
      this.wordLimitRef.update({
        children: `${this.getText().length}/${this.props.maxlength}`,
      });
    }
    getText() {
      return this.input.getText();
    }
    _getValue() {
      const { trimValue } = this.props;
      let inputText = this.getText();
      inputText = trimValue ? inputText.trimLeft().trimRight() : inputText;
      if (inputText === "") {
        return null;
      }
      return inputText;
    }
    _valueChange(changed) {
      if (!this.props || !this.clearIcon) return;
      changed.newValue
        ? this.props.allowClear && this.clearIcon.show()
        : this.props.allowClear && this.clearIcon.hide();
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      this.input.setText(value);
      const newValue = this.getValue();
      this.oldValue = this.currentValue;
      if (options.triggerChange) {
        if (newValue !== this.oldValue) {
          super._onValueChange();
        }
      }
      this.currentValue = newValue;
    }
    focus() {
      this.input.focus();
    }
    blur() {
      this.input.blur();
    }
    _onInput() {
      if (this.hasWordLimit) {
        this._updateWodLimit();
      }
    }
    _onBlur() {
      this._callHandler(this.props.onBlur);
    }
    _disable() {
      this.input.disable();
    }
    _enable() {
      this.input.enable();
    }
  }
  Textbox.defaults = {
    leftIcon: null,
    prefix: null, // 前缀
    rightIcon: null,
    suffix: null, // 后缀
    maxlength: null,
    minlength: null,
    showWordLimit: false,
    autofocus: false,
    placeholder: null,
    value: null,
    htmlType: "text",
    onEnter: null,
    allowClear: true,
    trimValue: true, // getValue时 默认去除首位的空格
  };
  Component.register(Textbox);
  class Empty extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Empty.defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["size"];
      const { image, imageStyle, description } = this.props;
      let imageNode = image;
      if (typeof image === "string" && !image.startsWith("#")) {
        imageNode = { tag: "img", attrs: { src: image, alt: description } };
      }
      const { children } = this.props;
      this.setProps({
        classes: {
          [`nom-empty-normal`]: image === Empty.PRESENTED_IMAGE_SIMPLE,
        },
        children: [
          {
            classes: { [`nom-empty-image`]: true },
            attrs: { style: imageStyle },
            children: imageNode,
          },
          description
            ? {
                classes: { [`nom-empty-description`]: true },
                children: description,
              }
            : undefined,
          children
            ? { classes: { [`nom-empty-footer`]: true }, children: children }
            : undefined,
        ],
      });
    }
  }
  Empty.PRESENTED_IMAGE_SIMPLE = `#<svg t="1619148284824" class="nom-empty-img-simple"  width="64" height="64" viewBox="0 0 1351 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="200" height="200"><path d="M467.21267 479.648s2.688 2.688 8.096 2.688h393.44c2.688 0 5.376-2.688 8.096-2.688V358.4h409.6c-2.688-8.096-2.688-13.472-8.096-21.568L1014.25267 59.264H335.18067L71.08467 336.832c-5.376 2.688-8.096 10.784-8.096 21.568h409.6v121.248h-5.376z m-409.6-61.952v476.96c0 37.728 40.416 70.048 88.928 70.048h1053.632c48.512 0 88.928-32.352 88.928-70.048V412.288H936.07667v64.672c0 32.352-29.632 59.296-61.984 59.296h-393.44c-35.04 0-61.984-26.944-61.984-59.296v-64.672H62.95667v5.376zM1200.20467 1024H146.57267C65.74067 1024 1.06867 964.704 1.06867 894.656v-476.96c-2.688-48.512-2.688-94.304 29.632-123.968L313.64467 0h724.896l282.944 293.728c32.352 29.632 29.632 83.552 29.632 142.816v455.424C1345.74067 964.736 1278.34867 1024 1200.20467 1024z" p-id="2123" fill="#d9d9d9"></path></svg>`;
  Empty.PRESENTED_IMAGE_DEFAULT = `#<svg t="1619147741727" class="nom-empty-img-normal"  width="184" height="152" viewBox="0 0 1084 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4197" width="200" height="200"><path d="M0 933.456842a456.737684 85.342316 0 1 0 913.475368 0 456.737684 85.342316 0 1 0-913.475368 0Z" fill="#F5F5F7" fill-opacity=".8" p-id="4198"></path><path d="M822.130526 682.738526L660.944842 484.372211c-7.733895-9.337263-19.038316-14.989474-30.942316-14.989474h-346.543158c-11.897263 0-23.201684 5.652211-30.935579 14.989474L91.351579 682.738526v103.632842h730.778947V682.738526z" fill="#AEB8C2" p-id="4199"></path><path d="M775.390316 794.165895L634.543158 624.990316c-6.743579-8.131368-16.889263-12.577684-27.270737-12.577684H305.071158c-10.374737 0-20.527158 4.446316-27.270737 12.577684L136.953263 794.165895v92.914526h638.437053V794.165895z" fill="#000000" p-id="4200"></path><path d="M227.907368 213.355789h457.653895a26.947368 26.947368 0 0 1 26.947369 26.947369v628.843789a26.947368 26.947368 0 0 1-26.947369 26.947369H227.907368a26.947368 26.947368 0 0 1-26.947368-26.947369V240.303158a26.947368 26.947368 0 0 1 26.947368-26.947369z" fill="#F5F5F7" p-id="4201"></path><path d="M287.514947 280.407579h338.438737a13.473684 13.473684 0 0 1 13.473684 13.473684V462.012632a13.473684 13.473684 0 0 1-13.473684 13.473684H287.514947a13.473684 13.473684 0 0 1-13.473684-13.473684V293.881263a13.473684 13.473684 0 0 1 13.473684-13.473684z m1.765053 268.220632h334.908632a15.238737 15.238737 0 0 1 0 30.477473H289.28a15.238737 15.238737 0 0 1 0-30.477473z m0 79.245473h334.908632a15.245474 15.245474 0 0 1 0 30.484211H289.28a15.245474 15.245474 0 0 1 0-30.484211z m531.354947 293.066105c-5.221053 20.688842-23.558737 36.109474-45.372631 36.109474H138.206316c-21.813895 0-40.151579-15.427368-45.365895-36.109474a49.300211 49.300211 0 0 1-1.495579-12.058947V682.745263h177.300211c19.584 0 35.368421 16.491789 35.368421 36.513684v0.269474c0 20.015158 15.966316 36.176842 35.550315 36.176842h234.341053c19.584 0 35.550316-16.309895 35.550316-36.331789V719.292632c0-20.021895 15.784421-36.554105 35.368421-36.554106h177.30021v226.149053a49.381053 49.381053 0 0 1-1.488842 12.05221z" fill="#DCE0E6" p-id="4202"></path><path d="M842.920421 224.282947l-46.012632 17.852632a6.736842 6.736842 0 0 1-8.872421-8.286316l13.049264-41.815579c-17.441684-19.833263-27.681684-44.018526-27.681685-70.117052C773.402947 54.581895 841.566316 0 925.655579 0 1009.724632 0 1077.894737 54.581895 1077.894737 121.916632c0 67.334737-68.163368 121.916632-152.245895 121.916631-30.504421 0-58.906947-7.181474-82.728421-19.550316z" fill="#DCE0E6" p-id="4203"></path><path d="M985.626947 106.004211c10.597053 0 19.193263 8.488421 19.193264 18.96421s-8.596211 18.964211-19.193264 18.964211c-10.597053 0-19.193263-8.488421-19.193263-18.964211s8.596211-18.964211 19.193263-18.96421z m-119.619368 2.371368l18.863158 33.185684h-38.386526l19.523368-33.185684z m76.43621 0v33.185684h-33.583157v-33.185684h33.583157z" fill="#FFFFFF" p-id="4204"></path></svg>`;
  Empty.defaults = {
    description: "暂无内容",
    image: Empty.PRESENTED_IMAGE_DEFAULT,
    imageStyle: {},
    size: "xsmall",
  };
  Component.register(Empty);
  class LayoutAsider extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutAsider);
  class LayoutBody extends Component {
    // constructor(props, ...mixins) {
    //     super(props)
    // }
  }
  Component.register(LayoutBody);
  class LayoutFooter extends Component {
    // constructor(props, ...mixins) {
    //     super(props);
    // }
  }
  Component.register(LayoutFooter);
  class LayoutHeader extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutHeader);
  class LayoutSider extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutSider);
  class Layout extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Layout.defaults, props), ...mixins);
    }
    _config() {
      const { header, body, footer, sider, asider } = this.props;
      this._addPropStyle("fit");
      this.setProps({
        tag: "div",
        header: header && { component: LayoutHeader },
        body: body && { component: LayoutBody },
        footer: footer && { component: LayoutFooter },
        sider: sider && { component: LayoutSider },
        asider: asider && { component: LayoutAsider },
      });
      if (sider || asider) {
        this.setProps({
          classes: { "p-has-sider": true },
          children: [this.props.sider, this.props.body, this.props.asider],
        });
      } else {
        this.setProps({
          children: [this.props.header, this.props.body, this.props.footer],
        });
      }
    }
  }
  Layout.defaults = {
    header: null,
    body: null,
    footer: null,
    sider: null,
    asider: null,
    fit: true,
  };
  Component.register(Layout);
  class Popup extends Layer {
    constructor(props, ...mixins) {
      const defaults = {
        trigger: null,
        triggerAction: "click",
        align: "bottom left",
        alignOuter: true,
        closeOnClickOutside: true,
        placement: "append",
        autoRender: false,
        hidden: true,
        uistyle: "default",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this._showHandler = this._showHandler.bind(this);
      this._hideHandler = this._hideHandler.bind(this);
      this._onOpenerClickHandler = this._onOpenerClickHandler.bind(this);
      this.opener = this.props.trigger;
      this.opener.on("remove", () => {
        this.remove();
      });
      this.props.alignTo = this.opener.element;
      this.showTimer = null;
      this.hideTimer = null;
      this.addRel(this.opener.element);
      this._bindTrigger();
    }
    _bindTrigger() {
      const { triggerAction } = this.props;
      if (triggerAction === "click") {
        this._bindClick();
      }
      if (triggerAction === "hover") {
        this._bindHover();
      }
      if (triggerAction === "both") {
        this._bindClick();
        this._bindHover();
      }
    }
    _bindClick() {
      this.opener._on("click", this._onOpenerClickHandler);
    }
    _bindHover() {
      this.opener._on("mouseenter", this._showHandler);
      this.opener._on("mouseleave", this._hideHandler);
    }
    _onOpenerClickHandler() {
      if (this.opener.props.disabled !== true) {
        this.toggleHidden();
      }
    }
    _showHandler() {
      if (this.opener.props.disabled !== true) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
        this.showTimer = setTimeout(() => {
          this.show();
        }, this.delay);
      }
    }
    _hideHandler() {
      if (this.opener.props.disabled !== true) {
        clearTimeout(this.showTimer);
        this.showTimer = null;
        if (this.props.hidden === false) {
          this.hideTimer = setTimeout(() => {
            this.hide();
          }, this.delay);
        }
      }
    }
    _show() {
      super._show();
      if (this.props.triggerAction === "hover") {
        this._off("mouseenter");
        this._on("mouseenter", () => {
          clearTimeout(this.hideTimer);
        });
        this._off("mouseleave");
        this._on("mouseleave", this._hideHandler);
      }
    }
  }
  Component.mixin({
    _rendered: function () {
      if (this.props.popup) {
        this.props.popup.trigger = this;
        this.popup = new Popup(this.props.popup);
      }
    },
  });
  Component.register(Popup);
  /* eslint-disable */ function t(t) {
    return "object" == typeof t && null != t && 1 === t.nodeType;
  }
  function e(t, e) {
    return (!e || "hidden" !== t) && "visible" !== t && "clip" !== t;
  }
  function n(t, n) {
    if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
      var r = getComputedStyle(t, null);
      return (
        e(r.overflowY, n) ||
        e(r.overflowX, n) ||
        (function (t) {
          var e = (function (t) {
            if (!t.ownerDocument || !t.ownerDocument.defaultView) return null;
            try {
              return t.ownerDocument.defaultView.frameElement;
            } catch (t) {
              return null;
            }
          })(t);
          return (
            !!e &&
            (e.clientHeight < t.scrollHeight || e.clientWidth < t.scrollWidth)
          );
        })(t)
      );
    }
    return !1;
  }
  function r(t, e, n, r, i, o, l, d) {
    return (o < t && l > e) || (o > t && l < e)
      ? 0
      : (o <= t && d <= n) || (l >= e && d >= n)
      ? o - t - r
      : (l > e && d < n) || (o < t && d > n)
      ? l - e + i
      : 0;
  }
  function compute(e, i) {
    var o = window,
      l = i.scrollMode,
      d = i.block,
      u = i.inline,
      h = i.boundary,
      a = i.skipOverflowHiddenElements,
      c =
        "function" == typeof h
          ? h
          : function (t) {
              return t !== h;
            };
    if (!t(e)) throw new TypeError("Invalid target");
    for (
      var f = document.scrollingElement || document.documentElement,
        s = [],
        p = e;
      t(p) && c(p);

    ) {
      if ((p = p.parentElement) === f) {
        s.push(p);
        break;
      }
      (null != p &&
        p === document.body &&
        n(p) &&
        !n(document.documentElement)) ||
        (null != p && n(p, a) && s.push(p));
    }
    for (
      var m = o.visualViewport ? o.visualViewport.width : innerWidth,
        g = o.visualViewport ? o.visualViewport.height : innerHeight,
        w = window.scrollX || pageXOffset,
        v = window.scrollY || pageYOffset,
        W = e.getBoundingClientRect(),
        b = W.height,
        H = W.width,
        y = W.top,
        E = W.right,
        M = W.bottom,
        V = W.left,
        x = "start" === d || "nearest" === d ? y : "end" === d ? M : y + b / 2,
        I = "center" === u ? V + H / 2 : "end" === u ? E : V,
        C = [],
        T = 0;
      T < s.length;
      T++
    ) {
      var k = s[T],
        B = k.getBoundingClientRect(),
        D = B.height,
        O = B.width,
        R = B.top,
        X = B.right,
        Y = B.bottom,
        L = B.left;
      if (
        "if-needed" === l &&
        y >= 0 &&
        V >= 0 &&
        M <= g &&
        E <= m &&
        y >= R &&
        M <= Y &&
        V >= L &&
        E <= X
      )
        return C;
      var S = getComputedStyle(k),
        j = parseInt(S.borderLeftWidth, 10),
        q = parseInt(S.borderTopWidth, 10),
        z = parseInt(S.borderRightWidth, 10),
        A = parseInt(S.borderBottomWidth, 10),
        F = 0,
        G = 0,
        J = "offsetWidth" in k ? k.offsetWidth - k.clientWidth - j - z : 0,
        K = "offsetHeight" in k ? k.offsetHeight - k.clientHeight - q - A : 0;
      if (f === k)
        (F =
          "start" === d
            ? x
            : "end" === d
            ? x - g
            : "nearest" === d
            ? r(v, v + g, g, q, A, v + x, v + x + b, b)
            : x - g / 2),
          (G =
            "start" === u
              ? I
              : "center" === u
              ? I - m / 2
              : "end" === u
              ? I - m
              : r(w, w + m, m, j, z, w + I, w + I + H, H)),
          (F = Math.max(0, F + v)),
          (G = Math.max(0, G + w));
      else {
        (F =
          "start" === d
            ? x - R - q
            : "end" === d
            ? x - Y + A + K
            : "nearest" === d
            ? r(R, Y, D, q, A + K, x, x + b, b)
            : x - (R + D / 2) + K / 2),
          (G =
            "start" === u
              ? I - L - j
              : "center" === u
              ? I - (L + O / 2) + J / 2
              : "end" === u
              ? I - X + z + J
              : r(L, X, O, j, z + J, I, I + H, H));
        var N = k.scrollLeft,
          P = k.scrollTop;
        (x += P - (F = Math.max(0, Math.min(P + F, k.scrollHeight - D + K)))),
          (I += N - (G = Math.max(0, Math.min(N + G, k.scrollWidth - O + J))));
      }
      C.push({ el: k, top: F, left: G });
    }
    return C;
  }
  function isOptionsObject(options) {
    return options === Object(options) && Object.keys(options).length !== 0;
  }
  function defaultBehavior(actions, behavior) {
    if (behavior === void 0) {
      behavior = "auto";
    }
    var canSmoothScroll = "scrollBehavior" in document.body.style;
    actions.forEach(function (_ref) {
      var el = _ref.el,
        top = _ref.top,
        left = _ref.left;
      if (el.scroll && canSmoothScroll) {
        el.scroll({ top: top, left: left, behavior: behavior });
      } else {
        el.scrollTop = top;
        el.scrollLeft = left;
      }
    });
  }
  function getOptions(options) {
    if (options === false) {
      return { block: "end", inline: "nearest" };
    }
    if (isOptionsObject(options)) {
      return options;
    }
    return { block: "start", inline: "nearest" };
  }
  function scrollIntoView(target, options) {
    var targetIsDetached = !target.ownerDocument.documentElement.contains(
      target
    );
    if (isOptionsObject(options) && typeof options.behavior === "function") {
      return options.behavior(targetIsDetached ? [] : compute(target, options));
    }
    if (targetIsDetached) {
      return;
    }
    var computeOptions = getOptions(options);
    return defaultBehavior(
      compute(target, computeOptions),
      computeOptions.behavior
    );
  }
  /* eslint-disable */ /**!
   * Sortable 1.13.0
   * @author	RubaXa   <trash@rubaxa.org>
   * @author	owenm    <owen23355@gmail.com>
   * @license MIT
   */ function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }
    return _typeof(obj);
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends() {
    _extends =
      Object.assign ||
      function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
    return _extends.apply(this, arguments);
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          })
        );
      }
      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var version = "1.13.0";
  function userAgent(pattern) {
    if (typeof window !== "undefined" && window.navigator) {
      return !!(/*@__PURE__*/ navigator.userAgent.match(pattern));
    }
  }
  var IE11OrLess = userAgent(
    /(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i
  );
  var Edge = userAgent(/Edge/i);
  var FireFox = userAgent(/firefox/i);
  var Safari =
    userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  var IOS = userAgent(/iP(ad|od|hone)/i);
  var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  var captureMode = { capture: false, passive: false };
  function on(el, event, fn) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function off(el, event, fn) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
  }
  function matches(/**HTMLElement*/ el, /**String*/ selector) {
    if (!selector) return;
    selector[0] === ">" && (selector = selector.substring(1));
    if (el) {
      try {
        if (el.matches) {
          return el.matches(selector);
        } else if (el.msMatchesSelector) {
          return el.msMatchesSelector(selector);
        } else if (el.webkitMatchesSelector) {
          return el.webkitMatchesSelector(selector);
        }
      } catch (_) {
        return false;
      }
    }
    return false;
  }
  function getParentOrHost(el) {
    return el.host && el !== document && el.host.nodeType
      ? el.host
      : el.parentNode;
  }
  function closest(
    /**HTMLElement*/ el,
    /**String*/ selector,
    /**HTMLElement*/ ctx,
    includeCTX
  ) {
    if (el) {
      ctx = ctx || document;
      do {
        if (
          (selector != null &&
            (selector[0] === ">"
              ? el.parentNode === ctx && matches(el, selector)
              : matches(el, selector))) ||
          (includeCTX && el === ctx)
        ) {
          return el;
        }
        if (el === ctx) break; /* jshint boss:true */
      } while ((el = getParentOrHost(el)));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(el, name, state) {
    if (el && name) {
      if (el.classList) {
        el.classList[state ? "add" : "remove"](name);
      } else {
        var className = (" " + el.className + " ")
          .replace(R_SPACE, " ")
          .replace(" " + name + " ", " ");
        el.className = (className + (state ? " " + name : "")).replace(
          R_SPACE,
          " "
        );
      }
    }
  }
  function css(el, prop, val) {
    var style = el && el.style;
    if (style) {
      if (val === void 0) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          val = document.defaultView.getComputedStyle(el, "");
        } else if (el.currentStyle) {
          val = el.currentStyle;
        }
        return prop === void 0 ? val : val[prop];
      } else {
        if (!(prop in style) && prop.indexOf("webkit") === -1) {
          prop = "-webkit-" + prop;
        }
        style[prop] = val + (typeof val === "string" ? "" : "px");
      }
    }
  }
  function matrix(el, selfOnly) {
    var appliedTransforms = "";
    if (typeof el === "string") {
      appliedTransforms = el;
    } else {
      do {
        var transform = css(el, "transform");
        if (transform && transform !== "none") {
          appliedTransforms = transform + " " + appliedTransforms;
        } /* jshint boss:true */
      } while (!selfOnly && (el = el.parentNode));
    }
    var matrixFn =
      window.DOMMatrix ||
      window.WebKitCSSMatrix ||
      window.CSSMatrix ||
      window.MSCSSMatrix;
    /*jshint -W056 */ return matrixFn && new matrixFn(appliedTransforms);
  }
  function find(ctx, tagName, iterator) {
    if (ctx) {
      var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;
      if (iterator) {
        for (; i < n; i++) {
          iterator(list[i], i);
        }
      }
      return list;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      return scrollingElement;
    } else {
      return document.documentElement;
    }
  }
  /**
   * Returns the "bounding client rect" of given element
   * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
   * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
   * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
   * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
   * @param  {[HTMLElement]} container              The parent the element will be placed in
   * @return {Object}                               The boundingClientRect of el, with specified adjustments
   */ function getRect(
    el,
    relativeToContainingBlock,
    relativeToNonStaticParent,
    undoScale,
    container
  ) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;
    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
      elRect = el.getBoundingClientRect();
      top = elRect.top;
      left = elRect.left;
      bottom = elRect.bottom;
      right = elRect.right;
      height = elRect.height;
      width = elRect.width;
    } else {
      top = 0;
      left = 0;
      bottom = window.innerHeight;
      right = window.innerWidth;
      height = window.innerHeight;
      width = window.innerWidth;
    }
    if (
      (relativeToContainingBlock || relativeToNonStaticParent) &&
      el !== window
    ) {
      // Adjust for translate()
      container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
      // Not needed on <= IE11
      if (!IE11OrLess) {
        do {
          if (
            container &&
            container.getBoundingClientRect &&
            (css(container, "transform") !== "none" ||
              (relativeToNonStaticParent &&
                css(container, "position") !== "static"))
          ) {
            var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container
            top -=
              containerRect.top + parseInt(css(container, "border-top-width"));
            left -=
              containerRect.left +
              parseInt(css(container, "border-left-width"));
            bottom = top + elRect.height;
            right = left + elRect.width;
            break;
          } /* jshint boss:true */
        } while ((container = container.parentNode));
      }
    }
    if (undoScale && el !== window) {
      // Adjust for scale()
      var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;
      if (elMatrix) {
        top /= scaleY;
        left /= scaleX;
        width /= scaleX;
        height /= scaleY;
        bottom = top + height;
        right = left + width;
      }
    }
    return {
      top: top,
      left: left,
      bottom: bottom,
      right: right,
      width: width,
      height: height,
    };
  }
  /**
   * Checks if a side of an element is scrolled past a side of its parents
   * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
   * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
   * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
   * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
   */ function isScrolledPast(el, elSide, parentSide) {
    var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
    /* jshint boss:true */ while (parent) {
      var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;
      if (parentSide === "top" || parentSide === "left") {
        visible = elSideVal >= parentSideVal;
      } else {
        visible = elSideVal <= parentSideVal;
      }
      if (!visible) return parent;
      if (parent === getWindowScrollingElement()) break;
      parent = getParentAutoScrollElement(parent, false);
    }
    return false;
  }
  /**
   * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
   * and non-draggable elements
   * @param  {HTMLElement} el       The parent element
   * @param  {Number} childNum      The index of the child
   * @param  {Object} options       Parent Sortable's options
   * @return {HTMLElement}          The child at index childNum, or null if not found
   */ function getChild(el, childNum, options) {
    var currentChild = 0,
      i = 0,
      children = el.children;
    while (i < children.length) {
      if (
        children[i].style.display !== "none" &&
        children[i] !== Sortable.ghost &&
        children[i] !== Sortable.dragged &&
        closest(children[i], options.draggable, el, false)
      ) {
        if (currentChild === childNum) {
          return children[i];
        }
        currentChild++;
      }
      i++;
    }
    return null;
  }
  /**
   * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
   * @param  {HTMLElement} el       Parent element
   * @param  {selector} selector    Any other elements that should be ignored
   * @return {HTMLElement}          The last child, ignoring ghostEl
   */ function lastChild(el, selector) {
    var last = el.lastElementChild;
    while (
      last &&
      (last === Sortable.ghost ||
        css(last, "display") === "none" ||
        (selector && !matches(last, selector)))
    ) {
      last = last.previousElementSibling;
    }
    return last || null;
  }
  /**
   * Returns the index of an element within its parent for a selected set of
   * elements
   * @param  {HTMLElement} el
   * @param  {selector} selector
   * @return {number}
   */ function index(el, selector) {
    var index = 0;
    if (!el || !el.parentNode) {
      return -1;
    }
    /* jshint boss:true */ while ((el = el.previousElementSibling)) {
      if (
        el.nodeName.toUpperCase() !== "TEMPLATE" &&
        el !== Sortable.clone &&
        (!selector || matches(el, selector))
      ) {
        index++;
      }
    }
    return index;
  }
  /**
   * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
   * The value is returned in real pixels.
   * @param  {HTMLElement} el
   * @return {Array}             Offsets in the format of [left, top]
   */ function getRelativeScrollOffset(el) {
    var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();
    if (el) {
      do {
        var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
        offsetLeft += el.scrollLeft * scaleX;
        offsetTop += el.scrollTop * scaleY;
      } while (el !== winScroller && (el = el.parentNode));
    }
    return [offsetLeft, offsetTop];
  }
  /**
   * Returns the index of the object within the given array
   * @param  {Array} arr   Array that may or may not hold the object
   * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
   * @return {Number}      The index of the object in the array, or -1
   */ function indexOfObject(arr, obj) {
    for (var i in arr) {
      if (!arr.hasOwnProperty(i)) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === arr[i][key])
          return Number(i);
      }
    }
    return -1;
  }
  function getParentAutoScrollElement(el, includeSelf) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;
    do {
      // we don't need to get elem css if it isn't even overflowing in the first place (performance)
      if (
        elem.clientWidth < elem.scrollWidth ||
        elem.clientHeight < elem.scrollHeight
      ) {
        var elemCSS = css(elem);
        if (
          (elem.clientWidth < elem.scrollWidth &&
            (elemCSS.overflowX == "auto" || elemCSS.overflowX == "scroll")) ||
          (elem.clientHeight < elem.scrollHeight &&
            (elemCSS.overflowY == "auto" || elemCSS.overflowY == "scroll"))
        ) {
          if (!elem.getBoundingClientRect || elem === document.body)
            return getWindowScrollingElement();
          if (gotSelf || includeSelf) return elem;
          gotSelf = true;
        }
      } /* jshint boss:true */
    } while ((elem = elem.parentNode));
    return getWindowScrollingElement();
  }
  function extend(dst, src) {
    if (dst && src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) {
          dst[key] = src[key];
        }
      }
    }
    return dst;
  }
  function isRectEqual(rect1, rect2) {
    return (
      Math.round(rect1.top) === Math.round(rect2.top) &&
      Math.round(rect1.left) === Math.round(rect2.left) &&
      Math.round(rect1.height) === Math.round(rect2.height) &&
      Math.round(rect1.width) === Math.round(rect2.width)
    );
  }
  var _throttleTimeout;
  function throttle(callback, ms) {
    return function () {
      if (!_throttleTimeout) {
        var args = arguments,
          _this = this;
        if (args.length === 1) {
          callback.call(_this, args[0]);
        } else {
          callback.apply(_this, args);
        }
        _throttleTimeout = setTimeout(function () {
          _throttleTimeout = void 0;
        }, ms);
      }
    };
  }
  function scrollBy(el, x, y) {
    el.scrollLeft += x;
    el.scrollTop += y;
  }
  function clone(el) {
    var Polymer = window.Polymer;
    var $ = window.jQuery || window.Zepto;
    if (Polymer && Polymer.dom) {
      return Polymer.dom(el).cloneNode(true);
    } else if ($) {
      return $(el).clone(true)[0];
    } else {
      return el.cloneNode(true);
    }
  }
  var expando = "Sortable" + new Date().getTime();
  function AnimationStateManager() {
    var animationStates = [],
      animationCallbackId;
    return {
      captureAnimationState: function captureAnimationState() {
        animationStates = [];
        if (!this.options.animation) return;
        var children = [].slice.call(this.el.children);
        children.forEach(function (child) {
          if (css(child, "display") === "none" || child === Sortable.ghost)
            return;
          animationStates.push({ target: child, rect: getRect(child) });
          var fromRect = _objectSpread(
            {},
            animationStates[animationStates.length - 1].rect
          ); // If animating: compensate for current animation
          if (child.thisAnimationDuration) {
            var childMatrix = matrix(child, true);
            if (childMatrix) {
              fromRect.top -= childMatrix.f;
              fromRect.left -= childMatrix.e;
            }
          }
          child.fromRect = fromRect;
        });
      },
      addAnimationState: function addAnimationState(state) {
        animationStates.push(state);
      },
      removeAnimationState: function removeAnimationState(target) {
        animationStates.splice(
          indexOfObject(animationStates, { target: target }),
          1
        );
      },
      animateAll: function animateAll(callback) {
        var _this = this;
        if (!this.options.animation) {
          clearTimeout(animationCallbackId);
          if (typeof callback === "function") callback();
          return;
        }
        var animating = false,
          animationTime = 0;
        animationStates.forEach(function (state) {
          var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);
          if (targetMatrix) {
            // Compensate for current animation
            toRect.top -= targetMatrix.f;
            toRect.left -= targetMatrix.e;
          }
          target.toRect = toRect;
          if (target.thisAnimationDuration) {
            // Could also check if animatingRect is between fromRect and toRect
            if (
              isRectEqual(prevFromRect, toRect) &&
              !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
              (animatingRect.top - toRect.top) /
                (animatingRect.left - toRect.left) ===
                (fromRect.top - toRect.top) / (fromRect.left - toRect.left)
            ) {
              // If returning to same place as started from animation and on same axis
              time = calculateRealTime(
                animatingRect,
                prevFromRect,
                prevToRect,
                _this.options
              );
            }
          } // if fromRect != toRect: animate
          if (!isRectEqual(toRect, fromRect)) {
            target.prevFromRect = fromRect;
            target.prevToRect = toRect;
            if (!time) {
              time = _this.options.animation;
            }
            _this.animate(target, animatingRect, toRect, time);
          }
          if (time) {
            animating = true;
            animationTime = Math.max(animationTime, time);
            clearTimeout(target.animationResetTimer);
            target.animationResetTimer = setTimeout(function () {
              target.animationTime = 0;
              target.prevFromRect = null;
              target.fromRect = null;
              target.prevToRect = null;
              target.thisAnimationDuration = null;
            }, time);
            target.thisAnimationDuration = time;
          }
        });
        clearTimeout(animationCallbackId);
        if (!animating) {
          if (typeof callback === "function") callback();
        } else {
          animationCallbackId = setTimeout(function () {
            if (typeof callback === "function") callback();
          }, animationTime);
        }
        animationStates = [];
      },
      animate: function animate(target, currentRect, toRect, duration) {
        if (duration) {
          css(target, "transition", "");
          css(target, "transform", "");
          var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
          target.animatingX = !!translateX;
          target.animatingY = !!translateY;
          css(
            target,
            "transform",
            "translate3d(" + translateX + "px," + translateY + "px,0)"
          );
          this.forRepaintDummy = repaint(target); // repaint
          css(
            target,
            "transition",
            "transform " +
              duration +
              "ms" +
              (this.options.easing ? " " + this.options.easing : "")
          );
          css(target, "transform", "translate3d(0,0,0)");
          typeof target.animated === "number" && clearTimeout(target.animated);
          target.animated = setTimeout(function () {
            css(target, "transition", "");
            css(target, "transform", "");
            target.animated = false;
            target.animatingX = false;
            target.animatingY = false;
          }, duration);
        }
      },
    };
  }
  function repaint(target) {
    return target.offsetWidth;
  }
  function calculateRealTime(animatingRect, fromRect, toRect, options) {
    return (
      (Math.sqrt(
        Math.pow(fromRect.top - animatingRect.top, 2) +
          Math.pow(fromRect.left - animatingRect.left, 2)
      ) /
        Math.sqrt(
          Math.pow(fromRect.top - toRect.top, 2) +
            Math.pow(fromRect.left - toRect.left, 2)
        )) *
      options.animation
    );
  }
  var plugins = [];
  var defaults = { initializeByDefault: true };
  var PluginManager = {
    mount: function mount(plugin) {
      // Set default static properties
      for (var option in defaults) {
        if (defaults.hasOwnProperty(option) && !(option in plugin)) {
          plugin[option] = defaults[option];
        }
      }
      plugins.forEach(function (p) {
        if (p.pluginName === plugin.pluginName) {
          throw "Sortable: Cannot mount plugin ".concat(
            plugin.pluginName,
            " more than once"
          );
        }
      });
      plugins.push(plugin);
    },
    pluginEvent: function pluginEvent(eventName, sortable, evt) {
      var _this = this;
      this.eventCanceled = false;
      evt.cancel = function () {
        _this.eventCanceled = true;
      };
      var eventNameGlobal = eventName + "Global";
      plugins.forEach(function (plugin) {
        if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable
        if (sortable[plugin.pluginName][eventNameGlobal]) {
          sortable[plugin.pluginName][eventNameGlobal](
            _objectSpread({ sortable: sortable }, evt)
          );
        } // Only fire plugin event if plugin is enabled in this sortable,
        // and plugin has event defined
        if (
          sortable.options[plugin.pluginName] &&
          sortable[plugin.pluginName][eventName]
        ) {
          sortable[plugin.pluginName][eventName](
            _objectSpread({ sortable: sortable }, evt)
          );
        }
      });
    },
    initializePlugins: function initializePlugins(
      sortable,
      el,
      defaults,
      options
    ) {
      plugins.forEach(function (plugin) {
        var pluginName = plugin.pluginName;
        if (!sortable.options[pluginName] && !plugin.initializeByDefault)
          return;
        var initialized = new plugin(sortable, el, sortable.options);
        initialized.sortable = sortable;
        initialized.options = sortable.options;
        sortable[pluginName] = initialized; // Add default options from plugin
        _extends(defaults, initialized.defaults);
      });
      for (var option in sortable.options) {
        if (!sortable.options.hasOwnProperty(option)) continue;
        var modified = this.modifyOption(
          sortable,
          option,
          sortable.options[option]
        );
        if (typeof modified !== "undefined") {
          sortable.options[option] = modified;
        }
      }
    },
    getEventProperties: function getEventProperties(name, sortable) {
      var eventProperties = {};
      plugins.forEach(function (plugin) {
        if (typeof plugin.eventProperties !== "function") return;
        _extends(
          eventProperties,
          plugin.eventProperties.call(sortable[plugin.pluginName], name)
        );
      });
      return eventProperties;
    },
    modifyOption: function modifyOption(sortable, name, value) {
      var modifiedValue;
      plugins.forEach(function (plugin) {
        // Plugin must exist on the Sortable
        if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin
        if (
          plugin.optionListeners &&
          typeof plugin.optionListeners[name] === "function"
        ) {
          modifiedValue = plugin.optionListeners[name].call(
            sortable[plugin.pluginName],
            value
          );
        }
      });
      return modifiedValue;
    },
  };
  function dispatchEvent(_ref) {
    var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
    sortable = sortable || (rootEl && rootEl[expando]);
    if (!sortable) return;
    var evt,
      options = sortable.options,
      onName = "on" + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent(name, { bubbles: true, cancelable: true });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent(name, true, true);
    }
    evt.to = toEl || rootEl;
    evt.from = fromEl || rootEl;
    evt.item = targetEl || rootEl;
    evt.clone = cloneEl;
    evt.oldIndex = oldIndex;
    evt.newIndex = newIndex;
    evt.oldDraggableIndex = oldDraggableIndex;
    evt.newDraggableIndex = newDraggableIndex;
    evt.originalEvent = originalEvent;
    evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;
    var allEventProperties = _objectSpread(
      {},
      extraEventProperties,
      PluginManager.getEventProperties(name, sortable)
    );
    for (var option in allEventProperties) {
      evt[option] = allEventProperties[option];
    }
    if (rootEl) {
      rootEl.dispatchEvent(evt);
    }
    if (options[onName]) {
      options[onName].call(sortable, evt);
    }
  }
  var pluginEvent = function pluginEvent(eventName, sortable) {
    var _ref =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, ["evt"]);
    PluginManager.pluginEvent.bind(Sortable)(
      eventName,
      sortable,
      _objectSpread(
        {
          dragEl: dragEl,
          parentEl: parentEl,
          ghostEl: ghostEl,
          rootEl: rootEl,
          nextEl: nextEl,
          lastDownEl: lastDownEl,
          cloneEl: cloneEl,
          cloneHidden: cloneHidden,
          dragStarted: moved,
          putSortable: putSortable,
          activeSortable: Sortable.active,
          originalEvent: originalEvent,
          oldIndex: oldIndex,
          oldDraggableIndex: oldDraggableIndex,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          hideGhostForTarget: _hideGhostForTarget,
          unhideGhostForTarget: _unhideGhostForTarget,
          cloneNowHidden: function cloneNowHidden() {
            cloneHidden = true;
          },
          cloneNowShown: function cloneNowShown() {
            cloneHidden = false;
          },
          dispatchSortableEvent: function dispatchSortableEvent(name) {
            _dispatchEvent({
              sortable: sortable,
              name: name,
              originalEvent: originalEvent,
            });
          },
        },
        data
      )
    );
  };
  function _dispatchEvent(info) {
    dispatchEvent(
      _objectSpread(
        {
          putSortable: putSortable,
          cloneEl: cloneEl,
          targetEl: dragEl,
          rootEl: rootEl,
          oldIndex: oldIndex,
          oldDraggableIndex: oldDraggableIndex,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
        },
        info
      )
    );
  }
  var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance, // For positioning ghost absolutely
    ghostRelativeParent,
    ghostRelativeParentInitialScroll = [], // (left, top)
    _silent = false,
    savedInputChecked = [];
  /** @const */ var documentExists = typeof document !== "undefined",
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", // This will not pass for IE9, because IE9 DnD only works on anchors
    supportDraggable =
      documentExists &&
      !ChromeForAndroid &&
      !IOS &&
      "draggable" in document.createElement("div"),
    supportCssPointerEvents = (function () {
      if (!documentExists) return; // false when <= IE11
      if (IE11OrLess) {
        return false;
      }
      var el = document.createElement("x");
      el.style.cssText = "pointer-events:auto";
      return el.style.pointerEvents === "auto";
    })(),
    _detectDirection = function _detectDirection(el, options) {
      var elCSS = css(el),
        elWidth =
          parseInt(elCSS.width) -
          parseInt(elCSS.paddingLeft) -
          parseInt(elCSS.paddingRight) -
          parseInt(elCSS.borderLeftWidth) -
          parseInt(elCSS.borderRightWidth),
        child1 = getChild(el, 0, options),
        child2 = getChild(el, 1, options),
        firstChildCSS = child1 && css(child1),
        secondChildCSS = child2 && css(child2),
        firstChildWidth =
          firstChildCSS &&
          parseInt(firstChildCSS.marginLeft) +
            parseInt(firstChildCSS.marginRight) +
            getRect(child1).width,
        secondChildWidth =
          secondChildCSS &&
          parseInt(secondChildCSS.marginLeft) +
            parseInt(secondChildCSS.marginRight) +
            getRect(child2).width;
      if (elCSS.display === "flex") {
        return elCSS.flexDirection === "column" ||
          elCSS.flexDirection === "column-reverse"
          ? "vertical"
          : "horizontal";
      }
      if (elCSS.display === "grid") {
        return elCSS.gridTemplateColumns.split(" ").length <= 1
          ? "vertical"
          : "horizontal";
      }
      if (
        child1 &&
        firstChildCSS["float"] &&
        firstChildCSS["float"] !== "none"
      ) {
        var touchingSideChild2 =
          firstChildCSS["float"] === "left" ? "left" : "right";
        return child2 &&
          (secondChildCSS.clear === "both" ||
            secondChildCSS.clear === touchingSideChild2)
          ? "vertical"
          : "horizontal";
      }
      return child1 &&
        (firstChildCSS.display === "block" ||
          firstChildCSS.display === "flex" ||
          firstChildCSS.display === "table" ||
          firstChildCSS.display === "grid" ||
          (firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === "none") ||
          (child2 &&
            elCSS[CSSFloatProperty] === "none" &&
            firstChildWidth + secondChildWidth > elWidth))
        ? "vertical"
        : "horizontal";
    },
    _dragElInRowColumn = function _dragElInRowColumn(
      dragRect,
      targetRect,
      vertical
    ) {
      var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
        dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
        dragElOppLength = vertical ? dragRect.width : dragRect.height,
        targetS1Opp = vertical ? targetRect.left : targetRect.top,
        targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
        targetOppLength = vertical ? targetRect.width : targetRect.height;
      return (
        dragElS1Opp === targetS1Opp ||
        dragElS2Opp === targetS2Opp ||
        dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2
      );
    },
    /**
     * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
     * @param  {Number} x      X position
     * @param  {Number} y      Y position
     * @return {HTMLElement}   Element of the first found nearest Sortable
     */ _detectNearestEmptySortable = function _detectNearestEmptySortable(
      x,
      y
    ) {
      var ret;
      sortables.some(function (sortable) {
        if (lastChild(sortable)) return;
        var rect = getRect(sortable),
          threshold = sortable[expando].options.emptyInsertThreshold,
          insideHorizontally =
            x >= rect.left - threshold && x <= rect.right + threshold,
          insideVertically =
            y >= rect.top - threshold && y <= rect.bottom + threshold;
        if (threshold && insideHorizontally && insideVertically) {
          return (ret = sortable);
        }
      });
      return ret;
    },
    _prepareGroup = function _prepareGroup(options) {
      function toFn(value, pull) {
        return function (to, from, dragEl, evt) {
          var sameGroup =
            to.options.group.name &&
            from.options.group.name &&
            to.options.group.name === from.options.group.name;
          if (value == null && (pull || sameGroup)) {
            // Default pull value
            // Default pull and put value if same group
            return true;
          } else if (value == null || value === false) {
            return false;
          } else if (pull && value === "clone") {
            return value;
          } else if (typeof value === "function") {
            return toFn(value(to, from, dragEl, evt), pull)(
              to,
              from,
              dragEl,
              evt
            );
          } else {
            var otherGroup = (pull ? to : from).options.group.name;
            return (
              value === true ||
              (typeof value === "string" && value === otherGroup) ||
              (value.join && value.indexOf(otherGroup) > -1)
            );
          }
        };
      }
      var group = {};
      var originalGroup = options.group;
      if (!originalGroup || _typeof(originalGroup) != "object") {
        originalGroup = { name: originalGroup };
      }
      group.name = originalGroup.name;
      group.checkPull = toFn(originalGroup.pull, true);
      group.checkPut = toFn(originalGroup.put);
      group.revertClone = originalGroup.revertClone;
      options.group = group;
    },
    _hideGhostForTarget = function _hideGhostForTarget() {
      if (!supportCssPointerEvents && ghostEl) {
        css(ghostEl, "display", "none");
      }
    },
    _unhideGhostForTarget = function _unhideGhostForTarget() {
      if (!supportCssPointerEvents && ghostEl) {
        css(ghostEl, "display", "");
      }
    }; // #1184 fix - Prevent click event on fallback if dragged but item not changed position
  if (documentExists) {
    document.addEventListener(
      "click",
      function (evt) {
        if (ignoreNextClick) {
          evt.preventDefault();
          evt.stopPropagation && evt.stopPropagation();
          evt.stopImmediatePropagation && evt.stopImmediatePropagation();
          ignoreNextClick = false;
          return false;
        }
      },
      true
    );
  }
  var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(
    evt
  ) {
    if (dragEl) {
      evt = evt.touches ? evt.touches[0] : evt;
      var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);
      if (nearest) {
        // Create imitation event
        var event = {};
        for (var i in evt) {
          if (evt.hasOwnProperty(i)) {
            event[i] = evt[i];
          }
        }
        event.target = event.rootEl = nearest;
        event.preventDefault = void 0;
        event.stopPropagation = void 0;
        nearest[expando]._onDragOver(event);
      }
    }
  };
  var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
    if (dragEl) {
      dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
    }
  };
  /**
   * @class  Sortable
   * @param  {HTMLElement}  el
   * @param  {Object}       [options]
   */ function Sortable(el, options) {
    if (!(el && el.nodeType && el.nodeType === 1)) {
      throw "Sortable: `el` must be an HTMLElement, not ".concat(
        {}.toString.call(el)
      );
    }
    this.el = el; // root element
    this.options = options = _extends({}, options); // Export instance
    el[expando] = this;
    var defaults = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(el.nodeName) ? ">li" : ">*",
      swapThreshold: 1, // percentage; 0 <= x <= 1
      invertSwap: false, // invert always
      invertedSwapThreshold: null, // will be set to same as swapThreshold if default
      removeCloneOnHide: true,
      direction: function direction() {
        return _detectDirection(el, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function setData(dataTransfer, dragEl) {
        dataTransfer.setData("Text", dragEl.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold:
        (Number.parseInt ? Number : window).parseInt(
          window.devicePixelRatio,
          10
        ) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: { x: 0, y: 0 },
      supportPointer:
        Sortable.supportPointer !== false &&
        "PointerEvent" in window &&
        !Safari,
      emptyInsertThreshold: 5,
    };
    PluginManager.initializePlugins(this, el, defaults); // Set default options
    for (var name in defaults) {
      !(name in options) && (options[name] = defaults[name]);
    }
    _prepareGroup(options); // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === "_" && typeof this[fn] === "function") {
        this[fn] = this[fn].bind(this);
      }
    } // Setup drag mode
    this.nativeDraggable = options.forceFallback ? false : supportDraggable;
    if (this.nativeDraggable) {
      // Touch start threshold cannot be greater than the native dragstart threshold
      this.options.touchStartThreshold = 1;
    } // Bind events
    if (options.supportPointer) {
      on(el, "pointerdown", this._onTapStart);
    } else {
      on(el, "mousedown", this._onTapStart);
      on(el, "touchstart", this._onTapStart);
    }
    if (this.nativeDraggable) {
      on(el, "dragover", this);
      on(el, "dragenter", this);
    }
    sortables.push(this.el); // Restore sorting
    options.store &&
      options.store.get &&
      this.sort(options.store.get(this) || []); // Add animation state manager
    _extends(this, AnimationStateManager());
  }
  Sortable.prototype = /** @lends Sortable.prototype */ {
    constructor: Sortable,
    _isOutsideThisEl: function _isOutsideThisEl(target) {
      if (!this.el.contains(target) && target !== this.el) {
        lastTarget = null;
      }
    },
    _getDirection: function _getDirection(evt, target) {
      return typeof this.options.direction === "function"
        ? this.options.direction.call(this, evt, target, dragEl)
        : this.options.direction;
    },
    _onTapStart: function _onTapStart(/** Event|TouchEvent */ evt) {
      if (!evt.cancelable) return;
      var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch =
          (evt.touches && evt.touches[0]) ||
          (evt.pointerType && evt.pointerType === "touch" && evt),
        target = (touch || evt).target,
        originalTarget =
          (evt.target.shadowRoot &&
            ((evt.path && evt.path[0]) ||
              (evt.composedPath && evt.composedPath()[0]))) ||
          target,
        filter = options.filter;
      _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
      if (dragEl) {
        return;
      }
      if (
        (/mousedown|pointerdown/.test(type) && evt.button !== 0) ||
        options.disabled
      ) {
        return; // only left button and enabled
      } // cancel dnd if original target is content editable
      if (originalTarget.isContentEditable) {
        return;
      } // Safari ignores further event handling after mousedown
      if (
        !this.nativeDraggable &&
        Safari &&
        target &&
        target.tagName.toUpperCase() === "SELECT"
      ) {
        return;
      }
      target = closest(target, options.draggable, el, false);
      if (target && target.animated) {
        return;
      }
      if (lastDownEl === target) {
        // Ignoring duplicate `down`
        return;
      } // Get the index of the dragged element within its parent
      oldIndex = index(target);
      oldDraggableIndex = index(target, options.draggable); // Check filter
      if (typeof filter === "function") {
        if (filter.call(this, evt, target, this)) {
          _dispatchEvent({
            sortable: _this,
            rootEl: originalTarget,
            name: "filter",
            targetEl: target,
            toEl: el,
            fromEl: el,
          });
          pluginEvent("filter", _this, { evt: evt });
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      } else if (filter) {
        filter = filter.split(",").some(function (criteria) {
          criteria = closest(originalTarget, criteria.trim(), el, false);
          if (criteria) {
            _dispatchEvent({
              sortable: _this,
              rootEl: criteria,
              name: "filter",
              targetEl: target,
              fromEl: el,
              toEl: el,
            });
            pluginEvent("filter", _this, { evt: evt });
            return true;
          }
        });
        if (filter) {
          preventOnFilter && evt.cancelable && evt.preventDefault();
          return; // cancel dnd
        }
      }
      if (
        options.handle &&
        !closest(originalTarget, options.handle, el, false)
      ) {
        return;
      } // Prepare `dragstart`
      this._prepareDragStart(evt, touch, target);
    },
    _prepareDragStart: function _prepareDragStart(
      /** Event */ evt,
      /** Touch */ touch,
      /** HTMLElement */ target
    ) {
      var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;
      if (target && !dragEl && target.parentNode === el) {
        var dragRect = getRect(target);
        rootEl = el;
        dragEl = target;
        parentEl = dragEl.parentNode;
        nextEl = dragEl.nextSibling;
        lastDownEl = target;
        activeGroup = options.group;
        Sortable.dragged = dragEl;
        tapEvt = {
          target: dragEl,
          clientX: (touch || evt).clientX,
          clientY: (touch || evt).clientY,
        };
        tapDistanceLeft = tapEvt.clientX - dragRect.left;
        tapDistanceTop = tapEvt.clientY - dragRect.top;
        this._lastX = (touch || evt).clientX;
        this._lastY = (touch || evt).clientY;
        dragEl.style["will-change"] = "all";
        dragStartFn = function dragStartFn() {
          pluginEvent("delayEnded", _this, { evt: evt });
          if (Sortable.eventCanceled) {
            _this._onDrop();
            return;
          } // Delayed drag has been triggered
          // we can re-enable the events: touchmove/mousemove
          _this._disableDelayedDragEvents();
          if (!FireFox && _this.nativeDraggable) {
            dragEl.draggable = true;
          } // Bind the events: dragstart/dragend
          _this._triggerDragStart(evt, touch); // Drag start event
          _dispatchEvent({
            sortable: _this,
            name: "choose",
            originalEvent: evt,
          }); // Chosen item
          toggleClass(dragEl, options.chosenClass, true);
        }; // Disable "draggable"
        options.ignore.split(",").forEach(function (criteria) {
          find(dragEl, criteria.trim(), _disableDraggable);
        });
        on(ownerDocument, "dragover", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mousemove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "touchmove", nearestEmptyInsertDetectEvent);
        on(ownerDocument, "mouseup", _this._onDrop);
        on(ownerDocument, "touchend", _this._onDrop);
        on(ownerDocument, "touchcancel", _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)
        if (FireFox && this.nativeDraggable) {
          this.options.touchStartThreshold = 4;
          dragEl.draggable = true;
        }
        pluginEvent("delayStart", this, { evt: evt }); // Delay is impossible for native DnD in Edge or IE
        if (
          options.delay &&
          (!options.delayOnTouchOnly || touch) &&
          (!this.nativeDraggable || !(Edge || IE11OrLess))
        ) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          } // If the user moves the pointer or let go the click or touch
          // before the delay has been reached:
          // disable the delayed drag
          on(ownerDocument, "mouseup", _this._disableDelayedDrag);
          on(ownerDocument, "touchend", _this._disableDelayedDrag);
          on(ownerDocument, "touchcancel", _this._disableDelayedDrag);
          on(ownerDocument, "mousemove", _this._delayedDragTouchMoveHandler);
          on(ownerDocument, "touchmove", _this._delayedDragTouchMoveHandler);
          options.supportPointer &&
            on(
              ownerDocument,
              "pointermove",
              _this._delayedDragTouchMoveHandler
            );
          _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
        } else {
          dragStartFn();
        }
      }
    },
    _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
      /** TouchEvent|PointerEvent **/ e
    ) {
      var touch = e.touches ? e.touches[0] : e;
      if (
        Math.max(
          Math.abs(touch.clientX - this._lastX),
          Math.abs(touch.clientY - this._lastY)
        ) >=
        Math.floor(
          this.options.touchStartThreshold /
            ((this.nativeDraggable && window.devicePixelRatio) || 1)
        )
      ) {
        this._disableDelayedDrag();
      }
    },
    _disableDelayedDrag: function _disableDelayedDrag() {
      dragEl && _disableDraggable(dragEl);
      clearTimeout(this._dragStartTimer);
      this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function _disableDelayedDragEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._disableDelayedDrag);
      off(ownerDocument, "touchend", this._disableDelayedDrag);
      off(ownerDocument, "touchcancel", this._disableDelayedDrag);
      off(ownerDocument, "mousemove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "touchmove", this._delayedDragTouchMoveHandler);
      off(ownerDocument, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function _triggerDragStart(
      /** Event */ evt,
      /** Touch */ touch
    ) {
      touch = touch || (evt.pointerType == "touch" && evt);
      if (!this.nativeDraggable || touch) {
        if (this.options.supportPointer) {
          on(document, "pointermove", this._onTouchMove);
        } else if (touch) {
          on(document, "touchmove", this._onTouchMove);
        } else {
          on(document, "mousemove", this._onTouchMove);
        }
      } else {
        on(dragEl, "dragend", this);
        on(rootEl, "dragstart", this._onDragStart);
      }
      try {
        if (document.selection) {
          // Timeout neccessary for IE9
          _nextTick(function () {
            document.selection.empty();
          });
        } else {
          window.getSelection().removeAllRanges();
        }
      } catch (err) {}
    },
    _dragStarted: function _dragStarted(fallback, evt) {
      awaitingDragStarted = false;
      if (rootEl && dragEl) {
        pluginEvent("dragStarted", this, { evt: evt });
        if (this.nativeDraggable) {
          on(document, "dragover", _checkOutsideTargetEl);
        }
        var options = this.options; // Apply effect
        !fallback && toggleClass(dragEl, options.dragClass, false);
        toggleClass(dragEl, options.ghostClass, true);
        Sortable.active = this;
        fallback && this._appendGhost(); // Drag start event
        _dispatchEvent({ sortable: this, name: "start", originalEvent: evt });
      } else {
        this._nulling();
      }
    },
    _emulateDragOver: function _emulateDragOver() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX;
        this._lastY = touchEvt.clientY;
        _hideGhostForTarget();
        var target = document.elementFromPoint(
          touchEvt.clientX,
          touchEvt.clientY
        );
        var parent = target;
        while (target && target.shadowRoot) {
          target = target.shadowRoot.elementFromPoint(
            touchEvt.clientX,
            touchEvt.clientY
          );
          if (target === parent) break;
          parent = target;
        }
        dragEl.parentNode[expando]._isOutsideThisEl(target);
        if (parent) {
          do {
            if (parent[expando]) {
              var inserted = void 0;
              inserted = parent[expando]._onDragOver({
                clientX: touchEvt.clientX,
                clientY: touchEvt.clientY,
                target: target,
                rootEl: parent,
              });
              if (inserted && !this.options.dragoverBubble) {
                break;
              }
            }
            target = parent; // store last element
          } while (/* jshint boss:true */ (parent = parent.parentNode));
        }
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function _onTouchMove(/**TouchEvent*/ evt) {
      if (tapEvt) {
        var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset =
            PositionGhostAbsolutely &&
            ghostRelativeParent &&
            getRelativeScrollOffset(ghostRelativeParent),
          dx =
            (touch.clientX - tapEvt.clientX + fallbackOffset.x) /
              (scaleX || 1) +
            (relativeScrollOffset
              ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]
              : 0) /
              (scaleX || 1),
          dy =
            (touch.clientY - tapEvt.clientY + fallbackOffset.y) /
              (scaleY || 1) +
            (relativeScrollOffset
              ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]
              : 0) /
              (scaleY || 1); // only set the status to dragging, when we are actually dragging
        if (!Sortable.active && !awaitingDragStarted) {
          if (
            fallbackTolerance &&
            Math.max(
              Math.abs(touch.clientX - this._lastX),
              Math.abs(touch.clientY - this._lastY)
            ) < fallbackTolerance
          ) {
            return;
          }
          this._onDragStart(evt, true);
        }
        if (ghostEl) {
          if (ghostMatrix) {
            ghostMatrix.e += dx - (lastDx || 0);
            ghostMatrix.f += dy - (lastDy || 0);
          } else {
            ghostMatrix = { a: 1, b: 0, c: 0, d: 1, e: dx, f: dy };
          }
          var cssMatrix = "matrix("
            .concat(ghostMatrix.a, ",")
            .concat(ghostMatrix.b, ",")
            .concat(ghostMatrix.c, ",")
            .concat(ghostMatrix.d, ",")
            .concat(ghostMatrix.e, ",")
            .concat(ghostMatrix.f, ")");
          css(ghostEl, "webkitTransform", cssMatrix);
          css(ghostEl, "mozTransform", cssMatrix);
          css(ghostEl, "msTransform", cssMatrix);
          css(ghostEl, "transform", cssMatrix);
          lastDx = dx;
          lastDy = dy;
          touchEvt = touch;
        }
        evt.cancelable && evt.preventDefault();
      }
    },
    _appendGhost: function _appendGhost() {
      // Bug if using scale(): https://stackoverflow.com/questions/2637058
      // Not being adjusted for
      if (!ghostEl) {
        var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(
            dragEl,
            true,
            PositionGhostAbsolutely,
            true,
            container
          ),
          options = this.options; // Position absolutely
        if (PositionGhostAbsolutely) {
          // Get relatively positioned parent
          ghostRelativeParent = container;
          while (
            css(ghostRelativeParent, "position") === "static" &&
            css(ghostRelativeParent, "transform") === "none" &&
            ghostRelativeParent !== document
          ) {
            ghostRelativeParent = ghostRelativeParent.parentNode;
          }
          if (
            ghostRelativeParent !== document.body &&
            ghostRelativeParent !== document.documentElement
          ) {
            if (ghostRelativeParent === document)
              ghostRelativeParent = getWindowScrollingElement();
            rect.top += ghostRelativeParent.scrollTop;
            rect.left += ghostRelativeParent.scrollLeft;
          } else {
            ghostRelativeParent = getWindowScrollingElement();
          }
          ghostRelativeParentInitialScroll = getRelativeScrollOffset(
            ghostRelativeParent
          );
        }
        ghostEl = dragEl.cloneNode(true);
        toggleClass(ghostEl, options.ghostClass, false);
        toggleClass(ghostEl, options.fallbackClass, true);
        toggleClass(ghostEl, options.dragClass, true);
        css(ghostEl, "transition", "");
        css(ghostEl, "transform", "");
        css(ghostEl, "box-sizing", "border-box");
        css(ghostEl, "margin", 0);
        css(ghostEl, "top", rect.top);
        css(ghostEl, "left", rect.left);
        css(ghostEl, "width", rect.width);
        css(ghostEl, "height", rect.height);
        css(ghostEl, "opacity", "0.8");
        css(
          ghostEl,
          "position",
          PositionGhostAbsolutely ? "absolute" : "fixed"
        );
        css(ghostEl, "zIndex", "100000");
        css(ghostEl, "pointerEvents", "none");
        Sortable.ghost = ghostEl;
        container.appendChild(ghostEl); // Set transform-origin
        css(
          ghostEl,
          "transform-origin",
          (tapDistanceLeft / parseInt(ghostEl.style.width)) * 100 +
            "% " +
            (tapDistanceTop / parseInt(ghostEl.style.height)) * 100 +
            "%"
        );
      }
    },
    _onDragStart: function _onDragStart(/**Event*/ evt, /**boolean*/ fallback) {
      var _this = this;
      var dataTransfer = evt.dataTransfer;
      var options = _this.options;
      pluginEvent("dragStart", this, { evt: evt });
      if (Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent("setupClone", this);
      if (!Sortable.eventCanceled) {
        cloneEl = clone(dragEl);
        cloneEl.draggable = false;
        cloneEl.style["will-change"] = "";
        this._hideClone();
        toggleClass(cloneEl, this.options.chosenClass, false);
        Sortable.clone = cloneEl;
      } // #1143: IFrame support workaround
      _this.cloneId = _nextTick(function () {
        pluginEvent("clone", _this);
        if (Sortable.eventCanceled) return;
        if (!_this.options.removeCloneOnHide) {
          rootEl.insertBefore(cloneEl, dragEl);
        }
        _this._hideClone();
        _dispatchEvent({ sortable: _this, name: "clone" });
      });
      !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events
      if (fallback) {
        ignoreNextClick = true;
        _this._loopId = setInterval(_this._emulateDragOver, 50);
      } else {
        // Undo what was set in _prepareDragStart before drag started
        off(document, "mouseup", _this._onDrop);
        off(document, "touchend", _this._onDrop);
        off(document, "touchcancel", _this._onDrop);
        if (dataTransfer) {
          dataTransfer.effectAllowed = "move";
          options.setData && options.setData.call(_this, dataTransfer, dragEl);
        }
        on(document, "drop", _this); // #1276 fix:
        css(dragEl, "transform", "translateZ(0)");
      }
      awaitingDragStarted = true;
      _this._dragStartId = _nextTick(
        _this._dragStarted.bind(_this, fallback, evt)
      );
      on(document, "selectstart", _this);
      moved = true;
      if (Safari) {
        css(document.body, "user-select", "none");
      }
    }, // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function _onDragOver(/**Event*/ evt) {
      var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;
      if (_silent) return;
      function dragOverEvent(name, extra) {
        pluginEvent(
          name,
          _this,
          _objectSpread(
            {
              evt: evt,
              isOwner: isOwner,
              axis: vertical ? "vertical" : "horizontal",
              revert: revert,
              dragRect: dragRect,
              targetRect: targetRect,
              canSort: canSort,
              fromSortable: fromSortable,
              target: target,
              completed: completed,
              onMove: function onMove(target, after) {
                return _onMove(
                  rootEl,
                  el,
                  dragEl,
                  dragRect,
                  target,
                  getRect(target),
                  evt,
                  after
                );
              },
              changed: changed,
            },
            extra
          )
        );
      } // Capture animation state
      function capture() {
        dragOverEvent("dragOverAnimationCapture");
        _this.captureAnimationState();
        if (_this !== fromSortable) {
          fromSortable.captureAnimationState();
        }
      } // Return invocation when dragEl is inserted (or completed)
      function completed(insertion) {
        dragOverEvent("dragOverCompleted", { insertion: insertion });
        if (insertion) {
          // Clones must be hidden before folding animation to capture dragRectAbsolute properly
          if (isOwner) {
            activeSortable._hideClone();
          } else {
            activeSortable._showClone(_this);
          }
          if (_this !== fromSortable) {
            // Set ghost class to new sortable's ghost class
            toggleClass(
              dragEl,
              putSortable
                ? putSortable.options.ghostClass
                : activeSortable.options.ghostClass,
              false
            );
            toggleClass(dragEl, options.ghostClass, true);
          }
          if (putSortable !== _this && _this !== Sortable.active) {
            putSortable = _this;
          } else if (_this === Sortable.active && putSortable) {
            putSortable = null;
          } // Animation
          if (fromSortable === _this) {
            _this._ignoreWhileAnimating = target;
          }
          _this.animateAll(function () {
            dragOverEvent("dragOverAnimationComplete");
            _this._ignoreWhileAnimating = null;
          });
          if (_this !== fromSortable) {
            fromSortable.animateAll();
            fromSortable._ignoreWhileAnimating = null;
          }
        } // Null lastTarget if it is not inside a previously swapped element
        if (
          (target === dragEl && !dragEl.animated) ||
          (target === el && !target.animated)
        ) {
          lastTarget = null;
        } // no bubbling and not fallback
        if (!options.dragoverBubble && !evt.rootEl && target !== document) {
          dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted
          !insertion && nearestEmptyInsertDetectEvent(evt);
        }
        !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
        return (completedFired = true);
      } // Call when dragEl has been inserted
      function changed() {
        newIndex = index(dragEl);
        newDraggableIndex = index(dragEl, options.draggable);
        _dispatchEvent({
          sortable: _this,
          name: "change",
          toEl: el,
          newIndex: newIndex,
          newDraggableIndex: newDraggableIndex,
          originalEvent: evt,
        });
      }
      if (evt.preventDefault !== void 0) {
        evt.cancelable && evt.preventDefault();
      }
      target = closest(target, options.draggable, el, true);
      dragOverEvent("dragOver");
      if (Sortable.eventCanceled) return completedFired;
      if (
        dragEl.contains(evt.target) ||
        (target.animated && target.animatingX && target.animatingY) ||
        _this._ignoreWhileAnimating === target
      ) {
        return completed(false);
      }
      ignoreNextClick = false;
      if (
        activeSortable &&
        !options.disabled &&
        (isOwner
          ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
          : putSortable === this ||
            ((this.lastPutMode = activeGroup.checkPull(
              this,
              activeSortable,
              dragEl,
              evt
            )) &&
              group.checkPut(this, activeSortable, dragEl, evt)))
      ) {
        vertical = this._getDirection(evt, target) === "vertical";
        dragRect = getRect(dragEl);
        dragOverEvent("dragOverValid");
        if (Sortable.eventCanceled) return completedFired;
        if (revert) {
          parentEl = rootEl; // actualization
          capture();
          this._hideClone();
          dragOverEvent("revert");
          if (!Sortable.eventCanceled) {
            if (nextEl) {
              rootEl.insertBefore(dragEl, nextEl);
            } else {
              rootEl.appendChild(dragEl);
            }
          }
          return completed(true);
        }
        var elLastChild = lastChild(el, options.draggable);
        if (
          !elLastChild ||
          (_ghostIsLast(evt, vertical, this) && !elLastChild.animated)
        ) {
          // If already at end of list: Do not insert
          if (elLastChild === dragEl) {
            return completed(false);
          } // assign target only if condition is true
          if (elLastChild && el === evt.target) {
            target = elLastChild;
          }
          if (target) {
            targetRect = getRect(target);
          }
          if (
            _onMove(
              rootEl,
              el,
              dragEl,
              dragRect,
              target,
              targetRect,
              evt,
              !!target
            ) !== false
          ) {
            capture();
            el.appendChild(dragEl);
            parentEl = el; // actualization
            changed();
            return completed(true);
          }
        } else if (target.parentNode === el) {
          targetRect = getRect(target);
          var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(
              (dragEl.animated && dragEl.toRect) || dragRect,
              (target.animated && target.toRect) || targetRect,
              vertical
            ),
            side1 = vertical ? "top" : "left",
            scrolledPastTop =
              isScrolledPast(target, "top", "top") ||
              isScrolledPast(dragEl, "top", "top"),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;
          if (lastTarget !== target) {
            targetBeforeFirstSwap = targetRect[side1];
            pastFirstInvertThresh = false;
            isCircumstantialInvert =
              (!differentRowCol && options.invertSwap) || differentLevel;
          }
          direction = _getSwapDirection(
            evt,
            target,
            targetRect,
            vertical,
            differentRowCol ? 1 : options.swapThreshold,
            options.invertedSwapThreshold == null
              ? options.swapThreshold
              : options.invertedSwapThreshold,
            isCircumstantialInvert,
            lastTarget === target
          );
          var sibling;
          if (direction !== 0) {
            // Check if target is beside dragEl in respective direction (ignoring hidden elements)
            var dragIndex = index(dragEl);
            do {
              dragIndex -= direction;
              sibling = parentEl.children[dragIndex];
            } while (
              sibling &&
              (css(sibling, "display") === "none" || sibling === ghostEl)
            );
          } // If dragEl is already beside target: Do not insert
          if (direction === 0 || sibling === target) {
            return completed(false);
          }
          lastTarget = target;
          lastDirection = direction;
          var nextSibling = target.nextElementSibling,
            after = false;
          after = direction === 1;
          var moveVector = _onMove(
            rootEl,
            el,
            dragEl,
            dragRect,
            target,
            targetRect,
            evt,
            after
          );
          if (moveVector !== false) {
            if (moveVector === 1 || moveVector === -1) {
              after = moveVector === 1;
            }
            _silent = true;
            setTimeout(_unsilent, 30);
            capture();
            if (after && !nextSibling) {
              el.appendChild(dragEl);
            } else {
              target.parentNode.insertBefore(
                dragEl,
                after ? nextSibling : target
              );
            } // Undo chrome's scroll adjustment (has no effect on other browsers)
            if (scrolledPastTop) {
              scrollBy(
                scrolledPastTop,
                0,
                scrollBefore - scrolledPastTop.scrollTop
              );
            }
            parentEl = dragEl.parentNode; // actualization
            // must be done before animation
            if (
              targetBeforeFirstSwap !== undefined &&
              !isCircumstantialInvert
            ) {
              targetMoveDistance = Math.abs(
                targetBeforeFirstSwap - getRect(target)[side1]
              );
            }
            changed();
            return completed(true);
          }
        }
        if (el.contains(dragEl)) {
          return completed(false);
        }
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function _offMoveEvents() {
      off(document, "mousemove", this._onTouchMove);
      off(document, "touchmove", this._onTouchMove);
      off(document, "pointermove", this._onTouchMove);
      off(document, "dragover", nearestEmptyInsertDetectEvent);
      off(document, "mousemove", nearestEmptyInsertDetectEvent);
      off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function _offUpEvents() {
      var ownerDocument = this.el.ownerDocument;
      off(ownerDocument, "mouseup", this._onDrop);
      off(ownerDocument, "touchend", this._onDrop);
      off(ownerDocument, "pointerup", this._onDrop);
      off(ownerDocument, "touchcancel", this._onDrop);
      off(document, "selectstart", this);
    },
    _onDrop: function _onDrop(/**Event*/ evt) {
      var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      pluginEvent("drop", this, { evt: evt });
      parentEl = dragEl && dragEl.parentNode; // Get again after plugin event
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);
      if (Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false;
      isCircumstantialInvert = false;
      pastFirstInvertThresh = false;
      clearInterval(this._loopId);
      clearTimeout(this._dragStartTimer);
      _cancelNextTick(this.cloneId);
      _cancelNextTick(this._dragStartId); // Unbind events
      if (this.nativeDraggable) {
        off(document, "drop", this);
        off(el, "dragstart", this._onDragStart);
      }
      this._offMoveEvents();
      this._offUpEvents();
      if (Safari) {
        css(document.body, "user-select", "");
      }
      css(dragEl, "transform", "");
      if (evt) {
        if (moved) {
          evt.cancelable && evt.preventDefault();
          !options.dropBubble && evt.stopPropagation();
        }
        ghostEl &&
          ghostEl.parentNode &&
          ghostEl.parentNode.removeChild(ghostEl);
        if (
          rootEl === parentEl ||
          (putSortable && putSortable.lastPutMode !== "clone")
        ) {
          // Remove clone(s)
          cloneEl &&
            cloneEl.parentNode &&
            cloneEl.parentNode.removeChild(cloneEl);
        }
        if (dragEl) {
          if (this.nativeDraggable) {
            off(dragEl, "dragend", this);
          }
          _disableDraggable(dragEl);
          dragEl.style["will-change"] = ""; // Remove classes
          // ghostClass is added in dragStarted
          if (moved && !awaitingDragStarted) {
            toggleClass(
              dragEl,
              putSortable
                ? putSortable.options.ghostClass
                : this.options.ghostClass,
              false
            );
          }
          toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event
          _dispatchEvent({
            sortable: this,
            name: "unchoose",
            toEl: parentEl,
            newIndex: null,
            newDraggableIndex: null,
            originalEvent: evt,
          });
          if (rootEl !== parentEl) {
            if (newIndex >= 0) {
              // Add event
              _dispatchEvent({
                rootEl: parentEl,
                name: "add",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt,
              }); // Remove event
              _dispatchEvent({
                sortable: this,
                name: "remove",
                toEl: parentEl,
                originalEvent: evt,
              }); // drag from one list and drop into another
              _dispatchEvent({
                rootEl: parentEl,
                name: "sort",
                toEl: parentEl,
                fromEl: rootEl,
                originalEvent: evt,
              });
              _dispatchEvent({
                sortable: this,
                name: "sort",
                toEl: parentEl,
                originalEvent: evt,
              });
            }
            putSortable && putSortable.save();
          } else {
            if (newIndex !== oldIndex) {
              if (newIndex >= 0) {
                // drag & drop within the same list
                _dispatchEvent({
                  sortable: this,
                  name: "update",
                  toEl: parentEl,
                  originalEvent: evt,
                });
                _dispatchEvent({
                  sortable: this,
                  name: "sort",
                  toEl: parentEl,
                  originalEvent: evt,
                });
              }
            }
          }
          if (Sortable.active) {
            /* jshint eqnull:true */ if (newIndex == null || newIndex === -1) {
              newIndex = oldIndex;
              newDraggableIndex = oldDraggableIndex;
            }
            _dispatchEvent({
              sortable: this,
              name: "end",
              toEl: parentEl,
              originalEvent: evt,
            }); // Save sorting
            this.save();
          }
        }
      }
      this._nulling();
    },
    _nulling: function _nulling() {
      pluginEvent("nulling", this);
      rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      savedInputChecked.forEach(function (el) {
        el.checked = true;
      });
      savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function handleEvent(/**Event*/ evt) {
      switch (evt.type) {
        case "drop":
        case "dragend":
          this._onDrop(evt);
          break;
        case "dragenter":
        case "dragover":
          if (dragEl) {
            this._onDragOver(evt);
            _globalDragOver(evt);
          }
          break;
        case "selectstart":
          evt.preventDefault();
          break;
      }
    },
    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */ toArray: function toArray() {
      var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;
      for (; i < n; i++) {
        el = children[i];
        if (closest(el, options.draggable, this.el, false)) {
          order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
      }
      return order;
    },
    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */ sort: function sort(order, useAnimation) {
      var items = {},
        rootEl = this.el;
      this.toArray().forEach(function (id, i) {
        var el = rootEl.children[i];
        if (closest(el, this.options.draggable, rootEl, false)) {
          items[id] = el;
        }
      }, this);
      useAnimation && this.captureAnimationState();
      order.forEach(function (id) {
        if (items[id]) {
          rootEl.removeChild(items[id]);
          rootEl.appendChild(items[id]);
        }
      });
      useAnimation && this.animateAll();
    },
    /**
     * Save the current sorting
     */ save: function save() {
      var store = this.options.store;
      store && store.set && store.set(this);
    },
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */ closest: function closest$1(el, selector) {
      return closest(el, selector || this.options.draggable, this.el, false);
    },
    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */ option: function option(name, value) {
      var options = this.options;
      if (value === void 0) {
        return options[name];
      } else {
        var modifiedValue = PluginManager.modifyOption(this, name, value);
        if (typeof modifiedValue !== "undefined") {
          options[name] = modifiedValue;
        } else {
          options[name] = value;
        }
        if (name === "group") {
          _prepareGroup(options);
        }
      }
    },
    /**
     * Destroy
     */ destroy: function destroy() {
      pluginEvent("destroy", this);
      var el = this.el;
      el[expando] = null;
      off(el, "mousedown", this._onTapStart);
      off(el, "touchstart", this._onTapStart);
      off(el, "pointerdown", this._onTapStart);
      if (this.nativeDraggable) {
        off(el, "dragover", this);
        off(el, "dragenter", this);
      } // Remove draggable attributes
      Array.prototype.forEach.call(
        el.querySelectorAll("[draggable]"),
        function (el) {
          el.removeAttribute("draggable");
        }
      );
      this._onDrop();
      this._disableDelayedDragEvents();
      sortables.splice(sortables.indexOf(this.el), 1);
      this.el = el = null;
    },
    _hideClone: function _hideClone() {
      if (!cloneHidden) {
        pluginEvent("hideClone", this);
        if (Sortable.eventCanceled) return;
        css(cloneEl, "display", "none");
        if (this.options.removeCloneOnHide && cloneEl.parentNode) {
          cloneEl.parentNode.removeChild(cloneEl);
        }
        cloneHidden = true;
      }
    },
    _showClone: function _showClone(putSortable) {
      if (putSortable.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        pluginEvent("showClone", this);
        if (Sortable.eventCanceled) return; // show clone at dragEl or original position
        if (dragEl.parentNode == rootEl && !this.options.group.revertClone) {
          rootEl.insertBefore(cloneEl, dragEl);
        } else if (nextEl) {
          rootEl.insertBefore(cloneEl, nextEl);
        } else {
          rootEl.appendChild(cloneEl);
        }
        if (this.options.group.revertClone) {
          this.animate(dragEl, cloneEl);
        }
        css(cloneEl, "display", "");
        cloneHidden = false;
      }
    },
  };
  function _globalDragOver(/**Event*/ evt) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = "move";
    }
    evt.cancelable && evt.preventDefault();
  }
  function _onMove(
    fromEl,
    toEl,
    dragEl,
    dragRect,
    targetEl,
    targetRect,
    originalEvent,
    willInsertAfter
  ) {
    var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature
    if (window.CustomEvent && !IE11OrLess && !Edge) {
      evt = new CustomEvent("move", { bubbles: true, cancelable: true });
    } else {
      evt = document.createEvent("Event");
      evt.initEvent("move", true, true);
    }
    evt.to = toEl;
    evt.from = fromEl;
    evt.dragged = dragEl;
    evt.draggedRect = dragRect;
    evt.related = targetEl || toEl;
    evt.relatedRect = targetRect || getRect(toEl);
    evt.willInsertAfter = willInsertAfter;
    evt.originalEvent = originalEvent;
    fromEl.dispatchEvent(evt);
    if (onMoveFn) {
      retVal = onMoveFn.call(sortable, evt, originalEvent);
    }
    return retVal;
  }
  function _disableDraggable(el) {
    el.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsLast(evt, vertical, sortable) {
    var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
    var spacer = 10;
    return vertical
      ? evt.clientX > rect.right + spacer ||
          (evt.clientX <= rect.right &&
            evt.clientY > rect.bottom &&
            evt.clientX >= rect.left)
      : (evt.clientX > rect.right && evt.clientY > rect.top) ||
          (evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer);
  }
  function _getSwapDirection(
    evt,
    target,
    targetRect,
    vertical,
    swapThreshold,
    invertedSwapThreshold,
    invertSwap,
    isLastTarget
  ) {
    var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;
    if (!invertSwap) {
      // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
      if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
        // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
        // check if past first invert threshold on side opposite of lastDirection
        if (
          !pastFirstInvertThresh &&
          (lastDirection === 1
            ? mouseOnAxis >
              targetS1 + (targetLength * invertedSwapThreshold) / 2
            : mouseOnAxis <
              targetS2 - (targetLength * invertedSwapThreshold) / 2)
        ) {
          // past first invert threshold, do not restrict inverted threshold to dragEl shadow
          pastFirstInvertThresh = true;
        }
        if (!pastFirstInvertThresh) {
          // dragEl shadow (target move distance shadow)
          if (
            lastDirection === 1
              ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
              : mouseOnAxis > targetS2 - targetMoveDistance
          ) {
            return -lastDirection;
          }
        } else {
          invert = true;
        }
      } else {
        // Regular
        if (
          mouseOnAxis > targetS1 + (targetLength * (1 - swapThreshold)) / 2 &&
          mouseOnAxis < targetS2 - (targetLength * (1 - swapThreshold)) / 2
        ) {
          return _getInsertDirection(target);
        }
      }
    }
    invert = invert || invertSwap;
    if (invert) {
      // Invert of regular
      if (
        mouseOnAxis < targetS1 + (targetLength * invertedSwapThreshold) / 2 ||
        mouseOnAxis > targetS2 - (targetLength * invertedSwapThreshold) / 2
      ) {
        return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
      }
    }
    return 0;
  }
  /**
   * Gets the direction dragEl must be swapped relative to target in order to make it
   * seem that dragEl has been "inserted" into that element's position
   * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
   * @return {Number}                   Direction dragEl must be swapped
   */ function _getInsertDirection(target) {
    if (index(dragEl) < index(target)) {
      return 1;
    } else {
      return -1;
    }
  }
  /**
   * Generate id
   * @param   {HTMLElement} el
   * @returns {String}
   * @private
   */ function _generateId(el) {
    var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;
    while (i--) {
      sum += str.charCodeAt(i);
    }
    return sum.toString(36);
  }
  function _saveInputCheckedState(root) {
    savedInputChecked.length = 0;
    var inputs = root.getElementsByTagName("input");
    var idx = inputs.length;
    while (idx--) {
      var el = inputs[idx];
      el.checked && savedInputChecked.push(el);
    }
  }
  function _nextTick(fn) {
    return setTimeout(fn, 0);
  }
  function _cancelNextTick(id) {
    return clearTimeout(id);
  } // Fixed #973:
  if (documentExists) {
    on(document, "touchmove", function (evt) {
      if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
        evt.preventDefault();
      }
    });
  } // Export utils
  Sortable.utils = {
    on: on,
    off: off,
    css: css,
    find: find,
    is: function is(el, selector) {
      return !!closest(el, selector, el, false);
    },
    extend: extend,
    throttle: throttle,
    closest: closest,
    toggleClass: toggleClass,
    clone: clone,
    index: index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild: getChild,
  };
  /**
   * Get the Sortable instance of an element
   * @param  {HTMLElement} element The element
   * @return {Sortable|undefined}         The instance of Sortable
   */ Sortable.get = function (element) {
    return element[expando];
  };
  /**
   * Mount a plugin to Sortable
   * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
   */ Sortable.mount = function () {
    for (
      var _len = arguments.length, plugins = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      plugins[_key] = arguments[_key];
    }
    if (plugins[0].constructor === Array) plugins = plugins[0];
    plugins.forEach(function (plugin) {
      if (!plugin.prototype || !plugin.prototype.constructor) {
        throw "Sortable: Mounted plugin must be a constructor function, not ".concat(
          {}.toString.call(plugin)
        );
      }
      if (plugin.utils)
        Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
      PluginManager.mount(plugin);
    });
  };
  /**
   * Create sortable instance
   * @param {HTMLElement}  el
   * @param {Object}      [options]
   */ Sortable.create = function (el, options) {
    return new Sortable(el, options);
  }; // Export
  Sortable.version = version;
  var drop = function drop(_ref) {
    var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
    if (!originalEvent) return;
    var toSortable = putSortable || activeSortable;
    hideGhostForTarget();
    var touch =
      originalEvent.changedTouches && originalEvent.changedTouches.length
        ? originalEvent.changedTouches[0]
        : originalEvent;
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    unhideGhostForTarget();
    if (toSortable && !toSortable.el.contains(target)) {
      dispatchSortableEvent("spill");
      this.onSpill({ dragEl: dragEl, putSortable: putSortable });
    }
  };
  function Revert() {}
  Revert.prototype = {
    startIndex: null,
    dragStart: function dragStart(_ref2) {
      var oldDraggableIndex = _ref2.oldDraggableIndex;
      this.startIndex = oldDraggableIndex;
    },
    onSpill: function onSpill(_ref3) {
      var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
      this.sortable.captureAnimationState();
      if (putSortable) {
        putSortable.captureAnimationState();
      }
      var nextSibling = getChild(
        this.sortable.el,
        this.startIndex,
        this.options
      );
      if (nextSibling) {
        this.sortable.el.insertBefore(dragEl, nextSibling);
      } else {
        this.sortable.el.appendChild(dragEl);
      }
      this.sortable.animateAll();
      if (putSortable) {
        putSortable.animateAll();
      }
    },
    drop: drop,
  };
  _extends(Revert, { pluginName: "revertOnSpill" });
  function Remove() {}
  Remove.prototype = {
    onSpill: function onSpill(_ref4) {
      var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
      var parentSortable = putSortable || this.sortable;
      parentSortable.captureAnimationState();
      dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
      parentSortable.animateAll();
    },
    drop: drop,
  };
  _extends(Remove, { pluginName: "removeOnSpill" });
  var ListItemContentMixin = {
    _created: function () {
      this.parent.content = this;
    },
    _config: function () {
      const { onSelect, onUnselect, selected } = this.props;
      const listProps = this.parent.parent.parent.props;
      const selectedItems =
        listProps.selectedItems !== null &&
        listProps.selectedItems !== undefined
          ? Array.isArray(listProps.selectedItems)
            ? listProps.selectedItems
            : [listProps.selectedItems]
          : [];
      this.setProps({
        classes: { "nom-list-item-content": true },
        selected: selected === true || selectedItems.indexOf(this.key) !== -1,
        selectable: {
          byClick: listProps.itemSelectable.byClick,
          canRevert: listProps.itemSelectable.multiple === true,
        },
        _shouldHandleClick: function () {
          if (listProps.disabled === true) {
            return false;
          }
        },
        onSelect: () => {
          const list = this.parent.parent.parent;
          if (listProps.itemSelectable.multiple === false) {
            listProps.selectedItems = this.key;
            if (list.selectedItem !== null) {
              list.selectedItem.unselect({ triggerSelectionChange: false });
            }
            list.selectedItem = this;
          }
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          const list = this.parent.parent.parent;
          if (listProps.selectedItems === this.key) {
            listProps.selectedItems = null;
          }
          if (list.selectedItem === this) {
            list.selectedItem = null;
          }
          this._callHandler(onUnselect);
        },
        onSelectionChange: () => {
          const list = this.parent.parent.parent;
          list._onItemSelectionChange();
        },
      });
    },
    _rendered: function () {
      const list = this.parent.parent.parent;
      const listProps = list.props;
      if (listProps.itemSelectable.multiple === false) {
        if (this.props.selected) {
          list.selectedItem = this;
          if (listProps.itemSelectable.multiple.scrollIntoValue) {
            list.scrollTo(list.selectedItem);
          }
        }
      }
    },
  };
  class ListItem extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ListItem.defaults, props), ...mixins);
    }
    _created() {
      this.list = this.parent.list;
      const { dataFields = { key: "key" } } = this.list.props;
      const { data } = this.props;
      Object.keys(dataFields).forEach((dataField) => {
        this.props[dataField] = data[dataFields[dataField]];
      });
      this._setKey();
      this.list.itemRefs[this.key] = this;
    }
    _config() {
      const {
        itemRender = ({ itemData }) => {
          return { children: itemData };
        },
      } = this.list.props;
      const { data } = this.props;
      this.setProps({
        selectable: { byClick: false },
        children: itemRender({ itemData: data, list: this.list, item: this }),
        childDefaults: n$1(null, null, null, [ListItemContentMixin]),
      });
    }
    _remove() {
      delete this.list.itemRefs[this.key];
    }
    select(selectOption) {
      this.content.select(selectOption);
    }
    unselect() {
      this.content.unselect();
    }
  }
  ListItem.defaults = { tag: "li", data: null };
  Component.register(ListItem);
  var ListItemMixin = {
    _created: function () {
      this.wrapper = this.parent;
      this.wrapper.item = this;
      this.list = this.wrapper.list;
      this.list.itemRefs[this.key] = this;
    },
    _config: function () {
      const { onSelect, onUnselect, selected } = this.props;
      const listProps = this.list.props;
      const selectedItems =
        listProps.selectedItems !== null &&
        listProps.selectedItems !== undefined
          ? Array.isArray(listProps.selectedItems)
            ? listProps.selectedItems
            : [listProps.selectedItems]
          : [];
      this.setProps({
        classes: { "nom-list-item": true },
        selected: selected === true || selectedItems.indexOf(this.key) !== -1,
        selectable: {
          byClick: listProps.itemSelectable.byClick,
          canRevert: listProps.itemSelectable.multiple === true,
        },
        _shouldHandleClick: function () {
          if (listProps.disabled === true) {
            return false;
          }
        },
        onSelect: () => {
          if (listProps.itemSelectable.multiple === false) {
            listProps.selectedItems = this.key;
            if (this.list.selectedItem !== null) {
              this.list.selectedItem.unselect({
                triggerSelectionChange: false,
              });
            }
            this.list.selectedItem = this;
          }
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          if (listProps.selectedItems === this.key) {
            listProps.selectedItems = null;
          }
          if (this.list.selectedItem === this) {
            this.list.selectedItem = null;
          }
          this._callHandler(onUnselect);
        },
        onSelectionChange: () => {
          this.list._onItemSelectionChange();
        },
      });
    },
    _rendered: function () {
      const listProps = this.list.props;
      if (listProps.itemSelectable.multiple === false) {
        if (this.props.selected) {
          this.list.selectedItem = this;
          if (listProps.itemSelectable.multiple.scrollIntoValue) {
            this.list.scrollTo(this.list.selectedItem);
          }
        }
      }
    },
    _remove: function () {
      delete this.list.itemRefs[this.key];
    },
  };
  class ListItemWrapper extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ListItemWrapper.defaults, props), ...mixins);
    }
    _created() {
      this.list = this.parent.list || this.parent.parent.parent.parent.list;
    }
    _config() {
      this._addPropStyle("span");
      const { item, span } = this.props;
      const { itemDefaults } = this.list.props;
      if (this.props.disabled) {
        item.disabled = true;
      }
      if (!span && item.span) {
        this.setProps({ span: item.span });
      }
      this.setProps({
        selectable: false,
        children: item,
        childDefaults: n$1(null, itemDefaults, null, [ListItemMixin]),
      });
    }
  }
  ListItemWrapper.defaults = { tag: "li", item: {} };
  Component.register(ListItemWrapper);
  class ListContent extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ListContent.defaults, props), ...mixins);
    }
    _created() {
      this.list = this.parent;
      this.list.content = this;
    }
    _config() {
      this._addPropStyle("gutter", "line", "align", "justify", "cols");
      const {
        items,
        wrappers,
        wrapperDefaults,
        virtual,
        data,
      } = this.list.props;
      const children = [];
      if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          const itemData = data[i];
          children.push({
            component: ListItem,
            data: itemData,
            classes: Object.assign({}, this._getDragClassNames(itemData)),
          });
        }
      } else if (Array.isArray(wrappers) && wrappers.length > 0) {
        for (let i = 0; i < wrappers.length; i++) {
          let wrapper = wrappers[i];
          wrapper = Component.extendProps(
            {},
            {
              component: ListItemWrapper,
              classes: Object.assign({}, this._getDragClassNames(wrappers[i])),
            },
            wrapperDefaults,
            wrapper
          );
          children.push(wrapper);
        }
      } else if (Array.isArray(items) && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          if (
            this.list.props.disabledItems.length &&
            this.list.props.disabledItems.includes(items[i].key)
          ) {
            children.push({
              component: ListItemWrapper,
              item: items[i],
              disabled: true,
              classes: Object.assign({}, this._getDragClassNames(items[i])),
            });
          } else {
            children.push({
              component: ListItemWrapper,
              item: items[i],
              classes: Object.assign({}, this._getDragClassNames(items[i])),
            });
          }
        }
      } // 开启虚拟列表功能
      if (
        (virtual === true || typeof virtual === "number") &&
        children.length !== 0
      ) {
        this.list.virtual.listData = children;
        this.setProps({
          classes: { "nom-virtual-list-content": true },
          children: this.list.virGetList(this.list.virVisibleData()),
          childDefaults: wrapperDefaults,
        });
      } else {
        this._processLoadMore(children);
        this.setProps({ children: children, childDefaults: wrapperDefaults });
      }
    } // 加载更多
    _processLoadMore(children) {
      const { loadMoreRef } = this.list;
      if (loadMoreRef && loadMoreRef.hidden === true) return;
      const { loadMore } = this.list.props;
      if (loadMore && loadMore.resolve) {
        children.push({
          component: "Button",
          type: "link",
          text: loadMore.text || "加载更多~",
          _created: (inst) => {
            this.list.loadMoreRef = inst;
          },
          onClick: ({ sender }) => {
            const loading = new nomui.Loading({ container: sender });
            const result = loadMore.resolve();
            if (result && result.then) {
              return result
                .then((value) => {
                  loading && loading.remove();
                  this._processLoadResult(value);
                })
                .catch(() => {
                  loading && loading.remove();
                });
            }
            loading && loading.remove();
            this._processLoadResult(result);
          },
        });
      }
    }
    _processLoadResult(result) {
      if (!result || !result.length) return this.list.loadMoreRef.hide();
      const { data, items } = this.list.props;
      const isDataType = data && data.length; // 将result 拼接到数据后面
      if (isDataType) {
        this.list.setProps({ data: data.concat(result) });
      } else {
        this.list.setProps({ items: items.concat(result) });
      }
      this.update();
    }
    _rendered() {
      const { sortable, virtual } = this.list.props;
      const that = this; // 虚拟渲染不支持拓展排序
      if (sortable && !virtual) {
        const _options = {
          group: this.key,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          handle: sortable.handleClassName,
          filter: ".s-disabled",
          draggable: ".could-drag",
          onEnd: function (event) {
            // const data = { oldIndex: evt.oldIndex, newIndex: evt.newIndex }
            that.list.handleDrag(event);
          },
        };
        if (sortable.draggableClassName) {
          _options.draggable = sortable.draggableClassName;
        }
        new Sortable(this.element, _options);
      }
    }
    getItem(param) {
      let retItem = null;
      if (param instanceof Component) {
        return param;
      }
      if (isFunction(param)) {
        for (const key in this.itemRefs) {
          if (this.itemRefs.hasOwnProperty(key)) {
            if (param.call(this.itemRefs[key]) === true) {
              retItem = this.itemRefs[key];
              break;
            }
          }
        }
      } else {
        return this.itemRefs[param];
      }
      return retItem;
    }
    selectItem(param, selectOption) {
      const item = this.getItem(param);
      item && item.select(selectOption);
    }
    selectItems(param, selectOption) {
      selectOption = extend$1(
        { triggerSelect: true, triggerSelectionChange: true },
        selectOption
      );
      let itemSelectionChanged = false;
      param = Array.isArray(param) ? param : [param];
      for (let i = 0; i < param.length; i++) {
        itemSelectionChanged =
          this.selectItem(param[i], {
            triggerSelect: selectOption.triggerSelect,
            triggerSelectionChange: false,
          }) || itemSelectionChanged;
      }
      if (
        selectOption.triggerSelectionChange === true &&
        itemSelectionChanged
      ) {
        this._onItemSelectionChange();
      }
      return itemSelectionChanged;
    }
    selectAllItems(selectOption) {
      const children = this.getChildren();
      if (this.list.loadMoreRef) children.pop();
      return this.selectItems(children, selectOption);
    }
    unselectItem(param, unselectOption) {
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      const item = this.getItem(param);
      item && item.unselect(unselectOption);
    }
    unselectItems(param, unselectOption) {
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      let itemSelectionChanged = false;
      if (Array.isArray(param)) {
        for (let i = 0; i < param.length; i++) {
          itemSelectionChanged =
            this.unselectItem(param[i], {
              triggerUnselect: unselectOption.triggerUnselect,
              triggerSelectionChange: false,
            }) || itemSelectionChanged;
        }
      }
      if (unselectOption.triggerSelectionChange && itemSelectionChanged) {
        this._onItemSelectionChange();
      }
      return itemSelectionChanged;
    }
    unselectAllItems(unselectOption) {
      return this.unselectItems(this.getAllItems(), unselectOption);
    }
    getAllItems() {
      const items = [];
      const children = this.getChildren();
      if (this.list.loadMoreRef) children.pop();
      for (let i = 0; i < children.length; i++) {
        const itemWrapper = children[i];
        items.push(itemWrapper.item);
      }
      return items;
    }
    _onItemSelectionChange() {
      this._callHandler(this.props.onItemSelectionChange);
    }
    getSelectedItem() {
      return this.selectedItem;
    }
    getSelectedItems() {
      const selectedItems = [];
      const children = this.getChildren();
      for (let i = 0; i < children.length; i++) {
        const { item } = children[i];
        if (item.props.selected) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    _getDragClassNames(item) {
      const { sortable } = this.list.props;
      if (!sortable) return {};
      const dragClasses = {};
      const { disabledDragKeys } = sortable;
      if (!disabledDragKeys || !disabledDragKeys.includes(item.key)) {
        dragClasses[sortable.draggableClassName || "could-drag"] = true;
      }
      return dragClasses;
    }
    appendItem(itemProps) {
      itemProps = Component.extendProps({}, this.props.itemDefaults, itemProps);
      const itemWrapperProps = {
        component: ListItemWrapper,
        item: itemProps,
        classes: Object.assign({}, this._getDragClassNames(itemProps)),
      };
      this.appendChild(itemWrapperProps);
    }
    appendDataItem(itemData) {
      const itemProps = {
        component: ListItem,
        data: itemData,
        classes: Object.assign({}, this._getDragClassNames(itemData)),
      };
      this.appendChild(itemProps);
    }
    prependDataItem(itemData) {
      const itemProps = {
        component: ListItem,
        data: itemData,
        classes: Object.assign({}, this._getDragClassNames(itemData)),
      };
      this.prependChild(itemProps);
    }
    removeItem(param) {
      const item = this.getItem(param);
      if (item !== null) {
        item.wrapper.remove();
      }
    }
    removeItems(param) {
      if (Array.isArray(param)) {
        for (let i = 0; i < param.length; i++) {
          this.removeItem(param[i]);
        }
      }
    }
  }
  ListContent.defaults = { tag: "ul" };
  Component.register(ListContent);
  class List extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        virtualSupport: {
          height: typeof props.virtual === "number" ? props.virtual : 300, // 容器高度
          size: 30, // 每个列表项高度预估值
          bufferScale: 1, // 缓冲区比例
        },
      };
      super(Component.extendProps(List.defaults, defaults, props), ...mixins);
    }
    _update(props) {
      if ((props && props.data) || this.props.items) {
        this.loadMoreRef = null;
      }
    }
    _config() {
      const { virtual } = this.props;
      this.itemRefs = {};
      this.selectedItem = null;
      this._addPropStyle(
        "gutter",
        "line",
        "align",
        "justify",
        "cols",
        "overflow"
      );
      let empty = null;
      if (isPlainObject(this.props.showEmpty)) {
        empty = Object.assign({ component: "Empty" }, this.props.showEmpty);
      } else {
        empty = { component: "Empty" };
      }
      const children =
        !this.props.items.length && this.props.showEmpty
          ? empty
          : { component: ListContent };
      if (
        this.props.items.length > 20 &&
        (virtual === true || typeof virtual === "number")
      ) {
        if (!this.virtual || this.firstRender) {
          this.virCreated();
        }
        this.virChildren(children);
      } else {
        this.setProps({ children: children });
      }
    }
    getItem(param) {
      let retItem = null;
      if (param instanceof Component) {
        return param;
      }
      if (isFunction(param)) {
        for (const key in this.itemRefs) {
          if (this.itemRefs.hasOwnProperty(key)) {
            if (param.call(this.itemRefs[key]) === true) {
              retItem = this.itemRefs[key];
              break;
            }
          }
        }
      } else {
        return this.itemRefs[param] || null;
      }
      return retItem;
    }
    selectItem(param, selectOption) {
      const item = this.getItem(param);
      item && item.select(selectOption);
      if (this.props.itemSelectable.scrollIntoView) {
        setTimeout(() => {
          this.scrollTo(item);
        }, 200);
      }
    }
    selectItems(param, selectOption) {
      selectOption = extend$1(
        { triggerSelect: true, triggerSelectionChange: true },
        selectOption
      );
      let itemSelectionChanged = false;
      param = Array.isArray(param) ? param : [param];
      for (let i = 0; i < param.length; i++) {
        itemSelectionChanged =
          this.selectItem(param[i], {
            triggerSelect: selectOption.triggerSelect,
            triggerSelectionChange: false,
          }) || itemSelectionChanged;
      }
      if (
        selectOption.triggerSelectionChange === true &&
        itemSelectionChanged
      ) {
        this._onItemSelectionChange();
      }
      return itemSelectionChanged;
    }
    selectAllItems(selectOption) {
      return this.selectItems(this.content.getChildren(), selectOption);
    }
    unselectItem(param, unselectOption) {
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      const item = this.getItem(param);
      item && item.unselect(unselectOption);
    }
    unselectItems(param, unselectOption) {
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      let itemSelectionChanged = false;
      if (Array.isArray(param)) {
        for (let i = 0; i < param.length; i++) {
          itemSelectionChanged =
            this.unselectItem(param[i], {
              triggerUnselect: unselectOption.triggerUnselect,
              triggerSelectionChange: false,
            }) || itemSelectionChanged;
        }
      }
      if (unselectOption.triggerSelectionChange && itemSelectionChanged) {
        this._onItemSelectionChange();
      }
      return itemSelectionChanged;
    }
    unselectAllItems(unselectOption) {
      return this.unselectItems(this.getAllItems(), unselectOption);
    }
    getAllItems() {
      const items = [];
      const children = this.content.getChildren();
      for (let i = 0; i < children.length; i++) {
        const itemWrapper = children[i]; // 为自定义渲染时直接返回 itemWrapper
        items.push(itemWrapper.item || itemWrapper);
      }
      return items;
    }
    _onItemSelectionChange() {
      this._callHandler(this.props.onItemSelectionChange);
    }
    getSelectedItem() {
      return this.selectedItem;
    }
    getSelectedItems() {
      const selectedItems = [];
      const children = this.content.getChildren();
      for (let i = 0; i < children.length; i++) {
        const { item } = children[i];
        if (item.props.selected) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    getUnselectedItems() {
      const UnselectedItems = [];
      const children = this.content.getChildren();
      for (let i = 0; i < children.length; i++) {
        const { item } = children[i];
        if (!item.props.selected) {
          UnselectedItems.push(item);
        }
      }
      return UnselectedItems;
    }
    appendItem(itemProps) {
      this.content.appendItem(itemProps);
    }
    appendDataItem(itemData) {
      this.content.appendDataItem(itemData);
    }
    prependDataItem(itemData) {
      this.content.prependDataItem(itemData);
    }
    removeItem(param) {
      const item = this.getItem(param);
      if (item !== null) {
        item.wrapper ? item.wrapper.remove() : item.remove();
      }
    }
    removeItems(param) {
      if (Array.isArray(param)) {
        for (let i = 0; i < param.length; i++) {
          this.removeItem(param[i]);
        }
      }
    }
    hideItem(param) {
      const item = this.getItem(param);
      if (item !== null) {
        item.wrapper.hide();
      }
    }
    showItem(param) {
      const item = this.getItem(param);
      if (item !== null) {
        item.wrapper.show();
      }
    }
    scrollTo(param) {
      const item = this.getItem(param);
      if (item) {
        const itemElement = item.wrapper ? item.wrapper.element : item.element;
        const scrollOptions =
          this.props.itemSelectable &&
          this.props.itemSelectable.scrollIntoView &&
          isPlainObject(this.props.itemSelectable.scrollIntoView)
            ? this.props.itemSelectable.scrollIntoView
            : {};
        scrollIntoView(
          itemElement,
          Component.extendProps(
            { behavior: "smooth", scrollMode: "if-needed" },
            scrollOptions
          )
        );
      }
    }
    scrollToSelected() {
      if (this.selectedItem) {
        this.scrollTo(this.selectedItem);
      }
    }
    _rendered() {
      this.props.sortable && defaultSortableOndrop();
    }
    /* 虚拟列表支持函数-start */ virCreated() {
      const { items, virtualSupport } = this.props;
      this.virtual = {
        virtualTimer: null,
        start: 0,
        end: 0,
        positions: [
          // {
          //   top:0,
          //   bottom:100,
          //   height:100,
          // }
        ],
        selectedItems: [], // 下拉选择中选中数据
        itemsRefs: [], // 当前列表项arry
        listData: items, // 所有列表数据
        ListHeight: virtualSupport.height, // 可视区域高度
        estimatedSize: virtualSupport.size, // 预估高度
        bufferScale: virtualSupport.bufferScale, // 缓冲区比例
        toolDivRef: null,
      };
      this.virInitPositions();
    }
    virChildren(childObj) {
      const { positions, ListHeight } = this.virtual;
      const toolDivHeight = positions[positions.length - 1].bottom;
      this.setProps({
        classes: { "nom-virtual-list-container": true },
        attrs: {
          style: { height: `${ListHeight}px` },
          onscroll: () => {
            this.virScrollEvent();
          },
        },
        children: [
          {
            ref: (c) => {
              this.virtual.toolDivRef = c;
            },
            classes: { "nom-virtual-list-tooldiv": true },
            attrs: { style: { height: `${toolDivHeight}px` } },
            children: "",
          },
          childObj,
        ],
      });
    }
    virGetList(arry) {
      this.virtual.itemsRefs = [];
      const _that = this;
      return arry.map(function (obj) {
        return Component.extendProps(obj, {
          ref: (c) => {
            if (c) _that.virtual.itemsRefs.push(c);
          },
          classes: { "nom-virtual-list-item": true },
          attrs: { "data-key": obj._index },
        });
      });
    } // 需要在 渲染完成后，获取列表每项的位置信息并缓存
    virUpdated() {
      if (!this.virtual.itemsRefs || !this.virtual.itemsRefs.length) {
        return;
      }
      const { positions, toolDivRef } = this.virtual;
      this.virUpdateItemsSize();
      const toolDivHeight = positions[positions.length - 1].bottom;
      toolDivRef.element.style.height = `${toolDivHeight}px`;
      this.content.update({
        attrs: {
          style: {
            transform: `translate3d(0,${this.virSetStartOffset()}px,0)`,
          },
        },
      });
    } // 初始化位置信息
    virInitPositions() {
      const { estimatedSize, listData } = this.virtual;
      this.virtual.positions = listData.map((d, index) => ({
        index,
        height: estimatedSize,
        top: index * estimatedSize,
        bottom: (index + 1) * estimatedSize,
      }));
    } // 获取列表起始索引
    virGetStartIndex(scrollTop = 0) {
      return this.virBinarySearch(this.virtual.positions, scrollTop);
    } // 二分法
    virBinarySearch(list, value) {
      let start = 0;
      let end = list.length - 1;
      let tempIndex = null;
      while (start <= end) {
        const midIndex = parseInt((start + end) / 2, 10);
        const midValue = list[midIndex].bottom;
        if (midValue === value) {
          return midIndex + 1;
        }
        if (midValue < value) {
          start = midIndex + 1;
        } else if (midValue > value) {
          if (tempIndex === null || tempIndex > midIndex) {
            tempIndex = midIndex;
          }
          end -= 1;
        }
      }
      return tempIndex;
    } // 获取列表项的当前尺寸
    virUpdateItemsSize() {
      const { itemsRefs, positions } = this.virtual;
      itemsRefs.forEach((node) => {
        if (!node.rendered) return;
        const rect = node.element.getBoundingClientRect();
        const height = rect.height;
        const index = +node.element.dataset.key.slice(1);
        const oldHeight = positions[index].height;
        const dValue = oldHeight - height; // 存在差值
        if (dValue) {
          positions[index].bottom -= dValue;
          positions[index].height = height;
          for (let k = index + 1; k < positions.length; k++) {
            positions[k].top = positions[k - 1].bottom;
            positions[k].bottom -= dValue;
          }
        }
      });
    } // 设置当前的偏移量
    virSetStartOffset() {
      const { start, positions } = this.virtual;
      let startOffset;
      if (start >= 1 && positions[start]) {
        const size =
          positions[start].top -
          (positions[start - this.virAboveCount()]
            ? positions[start - this.virAboveCount()].top
            : 0);
        startOffset = positions[start - 1].bottom - size;
      } else {
        startOffset = 0;
      }
      return startOffset;
    } // 滚动事件
    virScrollEvent() {
      // 当前滚动位置
      const scrollTop = this.element.scrollTop; // if (!this.virGetStartIndex(scrollTop)) return
      this.virtual.virtualTimer && clearTimeout(this.virtual.virtualTimer);
      this.virtual.virtualTimer = setTimeout(() => {
        // 此时的开始索引
        this.virtual.start = this.virGetStartIndex(scrollTop); // 此时的结束索引
        this.virtual.end = this.virtual.start + this.virVisibleCount(); // 更新列表
        this.virUpdated();
      }, 100);
    }
    virListData() {
      return this.virtual.listData.map((obj, index) => {
        return Object.assign({}, obj, { _index: `_${index}` });
      });
    } // 可显示的列表项数
    virVisibleCount() {
      return Math.ceil(this.virtual.ListHeight / this.virtual.estimatedSize);
    } // 可视区上方渲染条数
    virAboveCount() {
      return Math.min(
        this.virtual.start,
        this.virtual.bufferScale * this.virVisibleCount()
      );
    } // 可视区下方渲染条数
    virBelowCount() {
      return Math.min(
        this.virtual.listData.length - this.virtual.end,
        this.virtual.bufferScale * this.virVisibleCount()
      );
    } // 获取真实显示列表数据
    virVisibleData() {
      const start = this.virtual.start - this.virAboveCount();
      const end = this.virtual.end + this.virBelowCount();
      return this.virListData().slice(start, end);
    }
    /* 虚拟列表支持函数-end */ handleDrag(event) {
      const { oldIndex, newIndex } = event;
      this._lastDragIndex = newIndex;
      const { data, items } = this.props;
      const _listData = data && data.length ? data : items;
      const _dragerItem = _listData.splice(oldIndex, 1)[0];
      _listData.splice(newIndex, 0, _dragerItem);
      if (this.props.sortable && this.props.sortable.onEnd) {
        this._callHandler(this.props.sortable.onEnd, { event: event });
      }
    }
    getLastDragItem() {
      if (!this._lastDragIndex) return;
      const { data, items } = this.props;
      const _listData = data && data.length ? data : items;
      return _listData[this._lastDragIndex];
    }
  }
  List.defaults = {
    tag: "div",
    items: [],
    itemDefaults: {},
    data: null, // 自定义渲染时使用data
    selectedItems: null,
    itemSelectable: { multiple: false, byClick: false, scrollIntoView: false },
    disabledItems: [],
    virtual: false,
    showEmpty: false, // Boolean || { onEnd: Funciton}
    sortable: false,
    overflow: "hidden",
    loadMore: false,
  };
  Component.register(List);
  var AutoCompleteListItemMixin = {
    _config: function () {
      const { onSelect, onUnselect } = this.props;
      const {
        filterName,
      } = this.parent.parent.parent.autoCompleteControl.props;
      this.setProps({
        selectable: {
          byClick: true,
          canRevert: this.list.autoCompleteControl.props.multiple === false,
        },
        onSelect: () => {
          const { autoCompleteControl } = this.list;
          const autoCompleteOption = {
            value: filterName === "select" ? this.props.text : this.props.value,
            option: this.props,
          };
          autoCompleteControl.input.update(autoCompleteOption);
          autoCompleteControl.props.animate &&
            autoCompleteControl.popup.animateHide();
          !autoCompleteControl.props.animate &&
            autoCompleteControl.popup.hide();
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          this._callHandler(onUnselect);
        },
      });
    },
  };
  class AutoCompleteList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        gutter: "x-md",
        cols: 1,
        optionDefaults: {
          key() {
            return this.props.value;
          },
          _config: function () {
            const {
              filterName,
            } = this.parent.parent.parent.autoCompleteControl.props;
            this.setProps({
              children:
                filterName === "text" ? this.props.value : this.props.text,
            });
          },
        },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.autoCompleteControl = this.parent.parent.parent.autoCompleteControl;
      this.autoCompleteControl.optionList = this;
    }
    _config() {
      const { searchable, options: aops } = this.autoCompleteControl.props;
      const { optionDefaults, options: sops } = this.props;
      const value = this.autoCompleteControl.props.value || "";
      const options = searchable ? aops : sops;
      this.setProps({
        items: options || [],
        itemDefaults: n$1(null, optionDefaults, null, [
          AutoCompleteListItemMixin,
        ]),
        itemSelectable: {
          multiple: false,
          byClick: true,
          scrollIntoView: true,
        },
        selectedItems: value,
        onItemSelectionChange: () => {
          this.autoCompleteControl._onValueChange();
        },
      });
      super._config();
    }
  }
  class AutoCompletePopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = { autoRender: false };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.autoCompleteControl = this.opener.field;
    }
    _config() {
      const autoCompletePopupRef = this;
      const { options } = this.props;
      const { searchable, debounce, interval } = this.autoCompleteControl.props;
      this.setProps({
        attrs: {
          style: {
            width: `${this.autoCompleteControl.control.offsetWidth()}px`,
          },
        },
        children: {
          component: Layout,
          header: searchable
            ? {
                children: {
                  component: Textbox,
                  placeholder: searchable.placeholder,
                  _created: (inst) => {
                    autoCompletePopupRef.autoCompleteControl.searchRef = inst;
                  },
                  onValueChange({ newValue }) {
                    if (debounce) {
                      autoCompletePopupRef.timer &&
                        clearTimeout(autoCompletePopupRef.timer);
                      autoCompletePopupRef.timer = setTimeout(() => {
                        const loading = new nomui.Loading({
                          container:
                            autoCompletePopupRef.autoCompleteControl.optionList
                              .parent,
                        });
                        const searchPromise = searchable.onSearch({
                          inputValue: newValue,
                          options,
                        });
                        if (autoCompletePopupRef._isPromise(searchPromise)) {
                          return searchPromise
                            .then((val) => {
                              autoCompletePopupRef.autoCompleteControl.props.options = val;
                              autoCompletePopupRef.autoCompleteControl.optionList.update();
                              loading && loading.remove();
                            })
                            .catch(() => {
                              loading && loading.remove();
                            });
                        }
                        loading && loading.remove();
                        autoCompletePopupRef.autoCompleteControl.props.options = searchPromise;
                        searchPromise &&
                          autoCompletePopupRef.autoCompleteControl.optionList.update();
                      }, interval);
                    }
                  },
                },
              }
            : null,
          body: { children: autoCompletePopupRef._getOptionList() },
        },
      });
      super._config();
    }
    animateHide() {
      if (!this.element) return false;
      let animateName;
      if (this.element.getAttribute("offset-y") !== "0") {
        animateName = "nom-auto-complete-animate-bottom-hide";
      } else {
        animateName = "nom-auto-complete-animate-top-hide";
      }
      this.addClass(animateName);
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
        this.removeClass(animateName);
      }, 160);
    }
    _show() {
      super._show();
      this.autoCompleteControl.searchRef &&
        this.autoCompleteControl.searchRef.focus();
      this.removeClass("nom-layer-animate-show");
      this.autoCompleteControl.props.animate && this.animateInit();
    }
    animateInit() {
      if (!this.element) return false;
      if (this.element.getAttribute("offset-y") !== "0") {
        this.addClass("nom-auto-complete-animate-bottom-show");
      } else {
        this.addClass("nom-auto-complete-animate-top-show");
      }
    }
    _getOptionList() {
      const options = this.autoCompleteControl.internalOptions;
      const {
        searchable,
        value,
        filterOption,
        filterName,
        text = "",
      } = this.autoCompleteControl.props;
      const _value = filterName === "text" ? value : text;
      const opts = isFunction(filterOption)
        ? filterOption(_value || "", options)
        : options;
      if (searchable) {
        return { component: AutoCompleteList, options: opts };
      }
      if (opts && opts.length) {
        return { component: AutoCompleteList, options: opts };
      }
      this.autoCompleteControl.optionList = null;
      return {
        component: Layout,
        body: { styles: { padding: 1 }, children: { component: Empty } },
      };
    }
    _isPromise(p) {
      if (!p) return false;
      return p instanceof Promise;
    }
  }
  class AutoComplete extends Textbox {
    constructor(props, ...mixins) {
      super(Component.extendProps(AutoComplete.defaults, props), ...mixins);
      this._init.bind(this);
      this._handleSearch.bind(this);
      this._doSearch.bind(this);
    }
    _created() {
      super._created();
      this.placeholder = this.props.placeholder;
      this.capsLock = false;
      this.searchMode = false;
      this.clearContent = true;
      this.internalOptions = {};
    }
    _rendered() {
      const { searchable } = this.props;
      !searchable && this.input && this._init();
      const { options } = this.props;
      this.popup = new AutoCompletePopup({
        trigger: this.control,
        options,
        onShow: () => {
          if (this.optionList) {
            this.optionList.update({ selectedItems: this.getValue() });
            this.optionList.scrollToSelected();
          }
        },
      });
    }
    _remove() {
      this.timer && clearTimeout(this.timer);
    }
    _config() {
      const autoCompleteRef = this;
      const { allowClear, options } = this.props;
      this._normalizeSearchable();
      this._normalizeInternalOptions(options);
      if (allowClear && this.currentValue) {
        this.setProps({
          clearProps: {
            component: "Icon",
            type: "close",
            ref: (c) => {
              this.clearIcon = c;
            },
            classes: {
              "nom-auto-complete-clear": true,
              "nom-field-clear-handler": true,
            },
            onClick: ({ event }) => {
              event.stopPropagation();
              autoCompleteRef.clear();
              this.clearIcon.hide();
              autoCompleteRef.popup && autoCompleteRef.popup.hide();
            },
          },
        });
      }
      if (options && this.popup) {
        this.popup.update({ options, hidden: false });
      }
      super._config();
    }
    _init() {
      const autoComplete = this;
      this.input.element.addEventListener("focus", function () {
        autoComplete.currentValue = this.value;
        if (autoComplete.clearContent) {
          this.placeholder = this.value;
          this.value = "";
        } else {
          autoComplete.clearContent = true;
        }
        autoComplete.popup &&
          autoComplete.popup.update({ options: autoComplete.props.options });
      });
      this.input.element.addEventListener("input", function () {
        if (!autoComplete.capsLock) {
          autoComplete._handleSearch(this.value);
        }
      });
      this.input.element.addEventListener("blur", function () {
        // 没有输入则需重置,此动作只能在blur事件而非change事件中进行
        if (!autoComplete.searchMode) {
          // 重置
          this.value = autoComplete.currentValue;
        }
        this.placeholder = autoComplete.placeholder || "";
        autoComplete.searchMode = false;
        const { filterName } = autoComplete.props;
        if (filterName === "select" && !autoComplete._getValue()) {
          autoComplete.setProps({ text: "" });
          autoComplete.clear();
        }
      }); // 中文介入
      this.input.element.addEventListener("compositionstart", function () {
        autoComplete.capsLock = true;
      });
      this.input.element.addEventListener("compositionend", function () {
        autoComplete.capsLock = false;
        autoComplete._handleSearch(this.value);
      });
    }
    _getValue() {
      const { options, filterName, optionFields } = this.props;
      const inputText = this._getInputText();
      if (filterName === "select") {
        const currOption = options.find(
          (item) => item[optionFields.text] === inputText
        );
        return currOption ? currOption[optionFields.value] : null;
      }
      if (inputText === "") {
        return null;
      }
      return inputText;
    }
    _getInputText() {
      const { trimValue } = this.props;
      let inputText = this.getText();
      inputText = trimValue ? inputText.trimLeft().trimRight() : inputText;
      return inputText;
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      const { filterName, options: opt, optionFields } = this.props;
      let _value = value;
      if (filterName === "select") {
        const selectedOption = opt.find((e) => e[optionFields.value] === value);
        if (selectedOption) {
          _value = selectedOption[optionFields.text];
        } else {
          this.input.setText("");
          this.currentValue = null;
          super._onValueChange();
          return;
        }
      }
      this.input.setText(_value);
      const newValue = this.getValue();
      this.oldValue = this.currentValue;
      if (options.triggerChange) {
        if (newValue !== this.oldValue) {
          super._onValueChange();
        }
      }
      this.currentValue = newValue;
    }
    getSelectedOption() {
      const { options, value, optionFields } = this.props;
      if (value) {
        const currOption = options.find(
          (item) => item[optionFields.value] === value
        );
        return currOption;
      }
      return null;
    }
    _valueChange(changed) {
      changed.newValue
        ? this.props.allowClear && this.clearIcon.show()
        : this.props.allowClear && this.clearIcon.hide();
      const { filterName } = this.props;
      filterName === "select" && this.setProps({ text: this._getInputText() });
    }
    blur() {
      super.blur();
    }
    focus() {
      this.clearContent = false;
      super.focus();
    }
    _isFocus() {
      if (!this.input) return false;
      return document.activeElement === this.input.element;
    }
    _handleSearch(txt) {
      const autoComplete = this;
      const { debounce, interval } = this.props; // 防抖
      this.timer && clearTimeout(this.timer);
      if (debounce) {
        this.timer = setTimeout(function () {
          autoComplete._doSearch(txt);
        }, interval);
      } else {
        autoComplete._doSearch(txt);
      }
    }
    _doSearch(txt) {
      this.searchMode = true;
      const { onSearch, filterOption } = this.props;
      const options = this.internalOptions;
      this.setProps({ text: txt });
      isFunction(filterOption) &&
        this.popup.update({ options: filterOption(txt, options) });
      isFunction(onSearch) && onSearch({ text: txt, sender: this });
    }
    _normalizeSearchable() {
      const { searchable, onSearch } = this.props;
      if (searchable) {
        this.setProps({
          searchable: Component.extendProps(
            { placeholder: null, onSearch },
            searchable
          ),
        });
      }
    }
    _normalizeInternalOptions(options) {
      if (!Array.isArray(options) || !options.length) {
        this.internalOptions = [];
        return;
      }
      const { optionFields, filterName } = this.props;
      this.internalOptions = clone$1(options);
      this.handleOptions(this.internalOptions, optionFields, filterName);
    }
    handleOptions(options, optionFields, filterName) {
      const { text: textField, value: valueField } = optionFields;
      if (!Array.isArray(options)) return [];
      const internalOptions = options;
      for (let i = 0; i < internalOptions.length; i++) {
        const item = internalOptions[i];
        item.value = item[valueField];
        if (filterName === "select") item.text = item[textField];
      }
    }
  }
  AutoComplete.defaults = {
    options: [],
    debounce: true,
    interval: 300,
    optionFields: { value: "value" },
    filterOption: (txt, options) => {
      return options;
    },
    allowClear: true,
    filterName: "text", // text,select
  };
  Component.register(AutoComplete);
  class Avatar extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Avatar.defaults, props), ...mixins);
    }
    _config() {
      const { text, icon, src, alt } = this.props;
      this._propStyleClasses = ["size"];
      this.setProps({
        classes: { "avatar-image": !!src },
        children: [
          src && {
            tag: "img",
            ref: (c) => {
              this.imgRef = c;
            },
            attrs: { alt },
          },
          icon && {
            component: "Icon",
            type: icon,
            ref: (c) => {
              this.iconRef = c;
            },
          },
          !icon && {
            ref: (c) => {
              this.textRef = c;
            },
            tag: "span",
            classes: { "nom-avatar-string": true },
            children: text || "NA",
          },
        ],
      });
    }
    _setScale() {
      if (!this.props) {
        return;
      }
      const { gap, icon } = this.props;
      if (icon) {
        return;
      }
      const childrenWidth = this.element.lastChild.offsetWidth;
      const nodeWidth = this.element.offsetWidth;
      if (childrenWidth !== 0 && nodeWidth !== 0) {
        if (gap * 2 < nodeWidth) {
          const scale =
            nodeWidth - gap * 2 < childrenWidth
              ? (nodeWidth - gap * 2) / childrenWidth
              : 1;
          const transformString = `scale(${scale}) translateX(-50%)`;
          const child = this.children[this.children.length - 1];
          child.update({
            attrs: {
              style: {
                "-ms-transform": transformString,
                "-webkit-transform": transformString,
                transform: transformString,
              },
            },
          });
        }
      }
    }
    _loadImageAsync() {
      const { src } = this.props;
      return new Promise((resolve, reject) => {
        const image = this.imgRef.element;
        this.imgRef.element.src = src;
        image.onload = () => {
          this.textRef && this.textRef.hide();
          this.iconRef && this.iconRef.hide();
          resolve();
        };
        image.onerror = () => {
          this.imgRef.hide();
          reject();
        };
      });
    }
    _rendered() {
      this.props.src && this._loadImageAsync();
      this._setScale();
    }
  }
  Avatar.defaults = {
    tag: "span",
    size: "default",
    alt: "图片",
    gap: 4, // 字符类型距离左右两侧边界单位像素
    text: null, // 文本
    icon: null, // 图标
    src: null, // 图片地址
  };
  Component.register(Avatar);
  class AvatarGroup extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(AvatarGroup.defaults, props), ...mixins);
    }
    _config() {
      const {
        size,
        items,
        maxCount,
        maxPopoverPlacement,
        itemDefaults,
      } = this.props; // 赋size值
      const avatars = items.map((item) => {
        return Object.assign({ component: Avatar, size }, itemDefaults, item);
      });
      const numOfChildren = avatars.length;
      if (maxCount && maxCount < numOfChildren) {
        const childrenShow = avatars.slice(0, maxCount);
        const childrenHidden = avatars.slice(maxCount, numOfChildren);
        childrenShow.push(
          Object.assign(
            { component: Avatar, text: `+${numOfChildren - maxCount}`, size },
            itemDefaults,
            {
              popup: {
                triggerAction: "hover",
                align: maxPopoverPlacement,
                children: childrenHidden,
                attrs: { style: { padding: "8px 12px" } },
              },
            }
          )
        );
        this.setProps({ children: childrenShow });
      } else {
        this.setProps({ children: avatars });
      }
    }
  }
  AvatarGroup.defaults = {
    tag: "div",
    size: "default",
    maxCount: null, // 显示的最大头像个数
    maxPopoverPlacement: "top", // 多余头像气泡弹出位置
    items: [], // 子元素项列表
  };
  Component.register(AvatarGroup);
  /* eslint-disable no-return-assign */ /* eslint-disable no-restricted-properties */ /*
   * Tween.js
   * t: current time（当前时间）
   * b: beginning value（初始值）
   * c: change in value（变化量）
   * d: duration（持续时间）
   */ const Tween = {
    Linear: function (t, b, c, d) {
      return (c * t) / d + b;
    },
    Quad: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
        return (-c / 2) * (--t * (t - 2) - 1) + b;
      },
    },
    Cubic: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t + 2) + b;
      },
    },
    Quart: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
        return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
      },
    },
    Quint: {
      easeIn: function (t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOut: function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
        return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
      },
    },
    Sine: {
      easeIn: function (t, b, c, d) {
        return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sin((t / d) * (Math.PI / 2)) + b;
      },
      easeInOut: function (t, b, c, d) {
        return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
      },
    },
    Expo: {
      easeIn: function (t, b, c, d) {
        return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOut: function (t, b, c, d) {
        return t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
      },
      easeInOut: function (t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
      },
    },
    Circ: {
      easeIn: function (t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOut: function (t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOut: function (t, b, c, d) {
        if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
        return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      },
    },
    Elastic: {
      easeIn: function (t, b, c, d, a, p) {
        let s;
        if (t === 0) return b;
        if ((t /= d) === 1) return b + c;
        if (typeof p === "undefined") p = d * 0.3;
        if (!a || a < Math.abs(c)) {
          s = p / 4;
          a = c;
        } else {
          s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (
          -(
            a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)
          ) + b
        );
      },
      easeOut: function (t, b, c, d, a, p) {
        let s;
        if (t === 0) return b;
        if ((t /= d) === 1) return b + c;
        if (typeof p === "undefined") p = d * 0.3;
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        return (
          a *
            Math.pow(2, -10 * t) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
          c +
          b
        );
      },
      easeInOut: function (t, b, c, d, a, p) {
        let s;
        if (t === 0) return b;
        if ((t /= d / 2) === 2) return b + c;
        if (typeof p === "undefined") p = d * (0.3 * 1.5);
        if (!a || a < Math.abs(c)) {
          a = c;
          s = p / 4;
        } else {
          s = (p / (2 * Math.PI)) * Math.asin(c / a);
        }
        if (t < 1)
          return (
            -0.5 *
              (a *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
            b
          );
        return (
          a *
            Math.pow(2, -10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
            0.5 +
          c +
          b
        );
      },
    },
    Back: {
      easeIn: function (t, b, c, d, s) {
        if (typeof s === "undefined") s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOut: function (t, b, c, d, s) {
        if (typeof s === "undefined") s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOut: function (t, b, c, d, s) {
        if (typeof s === "undefined") s = 1.70158;
        if ((t /= d / 2) < 1)
          return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      },
    },
    Bounce: {
      easeIn: function (t, b, c, d) {
        return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
      },
      easeOut: function (t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        }
        if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        }
        if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        }
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
      },
      easeInOut: function (t, b, c, d) {
        if (t < d / 2) {
          return Tween.Bounce.easeIn(t * 2, 0, c, d) * 0.5 + b;
        }
        return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
      },
    },
  };
  class BackTop extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(BackTop.defaults, props), ...mixins);
    }
    _created() {
      const { parent, target } = this.props;
      if (target === "window") {
        this.parentNode = document.documentElement || document.body;
        this.bindEle = window;
      } else if (this.hasClass(parent.element, target)) {
        this.parentNode = parent.element;
        this.bindEle = this.parentNode;
      } else {
        this.parentNode = parent.element.getElementsByClassName(target)[0];
        this.bindEle = this.parentNode;
      }
      const parentRemoveClone = parent._remove;
      parent._remove = () => {
        parentRemoveClone();
        this.remove();
      };
      this.once = true;
      this.onWindowScroll = () => {
        this.backTopFun();
      };
      this.initRequestAnimationFrame();
    }
    _config() {
      const { right, bottom } = this.props;
      this.setProps({
        children: {
          ref: (c) => {
            this.backTopRef = c;
          },
          classes: { "nom-back-top-container": true },
          attrs: { style: { right: `${right}px`, bottom: `${bottom}px` } },
          children: this.backTopButton(),
          onClick: () => {
            this.backTopEvent();
          },
        },
      });
    }
    _rendered() {
      this.bindEle.addEventListener("scroll", this.onWindowScroll);
    }
    _remove() {
      this.bindEle.removeEventListener("scroll", this.onWindowScroll);
    }
    backTopFun() {
      const { height } = this.props;
      if (this.once === true) {
        this.once = false;
        this.iconRef.update();
        if (this.bindEle === window) {
          this.parentNode.appendChild(this.backTopRef.element);
          this.backTopRef.element.style.position = "fixed";
        } else {
          this.parentNode.parentElement.style.position = "relative";
          this.parentNode.parentElement.appendChild(this.backTopRef.element);
        }
      }
      if (this.parentNode.scrollTop >= height) {
        this.backTopRef.show();
      } else {
        this.backTopRef.hide();
      }
    }
    hasClass(ele, className) {
      const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
      return reg.test(ele.className);
    }
    backTopButton() {
      const { text } = this.props;
      let obj;
      if (text.length > 0) {
        obj = {
          ref: (c) => {
            this.iconRef = c;
          },
          classes: { "nom-back-top-text": true },
          autoRender: false,
          children: text,
        };
      } else {
        obj = {
          ref: (c) => {
            this.iconRef = c;
          },
          classes: { "nom-back-top-icons": true },
          autoRender: false,
          component: "Icon",
          type: "up",
        };
      }
      return obj;
    }
    initRequestAnimationFrame() {
      let lastTime = 0;
      const vendors = ["webkit", "moz"];
      for (
        let x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          window[`${vendors[x]}RequestAnimationFrame`];
        window.cancelAnimationFrame =
          window[`${vendors[x]}CancelAnimationFrame`] ||
          window[`${vendors[x]}CancelRequestAnimationFrame`];
      }
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
          const currTime = new Date().getTime();
          const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
          const id = window.setTimeout(function () {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
      if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
          clearTimeout(id);
        };
      }
    }
    backTopEvent() {
      const { animations, duration } = this.props;
      const element = this.parentNode;
      let start = 0;
      const begin = element.scrollTop;
      const end = -element.scrollTop;
      const during = Math.round((duration * 10) / 167);
      const paramArry = animations.split(".");
      const scrollAnimation = function () {
        if (element.scrollTop === 0) return false;
        let top; // 当前的运动位置
        if (paramArry[1]) {
          top = Tween[paramArry[0]][paramArry[1]](start, begin, end, during);
        } else {
          top = Tween[paramArry[0]](start, begin, end, during);
        }
        element.scrollTop = top; // 时间递增
        start++; // 如果还没有运动到位，继续
        if (start <= during && element.scrollTop !== 0) {
          requestAnimationFrame(scrollAnimation);
        }
      };
      if (element) scrollAnimation();
    }
  }
  Component.mixin({
    _rendered: function () {
      if (this.props.backtop) {
        this.backtop = new BackTop(
          Component.extendProps({}, this.props.backtop, { parent: this })
        );
      }
    },
  });
  BackTop.defaults = {
    duration: 100,
    animations: "Linear",
    target: "window",
    height: 400,
    right: 30,
    bottom: 30,
    text: "",
    parent: "",
    onClick: () => {},
  };
  Component.register(BackTop);
  class Badge extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Badge.defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["size", "color"];
      const { icon, text, type, overflowCount } = this.props;
      const number = this.props.number === 0 ? "0" : this.props.number;
      if (icon) {
        this.setProps({ classes: { "p-with-icon": true } });
      }
      if (type === "round") {
        this.setProps({ classes: { "u-shape-round": true } });
      } else if (type === "dot") {
        if (number > 0) {
          this.setProps({ classes: { "p-with-number": true } });
        }
      } else if (type === "tag") {
        this.setProps({ classes: { "u-shape-tag": true } });
      }
      this.setProps({
        classes: { "nom-badge-pointer": !!this.props.onClick },
        children: [
          Component.normalizeIconProps(icon),
          { tag: "span", children: text },
          number && {
            tag: "span",
            children: number > overflowCount ? `${overflowCount}+` : number,
          },
        ],
      });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
  Component.mixin({
    _config: function () {
      if (this.props.badge) {
        this.setProps({ classes: { "s-with-badge": true } });
      }
    },
    _rendered: function () {
      if (this.props.badge) {
        const badgeProps = { type: "dot" };
        if (this.props.badge.text) {
          badgeProps.text = this.props.badge.text;
          badgeProps.type = "tag";
        }
        if (
          this.props.badge.number !== undefined &&
          (this.props.badge.number === 0 || this.props.badge.number === "0")
        ) {
          badgeProps.hidden = true;
        }
        badgeProps.number = this.props.badge.number
          ? this.props.badge.number
          : null;
        badgeProps.overflowCount = this.props.badge.overflowCount
          ? this.props.badge.overflowCount
          : 99;
        badgeProps.styles = this.props.badge.styles
          ? this.props.badge.styles
          : { color: "danger" };
        this.props.badge = badgeProps;
        this.badge = new Badge(
          Component.extendProps({ reference: this }, this.props.badge)
        );
      }
    },
  });
  Badge.defaults = {
    key: null,
    tag: "span",
    type: "round",
    text: null,
    icon: null,
    number: null,
    overflowCount: 99,
    size: "xs",
  };
  Component.register(Badge);
  class BreadcrumbItem extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "span", url: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      // const that = this
      // const { icon, rightIcon, separator, url, text, overlay } = this.props
      const { icon, rightIcon, separator, url, text } = this.props;
      if (icon || rightIcon) {
        this.setProps({ classes: { "p-with-icon": true } });
        if (!text) {
          this.setProps({ classes: { "p-only-icon": true } });
        }
      } // if (isNotEmptyArray(overlay)) {
      //   this.setProps({
      //     popup: {
      //       triggerAction: 'hover',
      //       aligin: 'left bottom',
      //       children: {
      //         component: BreadcrumbSub,
      //         items: overlay,
      //       },
      //     },
      //   })
      // }
      this.setProps({
        children: [
          Component.normalizeIconProps(icon),
          {
            tag: "span",
            classes: { "nom-breadcrumb-link": true },
            children: url
              ? { tag: "a", attrs: { href: url }, children: text }
              : text,
          },
          Component.normalizeIconProps(rightIcon),
          {
            tag: "span",
            classes: { "nom-breadcrumb-separator": true },
            children: separator,
          },
        ],
      });
    }
  }
  Component.register(BreadcrumbItem);
  class Breadcrumb extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Breadcrumb.defaults, props), mixins);
    }
    _config() {
      const { separator, items, itemDefaults } = this.props;
      const children = isNotEmptyArray(items)
        ? items.map((item, idx) => {
            const isLeaf = idx === items.length - 1;
            return Object.assign(
              {},
              Component.extendProps({ separator, isLeaf }, itemDefaults, item)
            );
          })
        : [];
      this.setProps({ children });
    }
  }
  Breadcrumb.defaults = {
    separator: "/",
    itemDefaults: { component: BreadcrumbItem },
  };
  Component.register(Breadcrumb);
  class Carousel extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Carousel.defaults, props), ...mixins);
    }
    _created() {
      const { imgs, defaultActiveIndex } = this.props;
      const cloneImgs = [...imgs];
      cloneImgs.push(imgs[0]);
      this.loopImgs = cloneImgs;
      this.positions = [
        // {
        //   left:0,
        //   width:100
        // }
      ];
      this.activeId = defaultActiveIndex;
      this.activeIdOld = defaultActiveIndex;
      this.sildeRefs = [];
      this.dotsRef = [];
      this.slideWidth = null;
      this.autoplayInterval = null;
    }
    _config() {
      this.setProps({
        children: {
          ref: (c) => {
            this.containerRef = c;
          },
          classes: { "nom-carousel-container": true },
          children: [
            {
              ref: (c) => {
                this.wrapperRef = c;
              },
              classes: { "nom-carousel-wrapper": true },
              children: this.slideList(),
            },
            {
              ref: (c) => {
                this.paginationRef = c;
              },
              classes: {
                "nom-carousel-pagination": true,
                "nom-carousel-pagination-show": this.props.dots,
              },
              children: this.paginationList(),
            },
            {
              classes: {
                "nom-carousel-buttons": true,
                "nom-carousel-buttons-show": this.props.arrows,
              },
              children: [
                {
                  classes: { "nom-carousel-button-prev": true },
                  onClick: () => {
                    this.prevClick();
                  },
                  component: "Icon",
                  type: "left",
                },
                {
                  classes: { "nom-carousel-button-next": true },
                  onClick: () => {
                    this.nextClick();
                  },
                  component: "Icon",
                  type: "right",
                },
              ],
            },
          ],
        },
      });
    }
    _rendered() {
      const {
        autoplay,
        autoplaySpeed,
        pauseOnHover,
        defaultActiveIndex,
        triggerType,
      } = this.props;
      this.initPositions(); // 是否自动播放
      if (autoplay) {
        this.autoplayInterval = setInterval(() => {
          this.nextClick();
        }, autoplaySpeed);
      } // 在鼠标悬浮时自动停止轮播
      if (pauseOnHover) {
        this.containerRef.element.addEventListener("mouseover", () => {
          clearInterval(this.autoplayInterval);
        });
        this.containerRef.element.addEventListener("mouseout", () => {
          if (autoplay) {
            this.autoplayInterval = setInterval(() => {
              this.nextClick();
            }, autoplaySpeed);
          }
        });
      } // 初始被激活的轮播图
      setTimeout(() => {
        this.paginationClick(defaultActiveIndex);
      }, 500); // 锚点导航触发方式
      if (triggerType === "hover") {
        this.dotsRef.forEach((item) => {
          item.element.onmouseenter = (e) => {
            const target = e.target;
            if (target.nodeName === "SPAN") {
              this.paginationClick(target.dataset.index);
            }
          };
        });
      } else {
        this.paginationRef.element.addEventListener("click", (e) => {
          const target = e.target;
          if (target.nodeName === "SPAN") {
            this.paginationClick(target.dataset.index);
          }
        });
      }
    }
    _remove() {
      clearInterval(this.autoplayInterval);
    }
    slideList() {
      const _that = this;
      return this.loopImgs.map(function (item) {
        return {
          ref: (c) => {
            if (c) _that.sildeRefs.push(c);
          },
          classes: { "nom-carousel-slide": true },
          attrs: { style: { height: `${_that.props.height}px` } },
          children: { tag: "img", attrs: { src: item }, children: "" },
        };
      });
    }
    paginationList() {
      const _that = this;
      return this.props.imgs.map(function (d, index) {
        return {
          ref: (c) => {
            if (c) _that.dotsRef.push(c);
          },
          classes: {
            "nom-carousel-pagination-bullet": true,
            "nom-carousel-pagination-bullet-active":
              index === _that.defaultActiveIndex - 1,
          },
          tag: "span",
          attrs: { "data-index": index + 1 },
          children: index + 1,
        };
      });
    }
    paginationClick(index) {
      this.activeId = index;
      this.animate("pagination");
    }
    prevClick() {
      this.activeId -= 1;
      if (this.activeId <= 0) {
        this.activeId = this.loopImgs.length - 1;
      }
      this.animate();
    }
    nextClick() {
      this.activeId += 1;
      if (this.activeId > this.loopImgs.length) {
        this.activeId = 2;
      }
      this.animate();
    }
    animate(val) {
      this.updateSlideSize();
      if (
        this.activeId === this.loopImgs.length - 1 &&
        this.activeIdOld === 1 &&
        val !== "pagination"
      ) {
        // 首去末
        this.wrapperRef.element.setAttribute(
          "style",
          `transform:translate3d(${-this.positions[this.loopImgs.length - 1]
            .left}px, 0, 0);transition: transform 0ms;`
        );
        setTimeout(() => {
          this.wrapperRef.element.setAttribute(
            "style",
            `transform:translate3d(${-this.positions[this.loopImgs.length - 2]
              .left}px, 0, 0);transition: transform ${this.props.speed}ms ${
              this.props.easing
            };`
          );
        }, 0);
      } else {
        this.wrapperRef.element.setAttribute(
          "style",
          `transform:translate3d(${-this.positions[this.activeId - 1]
            .left}px, 0, 0);transition: transform ${this.props.speed}ms ${
            this.props.easing
          };`
        );
      } // 分页器
      this.dotsRef[this.activeIdOld - 1].element.classList.remove(
        "nom-carousel-pagination-bullet-active"
      );
      if (this.activeId === this.loopImgs.length) {
        // 末去首
        this.dotsRef[0].element.classList.add(
          "nom-carousel-pagination-bullet-active"
        );
        this.activeIdOld = 1;
        setTimeout(() => {
          this.wrapperRef.element.setAttribute(
            "style",
            `transform:translate3d(0, 0, 0);transition: transform 0ms;`
          );
        }, 300);
      } else {
        this.dotsRef[this.activeId - 1].element.classList.add(
          "nom-carousel-pagination-bullet-active"
        );
        this.activeIdOld = this.activeId;
      }
    } // 初始设置值
    initPositions() {
      this.positions = this.loopImgs.map(() => ({ left: 0, width: 0 }));
    } // 更新
    updateSlideSize() {
      const nodes = this.sildeRefs;
      let firstLeft = 0;
      if (this.slideWidth === nodes[0].element.getBoundingClientRect().width)
        return;
      nodes.forEach((node, index) => {
        if (!node.rendered) return;
        const rect = node.element.getBoundingClientRect();
        this.positions[index].width = rect.width;
        if (index === 0) {
          this.positions[index].left = 0;
          firstLeft = rect.left;
          this.slideWidth = rect.width;
        } else {
          this.positions[index].left = rect.left - firstLeft;
        }
      });
    }
  }
  Carousel.defaults = {
    imgs: [],
    height: 100,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 1000,
    speed: 300,
    dots: true,
    defaultActiveIndex: 1,
    easing: "linear",
    pauseOnHover: true,
    triggerType: "click",
  };
  Component.register(Carousel);
  class CascaderList extends Component {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this._timer = null;
      this._clickedKey = null;
      this._clickTime = null;
      this.cascaderControl = this.parent.parent.parent.cascaderControl;
      this.cascaderControl.optionList = this;
    }
    _remove() {
      this._timer && clearTimeout(this._timer);
    }
    _config() {
      const { popMenu } = this.props;
      const value = this.cascaderControl.selectedOption.map((e) => e.key);
      this.selected = [];
      this.setProps({
        children: popMenu
          ? popMenu.map((menu, index) => {
              return this.getMenuItems(menu, value[index]);
            })
          : null,
      });
      super._config();
    } // 处理非叶子节点点击事件
    _handleNoLeafClick(key) {
      const cascaderList = this;
      const changeOnSelect = this.cascaderControl.props.changeOnSelect;
      if (changeOnSelect) {
        const triggerTime = Date.now();
        let interval = Number.MAX_SAFE_INTEGER;
        if (key === this._clickedKey && isNumeric(this._clickTime)) {
          interval = triggerTime - this._clickTime;
        }
        this._clickTime = triggerTime;
        this._clickedKey = key;
        if (interval < 300) {
          // 双击事件
          cascaderList.cascaderControl._itemSelected(key, true);
          this._timer && clearTimeout(this._timer);
        } else {
          // 单击事件
          this._timer = setTimeout(() => {
            cascaderList.cascaderControl._itemSelected(key, true, false);
          }, 300);
        }
      } else {
        // 单击
        cascaderList.cascaderControl._itemSelected(key);
      }
    }
    getMenuItems(menu, currentVal) {
      const cascaderList = this;
      if (!menu) {
        return null;
      }
      return {
        tag: "ul",
        classes: { "nom-cascader-menu": true },
        attrs: {
          style: {
            width: `${this.cascaderControl.props.width}px`,
            height: `${this.cascaderControl.props.height}px`,
          },
        },
        children: menu.map((item) => {
          if (item.children) {
            return {
              tag: "li",
              _rendered() {
                item.key === currentVal && cascaderList.selected.push(this);
              },
              classes: {
                "nom-cascader-menu-item": true,
                "nom-cascader-menu-item-active": item.key === currentVal,
                "nom-cascader-menu-item-disabled": item.disabled === true,
              },
              onClick: () => {
                item.disabled !== true &&
                  cascaderList._handleNoLeafClick(item.key);
              },
              children: [
                {
                  tag: "span",
                  children: { component: "Ellipsis", text: item.label },
                },
                {
                  component: Icon,
                  type: "right",
                  classes: { "nom-cascader-menu-item-expand-icon": true },
                },
              ],
            };
          }
          return {
            tag: "li",
            _rendered() {
              item.key === currentVal && cascaderList.selected.push(this);
            },
            classes: {
              "nom-cascader-menu-item": true,
              "nom-cascader-menu-item-active": item.key === currentVal,
            },
            onClick: () => {
              cascaderList.cascaderControl._itemSelected(item.key, true);
            },
            children: [
              {
                tag: "span",
                children: { component: "Ellipsis", text: item.label },
              },
            ],
          };
        }),
      };
    }
  }
  class CascaderPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = { animate: true };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.cascaderControl = this.opener.field;
    }
    _config() {
      const { popMenu } = this.props;
      if (popMenu && popMenu.length) {
        this.setProps({
          children: {
            classes: { "nom-cascader-pop-container": true },
            component: Layout,
            body: { children: { component: CascaderList, popMenu } },
          },
        });
      } else {
        this.setProps({
          children: {
            styles: { padding: 2 },
            component: Layout,
            body: { children: { component: Empty } },
          },
        });
      }
      super._config();
    }
    _rendered() {
      this.removeClass("nom-layer-animate-show");
      this.cascaderControl.props.animate &&
        this.props.animate &&
        this.animateInit();
    }
    animateInit() {
      if (!this.element) return false;
      if (this.element.getAttribute("offset-y") !== "0") {
        this.addClass("nom-cascader-animate-bottom-show");
      } else {
        this.addClass("nom-cascader-animate-top-show");
      }
    }
    animateHide() {
      if (!this.element) return false;
      let animateName;
      if (this.element.getAttribute("offset-y") !== "0") {
        animateName = "nom-cascader-animate-bottom";
      } else {
        animateName = "nom-cascader-animate-top";
      }
      this.addClass(`${animateName}-hide`);
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
        this.removeClass(`${animateName}-hide`);
        this.addClass(`${animateName}-show`);
      }, 160);
    }
  }
  Component.register(CascaderPopup);
  class Cascader extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Cascader.defaults, props), ...mixins);
    }
    _rendered() {
      const cascader = this;
      this.popup = new CascaderPopup({
        trigger: this.control,
        popMenu: this.getSelectedMenu(),
        onShow: () => {
          const { optionList } = cascader;
          if (
            optionList &&
            optionList.selected &&
            optionList.selected.length > 0
          ) {
            optionList.selected.forEach((item) => {
              // 解决非SPA页面，滚动条自动滚动至底部问题
              if (
                !(
                  document.querySelector("body").scrollHeight >
                  window.innerHeight + 20
                )
              ) {
                item.element.scrollIntoView({
                  behavior: "auto",
                  scrollMode: "if-needed",
                });
              }
            });
          }
        },
      });
      this._valueChange({ newValue: this.currentValue });
    }
    _created() {
      super._created();
      this._hidePopup = true;
    }
    _config() {
      const cascader = this;
      const children = [];
      const {
        showArrow,
        placeholder,
        separator,
        valueType,
        allowClear,
      } = this.props;
      const { value, options, disabled } = this.props;
      this.internalOption = JSON.parse(JSON.stringify(options));
      this._normalizeInternalOptions(options);
      this.flatItems(this.internalOption);
      this.initValue = isFunction(value) ? value() : value;
      this.selectedOption = [];
      this.handleOptionSelected(this.initValue);
      this.currentValue = this.initValue;
      this.checked = true;
      children.push({
        classes: { "nom-cascader-content": true },
        _created() {
          cascader._content = this;
        },
        _config() {
          const selectedOpt = cascader.selectedOption;
          let c;
          if (selectedOpt.length === 0) {
            c = null;
          } else {
            c =
              valueType === "cascade"
                ? selectedOpt.map((e) => e.label).join(separator)
                : selectedOpt[selectedOpt.length - 1].label;
          }
          if (!c && cascader.props.value) {
            c = nomui.utils.isString(cascader.props.value)
              ? cascader.props.value
              : cascader.props.value.join(separator);
          }
          this.setProps({ children: c });
        },
      });
      if (isString(placeholder)) {
        children.push({
          _created() {
            cascader.placeholder = this;
          },
          classes: { "nom-cascader-placeholder": true },
          children: placeholder,
        });
      }
      if (showArrow) {
        children.push({
          component: Icon,
          type: "down",
          classes: { "nom-cascader-icon": true },
          _created() {
            cascader.down = this;
          },
        });
      }
      if (allowClear) {
        children.push({
          component: Icon,
          type: "close",
          classes: { "nom-cascader-icon": true },
          hidden: true,
          _created() {
            cascader.close = this;
          },
          onClick: ({ event }) => {
            event.stopPropagation();
            cascader.setValue(null); // if (this.selectedOption.length === 0) return
            // this.selectedOption = []
            // this.checked = true
            // this.content.element.innerText = ''
            // this.popup.update({
            //   popMenu: this.getSelectedMenu(),
            // })
            // this._onValueChange()
          },
        });
      }
      this.setProps({
        control: { children, disabled },
        attrs: {
          onmouseover() {
            if (disabled) return;
            cascader.close.show();
            showArrow && cascader.down.hide();
          },
          onmouseleave() {
            if (disabled) return;
            showArrow && cascader.down.show();
            cascader.close.hide();
          },
        },
      });
      super._config();
    }
    _normalizeInternalOptions(options) {
      if (!Array.isArray(options) || !options.length) return options;
      const { fieldsMapping } = this.props;
      const { children } = this.props.fieldsMapping;
      this.internalOption = clone$1(options);
      this.internalOption = this._filterEmptyChild(options, children);
      this.handleOptions(this.internalOption, fieldsMapping);
    }
    _filterEmptyChild(options, childrenMapping) {
      return options.map((option) => {
        if (
          Array.isArray(option[childrenMapping]) &&
          option[childrenMapping].length
        ) {
          return Object.assign({}, option, {
            childrenMapping: this._filterEmptyChild(
              option[childrenMapping],
              childrenMapping
            ),
          });
        }
        option[childrenMapping] = null;
        return option;
      });
    }
    _itemSelected(selectedKey, checked = false, hidePopup = true) {
      if (!this.items) return;
      this.selectedOption = [];
      let recur = this.items.get(selectedKey);
      while (recur) {
        this.selectedOption.unshift(recur);
        recur = this.items.get(recur.pid);
      }
      this.checked = checked;
      this._hidePopup = hidePopup;
      const selectedItem = this.items.get(selectedKey);
      if (!selectedItem) return;
      if (
        (this.checked && this.triggerChange(selectedItem.value)) ||
        this.props.changeOnSelect
      ) {
        this._onValueChange();
      }
      this.popup.update({ popMenu: this.getSelectedMenu(), animate: false });
    }
    _valueChange(changed) {
      if (this.placeholder) {
        if (
          (Array.isArray(changed.newValue) && changed.newValue.length === 0) ||
          !changed.newValue
        ) {
          this.placeholder.show();
        } else {
          this.placeholder.hide();
        }
      }
      this._content && this._content.update();
      this.popup &&
        this._hidePopup &&
        this.props.animate &&
        this.popup.animateHide();
      this.popup && this._hidePopup && !this.props.animate && this.popup.hide();
    }
    _getValue() {
      if (!this.checked) {
        return this.currentValue;
      }
      if (this.props.valueType === "cascade") {
        const result = this.selectedOption.map((e) => e.value);
        return result.length ? result : null;
      }
      return this.selectedOption.length
        ? this.selectedOption[this.selectedOption.length - 1].value
        : null;
    }
    _getValueText() {
      let str = "";
      this.selectedOption.forEach(function (n) {
        str += `${n.label}/`;
      });
      const result = str.substring(0, str.length - 1);
      return result;
    }
    _setValue(value) {
      if (!value && this._content) {
        this._content.element.innerText = "";
      }
      if (this.triggerChange(value)) {
        this.handleOptionSelected(value);
        this._onValueChange();
      }
    }
    _onValueChange() {
      const that = this;
      this.oldValue = clone$1(this.currentValue);
      this.currentValue = clone$1(this.getValue());
      this.props.value = this.currentValue;
      const changed = {
        name: this.props.name,
        oldValue: this.oldValue,
        newValue: this.currentValue,
        checkedOption:
          this.props.valueType === "cascade"
            ? this.selectedOption
            : this.selectedOption[this.selectedOption.length - 1],
      };
      setTimeout(function () {
        that._callHandler(that.props.onValueChange, changed);
        that.group && that.group._onValueChange(changed);
        isFunction(that._valueChange) && that._valueChange(changed);
        if (that.validateTriggered) {
          that._validate();
        }
      }, 0);
    }
    triggerChange(value) {
      if (!value || !this.currentValue || !Array.isArray(value))
        return value !== this.currentValue;
      return this.currentValue.toString() !== value.toString();
    } // handleOptions(options, fieldsMapping) {
    handleOptions(options, fieldsMapping) {
      const {
        key: keyField,
        label: labelField,
        value: valueField,
        children: childrenField,
        disabled: disabledField,
      } = fieldsMapping;
      const key = keyField || valueField;
      if (!Array.isArray(options)) return [];
      const internalOption = options;
      for (let i = 0; i < internalOption.length; i++) {
        const item = internalOption[i];
        item.label = item[labelField];
        item.value = item[valueField];
        item.key = item[key];
        item.children = item[childrenField];
        item.disabled = item[disabledField] === true;
        if (Array.isArray(item.children) && item.children.length > 0) {
          this.handleOptions(item.children, fieldsMapping);
        }
      }
    }
    flatItems(options, level = 0, pid = null) {
      if (!options || !Array.isArray(options)) {
        return null;
      }
      if (level === 0) {
        this.items = new Map();
      }
      for (let i = 0; i < options.length; i++) {
        const { key, value, label, children } = options[i];
        this.items.set(key, { key, label, value, pid, level, leaf: !children });
        if (children) {
          this.flatItems(children, level + 1, key);
        }
      }
    }
    handleOptionSelected(value) {
      let key = null;
      const { valueType, onlyleaf } = this.props;
      this.checked = false;
      const oldCheckedOption = this.selectedOption;
      this.selectedOption = [];
      if (!value) this.checked = true;
      if (!this.items || this.items.size === 0) return;
      if (valueType === "single") {
        for (const v of this.items.values()) {
          if (onlyleaf) {
            if (v.leaf && v.value === value) {
              key = v.key;
            }
          } else if (v.value === value) {
            key = v.key;
          }
        }
        if (!key) return;
        while (key) {
          this.selectedOption.unshift(this.items.get(key));
          key = this.items.get(key).pid;
        }
      } else {
        if (!Array.isArray(value)) return;
        let opt = null;
        let options = this.internalOption;
        for (let i = 0; i < value.length; i++) {
          opt = options ? options.find((e) => e.value === value[i]) : null;
          if (!opt) {
            this.selectedOption = oldCheckedOption;
            return;
          }
          this.selectedOption.push(this.items.get(opt.key));
          options = opt.children;
        }
      }
      this.checked = true;
      if (this.popup) this.popup.update({ popMenu: this.getSelectedMenu() });
      if (this._content) this._content.update();
    }
    _disable() {
      if (this.firstRender === false) {
        this.control.disable();
      }
    }
    _enable() {
      if (this.firstRender === false) {
        this.control.enable();
      }
    }
    getSelectedMenu() {
      if (!this.selectedOption) {
        return null;
      }
      const val = this.selectedOption.map((e) => e.value);
      const internalOption = this.internalOption;
      let recur = internalOption;
      const options =
        internalOption && internalOption.length ? [internalOption] : [];
      for (let i = 0; i < val.length; i++) {
        for (let j = 0; j < recur.length; j++) {
          if (val[i] === recur[j].value) {
            if (recur[j].children) {
              options.push([...recur[j].children]);
              recur = recur[j].children;
              break;
            }
          }
        }
      }
      return options;
    }
  }
  Cascader.defaults = {
    options: [],
    showArrow: true,
    separator: " / ",
    fieldsMapping: {
      label: "label",
      value: "value",
      children: "children",
      disabled: "disabled",
    },
    valueType: "cascade",
    changeOnSelect: true,
    width: 200,
    height: 250,
    disabled: false,
    onlyleaf: true,
    allowClear: true,
  };
  Component.register(Cascader);
  class Checkbox extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Checkbox.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      this.setProps({
        classes: {
          "s-checked-part": !this.props.value && this.props.partChecked,
        },
        control: {
          tag: "label",
          children: [
            {
              tag: "input",
              attrs: {
                type: "checkbox",
                checked: this.props.value,
                onchange() {
                  that.removeClass("s-checked-part");
                  that._onValueChange();
                },
              },
              _created() {
                that.input = this;
              },
            },
            { tag: "span" }, // { tag: 'i' },
            {
              tag: "span",
              classes: {
                "checkbox-text": true,
                "checkbox-text-none": !this.props.text,
              },
              children: this.props.text || "",
            },
          ],
        },
      });
      super._config();
    }
    partCheck(triggerChange) {
      this.setValue(false, triggerChange);
      this.addClass("s-checked-part");
    }
    _getValue() {
      return this.input.element.checked;
    }
    _getValueText() {
      if (this.getValue() === true) {
        return this.props.valueText.checked;
      }
      return this.props.valueText.unchecked;
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({}, options);
      }
      this.removeClass("s-checked-part");
      this.input.element.checked = value === true;
      options.triggerChange !== false && this._onValueChange();
    }
    _disable() {
      this.input.element.setAttribute("disabled", "disabled");
    }
    _enable() {
      this.input.element.removeAttribute("disabled", "disabled");
    }
  }
  Checkbox.defaults = {
    text: null,
    valueText: { checked: "是", unchecked: "否" },
  };
  Component.register(Checkbox);
  var OptionListMixin = {
    _created: function () {
      this.checkboxList = this.parent.parent;
      this.checkboxList.optionList = this;
    },
    _config: function () {
      const { itemSelectionChange } = this.props;
      const listProps = this.checkboxList.props;
      const asArray = listProps.valueOptions.asArray;
      this.setProps({
        disabled: listProps.disabled,
        items: listProps.options,
        itemDefaults: listProps.optionDefaults,
        itemSelectable: {
          byClick: true,
          multiple: true,
          scrollIntoView: false,
        },
        selectedItems:
          asArray === true
            ? listProps.value
            : isString(listProps.value)
            ? listProps.value.split(",")
            : null,
        onItemSelectionChange: () => {
          this.checkboxList._onValueChange();
          this._callHandler(itemSelectionChange);
        },
      });
    },
  };
  class OptionList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        gutter: "x-md",
        itemDefaults: {
          tag: "label",
          _config: function () {
            this.setProps({
              selected: this.props.checked === true,
              children: [
                { tag: "span", classes: { checkbox: true } }, // { tag: 'i' },
                {
                  tag: "span",
                  classes: { text: true },
                  children: this.props.text,
                },
              ],
            });
          },
        },
      };
      super(Component.extendProps(defaults, props), OptionListMixin, ...mixins);
    }
  }
  class CheckboxList extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(CheckboxList.defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        optionDefaults: {
          key: function () {
            return this.props.value;
          },
        },
      });
      this.setProps({
        optionList: { component: OptionList, cols: this.props.cols },
      });
      this.setProps({ control: this.props.optionList });
      super._config();
    }
    getSelectedOptions() {
      return this.optionList.getSelectedItems();
    }
    getUnselectedOptions() {
      return this.optionList.getUnselectedItems();
    }
    hideOption(value, alsoUnselect = true) {
      this.optionList.hideItem(value);
      if (alsoUnselect === true) {
        this.optionList.unselectItem(value);
      }
    }
    showOption(value) {
      this.optionList.showItem(value);
    }
    _getValue(options) {
      const { valueOptions } = this.props;
      options = extend$1({ asArray: true }, valueOptions, options);
      const selected = this.getSelectedOptions();
      if (selected !== null && Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props.value;
        });
        return options.asArray ? vals : vals.join(",");
      }
      return null;
    }
    _getValueText(options, value) {
      const selected =
        value !== undefined
          ? this._getOptionsByValue(value)
          : this.getSelectedOptions();
      if (selected !== null && Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props ? item.props.text : item.text;
        });
        return vals;
      }
      return null;
    }
    _setValue(value, options) {
      const { valueOptions } = this.props;
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, valueOptions, options);
      }
      if (value === null) {
        this.optionList.unselectAllItems({
          triggerSelectionChange: options.triggerChange,
        });
      }
      if (options.asArray === false && isString(value)) {
        value = value.split(",");
      }
      const _that = this;
      const optionsArry = [];
      this.props.options.forEach((ele) => {
        optionsArry.push(ele.value);
      });
      Array.isArray(value) &&
        value.forEach((ele) => {
          if (optionsArry.includes(ele)) {
            _that.optionList.selectItem(ele, {
              triggerSelectionChange: options.triggerChange,
            });
          }
        });
    }
    _disable() {
      if (this.firstRender === false) {
        this.optionList.disable();
      }
    }
    _enable() {
      if (this.firstRender === false) {
        this.optionList.enable();
      }
    }
    _getOptionsByValue(value) {
      let retOptions = null;
      const { options } = this.props;
      if (Array.isArray(value)) {
        retOptions = [];
        for (let i = 0; i < options.length; i++) {
          if (value.indexOf(options[i].value) !== -1) {
            retOptions.push(options[i]);
          }
        }
      }
      return retOptions;
    }
  }
  CheckboxList.defaults = { options: [], valueOptions: { asArray: true } };
  Component.register(CheckboxList);
  class TreeNodeContent extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(TreeNodeContent.defaults, props), ...mixins);
    }
    _created() {
      this.node = this.parent;
      this.node.content = this;
      this.level = this.node.level;
      this.tree = this.node.tree;
    }
    _config() {
      const { text, icon, tools } = this.node.props;
      const { initExpandLevel, nodeCheckable, expandable } = this.tree.props;
      const expanded = initExpandLevel === -1 || initExpandLevel > this.level;
      const tree = this.tree;
      this.setProps({
        hidden: this.node.props.data.hidden,
        expanded, // byIndicator 属性通过外部传入
        expandable: extend$1(expandable, {
          byClick: true,
          target: () => {
            return this.node.nodesRef;
          },
          indicator: {
            component: Icon,
            classes: {
              "nom-tree-node-expandable-indicator": true,
              "is-leaf": this.node.isLeaf,
            },
            expandable: {
              expandedProps: { type: "sort-down" },
              collapsedProps: { type: "sort-right" },
            },
          },
        }),
        selectable: { byClick: this.tree.props.nodeSelectable.byClick },
        selected:
          this.tree.props.nodeSelectable.selectedNodeKey === this.node.key,
        attrs: { style: { paddingLeft: `${this.level * 16}px` } },
        onSelect: () => {
          if (tree.selectedNode !== null) tree.selectedNode.unselect();
          tree.selectedNode = this.node;
          tree._onNodeSelect({
            node: this.node,
            nodeData: this.node.props.data,
          });
        },
      });
      if (
        this.tree.props.nodeSelectable.onlyleaf === true &&
        this.node.isLeaf === false
      ) {
        this.setProps({ selectable: false });
      }
      this.setProps({
        children: [
          this.tree.props.sortable &&
            this.tree.props.sortable.showHandler && {
              attrs: { style: { paddingLeft: "1rem" } },
              children: {
                component: "Icon",
                type: "swap",
                classes: { "nom-tree-drag-handler": true },
              },
            },
          this.getExpandableIndicatorProps(expanded),
          nodeCheckable && this._getCheckbox(),
          icon &&
            Component.extendProps(
              { classes: { "nom-tree-node-content-icon": true } },
              Component.normalizeIconProps(icon)
            ),
          Component.extendProps(
            { tag: "span", classes: { "nom-tree-node-content-text": true } },
            Component.normalizeTemplateProps(text)
          ),
          tools &&
            Component.extendProps(
              { classes: { "nom-tree-node-content-tools": true } },
              isFunction(tools)
                ? tools({ node: this.node, tree: this.tree })
                : tools
            ),
        ],
        onClick: () => {
          this.tree._onNodeClick({ node: this.node });
        },
      });
    }
    _getCheckbox() {
      const { disabled: treeDisabled, nodeCheckable } = this.tree.props;
      const { disabled: nodeDisabled } = this.node.props;
      return {
        component: Checkbox,
        plain: true,
        classes: { "nom-tree-node-checkbox": true },
        hidden: nodeCheckable && nodeCheckable.onlyleaf && !this.node.isLeaf,
        disabled: treeDisabled || nodeDisabled,
        _created: (inst) => {
          this.node.checkboxRef = inst;
        },
        value: this.tree.checkedNodeKeysHash[this.node.key] === true,
        onValueChange: ({ newValue }) => {
          if (newValue === true) {
            this.node.check({ checkCheckbox: false });
          } else {
            this.node.uncheck({ uncheckCheckbox: false });
          }
          this.node && this.node.autoCheckAll();
        },
      };
    }
  }
  TreeNodeContent.defaults = { text: null };
  Component.register(TreeNodeContent);
  class TreeNode extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(TreeNode.defaults, props), ...mixins);
    }
    _created() {
      this.level = 0;
      this.parentNode = this.parent.parentNode;
      if (this.parentNode !== null) {
        this.level = this.parentNode.level + 1;
        this.parentNode.subnodeRefs[this.key] = this;
      }
      this.tree = this.parent.tree;
      this.subnodeRefs = {};
      const { data } = this.props;
      const { dataFields } = this.tree.props;
      Object.keys(dataFields).forEach((dataField) => {
        data[dataField] = data[dataFields[dataField]];
      });
    }
    _config() {
      this.props.dataToNode({ data: this.props.data, node: this });
      if (this.props.key) {
        this.key = this.props.key;
      }
      this.tree.nodeRefs[this.key] = this;
      if (this.tree.props.nodeSelectable.selectedNodeKey === this.key) {
        this.tree.selectedNode = this;
      }
      const { nodes, childrenData } = this.props;
      const children = [{ component: TreeNodeContent }];
      this.isLeaf = !(
        this._isNotEmptyArray(nodes) || this._isNotEmptyArray(childrenData)
      );
      if (Array.isArray(nodes) || Array.isArray(childrenData)) {
        children.push({ component: "TreeNodes", nodes, childrenData });
      }
      this.setProps({
        classes: { "filter-node": this.props.data.__filterNode },
        children,
      });
      if (this.tree.props.nodeCheckable) {
        this.setProps({
          checked: this.tree.checkedNodeKeysHash[this.key] === true,
        });
      }
    }
    _isNotEmptyArray(arr) {
      return Array.isArray(arr) && arr.length > 0;
    }
    checkChildren({ checkCheckbox = true, triggerCheckChange = true } = {}) {
      const { checked } = this.props;
      const {
        onCheckChange,
        cascadeCheckChildren,
      } = this.tree.props.nodeCheckable;
      cascadeCheckChildren === true &&
        Object.keys(this.subnodeRefs).forEach((key) => {
          this.subnodeRefs[key].checkChildren({
            checkCheckbox: true,
            triggerCheckChange: false,
          });
        });
      if (checked === true) {
        return;
      }
      if (checkCheckbox === true) {
        this.checkboxRef.setValue(true, { triggerChange: false });
      }
      this.props.checked = true;
      if (triggerCheckChange === true) {
        this._callHandler(onCheckChange);
      }
    }
    check({
      checkCheckbox = true,
      triggerCheckChange = true,
      fromChildren = false,
    } = {}) {
      const { checked } = this.props;
      const {
        onCheckChange,
        cascadeCheckParent,
        cascadeCheckChildren,
        onlyleaf,
      } = this.tree.props.nodeCheckable;
      if (checked === true) {
        return;
      } // 级联选中子节点 && 当前节点的选中不是因为 children 级联上来的
      !onlyleaf &&
        cascadeCheckChildren === true &&
        !fromChildren &&
        Object.keys(this.subnodeRefs).forEach((key) => {
          this.subnodeRefs[key].checkChildren({
            checkCheckbox: true,
            triggerCheckChange: false,
          });
        }); // 级联选中父节点: fromChildren传值true
      !onlyleaf &&
        cascadeCheckParent === true &&
        this.parentNode &&
        this.parentNode.check({
          checkCheckbox: true,
          triggerCheckChange: false,
          fromChildren: true,
        });
      if (checkCheckbox === true) {
        this.checkboxRef.setValue(true, { triggerChange: false });
      }
      this.props.checked = true;
      if (triggerCheckChange === true) {
        this._callHandler(onCheckChange);
      }
    }
    uncheck({
      uncheckCheckbox = true,
      triggerCheckChange = true,
      skipChildren = false,
    } = {}) {
      const { checked } = this.props;
      const {
        onCheckChange,
        cascadeUncheckChildren,
        cascadeUncheckParent,
        onlyleaf,
      } = this.tree.props.nodeCheckable;
      if (checked === false) {
        return;
      }
      uncheckCheckbox &&
        this.checkboxRef.setValue(false, { triggerChange: false });
      !onlyleaf &&
        cascadeUncheckChildren === true &&
        skipChildren === false &&
        Object.keys(this.subnodeRefs).forEach((key) => {
          this.subnodeRefs[key].uncheck({
            uncheckCheckbox: true,
            triggerCheckChange: false,
          });
        });
      !onlyleaf &&
        cascadeUncheckParent === true &&
        this.parentNode &&
        this.parentNode.checkNodes({ childKey: this.key });
      this.props.checked = false;
      if (triggerCheckChange === true) {
        this._callHandler(onCheckChange);
      }
    }
    isChecked() {
      return this.props.checked === true;
    }
    checkNodes({ childKey }) {
      const c = Object.keys(this.subnodeRefs).filter((n) => {
        return (
          this.subnodeRefs[n].props.checked === true &&
          this.subnodeRefs[n].key !== childKey
        );
      });
      if (!c.length) {
        this.uncheck({
          uncheckCheckbox: true,
          triggerCheckChange: false,
          skipChildren: true,
        });
      }
    }
    autoCheckAll() {
      if (!this.tree.checkAllRef) return false;
      const check = Object.keys(this.tree.nodeRefs).some((nodeKey) => {
        return this.tree.nodeRefs[nodeKey].props.checked === false;
      });
      this.tree.checkAllRef.setValue(!check, { triggerChange: false });
    }
    getChildNodes() {
      return this.nodesRef ? this.nodesRef.getChildren() : [];
    }
    select() {
      this.content.select();
    }
    unselect() {
      this.content.unselect();
    }
  }
  TreeNode.defaults = { nodes: null, data: { hidden: false } };
  Component.register(TreeNode);
  class TreeNodes extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(TreeNodes.defaults, props), ...mixins);
    }
    _created() {
      if (this.parent instanceof Component.components.Tree) {
        this.tree = this.parent;
        this.tree.nodesRef = this;
        this.parentNode = null;
      } else {
        this.parentNode = this.parent;
        this.parentNode.nodesRef = this;
        this.tree = this.parentNode.tree;
      }
    }
    _config() {
      const { nodes, childrenData } = this.props;
      const { initExpandLevel } = this.tree.props;
      const expanded =
        initExpandLevel === -1 ||
        initExpandLevel > (this.parentNode ? this.parentNode.level : -1);
      let nodesProps = nodes;
      if (Array.isArray(childrenData)) {
        nodesProps = childrenData.map((item) => {
          return { data: item };
        });
      }
      const childDefaults = Component.extendProps(
        {
          component: TreeNode,
          dataToNode: ({ data, node }) => {
            if (isPlainObject(data)) {
              node.props.key = data.key;
              node.props.text = data.text;
              node.props.icon = data.icon;
              node.props.tools = data.tools;
              node.props.disabled = data.disabled;
              node.props.childrenData = data.children;
            }
          },
        },
        this.tree.props.nodeDefaults
      );
      this.setProps({
        children: nodesProps,
        childDefaults,
        hidden: expanded === false,
      });
    }
    _rendered() {
      const { sortable } = this.tree.props;
      if (sortable !== false) {
        new Sortable(this.element, {
          group: this.key,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          handle:
            this.tree.props.sortable &&
            this.tree.props.sortable.showHandler &&
            this.tree.props.sortable.byHandler
              ? ".nom-tree-drag-handler"
              : null,
        });
      }
    }
    iterateNodes() {}
  }
  TreeNodes.defaults = { nodes: null, childrenData: null };
  Component.register(TreeNodes);
  class Tree extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Tree.defaults, props), ...mixins);
    }
    _created() {
      this.nodeRefs = {};
      this._alreadyProcessedFlat = false;
      this.selectedNode = null;
    }
    _update(props) {
      if (props.data && this.props) {
        // data更新, flatData需要重新组装成Tree结构
        if (this.props.flatData) {
          this._alreadyProcessedFlat = false;
        }
      }
    }
    _config() {
      this.nodeRefs = {};
      this.selectedNode = null;
      const { nodes, data, flatData, nodeCheckable } = this.props;
      if (flatData === true && !this._alreadyProcessedFlat) {
        this.setProps({ data: this._setTreeData(data) });
        this._alreadyProcessedFlat = true;
      }
      this._addPropStyle("fit");
      if (nodeCheckable) {
        this._loopSetValue(nodeCheckable, [
          "cascadeCheckParent",
          "cascadeCheckChildren",
          "cascadeUncheckChildren",
          "cascadeUncheckParent",
        ]);
        this.setProps({
          nodeCheckable: Component.extendProps(
            {
              cascadeCheckParent: true,
              cascadeCheckChildren: true,
              cascadeUncheckChildren: true,
              cascadeUncheckParent: true,
              cascade: false,
              showCheckAll: false,
              checkAllText: "全选",
              checkedNodeKeys: [],
            },
            nodeCheckable
          ),
        });
        if (this.props.nodeCheckable && this.props.nodeCheckable.onlyleaf) {
          this.setProps({
            nodeCheckable: {
              cascadeCheckParent: false,
              cascadeUncheckParent: false,
              cascade: false,
            },
          });
        }
        this.checkedNodeKeysHash = {};
        if (Array.isArray(this.props.nodeCheckable.checkedNodeKeys)) {
          this.props.nodeCheckable.checkedNodeKeys.forEach((key) => {
            this.checkedNodeKeysHash[key] = true;
          });
        }
      }
      const children = [];
      if (
        this.props.nodeCheckable &&
        this.props.nodeCheckable.showCheckAll === true
      ) {
        children.push(this._getCheckAllCheckbox());
      }
      children.push({
        component: TreeNodes,
        nodes,
        childrenData: this.props.data,
      });
      this.setProps({ children: children });
    }
    _rendered() {
      this.autoCheckAll();
      this.props.sortable && defaultSortableOndrop();
    }
    autoCheckAll() {
      if (!this.checkAllRef) return false;
      const check = Object.keys(this.nodeRefs).some((nodeKey) => {
        return this.nodeRefs[nodeKey].props.checked === false;
      });
      this.checkAllRef.setValue(!check, { triggerChange: false });
    }
    _loopSetValue(key, arry) {
      if (key.cascade === undefined) return false;
      arry.forEach(function (currentValue) {
        if (key[currentValue] === undefined) {
          key[currentValue] = key.cascade;
        }
      });
    }
    _dataToNodes() {}
    getData(getOptions, node) {
      getOptions = getOptions || {};
      node = node || this;
      const nodesData = [];
      const childNodes = node.getChildNodes();
      childNodes.forEach((childNode) => {
        const childNodeData = Object.assign({}, childNode.props.data);
        nodesData.push(childNodeData);
        const children = this.getData(getOptions, childNode);
        if (children && children.length) {
          childNodeData.children = children;
        }
      });
      return nodesData;
    }
    getCheckedNodes(node) {
      if (node === undefined) {
        node = this;
      }
      const checkedNodes = [];
      const childNodes = node.getChildNodes();
      childNodes.forEach((childNode) => {
        if (childNode.isChecked() === true) {
          checkedNodes.push(childNode);
          childNode.checkedNodes = this.getCheckedNodes(childNode);
        }
      });
      return checkedNodes;
    }
    getCheckedNodeKeys(getOptions, checkedNodeKeys, node) {
      getOptions = getOptions || {};
      checkedNodeKeys = checkedNodeKeys || [];
      node = node || this;
      const childNodes = node.getChildNodes();
      childNodes.forEach((childNode) => {
        if (childNode.isChecked() === true) {
          checkedNodeKeys.push(childNode.key);
        }
        this.getCheckedNodeKeys(getOptions, checkedNodeKeys, childNode);
      });
      return checkedNodeKeys;
    }
    getCheckedNodesData(getOptions, node) {
      getOptions = getOptions || { flatData: false };
      node = node || this;
      let checkedNodesData = [];
      const childNodes = node.getChildNodes();
      childNodes.forEach((childNode) => {
        if (childNode.isChecked() === true) {
          const childNodeData = Object.assign({}, childNode.props.data);
          checkedNodesData.push(childNodeData);
          if (getOptions.flatData === true) {
            checkedNodesData = checkedNodesData.concat(
              this.getCheckedNodesData(getOptions, childNode)
            );
          } else {
            const children = this.getCheckedNodesData(getOptions, childNode);
            if (children && children.length) {
              childNodeData.children = children;
            }
          }
        }
      });
      return checkedNodesData;
    }
    getNode(param) {
      let retNode = null;
      if (param instanceof Component) {
        return param;
      }
      if (isFunction(param)) {
        for (const key in this.nodeRefs) {
          if (this.nodeRefs.hasOwnProperty(key)) {
            if (param.call(this.nodeRefs[key]) === true) {
              retNode = this.nodeRefs[key];
              break;
            }
          }
        }
      } else {
        return this.nodeRefs[param];
      }
      return retNode;
    }
    getSelectedNode() {
      return this.selectedNode;
    }
    getChildNodes() {
      return this.nodesRef.getChildren();
    }
    selectNode(param) {
      const node = this.getNode(param);
      if (node) {
        node.select();
        if (this.props.nodeSelectable.scrollIntoView) {
          this.scrollTo(node);
        }
      }
    }
    setCheckedNodeKeys(array) {
      this.props.nodeCheckable.checkedNodeKeys = array;
      this.update({});
    } // 展开指定节点
    expandTo(param) {
      let node = this.getNode(param); // 遍历展开 parentNode
      while (node) {
        // 节点存在 && 为展开-->expanded: false
        if (node && node.content && !node.content.props.expanded) {
          node.content.expand();
        }
        node = node.parentNode;
      }
    }
    scrollTo(param) {
      const node = this.getNode(param);
      if (node) {
        scrollIntoView(node.element, {
          behavior: "smooth",
          scrollMode: "if-needed",
        });
      }
    }
    checkAllNodes(options) {
      Object.keys(this.nodeRefs).forEach((nodeKey) => {
        if (options && options.ignoreDisabled === true) {
          if (this.nodeRefs[nodeKey].props.disabled !== true) {
            this.nodeRefs[nodeKey].check({ triggerCheckChange: false });
          }
        } else {
          this.nodeRefs[nodeKey].check({ triggerCheckChange: false });
        }
      });
      this._onCheckChange();
    }
    uncheckAllNodes(options) {
      Object.keys(this.nodeRefs).forEach((nodeKey) => {
        if (options && options.ignoreDisabled === true) {
          if (this.nodeRefs[nodeKey].props.disabled !== true) {
            this.nodeRefs[nodeKey].uncheck({ triggerCheckChange: false });
          }
        } else {
          this.nodeRefs[nodeKey].uncheck({ triggerCheckChange: false });
        }
      });
      this._onCheckChange();
    }
    _onCheckChange(args) {
      const { onCheckChange } = this.props.nodeCheckable;
      this._callHandler(onCheckChange, args);
    }
    _onNodeClick(args) {
      this._callHandler("onNodeClick", args);
    }
    _onNodeSelect(args) {
      const { onNodeSelect } = this.props.nodeSelectable;
      this._callHandler(onNodeSelect, args);
    }
    _setTreeData(arr) {
      const { key, parentKey, children } = this.props.dataFields;
      if (!key || key === "" || !arr) return []; //  删除所有 children,以防止多次调用
      arr.forEach(function (item) {
        delete item[children];
      });
      const map = {}; // 构建map
      arr.forEach((i) => {
        map[i[key]] = i; // 构建以key为键 当前数据为值
      });
      const treeData = [];
      arr.forEach((child) => {
        const mapItem = map[child[parentKey]]; // 判断当前数据的parentKey是否存在map中
        if (mapItem) {
          (mapItem[children] || (mapItem[children] = [])).push(child); // 这里判断mapItem中是否存在children, 存在则插入当前数据, 不存在则赋值children为[]然后再插入当前数据
        } else {
          // 不存在则是组顶层数据
          treeData.push(child);
        }
      });
      return treeData;
    }
    _getCheckAllCheckbox() {
      const { disabled } = this.props;
      return {
        component: Checkbox,
        classes: { "nom-tree-check-all": true },
        text: this.props.nodeCheckable.checkAllText,
        disabled: disabled,
        _created: (inst) => {
          this.checkAllRef = inst;
        }, // value: this.tree.checkedNodeKeysHash[this.node.key] === true,
        onValueChange: ({ newValue }) => {
          if (newValue === true) {
            this.checkAllNodes();
          } else {
            this.uncheckAllNodes();
          }
        },
      };
    }
  }
  Tree.defaults = {
    nodes: null,
    nodeDefaults: {},
    nodeSelectable: {
      onlyleaf: false,
      byClick: true,
      selectedNodeKey: null,
      scrollIntoView: true,
    },
    dataFields: {
      key: "key",
      text: "text",
      children: "children",
      parentKey: "parentKey",
    },
    flatData: false,
    sortable: false,
    initExpandLevel: -1,
  };
  Component.register(Tree);
  var OptionTreeMixin = {
    _created: function () {
      this.checkboxTree = this.parent.parent;
      this.checkboxTree.optionTree = this;
    },
    _config: function () {
      const checkboxTreeProps = this.checkboxTree.props;
      this.setProps({
        disabled: checkboxTreeProps.disabled,
        nodeCheckable: {
          checkedNodeKeys: checkboxTreeProps.value,
          onCheckChange: () => {
            this.checkboxTree._onValueChange();
          },
        },
      });
    },
  };
  class DefaultCheckboxOptionTree extends Tree {
    constructor(props, ...mixins) {
      const defaults = { dataFields: { key: "value" } };
      super(Component.extendProps(defaults, props), OptionTreeMixin, ...mixins);
    }
  }
  class CheckboxTree extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(CheckboxTree.defaults, props), ...mixins);
    }
    _config() {
      const {
        options,
        showCheckAll,
        checkAllText,
        treeDataFields,
        cascadeUncheckChildren,
        cascadeCheckChildren,
        cascadeCheckParent,
        cascadeUncheckParent,
        cascade,
        attrs,
        initExpandLevel,
      } = this.props;
      if (attrs && attrs.style && attrs.style.height && isChrome49()) {
        attrs.style.overflow = "auto";
      }
      this.setProps({
        classes: { "nom-checkbox-tree-with-label": !!this.props.label },
        control: {
          component: DefaultCheckboxOptionTree,
          data: options,
          fit: true,
          dataFields: treeDataFields,
          initExpandLevel,
          nodeCheckable: {
            showCheckAll,
            checkAllText,
            cascade,
            cascadeCheckParent,
            cascadeCheckChildren,
            cascadeUncheckChildren,
            cascadeUncheckParent,
          },
        },
      });
      super._config();
    }
    getSelectedOptions() {
      return this.optionTree.getCheckedNodesData({ flatData: true });
    }
    _getValue(options) {
      const { valueOptions } = this.props;
      options = extend$1({ asString: false }, valueOptions, options);
      const selected = this.getSelectedOptions();
      if (selected !== null && Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.key;
        });
        if (options.asString) {
          return vals.join();
        }
        return vals;
      }
      return null;
    }
    _getValueText(options, value) {
      const selected =
        value !== undefined
          ? this._getOptionsByValue(value)
          : this.getSelectedOptions();
      if (selected !== null && Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.text;
        });
        return vals;
      }
      return null;
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      if (value === null) {
        this.optionTree.unselectAllItems({
          triggerSelectionChange: options.triggerChange,
        });
      }
      this.optionTree.selectItem(
        function () {
          return this.props.value === value;
        },
        { triggerSelectionChange: options.triggerChange }
      );
    }
    _disable() {
      if (this.firstRender === false) {
        this.optionTree.disable();
      }
    }
    _enable() {
      if (this.firstRender === false) {
        this.optionTree.enable();
      }
    }
    _getOptionsByValue(value) {
      let retOptions = null;
      const { options } = this.props;
      if (Array.isArray(value)) {
        retOptions = [];
        for (let i = 0; i < options.length; i++) {
          if (value.indexOf(options[i].value) !== -1) {
            retOptions.push(options[i]);
          }
        }
      }
      return retOptions;
    }
  }
  CheckboxTree.defaults = {
    options: [],
    showCheckAll: false,
    checkAllText: "全选",
    treeDataFields: {},
  };
  Component.register(CheckboxTree);
  class CollapseItem extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        key: null,
        title: null,
        content: null,
        collapsed: true,
        onChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.menu = this.parent.parent.parent;
      this.menu.itemRef[this.props.key] = this;
    }
    _config() {
      const { key, title, content, collapsed } = this.props;
      const that = this;
      this.setProps({
        children: [
          {
            tag: "div",
            classes: {
              "nom-collapse-item-title": true,
              "nom-collapse-item-open": !collapsed,
            },
            key: key,
            children: [
              Object.assign(
                {},
                Component.normalizeIconProps(
                  collapsed
                    ? that.menu.props.icon.default
                    : that.menu.props.icon.open
                ),
                {
                  classes: {
                    "nom-collapse-right-icon":
                      that.menu.props.icon.align === "right",
                  },
                  onClick: function () {
                    if (!that.menu.props.iconOnly) return;
                    that._handleCollapse();
                  },
                }
              ),
              { tag: "span", children: title },
            ],
            onClick: function () {
              if (that.menu.props.iconOnly) return;
              that._handleCollapse();
            },
          },
          {
            tag: "div",
            classes: {
              "nom-collapse-item-content": true, // 'nom-collapse-animate-show': !collapsed,
              // 'nom-collapse-animate-hide': collapsed,
            },
            hidden: collapsed,
            children: content,
          },
        ],
      });
    }
    close() {
      this.update({ collapsed: true });
    }
    _handleCollapse() {
      this.setProps({ collapsed: this.props.collapsed !== true });
      this.update(this.props.collapsed);
      this.menu._onCollapse(this.props.key, !this.props.collapsed);
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
  Component.register(CollapseItem);
  class Collapse extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Collapse.defaults, props), ...mixins);
    }
    _created() {
      this.itemRef = [];
    }
    _config() {
      const { activeKey, bordered } = this.props;
      const items = this.props.items.map((item) => {
        return {
          component: CollapseItem,
          key: item.key,
          title: item.title,
          content: item.content,
          collapsed:
            Object.prototype.toString.call(activeKey) === "[object Array]"
              ? !this.onActiveKeyArray(item.key)
              : activeKey !== item.key,
          classes: { "nom-collapse-bordered": !!bordered },
        };
      });
      this.setProps({
        children: { component: "Flex", gutter: this.props.gutter, rows: items },
      });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
    _onCollapse(key, isShown) {
      const that = this;
      this.setProps({ activeKey: key });
      if (isShown && this.props.accordion) {
        Object.keys(this.itemRef).forEach(function (k) {
          if (k !== key && parseInt(k, 10) !== key) {
            that.itemRef[k].close();
          }
        });
      }
      this.props.onChange &&
        this._callHandler(this.props.onChange, {
          currentKey: key,
          collapsed: !isShown,
        });
    }
    onActiveKeyArray(key) {
      return this.props.activeKey.some(function (currentValue) {
        return currentValue === key;
      });
    }
  }
  Collapse.defaults = {
    activeKey: 1,
    items: null,
    bordered: false,
    icon: { default: "right", open: "up", align: "left" },
    gutter: "small",
    iconOnly: false,
    accordion: false,
  };
  Component.register(Collapse);
  class ConfirmContent extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        title: null,
        description: null,
        icon: null,
        type: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const confirmInst = this.modal;
      const {
        title,
        description,
        icon,
        action,
        okText,
        cancelText,
      } = confirmInst.props;
      const iconProps = icon
        ? Component.extendProps(Component.normalizeIconProps(icon), {
            classes: { "nom-confirm-icon": true },
          })
        : null;
      const titleProps = title
        ? Component.extendProps(Component.normalizeTemplateProps(title), {
            classes: { "nom-confirm-title": true },
          })
        : null;
      const descriptionProps = description
        ? Component.extendProps(Component.normalizeTemplateProps(description), {
            classes: { "nom-confirm-description": true },
          })
        : null;
      const okButtonProps = {
        component: Button,
        type: "primary",
        text: okText,
        onClick: () => {
          confirmInst._handleOk();
        },
      };
      const cancelButtonProps = {
        component: Button,
        text: cancelText,
        onClick: () => {
          confirmInst._handleCancel();
        },
      };
      let actionProps = { component: Cols, justify: "end" };
      if (!action) {
        actionProps.items = [okButtonProps, cancelButtonProps];
      } else if (isPlainObject(action)) {
        actionProps = Component.extendProps(actionProps, action);
      } else if (Array.isArray(action)) {
        actionProps.items = action;
      }
      this.setProps({
        children: [
          {
            classes: { "nom-confirm-body": true },
            children: [
              iconProps,
              {
                classes: { "nom-confirm-body-content": true },
                children: [titleProps, descriptionProps],
              },
            ],
          },
          { classes: { "nom-confirm-actions": true }, children: actionProps },
        ],
      });
    }
  }
  Component.register(ConfirmContent);
  class Confirm extends Modal {
    constructor(props, ...mixins) {
      super(Component.extendProps(Confirm.defaults, props), ...mixins);
    }
    _config() {
      const { onOk } = this.props;
      this.setProps({
        content: { component: ConfirmContent },
        onOk: (e) => {
          if (onOk(e) !== false) {
            e.sender.close();
          }
        },
      });
      super._config();
    }
  }
  Confirm.defaults = {
    icon: "question-circle",
    title: null,
    description: null,
    action: null,
  };
  Component.register(Confirm);
  class Container extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Container.defaults, props), mixins);
    }
    _config() {
      this._addPropStyle("breakpoint", "fluid");
    }
  }
  Container.defaults = {
    fluid: false, // type: null,
    breakpoint: null,
  };
  Component.register(Container);
  const CSS_PREFIX = "nom-statistic-"; // 给数字添加千分位符号
  function formatDecimal(num, groupSeparator, decimalSeparator) {
    const isNegative = num.toString().startWith("-");
    const absoluteValue = num.toString().replace(/^-/, "");
    let result;
    let decimal = "";
    let absoluteInteger = absoluteValue;
    if (absoluteInteger.includes(".")) {
      [absoluteInteger, decimal] = absoluteValue.split(".");
    }
    const len = absoluteInteger.length;
    if (len <= 3) return num.toString();
    let temp = "";
    const remainder = len % 3;
    if (decimal) temp = `${decimalSeparator}${decimal}`;
    if (remainder > 0) {
      result = `${absoluteInteger.slice(0, remainder)},${absoluteInteger
        .slice(remainder, len)
        .match(/\d{3}/g)
        .join(groupSeparator)}${temp}`;
    } else {
      result = `${absoluteInteger
        .slice(0, len)
        .match(/\d{3}/g)
        .join(groupSeparator)}${temp}`;
    }
    return isNegative ? `-${result}` : result;
  }
  class Statistic extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Statistic.defaults, props), ...mixins);
    }
    _config() {
      const statisticRef = this;
      const {
        title,
        value,
        precision,
        groupSeparator,
        decimalSeparator,
        formatter,
        prefix,
        suffix,
      } = this.props;
      const valueStr = value ? value.toString() : ""; // 非数字则不格式化了
      let formatValue = decimalSeparator
        ? valueStr.replace(decimalSeparator, ".")
        : valueStr;
      if (isNumeric(formatValue)) {
        formatValue = isFunction(formatter)
          ? formatter(value)
          : formatDecimal(
              Number(formatValue).toFixed(precision),
              groupSeparator,
              decimalSeparator
            );
      }
      const content = [];
      prefix &&
        content.push({
          tag: "span",
          _created() {
            statisticRef.prefixRef = this;
          },
          classes: { [`${CSS_PREFIX}content-prefix`]: true },
          children: prefix,
        });
      value &&
        content.push({
          tag: "span",
          _created() {
            statisticRef.valueRef = this;
          },
          classes: { [`${CSS_PREFIX}content-value`]: true },
          children: formatValue,
        });
      suffix &&
        content.push({
          tag: "span",
          _created() {
            statisticRef.suffixRef = this;
          },
          classes: { [`${CSS_PREFIX}content-suffix`]: true },
          children: suffix,
        });
      this.setProps({
        children: [
          {
            _created() {
              statisticRef.captionRef = this;
            },
            classes: { [`${CSS_PREFIX}title`]: true },
            children: title,
          },
          { classes: { "nom-statistic-content": true }, children: content },
        ],
      });
    }
  }
  Statistic.defaults = {
    groupSeparator: ",",
    decimalSeparator: ".",
    precision: 0,
  };
  Component.register(Statistic);
  /**
   * Copyright (c)2005-2009 Matt Kruse (javascripttoolbox.com)
   *
   * Dual licensed under the MIT and GPL licenses.
   * This basically means you can use this code however you want for
   * free, but don't claim to have written it yourself!
   * Donations always accepted: http://www.JavascriptToolbox.com/donate/
   *
   * Please do not link to the .js files on javascripttoolbox.com from
   * your site. Copy the files locally to your server instead.
   *
   */ /*
  Date functions

  These functions are used to parse, format, and manipulate Date objects.
  See documentation and examples at http://www.JavascriptToolbox.com/lib/date/

  */ Date.$VERSION = 1.02; // Utility function to append a 0 to single-digit numbers
  Date.LZ = function (x) {
    return (x < 0 || x > 9 ? "" : "0") + x;
  }; // Full month names. Change this for local month names
  Date.monthNames = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ); // Month abbreviations. Change this for local month names
  Date.monthAbbreviations = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ); // Full day names. Change this for local month names
  Date.dayNames = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ); // Day abbreviations. Change this for local month names
  Date.dayAbbreviations = new Array(
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ); // Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
  // Set to false to prefer 'European' format meaning Feb 1
  Date.preferAmericanFormat = true; // If the getFullYear() method is not defined, create it
  if (!Date.prototype.getFullYear) {
    Date.prototype.getFullYear = function () {
      const yy = this.getYear();
      return yy < 1900 ? yy + 1900 : yy;
    };
  } // Parse a string and convert it to a Date object.
  // If no format is passed, try a list of common formats.
  // If string cannot be parsed, return null.
  // Avoids regular expressions to be more portable.
  Date.parseString = function (val, format) {
    // If no format is specified, try a few common formats
    if (typeof format === "undefined" || format == null || format === "") {
      const generalFormats = new Array(
        "y-M-d",
        "MMM d, y",
        "MMM d,y",
        "y-MMM-d",
        "d-MMM-y",
        "MMM d",
        "MMM-d",
        "d-MMM"
      );
      const monthFirst = new Array("M/d/y", "M-d-y", "M.d.y", "M/d", "M-d");
      const dateFirst = new Array("d/M/y", "d-M-y", "d.M.y", "d/M", "d-M");
      const checkList = new Array(
        generalFormats,
        Date.preferAmericanFormat ? monthFirst : dateFirst,
        Date.preferAmericanFormat ? dateFirst : monthFirst
      );
      for (let i = 0; i < checkList.length; i++) {
        const l = checkList[i];
        for (let j = 0; j < l.length; j++) {
          const d = Date.parseString(val, l[j]);
          if (d != null) {
            return d;
          }
        }
      }
      return null;
    }
    this.isInteger = function (_val) {
      for (let i = 0; i < _val.length; i++) {
        if ("1234567890".indexOf(_val.charAt(i)) === -1) {
          return false;
        }
      }
      return true;
    };
    this.getInt = function (str, i, minlength, maxlength) {
      for (let x = maxlength; x >= minlength; x--) {
        const token = str.substring(i, i + x);
        if (token.length < minlength) {
          return null;
        }
        if (this.isInteger(token)) {
          return token;
        }
      }
      return null;
    };
    val += "";
    format += "";
    let i_val = 0;
    let i_format = 0;
    let c = "";
    let token = "";
    let x;
    let y;
    let year = new Date().getFullYear();
    let month = 1;
    let date = 1;
    let hh = 0;
    let mm = 0;
    let ss = 0;
    let ampm = "";
    while (i_format < format.length) {
      // Get next token from format string
      c = format.charAt(i_format);
      token = "";
      while (format.charAt(i_format) === c && i_format < format.length) {
        token += format.charAt(i_format++);
      } // Extract contents of value based on format token
      if (token === "yyyy" || token === "yy" || token === "y") {
        if (token === "yyyy") {
          x = 4;
          y = 4;
        }
        if (token === "yy") {
          x = 2;
          y = 2;
        }
        if (token === "y") {
          x = 2;
          y = 4;
        }
        year = this.getInt(val, i_val, x, y);
        if (year == null) {
          return null;
        }
        i_val += year.length;
        if (year.length === 2) {
          if (year > 70) {
            year = 1900 + (year - 0);
          } else {
            year = 2000 + (year - 0);
          }
        }
      } else if (token === "MMM" || token === "NNN") {
        month = 0;
        const names =
          token === "MMM"
            ? Date.monthNames.concat(Date.monthAbbreviations)
            : Date.monthAbbreviations;
        for (let i = 0; i < names.length; i++) {
          const month_name = names[i];
          if (
            val.substring(i_val, i_val + month_name.length).toLowerCase() ===
            month_name.toLowerCase()
          ) {
            month = (i % 12) + 1;
            i_val += month_name.length;
            break;
          }
        }
        if (month < 1 || month > 12) {
          return null;
        }
      } else if (token === "EE" || token === "E") {
        const names = token === "EE" ? Date.dayNames : Date.dayAbbreviations;
        for (let i = 0; i < names.length; i++) {
          const day_name = names[i];
          if (
            val.substring(i_val, i_val + day_name.length).toLowerCase() ===
            day_name.toLowerCase()
          ) {
            i_val += day_name.length;
            break;
          }
        }
      } else if (token === "MM" || token === "M") {
        month = this.getInt(val, i_val, token.length, 2);
        if (month == null || month < 1 || month > 12) {
          return null;
        }
        i_val += month.length;
      } else if (token === "dd" || token === "d") {
        date = this.getInt(val, i_val, token.length, 2);
        if (date == null || date < 1 || date > 31) {
          return null;
        }
        i_val += date.length;
      } else if (token === "hh" || token === "h") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 1 || hh > 12) {
          return null;
        }
        i_val += hh.length;
      } else if (token === "HH" || token === "H") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 0 || hh > 23) {
          return null;
        }
        i_val += hh.length;
      } else if (token === "KK" || token === "K") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 0 || hh > 11) {
          return null;
        }
        i_val += hh.length;
        hh++;
      } else if (token === "kk" || token === "k") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 1 || hh > 24) {
          return null;
        }
        i_val += hh.length;
        hh--;
      } else if (token === "mm" || token === "m") {
        mm = this.getInt(val, i_val, token.length, 2);
        if (mm == null || mm < 0 || mm > 59) {
          return null;
        }
        i_val += mm.length;
      } else if (token === "ss" || token === "s") {
        ss = this.getInt(val, i_val, token.length, 2);
        if (ss == null || ss < 0 || ss > 59) {
          return null;
        }
        i_val += ss.length;
      } else if (token === "a") {
        if (val.substring(i_val, i_val + 2).toLowerCase() === "am") {
          ampm = "AM";
        } else if (val.substring(i_val, i_val + 2).toLowerCase() === "pm") {
          ampm = "PM";
        } else {
          return null;
        }
        i_val += 2;
      } else {
        if (val.substring(i_val, i_val + token.length) !== token) {
          return null;
        }
        i_val += token.length;
      }
    } // If there are any trailing characters left in the value, it doesn't match
    if (i_val !== val.length) {
      return null;
    } // Is date valid for month?
    if (month === 2) {
      // Check for leap year
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // leap year
        if (date > 29) {
          return null;
        }
      } else if (date > 28) {
        return null;
      }
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
      if (date > 30) {
        return null;
      }
    } // Correct hours value
    if (hh < 12 && ampm === "PM") {
      hh = hh - 0 + 12;
    } else if (hh > 11 && ampm === "AM") {
      hh -= 12;
    }
    return new Date(year, month - 1, date, hh, mm, ss);
  }; // Check if a date string is valid
  Date.isValid = function (val, format) {
    return Date.parseString(val, format) != null;
  }; // Check if a date object is before another date object
  Date.prototype.isBefore = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() < date2.getTime();
  }; // Check if a date object is after another date object
  Date.prototype.isAfter = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() > date2.getTime();
  }; // Check if two date objects have equal dates and times
  Date.prototype.equals = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() === date2.getTime();
  }; // Check if two date objects have equal dates, disregarding times
  Date.prototype.equalsIgnoreTime = function (date2) {
    if (date2 == null) {
      return false;
    }
    const d1 = new Date(this.getTime()).clearTime();
    const d2 = new Date(date2.getTime()).clearTime();
    return d1.getTime() === d2.getTime();
  }; // Format a date into a string using a given format string
  Date.prototype.format = function (format) {
    format += "";
    let result = "";
    let i_format = 0;
    let c = "";
    let token = "";
    let y = `${this.getYear()}`;
    const M = this.getMonth() + 1;
    const d = this.getDate();
    const E = this.getDay();
    const H = this.getHours();
    const m = this.getMinutes();
    const s = this.getSeconds(); // Convert real date parts into formatted versions
    const value = {};
    if (y.length < 4) {
      y = `${+y + 1900}`;
    }
    value.y = `${y}`;
    value.yyyy = y;
    value.yy = y.substring(2, 4);
    value.M = M;
    value.MM = Date.LZ(M);
    value.MMM = Date.monthNames[M - 1];
    value.NNN = Date.monthAbbreviations[M - 1];
    value.d = d;
    value.dd = Date.LZ(d);
    value.E = Date.dayAbbreviations[E];
    value.EE = Date.dayNames[E];
    value.H = H;
    value.HH = Date.LZ(H);
    if (H === 0) {
      value.h = 12;
    } else if (H > 12) {
      value.h = H - 12;
    } else {
      value.h = H;
    }
    value.hh = Date.LZ(value.h);
    value.K = value.h - 1;
    value.k = value.H + 1;
    value.KK = Date.LZ(value.K);
    value.kk = Date.LZ(value.k);
    if (H > 11) {
      value.a = "PM";
    } else {
      value.a = "AM";
    }
    value.m = m;
    value.mm = Date.LZ(m);
    value.s = s;
    value.ss = Date.LZ(s);
    while (i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while (format.charAt(i_format) === c && i_format < format.length) {
        token += format.charAt(i_format++);
      }
      if (typeof value[token] !== "undefined") {
        result += value[token];
      } else {
        result += token;
      }
    }
    return result;
  }; // Get the full name of the day for a date
  Date.prototype.getDayName = function () {
    return Date.dayNames[this.getDay()];
  }; // Get the abbreviation of the day for a date
  Date.prototype.getDayAbbreviation = function () {
    return Date.dayAbbreviations[this.getDay()];
  }; // Get the full name of the month for a date
  Date.prototype.getMonthName = function () {
    return Date.monthNames[this.getMonth()];
  }; // Get the abbreviation of the month for a date
  Date.prototype.getMonthAbbreviation = function () {
    return Date.monthAbbreviations[this.getMonth()];
  }; // Clear all time information in a date object
  Date.prototype.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
  }; // Add an amount of time to a date. Negative numbers can be passed to subtract time.
  Date.prototype.add = function (interval, number) {
    if (
      typeof interval === "undefined" ||
      interval == null ||
      typeof number === "undefined" ||
      number == null
    ) {
      return this;
    }
    number = +number;
    if (interval === "y") {
      // year
      this.setFullYear(this.getFullYear() + number);
    } else if (interval === "M") {
      // Month
      this.setMonth(this.getMonth() + number);
    } else if (interval === "d") {
      // Day
      this.setDate(this.getDate() + number);
    } else if (interval === "w") {
      // Weekday
      const step = number > 0 ? 1 : -1;
      while (number !== 0) {
        this.add("d", step);
        while (this.getDay() === 0 || this.getDay() === 6) {
          this.add("d", step);
        }
        number -= step;
      }
    } else if (interval === "h") {
      // Hour
      this.setHours(this.getHours() + number);
    } else if (interval === "m") {
      // Minute
      this.setMinutes(this.getMinutes() + number);
    } else if (interval === "s") {
      // Second
      this.setSeconds(this.getSeconds() + number);
    }
    return this;
  }; // Countdown
  const timeUnits = [
    ["Y", 1000 * 60 * 60 * 24 * 365], // years
    ["M", 1000 * 60 * 60 * 24 * 30], // months
    ["D", 1000 * 60 * 60 * 24], // days
    ["H", 1000 * 60 * 60], // hours
    ["m", 1000 * 60], // minutes
    ["s", 1000], // seconds
    ["S", 1], // million seconds
  ]; // function padStart(string, length, chars) {
  //   const strLength = length ? stringSize(string) : 0
  //   return length && strLength < length
  //     ? createPadding(length - strLength, chars) + string
  //     : string || ''
  // }
  function padStart(string, length, chars) {
    if (!string) return "";
    const repeatCount = length - string.length;
    return repeatCount > 0 ? `${chars.repeat(repeatCount)}${string}` : string;
  }
  function formatTimeStr(duration, format) {
    let leftDuration = duration;
    const escapeRegex = /\[[^\]]*]/g;
    const keepList = (format.match(escapeRegex) || []).map((str) =>
      str.slice(1, -1)
    );
    const templateText = format.replace(escapeRegex, "[]");
    const replacedText = timeUnits.reduce((current, [name, unit]) => {
      if (current.indexOf(name) !== -1) {
        const value = Math.floor(leftDuration / unit);
        leftDuration -= value * unit;
        return current.replace(new RegExp(`${name}+`, "g"), (match) => {
          const len = match.length;
          return padStart(value.toString(), len, "0");
        });
      }
      return current;
    }, templateText);
    let index = 0;
    return replacedText.replace(escapeRegex, () => {
      const match = keepList[index];
      index += 1;
      return match;
    });
  }
  class Countdown extends Statistic {
    constructor(props, ...mixins) {
      super(Component.extendProps(Countdown.defaults, props), ...mixins);
    }
    _created() {
      this._interval = null;
    }
    _config() {
      const countdownRef = this;
      this._handleDeadLine();
      this.setProps({ value: countdownRef._flashCountdown(this.props.format) });
      super._config();
    }
    _rendered() {
      // start timer
      this._startCountdown();
    }
    _remove() {
      clearInterval(this._interval);
      this._interval = undefined;
    }
    _handleDeadLine() {
      const { value } = this.props;
      let deadline = 0;
      if (isDate(value)) {
        deadline = value.getTime();
      } else if (isNumeric(value)) {
        deadline = new Date(value).getTime();
      }
      this._deadline = deadline;
    }
    _startCountdown() {
      const countdownRef = this;
      const { interval, format } = this.props;
      if (this._interval || !isNumeric(interval)) return;
      this._interval = setInterval(() => {
        if (countdownRef._deadline < Date.now()) countdownRef._stopCountdown();
        countdownRef.valueRef.element.innerHTML = countdownRef._flashCountdown(
          format
        );
      }, interval);
    }
    _stopCountdown() {
      const { onComplete } = this.props;
      if (this._interval) {
        clearInterval(this._interval);
        this._interval = undefined; // const timestamp = getTimestamp(value)
        if (isFunction(onComplete) && this._deadline < Date.now()) {
          onComplete();
        }
      }
    }
    _flashCountdown(format) {
      const diff = Math.max(this._deadline - Date.now(), 0);
      return formatTimeStr(diff, format);
    }
  }
  Countdown.defaults = { format: "HH:mm:ss", interval: 3000 };
  Component.register(Countdown);
  class FlexItem extends Component {
    constructor(props, ...mixins) {
      const defaults = { grow: false, shrink: false, isBody: false };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["grow", "shrink", "isBody"];
      const { span } = this.props;
      if (span) {
        this.setProps({ styles: { col: span } });
      }
    }
  }
  Component.register(FlexItem);
  class Flex extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Flex.defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = [
        "direction",
        "wrap",
        "align",
        "justify",
        "gap",
        "gutter",
        "fills",
        "fit",
      ];
      const { rows, cols, itemDefaults } = this.props;
      let { direction } = this.props;
      let children = [];
      if (Array.isArray(rows) && rows.length) {
        direction = "column";
        children = rows;
      } else if (Array.isArray(cols) && cols.length) {
        direction = "row";
        children = cols;
      }
      children = children.map((item) => {
        if (isPlainObject(item)) {
          return Component.extendProps(
            itemDefaults,
            this._normalizeItem(item),
            { component: FlexItem }
          );
        }
        return item;
      });
      this.setProps({
        direction: direction,
        children: children,
        childDefaults: { component: FlexItem },
      });
    } // todo:  maybe move some logic to FlexItem
    _normalizeItem(item) {
      let itemProps = {};
      const { component, tag, rows, cols, children: subChildren } = item;
      if (
        (component && component !== FlexItem && component !== "FlexItem") ||
        (component !== FlexItem && component !== "FlexItem" && isString(tag))
      ) {
        itemProps.children = item;
      } else if (Array.isArray(rows) || Array.isArray(cols)) {
        item.component = Flex;
        itemProps.children = item;
      } else if (isPlainObject(subChildren)) {
        const { rows: subRows, cols: subCols } = subChildren;
        if (Array.isArray(subRows) || Array.isArray(subCols)) {
          subChildren.component = Flex;
        }
        itemProps = item;
        itemProps.children = subChildren;
      } else {
        itemProps = item;
      }
      return itemProps;
    }
  }
  Flex.defaults = {
    rows: null,
    cols: null,
    direction: "column",
    wrap: false,
    align: null,
    justify: null,
    gap: null,
    gutter: null,
    fills: false,
    inline: false,
    fit: false,
  };
  Component.register(Flex);
  var SelectListItemMixin = {
    _config: function () {
      const { onSelect, onUnselect } = this.props;
      this.setProps({
        selectable: {
          byClick: true,
          canRevert: this.list.selectControl.props.multiple === true,
        },
        hidden: !!this.props.isExtra,
        onSelect: () => {
          const { selectControl } = this.list;
          const selectProps = selectControl.props;
          const selectedOption = { option: this.props };
          Object.keys(this.wrapper.props.children).forEach((item) => {
            selectedOption[item] = this.props[item];
          });
          selectControl.placeholder && selectControl.placeholder.hide();
          if (selectProps.multiple === false) {
            selectControl.selectedSingle.update(selectedOption);
            selectControl.props.animate && selectControl.popup.animateHide();
            !selectControl.props.animate && selectControl.popup.hide();
          } else {
            selectControl.selectedMultiple.update({
              items: [
                ...selectControl.selectedMultiple.props.items,
                {
                  [selectControl.props.optionFields.text]: selectedOption.text,
                  [selectControl.props.optionFields.value]:
                    selectedOption.value,
                },
              ],
            });
          }
          if (selectProps.virtual === true) {
            this.list.virtual.selectedItems.push(selectedOption);
          }
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          const { selectControl } = this.list;
          const selectProps = selectControl.props;
          if (selectProps.multiple === true) {
            selectControl.selectedMultiple.update({
              items: selectControl.selectedMultiple.props.items.filter((n) => {
                return n[selectControl.props.optionFields.value] !== this.key;
              }),
            });
          }
          if (selectProps.virtual === true) {
            const { selectedItems } = this.list.virtual;
            selectedItems.splice(
              selectedItems.findIndex(
                (item) =>
                  item[selectControl.props.optionFields.value] ===
                  this.props[selectControl.props.optionFields.value]
              ),
              1
            );
          }
          this._callHandler(onUnselect);
        },
      });
    },
  };
  class SelectList extends List {
    constructor(props, ...mixins) {
      const defaults = { gutter: "x-md", cols: 1 };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.selectControl = this.parent.parent.parent.selectControl;
      this.selectControl.optionList = this;
    }
    _config() {
      const {
        showSearch,
        optionDefaults,
        value,
        multiple,
        filterOption,
        optionFields,
        options,
      } = this.selectControl.props;
      const { text } = this.props;
      const { checked, checkedOption } = this.selectControl;
      let filterStr = checked ? checkedOption && checkedOption.text : text; // null或undefined处理
      filterStr = filterStr || "";
      this.selectControl._normalizeInternalOptions(options);
      const filterOptions =
        showSearch &&
        filterOption(filterStr, this.selectControl.internalOptions);
      const items = showSearch
        ? filterOptions
        : this.selectControl.internalOptions; // value唯一值校验提示
      this._wranOptionsValue(items, optionFields.value);
      this.setProps({
        items,
        itemDefaults: n$1(null, optionDefaults, null, [SelectListItemMixin]),
        itemSelectable: {
          multiple: multiple,
          byClick: true,
          scrollIntoView: true,
        },
        selectedItems: showSearch
          ? checkedOption && checkedOption.value
          : value,
        onItemSelectionChange: () => {
          this.selectControl._onValueChange();
        },
      });
      super._config();
    }
    _wranOptionsValue(options, value) {
      const map = new Map();
      for (let index = 0; index < options.length; index++) {
        const opt = options[index];
        if (map.get(opt[value])) {
          console.warn(
            `Warning: Encountered two children with the same key, \`${opt[value]}\`.`
          );
          return false;
        }
        map.set(opt[value], true);
      }
    }
  }
  class SelectPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.selectControl = this.opener.field;
    }
    _config() {
      const { searchable, options: originOptions } = this.selectControl.props;
      this.setProps({
        attrs: {
          style: { width: `${this.selectControl.control.offsetWidth()}px` },
        },
        children: {
          component: Layout,
          header: searchable
            ? {
                children: {
                  component: Textbox,
                  placeholder: searchable.placeholder,
                  _created: (inst) => {
                    this.selectControl.searchBox = inst;
                  },
                  onValueChange: ({ newValue }) => {
                    this.timer && clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                      const loading = new nomui.Loading({
                        container: this.selectControl.optionList.parent,
                      });
                      const result = searchable.filter({
                        inputValue: newValue,
                        options: originOptions,
                      });
                      if (result && result.then) {
                        return result
                          .then((value) => {
                            this.selectControl.props.options = value;
                            this.selectControl.optionList.update();
                            loading && loading.remove();
                          })
                          .catch(() => {
                            loading && loading.remove();
                          });
                      }
                      loading && loading.remove();
                      this.selectControl.props.options = result;
                      result && this.selectControl.optionList.update();
                    }, 300);
                  },
                },
              }
            : null,
          body: {
            children: { component: SelectList, virtual: this.props.virtual },
          },
        },
      });
      super._config();
    }
    _rendered() {
      this.removeClass("nom-layer-animate-show");
      this.selectControl.props.animate && this.animateInit();
    }
    animateInit() {
      if (!this.element) return false;
      if (this.element.getAttribute("offset-y") !== "0") {
        this.addClass("nom-select-animate-bottom-show");
      } else {
        this.addClass("nom-select-animate-top-show");
      }
    }
    _show() {
      super._show();
      this.removeClass("nom-layer-animate-show");
      const { searchBox, props } = this.selectControl;
      if (searchBox) {
        searchBox.focus(); // 上一次搜索无数据，则清除搜索条件
        if (!props.options || !props.options.length) {
          searchBox.clear();
        }
      }
    }
    animateHide() {
      if (!this.element) return false;
      let animateName;
      if (this.element.getAttribute("offset-y") !== "0") {
        animateName = "nom-select-animate-bottom-hide";
      } else {
        animateName = "nom-select-animate-top-hide";
      }
      this.addClass(animateName);
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
        this.removeClass(animateName);
      }, 160);
    }
  }
  Component.register(SelectPopup);
  class Select extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Select.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.internalOptions = [];
      this.multipleItems = [];
      if (this.props.extraOptions) {
        const extraOptions = this.props.extraOptions.map((n) => {
          return Object.assign({}, n, { isExtra: true });
        });
        this.props.options = [...this.props.options, ...extraOptions];
      }
    }
    _config() {
      const that = this;
      const {
        multiple,
        showArrow,
        disabled,
        showSearch,
        allowClear,
        options,
      } = this.props;
      const children = [];
      let placeholder = this.props.placeholder;
      if (!placeholder && (!Array.isArray(options) || !options.length)) {
        this.props.value = "";
        placeholder = "暂无数据";
      }
      this._normalizeInternalOptions(options);
      this._normalizeSearchable();
      this.setProps({
        selectedSingle: {
          _created() {
            that.selectedSingle = this;
          },
        },
        selectedMultiple: {
          itemDefaults: {
            key() {
              return this.props[that.props.optionFields.value];
            },
            _config: function () {
              this.setProps({
                tag: "span",
                onClick: (args) => {
                  args.event.stopPropagation();
                },
                hidden: this.props.isOverTag,
                classes: {
                  "nom-select-overtag-trigger": !!this.props.overList,
                },
                attrs: { title: this.props[that.props.optionFields.text] },
                popup: this.props.overList
                  ? {
                      triggerAction: "hover",
                      align: "top center",
                      classes: { "nom-select-extra-tags": true },
                      children: {
                        component: "List",
                        gutter: "sm",
                        itemDefaults: {
                          key() {
                            return this.props[that.props.optionFields.value];
                          },
                          _config: function () {
                            this.setProps({
                              tag: "span",
                              onClick: (args) => {
                                args.event.stopPropagation();
                              },
                              attrs: {
                                title: this.props[that.props.optionFields.text],
                              },
                              children: [
                                {
                                  tag: "span",
                                  classes: { "nom-select-item-content": true },
                                  attrs: {
                                    style: {
                                      maxWidth: `${that.props.maxTagWidth}px`,
                                    },
                                  },
                                  children: this.props[
                                    that.props.optionFields.text
                                  ],
                                },
                              ],
                            });
                          },
                        },
                        items: this.props.overList,
                      },
                    }
                  : null,
                children: [
                  {
                    tag: "span",
                    classes: { "nom-select-item-content": true },
                    attrs: {
                      style: { maxWidth: `${that.props.maxTagWidth}px` },
                    },
                    children: this.props.overList
                      ? `+${this.props.overNum}`
                      : this.props[that.props.optionFields.text],
                  },
                  !this.props.overList && {
                    component: Icon,
                    type: "close",
                    classes: { "nom-select-item-remove": true },
                    attrs: { style: { cursor: "pointer" } },
                    onClick: (args) => {
                      const key = args.sender.parent.key;
                      that.selectedMultiple.removeItem(key);
                      const oldValue = that.getValue();
                      oldValue &&
                        oldValue.length &&
                        that.setValue(
                          oldValue.filter((n) => {
                            return n !== key;
                          })
                        );
                      that.optionList && that.optionList.unselectItem(key);
                      args.event && args.event.stopPropagation();
                    },
                  },
                ],
              });
            },
          },
          _config() {
            this.setProps({
              items: this.props.items.map((n) => {
                n.overList = null;
                n.overNum = null;
                return n;
              }),
            });
            if (
              that.props.maxTagCount > 0 &&
              this.props.items.length > that.props.maxTagCount
            ) {
              const before = this.props.items.slice(
                0,
                that.props.maxTagCount + 1
              );
              const after = this.props.items.slice(
                that.props.maxTagCount + 1,
                this.props.items.length
              );
              const overTags = this.props.items.slice(
                that.props.maxTagCount,
                this.props.items.length
              );
              const num = this.props.items.length - that.props.maxTagCount;
              const newItems = [
                ...before.map((n, i) => {
                  n.isOverTag = false;
                  if (i === before.length - 1) {
                    n.overList = overTags;
                    n.overNum = num;
                  } else {
                    n.overList = null;
                    n.overNum = null;
                  }
                  return n;
                }),
                ...after.map((n) => {
                  n.isOverTag = true;
                  return n;
                }),
              ];
              this.setProps({ items: newItems });
            }
          },
          _created() {
            that.selectedMultiple = this;
          },
        },
      });
      if (multiple) {
        children.push(this.props.selectedMultiple);
      } else if (showSearch) {
        const { onSearch } = this.props;
        that.checked = true;
        that.checkedOption = that._getOption(this.props.value);
        const searchInput = {
          tag: "input",
          classes: { "nom-select-search-input": true },
          _created() {
            that.selectedSingle = this;
          },
          _rendered() {
            this.element.value = this.props.text || "";
          },
          attrs: {
            autocomplete: "false",
            oninput() {
              that.checked = false;
              that.updateSearchPopup(this.value);
              isFunction(onSearch) && onSearch(this.value);
            },
            onchange() {
              if (that.checked) return;
              this.value = that.checkedOption ? that.checkedOption.text : null;
              that.updateSearchPopup(this.value);
            },
          },
        };
        children.push(searchInput);
      } else {
        children.push(this.props.selectedSingle);
      }
      if (isString(placeholder)) {
        children.push({
          _created() {
            that.placeholder = this;
          },
          classes: { "nom-select-placeholder": true },
          children: placeholder,
        });
      }
      if (showArrow) {
        children.push({
          component: Icon,
          type: "down",
          classes: { "nom-select-arrow": true },
        });
      }
      if (allowClear) {
        children.push({
          component: Icon,
          type: "times",
          classes: {
            "nom-select-clear": true,
            "nom-field-clear-handler": true,
          },
          hidden: true,
          ref: (c) => {
            this.clearIcon = c;
          },
          onClick: (args) => {
            this.setValue(null);
            this.props.allowClear && this.clearIcon.hide();
            this.placeholder && this.placeholder.show();
            args.event && args.event.stopPropagation();
          },
        });
      }
      this.setProps({
        control: { disabled: disabled, children: children },
        onClick: () => {
          showSearch && this.selectedSingle.element.focus();
        },
      });
      super._config();
    }
    _rendered() {
      const { value, virtual, popupContainer } = this.props;
      let container;
      if (popupContainer === "self") {
        this.element.style.position = "relative";
        container = this.element;
      } else if (
        Object.prototype.toString.call(popupContainer) === "[object Function]"
      ) {
        const ref = popupContainer();
        ref.element.style.position = "relative";
        container = ref.element;
      }
      this.popup = new SelectPopup({
        reference: container,
        trigger: this.control,
        virtual,
        onShow: () => {
          this.optionList.update({ selectedItems: this.getValue() });
          this.optionList.scrollToSelected();
        },
      });
      this._directSetValue(value);
      this._valueChange({ newValue: this.currentValue });
    }
    _directSetValue(value, options) {
      const { valueOptions } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      const { multiple } = this.props;
      if (multiple === true) {
        const selValueOptions = this._getOptions(value);
        if (Array.isArray(selValueOptions) && selValueOptions.length) {
          this.multipleItems = selValueOptions;
          this.selectedMultiple.update({ items: this.multipleItems });
          this.currentValue = selValueOptions.map(function (item) {
            return item.value;
          });
        } else {
          this.selectedMultiple.update({ items: [] });
          this.currentValue = null;
        }
      } else {
        if (options.asArray === true) {
          value = Array.isArray(value) ? value[0] : value;
        }
        const selValueOption = this._getOption(value);
        if (selValueOption !== null) {
          this.selectedSingle.update(selValueOption);
          this.currentValue = selValueOption.value;
          if (options.asArray === true) {
            this.currentValue = [selValueOption.value];
          }
        } else {
          this.selectedSingle.element.innerText = value;
          this.currentValue = value;
        }
      } // 解决select组件searchable模式，点清除、重置无法清掉原输入数据
      if (this.searchBox && this.searchBox.props && value === null) {
        this.searchBox._setValue("");
      }
    }
    selectOption(option) {
      this.optionList.selectItem(option);
    }
    selectOptions(options) {
      this.optionList.selectItems(options);
    }
    getMultipleValue(obj) {
      return ((target) =>
        Object.keys(target).map((key) => target[key]))(obj.itemRefs);
    }
    getSelectedOption() {
      if (!this.optionList || !this.optionList.props) {
        return null;
      }
      if (this.props.multiple === false) {
        return this.optionList.getSelectedItem();
      } // console.log('旧---', this.optionList.getSelectedItems())
      // console.log('新---', this.getMultipleValue(this.optionList.selectControl.selectedMultiple))
      return this.getMultipleValue(
        this.optionList.selectControl.selectedMultiple
      ); // return this.optionList.getSelectedItems()
    }
    _getOptionsByValue(value) {
      if (this.props.multiple === false) {
        return this._getOption(value);
      }
      return this._getOptions(value);
    }
    _getValueText(options, value) {
      const { valueOptions } = this.props;
      const that = this;
      options = extend$1({ asArray: false }, valueOptions, options);
      if (!this.optionList) {
        value = this.currentValue;
      }
      const selected =
        value !== undefined
          ? this._getOptionsByValue(value)
          : this.getSelectedOption();
      if (selected !== null) {
        if (Array.isArray(selected) && selected.length > 0) {
          const vals = selected.map(function (item) {
            return item.props
              ? item.props[that.props.optionFields.text]
              : item.text;
          });
          return vals;
        }
        if (options.asArray === true && !Array.isArray(selected)) {
          return selected.props
            ? [selected.props[that.props.optionFields.text]]
            : [selected.text];
        }
        if (!Array.isArray(selected)) {
          return selected.props
            ? selected.props[that.props.optionFields.text]
            : selected.text;
        }
      }
      return null;
    }
    _getValue(options) {
      const { valueOptions, showSearch } = this.props;
      const that = this;
      options = extend$1({ asArray: false }, valueOptions, options);
      if (!this.optionList || !this.optionList.props) {
        return this.currentValue;
      }
      if (showSearch) {
        const selectedSearch = this.getSelectedOption();
        if (selectedSearch && selectedSearch.props)
          return selectedSearch.props.value;
        return this.currentValue;
      }
      const selected = this.getSelectedOption();
      if (selected !== null) {
        if (Array.isArray(selected) && selected.length > 0) {
          const vals = selected.map(function (item) {
            return item.props[that.props.optionFields.value];
          });
          return vals;
        }
        if (options.asArray === true && !Array.isArray(selected)) {
          return [selected.props[that.props.optionFields.value]];
        }
        if (!Array.isArray(selected)) {
          return selected.props[that.props.optionFields.value];
        }
      }
      return null;
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      if (this.props.showSearch) {
        const selectedOption = this.internalOptions.find(
          (e) => e.value === value
        );
        if (selectedOption) {
          this.checked = true;
          this.checkedOption = selectedOption;
          this.updateSearchPopup(selectedOption && selectedOption.text);
          this._directSetValue(value);
        }
      } else {
        // 每次都会更新popup弹窗里面的 list的数据
        // 但如果当前实例 update过了, optionList会被销毁
        if (this.optionList && this.optionList.props) {
          this.optionList.unselectAllItems({ triggerSelectionChange: false });
          this.selectOptions(value, {
            triggerSelectionChange: options.triggerChange,
          });
        }
        this._directSetValue(value);
        if (options.triggerChange) {
          this._onValueChange();
        } // if (this.optionList) {
        //   this.optionList.unselectAllItems({ triggerSelectionChange: false })
        //   this.selectOptions(value, { triggerSelectionChange: options.triggerChange })
        // } else {
        //   this._directSetValue(value)
        //   if (options.triggerChange) {
        //     this._onValueChange()
        //   }
        // }
      }
    }
    _getOption(value) {
      let option = null;
      const options = this.internalOptions;
      if (Array.isArray(value)) {
        value = value[0];
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === value) {
          option = options[i];
          break;
        }
      }
      return option;
    }
    _getOptions(value) {
      let retOptions = null;
      const options = this.internalOptions;
      if (Array.isArray(value)) {
        retOptions = [];
        for (let i = 0; i < options.length; i++) {
          if (value.indexOf(options[i].value) !== -1) {
            retOptions.push(options[i]);
          }
        }
      }
      return retOptions;
    }
    _valueChange(changed) {
      if (!this.props) return; // 有值则展示 clearIcon, 无值隐藏
      changed.newValue
        ? this.props.allowClear && this.clearIcon.show()
        : this.props.allowClear && this.clearIcon.hide();
      if (this.placeholder) {
        // 多选时为空数组 || 单选时在options中无数据
        if (
          (Array.isArray(changed.newValue) && changed.newValue.length === 0) ||
          !this._getOption(changed.newValue)
        ) {
          this.placeholder.show();
        } else {
          this.placeholder.hide();
        }
      } // 此处有问题，暂时添加判断屏蔽报错，问题原因是调用了已销毁组件的方法导致this是个空对象
      if (this.props && this.props.showSearch) {
        const selectedOption = this.internalOptions.find(
          (e) => e.value === changed.newValue
        );
        this.checkedOption = selectedOption;
        this.updateSearchPopup(selectedOption && selectedOption.text);
        this.checked = true;
      }
    }
    _disable() {
      if (this.firstRender === false) {
        this.control.disable();
      }
    }
    _enable() {
      if (this.firstRender === false) {
        this.control.enable();
      }
    }
    appendOption() {}
    updateSearchPopup(text) {
      if (this.optionList) this.optionList.update({ text });
    }
    handleFilter(text, options) {
      const { filterOption } = this.props;
      return filterOption(text, options);
    }
    _normalizeSearchable() {
      const { searchable } = this.props;
      if (searchable) {
        this.setProps({
          searchable: Component.extendProps(
            {
              placeholder: null,
              filter: ({ inputValue, options }) => {
                if (!inputValue) return options;
                const reg = new RegExp(inputValue, "i");
                const filteredOptions = [];
                options.forEach((option) => {
                  if (reg.test(option.text)) {
                    filteredOptions.push(option);
                  }
                });
                return filteredOptions;
              },
            },
            searchable
          ),
        });
      }
    }
    _normalizeInternalOptions(options) {
      if (!Array.isArray(options) || !options.length) {
        this.internalOptions = [];
        return;
      } // if (this.props.extraOptions) {
      //   this.initHiddenOptions = this.props.extraOptions.map((n) => {
      //     return n[this.props.optionFields.value]
      //   })
      //   options = [...options, ...this.props.extraOptions]
      // }
      const { optionFields } = this.props;
      this.internalOptions = clone$1(options);
      this.handleOptions(this.internalOptions, optionFields);
    }
    handleOptions(options, optionFields) {
      const { text: textField, value: valueField } = optionFields;
      if (!Array.isArray(options)) return [];
      const internalOptions = options;
      for (let i = 0; i < internalOptions.length; i++) {
        const item = internalOptions[i];
        item.text = item[textField];
        item.value = item[valueField];
      }
    }
  }
  Select.defaults = {
    options: [],
    optionFields: { text: "text", value: "value" },
    optionDefaults: {
      key() {
        return this.props.value;
      },
      _config: function () {
        this.setProps({ children: this.props.text });
      },
    },
    selectedSingle: {
      classes: { "nom-select-single": true },
      _config: function () {
        this.setProps({ children: this.props.text });
      },
    },
    selectedMultiple: {
      classes: { "nom-select-multiple": true },
      component: List,
      itemDefaults: {},
      itemSelectable: { scrollIntoView: true },
      gutter: "sm",
    },
    extraOptions: [],
    multiple: false,
    showArrow: true,
    maxTagWidth: 120,
    maxTagCount: -1,
    minItemsForSearch: 20,
    filterOption: (text, options) =>
      options.filter((o) => o.text.indexOf(text) >= 0),
    virtual: false,
    allowClear: true,
    popupContainer: "body",
  };
  Component.register(Select);
  class DateTimePickerList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        gutter: "xs",
        cols: 1,
        min: "00",
        max: "59",
        scrollIntoView: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.scroller = this.parent;
      this.timeWrapper = this.parent.parent.parent.parent.parent;
      this.pickerControl = this.timeWrapper.pickerControl;
      this.pickerControl.timeList[this.props.type] = this;
    }
    _config() {
      let items = [];
      const that = this;
      const {
        currentDateBeforeMin,
        currentDateAfterMax,
      } = this.pickerControl.datePicker;
      const { _isHourOverRange, _isMinuteOverRange } = this.pickerControl;
      const { type } = this.props;
      this.props.min = this.pickerControl.timeRange[type][0];
      this.props.max = this.pickerControl.timeRange[type][1];
      if (type === "hour") {
        items = this.pickerControl.getHour();
      } else if (type === "minute") {
        items = this.pickerControl.getMinute();
      } else if (type === "second") {
        items = this.pickerControl.getSecond();
      }
      this.setProps({
        styles: { padding: "3px" },
        items: items,
        itemSelectable: {
          multiple: false,
          byClick: true,
          scrollIntoView: { block: "start", scrollMode: "always" },
        },
        attrs: { style: { position: "relative" } },
        itemDefaults: {
          _config: function () {
            const key = this.props.key;
            const disabledOverRange =
              (type !== "hour" && _isHourOverRange) ||
              (type === "second" && _isMinuteOverRange); // 日期部分已经超出 min 或 max
            this.setProps({
              disabled:
                key < that.props.min ||
                key > that.props.max ||
                currentDateBeforeMin ||
                currentDateAfterMax ||
                disabledOverRange,
            });
          },
        },
        onItemSelectionChange: () => {
          this.onChange();
        },
      });
      super._config();
    }
    onChange() {
      this.setTime();
    }
    setTime() {
      const key = this.getSelectedItem().key || "00";
      this.pickerControl.setTime({ type: this.props.type, value: key });
    }
    resetTime() {
      if (this.pickerControl.defaultValue) {
        const t = this.pickerControl.defaultValue.split(":");
        if (this.props.type === "hour") {
          this.selectItem(t[0], { triggerSelectionChange: false });
        } else if (this.props.type === "minute") {
          this.selectItem(t[1], { triggerSelectionChange: false });
        } else {
          this.selectItem(t[2], { triggerSelectionChange: false });
        }
      } else {
        this.unselectAllItems();
      }
    }
    refresh() {
      this.update();
    }
  }
  class DateTimePickerWrapper extends Component {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.pickerControl = this.parent.parent.parent;
    }
    _config() {
      this.setProps({
        children: {
          component: "Rows",
          gutter: null,
          items: [
            {
              component: "Cols",
              gutter: null,
              classes: { "timepicker-group": true },
              fills: true,
              align: "stretch",
              children: [
                {
                  hidden: !this.pickerControl.props.format.includes("HH"),
                  children: { component: DateTimePickerList, type: "hour" },
                },
                {
                  hidden: !this.pickerControl.props.format.includes("mm"),
                  children: { component: DateTimePickerList, type: "minute" },
                },
                {
                  hidden: !this.pickerControl.props.format.includes("ss"),
                  children: { component: DateTimePickerList, type: "second" },
                },
              ],
            },
          ],
        },
      });
    }
  }
  Component.register(DateTimePickerWrapper);
  class TimePickerPanel extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        allowClear: true,
        value: null,
        format: "HH:mm:ss",
        hourStep: 0,
        minuteStep: 0,
        secondStep: 0,
        readOnly: true,
        placeholder: null,
        showNow: true,
        onValueChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.datePicker = this.parent.parent.parent.opener.parent.parent;
      this.datePicker.timePicker = this;
      this.timeList = [];
      this.empty = !this.props.value;
      this.minTime = { hour: "00", minute: "00", second: "00" };
      this.maxTime = { hour: "23", minute: "59", second: "59" };
      this.time = { hour: "00", minute: "00", second: "00" };
      if (this.props.value) {
        const t = this.props.value.split(":");
        this.time.hour = t[0] || "00";
        this.time.minute = t[1] || "00";
        this.time.second = t[2] || "00";
      }
      this.defaultTime = this.time;
    }
    _config() {
      const that = this;
      this.defaultValue = this.defaultValue || this.props.value;
      if (
        this.datePicker.props.showTime &&
        this.datePicker.props.showTime !== true
      ) {
        this.props = Object.assign(
          {},
          this.props,
          this.datePicker.props.showTime
        );
      }
      this._getMinTime();
      this._getMaxTime();
      this.timeRange = {
        hour: [this.minTime.hour, this.maxTime.hour],
        minute: ["00", "59"],
        second: ["00", "59"],
      };
      this._calcTimeRangeByTime();
      this.setProps({
        children: {
          component: "Rows",
          gutter: "xs",
          items: [
            {
              classes: { "time-display": true },
              ref: (c) => {
                that.timeText = c;
              },
            },
            { component: DateTimePickerWrapper },
          ],
        },
      });
      super._config();
    } // 计算timeRange的min值
    _getMinTime() {
      const { startTime, minTime = "00:00:00" } = this.props; // 比较 datePicker.minDate的time 和 showTime.minTime
      const _tempStartTime = new Date(`2020/01/01 ${startTime}`);
      const _tempMinTime = new Date(`2020/01/01 ${minTime}`); // startTime 不为默认 && startTime 比 minTime后面
      // 取后者
      const isStartTimeAfterMinTime =
        startTime !== "00:00:00" && _tempStartTime.isAfter(_tempMinTime);
      const time = isStartTimeAfterMinTime ? _tempStartTime : _tempMinTime;
      this.minTime = {
        hour: this.getDoubleDigit(time.getHours()),
        minute: this.getDoubleDigit(time.getMinutes()),
        second: this.getDoubleDigit(time.getSeconds()),
      };
    } // 计算timeRange的max值
    _getMaxTime() {
      const { endTime, maxTime = "23:59:59" } = this.props; // 比较 datePicker.minDate的time 和 showTime.maxTime
      const _tempEndTime = new Date(`2020/01/01 ${endTime}`);
      const _tempMaxTime = new Date(`2020/01/01 ${maxTime}`); // endTime 不为默认 && endTime 比 maxTime后面
      // 取更前面的时间节点
      const isEndTimeBeforeMaxTime =
        endTime !== "23:59:59" && _tempEndTime.isBefore(_tempMaxTime);
      const time = isEndTimeBeforeMaxTime ? _tempEndTime : _tempMaxTime;
      this.maxTime = {
        hour: this.getDoubleDigit(time.getHours()),
        minute: this.getDoubleDigit(time.getMinutes()),
        second: this.getDoubleDigit(time.getSeconds()),
      };
    }
    getHour() {
      const hour = [];
      if (this.props.hourStep) {
        hour.push({ key: "00", children: "00" });
        for (let i = 0; i < 24; i++) {
          if ((i + 1) % this.props.hourStep === 0 && i !== 23) {
            hour.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return hour;
      }
      for (let i = 0; i < 24; i++) {
        hour.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return hour;
    }
    getMinute() {
      const minute = [];
      if (this.props.minuteStep) {
        minute.push({ key: "00", children: "00" });
        for (let i = 0; i < 60; i++) {
          if ((i + 1) % this.props.minuteStep === 0 && i !== 59) {
            minute.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return minute;
      }
      for (let i = 0; i < 60; i++) {
        minute.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return minute;
    }
    getSecond() {
      const second = [];
      if (this.props.secondStep) {
        second.push({ key: "00", children: "00" });
        for (let i = 0; i < 60; i++) {
          if ((i + 1) % this.props.secondStep === 0 && i !== 59) {
            second.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return second;
      }
      for (let i = 0; i < 60; i++) {
        second.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return second;
    }
    setValue(c) {
      this.timeText &&
        this.timeText.props &&
        this.timeText.update({ children: c });
      this.defaultValue = c;
      const t = c.split(":");
      this.time.hour = t[0] || "00";
      this.time.minute = t[1] || "00";
      this.time.second = t[2] || "00";
      this.resetList();
      this.props.onValueChange &&
        this._callHandler(this.props.onValueChange(this.time));
    }
    setTime(data) {
      this.time[data.type] = data.value;
      if (this.time.hour <= this.minTime.hour) {
        this.time.hour = this.minTime.hour;
        if (this.time.minute <= this.minTime.minute) {
          this.time.minute = this.minTime.minute;
        }
        if (this.time.minute <= this.minTime.minute) {
          if (this.time.second <= this.minTime.second) {
            this.time.second = this.minTime.second;
          }
        }
      }
      if (this.time.hour >= this.maxTime.hour) {
        this.time.hour = this.maxTime.hour;
        if (this.time.minute >= this.maxTime.minute) {
          this.time.minute = this.maxTime.minute;
        }
        if (this.time.minute >= this.maxTime.minute) {
          if (this.time.second >= this.maxTime.second) {
            this.time.second = this.maxTime.second;
          }
        }
      }
      this.checkTimeRange();
      const result = new Date(
        "2000",
        "01",
        "01",
        this.time.hour,
        this.time.minute,
        this.time.second
      ).format(this.props.format);
      this.setValue(result);
      this.defaultValue = result;
    }
    resetList() {
      const that = this;
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].resetTime();
      });
    }
    clearTime() {
      const that = this;
      this.props.value = null;
      this.defaultValue = null;
      this.defaultTime = this.time = { hour: "00", minute: "00", second: "00" };
      this.timeText.update({ children: "" });
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].resetTime();
      });
    }
    onShow() {
      this.timeText &&
        this.timeText.props &&
        this.timeText.update({ children: this.defaultValue });
      this.resetList();
    }
    setNow() {
      const c = new Date().format("HH:mm:ss");
      const t = c.split(":");
      this.time.hour = t[0];
      this.time.minute = t[1];
      this.time.second = t[2];
      this.checkTimeRange();
      this.setValue(c.format(this.props.format));
      this.defaultValue = c;
      this.empty = false;
      this.resetList();
    }
    handleChange() {
      this.props.onChange && this._callHandler(this.props.onChange);
    }
    getDoubleDigit(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return `${num}`;
    }
    checkTimeRange() {
      const that = this;
      const beforeHourFlag = this._isHourOverRange;
      const beforeMinuteFlag = this._isMinuteOverRange;
      const { hour, minute, second } = this.timeRange;
      const beforeTimeRangeStr = `${hour}-${minute}-${second}`;
      this._calcTimeRangeByTime();
      this.empty = false; // 比较 timeRange 是否发生变化
      const { hour: aHour, minute: aMinute, second: aSecond } = this.timeRange;
      const afterTimeRangeStr = `${aHour}-${aMinute}-${aSecond}`;
      let needRefreshList = [];
      if (afterTimeRangeStr !== beforeTimeRangeStr) {
        needRefreshList = ["hour", "minute", "second"];
      } else if (beforeHourFlag !== this._isHourOverRange) {
        needRefreshList = ["minute", "second"];
      } else if (beforeMinuteFlag !== this._isMinuteOverRange) {
        needRefreshList = ["second"];
      } // 更新timeList的数据
      needRefreshList.forEach(function (key) {
        that.timeList[key].refresh();
      });
    } // 根据当前选择 time 更新计算得到真正的 timeRange
    // hour值在 min~max之间时, minute和second的range = ['00', '59']
    _calcTimeRangeByTime() {
      const { time, timeRange, minTime, maxTime } = this;
      this._isHourOverRange =
        time.hour < minTime.hour || time.hour > maxTime.hour;
      this._isMinuteOverRange =
        (time.hour === minTime.hour && time.minute < minTime.minute) ||
        (time.hour === maxTime.hour && time.minute > maxTime.minute);
      if (time.hour <= minTime.hour) {
        timeRange.hour = [minTime.hour, maxTime.hour];
        timeRange.minute = [minTime.minute, "59"];
        if (time.minute <= minTime.minute) {
          timeRange.second = [minTime.second, "59"];
        } else {
          timeRange.second = ["00", "59"];
        }
      } else if (time.hour >= maxTime.hour) {
        timeRange.minute = ["00", maxTime.minute];
        if (time.minute >= maxTime.minute) {
          timeRange.second = ["00", maxTime.second];
        } else {
          timeRange.second = ["00", "59"];
        }
      } else {
        timeRange.minute = timeRange.second = ["00", "59"];
      }
    }
  }
  Component.register(TimePickerPanel);
  class DatePicker extends Textbox {
    constructor(props, ...mixins) {
      super(Component.extendProps(DatePicker.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.dateInfo = null;
      this.todayItem = null;
      this.startTime = null;
      this.originValue = null;
    }
    _config() {
      const that = this;
      if (isValidDate$1(this.props.value)) {
        this.props.value = formatDate(this.props.value, this.props.format);
      }
      const { disabled, extraTools } = this.props;
      let extra = [];
      if (isFunction(extraTools)) {
        extra = Array.isArray(extraTools(this))
          ? extraTools(this)
          : [extraTools(this)];
      } else if (Array.isArray(extraTools)) {
        extra = extraTools;
      }
      this.getCurrentDate();
      const minTime =
        this.props.showTime && this.props.minDate
          ? new Date(this.props.minDate).format(
              this.props.showTime.format || "HH:mm:ss"
            )
          : "00:00:00";
      const maxTime =
        this.props.showTime && this.props.maxDate
          ? new Date(this.props.maxDate).format(
              this.props.showTime.format || "HH:mm:ss"
            )
          : "23:59:59";
      this.startTime = minTime;
      this.endTime = maxTime;
      this.minDateDay = this.props.minDate
        ? new Date(this.props.minDate).format("yyyy-MM-dd")
        : null;
      this.maxDateDay = this.props.maxDate
        ? new Date(this.props.maxDate).format("yyyy-MM-dd")
        : null;
      this.showNow = true;
      if (
        (this.props.minDate &&
          new Date().isBefore(new Date(`${this.props.minDate} ${minTime}`))) ||
        (this.props.maxDate &&
          new Date().isAfter(new Date(`${this.props.maxDate} ${maxTime}`)))
      ) {
        this.showNow = false;
      }
      this.setProps({
        leftIcon: "calendar",
        clearProps: {
          component: "Icon",
          type: "times",
          classes: { "nom-field-clear-handler": true },
          hidden: !this.props.allowClear || this.props.disabled,
          onClick: (args) => {
            this.clearTime();
            args.event && args.event.stopPropagation();
          },
        },
        control: {
          disabled: disabled,
          popup: {
            _created: function () {
              that.popup = this;
            },
            styles: { padding: "1" },
            onShow: () => {
              this.getCurrentDate();
              this.reActiveList(); // that.props.showTime && that.timePicker.onShow()
            },
            onHide: () => {
              that.onPopupHide();
            },
            animate: this.props.animate,
            classes: {
              "nom-date-picker-popup": true,
              "nom-date-picker-with-time": this.props.showTime,
            },
            triggerAction: "click",
            children: [
              {
                component: Flex,
                cols: [
                  {
                    attrs: { style: { width: "260px" } },
                    rows: [
                      {
                        justify: "between",
                        fills: true,
                        cols: [
                          {
                            component: Select,
                            allowClear: false,
                            value: that.year,
                            _created: function () {
                              that.years = this;
                            },
                            animate: false,
                            options: this._getYears(),
                            onValueChange: (changed) => {
                              that.year = changed.newValue;
                              that.days.update({
                                items: that._getDays(that.year, that.month),
                              });
                            },
                          },
                          {
                            component: Select,
                            allowClear: false,
                            value: that.month,
                            _created: function () {
                              that.months = this;
                            },
                            options: this._getMonths(),
                            onValueChange: function (changed) {
                              that.month = changed.newValue;
                              that.days.update({
                                items: that._getDays(that.year, that.month),
                              });
                            },
                          },
                        ],
                      },
                      {
                        cols: ["日", "一", "二", "三", "四", "五", "六"],
                        fills: true,
                        gutter: null,
                        classes: { "nom-datepicker-panel-header": true },
                      },
                      {
                        component: List,
                        _created: function () {
                          that.days = this;
                        },
                        gutter: "sm",
                        cols: 7, // selectedItems: that.props.value
                        //   ? `${that.year}-${that.month}-${that.day}`
                        //   : null,
                        itemSelectable: {
                          byClick: true,
                          multiple: false,
                          scrollIntoView: true,
                        },
                        items: this._getDays(that.year, that.month),
                        itemDefaults: {
                          key: function () {
                            this.props.date = new Date(
                              this.props.year,
                              this.props.month - 1,
                              this.props.day
                            ).format("yyyy-M-d");
                            return this.props.date;
                          },
                          styles: {
                            padding: "d375",
                            hover: { color: "darken" },
                            selected: { color: "primary" },
                          },
                          attrs: { role: "button" },
                          _config: function () {
                            const textStyles = ["center"];
                            const date = that._getDateString(
                              this.props.year,
                              this.props.month,
                              this.props.day
                            );
                            const isToday =
                              date === new Date().format("yyyy-MM-dd");
                            let isDisabled = false;
                            if (that.props.disabledTime) {
                              isDisabled = that.props.disabledTime(date);
                            }
                            if (
                              that.props.minDate &&
                              new Date(date).isBefore(new Date(that.minDateDay))
                            ) {
                              isDisabled = true;
                            }
                            if (
                              that.props.maxDate &&
                              new Date(date).isAfter(new Date(that.maxDateDay))
                            ) {
                              isDisabled = true;
                            }
                            if (
                              this.props.lastMonth === true ||
                              this.props.nextMonth === true
                            ) {
                              textStyles.push("muted");
                            }
                            if (isToday) {
                              that.todayItem = this;
                              this.setProps({
                                styles: { border: ["1px", "primary"] },
                              });
                            }
                            this.setProps({
                              styles: { text: textStyles },
                              children: this.props.day,
                              disabled: !!isDisabled,
                            });
                          },
                          onClick: function (args) {
                            const {
                              year: selYear,
                              month: selMonth,
                              day: selDay,
                            } = args.sender.props;
                            that.dateInfo = Object.assign({}, that.dateInfo, {
                              year: selYear,
                              month: selMonth - 1,
                              day: selDay,
                            });
                            if (that.props.showTime) {
                              that._updateTimePickerStartEndTime(
                                args.sender.props.day
                              );
                            }
                            that.updateValue();
                            that.timePicker && that.timePicker.onShow();
                            !that.props.showTime && that.popup.hide();
                          },
                        },
                      },
                    ],
                  },
                  this.props.showTime && {
                    component: TimePickerPanel,
                    classes: { "nom-datepicker-time-panel": true },
                    onValueChange: (data) => {
                      this.handleTimeChange(data);
                    }, // 初始化传入 startTime, endTime
                    startTime: this.currentDateBeforeMin ? minTime : "00:00:00",
                    endTime: this.currentDateAfterMax ? maxTime : "23:59:59",
                    value:
                      this.props.value &&
                      new Date(this.props.value.replace(/-/g, "/")).format(
                        this.props.showTime.format || "HH:mm:ss"
                      ),
                  },
                ],
              },
              (this.props.showNow || extra.length) && {
                component: Flex,
                attrs: { style: { padding: "5px 0" } },
                cols: [
                  ...extra,
                  {
                    component: "Button",
                    size: "small",
                    text: this.props.showTime ? "此刻" : "今天",
                    disabled: !this.showNow,
                    renderIf: this.props.showNow,
                    onClick: () => {
                      if (that.props.showTime) {
                        that._updateTimePickerStartEndTime(
                          new Date().getDate()
                        );
                      }
                      this.setNow();
                    },
                  },
                ],
              },
            ],
          },
        },
      });
      super._config();
    } // 更新 timePicker的禁用情况(内部个根据 startTime endTime计算)
    _updateTimePickerStartEndTime(day) {
      this.currentDateBeforeMin = false;
      this.currentDateAfterMax = false;
      const minDay = parseInt(new Date(this.minDateDay).format("d"), 10);
      const maxDay = parseInt(new Date(this.maxDateDay).format("d"), 10);
      const timeProps = { startTime: "00:00:00", endTime: "23:59:59" };
      if (minDay === day) {
        timeProps.startTime = this.startTime;
      }
      if (maxDay === day) {
        timeProps.endTime = this.endTime;
      }
      this.timePicker.update(timeProps);
    }
    _getYears() {
      const years = [];
      const thisYear = new Date().getFullYear();
      for (
        let i = thisYear + this.props.yearRange[1];
        i > thisYear - this.props.yearRange[0];
        i--
      ) {
        years.push({ text: i, value: i });
      }
      return years;
    }
    _getMonths() {
      const months = [];
      for (let i = 1; i < 13; i++) {
        months.push({ text: i, value: i });
      }
      return months;
    }
    _getDays(year, month) {
      const firstDay = this._getFirstDayOfMonth(year, month);
      const currentDayCount = this._getDaysInMonth(year, month);
      let lastDayCount = this._getDaysInMonth(year, month - 1);
      const daysList = [];
      let i = 0;
      let lastMonthYear = year;
      let lastMonthMonth = month - 1;
      let nextMonthYear = year;
      let nextMonthMonth = month + 1;
      if (month === 1) {
        lastDayCount = this._getDaysInMonth(year - 1, 12);
        lastMonthYear = year - 1;
        lastMonthMonth = 11;
      }
      if (firstDay > 0) {
        for (i = lastDayCount - firstDay + 1; i < lastDayCount + 1; i++) {
          daysList.push({
            day: i,
            year: lastMonthYear,
            month: lastMonthMonth,
            lastMonth: true,
          });
        }
      }
      for (i = 1; i < currentDayCount + 1; i++) {
        daysList.push({ day: i, year: year, month: month });
      }
      const nextMonthCount = 7 - (daysList.length % 7 || 7);
      if (month === 12) {
        nextMonthYear++;
        nextMonthMonth = 1;
      }
      for (i = 1; i < nextMonthCount + 1; i++) {
        daysList.push({
          day: i,
          year: nextMonthYear,
          month: nextMonthMonth,
          nextMonth: true,
        });
      }
      return daysList;
    }
    /* 求XX年XX月1号是星期几 */ _getFirstDayOfMonth(year, month) {
      return new Date(year, month - 1, 1).getDay();
    }
    /* 求XX年XX月有多少天 */ _getDaysInMonth(year, month) {
      return (
        32 - this._daylightSavingAdjust(new Date(year, month - 1, 32)).getDate()
      );
    }
    _getDoubleDigit(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    }
    _getDateString(year, month, day) {
      return `${year}-${this._getDoubleDigit(month)}-${this._getDoubleDigit(day)}`;
    }
    _daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    }
    _disable() {
      super._disable();
      if (this.firstRender === false) {
        this.control.disable();
      }
    }
    _enable() {
      super._enable();
      if (this.firstRender === false) {
        this.control.enable();
      }
    }
    reActiveList() {
      this.years.setValue(this.year);
      this.months.setValue(this.month);
      this.props.value &&
        this.days.update({
          selectedItems: `${this.year}-${this.month}-${this.day}`,
        });
    }
    getCurrentDate() {
      let currentDate = new Date();
      if (this.props.value !== null) {
        currentDate = Date.parseString(this.props.value, this.props.format);
      } else if (this.minDateDay) {
        currentDate = new Date(this.minDateDay);
      } // let currentDate =
      //   this.props.value !== null ? Date.parseString(this.props.value, this.props.format) : new Date()
      if (!currentDate) {
        currentDate = new Date();
      }
      this.year = currentDate.getFullYear();
      this.month = currentDate.getMonth() + 1;
      this.day = currentDate.getDate(); // 注: 此处的比较 如果传入的时间格式不一致, 会有比较错误的情况
      //     因为 new Date(dateString) 并不可靠, `yyyy-MM-dd`得到的时间会是格林威治时间
      this.currentDateBeforeMin =
        this.minDateDay && currentDate.isBefore(new Date(this.minDateDay));
      this.currentDateAfterMax =
        this.maxDateDay && currentDate.isAfter(new Date(this.maxDateDay));
      this.dateInfo = { year: this.year, month: this.month - 1, day: this.day };
      if (this.props.value && this.props.showTime && this.timePicker) {
        this.timePicker.setValue(
          new Date(this.props.value.replace(/-/g, "/")).format(
            this.props.showTime.format || "HH:mm:ss"
          )
        );
      } else if (!this.props.value && this.props.showTime && this.timePicker) {
        this.timePicker.clearTime();
      }
    }
    handleTimeChange(param) {
      if (
        !this.days.getSelectedItem() &&
        this.todayItem &&
        this.todayItem.props
      ) {
        this.days.selectItem(this.todayItem);
      }
      this.dateInfo = Object.assign({}, this.dateInfo, {
        hour: param.hour,
        minute: param.minute,
        second: param.second,
      });
      this.updateValue();
    }
    clearTime() {
      this.props.value = null;
      this.setValue(null);
      this.dateInfo = null;
      this.days && this.days.props && this.days.unselectAllItems();
      if (this.props.showTime && this.timePicker && this.timePicker.props) {
        this.timePicker.clearTime();
      }
    }
    setNow() {
      this.setValue(new Date().format(this.props.format));
      this.popup.hide();
    }
    close() {
      this.popup.hide();
    }
    updateValue() {
      const date = new Date(
        this.dateInfo.year || new Date().format("yyyy"),
        isNumeric(this.dateInfo.month)
          ? this.dateInfo.month
          : new Date().format("MM") - 1,
        this.dateInfo.day || new Date().format("dd"),
        this.dateInfo.hour || "00",
        this.dateInfo.minute || "00",
        this.dateInfo.second || "00"
      );
      this.setValue(date.format(this.props.format));
    }
    showPopup() {
      this.popup.show();
    }
    onPopupHide() {
      this.getValue() &&
        this.props.onChange &&
        this._callHandler(this.props.onChange);
    }
    _onBlur() {
      if (
        this.getValue() &&
        !Date.isValid(this.getValue(), this.props.format)
      ) {
        this.clearTime();
      }
      super._onBlur();
    }
  }
  DatePicker.defaults = {
    format: "yyyy-MM-dd",
    disabledTime: null,
    minDate: null,
    maxDate: null,
    yearRange: [90, 20],
    showTime: false,
    allowClear: true,
    onChange: null,
    showNow: true,
    readonly: false,
    extraTools: null,
  };
  Component.register(DatePicker);
  class Group extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Group.defaults, props), ...mixins);
    }
    _config() {
      this._addPropStyle("inline", "striped", "line", "nowrap");
      const { fields, fieldDefaults, value } = this.props;
      const children = [];
      for (let i = 0; i < fields.length; i++) {
        let fieldProps = extend$1(true, {}, fields[i]);
        if (isPlainObject(value)) {
          if (fieldProps.flatValue === true) {
            fieldProps.value = value;
          } else if (
            fieldProps.value === null ||
            fieldProps.value === undefined
          ) {
            fieldProps.value = value[fieldProps.name];
          }
        }
        fieldProps.__group = this;
        fieldProps = Component.extendProps(fieldDefaults, fieldProps);
        children.push(fieldProps);
      }
      this.setProps({ control: { children: children } });
      super._config();
    }
    getValue(options) {
      const { valueOptions } = this.props;
      options = extend$1(
        { ignoreDisabled: true, ignoreHidden: true, merge: false },
        valueOptions,
        options
      );
      const value = {};
      const len = this.fields.length;
      for (let i = 0; i < len; i++) {
        const field = this.fields[i];
        if (field.getValue && this._needHandleValue(field, options)) {
          const fieldValue = field.getValue(options);
          if (field.props.flatValue === true) {
            extend$1(value, fieldValue);
          } else {
            value[field.name] = fieldValue;
          }
        }
      }
      if (options.merge === true) {
        return extend$1(this.currentValue, value);
      }
      return value;
    }
    setValue(value, options) {
      options = extend$1(
        { ignoreDisabled: false, ignoreHidden: false },
        options
      );
      const len = this.fields.length;
      for (let i = 0; i < len; i++) {
        const field = this.fields[i];
        if (field.setValue && this._needHandleValue(field, options)) {
          let fieldValue = value;
          if (field.props.flatValue === false) {
            if (isPlainObject(value)) {
              fieldValue = value[field.name];
            }
          }
          if (fieldValue === undefined) {
            fieldValue = null;
          }
          field.setValue(fieldValue);
        }
      }
    }
    validate(options) {
      const invalids = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i],
          { disabled, hidden } = field.props;
        if (!(disabled || hidden) && field.validate) {
          const valResult = field.validate(options);
          if (valResult !== true) {
            invalids.push(field);
          }
        }
      }
      if (invalids.length > 0) {
        invalids[0].focus();
      }
      return invalids.length === 0;
    }
    getField(fieldName) {
      if (typeof fieldName === "string") {
        // Handle nested keys, e.g., "foo.bar" "foo[1].bar" "foo[key].bar"
        const parts = fieldName.split(".");
        let curField = this;
        if (parts.length) {
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            curField = curField._getSubField(part);
            if (!curField) {
              break;
            }
          }
        }
        return curField;
      }
    }
    appendField(fieldProps) {
      const { fieldDefaults } = this.props;
      this.props.fields.push(fieldProps);
      return this.control.appendChild(
        Component.extendProps(fieldDefaults, fieldProps, { __group: this })
      );
    }
    _getSubField(fieldName) {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.name === fieldName) {
          return field;
        }
      }
      return null;
    }
    _clear() {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.setValue) {
          field.setValue(null);
        }
      }
    }
    _needHandleValue(field, options) {
      const { disabled, hidden } = field.props;
      const { ignoreFields = [] } = options;
      if (field._autoName) {
        return false;
      }
      if (options.ignoreDisabled && disabled === true) {
        return false;
      }
      if (options.ignoreHidden && hidden === true) {
        return false;
      }
      if (ignoreFields.includes(field.name)) {
        return false;
      }
      return true;
    }
  }
  Group.defaults = { fields: [], fieldDefaults: { component: Field } };
  Component.register(Group);
  class DateRangePicker extends Group {
    constructor(props, ...mixins) {
      super(Component.extendProps(DateRangePicker.defaults, props), ...mixins);
    }
    _created() {
      super._created();
    }
    _config() {
      const that = this;
      const {
        format,
        allowClear,
        minDate,
        maxDate,
        yearRange,
        showTime,
        required,
        requiredMessage,
        rules,
        startPickerProps,
        endPickerProps,
        disabled,
        animate,
      } = this.props;
      this.setProps({
        inline: true,
        fields: [
          Object.assign(
            {
              component: "DatePicker",
              name: that.props.fieldName.start,
              ref: (c) => {
                that.startPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              animate,
              format,
              allowClear,
              minDate,
              maxDate,
              yearRange,
              showTime,
              required,
              requiredMessage,
              rules,
              disabled,
            },
            startPickerProps
          ),
          { component: "StaticText", value: "-" },
          Object.assign(
            {
              component: "DatePicker",
              name: that.props.fieldName.end,
              ref: (c) => {
                that.endPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              animate,
              format,
              allowClear,
              minDate,
              maxDate,
              yearRange,
              showTime,
              required,
              requiredMessage,
              rules,
              disabled,
            },
            endPickerProps
          ),
        ],
      });
      super._config();
    }
    handleChange() {
      this.props.onChange && this._callHandler(this.props.onChange);
    }
    _getValueText() {
      const val = this.getValue();
      return `${
        val[this.props.fieldName.start]
      } - ${val[this.props.fieldName.end]}`;
    }
    checkRange(type) {
      const that = this;
      const active =
        type === this.props.fieldName.start ? this.startPicker : this.endPicker;
      const opposite =
        type === this.props.fieldName.start ? this.endPicker : this.startPicker;
      if (active.getValue()) {
        if (active.name === that.props.fieldName.start) {
          opposite.update({ minDate: active.getValue() });
          if (opposite.getValue() && opposite.getValue() < active.getValue()) {
            opposite.clearTime();
            opposite.focus();
            opposite.showPopup();
          } else if (!opposite.getValue()) {
            opposite.focus();
            that.props.autoPopupEnd && opposite.showPopup();
          }
        } else if (
          opposite.getValue() &&
          opposite.getValue() > active.getValue()
        ) {
          opposite.clearTime();
        }
      }
      if (active.getValue() && opposite.getValue()) {
        that.handleChange();
      }
    }
  }
  DateRangePicker.defaults = {
    format: "yyyy-MM-dd",
    disabledTime: null,
    minDate: null,
    maxDate: null,
    yearRange: [50, 20],
    showTime: false,
    allowClear: true,
    onChange: null,
    fieldName: { start: "start", end: "end" },
    autoPopupEnd: true,
    flatValue: true,
    required: false,
    requiredMessage: null,
    startPickerProps: { placeholder: "开始日期" },
    endPickerProps: { placeholder: "结束日期" },
  };
  Component.register(DateRangePicker);
  class Divider extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Divider.defaults, props), ...mixins);
    }
    _config() {
      // this._propStyleClasses = ['type','orientation','dashed','plain']
      const { orientation, classes, dashed, plain } = this.props;
      let { children = undefined } = this.props;
      const hasChildren = !!children;
      const orientationPrefix =
        orientation.length > 0 ? `-${orientation}` : orientation;
      children = children && {
        tag: "span",
        classes: { "nom-divider-inner-text": true },
        children,
      };
      this.setProps({
        classes: Object.assign(
          {
            [`nom-divider-with-text`]: hasChildren,
            [`nom-divider-with-text${orientationPrefix}`]: hasChildren,
            [`nom-divider-dashed`]: !!dashed,
            [`nom-divider-plain`]: !!plain,
          },
          classes
        ),
        attrs: { role: "separator" },
        children,
      });
    }
  }
  Divider.defaults = {
    type: "horizontal",
    orientation: "center", // dashed:true,
    // plan:true,
    // children:
  };
  Component.register(Divider); // 正整数
  // 不支持cm mm in pt pc等单位
  const CSS_UNIT = /^(-)?\d+(.)?\d+[px|rem|em|vw|vh|%]*$/i;
  const VALID_INTEGER = /^[-]?\d+$/;
  const settles = ["top", "right", "bottom", "left"];
  function isValidZIndex(index) {
    return VALID_INTEGER.test(index);
  } // /**
  //  *
  //  * @param container dom容器
  //  * @param direction 方位(top,right,bottom,left)
  //  */
  // export function getRelativePosition(container) {
  //   if (container instanceof HTMLElement) {
  //     const { top, left, width, height } = container.getBoundingClientRect()
  //     return { width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` }
  //   }
  //   return null
  // }
  class Drawer extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Drawer.defaults, props), ...mixins);
    }
    _config() {
      const drawerRef = this;
      const {
        zIndex,
        settle,
        maskClosable,
        showMasker,
        width,
        height,
        animate,
      } = this.props;
      const _settle = settles.includes(settle) ? settle : "right";
      let _style = {};
      if (isValidZIndex(zIndex)) {
        _style = Object.assign({}, _style, { "z-index": zIndex });
      }
      const children = []; // mask
      if (showMasker) {
        children.push({ classes: { "nom-drawer-mask": true } });
      } // content
      children.push({
        classes: { "nom-drawer-content-wrapper": true },
        attrs: {
          style: ["left", "right"].includes(_settle)
            ? Object.assign({}, drawerRef._handleSize(width, "width"))
            : Object.assign({}, drawerRef._handleSize(height, "height")),
        },
        children: drawerRef._handleContent(),
      });
      const _container = this._getContainerElement();
      if (_container !== document.body) {
        // this.referenceElement = _container instanceof Component ? _container.element : _container
        this.referenceElement = _container;
        _container.style.position = "relative";
        _style = Object.assign({}, _style, { position: "absolute" });
      }
      this.setProps({
        classes: {
          // [`nom-drawer-${_settle}`]: true,
          "nom-drawer-top": _settle === "top",
          "nom-drawer-right": _settle === "right",
          "nom-drawer-bottom": _settle === "bottom",
          "nom-drawer-left": _settle === "left",
          [`nom-drawer-animate-${_settle}-show`]: animate,
          "nom-drawer-mask-animate-show": animate,
        },
        onClick: () => {
          maskClosable && drawerRef.close(drawerRef);
        },
        attrs: { style: _style },
        children,
      });
    }
    _handleContent() {
      const drawerRef = this;
      const {
        closable,
        closeIcon,
        title,
        content,
        footer,
        okText,
        cancelText,
        onOk,
        onCancel,
      } = this.props;
      const children = [];
      if (title) {
        children.push({
          classes: { "nom-drawer-header": true },
          children: closable
            ? [
                title,
                Component.extendProps(Component.normalizeIconProps(closeIcon), {
                  classes: { "nom-drawer-close-icon": true },
                  onClick: () => {
                    drawerRef.close();
                  },
                }),
              ]
            : title,
        });
      } else if (closable) {
        children.push({
          classes: { "nom-drawer-no-header": true },
          children: Component.extendProps(
            Component.normalizeIconProps(closeIcon),
            {
              classes: { "nom-drawer-close-icon": true },
              onClick: () => {
                drawerRef.close();
              },
            }
          ),
        });
      }
      children.push({
        classes: { "nom-drawer-content": true },
        _config() {
          if (content) {
            this.setProps({ children: content });
          }
        },
      });
      if (footer !== null) {
        children.push({
          classes: { "nom-drawer-footer": true },
          _config() {
            if (footer) {
              this.setProps({ children: footer });
            } else {
              this.setProps({
                children: {
                  component: "Cols",
                  justify: "center",
                  items: [
                    {
                      component: "Button",
                      type: "primary",
                      text: okText,
                      onClick: () => {
                        drawerRef._callHandler(onOk);
                      },
                    },
                    {
                      component: "Button",
                      text: cancelText,
                      onClick: () => {
                        drawerRef._callHandler(onCancel);
                      },
                    },
                  ],
                },
              });
            }
          },
        });
      }
      return [
        {
          classes: { "nom-drawer-body": true },
          onClick: ({ event }) => {
            event.stopPropagation();
          },
          children,
        },
      ];
    }
    _getRelativePosition(container) {
      if (container instanceof HTMLElement) {
        return container.getBoundingClientRect();
      }
    }
    _getContainerElement() {
      let _containerElement = document.body;
      const { getContainer } = this.props;
      if (isFunction(getContainer)) {
        const c = getContainer();
        if (c instanceof Component && c.element) {
          _containerElement = c.element;
        } else if (c instanceof HTMLElement) {
          _containerElement = c;
        }
      }
      return _containerElement;
    }
    _getContainerRect(e) {
      if (e instanceof HTMLElement) {
        return e.getBoundingClientRect();
      }
      return null;
    }
    close() {
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.remove();
    }
    animateHide() {
      if (!this.element) return false;
      this.addClass(`nom-drawer-animate-${this.props.settle}-hide`);
      setTimeout(() => {
        if (!this.element) return false;
        this.addClass("nom-drawer-mask-animate-hide");
        setTimeout(() => {
          if (!this.element) return false;
          this.remove();
        }, 90);
      }, 90);
    }
    _handleSize(size, unit) {
      if (!CSS_UNIT.test(size)) return {};
      return isNumeric(size) ? { [unit]: `${size}px` } : { [unit]: size };
    }
    _animation(visible, x) {
      if (visible) return {};
      return x
        ? { transform: "translateX(100%)" }
        : { transform: "translateY(100%)" };
    }
  }
  Drawer.defaults = {
    closable: true,
    closeIcon: "close",
    maskClosable: true,
    showMasker: true,
    settle: "right",
    okText: "确 定",
    cancelText: "取 消",
    onOk: (e) => {
      e.sender.close();
    },
    onCancel: (e) => {
      e.sender.close();
    },
  };
  Component.register(Drawer);
  class Dropdown extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Dropdown.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.onClick = this.props.onClick;
    }
    _config() {
      const that = this;
      const { items, triggerAction, split, text, type, size } = this.props;
      const children = [
        split && {
          component: "Button",
          text: text,
          type: type,
          size: size,
          inline: type === "link",
          onClick: (args) => {
            that._callHandler(that.onClick);
            args.event.stopPropagation();
          },
        },
        {
          component: "Button",
          text: split ? null : that.props.text,
          rightIcon: that.props.rightIcon,
          type: type,
          size: size,
          inline: type === "link",
          popup: {
            triggerAction: triggerAction,
            classes: { "nom-dropdown-popup": true },
            ref: (c) => {
              that.popup = c;
            },
            _rendered() {
              that.props.animate && that.animateInit(this);
            },
            children: {
              component: "Menu",
              itemDefaults: { size: size },
              items: items,
            },
            onClick: (args) => {
              if (that.props.animate) {
                that.animateHide(args);
              } else {
                args.sender.hide();
              }
            },
          },
        },
      ];
      this.setProps({
        onClick: null,
        children: children,
        classes: { "nom-split-button": this.props.split },
      });
      super._config();
    }
    animateInit(that) {
      if (!that.element) return false;
      if (that.element.getAttribute("offset-y") !== "0") {
        this.props.animateName = "bottom";
      } else {
        this.props.animateName = "top";
      }
      that.addClass([`nom-dropdown-animate-${this.props.animateName}-show`]);
    }
    animateHide(that) {
      if (!this.popup.element) return false;
      this.popup.removeClass([
        `nom-dropdown-animate-${this.props.animateName}-show`,
      ]);
      if (this.popup.element.getAttribute("offset-y") !== "0") {
        this.props.animateName = "bottom";
      } else {
        this.props.animateName = "top";
      }
      this.popup.addClass([
        `nom-dropdown-animate-${this.props.animateName}-hide`,
      ]);
      setTimeout(() => {
        that.sender.hide();
        if (!this.popup.element) return false;
        this.popup.removeClass([
          `nom-dropdown-animate-${this.props.animateName}-hide`,
        ]);
        this.popup.addClass([
          `nom-dropdown-animate-${this.props.animateName}-show`,
        ]);
      }, 160);
    }
  }
  Dropdown.defaults = {
    animateName: "top",
    tag: "span",
    triggerAction: "click",
    rightIcon: "down",
    split: false,
    onClick: null,
    items: [],
    size: null,
  };
  Component.register(Dropdown);
  class Ellipsis extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Ellipsis.defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        children: {
          classes: {
            "nom-ellipsis-inner": true,
            "nom-ellipsis-nowrap":
              this.props.line === null || this.props.line === 1,
          },
          attrs: {
            title:
              this.props.showTitle &&
              (isString(this.props.text) || isNumeric(this.props.text))
                ? this.props.text
                : null,
            style: { "-webkit-line-clamp": this.props.line },
          },
          children: this.props.text ? this.props.text : this.props.children,
        },
      });
    }
  }
  Ellipsis.defaults = { text: null, showTitle: true, line: null };
  Component.register(Ellipsis);
  class Form extends Group {
    constructor(props, ...mixins) {
      super(Component.extendProps(Form.defaults, props), ...mixins);
    }
  }
  Form.defaults = { labelAlign: "top" };
  Component.register(Form);
  class Spinner extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Spinner.defaults, props), ...mixins);
    }
    _config() {
      const { spinning } = this.props;
      this.setProps({ classes: { "p-type-border": spinning } });
    }
  }
  Spinner.defaults = { spinning: true };
  Component.register(Spinner);
  class Loading extends Layer {
    constructor(props, ...mixins) {
      const defaults = { container: document.body };
      super(
        Component.extendProps(defaults, Loading.defaults, props),
        ...mixins
      );
    }
    _create() {
      this.setProps({
        reference: this.props.container,
        alignTo: this.getElement(this.props.container),
      });
    }
    _config() {
      this.setProps({
        children: { component: Spinner },
        onClick({ event }) {
          event.stopPropagation();
        },
      });
      this.referenceElement.classList.add("nom-loading-container");
      super._config();
    }
    _remove() {
      this.referenceElement &&
        this.referenceElement.classList.remove("nom-loading-container");
      super._remove();
    }
  }
  Loading.defaults = { align: "center", backdrop: true, collision: "none" };
  Component.register(Loading);
  class Td extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "td", data: null, column: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tr = this.parent;
      this.table = this.tr.table;
      this.col = this.table.colRefs[this.props.column.field];
      this.col.tdRefs[this.key] = this;
    }
    _config() {
      const { level, isLeaf } = this.tr.props;
      const { column } = this.props;
      const { treeConfig } = this.table.props;
      let spanProps = null;
      let children = this.props.data === 0 ? "0" : this.props.data;
      if (isFunction(column.cellRender)) {
        children = column.cellRender({
          cell: this,
          row: this.tr,
          talbe: this.table,
          cellData: this.props.data,
          rowData: this.tr.props.data,
          index: this.tr.props.index,
        });
      } else if (isFunction(this.props.column.render)) {
        children = this.props.column.render.call(
          this,
          this.props.data,
          this.props.record,
          this.tr.props.index
        );
      }
      if (isFunction(column.cellMerge)) {
        spanProps = column.cellMerge({
          cell: this,
          row: this.tr,
          talbe: this.table,
          cellData: this.props.data,
          rowData: this.tr.props.data,
          index: this.tr.props.index,
        });
      }
      const isTreeNodeColumn =
        treeConfig.treeNodeColumn && column.field === treeConfig.treeNodeColumn;
      if (isTreeNodeColumn) {
        this.setProps({
          expanded:
            treeConfig.initExpandLevel === -1 ||
            treeConfig.initExpandLevel > level,
          expandable: {
            byClick: true,
            target: () => {
              return this.tr.props.childTrs;
            },
            indicator: {
              component: "Icon",
              classes: { "nom-tr-expand-indicator": true },
              expandable: {
                expandedProps: { type: "sort-down" },
                collapsedProps: { type: "sort-right" },
              },
            },
          },
        });
        if (isPlainObject(treeConfig.indicator)) {
          this.setProps({ expandable: { indicator: treeConfig.indicator } });
        }
        if (isLeaf) {
          this.setProps({
            expandable: {
              indicator: { attrs: { style: { visibility: "hidden" } } },
            },
          });
        }
        children = [
          {
            tag: "span",
            attrs: {
              style: { paddingLeft: `${level * treeConfig.indentSize}px` },
            },
          },
          this.getExpandableIndicatorProps(),
          { tag: "span", children: children },
        ];
      }
      const colSpan =
        spanProps &&
        spanProps.colSpan !== null &&
        spanProps.colSpan !== undefined
          ? spanProps.colSpan
          : this.props.column.colSpan;
      const rowSpan =
        spanProps &&
        spanProps.rowSpan !== null &&
        spanProps.rowSpan !== undefined
          ? spanProps.rowSpan
          : this.props.column.rowSpan;
      if (rowSpan > 1) {
        this.table.hasRowGroup = true;
      }
      const isEllipsis =
        ((this.table.props.ellipsis === "both" ||
          this.table.props.ellipsis === "body") &&
          this.props.column.ellipsis !== false) ||
        this.props.column.ellipsis === true; // 用span包一层，为了伪元素的展示
      if (isEllipsis && !column.autoWidth) {
        children = {
          tag: "span",
          classes: { "nom-table-cell-content": true },
          children,
        };
      }
      const showTitle =
        (((this.table.hasGrid && this.table.grid.props.showTitle) ||
          this.table.props.showTitle) &&
          this.props.column.showTitle !== false) ||
        this.props.column.showTitle === true;
      const columnAlign = this.table.hasGrid
        ? this.table.grid.props.columnAlign
        : "left";
      this.setProps({
        children: children,
        attrs: {
          colspan: colSpan,
          rowspan: rowSpan,
          align: this.props.column.align || columnAlign,
          "data-field": this.props.column.field,
          title: this._getAttrTitle(children, isEllipsis, showTitle),
        },
        hidden: colSpan === 0 || rowSpan === 0,
        classes: {
          "nom-td-tree-node": isTreeNodeColumn,
          "nom-td-tree-node-leaf": isTreeNodeColumn && isLeaf,
          "nom-table-fixed-left": this.props.column.fixed === "left",
          "nom-table-fixed-left-last": this.props.column.lastLeft,
          "nom-table-fixed-right": this.props.column.fixed === "right",
          "nom-table-fixed-right-first": this.props.column.firstRight,
          "nom-table-ellipsis": isEllipsis,
        },
      });
    }
    _getAttrTitle(children, isEllipsis, showTitle) {
      // 因为isEllipsis = true时，已经使用span包了一层，所以具体的title为children.children
      if (isEllipsis || showTitle) {
        const _title = isEllipsis ? children.children : children;
        if (isString(_title) || isNumeric(_title)) {
          // 字符#开头 children将以 html格式输出
          return _title[0] === "#" ? null : _title;
        }
      }
      return null;
    }
    _rendered() {
      this.props.column.autoWidth && this._parseTdWidth();
    }
    _parseTdWidth() {
      let tdWidth = 0; // Td的左右padding 10+10, 预留1px的buffer
      let tdPaddingWidth = 21; // 右侧固定第一列, padding-left: 15
      if (this.props.column.firstRight) tdPaddingWidth += 5; // 自定义列设置 && 右侧固定最後一列的th的 padding-right: 40
      const needRightPadding =
        !!this.table.grid.props.columnsCustomizable &&
        this.props.column.lastRight;
      Array.from(this.element.children).forEach((child) => {
        const { marginLeft, marginRight } = getStyle(child);
        tdWidth +=
          child.offsetWidth +
          this._parseCssNumber(marginLeft) +
          this._parseCssNumber(marginRight);
      });
      if (this.table.hasGrid) {
        let maxTdWidth = tdWidth + tdPaddingWidth; // fix: td宽度不够导致 操作 二字换行
        maxTdWidth =
          maxTdWidth < 80 && needRightPadding ? maxTdWidth + 30 : maxTdWidth; // 需要同时更新header,body,footer
        this.table.grid.setAllTableColMaxTdWidth({
          field: this.props.column.field,
          maxTdWidth,
        });
      } else {
        this.col.setMaxTdWidth(this.element.offsetWidth + tdPaddingWidth);
      }
    }
    /**
     * 解析css宽度字符，取出其中的数字部分
     * @param {*} str 12px
     * @returns 12
     */ _parseCssNumber(str) {
      return +str.match(/\d+/g);
    }
    _expand() {
      this.tr._onExpand();
    }
    _collapse() {
      this.tr._onCollapse();
    }
  }
  Component.register(Td);
  class ExpandedTrTd extends Td {
    constructor(props, ...mixins) {
      const defaults = { tag: "td", data: null, column: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tr = this.parent;
      this.table = this.parent.table;
    }
    _config() {}
  }
  Component.register(ExpandedTrTd);
  class ExpandedTr extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "tr", data: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tbody = this.parent;
      this.table = this.tbody.table;
      this.grid = this.table.grid;
    }
    _config() {
      const { rowExpandable, columns } = this.table.grid.props;
      if (rowExpandable) {
        let normalizedRowExpandable = rowExpandable;
        if (!isPlainObject(rowExpandable)) {
          normalizedRowExpandable = {};
        }
        const { render = () => {} } = normalizedRowExpandable;
        this.setProps({
          children: {
            component: ExpandedTrTd,
            attrs: { colspan: columns.length },
            children: render({
              row: this,
              rowData: this.props.data,
              grid: this.grid,
            }),
          },
        });
      }
    }
  }
  Component.register(ExpandedTr); // storage 表格自定义列的key
  const STORAGE_KEY_GRID_COLUMNS = "NOM_STORAGE_KEY_GRID_COLS"; // 表格自定义列宽度的 key
  const STORAGE_KEY_GRID_COLS_WIDTH = "NOM_STORAGE_KEY_GRID_COLS_WIDTH"; // 表格固定列的 key
  const STORAGE_KEY_GRID_COLS_FIXED = "NOM_STORAGE_KEY_GRID_COLS_FIXED"; // 分页器缓存分大小的 key
  const STORAGE_KEY_PAGER_CACHEABLE = "NOM_STORAGE_KEY_PAGER_CACHE";
  class ColGroupCol extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "col", column: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.table = this.parent.table;
      this.table.colRefs[this.props.column.field] = this;
      this.maxTdWidth = 0;
      this.tdRefs = {}; // 这一列所有的 td
    }
    _config() {
      const { width } = this.props.column;
      let widthPx = null;
      if (width) {
        widthPx = `${width}px`;
      }
      if (this.maxTdWidth) {
        widthPx = `${this.maxTdWidth}px`;
      }
      this.setProps({
        attrs: {
          style: { width: widthPx, minWidth: !widthPx ? "60px" : null },
          "data-field": this.props.column.field || null,
        },
      });
    }
    setMaxTdWidth(width) {
      if (this.maxTdWidth < 60 && width < 60) {
        this.maxTdWidth = 0;
      } else {
        this.maxTdWidth = Math.max(this.maxTdWidth, width);
      }
    }
  }
  Component.register(ColGroupCol);
  class ColGroup extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "colgroup" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.table = this.parent;
      this.table.colGroup = this;
      this.columns = this.table.props.columns;
      this.colList = [];
      this.hasColumnGroup = false;
    }
    _config() {
      const children = [];
      if (this.table.grid && this.table.grid.props.rowSortable) {
        children.push({ component: ColGroupCol, column: { width: 30 } });
      }
      if (Array.isArray(this.columns)) {
        this.colList = [];
        children.push(...this.createCols(this.columns));
      }
      this.table.colLength = children.length;
      if (
        this.table.parent.componentType === "GridHeader" &&
        this.table.parent.parent.props.frozenHeader
      ) {
        children.push({
          component: ColGroupCol,
          column: { width: this.table.grid.props.scrollbarWidth },
        });
      }
      this.setProps({ children: children });
    }
    createCols(data) {
      const that = this;
      let index = -1;
      data.forEach(function (column) {
        if (column.children && column.children.length > 0) {
          that.createCols(column.children);
        } else {
          index += 1;
          that.colList.push({
            component: ColGroupCol,
            name: column.field,
            column: column,
            index: index,
          });
        }
      });
      return that.colList;
    }
  }
  Component.register(ColGroup);
  class Tr extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "tr", data: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tbody = this.parent;
      this.table = this.tbody.table; // keyField(id) 不为 undefined, null
      const dataHaskeyField = !isNullish(
        this.props.data[this.table.props.keyField]
      );
      if (this.table.hasGrid && dataHaskeyField) {
        // 重复key报错
        const _rowRefKey = this.props.data[this.table.props.keyField];
        const _rowRef = this.table.grid.rowsRefs[_rowRefKey];
        if (_rowRef) {
          // eslint-disable-next-line no-console
          console.warn(
            `Duplicate keys detected: '${_rowRefKey}'.This may cause an update error.`
          );
        } else {
          this.table.grid.rowsRefs[_rowRefKey] = this;
        }
      }
      if (this.table.parent.componentType === "GridFooter") {
        this.table.grid.footerTrRef = this;
      }
    }
    _config() {
      const columns = this.table.props.columns;
      const { data, level } = this.props;
      this.tdList = [];
      const grid = this.table.grid;
      const children = [];
      let hidden = false;
      if (grid) {
        const { treeConfig } = grid.props;
        hidden =
          treeConfig.initExpandLevel !== -1 &&
          treeConfig.initExpandLevel < level;
      }
      if (grid && grid.props.rowSortable) {
        children.push({
          component: Td,
          classes: { "nom-grid-drag-handler": true },
          data: {
            component: "Icon",
            type: "swap",
            attrs: { style: { cursor: "pointer" } },
          },
        });
      }
      if (Array.isArray(columns)) {
        this.tdList = [];
        children.push(...this.createTds(columns));
      }
      this.setProps({
        key: data[this.table.props.keyField],
        attrs: { level: level },
        hidden: hidden,
        children: children,
      });
    }
    check(checkOptions) {
      const grid = this.table.grid;
      checkOptions = extend$1({ triggerChange: true }, checkOptions);
      this._check();
      this._checkboxRef.setValue(true, false);
      grid.changeCheckAllState();
      if (checkOptions.triggerChange) {
        this._onCheck();
        grid._onRowCheck(this);
      }
    }
    _onCheck() {
      this._callHandler("onCheck");
    }
    _check() {
      this.props.checked = true;
      this.addClass("s-checked");
      const grid = this.table.grid;
      grid.checkedRowRefs[this.key] = this;
    }
    uncheck(uncheckOptions) {
      const grid = this.table.grid;
      uncheckOptions = extend$1({ triggerChange: true }, uncheckOptions);
      this._checkboxRef.setValue(false, false);
      this._uncheck();
      grid.changeCheckAllState();
      if (uncheckOptions.triggerChange) {
        this._onUncheck();
        grid._onRowUncheck(this);
      }
    }
    _uncheck() {
      this.props.checked = false;
      this.removeClass("s-checked");
      const grid = this.table.grid;
      delete grid.checkedRowRefs[this.key];
    }
    _onUncheck() {
      this._callHandler("onUncheck");
    }
    createTds(item) {
      const data = this.props.data;
      const that = this;
      item.forEach(function (column) {
        if (column.children && column.children.length > 0) {
          that.createTds(column.children);
        } else {
          that.tdList.push({
            component: Td,
            name: column.field,
            column: column,
            record: data,
            data: accessProp(data, column.field),
          });
        }
      });
      return that.tdList;
    }
    _onExpand() {
      this.setProps({ classes: { "s-expanded": true } });
      this.addClass("s-expanded");
      this._expanded = true;
    }
    _onCollapse() {
      this.setProps({ classes: { "s-expanded": false } });
      this.removeClass("s-expanded");
      this._expanded = false;
    } // 遍历childTrs 调用show 展示
    _show() {
      if (this.firstRender) {
        return;
      }
      const { childTrs, classes } = this.props; // 注: 当前 tr 状态为expanded: false 时，无需展开childTr
      if (Array.isArray(childTrs) && classes["s-expanded"]) {
        childTrs.forEach((_childTr) => {
          _childTr.show && _childTr.show();
        });
      }
    } // 遍历 childTrs 调用hide
    _hide() {
      if (this.firstRender) {
        return;
      }
      const { childTrs } = this.props;
      if (Array.isArray(childTrs)) {
        childTrs.forEach((_childTr) => {
          _childTr.hide && _childTr.hide();
        });
      }
    }
    _remove() {
      const dataHaskeyField = !isNullish(
        this.props.data[this.table.props.keyField]
      );
      if (this.table.hasGrid && dataHaskeyField) {
        // 重复key报错
        const _rowRefKey = this.props.data[this.table.props.keyField];
        delete this.table.grid.rowsRefs[_rowRefKey];
      }
    }
  }
  Component.register(Tr);
  class Tbody extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "tbody" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.table = this.parent;
      this.table.tbody = this;
      this.props.showEmpty = this.table.props.showEmpty;
    }
    _config() {
      const { data = [], rowDefaults, keyField } = this.table.props;
      const rows = [];
      Array.isArray(data) && this._getRows(data, rows, 0, 0, {});
      let props = {
        children: rows,
        childDefaults: Component.extendProps(
          {
            component: Tr,
            key: function () {
              return this.props.data[keyField];
            },
            _config: function () {
              this.setProps({
                attrs: { "data-key": this.props.data[keyField] },
              });
            },
            onClick: (args) => {
              this.table.selectTr(args.sender);
            },
          },
          rowDefaults
        ),
      };
      if (
        this.props.showEmpty &&
        this.table.props.data &&
        !this.table.props.data.length
      ) {
        props = {
          children: {
            tag: "tr",
            classes: { "nom-tr-empty": true },
            children: {
              tag: "Td",
              attrs: {
                colspan: this.table.colLength,
                style: { "vertical-align": "middle" },
              },
              children: { component: "Empty", description: "暂无内容" },
            },
          },
        };
      }
      this.setProps(props);
    }
    _rendered() {
      const that = this;
      if (this.table.hasGrid && this.table.grid.props.rowSortable) {
        new Sortable(this.element, {
          group: this.key,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          handle: ".nom-grid-drag-handler",
          onEnd: function () {
            // const data = { oldIndex: evt.oldIndex, newIndex: evt.newIndex }
            that.table.grid.handleDrag();
          },
        });
      }
    }
    _getRows(data, rows, index, level, lastRowRef = {}) {
      const curLevel = level;
      const { treeConfig } = this.table.props;
      const { childrenField } = treeConfig; // currRowRef: 当前的tr实例
      // lastRowRef: 自身的上一个level的tr
      // 将自身 data.children 产生的tr实例，使用childTrs存下来
      // 在expand, collapse时即可更灵活
      // 免除了 key相同时导致的 tr实例被覆盖的问题
      data.forEach((item) => {
        let currRowRef = { childTrs: [] };
        rows.push({
          // component: Tr,
          data: item,
          index: index++,
          level: curLevel,
          isLeaf: !(item[childrenField] && item[childrenField].length > 0),
          childTrs: currRowRef.childTrs,
          ref: (c) => {
            currRowRef = c;
            if (!lastRowRef.childTrs) lastRowRef.childTrs = [];
            lastRowRef.childTrs.push(c);
          },
        });
        if (
          treeConfig.treeNodeColumn &&
          item[childrenField] &&
          item[childrenField].length > 0
        ) {
          this._getRows(
            item[childrenField],
            rows,
            index,
            curLevel + 1,
            currRowRef
          );
        }
      });
    }
  }
  Component.register(Tbody);
  class Th extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "th", column: {}, sortDirection: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tr = this.parent;
      this.table = this.tr.table;
      this.resizer = null;
      this.lastDistance = 0;
      this._stickyPos = 0; // 记录当前 th的sticy.style.left(right) 的值
      this.table.thRefs[this.props.column.field] = this;
      this.filterValue = null;
    }
    _config() {
      const that = this;
      this.filterValue = this.table.hasGrid
        ? this.table.grid.filter[this.props.column.field]
        : null;
      const columnAlign = this.table.hasGrid
        ? this.table.grid.props.columnAlign
        : "left";
      let sortIcon = "sort";
      if (this.props.column.sortDirection === "asc") {
        sortIcon = "sort-up";
      }
      if (this.props.column.sortDirection === "desc") {
        sortIcon = "sort-down";
      }
      const isEllipsis =
        (this.table.props.ellipsis === "both" ||
          this.table.props.ellipsis === "header") &&
        this.props.column.ellipsis !== false;
      let titleStr = this.props.column.header || this.props.column.title;
      if (!isString(titleStr)) {
        titleStr = null;
      }
      const headerProps = {
        tag: "span",
        attrs: { title: isEllipsis ? titleStr : null },
        classes: { "nom-table-cell-title": true },
        children: this.props.column.header || this.props.column.title,
      };
      if (that.props.column.sortable && that.props.column.colSpan > 0) {
        headerProps.onClick = function () {
          that.onSortChange();
        };
      }
      this.resizable =
        this.table.hasGrid &&
        this.table.grid.props.columnResizable &&
        this.props.column.resizable !== false &&
        this.props.column.colSpan === 1; // 外部设置不允许拖拽固定列
      if (
        this.table.hasGrid &&
        this.table.grid.props.columnResizable.allowFixedCol === false &&
        this.props.column.fixed
      ) {
        this.resizable = false;
      }
      let children = [
        headerProps,
        this.props.column.sortable &&
          this.props.column.colSpan > 0 && {
            component: "Icon",
            classes: { "nom-table-sort-handler": true },
            type: sortIcon,
            onClick: function () {
              that.onSortChange();
            },
          },
        this.props.column.filter &&
          this.props.column.colSpan > 0 && {
            component: "Icon",
            type: "filter",
            ref: (c) => {
              this.filterBtn = c;
            },
            classes: { "nom-table-filter-handler": true },
            attrs: { style: { cursor: "pointer" } },
            tooltip: this.filterValue
              ? this.table.grid.filterValueText[this.props.column.field]
              : null,
            popup: {
              align: "bottom right",
              ref: (c) => {
                this.filterPopup = c;
              },
              onShow: () => {
                that.filterGroup && that.filterGroup.setValue(that.filterValue);
              },
              children: {
                attrs: {
                  style: {
                    padding: "10px",
                    "min-width": "180px",
                    "max-width": "250px",
                  },
                },
                children: [
                  {
                    component: "Group",
                    ref: (c) => {
                      this.filterGroup = c;
                    },
                    fields: [
                      Object.assign(
                        {},
                        isFunction(that.props.column.filter)
                          ? that.props.column.filter()
                          : that.props.column.filter,
                        { name: that.props.column.field }
                      ),
                    ],
                  },
                  {
                    attrs: {
                      style: { "text-align": "right", padding: "0 10px" },
                    },
                    children: {
                      component: "Cols",
                      justify: "end",
                      gutter: "sm",
                      items: [
                        {
                          component: "Button",
                          text: "确定",
                          size: "small",
                          onClick: () => {
                            this.onFilterChange();
                          },
                        },
                        {
                          component: "Button",
                          text: "重置",
                          size: "small",
                          onClick: () => {
                            this.onFilterReset();
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        that.table.hasGrid &&
          that.table.grid.props.allowFrozenCols &&
          !this.table.hasMultipleThead &&
          !(this.props.column.width && this.props.column.width > 600) &&
          !this.props.column.isChecker &&
          !this.props.column.isTreeMark &&
          this.props.column.fixed !== "right" &&
          this.props.column.frozenable !== false && {
            component: "Icon",
            type: this.props.column.fixed ? "pin-fill" : "pin",
            attrs: { title: this.props.column.fixed ? "取消固定" : "固定列" },
            classes: { "nom-table-pin-handler": true },
            onClick: function () {
              that.table.grid.handlePinClick(that.props.column);
            },
          },
        that.resizable && {
          // component: 'Icon',
          ref: (c) => {
            that.resizer = c;
          }, // type: 'resize-handler',
          classes: { "nom-table-resize-handler": true },
        },
      ]; // 用span包一层，为了伪元素的展示
      if (isEllipsis) {
        children = {
          tag: "span",
          classes: { "nom-table-cell-content": true },
          children: children,
        };
      }
      this.setProps({
        children: children,
        classes: {
          "nom-table-fixed-left": this.props.column.fixed === "left",
          "nom-table-fixed-left-last": this.props.column.lastLeft,
          "nom-table-fixed-right": this.props.column.fixed === "right",
          "nom-table-fixed-right-first": this.props.column.firstRight,
          "nom-table-parent-th": this.props.column.colSpan > 1,
          "nom-table-leaf-th": this.props.column.colSpan === 1,
          "nom-table-sortable": !!(
            this.props.column.sortable && this.props.column.colSpan > 0
          ),
          "nom-table-filter": !!(
            this.props.column.filter && this.props.column.colSpan > 0
          ),
          "nom-table-ellipsis": isEllipsis,
          "nom-table-checker-column": !!this.props.column.isChecker,
        },
        attrs: {
          colspan: this.props.column.colSpan,
          rowspan: this.props.column.rowSpan,
          align: this.props.column.align || columnAlign,
          onmouseenter:
            this.table.grid &&
            function () {
              const mask = that.table.grid.highlightMask;
              mask &&
                !that.mouseDowning &&
                mask.update({
                  attrs: {
                    style: {
                      zIndex: that.props.column.fixed ? 99 : null,
                      left: `${this.offsetLeft}px`,
                      width: `${this.offsetWidth}px`,
                    },
                  },
                });
            },
          onmouseleave: this._hideHighLightMask.bind(this),
        },
      });
    }
    _rendered() {
      this.props.column.filter &&
        this.props.column.colSpan > 0 &&
        this.resetFilterStatus(); // 未设置冻结列则无需定时器
      const fixed = this.props.column.fixed;
      if (fixed) {
        setTimeout(() => {
          this.setStickyPosition();
        }, 0);
      }
      this.resizer && this.handleResize();
    }
    /**
     * 当拖拽固定列后，往后的th width都需要更新 style.left
     * @param {boolean} externalTrigger 是外部触发，
     * @returns
     */ setStickyPosition(externalTrigger = false) {
      // 设置排序时会出发两次_render，则此时设置的第一个定时器中的this.props已被销毁
      if (!this.props) return;
      if (externalTrigger) {
        this._setPositionByExter();
      } else {
        this._setPositionByIndide();
      }
      this._setAllTdsPosition();
    } // 内部更新，通过 自身的 offsetLeft和offsetWidth计算得出
    _setPositionByIndide() {
      const fixed = this.props.column.fixed;
      const el = this.element;
      const parentEl = this.parent.element;
      if (fixed === "left") {
        this._stickyPos = el.offsetLeft;
      } else if (fixed === "right") {
        this._stickyPos = parentEl.offsetWidth - el.offsetLeft - el.offsetWidth;
        if (this.table.hasGrid && this.table.grid.props.frozenHeader) {
          this._stickyPos -= this.table.grid.props.scrollbarWidth;
        }
      }
      this._setStyle({ [fixed]: `${this._stickyPos}px` });
    } // 外部更新，通过 preEl 或 nextEl 的offsetWidth 计算得出
    _setPositionByExter() {
      const fixed = this.props.column.fixed;
      const el = this.element;
      if (fixed === "left") {
        const preEl = el.previousElementSibling;
        this._stickyPos = preEl
          ? preEl.component._stickyPos + preEl.offsetWidth
          : 0;
      } else if (fixed === "right") {
        const nextEl = el.nextElementSibling;
        this._stickyPos = nextEl
          ? nextEl.component._stickyPos + nextEl.offsetWidth
          : 0;
      }
      this._setStyle({ [fixed]: `${this._stickyPos}px` });
    }
    _setAllTdsPosition() {
      const { table, props } = this;
      const { body, footer } = table.grid;
      const { field } = props.column;
      if (body) {
        this._setTdsPosition(body.table.colRefs[field].tdRefs);
      }
      if (footer) {
        this._setTdsPosition(footer.table.colRefs[field].tdRefs);
      }
    }
    _setTdsPosition(tdRefs) {
      const { props, _stickyPos } = this;
      const { fixed } = props.column;
      Object.keys(tdRefs).forEach((key) => {
        tdRefs[key]._setStyle({ [fixed]: `${_stickyPos}px` });
      });
    }
    handleResize() {
      const resizer = this.resizer.element;
      const that = this;
      resizer.onmousedown = function (evt) {
        const startX = evt.clientX;
        that.lastDistance = 0;
        that._hideHighLightMask();
        that.mouseDowning = true;
        document.onmousemove = function (e) {
          const endX = e.clientX;
          const moveLen = endX - startX;
          const distance = moveLen - that.lastDistance;
          that._triggerGridResize(distance);
          that.lastDistance = moveLen;
        };
        document.onmouseup = function () {
          that.mouseDowning = false;
          const grid = that.table.grid;
          if (that.resizable && grid.props.columnResizable.cache) {
            grid.storeColsWidth(that.props.column.field);
          } // 移动列宽，需重新计算渲染 scroller 的宽度
          const header = grid.header;
          if (header.scrollbar) {
            const gRect = grid.element.getBoundingClientRect();
            const size = {
              width: `${gRect.width}px`,
              innerWidth: `${header.element.scrollWidth}px`,
            };
            header.scrollbar.update({ size });
          }
          that._triggerGridResize(0);
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
    _hideHighLightMask() {
      if (!this.table.grid) return;
      const mask = this.table.grid.highlightMask;
      mask && mask.update({ attrs: { style: { width: 0 } } });
    }
    /**
     * @param {number} distance 偏移量
     */ _triggerGridResize(distance) {
      this.table.grid.calcResizeCol(
        { field: this.props.column.field, distance: distance },
        this
      );
    }
    onSortChange() {
      const that = this;
      that.table.grid._setScrollPlace();
      if (that.props.column.sortDirection === "desc") {
        that.update({
          column: Object.assign({}, that.props.column, {
            sortDirection: "asc",
          }),
        });
      } else if (that.props.column.sortDirection === "asc") {
        that.update({
          column: Object.assign({}, that.props.column, { sortDirection: null }),
        });
      } else {
        that.update({
          column: Object.assign({}, that.props.column, {
            sortDirection: "desc",
          }),
        });
      }
      that.table.grid.handleSort(that.props.column);
    }
    resetSort() {
      this.update({ column: { sortDirection: null } });
      this.table.grid && this.table.grid.setSortDirection();
    }
    onFilterChange(isReset) {
      if (this.filterGroup.getValue()[this.props.column.field]) {
        this.filterValue = Object.assign({}, this.filterGroup.getValue());
      }
      this.table.grid.filter = Object.assign(
        {},
        this.table.grid.filter,
        this.filterGroup.getValue()
      );
      this.table.grid.filterValueText[
        this.props.column.field
      ] = this.filterGroup
        .getField(this.props.column.field)
        .getValueText()
        .toString();
      this.filterPopup.hide();
      this.table.grid.handleFilter(isReset);
    }
    onFilterReset() {
      this.filterGroup.reset();
      this.filterValue = null;
      this.onFilterChange(true);
    }
    resetFilterStatus() {
      this.filterBtn.update({
        classes: { "nom-filter-active": !!this.filterValue },
      });
    }
  }
  Component.register(Th);
  class TheadTr extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "tr", columns: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.thead = this.parent;
      this.table = this.thead.table;
    }
    _config() {
      const { columns } = this.props;
      const thArr = [];
      if (this.table.grid && this.table.grid.props.rowSortable) {
        thArr.push({ component: Th });
      }
      const children =
        Array.isArray(columns) &&
        columns.map(function (column) {
          return { component: Th, column: column };
        });
      thArr.push(...children);
      this.setProps({ children: thArr });
    }
  }
  Component.register(TheadTr);
  class Thead extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "thead" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.table = this.parent;
    }
    _config() {
      const columns = this.getColumns();
      const arr = this.mapHeadData(columns);
      this.table.hasMultipleThead = arr.length > 1;
      const children = [];
      for (let i = 0; i < arr.length; i++) {
        children.push({
          component: TheadTr,
          columns: arr[i],
          isRootTr: i === 0,
        });
      }
      this.setProps({ children: children });
    }
    getColumns() {
      return this.table.props.columns;
    }
    mapHeadData(rootColumns) {
      const rows = [];
      function fillRowCells(columns, colIndex, rowIndex) {
        // Init rows
        rows[rowIndex] = rows[rowIndex] || [];
        let currentColIndex = colIndex;
        const colSpans = columns.filter(Boolean).map((column) => {
          const cell = Object.assign({}, column);
          let colSpan = 1;
          const subColumns = column.children;
          if (subColumns && subColumns.length > 0) {
            colSpan = fillRowCells(
              subColumns,
              currentColIndex,
              rowIndex + 1
            ).reduce((total, count) => total + count, 0);
            cell.hasSubColumns = true;
          } // if ('colSpan' in column) {
          //   ;({ colSpan } = column)
          // }
          if ("rowSpan" in column) {
            cell.rowSpan = column.rowSpan;
          }
          cell.colSpan = colSpan; // cell.colEnd = cell.colStart + colSpan - 1
          rows[rowIndex].push(cell);
          currentColIndex += colSpan;
          return colSpan;
        });
        return colSpans;
      } // Generate `rows` cell data
      fillRowCells(rootColumns, 0, 0); // Handle `rowSpan`
      const rowCount = rows.length;
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
        rows[rowIndex].forEach((cell) => {
          if (!("rowSpan" in cell) && !cell.hasSubColumns) {
            cell.rowSpan = rowCount - rowIndex;
          }
        });
      }
      return rows;
    }
  }
  Component.register(Thead);
  class Table extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Table.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.colRefs = [];
      this.thRefs = [];
      this.hasGrid = ["GridHeader", "GridBody", "GridFooter"].some(
        (item) => this.parent.componentType === item
      );
      if (this.hasGrid) {
        this.grid = this.parent.parent;
        this.parent.table = this;
      }
      this.hasRowGroup = false;
      this.hasMultipleThead = false;
    }
    _config() {
      const that = this;
      this._propStyleClasses = ["line", "bordered"];
      const isStriped =
        (this.hasGrid && this.grid.props.striped === true) ||
        this.props.striped === true ||
        false;
      let hasMask = false;
      if (this.hasGrid) {
        this.props.ellipsis = this.grid.props.ellipsis;
        hasMask = this.grid.props.highlightCol;
      }
      this.setProps({
        tag: "table",
        classes: { "nom-table-striped": isStriped },
        children: [
          { component: ColGroup },
          this.props.onlyBody !== true && { component: Thead },
          this.props.onlyHead !== true && { component: Tbody },
          hasMask &&
            this.parent.componentType === "GridBody" && {
              tag: "div",
              classes: { "nom-table-th-hover-mask": true },
              _created() {
                that.grid.highlightMask = this;
              },
            },
        ],
      });
    }
    _rendered() {
      if (this.loadingInst) {
        this.loadingInst.remove();
        this.loadingInst = null;
      }
      if (
        (this.hasGrid && this.grid.props.autoMergeColumns) ||
        this.hasRowGroup
      ) {
        this.grid.setProps({ classes: { "nom-table-has-row-group": true } });
      }
    }
    loading() {
      this.loadingInst = new Loading({ container: this.parent });
    }
    appendRow(rowProps) {
      if (!this.props.data) {
        this.props.data = [];
      }
      if (!this.props.data.length) {
        this.tbody.update({ showEmpty: false });
      }
      const row = this.tbody.appendChild(
        Object.assign({}, rowProps, { index: this.props.data.length })
      );
      this.props.data.push(rowProps.data);
      if (this.hasGrid) {
        this.grid.rowsRefs[row.key] = row;
      }
    }
    getRows() {
      return this.tbody.getChildren();
    }
    selectTr(tr) {
      if (this.activeTr) {
        this.activeTr.element.classList.remove("nom-tr-selected");
      }
      this.activeTr = tr;
      this.activeTr.element.classList.add("nom-tr-selected");
    }
  }
  Table.defaults = {
    tag: "table",
    columns: [],
    rowDefaults: {},
    onlyHead: false,
    onlyBody: false,
    keyField: "id",
    striped: false,
    treeConfig: {
      childrenField: "children",
      treeNodeColumn: null,
      initExpandLevel: -1,
      indentSize: 6,
    },
    showTitle: false,
    ellipsis: false,
    showEmpty: true,
  };
  Component.register(Table);
  var GridTableMixin = {
    methods: {
      calcResizeCol: function (data, thRef) {
        const col = this.table.colRefs[data.field];
        const tdWidth = this.table.element.rows[0].cells[col.props.index]
          .offsetWidth;
        const colWidth = col.props.column.width || tdWidth;
        let result = colWidth + data.distance;
        if (result < 60) {
          result = 60;
        }
        col.update({ column: { width: result } });
        if (this.componentType === "GridHeader" && col.props.column.fixed) {
          // 只在Header 调用 无需放在 mixin 中
          this._processFixedColumnSticky(thRef);
        }
      },
      resizeCol: function ({ field, width = 0 }) {
        const col = this.table.colRefs[field];
        col && col.update({ column: { width } });
      },
      setColMaxTdWidth: function ({ field, maxTdWidth }) {
        const col = this.table.colRefs[field];
        col && col.setMaxTdWidth(maxTdWidth);
      },
    },
  };
  class GridBody extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Table } };
      super(Component.extendProps(defaults, props), GridTableMixin, ...mixins);
    }
    _created() {
      this.grid = this.parent;
      this.grid.body = this;
    }
    _config() {
      this.setProps({
        children: {
          columns: this.grid.props.columns,
          data: this.grid.props.data,
          attrs: { style: { minWidth: `${this.grid.minWidth}px` } },
          onlyBody: true,
          line: this.props.line,
          rowDefaults: this.props.rowDefaults,
          treeConfig: this.grid.props.treeConfig,
          keyField: this.grid.props.keyField,
          showEmpty: this.grid.props.showEmpty,
        },
        attrs: {
          onscroll: () => {
            const { scrollLeft } = this.element;
            this.grid.header.element.scrollLeft = scrollLeft;
            if (this.grid.footer) {
              this.grid.footer.element.scrollLeft = scrollLeft;
            }
            this.grid.header.scrollbar &&
              this.grid.header.scrollbar.setScrollLeft(scrollLeft);
          },
        },
      });
    }
    _rendered() {
      // fix: chrome下,最下面的横向滚动条会挡住部分内容,读取过一次dom的属性后,又恢复正常
      if (isChrome49()) {
        this._elWidth = this.element.offsetWidth;
      }
    }
  }
  Component.register(GridBody);
  class GridFooter extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Table } };
      super(Component.extendProps(defaults, props), GridTableMixin, ...mixins);
    }
    _created() {
      this.grid = this.parent;
      this.grid.footer = this;
    }
    _config() {
      this.setProps({
        children: {
          columns: this._getSummaryColumns(),
          data: this._getSummaryDataList(),
          attrs: { style: { minWidth: `${this.grid.minWidth}px` } },
          onlyBody: true,
          line: this.props.line,
          rowDefaults: this.props.rowDefaults,
          treeConfig: this.grid.props.treeConfig,
          keyField: this.grid.props.keyField,
        },
      });
    }
    _getSummaryColumns() {
      const { summary } = this.grid.props;
      const columns =
        this.grid.props.summary && this.grid.props.summary.columns
          ? this.grid.props.summary.columns
          : this.grid.props.columns;
      const footColumns = [...columns];
      if (
        this.grid.props.rowCheckable &&
        footColumns.length &&
        footColumns.findIndex((n) => {
          return n.isCheckerSpace;
        }) === -1
      ) {
        footColumns.splice(0, 1, {
          width: 50,
          resizable: false,
          isCheckerSpace: true,
        });
      }
      const ignoreCellRender = !!(summary && summary.ignoreCellRender);
      return footColumns.map((col) => {
        return Object.assign({}, col, {
          cellRender:
            col.cellRender && !ignoreCellRender ? col.cellRender : null,
        });
      });
    }
    _getSummaryDataList() {
      const { summary } = this.grid.props;
      let list = [];
      if (Array.isArray(summary)) {
        list = summary.map((i) => {
          return this._getSummaryData(i);
        });
      } else if (summary.rows) {
        list = summary.rows.map((i) => {
          return this._getSummaryData(i);
        });
      } else {
        list.push(this._getSummaryData(summary));
      }
      return list;
    }
    _getMappedColumns(columns) {
      const arr = [];
      function mapColumns(data) {
        data.forEach(function (item) {
          if (item.children) {
            mapColumns(item.children);
          }
          arr.push(item);
        });
      }
      mapColumns(columns);
      return arr;
    }
    _getSummaryData(param) {
      const { data = [], rowCheckable, rowExpandable } = this.grid.props;
      const columns =
        this.grid.props.summary && this.grid.props.summary.columns
          ? this.grid.props.summary.columns
          : this.grid.props.columns;
      const { method, text = "总计" } = param;
      const flatColumns = this._getMappedColumns(columns);
      let res = {};
      let textColumnIndex = 0;
      rowCheckable && textColumnIndex++;
      rowExpandable && textColumnIndex++;
      if (method && isFunction(method)) {
        res = method({ columns: flatColumns, data, text: text });
        res[flatColumns[textColumnIndex].field] = text;
      } else {
        flatColumns.forEach((col, index) => {
          if (index === textColumnIndex) {
            res[col.field] = text;
            return;
          }
          const values = (data || []).map((item) => Number(item[col.field]));
          let sum = 0;
          for (let i = 0; i < values.length; i++) {
            if (Number.isNaN(values[i])) {
              res[col.field] = "-";
              return;
            }
            sum += values[i];
          }
          res[col.field] = sum;
        });
      }
      return res;
    }
  }
  Component.register(GridFooter);
  class Scrollbar extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        target: null,
        hidden: true,
        position: { left: 0, bottom: 0 },
        size: { width: 0, innerWidth: 0 },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { position, size } = this.props;
      this.setProps({
        attrs: {
          style: {
            width: size.width,
            left: position.left,
            bottom: position.bottom,
            "overflow-x": "auto",
            "overflow-y": "hidden",
          },
          onscroll: () => {
            const { scrollLeft } = this.element;
            this._scrollLeft = scrollLeft;
            if (!this._setScrollFlag) {
              this.props.target.body.element.scrollLeft = scrollLeft;
            }
            this._setScrollFlag = false;
          },
        },
        children: {
          classes: { "nom-scrollbar-inner": true },
          attrs: { style: { width: size.innerWidth } },
        },
      });
    } // 外部调用方法设置 scrollBar 的 scrollLeft
    setScrollLeft(scrollLeft) {
      // 当前scrollbar 隐藏，无法直接设置scrollLeft 的值
      // 所以先记录下来 在_rendered中再赋值
      if (this.props.hidden) {
        this._scrollLeft = scrollLeft;
      } else {
        // _setScrollFlag: true 时：表示此次滚动条的变化为外部触发
        // 则无需再正向设置 gridbody scrollLeft, 导致触发其 onscroll事件
        this._setScrollFlag = true;
        this.element.scrollLeft = scrollLeft;
      }
    }
    _rendered() {
      this.element.scrollLeft = this._scrollLeft || 0;
    }
    show() {
      this.props.hidden && this.update({ hidden: false });
    }
    hide() {
      !this.props.hidden && this.update({ hidden: true });
    }
    _remove() {
      this.element.remove();
    }
  }
  Component.register(Scrollbar);
  class GridHeader extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Table } };
      super(Component.extendProps(defaults, props), GridTableMixin, ...mixins);
    }
    _created() {
      this.grid = this.parent;
      this.grid.header = this;
    }
    _config() {
      const { frozenHeader, summary, scrollbarWidth } = this.grid.props;
      const minWidth = frozenHeader
        ? this.grid.minWidth + scrollbarWidth
        : this.grid.minWidth;
      this._summaryHeight = summary ? 36 : 0;
      this.setProps({
        classes: { "nom-grid-highlight-col": this.grid.props.highlightCol },
        children: {
          component: Table,
          columns: this.grid.props.columns,
          data: this.grid.data,
          attrs: { style: { minWidth: `${minWidth}px` } },
          onlyHead: true,
          line: this.props.line,
        },
      });
    }
    _rendered() {
      const that = this;
      this._fixRightPadding();
      if (!this.grid.props.sticky) {
        return;
      }
      if (!this.scrollbar) {
        this.scrollbar = new Scrollbar({ target: this.grid });
      }
      this._hideScrolls();
      this.position = null;
      this.size = null;
      if (this.grid.props.sticky === true) {
        this.scrollParent = window;
        this.scrollParent.onscroll = function () {
          that._onPageScroll();
        };
      } else {
        if (isFunction(this.grid.props.sticky)) {
          this.scrollParent = this.grid.props.sticky();
        } else {
          this.scrollParent = this.grid.props.sticky;
        }
        this.scrollParent._on("scroll", function () {
          that._onPageScroll();
        });
        setTimeout(() => {
          if (this.scrollParent) {
            this.scrollParent.element.scrollTop += 1;
            this.scrollParent.element.scrollTop -= 1;
          }
        }, 0);
      }
    }
    _remove() {
      this.scrollbar && this.scrollbar._remove();
    }
    _fixRightPadding() {
      setTimeout(() => {
        if (!this.element) {
          return;
        }
        const offset = this.element.offsetWidth - this.element.scrollWidth;
        if (offset > 1) {
          this.element.style.overflowY = "auto";
        }
      }, 200);
    }
    _hideScrolls() {
      const scrolls = document.getElementsByClassName("nom-scrollbar");
      if (!scrolls.length) {
        return;
      }
      for (let i = 0; i < scrolls.length; i++) {
        scrolls[i].classList.add("s-hidden");
      }
    }
    _onPageScroll() {
      if (!this.props) {
        return;
      }
      this.element.style.transform = `translateY(0px)`;
      let pRect = null;
      if (this.grid.props.sticky === true) {
        pRect = { top: 0, height: window.innerHeight };
      } else {
        pRect = this.scrollParent.element.getBoundingClientRect();
      }
      const gRect = this.grid.element.getBoundingClientRect();
      !this.position && this._setScrollerRect({ pRect: pRect, gRect: gRect });
      this._setScrollerVisible({ pRect: pRect, gRect: gRect });
    }
    _setScrollerRect(data) {
      const { pRect, gRect } = data;
      const innerWidth = this.element.scrollWidth;
      const bottom = window.innerHeight - (pRect.top + pRect.height);
      this.position = {
        left: `${gRect.left}px`,
        bottom: `${bottom < 0 ? 0 : bottom}px`,
      };
      this.size = { width: `${gRect.width}px`, innerWidth: `${innerWidth}px` };
      this.scrollbar.update({ position: this.position, size: this.size });
    }
    _setScrollerVisible(data) {
      const { pRect, gRect } = data;
      const { scrollbarWidth } = this.grid.props;
      if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
        this.element.style.transform = `translateY(${
          pRect.top - gRect.top - 2
        }px)`;
        if (this.grid.settingBtn) {
          this.grid.settingBtn.element.style.transform = `translateY(${
            pRect.top - gRect.top - 2
          }px)`;
        }
      } else if (this.grid.settingBtn) {
        this.grid.settingBtn.element.style.transform = `translateY(0px)`;
      }
      if (
        gRect.top < pRect.height + pRect.top &&
        gRect.top + gRect.height - scrollbarWidth - this._summaryHeight >
          pRect.top + pRect.height
      ) {
        this.scrollbar.show();
      } else {
        this.scrollbar.hide();
      }
    }
    /**
     * 存在多列固定，设置固定列的列宽时，对其余列的 style.left style.right 的重新计算处理
     * @param {number} triggerTh 触发的 th 实例
     */ _processFixedColumnSticky(triggerTh) {
      const { table } = triggerTh;
      const { thRefs } = table;
      const { colList } = table.colGroup;
      colList.forEach((col) => {
        if (col.column.fixed) {
          thRefs[col.name] && thRefs[col.name].setStickyPosition(true);
        }
      });
    }
  }
  Component.register(GridHeader);
  class GridSettingPopup extends Modal {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.grid = this.props.grid;
      this.tree = null;
    }
    _config() {
      const that = this;
      this.setProps({
        classes: { "nom-grid-setting-panel": true },
        content: {
          component: "Panel",
          uistyle: "card",
          header: { caption: { title: "列设置" } },
          body: {
            children: {
              attrs: { style: { maxHeight: "50vh", overflow: "auto" } },
              component: "Tree",
              showline: true,
              data: that.customizableColumns(that.grid.popupTreeData),
              nodeCheckable: {
                checkedNodeKeys: that.grid.getMappedColumns(
                  that.grid.props.columns
                ),
              },
              multiple: true,
              sortable: { showHandler: true },
              ref: (c) => {
                this.tree = c;
              },
              dataFields: { text: "title", key: "field" },
            },
          },
          footer: {
            children: {
              component: "Flex",
              gutter: "small",
              attrs: { style: { width: "100%" } },
              cols: [
                {
                  grow: true,
                  children: {
                    component: "Button",
                    text: "全选",
                    ref: (c) => {
                      this.checkallBtn = c;
                    },
                    onClick: () => {
                      this._toogleCheckall();
                    },
                  },
                },
                {
                  children: {
                    component: "Button",
                    type: "primary",
                    text: "确定",
                    onClick: function () {
                      const list = that.tree.getCheckedNodesData();
                      const lockedList = list.filter((n) => {
                        return n.disabled === true;
                      });
                      if (
                        list.length === 0 ||
                        (list.length === lockedList.length && list.length === 1)
                      ) {
                        new nomui.Alert({
                          type: "info",
                          title: "提示",
                          description: "请至少保留一列数据",
                        });
                        return false;
                      }
                      that.grid.popupTreeData = that.grid.originColumns = that._sortCustomizableColumns(
                        that.tree.getData()
                      );
                      that.grid.handleColumnsSetting(
                        that._sortCustomizableColumns(list)
                      );
                    },
                  },
                },
                {
                  children: {
                    component: "Button",
                    text: "取消",
                    onClick: () => {
                      this.hide();
                    },
                  },
                },
              ],
            },
          },
        },
      });
      super._config();
    }
    getMappedColumns(param) {
      const arr = [];
      function mapColumns(data) {
        data.forEach(function (item) {
          if (item.children) {
            mapColumns(item.children);
          }
          arr.push(item.field);
        });
      }
      mapColumns(param);
      return arr;
    }
    customizableColumns(val) {
      function mapColumns(data) {
        data.forEach(function (item) {
          if (item.isChecker === true || item.customizable === false) {
            item.hidden = true;
            item.disabled = true;
          }
          if (item.children) {
            mapColumns(item.children);
          }
        });
      }
      mapColumns(val);
      return val;
    } // 将customizable: false的列排至后面
    _sortCustomizableColumns(arr) {
      arr.sort((curr, next) => {
        if (next.customizable === false) return -1;
        return 0;
      });
      return arr;
    }
    _toogleCheckall() {
      if (this.checkallBtn.props.text === "全选") {
        this.tree.checkAllNodes({ ignoreDisabled: true });
        this.checkallBtn.update({ text: "取消全选" });
      } else {
        this.tree.uncheckAllNodes({ ignoreDisabled: true });
        this.checkallBtn.update({ text: "全选" });
      }
    }
  }
  Component.register(GridSettingPopup);
  class Grid extends Component {
    constructor(props, ...mixins) {
      Grid._loopSetValue(props.treeConfig, [
        "cascadeCheckParent",
        "cascadeCheckChildren",
        "cascadeUncheckParent",
        "cascadeUncheckChildren",
      ]);
      super(Component.extendProps(Grid.defaults, props), ...mixins);
    }
    _created() {
      this.minWidth = 0;
      this.lastSortField = null;
      this._alreadyProcessedFlat = false;
      this.rowsRefs = {};
      this.checkedRowRefs = {};
      this._shouldAutoScroll = true;
      this._customColumnFlag = false; // 是否已经自定义处理过列
      this._pinColumnFlag = false; // 是否已经处理过列缓存
      this.props.columns = this.props.columns.filter((n) => {
        return Object.keys(n).length;
      });
      this.pinColumns = [];
      this.originColumns = [...this.props.columns];
      this._needSortColumnsFlag = true; // 是否需要对列进行排序
      this.sortUpdated = false;
      this.filter = {};
      this.filterValueText = {};
      this._resetFixCount();
      if (this.props.frozenLeftCols > 0) {
        this.props.rowCheckable && this.props.frozenLeftCols++;
        this.props.rowExpandable && this.props.frozenLeftCols++;
      }
    }
    _update(props) {
      // 外部 update了columns, 需要重新计算得到
      if (props.columns) {
        const c = props.columns.filter((n) => {
          return Object.keys(n);
        });
        this._customColumnFlag = false;
        this._pinColumnFlag = false;
        this._needSortColumnsFlag = true;
        this.originColumns = [...c];
      } // 更新了data
      if (props.data && this.props) {
        const { treeConfig } = this.props; // data更新, flatData需要重新组装成Tree结构
        if (treeConfig && treeConfig.flatData) {
          this._alreadyProcessedFlat = false;
        }
      }
      if (
        props.hasOwnProperty("rowCheckable") ||
        props.hasOwnProperty("rowExpandable")
      ) {
        this._resetFixCount();
      }
    }
    _resetFixCount() {
      this._fixedCount = 0;
      this.props.rowCheckable && this._fixedCount++;
      this.props.rowExpandable && this._fixedCount++;
    }
    _config() {
      this.nodeList = {};
      if (this.props.frozenLeftCols || this.props.frozenRightCols) {
        this.props.forceSort = true;
      } // 切换分页 data数据更新时 此两项不重置会导致check表现出错
      this.rowsRefs = {};
      this.checkedRowRefs = {};
      this._propStyleClasses = ["bordered"];
      if (this.props.ellipsis === true) {
        this.props.ellipsis = "both";
      }
      this._processData(); // 更新列的排序部分内容
      this.checkSortInfo();
      this._processColumns();
      this._calcMinWidth();
      const { line, rowDefaults } = this.props;
      this.setProps({
        classes: {
          "m-frozen-header": this.props.frozenHeader,
          "m-with-setting": !!this.props.columnsCustomizable,
        },
        children: [
          {
            classes: { "nom-grid-setting": true },
            children: {
              component: "Button",
              ref: (c) => {
                this.settingBtn = c;
              },
              icon: "setting",
              size: "small",
              renderIf: this.props.columnsCustomizable, // type: 'text',
              classes: { "nom-grid-setting-btn": true },
              tooltip: "列设置",
              onClick: () => {
                this.showSetting();
              },
            },
          },
          { component: GridHeader, line: line },
          { component: GridBody, line: line, rowDefaults: rowDefaults },
          this.props.summary && { component: GridFooter, line: line },
        ],
      });
    }
    _processData() {
      const { treeConfig } = this.props; // 还未处理过 flatData
      if (treeConfig && treeConfig.flatData && !this._alreadyProcessedFlat) {
        this.setProps({ data: this._setTreeGridData(this.props.data) });
        this._alreadyProcessedFlat = true;
      }
    } // 列部分的各种处理
    _processColumns() {
      this._processColumnsCustom();
      this._processPinColumn();
      this._processColumnSort();
      this._processCheckableColumn();
      this._processExpandableColumn();
      this._processFrozenColumn();
    }
    _processPinColumn() {
      const { columnFrozenable } = this.props;
      if (this._pinColumnFlag || !columnFrozenable || !columnFrozenable.cache)
        return;
      this._gridColumsFixedStoreKey = this._getStoreKey(
        true,
        STORAGE_KEY_GRID_COLS_FIXED
      );
      if (!this._gridColumsFixedStoreKey) return; // 读取缓存中的上一次固定列的配置
      let storeFields = localStorage.getItem(this._gridColumsFixedStoreKey);
      if (storeFields && storeFields.length) {
        storeFields = JSON.parse(storeFields); // 从columns 二次过滤storeFields存在的列
        this.pinColumns = this._getColsFromFields(
          this.props.columns,
          storeFields,
          false
        );
        this.setProps({
          frozenLeftCols: this.pinColumns.length
            ? this._fixedCount + this.pinColumns.length
            : 0,
        });
        this._pinColumnFlag = true;
      }
    } // 根据缓存，对originColumns和 columns排序
    _processColumnSort() {
      if (this._needSortColumnsFlag) {
        let customFields = localStorage.getItem(this._gridColumsStoreKey);
        let fixedFields = localStorage.getItem(this._gridColumsFixedStoreKey);
        customFields = JSON.parse(customFields); // 无缓存则读取内存中 pinColumns的值做排序
        fixedFields =
          JSON.parse(fixedFields) || this.pinColumns.map((item) => item.field);
        this._sortColumnsFromFields(this.originColumns, customFields);
        this._sortColumnsFromFields(this.originColumns, fixedFields);
        this._sortColumnsFromFields(this.props.columns, customFields);
        this._sortColumnsFromFields(this.props.columns, fixedFields);
        this._needSortColumnsFlag = false;
      }
    }
    _processFrozenColumn() {
      this._parseBrowerVersion();
      const { frozenLeftCols, frozenRightCols } = this.props;
      if (frozenLeftCols !== null || frozenRightCols !== null) {
        const rev = this.props.columns.length - frozenRightCols;
        const c = this.props.columns.map(function (n, i, arr) {
          if (i + 1 <= frozenLeftCols) {
            return Object.assign({}, n, {
              fixed: "left",
              lastLeft: i + 1 === frozenLeftCols ? true : null,
            });
          }
          if (i >= rev) {
            return Object.assign({}, n, {
              fixed: "right",
              firstRight: i === rev ? true : null,
              lastRight: i === arr.length - 1 ? true : null,
            });
          }
          return Object.assign({}, n, {
            fixed: null,
            lastLeft: null,
            firstRight: null,
            lastRight: null,
          });
        });
        this.setProps({ columns: c });
      }
    }
    _setTreeGridData(arr) {
      const { keyField } = this.props;
      const { parentField, childrenField } = this.props.treeConfig;
      if (!keyField || keyField === "" || !arr) return []; //  删除所有 childrenField,以防止多次调用
      arr.forEach(function (item) {
        delete item[childrenField];
      });
      const map = {}; // 构建map
      arr.forEach((i) => {
        map[i[keyField]] = i; // 构建以keyField为键 当前数据为值
      });
      const treeData = [];
      arr.forEach((child) => {
        const mapItem = map[child[parentField]]; // 判断当前数据的parentField是否存在map中
        if (mapItem) {
          (mapItem[childrenField] || (mapItem[childrenField] = [])).push(child); // 这里判断mapItem中是否存在childrenField, 存在则插入当前数据, 不存在则赋值childrenField为[]然后再插入当前数据
        } else {
          // 不存在则是组顶层数据
          treeData.push(child);
        }
      });
      return treeData;
    }
    _parseBrowerVersion() {
      // 不支持sticky，需要将frozen 置为null
      if (!isBrowerSupportSticky()) {
        this.props.frozenLeftCols = null;
        this.props.frozenRightCols = null;
        this.props.allowFrozenCols = false;
        this.props.columnFrozenable = false;
      }
    }
    _processColumnsCustom() {
      const { columnsCustomizable } = this.props; // 未设置自定义列展示
      if (!columnsCustomizable) return; // 设置过后，无需再从selected和cache中取值
      if (this._customColumnFlag) return;
      const { selected, cache } = columnsCustomizable;
      if (selected && selected.length) {
        // 从originColumns 过滤selected存在的列
        this.setProps({
          columns: this._getColsFromSelectCols(this.originColumns, selected),
        });
        this._customColumnFlag = true;
      } // 自定义列设置缓存的 key
      this._gridColumsStoreKey = this._getStoreKey(
        cache,
        STORAGE_KEY_GRID_COLUMNS
      );
      if (!this._gridColumsStoreKey) return; // 缓存中有数据则读取缓存中的col的field数据
      let storeFields = localStorage.getItem(this._gridColumsStoreKey);
      if (storeFields && storeFields.length) {
        storeFields = JSON.parse(storeFields);
        this.setProps({
          columns: this._getColsFromFields(this.originColumns, storeFields),
        });
        this._customColumnFlag = true;
      }
    }
    _getStoreKey(cache, prefix) {
      if (!cache) return null;
      const _isAutoKey = this.key.startWith("__key");
      if (_isAutoKey && !isString(cache)) {
        console.warn(
          `Please set a key for Grid or set the cache to a unique value of string type.`
        );
        return null;
      }
      return `${prefix}_${_isAutoKey ? cache : this.key}`;
    }
    _calcMinWidth() {
      this.minWidth = 0;
      const { props } = this;
      for (let i = 0; i < props.columns.length; i++) {
        const column = props.columns[i];
        if (column.width) {
          this.minWidth += column.width;
        } else {
          this.minWidth += 120;
        }
      }
    }
    _rendered() {
      if (this.loadingInst) {
        this.loadingInst.remove();
        this.loadingInst = null;
      }
      if (this.props.rowCheckable && this._checkboxAllRef) {
        this.changeCheckAllState();
      }
      if (
        this.props.data &&
        this.props.autoMergeColumns &&
        this.props.autoMergeColumns.length > 0
      ) {
        this.autoMergeCols();
      }
      this._processColumnsWidth();
      this._processAutoScroll();
      this.props.rowSortable && defaultSortableOndrop();
    }
    getColumns() {
      return this.props.columns;
    }
    loading() {
      this.loadingInst = new Loading({ container: this.parent });
    }
    getMappedColumns(columns) {
      const arr = [];
      function mapColumns(data) {
        data.forEach(function (item) {
          if (item.children) {
            mapColumns(item.children);
          }
          arr.push(item.field);
        });
      }
      mapColumns(columns || this.originColumns);
      return arr;
    }
    setSortDirection(sorter) {
      const c = this.getColumns().map(this._setColumnItemDire(sorter));
      this.originColumns = this.originColumns.map(
        this._setColumnItemDire(sorter)
      ); // onSort外部会触发 update, 此时无需autoScroll
      if (!isFunction(sorter.sortable) && !isString(sorter.sortable)) {
        this._shouldAutoScroll = false;
      }
      this.setProps({ columns: c });
      !this.firstRender && this.render();
    } // 设置每一列的排序状态
    _setColumnItemDire(sorter) {
      return (item) => {
        if (!sorter) {
          return Object.assign({}, item, { sortDirection: null });
        }
        if (item.field === sorter.field) {
          return Object.assign({}, item, {
            sortDirection: sorter.sortDirection,
          });
        }
        if (item.children) {
          item.children = item.children.map(this._setColumnItemDire(sorter));
        }
        return Object.assign({}, item, { sortDirection: null });
      };
    }
    handleSort(sorter) {
      this.props.sortCacheable && this.saveSortInfo(sorter);
      const key = sorter.field;
      if (!sorter.sortDirection && !this.props.forceSort) return;
      if (isFunction(sorter.sortable)) {
        let arr = [];
        if (this.lastSortField === key) {
          arr = this.props.data.reverse();
        } else {
          arr = this.props.data.sort(sorter.sortable);
        }
        this.setProps({ data: arr });
        this.setSortDirection(sorter);
        this.lastSortField = key;
        return;
      }
      if (nomui.utils.isString(sorter.sortable)) {
        let arr = [];
        if (this.lastSortField === key) {
          arr = this.props.data.reverse();
        } else if (sorter.sortable === "string") {
          arr = this.props.data.sort((a, b) =>
            localeCompareString(b, a, sorter.field)
          );
        } else if (sorter.sortable === "number") {
          arr = this.props.data.sort((a, b) => {
            return b[sorter.field] - a[sorter.field];
          });
        } else {
          arr = this.props.data.sort((a, b) => ascCompare(b, a, sorter.field));
        }
        this.setProps({ data: arr });
        this.setSortDirection(sorter);
        this.lastSortField = key;
        return;
      }
      this._callHandler(this.props.onSort, {
        field: sorter.field,
        sortDirection: sorter.sortDirection,
      });
      this.setSortDirection(sorter);
      this.lastSortField = key;
    }
    resetSort() {
      if (this.lastSortField) {
        this.header.table.thRefs[this.lastSortField].resetSort();
      }
      this.lastSortField = null;
      this.saveSortInfo(null);
    }
    saveSortInfo(sorter) {
      localStorage.setItem(`${this.key}-sort-info`, JSON.stringify(sorter));
      this.sortInfo = sorter;
    }
    getSortInfo() {
      return JSON.parse(localStorage.getItem(`${this.key}-sort-info`));
    }
    checkSortInfo() {
      // 已经处理过 || 正在处理 直接返回
      if (!this.firstRender || this.sortUpdated || this.startSort) return; // 排序缓存
      const _sortInfo = this.getSortInfo();
      if (this.props.sortCacheable && _sortInfo) {
        this.startSort = true;
        this.setSortDirection(_sortInfo);
        this._callHandler(this.props.onSort, {
          field: _sortInfo.field,
          sortDirection: _sortInfo.sortDirection,
        });
      } else if (this.props.defaultSort && this.firstRender) {
        // 默认排序
        this.startSort = true;
        this.setSortDirection(this.props.defaultSort);
      }
      this.sortUpdated = true;
    } // 外部主动记录下当前滚动（下次update时会回到当前位置）
    setScrollPlace(callback) {
      this._shouldAutoScroll = true;
      const info = this._setScrollPlace();
      if (callback) {
        callback(info);
      }
    } // 记录上一次滚动到的位置
    _setScrollPlace(isEmpty) {
      // grid自身的 header和body的宽度
      const headerEl = this.header.element;
      const bodyEl = this.body.element; // grid设置了 sticky相对父元素
      const { scrollParent } = this.header; // body的body的宽度
      const tableBodyEl = this.body.table.element; // 表格的竖向滚动分为两种
      // 1.设置了sticky, 此时的scrollTop 需从 header.scrollParent中获取
      // 2.Grid自身设置了height, scrollTop从 body中取
      let headerLeft = headerEl.scrollLeft;
      const headerTop =
        scrollParent && scrollParent.element
          ? scrollParent.element.scrollTop
          : 0;
      let bodyLeft = bodyEl.scrollLeft;
      const bodyTop = bodyEl.scrollTop; // 表格的宽度 / 2 - svg图标的一半
      if (isEmpty) {
        headerLeft = (tableBodyEl.offsetWidth - headerEl.offsetWidth) / 2;
        bodyLeft = (tableBodyEl.offsetWidth - bodyEl.offsetWidth) / 2;
      }
      this._headerScrollInfo = { top: headerTop, left: headerLeft };
      this._bodyScrollInfo = { top: bodyTop, left: bodyLeft };
      return { header: this._headerScrollInfo, body: this._bodyScrollInfo };
    }
    resetColumnsCustom() {
      if (this._gridColumsStoreKey) {
        localStorage.removeItem(this._gridColumsStoreKey);
      }
      this.setProps({ columns: this.originColumns });
      this._processColumns();
      this._calcMinWidth();
      this.render();
    }
    handleFilter(isReset) {
      const that = this;
      if (
        !isReset &&
        Object.keys(this.filter).filter(function (key) {
          return key !== "sender" && that.filter[key] !== null;
        }) < 1
      ) {
        return;
      }
      this.props.onFilter &&
        this._callHandler(this.props.onFilter, this.filter);
    }
    getRow(param) {
      let result = null;
      if (param instanceof Component) {
        return param;
      }
      if (isFunction(param)) {
        for (const key in this.rowsRefs) {
          if (this.rowsRefs.hasOwnProperty(key)) {
            if (param.call(this.rowsRefs[key]) === true) {
              result = this.rowsRefs[key];
              break;
            }
          }
        }
      } else if (isPlainObject(param)) {
        return this.rowsRefs[param[this.props.keyField]];
      } else {
        return this.rowsRefs[param];
      }
      return result;
    }
    getCheckedRows() {
      return Object.keys(this.checkedRowRefs)
        .map((key) => {
          return this.checkedRowRefs[key];
        })
        .filter((rowRef) => !isNullish(rowRef.key));
    }
    getCheckedRowKeys() {
      return Object.keys(this.checkedRowRefs)
        .map((key) => {
          return this.checkedRowRefs[key].key;
        })
        .filter((key) => !isNullish(key));
    } // 遍历 rowTr 实例，调用其check方法
    checkAllRows(options) {
      const { rowsRefs } = this;
      Object.keys(rowsRefs).forEach((key) => {
        const refItem = rowsRefs[key];
        const { props } = refItem._checkboxRef; // _checkboxRef disabled || hidden, 则跳出循环
        if (!props || props.disabled || props.hidden) return;
        if (
          refItem.props &&
          !isNullish(refItem.props.data[this.props.keyField])
        ) {
          refItem.check(options);
        }
      });
    }
    uncheckAllRows(options) {
      const { rowsRefs } = this;
      Object.keys(rowsRefs).forEach((key) => {
        const refItem = rowsRefs[key];
        const { props } = refItem._checkboxRef; // _checkboxRef disabled || hidden, 则跳出循环
        if (!props || props.disabled || props.hidden) return;
        if (
          refItem.props &&
          !isNullish(refItem.props.data[this.props.keyField])
        ) {
          refItem.uncheck(options);
        }
      });
    }
    checkRows(rows, options) {
      rows = Array.isArray(rows) ? rows : [rows];
      rows.forEach((row) => {
        const rowRef = this.getRow(row);
        rowRef && rowRef.check(options);
      });
    }
    changeCheckAllState() {
      const checkedRowsLength = Object.keys(this.checkedRowRefs).length;
      if (checkedRowsLength === 0) {
        this._checkboxAllRef.setValue(false, false);
      } else {
        const allRowsLength = Object.keys(this.rowsRefs).filter((key) => {
          const refItem = this.rowsRefs[key];
          const { props } = refItem._checkboxRef; // 过滤 _checkboxRef 存在 && disabled 和 hidden为false
          return props && !props.disabled && !props.hidden;
        }).length;
        if (allRowsLength <= checkedRowsLength) {
          this._checkboxAllRef.setValue(true, false);
        } else {
          this._checkboxAllRef.partCheck(false);
        }
      }
    }
    getKeyValue(rowData) {
      return rowData[this.props.keyField];
    }
    showSetting() {
      // 列设置弹窗 tree的数据
      this.popupTreeData = this.originColumns;
      this.popup = new GridSettingPopup({
        align: "center",
        alignTo: window,
        grid: this, // fit: true,
      });
    }
    handleColumnsSetting(params) {
      const tree = params;
      const that = this;
      let treeInfo = null;
      function findTreeInfo(origin, key) {
        origin.forEach(function (item) {
          if (item.children) {
            findTreeInfo(item.children, key);
          }
          if (item.field === key) {
            treeInfo = item;
          }
        });
        if (treeInfo !== null) return treeInfo;
      }
      function addTreeInfo(data) {
        data.forEach(function (item) {
          if (item.children) {
            addTreeInfo(item.children);
          }
          const myinfo = findTreeInfo(that.originColumns, item.key);
          if (myinfo) {
            Object.keys(myinfo).forEach(function (key) {
              if (key !== "children") {
                item[key] = myinfo[key];
              }
            });
          }
        });
      }
      addTreeInfo(tree);
      const { columnsCustomizable } = this.props;
      if (this._gridColumsStoreKey) {
        localStorage.setItem(
          this._gridColumsStoreKey,
          JSON.stringify(this.getMappedColumns(tree))
        );
      }
      this._customColumnFlag = false;
      this._processPinColumnFromSetting(tree);
      this.setProps({ columns: tree });
      this._processColumns();
      this._calcMinWidth();
      this.render();
      this.popup.hide();
      columnsCustomizable.callback &&
        this._callHandler(columnsCustomizable.callback(tree));
    } // 自定义列设置后。更新 pinColumns
    _processPinColumnFromSetting(columns) {
      if (!this._gridColumsFixedStoreKey) return;
      const { frozenLeftCols } = this.props;
      if (frozenLeftCols) {
        this.pinColumns = columns.slice(0, frozenLeftCols - this._fixedCount);
        localStorage.setItem(
          this._gridColumsFixedStoreKey,
          JSON.stringify(this.pinColumns.map((col) => col.field))
        );
      }
    }
    handleDrag() {
      if (this.props.rowSortable && this.props.rowSortable.onEnd) {
        this._callHandler(this.props.rowSortable.onEnd);
      }
    }
    getData() {
      if (!this.props.data || !this.props.data.length) {
        return [];
      }
      const that = this;
      const keys = this.getDataKeys();
      const data = keys.map(function (key) {
        return that.props.data.filter(function (item) {
          return `${item[that.props.keyField]}` === `${key}`;
        })[0];
      });
      return data;
    }
    getDataKeys() {
      const order = [];
      const trs = this.body.table.element.rows;
      for (let i = 0; i < trs.length; i++) {
        order.push(trs[i].dataset.key);
      }
      return order;
    }
    appendRow(rowProps) {
      this.body.table.appendRow(rowProps);
    }
    checkChildren(row) {
      const { checked } = row.props;
      const { cascadeCheckChildren } = this.props.treeConfig;
      cascadeCheckChildren === true &&
        Object.keys(row.childrenNodes).forEach((key) => {
          this.checkChildren(row.childrenNodes[key]);
        });
      if (checked === true) {
        return;
      }
      row.check();
    }
    check(row) {
      const { checked } = row.props;
      const {
        cascadeCheckParent,
        cascadeCheckChildren,
      } = this.props.treeConfig;
      cascadeCheckChildren === true &&
        Object.keys(row.childrenNodes).forEach((key) => {
          this.checkChildren(row.childrenNodes[key]);
        });
      cascadeCheckParent === true &&
        row.parentNode &&
        this.check(row.parentNode);
      if (checked === true) {
        return false;
      }
      row.check();
    }
    uncheck(row) {
      const { checked } = row.props;
      const { cascadeUncheckChildren } = this.props.treeConfig;
      cascadeUncheckChildren === true &&
        Object.keys(row.childrenNodes).forEach((key) => {
          this.uncheck(row.childrenNodes[key]);
        });
      if (checked === false) {
        return false;
      }
      row.uncheck();
    }
    _processCheckableColumn() {
      const grid = this;
      const { rowCheckable } = this.props;
      let { columns } = this.props;
      if (rowCheckable) {
        // 每次都重新渲染 checkbox列
        columns = columns.filter((item) => !item.isChecker);
        let normalizedRowCheckable = rowCheckable;
        if (!isPlainObject(rowCheckable)) {
          normalizedRowCheckable = {};
        }
        const { checkedRowKeys = [], checkboxRender } = normalizedRowCheckable;
        const checkedRowKeysHash = {};
        checkedRowKeys.forEach((rowKey) => {
          checkedRowKeysHash[rowKey] = true;
        });
        this.setProps({
          columns: [
            {
              width: 50,
              isChecker: true,
              resizable: false,
              field: "nom-grid-row-checker",
              classes: { "nom-grid-checkbox": true },
              header: {
                component: Checkbox,
                plain: true,
                _created: (inst) => {
                  grid._checkboxAllRef = inst;
                },
                onValueChange: (args) => {
                  if (args.newValue === true) {
                    grid.checkAllRows(false);
                  } else {
                    grid.uncheckAllRows(false);
                  }
                },
              },
              cellRender: ({ row, rowData, index }) => {
                let _checkboxProps = {}; // 根据传入的 checkboxRender 计算出对应的 props: {hidden, value, disabled}
                if (checkboxRender && isFunction(checkboxRender)) {
                  _checkboxProps = checkboxRender({ row, rowData, index });
                } // 计算得到当前的 checkbox的状态
                _checkboxProps.value =
                  _checkboxProps.value || checkedRowKeysHash[row.key] === true;
                if (
                  checkedRowKeysHash[row.key] === true ||
                  _checkboxProps.value
                ) {
                  grid.checkedRowRefs[grid.getKeyValue(rowData)] = row;
                }
                const { keyField } = this.props;
                const { parentField } = this.props.treeConfig;
                this.nodeList[`__key${rowData[keyField]}`] = row;
                row.childrenNodes = {};
                row.parentNode = this.nodeList[`__key${rowData[parentField]}`];
                if (row.parentNode) {
                  row.parentNode.childrenNodes[
                    `__key${rowData[keyField]}`
                  ] = row;
                }
                return {
                  component: Checkbox,
                  classes: { "nom-grid-checkbox": true },
                  plain: true,
                  _created: (inst) => {
                    row._checkboxRef = inst;
                  },
                  _config() {
                    this.setProps(_checkboxProps);
                  },
                  attrs: { "data-key": row.key },
                  onValueChange: (args) => {
                    if (args.newValue === true) {
                      grid.check(row);
                    } else {
                      grid.uncheck(row);
                    }
                    grid.changeCheckAllState();
                  },
                };
              },
            },
            ...columns,
          ],
        });
      }
    } // 处理列宽
    _processColumnsWidth() {
      const { columnResizable } = this.props;
      const { cache } = columnResizable;
      this._gridColumsWidthStoreKey = this._getStoreKey(
        cache,
        STORAGE_KEY_GRID_COLS_WIDTH
      );
      const colWithString = localStorage.getItem(this._gridColumsWidthStoreKey);
      const _widthInfo = JSON.parse(colWithString) || {}; // 配置了 autoWidth的列，主动触发其col.update
      this.originColumns.forEach((col) => {
        if (col.autoWidth) {
          _widthInfo[col.field] = 0;
        }
      });
      Object.keys(_widthInfo).forEach((key) => {
        const data = { field: key, width: _widthInfo[key] };
        this.resizeCol(data);
      });
    } // 自动滚动到上次的位置
    _processAutoScroll() {
      const { data } = this.props;
      if (!data || !data.length) {
        this._shouldAutoScroll = true;
        this._setScrollPlace(true);
      } // 排序后自动滚动到之前的位置
      this._shouldAutoScroll && this.autoScrollGrid();
      this._shouldAutoScroll = true;
    }
    autoMergeCols() {
      const that = this;
      this.props.autoMergeColumns.forEach(function (key) {
        that._mergeColumn(key);
      });
    }
    _mergeColumn(key) {
      const el = this.body.element.getElementsByTagName("table")[0];
      function getIndex(data) {
        for (let i = 0; i < el.rows[0].cells.length; i++) {
          if (el.rows[0].cells[i].getAttribute("data-field") === data) {
            return i;
          }
        }
      }
      const index = getIndex(key);
      for (let i = el.rows.length - 1; i > 0; i--) {
        el.rows[i].cells[index].rowSpan = el.rows[i].cells[index].rowSpan || 1;
        if (
          el.rows[i].cells[index].innerHTML ===
          el.rows[i - 1].cells[index].innerHTML
        ) {
          el.rows[i - 1].cells[index].rowSpan =
            el.rows[i].cells[index].rowSpan + 1;
          el.rows[i].cells[index].rowSpan = 0;
          el.rows[i].cells[index].style.display = "none";
        }
      }
    }
    autoScrollGrid(param) {
      let { _headerScrollInfo, _bodyScrollInfo } = this;
      if (param) {
        _headerScrollInfo = param.header;
        _bodyScrollInfo = param.body;
      }
      if (!_headerScrollInfo || !_bodyScrollInfo) return;
      if (_headerScrollInfo.top) {
        this.header.scrollParent.element.scrollTop = _headerScrollInfo.top || 0;
      }
      this.header.element.scrollLeft = _headerScrollInfo.left || 0;
      this.body.element.scrollLeft = _bodyScrollInfo.left || 0;
      this.body.element.scrollTop = _bodyScrollInfo.top || 0;
      this._headerScrollInfo = null;
      this._bodyScrollInfo = null;
    }
    /**
     * 根据偏移量计算出width后再赋值
     * @param {*} data {field, distance}
     */ calcResizeCol(data, thRef) {
      this.header && this.header.calcResizeCol(data, thRef);
      if (this.props.data && this.props.data.length) {
        this.body && this.body.calcResizeCol(data, thRef);
      }
      this.footer && this.footer.calcResizeCol(data, thRef);
    }
    /**
     * 直接传入width设置宽度
     * @param {*} data {field, width}
     */ resizeCol(data) {
      this.header && this.header.resizeCol(data);
      this.body && this.body.resizeCol(data);
      this.footer && this.footer.resizeCol(data);
    }
    /**
     * 由设置了 autoWidth的Td触发，刷新对应的col的maxTdWidth变量
     * @param {*} data {field, maxTdWidth}
     */ setAllTableColMaxTdWidth(data) {
      this.header && this.header.setColMaxTdWidth(data);
      this.body && this.body.setColMaxTdWidth(data);
      this.footer && this.footer.setColMaxTdWidth(data);
    } // 存储设置的列的宽度
    storeColsWidth(field) {
      const { _gridColumsWidthStoreKey: _storeKey } = this;
      if (!_storeKey) return; // storeKey优先 _gridKey, cache 次之
      const colWithString = localStorage.getItem(_storeKey);
      const _widthInfo = colWithString ? JSON.parse(colWithString) : {};
      const col = this.header.table.colRefs[field];
      _widthInfo[field] = col.props.column.width;
      localStorage.setItem(_storeKey, JSON.stringify(_widthInfo));
    }
    /**
     *  重置col的width本地缓存
     * @param {string} field 需要重置的对应col 为空则清除所有数据
     */ resetColsWidth(field = null) {
      const { _gridColumsWidthStoreKey: _storeKey } = this;
      if (!_storeKey) return; // originColumns中拥有最原始的width数据
      let resetCols = this.originColumns.filter(
        (item) => item.resizable || isNullish(item.resizable)
      );
      if (!field) {
        localStorage.removeItem(_storeKey);
      } else {
        resetCols = [this.originColumns.find((col) => col.field === field)];
        const colWithString = localStorage.getItem(_storeKey);
        const _widthInfo = colWithString ? JSON.parse(colWithString) : {};
        delete _widthInfo[field];
        if (Object.keys(_widthInfo).length) {
          localStorage.setItem(_storeKey, JSON.stringify(_widthInfo));
        } else {
          localStorage.removeItem(_storeKey);
        }
      }
      resetCols.forEach((col) => {
        const data = { field: col.field, width: col.width };
        this.resizeCol(data);
      });
    }
    _getColsFromSelectCols(originCols = [], selectCols = []) {
      return selectCols.reduce((acc, curr) => {
        const sameCol = originCols.find(
          (originCol) => originCol.field === curr.field
        );
        if (sameCol) {
          acc.push(
            Object.assign({}, curr, {
              children: this._getColsFromSelectCols(
                sameCol.children,
                curr.children
              ),
            })
          );
        }
        return acc;
      }, []);
    } // 引用传递，实现对对应 columns的排序
    _sortColumnsFromFields(columns, fields = []) {
      if (!fields || !fields.length) return; // 因Array.prototype.sort 在Firefox在的表现不同，改为使用for循环
      for (let i = 0; i < fields.length; i++) {
        for (let j = i; j < columns.length; j++) {
          // 未设置 field的列都排在最后面
          if (isNullish(columns[j].field)) {
            const nullCol = columns.splice(j, 1);
            columns.push(nullCol[0]);
          } else if (columns[j].field === fields[i]) {
            // 将fields 中存在的列全部排在最前面
            const sameCol = columns.splice(j, 1);
            columns.splice(i, 0, sameCol[0]);
          }
        }
      }
    }
    _getColsFromFields(columns = [], fields = [], includeNullish = true) {
      return columns.reduce((acc, curr) => {
        // 无field的列，列设置后会消失
        if (isNullish(curr.field) && includeNullish) {
          acc.push(curr);
        } else if (fields.includes(curr.field)) {
          acc.push(
            Object.assign({}, curr, {
              children: this._getColsFromFields(curr.children, fields),
            })
          );
        }
        return acc;
      }, []);
    }
    _processExpandableColumn() {
      const { rowExpandable } = this.props;
      let { columns } = this.props;
      if (rowExpandable) {
        columns = columns.filter((item) => !item.isTreeMark);
        this.setProps({
          columns: [
            {
              width: 50,
              isTreeMark: true,
              resizable: false,
              cellRender: ({ row, rowData }) => {
                return {
                  component: Icon,
                  expandable: {
                    byClick: true,
                    expandedProps: { type: "minus-square" },
                    collapsedProps: { type: "plus-square" },
                    target: () => {
                      if (!row.expandedRow) {
                        row.expandedRow = row.after({
                          component: ExpandedTr,
                          data: rowData,
                        });
                      }
                      return row.expandedRow;
                    },
                  },
                };
              },
            },
            ...columns,
          ],
        });
      }
    }
    _onRowCheck(row) {
      const { rowCheckable } = this.props;
      if (rowCheckable) {
        let normalizedRowCheckable = rowCheckable;
        if (!isPlainObject(rowCheckable)) {
          normalizedRowCheckable = {};
        }
        const { onCheck } = normalizedRowCheckable;
        this._callHandler(onCheck, { row: row });
      }
    }
    _onRowUncheck(row) {
      const { rowCheckable } = this.props;
      if (rowCheckable) {
        let normalizedRowCheckable = rowCheckable;
        if (!isPlainObject(rowCheckable)) {
          normalizedRowCheckable = {};
        }
        const { onUncheck } = normalizedRowCheckable;
        this._callHandler(onUncheck, { row: row });
      }
    }
    getRows() {
      return this.body.table.getRows();
    }
    handlePinClick(data) {
      // 取消初始化固定列时(无缓存配置时)
      if (data.fixed && this.pinColumns.length < 1) {
        let num = this.props.frozenLeftCols;
        if (num - 1 > this._fixedCount) {
          this.fixPinOrder(data);
          num--;
        } else {
          num = 0;
        }
        this.setProps({ frozenLeftCols: num }); // 未对columns进行增删或排序，无需触发 config
        this._processFrozenColumn();
        this.render();
        return;
      }
      if (this.pinColumns.find((n) => n.field === data.field)) {
        this.pinColumns = this.removeColumn(this.pinColumns, data);
      } else {
        this.pinColumns.push(data);
      }
      this._gridColumsFixedStoreKey &&
        localStorage.setItem(
          this._gridColumsFixedStoreKey,
          JSON.stringify(this.pinColumns.map((col) => col.field))
        );
      this.setProps({
        columns: this.getPinOrderColumns(),
        frozenLeftCols: this.pinColumns.length
          ? this.pinColumns.length + this._fixedCount
          : 0,
      });
      this._needSortColumnsFlag = !data.lastLeft;
      this._processColumns();
      this.render();
    }
    fixPinOrder(data) {
      const { columns } = this.props;
      const num = this.props.frozenLeftCols;
      if (columns[num - 1].field === data.field) {
        return;
      }
      let idx;
      for (let i = 0; i < columns.length; i++) {
        if (data.field === columns[i].field) {
          idx = i;
          break;
        }
      }
      const c = this.props.columns;
      const item = c.splice(idx, 1);
      c.splice(num - 1, 0, item[0]);
      this.setProps({ columns: c });
    }
    removeColumn(array, data) {
      if (array.length < 1) {
        return [];
      }
      return array.filter((n) => {
        return n.field !== data.field;
      });
    }
    getPinOrderColumns() {
      if (!this.pinColumns.length) {
        return this.props.columns;
      }
      let arr = [];
      this.pinColumns
        .slice()
        .reverse()
        .forEach((n) => {
          const arr2 = arr.length > 0 ? arr : this.props.columns;
          arr = this.removeColumn(arr2, n);
          arr.unshift(n);
        });
      return arr;
    }
  }
  Grid.defaults = {
    columns: [],
    data: null,
    frozenHeader: false,
    frozenLeftCols: null,
    frozenRightCols: null,
    allowFrozenCols: false,
    onSort: null,
    forceSort: false,
    sortCacheable: false,
    onFilter: null,
    keyField: "id",
    treeConfig: {
      flatData: false, // 数据源是否为一维数组
      parentField: "parentKey",
      childrenField: "children",
      treeNodeColumn: null,
      initExpandLevel: -1,
      indentSize: 16,
      cascadeCheckParent: true,
      cascadeCheckChildren: true,
      cascadeUncheckChildren: true,
      cascade: false,
    },
    columnsCustomizable: false, // columnsCustomizable.selected: 若存在，则展示selected 的列数据
    // columnsCustomizable.cache: 设置列的结果保存至localstorage，cache的值为对应的key
    // columnsCustomizable.callback: 设置列保存回调
    autoMergeColumns: null,
    columnResizable: false, // columnResizable.cache: boolean 设置的列宽保存至localstorage
    // columnResizable.allowFixedCol: 固定列是否允许被拖动(当 data太多时拖动，会造成渲染卡顿, 此时可设置false关闭)
    columnFrozenable: false, // 允许固定列
    // columnFrozenable.cache: boolean 固定列的结果保存至localstorage
    striped: false,
    showTitle: false,
    ellipsis: false,
    sticky: false,
    line: "row",
    bordered: false,
    scrollbarWidth: 8,
    summary: null,
    showEmpty: true,
    columnAlign: "left",
  };
  Grid._loopSetValue = function (key, arry) {
    if (key === undefined || key.cascade === undefined) return false;
    arry.forEach(function (currentValue) {
      if (key[currentValue] === undefined) {
        key[currentValue] = key.cascade;
      }
    });
  };
  Component.register(Grid);
  class Toolbar extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Toolbar.defaults, props), ...mixins);
    }
    _config() {
      const { items, type, gutter, size, visibleItems, inline } = this.props;
      const before = items.slice(0, visibleItems).map((item) => {
        return Object.assign(
          { component: "Button", type: type, size: size, inline },
          item
        );
      });
      const dropdowns = {
        component: "Dropdown",
        rightIcon: "ellipsis",
        items: items.slice(visibleItems),
        type: type,
        inline,
        size: size,
      };
      this.setProps({
        children: {
          component: "Cols",
          gutter: gutter,
          items: [...before, items.length > visibleItems && dropdowns],
        },
      });
    }
  }
  Toolbar.defaults = {
    type: "default",
    visibleItems: 2,
    gutter: "sm",
    size: null,
    items: [],
  };
  Component.register(Toolbar);
  let nameSeq = 0;
  class GroupGridTr extends Tr {
    constructor(props, ...mixins) {
      const defaults = { hideAction: false };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.fields = [];
      const { name, value } = this.props;
      this.initValue = value !== undefined ? clone$1(this.props.value) : null;
      this.oldValue = null;
      this.currentValue = this.initValue;
      if (name) {
        this.name = name;
        this._autoName = false;
      } else {
        this._autoName = true;
        this.name = `__field_grid${++nameSeq}`;
      }
      this.group = this.table.grid.groupGrid;
      this.rootField = this.group === null ? this : this.group.rootField;
      this.rules = [];
    }
    getValue(options) {
      const { valueOptions } = this.props;
      options = extend$1(
        { ignoreDisabled: true, ignoreHidden: true, merge: false },
        valueOptions,
        options
      );
      const value = {};
      const len = this.fields.length;
      for (let i = 0; i < len; i++) {
        const field = this.fields[i];
        if (field.getValue && this._needHandleValue(field, options)) {
          const fieldValue = field.getValue(options);
          if (field.props.flatValue === true) {
            extend$1(value, fieldValue);
          } else {
            value[field.name] = fieldValue;
          }
        }
      }
      if (options.merge === true) {
        return extend$1(this.currentValue, value);
      }
      return value;
    }
    setValue(value, options) {
      options = extend$1(
        { ignoreDisabled: false, ignoreHidden: false },
        options
      );
      const len = this.fields.length;
      for (let i = 0; i < len; i++) {
        const field = this.fields[i];
        if (field.setValue && this._needHandleValue(field, options)) {
          let fieldValue = value;
          if (field.props.flatValue === false) {
            if (isPlainObject(value)) {
              fieldValue = value[field.name];
            }
          }
          if (fieldValue === undefined) {
            fieldValue = null;
          }
          field.setValue(fieldValue);
        }
      }
    }
    validate(fromParent = false) {
      this.invalids = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i],
          { disabled, hidden } = field.props;
        if (!(disabled || hidden) && field.validate) {
          const valResult = field.validate();
          if (valResult !== true) {
            this.invalids.push(field);
          }
        }
      } // 如果是GroupGrid触发的校验，则不主动 focus
      if (!fromParent && this.invalids.length > 0) {
        this.invalids[0].focus();
      }
      return this.invalids.length === 0;
    }
    _focusInvalid() {
      if (this.invalids.length) {
        this.invalids[0].focus();
      }
    }
    getField(fieldName) {
      if (typeof fieldName === "string") {
        // Handle nested keys, e.g., "foo.bar" "foo[1].bar" "foo[key].bar"
        const parts = fieldName.split(".");
        let curField = this;
        if (parts.length) {
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            curField = curField._getSubField(part);
            if (!curField) {
              break;
            }
          }
        }
        return curField;
      }
    }
    _getSubField(fieldName) {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.name === fieldName) {
          return field;
        }
      }
      return null;
    }
    _onValueChange(args) {
      const that = this;
      this.oldValue = clone$1(this.currentValue);
      this.currentValue = clone$1(this.getValue());
      this.props.value = this.currentValue;
      args = extend$1(true, args, {
        name: this.props.name,
        oldValue: this.oldValue,
        newValue: this.currentValue,
      });
      setTimeout(function () {
        that._callHandler(that.props.onValueChange, args);
        that.group &&
          that.group._onValueChange({
            changedField: args.changedField || that,
          });
        isFunction(that._valueChange) && that._valueChange(args);
        if (that.validateTriggered) {
          that._validate();
        }
      }, 0);
    }
    focus() {
      this.element.focus();
    }
    reset() {
      this.setValue(this.initValue);
    }
    _clear() {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.setValue) {
          field.setValue(null);
        }
      }
    }
    _needHandleValue(field, options) {
      const { disabled, hidden } = field.props;
      const { ignoreFields = [] } = options;
      if (field._autoName) {
        return false;
      }
      if (options.ignoreDisabled && disabled === true) {
        return false;
      }
      if (options.ignoreHidden && hidden === true) {
        return false;
      }
      if (ignoreFields.includes(field.name)) {
        return false;
      }
      return true;
    }
  }
  class GroupGrid extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(GroupGrid.defaults, props), ...mixins);
    }
    _created() {
      super._created();
    }
    _config() {
      const that = this;
      const { groupDefaults, value, gridProps } = this.props;
      const actionRender = groupDefaults.actionRender;
      const actionWidth = groupDefaults.actionWidth || 80;
      let columns = [];
      groupDefaults.fields.forEach((f) => {
        if (f.hidden !== true) {
          columns.push({
            field: f.name,
            title: f.label,
            width: f.width,
            cellRender: ({ cellData, row }) => {
              return Component.extendProps(f, {
                notShowLabel: true,
                plain: true,
                value: cellData,
                __group: row,
                invalidTip: { reference: this },
                onCreated: ({ inst }) => {
                  row.fields.push(inst);
                },
              });
            },
          });
        }
      });
      if (isFunction(actionRender)) {
        columns = [
          ...columns,
          {
            width: actionWidth,
            cellRender: ({ row }) => {
              return {
                component: Toolbar,
                items: actionRender({ row: row, grid: that }),
              };
            },
          },
        ];
      } else if (actionRender === true || actionRender === undefined) {
        columns = [
          ...columns,
          {
            width: actionWidth,
            cellRender: ({ row }) => {
              return {
                component: Toolbar,
                items: [
                  {
                    component: "Button",
                    text: "移除",
                    onClick: () => {
                      row.remove();
                      that._onValueChange();
                    },
                  },
                ],
              };
            },
          },
        ];
      }
      this.setProps({
        control: {
          children: Component.extendProps(gridProps, {
            component: Grid,
            columns: columns,
            data: value,
            line: "both",
            rowDefaults: { component: GroupGridTr },
            onCreated: ({ inst }) => {
              that.grid = inst;
              inst.groupGrid = that;
            },
          }),
        },
        controlAction: [
          {
            component: "Button",
            type: "dashed",
            text: "添加",
            span: 12,
            block: true,
            onClick: () => {
              that.addGroup();
            },
            hidden: that.props.hideAction,
          },
        ],
      });
      super._config();
    }
    getValue(options) {
      const { valueOptions } = this.props;
      const opts = extend$1(
        { ignoreDisabled: true, ignoreHidden: true, merge: false },
        valueOptions,
        options
      );
      const value = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.getValue) {
          const fieldValue = field.getValue(opts);
          value.push(fieldValue);
        }
      }
      return value;
    }
    setValue(value, options) {
      if (Array.isArray(value)) {
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i];
          if (field.setValue) {
            field.setValue(value[i], options);
          }
        }
      }
    }
    validate() {
      const invalids = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i],
          { disabled, hidden } = field.props;
        if (!(disabled || hidden) && field.validate) {
          const valResult = field.validate(true);
          if (valResult !== true) {
            invalids.push(field);
          }
        }
      }
      if (invalids.length > 0) {
        invalids[0]._focusInvalid();
      }
      return invalids.length === 0;
    }
    getField(fieldName) {
      if (typeof fieldName === "string") {
        // Handle nested keys, e.g., "foo.bar" "foo[1].bar" "foo[key].bar"
        const parts = fieldName.split(".");
        let curField = this;
        if (parts.length) {
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            curField = curField._getSubField(part);
            if (!curField) {
              break;
            }
          }
        }
        return curField;
      }
    }
    _getSubField(fieldName) {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.name === fieldName) {
          return field;
        }
      }
      return null;
    }
    focus() {}
    addGroup() {
      const gridData = this.grid.props.data || [];
      const { addDefaultValue } = this.props;
      let rowData = isFunction(addDefaultValue)
        ? addDefaultValue.call(this)
        : addDefaultValue;
      if (!rowData) {
        rowData = this.props.groupDefaults.fields.map((n) => {
          const item = {};
          item[n.name] = null;
          return item;
        });
      }
      gridData.length === 0
        ? this.grid.update({ data: [rowData] })
        : this.grid.appendRow({ data: rowData });
      this._onValueChange();
    }
    _clear() {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.setValue) {
          field.setValue(null);
        }
      }
    }
  }
  GroupGrid.defaults = { hideAction: false };
  Object.defineProperty(GroupGrid.prototype, "fields", {
    get: function () {
      return this.grid.getRows();
    },
  });
  Component.register(GroupGrid);
  class GroupList extends Group {
    constructor(props, ...mixins) {
      super(Component.extendProps(GroupList.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.extGroupDefaults = null;
    }
    _config() {
      const that = this;
      const { groupDefaults, value, disabled } = this.props;
      const actionRender = groupDefaults.actionRender || null;
      this.extGroupDefaults = Component.extendProps(groupDefaults, {
        _config: function () {
          const group = this;
          if (isFunction(actionRender)) {
            this.setProps({
              action: actionRender({ group: group, groupList: that }),
            });
          } else {
            this.setProps({
              action: [
                {
                  component: "Button",
                  text: "移除",
                  disabled: disabled,
                  onClick: () => {
                    that.removeGroup(group);
                  },
                },
              ],
            });
          }
        },
      });
      const groups = [];
      if (Array.isArray(value)) {
        value.forEach(function (item) {
          groups.push(
            Component.extendProps(that.extGroupDefaults, { value: item })
          );
        });
      }
      this.setProps({
        fields: groups,
        fieldDefaults: that.extGroupDefaults,
        controlAction: [
          {
            component: "Button",
            type: "dashed",
            text: "添加",
            span: 12,
            block: true,
            disabled: disabled,
            onClick: () => {
              that.addGroup();
            },
            hidden: that.props.hideAction,
          },
        ],
      });
      super._config();
    }
    getValue(options) {
      const { valueOptions } = this.props;
      const opts = extend$1(
        { ignoreDisabled: true, ignoreHidden: true, merge: false },
        valueOptions,
        options
      );
      const value = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.getValue) {
          const fieldValue = field.getValue(opts);
          value.push(fieldValue);
        }
      }
      return value;
    }
    setValue(value, options) {
      if (Array.isArray(value)) {
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i];
          if (field.setValue) {
            field.setValue(value[i], options);
          }
        }
      }
    }
    addGroup() {
      const { addDefaultValue } = this.props;
      this.extGroupDefaults.value = isFunction(addDefaultValue)
        ? addDefaultValue.call(this)
        : addDefaultValue;
      this.appendField(this.extGroupDefaults);
      this._onValueChange();
    }
    removeGroup(group) {
      group.remove();
      this._onValueChange();
    }
  }
  GroupList.defaults = {
    fieldDefaults: { component: Group },
    hideAction: false,
  };
  Component.register(GroupList);
  class Image extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Image.defaults, props), ...mixins);
    }
    _created() {}
    _config() {
      const { alt, width, height, iconWidth, iconHeight } = this.props;
      const size = this._sizeComputing([iconWidth, iconHeight]);
      this.setProps({
        children: [
          {
            component: "Icon",
            ref: (c) => {
              this.pendingRef = c;
            },
            classes: { "nom-image-pending": true },
            type: "image-pending",
            attrs: {
              style: {
                width: `${iconWidth}px`,
                height: `${iconHeight}px`,
                "font-size": `${size < 3 ? 3 : size}rem`,
              },
            },
          },
          {
            tag: "img",
            ref: (c) => {
              this.imgRef = c;
            },
            hidden: true,
            attrs: {
              alt,
              style: {
                width: isNumeric(width) ? `${width}px` : width,
                height: isNumeric(height) ? `${height}px` : height,
              },
            },
          },
        ],
      });
    }
    _sizeComputing(arry) {
      return parseInt(Math.min(...arry) / 22, 10);
    }
    _loadImageAsync(url) {
      return new Promise((resolve, reject) => {
        const image = this.imgRef.element;
        image.onload = () => resolve(url);
        image.onerror = () => reject();
        this.imgRef.element.src = url;
      });
    }
    _dealImageList(urlList) {
      let success = false;
      return new Promise((resolve, reject) => {
        const queueNext = (url) => {
          return this._loadImageAsync(url).then(() => {
            success = true;
            resolve(url);
          });
        };
        const firstPromise = queueNext(urlList.shift() || ""); // 生成一条promise链[队列]，每一个promise都跟着catch方法处理当前promise的失败
        // 从而继续下一个promise的处理
        urlList
          .reduce((p, url) => {
            return p.catch(() => {
              if (!success) return queueNext(url);
            });
          }, firstPromise) // 全都挂了 reject
          .catch(reject);
      });
    }
    _rendered() {
      let urlList = [];
      if (!Array.isArray(this.props.src)) {
        urlList = [this.props.src];
      } else {
        urlList = this.props.src;
      }
      this._dealImageList(urlList)
        .then(() => {
          this.pendingRef.remove();
          this.imgRef.show();
        })
        .catch(() => {
          this.pendingRef.update({
            classes: { "nom-image-fail": true },
            type: "image-fail",
          });
          this.imgRef.remove();
        });
    }
  }
  Image.defaults = {
    src: null,
    alt: null,
    width: null,
    height: null,
    iconWidth: 200,
    iconHeight: 100,
  };
  Component.register(Image);
  class MaskInfo extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(MaskInfo.defaults, props), ...mixins);
    }
    _created() {
      this.originText = this.props.text;
      this.showText = "";
    }
    _config() {
      const { text, type, icon } = this.props;
      const that = this;
      if (this.props.mask === true) {
        this.showText = MaskInfo.format({ value: text, type: type });
      } else {
        this.showText = this.props.text;
      }
      let textNode = null;
      if (icon) {
        textNode = { tag: "span", children: this.showText };
      } else if (!this.props.mask) {
        textNode = { tag: "span", children: this.showText };
        if (that.tooltip) {
          that.tooltip.remove();
          delete that.tooltip;
        }
      } else {
        textNode = {
          tag: "span",
          children: this.showText,
          onClick: () => {
            that.handleClick();
          },
        };
      }
      const children = [
        this.props.mask &&
          !!icon &&
          this.props.text &&
          this.props.toggle &&
          Component.normalizeIconProps({
            type: "eye",
            onClick: function () {
              that.handleClick();
            },
          }),
        textNode,
      ];
      this.setProps({
        children: this.props.text ? children : this.props.empty,
      });
    }
    _rendered() {
      if (this.props.mask && !this.props.icon && this.props.toggle) {
        this.tooltip = new nomui.Tooltip({
          trigger: this,
          children: "点击显示完整信息",
        });
      }
    }
    handleClick() {
      // this.props.mask = false
      this.update({ mask: false, attrs: { title: this.props.text } });
    }
    static format(data) {
      const { value, type } = data;
      if (!value) {
        return "";
      }
      if (value === "NA" || value === "") {
        return value;
      }
      let newText = ""; // 手机号
      if (type === "mobile") {
        newText = value.replace(/(\d{1,3})(\d{4})(\d+)/g, "$1****$3");
      } // 电话号码
      else if (type === "phone") {
        newText = value.replace(/(\d+)(\d{4})/g, "$1*****");
      } // 传真号码
      else if (type === "fax") {
        newText = value.replace(/(\d+)(\d{4})/g, "$1*****");
      } // 邮箱
      else if (type === "mail" || type === "email") {
        let strend;
        if (value.indexOf("@") < 5) {
          strend = value.substring(1, value.lastIndexOf("@") - 1);
        } else {
          strend = value.substring(2, value.lastIndexOf("@") - 2);
        }
        newText = value.replace(strend, "***");
      } // 银行卡
      else if (type === "card") {
        const strend = value.substring(0, value.length - 4);
        newText = value.replace(strend, "************");
      } // 身份证
      else if (type === "identity") {
        newText = value.replace(/(\d{4}).*(\w{3})/gi, "$1***********$2");
      } // 姓名
      else if (type === "name") {
        const strend = value.substring(0, value.length - 1);
        let star = "";
        for (let i = 0; i < strend.length; i++) {
          star += "*";
        }
        newText = value.replace(strend, star);
      } // 中间
      else if (type === "middle") {
        if (value.length <= 4) {
          newText = "****";
        } else if (value.length > 4 && value.length <= 8) {
          const strend = value.substring(value.length - 4, value.length);
          newText = `****${strend}`;
        } else {
          const strend = value.substring(0, value.length - 8);
          const strend2 = value.substring(value.length - 4, value.length);
          newText = `${strend}****${strend2}`;
        }
      } // 其他
      else if (!type || type === "other") {
        if (value.length > 4) {
          const strend = value.substring(0, value.length - 4);
          newText = `${strend}****`;
        } else {
          newText = "";
          for (let i = 0; i < value.length; i++) {
            newText += "*";
          }
        }
      }
      return newText;
    }
  }
  MaskInfo.defaults = {
    tag: "span",
    type: null,
    text: null,
    mask: true,
    icon: true,
    empty: null,
    showTitle: true,
    toggle: true,
  };
  Component.register(MaskInfo);
  class MaskInfoField extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(MaskInfoField.defaults, props), ...mixins);
    }
    _config() {
      const {
        tag,
        type,
        text,
        mask,
        icon,
        empty,
        showTitle,
        toggle,
      } = this.props;
      this.setProps({
        control: {
          children: {
            component: "MaskInfo",
            tag,
            type,
            text: this.props.value || text,
            mask,
            icon,
            empty,
            showTitle,
            toggle,
          },
        },
      });
      super._config();
    }
    _setValue(value) {
      this.update({ value });
    }
    _getValue() {
      return this.props.value;
    }
  }
  MaskInfoField.defaults = { value: null, toggle: true };
  Component.register(MaskInfoField);
  class MenuItem extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "a",
        url: null,
        icon: null,
        text: null,
        subtext: null,
        indicator: {
          component: "Icon",
          expandable: {
            expandedProps: { type: "up" },
            collapsedProps: { type: "down" },
          },
          type: "down",
        },
        tools: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.wrapper = this.parent;
      this.wrapper.item = this;
      this.menu = this.wrapper.menu;
      this.level = this.wrapper.level;
      this.isLeaf = this.wrapper.isLeaf;
      this.menu.itemRefs[this.key] = this;
      this.parentItem = null;
      if (this.wrapper.parentWrapper) {
        this.parentItem = this.wrapper.parentWrapper.item;
      }
      this.handleSelect = this.handleSelect.bind(this);
    }
    _config() {
      const { menu } = this;
      const { onSelect, onUnselect } = this.props;
      const menuProps = menu.props;
      let tools = null;
      if (this.wrapper.props.item.toolsRender) {
        tools = this.wrapper.props.item.toolsRender(this, menu);
        tools.onClick = (args) => {
          args.event.stopPropagation();
        };
      }
      let indicatorIconType = menuProps.compact ? "right" : "down";
      if (menuProps.direction === "horizontal" && this.level > 0) {
        indicatorIconType = "right";
      }
      if (menuProps.direction === "horizontal") {
        this.setProps({ indicator: { expandable: false } });
      } else {
        this.props.indicator.expandable.collapsedProps = indicatorIconType;
      }
      this.setProps({
        indicator: {
          type: indicatorIconType,
          classes: { "nom-menu-toggler": true },
          attrs: { style: { "padding-left": ".5rem" } },
          _created() {
            this.parent.indicator = this;
          },
        },
        selectable: { byClick: menuProps.itemSelectable.byClick },
        expandable: {
          byClick: !this.isLeaf && !menuProps.compact,
          target: function () {
            return this.wrapper.submenu;
          },
        },
        attrs: {
          href: this.getItemUrl(this.props.url),
          style: {
            paddingLeft:
              menuProps.direction === "vertical" && !menuProps.compact
                ? `${(this.level + 1) * menuProps.indent}rem`
                : null,
          },
        },
        onSelect: () => {
          if (menu.selectedItem !== null) menu.selectedItem.unselect();
          menu.selectedItem = this;
          menu.expandedRoot = this.wrapper.rootWrapper;
          menu.selectedItemKey = this.key;
          menuProps.compact && this.wrapper.rootWrapper.item.expand();
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          if (menu.selectedItem === this) menu.selectedItem = null;
          this._callHandler(onUnselect);
        },
      });
      if (menuProps.itemSelectable.onlyleaf === true && this.isLeaf === false) {
        this.setProps({ selectable: false });
      }
      this.setProps({
        children: [
          this.props.icon && {
            component: "Icon",
            type: this.props.icon,
            classes: { "nom-menu-item-icon": true },
          },
          {
            component: Component,
            tag: menuProps.compact ? "div" : "span",
            classes: { text: true, "nom-menu-item-title": true },
            attrs: {
              style: { "flex-grow": this.props.subtext ? null : "2" },
              title: this.props.text,
            },
            children: this.props.text,
          },
          this.props.subtext && {
            component: Component,
            tag: "span",
            classes: { subtext: true },
            attrs: { style: { "flex-grow": "2" } },
            children: this.props.subtext,
          },
          menu.props.direction !== "horizontal" && tools && tools,
          this.props.indicator && !this.isLeaf && this.props.indicator,
        ],
      });
    }
    _rendered() {
      if (this.props.selected) {
        this.list.selectedItem = this;
      }
    }
    handleSelect() {}
    _collapse() {
      this.indicator && this.indicator.collapse();
      if (this.menu.props.itemExpandable.expandSingle === true) {
        this.wrapper.parent.expandedChildItem = null;
      }
    }
    _expand() {
      this.indicator && this.indicator.expand();
      if (this.menu.props.itemExpandable.expandSingle === true) {
        if (this.wrapper.parent.expandedChildItem) {
          this.wrapper.parent.expandedChildItem.collapse();
        }
        this.wrapper.parent.expandedChildItem = this;
      }
    }
    getItemUrl(url) {
      if (url) {
        return url;
      }
      return "javascript:void(0);";
    }
  }
  Component.register(MenuItem);
  class MenuSub extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "ul", itemDefaults: { component: "menu-item" } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.wrapper = this.props.wrapper || this.parent;
      this.wrapper.submenu = this;
      this.menu = this.wrapper.menu;
      this.props.itemDefaults = this.menu.props.itemDefaults;
      if (this.props.isPopup) {
        this.parent.popMenu = this;
      }
    }
    _config() {
      const that = this;
      const children =
        Array.isArray(this.props.items) &&
        this.props.items.map(function (item) {
          return {
            component: "MenuItemWrapper",
            animate: that.menu.props.animate,
            item: Component.extendProps({}, that.props.itemDefaults, item),
            items: item.items,
          };
        });
      const typeClass = `nom-menu-${this.menu.props.type}`;
      const classes = {};
      classes[typeClass] = true;
      this.setProps({ classes: classes, children: children });
    }
  }
  Component.register(MenuSub);
  class MenuItemWrapper extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "li", item: { component: MenuItem } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.isLeaf = false;
      this.level = 0;
      this.parentWrapper = null;
      if (this.parent instanceof Component.components.Menu) {
        this.menu = this.parent;
        this.rootWrapper = this;
      } else if (this.parent instanceof Component.components.MenuSub) {
        this.menu = this.parent.menu;
        this.parentWrapper = this.parent.wrapper;
        this.rootWrapper = this.parentWrapper.rootWrapper;
      }
      if (this.parentWrapper) {
        this.level = this.parentWrapper.level + 1;
      }
      this.isLeaf =
        !Array.isArray(this.props.item.items) ||
        this.props.item.items.length < 1;
    }
    _config() {
      const that = this;
      const { menu } = this;
      const menuProps = menu.props;
      const expanded =
        menuProps.direction === "horizontal" ||
        menuProps.compact ||
        menuProps.itemExpandable.initExpandLevel === -1 ||
        menuProps.itemExpandable.initExpandLevel > this.level;
      this.setProps({ submenu: menuProps.submenu });
      this.setProps({
        submenu: {
          component: MenuSub,
          name: "submenu",
          attrs: menuProps.compact
            ? {
                style: {
                  maxHeight: "calc( 100vh - 5px )",
                  "overflow-y": "auto",
                },
              }
            : {},
          items: this.props.item.items,
          hidden: !expanded,
        },
      });
      if (
        (menuProps.direction === "horizontal" || menuProps.compact) &&
        !this.isLeaf
      ) {
        let reference = document.body;
        if (this.level > 0) {
          reference = this;
        }
        let align = "bottom left";
        if (menuProps.compact) {
          align = "right top";
        }
        if (this.level > 0) {
          align = "right top";
        }
        this.setProps({ submenu: { wrapper: that } });
        this.setProps({
          item: {
            popup: {
              animate: this.props.animate,
              triggerAction: "hover",
              align: align,
              reference: reference,
              children: Object.assign({}, this.props.submenu, {
                isPopup: true,
                classes: { "nom-menu-popup-sub": true },
              }),
              onShow: () => {
                this.onPopupMenuShow();
              },
            },
          },
        });
      }
      this.setProps({
        children: [
          this.props.item,
          !this.isLeaf &&
            menuProps.direction === "vertical" &&
            !menuProps.compact &&
            this.props.submenu,
        ],
      });
    }
    onPopupMenuShow() {
      if (
        this.menu.selectedItemKey &&
        this.menu.expandedRoot === this.rootWrapper
      ) {
        this.submenu &&
          this.menu.getItem(this.menu.selectedItemKey) &&
          this.menu.getItem(this.menu.selectedItemKey).select();
        if (this.menu.getItem(this.menu.selectedItemKey) === null) {
          console.warn(`Could not find the item with specific key.`);
        }
      }
    }
  }
  Component.register(MenuItemWrapper);
  class Menu extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Menu.defaults, props), ...mixins);
    }
    _created() {
      this.itemRefs = [];
      this.selectedItem = null;
      this.selectedItemKey = null;
      this.expandedRoot = null;
    }
    _config() {
      this._addPropStyle("direction");
      if (this.props.direction !== "vertical") {
        this.setProps({ compact: false });
      }
      const that = this;
      const children = this.props.items.map(function (item) {
        if (!item) {
          return;
        }
        if (
          (item.type && item.type.toLowerCase() === "divider") ||
          (item.component && item.component === "Divider")
        ) {
          return { tag: "li", classes: { "nom-menu-divider": true } };
        }
        return {
          component: MenuItemWrapper,
          animate: that.props.animate,
          item: Component.extendProps({}, that.props.itemDefaults, item),
        };
      });
      this.setProps({
        classes: { "nom-menu-compact": this.props.compact },
        children: children,
      });
    }
    getItem(param) {
      let retItem = null;
      if (param instanceof Component) {
        return param;
      }
      if (isFunction(param)) {
        for (const key in this.itemRefs) {
          if (this.itemRefs.hasOwnProperty(key)) {
            if (param.call(this.itemRefs[key]) === true) {
              retItem = this.itemRefs[key];
              break;
            }
          }
        }
      } else {
        return this.itemRefs[param] || null;
      }
      return retItem;
    }
    selectItem(param, selectOption) {
      const item = this.getItem(param);
      if (item === null || item === undefined) {
        return false;
      }
      item.select(selectOption);
      selectOption && selectOption.scrollIntoView && this.scrollTo(item);
      return item;
    }
    selectToItem(param) {
      if (this.props.compact) {
        const target = this.getRootItem(param);
        if (target === null) {
          console.warn(`Could not find the item with specific key.`);
          return;
        }
        this.getItem(target).expand();
        this.scrollTo(target);
        this.expandedRoot = this.getItem(target).wrapper;
        this.selectedItemKey = param;
      } else {
        this.expandToItem(param);
        this.selectItem(param);
        this.scrollTo(param);
      }
    }
    getRootItem(param) {
      const arr = this.props.items.filter((n) => {
        return JSON.stringify(n).includes(`"${param}"`);
      });
      if (arr.length) {
        const rootItem = arr[0][this.props.keyField];
        return this.itemRefs[rootItem];
      }
      return null;
    }
    unselectItem(param, unselectOption) {
      unselectOption = extend$1(
        { triggerUnselect: true, triggerSelectionChange: true },
        unselectOption
      );
      const item = this.getItem(param);
      if (item === null) {
        return false;
      }
      return item.unselect(unselectOption);
    }
    getSelectedItem() {
      return this.selectedItem;
    }
    expandToItem(param) {
      const item = this.getItem(param);
      if (item !== null) {
        let p = item.parentItem;
        while (p) {
          p.expand();
          p = p.parentItem;
        }
      }
    }
    scrollTo(
      param,
      scrollToOptions = { behavior: "smooth", scrollMode: "if-needed" }
    ) {
      const item = this.getItem(param);
      if (item && item.wrapper) {
        scrollIntoView(item.wrapper.element, scrollToOptions);
      }
    }
    scrollToSelected() {
      if (this.selectedItem) {
        this.scrollTo(this.selectedItem);
      }
    }
    _rendered() {
      super._rendered();
      this.scrollToSelected();
    }
  }
  Menu.defaults = {
    tag: "ul",
    items: [],
    itemDefaults: { component: MenuItem },
    itemSelectable: { onlyleaf: false, byClick: false },
    itemExpandable: { expandSingle: true, initExpandLevel: 0 },
    compact: false,
    indent: 1.5,
    direction: "vertical",
    keyField: "key",
  };
  Component.register(Menu);
  class Message extends Layer {
    constructor(props, ...mixins) {
      super(Component.extendProps(Message.defaults, props), ...mixins);
    }
    _config() {
      this._addPropStyle("type");
      const iconMap = {
        info: "info-circle",
        success: "check-circle",
        error: "close-circle",
        warning: "exclamation-circle",
      };
      const icon = this.props.icon || iconMap[this.props.type];
      let iconProps = Component.normalizeIconProps(icon);
      if (iconProps) {
        iconProps = Component.extendProps(iconProps, {
          classes: { "nom-message-icon": true },
        });
      }
      this.props.content = Component.normalizeTemplateProps(this.props.content);
      this.setProps({
        classes: { "nom-message-popup": !!this.props.position },
        content: { classes: { "nom-message-content": true } },
      });
      this.setProps({ children: [iconProps, this.props.content] });
      super._config();
    }
    close() {
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.remove();
    }
    animateHide() {
      if (!this.element) return false;
      this.addClass("nom-layer-animate-hide");
      setTimeout(() => {
        if (!this.element) return false;
        this.remove();
      }, 90);
    }
    _rendered() {
      const that = this;
      const { props } = this;
      if (props.duration) {
        setTimeout(function () {
          that.close();
        }, 1000 * props.duration);
      }
    }
  }
  Message.defaults = {
    type: null,
    icon: null,
    content: null,
    duration: 2,
    closeToRemove: true,
    position: { my: "center center", at: "center center", of: window },
  };
  Component.register(Message); // Thanks to https://github.com/andreypopp/react-textarea-autosize/
  /**
   * calculateNodeHeight(uiTextNode)
   */ const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;
  const SIZING_STYLE = [
    "letter-spacing",
    "line-height",
    "padding-top",
    "padding-bottom",
    "font-family",
    "font-weight",
    "font-size",
    "font-variant",
    "text-rendering",
    "text-transform",
    "width",
    "text-indent",
    "padding-left",
    "padding-right",
    "border-width",
    "box-sizing",
  ];
  let hiddenTextarea;
  function calculateNodeStyling(node) {
    const style = window.getComputedStyle(node);
    const boxSizing =
      style.getPropertyValue("box-sizing") ||
      style.getPropertyValue("-moz-box-sizing") ||
      style.getPropertyValue("-webkit-box-sizing");
    const paddingSize =
      parseFloat(style.getPropertyValue("padding-bottom")) +
      parseFloat(style.getPropertyValue("padding-top"));
    const borderSize =
      parseFloat(style.getPropertyValue("border-bottom-width")) +
      parseFloat(style.getPropertyValue("border-top-width"));
    const sizingStyle = SIZING_STYLE.map(
      (name) => `${name}:${style.getPropertyValue(name)}`
    ).join(";");
    const nodeInfo = { sizingStyle, paddingSize, borderSize, boxSizing };
    return nodeInfo;
  }
  function calculateNodeHeight(uiTextNode, minRows = null, maxRows = null) {
    if (!hiddenTextarea) {
      hiddenTextarea = document.createElement("textarea");
      hiddenTextarea.setAttribute("tab-index", "-1");
      hiddenTextarea.setAttribute("aria-hidden", "true");
      document.body.appendChild(hiddenTextarea);
    } // Fix wrap="off" issue
    // https://github.com/ant-design/ant-design/issues/6577
    if (uiTextNode.getAttribute("wrap")) {
      hiddenTextarea.setAttribute("wrap", `${uiTextNode.getAttribute("wrap")}`);
    } else {
      hiddenTextarea.removeAttribute("wrap");
    } // Copy all CSS properties that have an impact on the height of the content in
    // the textbox
    const {
      paddingSize,
      borderSize,
      boxSizing,
      sizingStyle,
    } = calculateNodeStyling(uiTextNode); // Need to have the overflow attribute to hide the scrollbar otherwise
    // text-lines will not calculated properly as the shadow will technically be
    // narrower for content
    hiddenTextarea.setAttribute(
      "style",
      `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`
    );
    hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || "";
    let minHeight = Number.MIN_SAFE_INTEGER;
    let maxHeight = Number.MAX_SAFE_INTEGER;
    let height = hiddenTextarea.scrollHeight;
    let overflowY;
    if (boxSizing === "border-box") {
      // border-box: add border, since height = content + padding + border
      height += borderSize;
    } else if (boxSizing === "content-box") {
      // remove padding, since height = content
      height -= paddingSize;
    }
    if (minRows !== null || maxRows !== null) {
      // measure height of a textarea with a single row
      hiddenTextarea.value = " ";
      const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
      if (minRows !== null) {
        minHeight = singleRowHeight * minRows;
        if (boxSizing === "border-box") {
          minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
      }
      if (maxRows !== null) {
        maxHeight = singleRowHeight * maxRows;
        if (boxSizing === "border-box") {
          maxHeight = maxHeight + paddingSize + borderSize;
        }
        overflowY = height > maxHeight ? "" : "hidden";
        height = Math.min(maxHeight, height);
      }
    }
    return {
      height: `${height}px`,
      minHeight: `${minHeight}px`,
      maxHeight: `${maxHeight}px`,
      overflowY: overflowY ? `${overflowY}px` : undefined,
      resize: "none",
    };
  }
  class Textarea extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "textarea",
        attrs: { autocomplete: "off" },
        autoSize: false, // boolean|{minRows:number,maxRows:number}
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.multilineTextbox = this.parent;
      this.multilineTextbox.textarea = this;
      this.capsLock = false;
    }
    _config() {
      this.setProps({
        attrs: {
          oninput: () => {
            if (!this.capsLock) {
              this.multilineTextbox._onValueChange();
            }
            this.resizeTextarea();
          },
          onblur: () => {
            this.multilineTextbox.onblur();
          },
          oncompositionstart: () => {
            this.capsLock = true;
          },
          oncompositionend: () => {
            this.capsLock = false;
            this.element.dispatchEvent(new Event("input"));
          },
        },
      });
      if (this.props.readonly) {
        this.setProps({ attrs: { readonly: true } });
      }
    }
    _rendered() {
      if (this.multilineTextbox.props.autofocus === true) {
        this.focus();
      }
      this.resizeTextarea();
    }
    _remove() {
      cancelAnimationFrame && cancelAnimationFrame(this.resizeFrameId);
    }
    resizeTextarea() {
      const { autoSize } = this.props;
      if (!autoSize && this.element) {
        return;
      }
      cancelAnimationFrame && cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = requestAnimationFrame(() => {
        // TODO 需要修改为  updateStyles
        this._setStyle({ overflow: "hidden" });
        const { minRows, maxRows } = autoSize;
        const textareaStyles = calculateNodeHeight(
          this.element,
          minRows,
          maxRows
        ); // TODO 需要修改为  updateStyles
        this._setStyle(Object.assign({ overflow: "inherit" }, textareaStyles));
        this.fixFirefoxAutoScroll();
      });
    } // https://github.com/ant-design/ant-design/issues/21870
    fixFirefoxAutoScroll() {
      try {
        if (document.activeElement === this.element) {
          const currentStart = this.element.selectionStart;
          const currentEnd = this.element.selectionEnd;
          this.element.setSelectionRange(currentStart, currentEnd);
        }
      } catch (e) {
        // Fix error in Chrome:
        // Failed to read the 'selectionStart' property from 'HTMLInputElement'
        // http://stackoverflow.com/q/21177489/3040605
      }
    }
    getText() {
      return this.element.value;
    }
    setText(text) {
      this.element.value = text;
    }
    focus() {
      this.element.focus();
    }
    blur() {
      this.element.blur();
    }
    disable() {
      this.element.setAttribute("disabled", "disabled");
    }
    enable() {
      this.element.removeAttribute("disabled", "disabled");
    }
  }
  Component.register(Textarea);
  class MultilineTextbox extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(MultilineTextbox.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const {
        autoSize,
        value,
        placeholder,
        autofocus,
        readonly,
        rows,
      } = this.props;
      const maxlength = this.props.maxlength || this.props.maxLength;
      this.setProps({
        control: {
          children: {
            component: Textarea,
            autoSize: readonly || autoSize,
            readonly,
            attrs: { value, placeholder, autofocus, rows, maxlength },
            _created: function () {
              this.multilineTextbox = that;
              this.multilineTextbox.textarea = this;
            },
          },
        },
      });
      super._config();
    }
    getText() {
      return this.textarea.getText();
    }
    _getValue() {
      const inputText = this.getText();
      if (inputText === "") {
        return null;
      }
      return inputText;
    }
    _setValue(value, options) {
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      this.textarea.setText(value);
      const newValue = this.getValue();
      if (options.triggerChange) {
        if (newValue !== this.oldValue) {
          super._onValueChange();
        }
      }
      this.oldValue = this.currentValue;
      this.currentValue = newValue;
    }
    onblur() {
      this._callHandler(this.props.onBlur, { value: this.getValue() });
    }
    focus() {
      this.textarea.focus();
    }
    blur() {
      this.textarea.blur();
    }
    _disable() {
      this.textarea.disable();
    }
    _enable() {
      this.textarea.enable();
    }
  }
  MultilineTextbox.defaults = {
    autofocus: false,
    autoSize: false, // boolean|{minRows:number,maxRows:number}
    placeholder: null,
    value: null,
    maxlength: null,
    rows: null,
    readonly: false,
  };
  Component.register(MultilineTextbox);
  class NavbarCaption extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaption);
  class NavbarCaptionAfter extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaptionAfter);
  class NavbarCaptionBefore extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaptionBefore);
  class NavbarNav extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarNav);
  class NavbarTools extends Component {
    // constructor(props, ...mixins) {
    //     super(props, ...mixins)
    // }
  }
  Component.register(NavbarTools);
  class Navbar extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Navbar.defaults, props), ...mixins);
    }
    config() {
      this._addPropStyle("fit");
      const { caption, nav, tools, captionBefore, captionAfter } = this.props;
      let toolsProps, captionBeforeProps, captionAfterProps;
      const captionProps = caption
        ? Component.extendProps({ component: Caption, titleLevel: 3 }, caption)
        : null;
      const navProps = nav
        ? Component.extendProps({ component: Cols }, nav)
        : null;
      if (Array.isArray(tools)) {
        toolsProps = { component: Cols, items: tools };
      } else if (isPlainObject(tools)) {
        toolsProps = Component.extendProps({ component: Cols }, tools);
      }
      if (Array.isArray(captionBefore)) {
        captionBeforeProps = { component: Cols, items: captionBefore };
      } else if (isPlainObject(tools)) {
        captionBeforeProps = Component.extendProps(
          { component: Cols },
          captionBefore
        );
      }
      if (Array.isArray(captionAfter)) {
        captionAfterProps = { component: Cols, items: captionAfter };
      } else if (isPlainObject(tools)) {
        captionAfterProps = Component.extendProps(
          { component: Cols },
          captionAfter
        );
      }
      this.setProps({
        children: [
          captionBeforeProps && {
            component: NavbarCaptionBefore,
            children: captionBeforeProps,
          },
          captionProps && { component: NavbarCaption, children: captionProps },
          captionAfterProps && {
            component: NavbarCaptionAfter,
            children: captionAfterProps,
          },
          navProps && { component: NavbarNav, children: navProps },
          toolsProps && { component: NavbarTools, children: toolsProps },
        ],
      });
    }
  }
  Navbar.defaults = { caption: null, nav: null, tools: null };
  Component.register(Navbar);
  class NotificationContent extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        title: null,
        description: null, // type:null,
        // icon:'',
        // closeIcon: 'close',
        btn: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { title, description, type, btn, closeIcon, onClose } = this.props;
      let { icon } = this.props;
      const iconMap = {
        info: "info-circle",
        success: "check-circle",
        error: "close-circle",
        warning: "exclamation-circle",
      };
      icon = icon || iconMap[type];
      const iconProps = icon
        ? Component.extendProps(Component.normalizeIconProps(icon), {
            classes: { "nom-notification-icon": true },
          })
        : null;
      const titleProps = title
        ? Component.extendProps(Component.normalizeTemplateProps(title), {
            classes: { "nom-notification-title": true },
          })
        : null;
      const closeIconProps = Component.extendProps(
        Component.normalizeTemplateProps({
          component: "Button",
          icon: closeIcon,
          styles: { border: "none" },
          onClick: function () {
            onClose();
          },
        }),
        { classes: { "nom-notification-close": true } }
      );
      const headerProps = {
        component: "Cols",
        justify: "between",
        items: [titleProps, closeIconProps],
      };
      const descriptionProps = description
        ? Component.extendProps(Component.normalizeTemplateProps(description), {
            classes: { "nom-notification-description": true },
          })
        : null;
      let actionProps;
      if (btn) {
        const okButtonProps = {
          component: Button,
          styles: { color: "primary" },
          size: "small",
          text: btn.text || "知道了",
          onClick: () => {
            onClose();
          },
        };
        actionProps = {
          component: Cols,
          justify: "end",
          items: [okButtonProps],
        };
      }
      this.setProps({
        children: [
          {
            classes: { "nom-notification-body": true },
            children: [
              icon
                ? {
                    classes: { "nom-notification-body-icon": true },
                    children: iconProps,
                  }
                : undefined,
              {
                classes: { "nom-notification-body-content": true },
                children: [headerProps, descriptionProps],
              },
            ],
          },
          actionProps
            ? {
                classes: { "nom-notification-actions": true },
                children: actionProps,
              }
            : undefined,
        ],
      });
    }
  }
  class Notification extends Layer {
    // 保存Notification实例,以key为键，实例对象为值
    // /**
    //  * 全局受影响，配置默认参数
    //  * @param {*} props
    //  */
    // static configDefault(props) {
    //   Notification.NOMUI_NOTIFICATION_DEFAULTS = {
    //     ...Notification.NOMUI_NOTIFICATION_DEFAULTS,
    //     ...props,
    //   }
    // }
    constructor(props, ...mixins) {
      super(Component.extendProps(Notification.defaults, props), ...mixins);
    }
    static open(config) {
      let align = "topRight";
      if (config.align) {
        const alignInfo = config.align.toLowerCase();
        if (alignInfo.includes("top")) {
          if (alignInfo.includes("left")) {
            align = "topLeft";
          } else {
            align = "topRight";
          }
        } else if (alignInfo.includes("bottom")) {
          if (alignInfo.includes("left")) {
            align = "bottomLeft";
          } else {
            align = "bottomRight";
          }
        }
      }
      if (!Notification.NOMUI_NOTIFICATION_CONTAINER) {
        Notification.NOMUI_NOTIFICATION_CONTAINER = {
          topLeft: new nomui.Component({
            classes: {
              "nom-notification-container": true,
              "nom-notification-align-topleft": true,
            },
          }),
          topRight: new nomui.Component({
            classes: {
              "nom-notification-container": true,
              "nom-notification-align-topright": true,
            },
          }),
          bottomLeft: new nomui.Component({
            classes: {
              "nom-notification-container": true,
              "nom-notification-align-bottomleft": true,
            },
          }),
          bottomRight: new nomui.Component({
            classes: {
              "nom-notification-container": true,
              "nom-notification-align-bottomright": true,
            },
          }),
        };
      }
      const curInsance = Notification.NOMUI_NOTIFICATION_INSTANCES[config.key];
      if (!curInsance) {
        return new nomui.Notification(
          Object.assign({}, config, {
            reference: Notification.NOMUI_NOTIFICATION_CONTAINER[align],
          })
        );
      }
      curInsance.update(Object.assign({}, config));
      return curInsance;
    }
    static success(config) {
      Notification.open(Object.assign({}, config, { type: "success" }));
    }
    static error(config) {
      Notification.open(Object.assign({}, config, { type: "error" }));
    }
    static info(config) {
      Notification.open(Object.assign({}, config, { type: "info" }));
    }
    static warning(config) {
      Notification.open(Object.assign({}, config, { type: "warning" }));
    }
    static close(key) {
      if (Notification.NOMUI_NOTIFICATION_INSTANCES[key]) {
        Notification.NOMUI_NOTIFICATION_INSTANCES[key].close();
      }
    }
    _created() {
      super._created();
      this.timer = null;
      const { key } = this.props;
      Notification.NOMUI_NOTIFICATION_INSTANCES[key] = this;
    }
    _registerAutoClose(duration) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.close();
      }, duration);
    }
    _rendered() {
      const { duration } = this.props;
      const that = this;
      if (duration !== null) {
        that._registerAutoClose(duration);
        this.element.addEventListener(
          "mouseenter",
          function () {
            that.timer && clearTimeout(that.timer);
          },
          false
        );
        this.element.addEventListener(
          "mouseleave",
          function () {
            that._registerAutoClose(duration);
          },
          false
        );
      }
    }
    _registerDuritionClose() {}
    close() {
      this.timer && clearTimeout(this.timer);
      const { key } = this.props;
      delete Notification.NOMUI_NOTIFICATION_INSTANCES[key];
      this.props.onClose && this.props.onClose();
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.remove();
    }
    _config() {
      const that = this;
      this._propStyleClasses = ["type"];
      const {
        styles,
        attrs = {},
        icon,
        type,
        closeIcon,
        title,
        btn,
        description,
        align,
        animate,
      } = this.props;
      const classes = {};
      let alignInfo = "topright";
      if (align) {
        alignInfo = align.toLowerCase();
        if (alignInfo.includes("left")) {
          classes["nom-notification-animate-left-show"] = animate;
        } else if (alignInfo.includes("right")) {
          classes["nom-notification-animate-right-show"] = animate;
        }
      } else {
        classes["nom-notification-animate-right-show"] = animate;
      }
      this.setProps({
        closeToRemove: true,
        styles,
        alignInfo,
        align: null,
        alignTo: null,
        classes,
        attrs: Object.assign({}, attrs, { style: attrs.style }),
        children: {
          component: NotificationContent,
          type,
          icon,
          closeIcon,
          title,
          btn,
          description,
          onClose: () => {
            that.close();
          },
        },
      });
      super._config();
    }
    animateHide() {
      if (!this.element) return false;
      if (this.props.alignInfo.includes("left")) {
        this.addClass("nom-notification-animate-left-hide");
      } else if (this.props.alignInfo.includes("right")) {
        this.addClass("nom-notification-animate-right-hide");
      }
      setTimeout(() => {
        if (!this.element) return false;
        this.remove();
      }, 240);
    }
  }
  _defineProperty2(Notification, "NOMUI_NOTIFICATION_DEFAULTS", {
    align: "topRight",
    duration: 4500,
  });
  _defineProperty2(Notification, "NOMUI_NOTIFICATION_CONTAINER", null);
  _defineProperty2(Notification, "NOMUI_NOTIFICATION_INSTANCES", {});
  Notification.defaults = Object.assign(
    {},
    Notification.NOMUI_NOTIFICATION_DEFAULTS,
    {
      // type:'',
      closeIcon: "close", // alignTo: document.body,
      title: "",
      description: "", // btn:boolean||{text:''},
      // closeIcon:{},
      key: newGuid(), // onClose:()=>{},
    }
  );
  Component.register(Notification);
  class Numberbox extends Textbox {
    constructor(props, ...mixins) {
      super(Component.extendProps(Numberbox.defaults, props), ...mixins);
    }
    _config() {
      let { precision, maxPrecision } = this.props;
      const { limitInput } = this.props;
      if (limitInput) {
        maxPrecision = null;
      }
      if (maxPrecision) {
        precision = -1;
        this.rules.push({
          type: "regex",
          value: { pattern: `^\\d+(\\.\\d{1,${maxPrecision}})?$` },
          message: `请输入有效数字，且最多包含${maxPrecision}位小数`,
        });
      }
      if (precision === -1) {
        this.rules.push({ type: "number" });
      } // 允许输入千分位加 , 的格式的数字
      if (precision === 0) {
        this.rules.push({
          type: "regex",
          value: { pattern: /^-?(\d+|\d{1,3}(,\d{3})+)$/ },
          message: "请输入有效整数",
        });
      }
      if (precision > 0) {
        this.rules.push({
          type: "regex",
          value: {
            // 在上面的规则的基础上添加了小数部分
            pattern: `^\\-?(\\d+|\\d{1,3}(,\\d{3})+)(\\.\\d{${precision}})$`,
          },
          message: `请输入有效数字，且包含 ${precision} 位小数`,
        });
      }
      if (this.props.min) {
        this.rules.push({ type: "min", value: this.props.min });
      }
      if (this.props.max) {
        this.rules.push({ type: "max", value: this.props.max });
      }
      super._config();
    }
    _onBlur() {
      if (!this.props.limitInput || this.props.precision < 0) {
        return;
      }
      this._toFixedValue();
    }
    _toFixedValue() {
      const { precision } = this.props;
      let r = "";
      const c = this.input.getText().replace(/[^0-9,.]/gi, "");
      const i = c.indexOf(".");
      r = i > -1 ? c.substring(0, i) : c;
      if (precision > 0) {
        let dec = i > -1 ? parseFloat(c.substring(i)) : parseFloat(0);
        if (!isNumeric(dec)) {
          return;
        }
        dec = dec.toFixed(precision);
        r += dec.substring(1);
      }
      this.input.setText(r);
    }
    _getValue() {
      const { precision = -1 } = this.props;
      let numberValue = null;
      const textValue = this.input.getText().replace(/,/g, "");
      if (precision) {
        const dotCount = this._dotCount(textValue);
        if (precision >= 0 && dotCount > precision) {
          numberValue = this._toDecimal(textValue, precision);
        } else {
          numberValue = parseFloat(textValue);
        }
      } else {
        numberValue = parseFloat(textValue);
      }
      if (Number.isNaN(numberValue)) {
        numberValue = null;
      }
      return numberValue;
    }
    _setValue(value, options) {
      const { precision = -1 } = this.props;
      this.currentValue = this.getValue();
      if (precision !== null && precision !== undefined) {
        if (precision >= 0) {
          const dotCount = this._dotCount(value);
          if (dotCount > precision) {
            value = this._toDecimal(value, precision);
          }
        }
      }
      if (Number.isNaN(value)) {
        value = "";
      }
      super._setValue(value, options);
    }
    _toDecimal(val, precision, notRound) {
      if (isNullish(val)) return null;
      if (notRound === undefined) {
        notRound = false;
      }
      let f = parseFloat(val);
      if (Number.isNaN(f)) {
        return;
      }
      if (notRound === true) {
        f = Math.floor(val * Math.pow(10, 2)) / Math.pow(10, 2);
      } else {
        f = Math.round(val * Math.pow(10, 2)) / Math.pow(10, 2);
      }
      return f;
    }
    _dotCount(val) {
      val = String(val);
      const dotPos = val.indexOf(".");
      const len = val.substr(dotPos + 1).length;
      return len;
    }
    _getRawValue() {
      return this.input.getText();
    }
  }
  Numberbox.defaults = {
    min: null,
    max: null,
    precision: -1,
    maxPrecision: null,
    limitInput: false,
    allowClear: false,
  };
  Component.register(Numberbox);
  const SPINNER_POSITION = {
    left: "left",
    right: "right",
    horizontal: "horizontal",
  };
  const STYLE = {
    DECIMAL: "decimal",
    CURRENCY: "currency",
    PERCENT: "percent",
  };
  function isNil(value) {
    return value == null;
  }
  const COMMA_REG = /,/g;
  const CURRENCY_TO_VALUE_REG = /([^\d+-]*)([-]?)([\d,.]*)([^\d]*)/;
  function currencyReplacer(_match, _p1, p2, p3) {
    /*
     * US$-1,000.00
     * p1 前缀 US$
     * p2 符号 可能没有 -
     * p3 格式化数字 1,000.00
     * p4 后缀 可能没有
     *
     */ const val = `${p2}${p3}`.replace(/,/, "");
    return isNumeric(val) ? Number(val) : null;
  } // 格式化货币转数字
  function currencyToValue(curr) {
    return curr.replace(CURRENCY_TO_VALUE_REG, currencyReplacer);
  }
  function precentToValue(precent) {
    const parseStr = precent.replace(/%$/, "").replace(/,/g, "");
    return isNumeric(parseStr) ? Number(parseStr) : null;
  }
  class NumberSpinner extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(NumberSpinner.defaults, props), ...mixins);
      this._handleSpinnerIcon = this._handleSpinnerIcon.bind(this);
    }
    _config() {
      const numberSpinner = this;
      const rules = this._handleRules();
      this.setProps({ rules });
      const _this$props = this.props,
        { placeholder, align, showSpinner, value, formatter } = _this$props,
        otherProps = _objectWithoutPropertiesLoose2(_this$props, [
          "placeholder",
          "precision",
          "min",
          "max",
          "align",
          "showSpinner",
          "component",
          "reference",
          "tag",
          "ref",
          "style",
          "value",
          "formatter",
          "parser",
        ]);
      numberSpinner._initNumberFormat();
      const { left, right, horizontal } = SPINNER_POSITION;
      const inputProps = Object.assign(
        { component: Input, name: "input" },
        otherProps,
        {
          // value: isFunction(formatter) ? formatter(value) : numberSpinner._formatter.format(value),
          value: value === null ? null : numberSpinner._format(value),
          _created() {
            this.textbox = numberSpinner;
            this.textbox.input = this;
          },
          classes: {
            "spinner-input-with-left-icon":
              align === left && showSpinner === true,
            "spinner-input-with-right-icon":
              align === right && showSpinner === true,
            "spinner-input-with-double-icon":
              align === horizontal && showSpinner === true,
          },
          attrs: {
            placeholder,
            onkeydown(key) {
              if (key.keyCode === 38) {
                key.preventDefault();
                numberSpinner._handlePlus();
              } else if (key.keyCode === 40) {
                key.preventDefault();
                numberSpinner._handleMinus();
              }
            },
            onfocus() {
              const txt = this.value;
              if (txt) {
                this.selectionStart = this.value.length;
                this.selectionEnd = this.value.length;
              }
            },
            onchange() {
              const v = this.value.replace(COMMA_REG, ""); // 如果输入的内容不能解析为数字则不进行转化
              if (!isNumeric(v)) return;
              const formatterStr = isFunction(formatter)
                ? formatter(v)
                : numberSpinner._format(v);
              numberSpinner.isChange = true;
              numberSpinner.setValue(formatterStr);
            },
          },
        }
      );
      const spinner = numberSpinner._handleSpinnerIcon();
      this.setProps({ control: { children: [inputProps, ...spinner] } });
      super._config();
    }
    _getFormatValue() {
      const text = this.getText();
      if (text === "") return null;
      const { min, max } = this._getLimit();
      const { precision, parser } = this.props;
      if (isFunction(parser)) return parser(text);
      let parseString = text.toString();
      if (this.props.style === STYLE.PERCENT)
        parseString = parseString.replace(/%$/, "");
      if (this.props.style === STYLE.CURRENCY)
        parseString = parseString.replace(/^\D*/, "");
      parseString = parseString.replace(COMMA_REG, "");
      if (!isNumeric(parseString)) return null;
      const value = Number(parseString).toFixed(precision);
      if (value > max) return max;
      if (value < min) return min;
      return value;
    }
    _getValue() {
      const t = this.getText();
      if (t === "") {
        return null;
      }
      return t;
    }
    _setValue(value) {
      if (this.isChange) {
        this.input && this.input.setText(value);
        this.isChange = false;
        return;
      }
      const { max, min } = this._getLimit();
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
      const formatValue = value === null ? value : this._format(value);
      this.input && this.input.setText(formatValue);
    }
    getText() {
      return this.input.getText();
    }
    getValueText() {
      return this.input.getText();
    }
    focus() {
      this.input.focus();
    }
    blur() {
      this.input.blur();
    }
    _disable() {
      this.input.disable();
    }
    _enable() {
      this.input.enable();
    }
    _onBlur() {
      this._callHandler(this.props.onBlur);
    }
    _handleRules() {
      const { precision } = this.props;
      const rules = [];
      if (precision === -1) rules.push({ type: "number" });
      if (precision === 0) {
        rules.push({
          type: "regex",
          value: { pattern: "^(\\-|\\+)?(0|[1-9][0-9]*)$" },
          message: "请输入整数",
        });
      }
      if (this.props.precision > 0) {
        rules.push({
          type: "regex",
          value: {
            pattern: `^(\\-|\\+)?(0|[1-9][0-9]*)(\\.\\d{${this.props.precision}})$`,
          },
          message: `请输入 ${this.props.precision} 位小数`,
        });
      }
      if (this.props.min) {
        rules.push({ type: "min", value: this.props.min });
      }
      if (this.props.max) {
        rules.push({ type: "max", value: this.props.max });
      }
      return rules;
    }
    _handleSpinnerIcon() {
      const { align, showSpinner } = this.props;
      if (showSpinner === false) return [];
      const numberSpinner = this;
      const { left, right, horizontal } = SPINNER_POSITION;
      if ([left, right].includes(align)) {
        return [
          {
            // tag: 'span',
            _created(c) {
              numberSpinner.iconContainer = c;
            },
            classes: { [`nom-textbox-${align}-icon-container`]: true },
            children: [
              {
                component: "Icon",
                type: "up",
                styles: { flex: "grow" },
                onClick(args) {
                  numberSpinner._handlePlus(args);
                },
              },
              {
                component: "Icon",
                type: "down",
                styles: { flex: "grow" },
                onClick(args) {
                  numberSpinner._handleMinus(args);
                },
              },
            ],
          },
        ];
      }
      if (align === horizontal) {
        return [
          {
            component: "Icon",
            type: "down",
            classes: { "nom-textbox-left-icon-container": true },
            onClick(args) {
              numberSpinner._handleMinus(args);
            },
          },
          {
            component: "Icon",
            type: "up",
            classes: { "nom-textbox-right-icon-container": true },
            onClick(args) {
              numberSpinner._handlePlus(args);
            },
          },
        ];
      }
      return [];
    }
    _isFocus() {
      if (!this.input) return false;
      return document.activeElement === this.input.element;
    }
    _handlePlus(args) {
      if (this.props.disabled) return;
      if (args) {
        const { event } = args;
        if (event) {
          event.preventDefault && event.preventDefault();
          event.stopPropagation && event.stopPropagation();
        }
      }
      let { step } = this.props;
      const { style, parser } = this.props;
      const { max } = this._getLimit();
      if (!isNumeric(step)) {
        step = 1;
      } else {
        step = Number(step);
      }
      let value = this._getFormatValue();
      if (isNil(value)) {
        value = 0;
      }
      value = Number(value);
      if (!this._formatter) this._initNumberFormat();
      const result = value + step;
      const displayValue = this._format(result);
      let newValue = "";
      if (isFunction(parser)) {
        newValue = parser(displayValue);
      } else if (style === STYLE.CURRENCY) {
        newValue = currencyToValue(displayValue);
      } else if (style === STYLE.PERCENT) {
        // newValue = Number(displayValue.replace(COMMA_REG, ''))
        newValue = precentToValue(displayValue);
      } else {
        newValue = Number(displayValue.replace(COMMA_REG, ""));
      }
      if (newValue > max) {
        this.setValue(max);
      } else {
        this.setValue(newValue);
        if (isFunction(this.props.onStep))
          this.props.onStep(this.getValue(), { offset: step, type: "plus" });
      }
      !this._isFocus() && this.focus();
    }
    _handleMinus(args) {
      if (this.props.disabled) return;
      if (args) {
        const { event } = args;
        if (event) {
          event.preventDefault && event.preventDefault();
          event.stopPropagation && event.stopPropagation();
        }
      }
      let { step } = this.props;
      const { style, parser } = this.props;
      const { min } = this._getLimit();
      if (!isNumeric(step)) {
        step = 1;
      } else {
        step = Number(step);
      }
      let value = this._getFormatValue();
      if (isNil(value)) {
        value = 0;
      }
      value = Number(value);
      if (!this._formatter) this._initNumberFormat(); // currency 格式化之后不是数字了
      let result = value - step;
      if (result < 0 && style !== "decimal") {
        result = 0;
      }
      const displayValue = this._format(result);
      let newValue = "";
      if (isFunction(parser)) {
        newValue = parser(displayValue);
      } else if (style === STYLE.CURRENCY) {
        newValue = currencyToValue(displayValue);
      } else if (style === STYLE.PERCENT) {
        newValue = precentToValue(displayValue);
      } else {
        newValue = Number(displayValue.replace(COMMA_REG, ""));
      }
      if (newValue < min) {
        this.setValue(min);
      } else {
        this.setValue(newValue);
        if (isFunction(this.props.onStep))
          this.props.onStep(this.getValue(), { offset: step, type: "minus" });
      }
      !this._isFocus() && this.focus();
    }
    _getLimit() {
      let { max, min } = this.props;
      const { style } = this.props;
      if (isNil(max) || !isNumeric(max)) {
        max = style === STYLE.PERCENT ? 100 : Number.MAX_SAFE_INTEGER;
      }
      if (isNil(min) || !isNumeric(min)) {
        min = style === STYLE.PERCENT ? 0 : Number.MIN_SAFE_INTEGER;
      }
      return { max, min };
    }
    _initNumberFormat() {
      const { formatter, precision, style, currency } = this.props; // 如果用户提供了自定义的formatter，就不用内置的formatter了
      if (isFunction(formatter)) {
        this._format = formatter;
        return;
      }
      if (style !== STYLE.CURRENCY) {
        this._formatter = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: precision,
        });
        if (style === STYLE.DECIMAL) {
          this._format = this._formatter.format;
        } else if (style === STYLE.PERCENT) {
          this._format = function (value) {
            return `${this._formatter.format(value)}%`;
          };
        }
      } else {
        this._formatter = new Intl.NumberFormat(undefined, {
          style: STYLE.CURRENCY,
          currency,
          minimumFractionDigits: precision,
        });
        this._format = this._formatter.format;
      }
    }
  }
  NumberSpinner.defaults = {
    // min: Number.MIN_SAFE_INTEGER,
    // max: Number.MAX_SAFE_INTEGER,
    min: null,
    max: null,
    precision: 0,
    formatter: null,
    parser: null,
    step: 1,
    showSpinner: true,
    align: "right", // decimal,currency,percent
    style: STYLE.DECIMAL,
    currency: "CNY",
  };
  Component.register(NumberSpinner);
  class Pager extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Pager.defaults, props), ...mixins);
    }
    _config() {
      const pager = this;
      this._parseCacheable();
      this.setProps({
        classes: { "nom-pager-compact": this.props.compact },
        children: {
          component: "Cols",
          justify: pager.props.justify,
          items: pager._getItems(pager),
        },
      });
    }
    _getItems(pager) {
      const { itemsSort } = pager.props;
      return itemsSort.map((item) => {
        return pager[`_render${item}`](pager);
      });
    }
    _rendercount() {
      return { children: `共有数据${this.props.totalCount}条` };
    }
    _renderpages(pager) {
      return {
        component: List,
        gutter: this.props.compact ? "sm" : "sm",
        items: pager.getPageItems(),
        itemDefaults: {
          tag: "a",
          key() {
            return this.props.pageNumber;
          },
          _config: function () {
            this.setProps({ children: this.props.text });
          },
        },
        itemSelectable: { byClick: true },
        selectedItems: pager.props.pageIndex,
        onItemSelectionChange: function (e) {
          const n = e.sender.selectedItem.props.pageNumber;
          if (n < 1) {
            pager.props.pageIndex = 1;
          } else if (n > pager._getPageCount()) {
            pager.props.pageIndex = pager._getPageCount();
          } else {
            pager.props.pageIndex = n;
          }
          pager._onPageChange();
        },
      };
    }
    _rendersizes(pager) {
      return (
        !pager.props.simple && {
          component: "Select",
          showSearch: false,
          classes: { "nom-pager-select": true },
          value: pager.props.pageSize || 10,
          onValueChange: (data) => {
            pager._handleCache({ pageSize: data.newValue });
            pager.props.pageSize = data.newValue;
            pager.props.pageIndex = 1;
            pager._onPageChange(true);
          },
          allowClear: false,
          options: [
            { text: "10条/页", value: 10 },
            { text: "20条/页", value: 20 },
            { text: "30条/页", value: 30 },
            { text: "40条/页", value: 40 },
            { text: "50条/页", value: 50 },
          ],
        }
      );
    } // 缓存的处理
    _parseCacheable() {
      const _isAutoKey = this.key.startWith("__key");
      if (this.props.cacheable && this.firstRender) {
        if (_isAutoKey) {
          return console.warn(
            "Please set a unique value key of string type first"
          );
        }
        let cacheInfo = localStorage.getItem(
          `${STORAGE_KEY_PAGER_CACHEABLE}_${this.key}`
        );
        if (cacheInfo) {
          cacheInfo = JSON.parse(cacheInfo);
          this.setProps({ pageSize: cacheInfo.pageSize });
        }
      }
    }
    _handleCache(params) {
      const _isAutoKey = this.key.startWith("__key");
      if (!this.props.cacheable || _isAutoKey) return;
      localStorage.setItem(
        `${STORAGE_KEY_PAGER_CACHEABLE}_${this.key}`,
        JSON.stringify(params)
      );
    }
    _onPageChange(pageSizeChanged) {
      const params = this.getPageParams();
      if (pageSizeChanged) {
        params.pageIndex = 1;
      }
      this._callHandler(this.props.onPageChange, params);
    }
    /**
     * 极端分页的起始和结束点，取决于pageIndex 和 displayItemCount.
     * @返回 {数组(Array)}
     */ _getInterval() {
      const { props } = this;
      const { pageIndex } = props;
      const displayItemHalf = Math.floor(props.displayItemCount / 2);
      const pageCount = this._getPageCount();
      const upperLimit = pageCount - props.displayItemCount;
      const start =
        pageIndex > displayItemHalf
          ? Math.max(Math.min(pageIndex - displayItemHalf, upperLimit), 1)
          : 1;
      const end =
        pageIndex > displayItemHalf
          ? Math.min(pageIndex + displayItemHalf, pageCount)
          : Math.min(props.displayItemCount, pageCount);
      return [start, end];
    }
    _getPageCount() {
      return Math.ceil(this.props.totalCount / this.props.pageSize);
    }
    getPageParams() {
      return this.props.getPageParams.call(this);
    }
    getPageItems() {
      const items = [];
      const { props } = this;
      if (props.totalCount === 0) {
        return items;
      }
      const { pageIndex } = props;
      const pageCount = this._getPageCount(); // 产生"Previous"-链接
      if (props.texts.prev && (pageIndex > 1 || props.prevShowAlways)) {
        items.push({
          pageNumber: pageIndex - 1,
          text: props.texts.prev,
          disabled: pageIndex <= 1,
          classes: { prev: true },
        });
      }
      this._getMiddleItems(items, pageCount); // 产生 "Next"-链接
      if (props.texts.next && (pageIndex < pageCount || props.nextShowAlways)) {
        items.push({
          pageNumber: pageIndex + 1,
          text: props.texts.next,
          disabled: pageIndex >= pageCount,
          classes: { next: true },
        });
      }
      return items;
    } // 获取中间的页面展示
    _getMiddleItems(items, pageCount) {
      const { props } = this;
      const interval = this._getInterval(); // 简洁模式则不需要中间的页码
      if (!props.simple) {
        // 产生起始点
        if (interval[0] > 1 && props.edgeItemCount > 0) {
          const end = Math.min(props.edgeItemCount, interval[0] - 1);
          for (let i = 1; i <= end; i++) {
            items.push({ pageNumber: i, text: i, classes: "" });
          }
          if (props.edgeItemCount < interval[0] - 1 && props.texts.ellipse) {
            items.push({
              pageNumber: interval[0] - 1,
              text: props.texts.ellipse,
              classes: { space: true },
              space: true,
            });
          }
        } // 产生内部的那些链接
        for (let i = interval[0]; i <= interval[1]; i++) {
          items.push({ pageNumber: i, text: i, classes: "" });
        } // 产生结束点
        if (interval[1] < pageCount && props.edgeItemCount > 0) {
          if (
            pageCount - props.edgeItemCount > interval[1] &&
            props.texts.ellipse
          ) {
            items.push({
              pageNumber: interval[1] + 1,
              text: props.texts.ellipse,
              classes: { space: true },
              space: true,
            });
          }
          const begin = Math.max(
            pageCount - props.edgeItemCount + 1,
            interval[1]
          );
          for (let i = begin; i <= pageCount; i++) {
            items.push({ pageNumber: i, text: i, classes: "" });
          }
        }
      } else {
        items.push({
          pageNumber: props.pageIndex,
          text: `${props.pageIndex}/${pageCount}`,
          classes: "",
        });
      }
    }
  }
  Pager.defaults = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    displayItemCount: 5,
    edgeItemCount: 1,
    compact: false,
    simple: false, // 简洁模式，只展示总数和上一页，下一页按钮
    prevShowAlways: true,
    nextShowAlways: true,
    justify: "end",
    itemsSort: ["count", "pages", "sizes"], // 排列顺序 1.count 共xx条数据 2.分页数List 3.分页大小Select
    texts: {
      // prev: '上一页',
      // next: '下一页',
      prev: { component: "Icon", type: "prev" },
      next: { component: "Icon", type: "next" },
      ellipse: "...",
    },
    getPageParams: function () {
      const { pageIndex, pageSize } = this.props;
      let params = {};
      if (this.props.paramsType === "skiptake") {
        params = {
          skipCount: (pageIndex - 1) * pageSize,
          maxResultCount: pageSize,
        };
      } else {
        params = { pageIndex: pageIndex, pageSize: pageSize };
      }
      return params;
    },
  };
  Component.register(Pager);
  class PartialDatePicker extends Textbox {
    constructor(props, ...mixins) {
      super(
        Component.extendProps(PartialDatePicker.defaults, props),
        ...mixins
      );
    }
    _created() {
      super._created();
      this.year = null;
      this.quarter = null;
      this.month = null;
      this.week = null;
      this.hasRange = false;
      this.minSub = "00";
      this.maxSub = "60";
    }
    _config() {
      const { disabled, placeholder, animate, extraTools, mode } = this.props;
      const formatMap = {
        quarter: "$year年 $quarter季度",
        month: "yyyy-MM",
        week: "$year年 $week周",
      };
      if (!this.props.format) {
        this.props.format = formatMap[mode];
      }
      if (this.props.value) {
        this.year =
          this.props.mode === "year"
            ? this.props.value
            : this.props.value.substring(0, 4);
      }
      let extra = [];
      if (isFunction(extraTools)) {
        extra = Array.isArray(extraTools(this))
          ? extraTools(this)
          : [extraTools(this)];
      } else if (Array.isArray(extraTools)) {
        extra = extraTools;
      }
      const that = this;
      this.setProps({
        leftIcon: "calendar",
        clearProps: {
          component: "Icon",
          type: "times",
          classes: { "nom-field-clear-handler": true },
          hidden: !this.props.allowClear || this.props.disabled,
          onClick: (args) => {
            this.clearTime();
            args.event && args.event.stopPropagation();
          },
        },
        control: {
          disabled: disabled,
          placeholder: placeholder,
          popup: {
            _created: function () {
              that.popup = this;
            },
            animate,
            classes: {
              "nom-partial-date-picker-popup": true,
              "nom-partial-date-picker-popup-hasfooter": extraTools !== null,
            },
            attrs: { style: { width: "auto", minHeight: "240px" } },
            triggerAction: "click",
            onShow: () => {
              if (!that.getValue()) {
                setTimeout(() => {
                  that.yearPicker.scrollTo(new Date().format("yyyy"));
                }, 200);
              } else {
                that.activeItem();
              }
              this.hasRange && this.updateList();
            },
            onHide: () => {
              that.getValue() &&
                that.props.onChange &&
                that._callHandler(that.props.onChange, that.getValue());
            },
            children: {
              component: "Flex",
              rows: [
                {
                  component: "Cols",
                  gutter: null,
                  fills: true,
                  align: "stretch",
                  children: [
                    {
                      children: {
                        component: "List",
                        items: that._getYear(),
                        itemSelectable: {
                          multiple: false,
                          byClick: true,
                          scrollIntoView: true,
                        },
                        gutter: "xs",
                        cols: 1,
                        ref: (c) => {
                          that.yearPicker = c;
                        },
                        onItemSelectionChange: (args) => {
                          const key = args.sender.props.selectedItems;
                          that.handleYearChange(key);
                        },
                        itemDefaults: {
                          _config: function () {
                            const key = this.props.key;
                            if (key < that.minYear || key > that.maxYear) {
                              this.setProps({ disabled: true });
                            }
                          },
                        },
                      },
                    },
                    that.props.mode === "quarter" && {
                      children: {
                        component: "List",
                        items: that._getQuarter(),
                        itemSelectable: {
                          multiple: false,
                          byClick: true,
                          scrollIntoView: true,
                        },
                        gutter: "xs",
                        cols: 1,
                        ref: (c) => {
                          that.quarterPicker = c;
                          if (that.props.mode === "quarter") {
                            that.subPicker = c;
                          }
                        },
                        onItemSelectionChange: (args) => {
                          const key = args.sender.props.selectedItems;
                          that.handleQuarterChange(key);
                        },
                        itemDefaults: {
                          _config: function () {
                            const key = this.props.key;
                            if (
                              parseInt(key, 10) < parseInt(that.minSub, 10) ||
                              parseInt(key, 10) > parseInt(that.maxSub, 10)
                            ) {
                              this.setProps({ disabled: true });
                            }
                          },
                        },
                      },
                    },
                    that.props.mode === "month" && {
                      children: {
                        component: "List",
                        items: that._getMonth(),
                        itemSelectable: {
                          multiple: false,
                          byClick: true,
                          scrollIntoView: true,
                        },
                        gutter: "xs",
                        cols: 1,
                        ref: (c) => {
                          that.monthPicker = c;
                          if (that.props.mode === "month") {
                            that.subPicker = c;
                          }
                        },
                        onItemSelectionChange: (args) => {
                          const key = args.sender.props.selectedItems;
                          that.handleMonthChange(key);
                        },
                        itemDefaults: {
                          _config: function () {
                            const key = this.props.key;
                            if (
                              parseInt(key, 10) < parseInt(that.minSub, 10) ||
                              parseInt(key, 10) > parseInt(that.maxSub, 10)
                            ) {
                              this.setProps({ disabled: true });
                            }
                          },
                        },
                      },
                    },
                    that.props.mode === "week" && {
                      children: {
                        component: "List",
                        items: that.year
                          ? that._getWeek(that.year)
                          : [
                              {
                                component: "StaticText",
                                value: "请先选择年份",
                                disabled: true,
                              },
                            ],
                        itemSelectable: {
                          multiple: false,
                          byClick: true,
                          scrollIntoView: true,
                        },
                        gutter: "xs",
                        cols: 1,
                        ref: (c) => {
                          that.weekPicker = c;
                          if (that.props.mode === "week") {
                            that.subPicker = c;
                          }
                        },
                        _created: (me) => {
                          me.parent.setProps({
                            classes: { "nom-week-list": true },
                          });
                        },
                        onItemSelectionChange: (args) => {
                          const key = args.sender.props.selectedItems;
                          that.handleWeekChange(key);
                        },
                        itemDefaults: {
                          _config: function () {
                            const key = this.props.key;
                            if (
                              parseInt(key, 10) < parseInt(that.minSub, 10) ||
                              parseInt(key, 10) > parseInt(that.maxSub, 10)
                            ) {
                              this.setProps({ disabled: true });
                            }
                          },
                        },
                      },
                    },
                  ],
                },
                extra.length && {
                  component: "Flex",
                  classes: { "nom-partial-date-picker-footer": true },
                  gutter: "small",
                  cols: extra,
                },
              ],
            },
          },
        },
      });
      super._config();
    }
    _rendered() {
      if (this.props.value) {
        this.resolveValue();
      }
      if (this.props.minDate || this.props.maxDate) {
        this.resolveRange();
      }
    }
    _getYear() {
      const years = [];
      const thisYear = new Date().getFullYear();
      for (
        let i = thisYear + this.props.yearRange[1];
        i > thisYear - this.props.yearRange[0];
        i--
      ) {
        years.push({ key: `${i}`, children: `${i}年` });
      }
      return years;
    }
    _getMonth() {
      const month = [];
      const that = this;
      for (let i = 1; i < 13; i++) {
        month.push({ key: that._getDoubleDigit(i), children: `${i}月` });
      }
      return month;
    }
    _getQuarter() {
      const quarter = [];
      for (let i = 1; i < 5; i++) {
        quarter.push({ key: `${i}`, children: `${i}季度` });
      }
      return quarter;
    }
    _mapWeekData(param) {
      if (!param) return;
      const that = this; // 时间戳转年月日  参数是秒的时间戳 函数返回一个对象 对象里有年 月 日
      function yearDay(long) {
        const time = new Date(long * 1000);
        const year = `${time.getFullYear()}`;
        const month = that._getDoubleDigit(time.getMonth() + 1);
        const day = that._getDoubleDigit(time.getDate());
        const yearday = { year, month, day };
        return yearday;
      } // *为了适配后端现有周计算逻辑，改为如下逻辑：本年1月1日如果不是周一，则第一周从上一年12月XX号开始；同样如果本年12月31日不是周日，则这一周不算入本年，而算作来年第一周。
      // 计算一年中的每一周都是从几号到几号
      // 第一周为本年的第一个周日往前推七天
      // 第二周为 本年的 第一个周一 往后推到周日
      // 以此类推 再往后推52周。。。
      // 参数年份 ，函数返回一个数组，数组里的对象包含 这一周的开始日期和结束日期
      function whichWeek(year) {
        const d = new Date(parseInt(year, 10), 0, 1);
        while (d.getDay() !== 1) {
          d.setDate(d.getDate() + 1);
        }
        const arr = [];
        const longnum = d.setDate(d.getDate());
        if (longnum > +new Date(parseInt(year, 10), 0, 1)) {
          const obj = yearDay(longnum / 1000 - 86400 * 7);
          obj.last = yearDay(longnum / 1000 - 86400);
          arr.push(obj);
        }
        const oneitem = yearDay(longnum / 1000);
        oneitem.last = yearDay(longnum / 1000 + 86400 * 6);
        arr.push(oneitem);
        let lastStr;
        for (let i = 0; i < 51; i++) {
          const long = d.setDate(d.getDate() + 7);
          const obj = yearDay(long / 1000);
          obj.last = yearDay(long / 1000 + 86400 * 6);
          lastStr = long + 86400000 * 6;
          arr.push(obj);
        }
        if (lastStr < +new Date(parseInt(year, 10) + 1, 0, 1));
        else {
          arr.pop(); // arr[arr.length - 1].last = yearDay(+new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400)
        }
        return arr;
      }
      return whichWeek(param);
    }
    _getWeek(param) {
      const week = this._mapWeekData(param).map(function (item, index) {
        return {
          key: `${index + 1}`,
          firstDay: `${item.year}-${item.month}-${item.day}`,
          children: {
            component: "List",
            items: [
              { children: `${index + 1}周` },
              {
                classes: { "nom-week-subtitle": true },
                children: `(${item.year}/${item.month}/${item.day} - ${item.last.year}/${item.last.month}/${item.last.day})`,
              },
            ],
          },
        };
      });
      return week;
    }
    _getDoubleDigit(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return `${num}`;
    }
    showPopup() {
      this.popup.show();
    }
    _getValueText() {
      const val = this.getValue();
      if (!val) return "NA";
      return val;
    }
    clearTime() {
      this.year = null;
      this.quarter = null;
      this.month = null;
      this.week = null;
      this._resetLists();
      this.setValue(null);
    }
    _resetLists() {
      this.yearPicker && this.yearPicker.unselectAllItems();
      this.monthPicker && this.monthPicker.unselectAllItems();
      this.quarterPicker && this.quarterPicker.unselectAllItems();
      this.weekPicker && this.weekPicker.unselectAllItems();
    }
    handleYearChange(key) {
      this.year = key;
      let noUpdate = false;
      if (this.hasRange && this.subPicker) {
        if (this.year <= this.minYear) {
          this.minSub = this.minAfter;
          this.setValue(null);
          this.subPicker.unselectAllItems();
          noUpdate = true;
        } else {
          this.minSub = "00";
        }
        if (this.year >= this.maxYear) {
          this.maxSub = this.maxAfter;
          this.setValue(null);
          this.subPicker.unselectAllItems();
          noUpdate = true;
        } else {
          this.maxSub = "60";
        }
        this.updateList(true);
      }
      if (this.props.mode === "week") {
        this.setValue(null, { triggerChange: false });
        this.weekPicker.parent.props.hidden &&
          this.weekPicker.parent.update({ hidden: false });
        this.weekPicker.update({ items: this._getWeek(this.year) });
        this.weekPicker.unselectAllItems();
        noUpdate = true;
      }
      !noUpdate && this.updateValue();
    }
    handleQuarterChange(key) {
      this.quarter = key;
      this.updateValue();
    }
    handleMonthChange(key) {
      this.month = key;
      this.updateValue();
    }
    handleWeekChange(key) {
      this.week = key;
      this.updateValue();
    }
    updateValue() {
      const old_val = this.getValue();
      let new_val;
      switch (this.props.mode) {
        case "year": {
          new_val = this.year;
          this.year && old_val !== new_val && this.setValue(new_val);
          break;
        }
        case "quarter": {
          new_val = this.props.format
            .replace("$year", this.year)
            .replace("$quarter", this.quarter);
          this.year &&
            this.quarter &&
            old_val !== new_val &&
            this.setValue(new_val);
          break;
        }
        case "month": {
          new_val = new Date(
            `${this.year}-${
              nomui.utils.isNumeric(this.month) ? this.month : "01"
            }`
          ).format(this.props.format);
          this.year &&
            this.month &&
            old_val !== new_val &&
            this.setValue(new_val);
          break;
        }
        case "week": {
          new_val = this.props.format
            .replace("$year", this.year)
            .replace("$week", this.week);
          this.year &&
            this.week &&
            old_val !== new_val &&
            this.setValue(new_val);
          break;
        }
      }
    }
    resolveValue(value) {
      const v = value || this.getValue() || this.year;
      const strArr = v.match(/\d+/g);
      if (!strArr) {
        return;
      }
      const year = this.props.mode === "year" ? v : strArr[0];
      const after = this.props.mode === "year" ? null : Math.abs(strArr[1]);
      this.year = year;
      switch (this.props.mode) {
        case "year":
          break;
        case "quarter":
          this.quarter = `${after}`;
          break;
        case "month":
          this.month = `${after}`;
          break;
        case "week":
          this.week = `${after}`;
          break;
      }
    }
    close() {
      this.popup.hide();
    }
    resolveRange() {
      const min = this.props.minDate;
      const max = this.props.maxDate;
      if (min) {
        this.minYear = this.props.mode === "year" ? min : min.substring(0, 4);
        this.minAfter =
          this.props.mode === "year"
            ? null
            : Math.abs(parseInt(min.substring(4), 10));
        this.hasRange = true;
      }
      if (max) {
        this.maxYear = this.props.mode === "year" ? max : max.substring(0, 4);
        this.maxAfter =
          this.props.mode === "year"
            ? null
            : Math.abs(parseInt(max.substring(4), 10));
        this.hasRange = true;
      }
    }
    activeItem() {
      this.yearPicker.selectItem(this.year);
      switch (this.props.mode) {
        case "year":
          break;
        case "quarter":
          this.subPicker.selectItem(this.quarter);
          break;
        case "month":
          this.subPicker.selectItem(this.month);
          break;
        case "week":
          this.subPicker.selectItem(this.week);
          break;
      }
    }
    _setValue(value) {
      value && this.resolveValue(value);
      super._setValue(value);
    }
    updateList(noyear) {
      if (!noyear) {
        this.yearPicker.update();
      }
      this.props.mode !== "year" && this.subPicker.update();
    }
    getDateString(format) {
      if (!this.getValue()) {
        return null;
      }
      let date = null;
      switch (this.props.mode) {
        case "year":
          date = new Date(this.year);
          break;
        case "quarter":
          switch (this.quarter) {
            case "1":
              date = new Date(`${this.year}-01-01`);
              break;
            case "2":
              date = new Date(`${this.year}-04-01`);
              break;
            case "3":
              date = new Date(`${this.year}-07-01`);
              break;
            case "4":
              date = new Date(`${this.year}-10-01`);
              break;
          }
          break;
        case "month":
          date = new Date(this.getValue());
          break;
        case "week": {
          const time = this._mapWeekData(this.year)[
            parseInt(this.week, 10) - 1
          ];
          date = new Date(time.year, time.month - 1, time.day);
          break;
        }
      }
      return date.format(format || "yyyy-MM-dd");
    }
  }
  PartialDatePicker.defaults = {
    yearRange: [50, 20],
    mode: "year",
    allowClear: true,
    onChange: null,
    placeholder: "选择年份",
    value: null,
    minDate: null,
    maxDate: null,
    readonly: true,
    extraTools: null,
  };
  Component.register(PartialDatePicker);
  class PartialDateRangePicker extends Group {
    constructor(props, ...mixins) {
      super(
        Component.extendProps(PartialDateRangePicker.defaults, props),
        ...mixins
      );
    }
    _created() {
      super._created();
    }
    _config() {
      const that = this;
      const {
        allowClear,
        minDate,
        maxDate,
        yearRange,
        mode,
        required,
        requiredMessage,
        rules,
        startPickerProps,
        endPickerProps,
        disabled,
        animate,
      } = this.props;
      this.setProps({
        inline: true,
        fields: [
          Object.assign(
            {
              component: "PartialDatePicker",
              name: that.props.fieldName.start,
              ref: (c) => {
                that.startPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              animate,
              allowClear,
              minDate,
              maxDate,
              yearRange,
              mode,
              required,
              requiredMessage,
              rules,
              disabled,
            },
            startPickerProps
          ),
          { component: "StaticText", value: "-" },
          Object.assign(
            {
              component: "PartialDatePicker",
              name: that.props.fieldName.end,
              ref: (c) => {
                that.endPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              animate,
              allowClear,
              minDate,
              maxDate,
              yearRange,
              mode,
              required,
              requiredMessage,
              rules,
              disabled,
            },
            endPickerProps
          ),
        ],
      });
      super._config();
    }
    handleChange() {
      this.props.onChange && this._callHandler(this.props.onChange);
    }
    _getValueText() {
      const val = this.getValue();
      const valText = {
        start:
          val[this.props.fieldName.start] === null
            ? "NA"
            : val[this.props.fieldName.start],
        end:
          val[this.props.fieldName.end] === null
            ? "NA"
            : val[this.props.fieldName.end],
      };
      return `${valText.start} - ${valText.end}`;
    }
    checkRange(type) {
      const that = this;
      const active =
        type === this.props.fieldName.start ? this.startPicker : this.endPicker;
      const opposite =
        type === this.props.fieldName.start ? this.endPicker : this.startPicker;
      if (active.getValue()) {
        if (active.name === that.props.fieldName.start) {
          opposite.update({ minDate: active.getValue() });
          if (opposite.getValue() && opposite.getValue() < active.getValue()) {
            opposite.clearTime();
            opposite.focus();
            opposite.showPopup();
          } else if (!opposite.getValue()) {
            opposite.focus();
            that.props.autoPopupEnd && opposite.showPopup();
          }
        } else if (
          opposite.getValue() &&
          opposite.getValue() > active.getValue()
        ) {
          opposite.clearTime();
        }
      }
      if (active.getValue() && opposite.getValue()) {
        that.handleChange();
      }
    }
  }
  PartialDateRangePicker.defaults = {
    mode: "year",
    minDate: null,
    maxDate: null,
    yearRange: [50, 20],
    allowClear: true,
    onChange: null,
    fieldName: { start: "start", end: "end" },
    autoPopupEnd: true,
    flatValue: true,
    startPickerProps: { placeholder: "开始日期" },
    endPickerProps: { placeholder: "结束日期" },
  };
  Component.register(PartialDateRangePicker);
  class PasswordPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = {
        trigger: null,
        triggerAction: "click",
        align: "bottom left",
        alignOuter: true,
        closeOnClickOutside: true,
        placement: "append",
        autoRender: false,
        uistyle: "default",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
    }
    _config() {
      this.setProps({
        children: [
          "大写已开启",
          {
            ref: (c) => {
              this.arrow = c;
            },
            classes: { "nom-password-arrow": true },
            children: `#<svg aria-hidden="true" width="24" height="6" viewBox="0 0 24 7" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M24 0V1C20 1 18.5 2 16.5 4C14.5 6 14 7 12 7C10 7 9.5 6 7.5 4C5.5 2 4 1 0 1V0H24Z"></path></svg>`,
          },
        ],
      });
      super._config();
    }
    _onOpenerClickHandler() {
      if (
        this.opener.props.disabled !== true &&
        !this.props.PasswordPopupHidden
      ) {
        this.props.PasswordPopupHidden !== true ? this.show() : this.hide();
      }
    }
  }
  Component.register(PasswordPopup);
  class Password extends Textbox {
    constructor(props, ...mixins) {
      super(Component.extendProps(Password.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.realValue = "";
      this.hasDefaultValue = false;
      this.capsLock = false;
      this.firstWrite = false;
      if (this.props.value) {
        this.realValue = this.props.value;
        this.hasDefaultValue = true;
      }
    }
    _config() {
      const that = this;
      const { onValueChange } = this.props;
      if (that.tooltip) {
        that.tooltip.remove();
        delete that.tooltip;
      }
      this.setProps({
        type: "password",
        rightIcon: {
          type: this.props.rightIconType,
          hidden:
            !this.props.value ||
            this.props.disabled ||
            !this.props.visibilityToggle,
          ref: (c) => {
            this.rightIconRef = c;
          },
          onClick: function () {
            if (!that.props.value) {
              return;
            }
            that.update({
              rightIconType:
                that.props.rightIconType === "eye-invisible"
                  ? "eye"
                  : "eye-invisible",
            });
            that.setValue(that.props.value);
          },
        },
        onValueChange: () => {
          const pass = that.getText();
          const start = that.input.element.selectionStart; // 光标位置
          const fake = pass ? pass.split("") : [];
          let real = that.realValue ? that.realValue.split("") : [];
          const clen = fake.length - real.length; // 处理Value
          if (!pass) {
            that.realValue = null;
          } else {
            if (clen > 0) {
              // const middle = fake.join('').replace(/\*/g, '').split('')
              const middle = fake.slice(start - clen, start);
              const right =
                fake.length - start > 0
                  ? real.slice(-(fake.length - start))
                  : [];
              real = [].concat(
                real.slice(0, start - middle.length),
                middle,
                right
              );
            }
            if (clen < 0) {
              real.splice(start, Math.abs(clen));
            }
            fake.forEach(function (value, index) {
              if (value !== "*") {
                real[index] = value;
              }
            });
            that.realValue = real.join("");
          }
          that.setValue(that.realValue); // 让光标回到正确位置
          if (pass && start < pass.length) {
            that.input.element.selectionStart = start;
            that.input.element.selectionEnd = start;
          }
          if (that.props.visibilityToggle) {
            pass ? that.rightIconRef.show() : that.rightIconRef.hide();
          }
          that._callHandler(onValueChange);
        },
      });
      super._config();
    }
    _rendered() {
      const that = this;
      if (this.hasDefaultValue && this.firstRender) {
        this.setValue(this.realValue);
      }
      this.popup = new PasswordPopup({
        trigger: this.control,
        animate: false,
        triggerAction: "click",
        PasswordPopupHidden: true,
      });
      this.input.element.addEventListener("keyup", (event) => {
        // 判断是否按键为caps Lock
        if (event.keyCode === 20) {
          that.capsLock = !that.capsLock;
          this.firstWrite && this.popupSetProps();
          return;
        } // 按键不是caps Lock，判断每次最后输入的字母的大小写
        const e = event || window.event;
        const keyvalue = e.keyCode ? e.keyCode : e.which;
        const shifKey = that.shifKey;
        if (typeof that.realValue === "undefined") return;
        const userPassword = that.realValue || "";
        const strStart = that.input.element.selectionStart; // 光标位置
        if (strStart) {
          const uniCode = userPassword.charCodeAt(strStart - 1); // 65到90字母键
          if (keyvalue >= 65 && keyvalue <= 90) {
            this.firstWrite = true; // 是否同时按住shift键
            if (
              (uniCode >= 65 && uniCode <= 90 && !shifKey) ||
              (uniCode >= 97 && uniCode <= 122 && shifKey)
            ) {
              that.capsLock = true;
            } else {
              that.capsLock = false;
            }
          }
        }
        this.popupSetProps();
      });
      this.input.element.addEventListener("keydown", (event) => {
        const e = event || window.event;
        const keyvalue = e.keyCode ? e.keyCode : e.which;
        const shifKey = e.shiftKey ? e.shiftKey : keyvalue === 16;
        this.shifKey = shifKey;
      });
    }
    popupSetProps() {
      this.capsLock ? this.popup.show() : this.popup.hide();
      this.popup.setProps({ PasswordPopupHidden: !this.capsLock });
    }
    _getValue() {
      return this.realValue ? this.realValue.trim(" ") : null;
    }
    _setValue(value) {
      const { rightIconType, value: oldValue } = this.props;
      const pass = value
        ? rightIconType === "eye"
          ? value.replace(/./g, "*")
          : value
        : null;
      this.input.setText(pass);
      if (oldValue !== value) {
        this.setProps({ value });
        this.realValue = value;
      }
    }
  }
  Password.defaults = {
    allowClear: false,
    visibilityToggle: true,
    rightIconType: "eye",
  };
  Component.register(Password);
  class Popconfirm extends Popup {
    constructor(props, ...mixins) {
      super(Component.extendProps(Popconfirm.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { content, okText, cancelText, icon } = this.props;
      this.setProps({
        children: {
          attrs: { style: { "max-width": "350px", padding: "15px" } },
          children: {
            component: "Rows",
            items: [
              {
                component: "Cols",
                items: [
                  {
                    component: "Icon",
                    type: icon,
                    attrs: { style: { "font-size": "2.5rem", color: "#fa0" } },
                  },
                  { children: isString(content) ? content : content() },
                ],
              },
              {
                component: "Cols",
                justify: "end",
                gutter: "sm",
                items: [
                  {
                    component: "Button",
                    type: "primary",
                    text: okText,
                    onClick: () => {
                      that._handleOk();
                    },
                  },
                  {
                    component: "Button",
                    text: cancelText,
                    onClick: () => {
                      that._handleCancel();
                    },
                  },
                ],
              },
            ],
          },
        },
      });
      super._config();
    }
    _handleOk() {
      this._callHandler(this.props.onConfirm);
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.hide();
    }
    _handleCancel() {
      this.props && this.props.animate && this.animateHide();
      this.props && !this.props.animate && this.hide();
    }
    animateHide() {
      if (!this.element) return false;
      this.addClass("nom-layer-animate-hide");
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
      }, 90);
    }
  }
  Popconfirm.defaults = {
    triggerAction: "click",
    closeOnClickOutside: false,
    content: null,
    onConfirm: null,
    okText: "是",
    cancelText: "否",
    icon: "info-circle",
    align: "top left",
  };
  Component.mixin({
    _rendered: function () {
      if (this.props.popconfirm) {
        if (isString(this.props.popconfirm)) {
          this.popconfirm = new Popconfirm({
            trigger: this,
            children: this.props.popconfirm,
          });
        } else {
          this.popconfirm = new Popconfirm(
            Component.extendProps({}, this.props.popconfirm, { trigger: this })
          );
        }
      }
    },
  });
  Component.register(Popconfirm);
  let gradientSeed = 0;
  function stripPercentToNumber(percent) {
    return +percent.replace("%", "");
  }
  function toArray(symArray) {
    return Array.isArray(symArray) ? symArray : [symArray];
  }
  function getPathStyles(
    offset,
    percent,
    strokeColor,
    strokeWidth,
    gapDegree = 0,
    gapPosition
  ) {
    const radius = 50 - strokeWidth / 2;
    let beginPositionX = 0;
    let beginPositionY = -radius;
    let endPositionX = 0;
    let endPositionY = -2 * radius;
    switch (gapPosition) {
      case "left":
        beginPositionX = -radius;
        beginPositionY = 0;
        endPositionX = 2 * radius;
        endPositionY = 0;
        break;
      case "right":
        beginPositionX = radius;
        beginPositionY = 0;
        endPositionX = -2 * radius;
        endPositionY = 0;
        break;
      case "bottom":
        beginPositionY = radius;
        endPositionY = 2 * radius;
        break;
    }
    const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
   a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
   a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
    const len = Math.PI * 2 * radius;
    const pathStyle = {
      stroke: strokeColor,
      "stroke-dasharray": `${(percent / 100) * (len - gapDegree)}px ${len}px`,
      "stroke-dashoffset": `-${
        gapDegree / 2 + (offset / 100) * (len - gapDegree)
      }px`,
      transition:
        "stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s", // eslint-disable-line
    };
    return { pathString, pathStyle };
  }
  class CirclePath extends Component {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
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
      } = this.props;
      gradientSeed += 1;
      const gradientId = gradientSeed;
      const { pathString, pathStyle } = getPathStyles(
        0,
        100,
        trailColor,
        strokeWidth,
        gapDegree,
        gapPosition
      );
      const percentList = toArray(percent);
      const strokeColorList = toArray(strokeColor);
      const gradient = strokeColorList.find(
        (color) => Object.prototype.toString.call(color) === "[object Object]"
      );
      const getStokeList = () => {
        let stackPtg = 0;
        return percentList
          .map((ptg, index) => {
            const color =
              strokeColorList[index] ||
              strokeColorList[strokeColorList.length - 1];
            const stroke =
              Object.prototype.toString.call(color) === "[object Object]"
                ? `url(#${prefixCls}-gradient-${gradientId})`
                : "";
            const pathStyles = getPathStyles(
              stackPtg,
              ptg,
              color,
              strokeWidth,
              gapDegree,
              gapPosition
            );
            stackPtg += ptg;
            return {
              tag: "path",
              classes: { [`${prefixCls}-circle-path`]: true },
              attrs: {
                d: pathStyles.pathString,
                stroke: stroke,
                "stroke-linecap": strokeLinecap,
                "stroke-width": strokeWidth,
                opacity: ptg === 0 ? 0 : 1,
                "fill-opacity": "0",
                style: Object.assign({}, pathStyles.pathStyle),
              },
            };
          })
          .reverse();
      };
      this.setProps({
        tag: "svg",
        classes: { [`${prefixCls}-circle`]: true },
        attrs: Object.assign(
          {
            viewBox: "0 0 100 100",
            xmlns: "http://www.w3.org/2000/svg", // 'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            "xml:space": "preserve",
          },
          style
        ),
        children: [
          gradient
            ? {
                tag: "defs",
                children: {
                  tag: "linearGradient",
                  attrs: {
                    id: `${prefixCls}-gradient-${gradientId}`,
                    x1: "100%",
                    y1: "0%",
                    x2: "0%",
                    y2: "0%",
                  },
                  children: Object.keys(gradient)
                    .sort(
                      (a, b) =>
                        stripPercentToNumber(a) - stripPercentToNumber(b)
                    )
                    .map((key) => {
                      return {
                        tag: "stop",
                        attrs: {
                          offset: key,
                          "stop-color": gradient[key],
                          "transition-duration": ".3s, .3s, .3s, .06s",
                        },
                      };
                    }),
                },
              }
            : undefined,
          {
            tag: "path",
            classes: { [`${prefixCls}-circle-trail`]: true },
            attrs: {
              d: pathString,
              stroke: trailColor,
              "stroke-linecap": strokeLinecap,
              "stroke-width": trailWidth || strokeWidth,
              "fill-opacity": "0",
              style: Object.assign({}, pathStyle),
            },
          },
          ...getStokeList(),
        ],
        _rendered() {
          this.element.outerHTML = `${this.element.outerHTML}`;
        },
      });
    }
  }
  function validProgress(progress) {
    if (!progress || progress < 0) {
      return 0;
    }
    if (progress > 100) {
      return 100;
    }
    return progress;
  }
  /**
   * @example
   *   {
   *     "0%": "#afc163",
   *     "75%": "#009900",
   *     "50%": "green", // ====> '#afc163 0%, #66FF00 25%, #00CC00 50%, #009900 75%, #ffffff 100%'
   *     "25%": "#66FF00",
   *     "100%": "#ffffff"
   *   }
   */ function sortGradient(gradients) {
    let tempArr = [];
    Object.keys(gradients).forEach((key) => {
      const formattedKey = parseFloat(key.replace(/%/g, ""));
      if (!Number.isNaN(formattedKey)) {
        tempArr.push({ key: formattedKey, value: gradients[key] });
      }
    });
    tempArr = tempArr.sort((a, b) => a.key - b.key);
    return tempArr.map(({ key, value }) => `${value} ${key}%`).join(", ");
  }
  /**
   * Then this man came to realize the truth: Besides six pence, there is the moon. Besides bread and
   * butter, there is the bug. And... Besides women, there is the code.
   *
   * @example
   *   {
   *     "0%": "#afc163",
   *     "25%": "#66FF00",
   *     "50%": "#00CC00", // ====>  linear-gradient(to right, #afc163 0%, #66FF00 25%,
   *     "75%": "#009900", //        #00CC00 50%, #009900 75%, #ffffff 100%)
   *     "100%": "#ffffff"
   *   }
   */ const handleGradient = (strokeColor) => {
    const { from = "blue", to = "blue", direction = "to right" } = strokeColor,
      rest = _objectWithoutPropertiesLoose2(strokeColor, [
        "from",
        "to",
        "direction",
      ]);
    if (Object.keys(rest).length !== 0) {
      const sortedGradients = sortGradient(rest);
      return {
        backgroundImage: `linear-gradient(${direction}, ${sortedGradients})`,
      };
    }
    return { backgroundImage: `linear-gradient(${direction}, ${from}, ${to})` };
  };
  class ProgressCircle extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ProgressCircle.defaults, props), ...mixins);
    }
    _getGapDegree() {
      const { gapDegree, type } = this.props; // Support gapDeg = 0 when type = 'dashboard'
      if (gapDegree || gapDegree === 0) {
        return gapDegree;
      }
      if (type === "dashboard") {
        return 75;
      }
      return undefined;
    }
    _getPercentage({ percent, success }) {
      const ptg = validProgress(percent);
      const realSuccessPercent = success.percent;
      if (!realSuccessPercent) {
        return ptg;
      }
      return [
        validProgress(realSuccessPercent),
        validProgress(ptg - validProgress(realSuccessPercent)),
      ];
    }
    _getStrokeColor() {
      const { success = {}, strokeColor } = this.props;
      const color = strokeColor || null;
      const realSuccessPercent = success.percent;
      if (!realSuccessPercent) {
        return color;
      }
      return ["#52c41a", color];
    }
    _config() {
      const {
        width,
        strokeLinecap,
        percent,
        strokeWidth,
        gapPosition,
        trailColor,
        type,
        success = {},
        children,
      } = this.props;
      const circleWidth = strokeWidth || 6;
      const gapPos = gapPosition || (type === "dashboard" && "bottom") || "top"; // using className to style stroke color
      const strokeColor = this._getStrokeColor();
      const isGradient =
        Object.prototype.toString.call(strokeColor) === "[object Object]";
      const successPercent = this._getPercentage({ percent, success });
      const gapDegree = this._getGapDegree();
      this.setProps({
        classes: {
          [`${ProgressCircle._prefixClass}-inner`]: true,
          [`${ProgressCircle._prefixClass}-circle-gradient`]: isGradient,
        },
        attrs: {
          style: {
            width: `${width}px`,
            height: `${width}px`,
            fontSize: width * 0.15 + 6,
          },
        },
        children: [
          {
            component: CirclePath,
            percent: successPercent,
            strokeWidth: circleWidth,
            trailWidth: circleWidth,
            strokeColor: strokeColor,
            strokeLinecap: strokeLinecap,
            trailColor: trailColor,
            prefixCls: ProgressCircle._prefixClass,
            gapDegree: gapDegree,
            gapPosition: gapPos,
          },
          children,
        ],
      });
    }
  }
  _defineProperty2(ProgressCircle, "_prefixClass", "nom-progress");
  ProgressCircle.defaults = {
    width: 120, // strokeWidth:6
  };
  class ProgressLine extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ProgressLine.defaults, props), ...mixins);
    }
    _config() {
      const {
        size,
        strokeLinecap,
        strokeColor,
        percent,
        strokeWidth,
        trailColor,
        success = {},
        children,
      } = this.props;
      const successPercent = success.percent;
      const successSegment =
        successPercent !== undefined
          ? {
              classes: { [`${ProgressLine._prefixClass}-success-bg`]: true },
              attrs: {
                style: {
                  width: `${validProgress(successPercent)}%`,
                  height:
                    `${strokeWidth}px` || (size === "small" ? "6px" : "8px"),
                  borderRadius: strokeLinecap === "square" ? 0 : "",
                  backgroundColor: success.strokeColor,
                },
              },
            }
          : null;
      const trailStyle = trailColor
        ? { backgroundColor: trailColor }
        : undefined;
      const backgroundProps =
        strokeColor && typeof strokeColor !== "string"
          ? handleGradient(strokeColor)
          : { background: strokeColor };
      const percentStyle = Object.assign(
        {
          width: `${validProgress(percent)}%`,
          height: `${strokeWidth || (size === "small" ? 6 : 8)}px`,
          borderRadius: strokeLinecap === "square" ? 0 : "",
        },
        backgroundProps
      );
      this.setProps({
        children: [
          {
            classes: { [`${ProgressLine._prefixClass}-outer`]: true },
            children: {
              classes: { [`${ProgressLine._prefixClass}-inner`]: true },
              attrs: { style: trailStyle },
              children: [
                {
                  classes: { [`${ProgressLine._prefixClass}-bg`]: true },
                  attrs: { style: percentStyle },
                },
                successSegment,
              ],
            },
          },
          children,
        ],
      });
    }
  }
  _defineProperty2(ProgressLine, "_prefixClass", "nom-progress");
  ProgressLine.defaults = {
    // steps:100,
    // strokeColor:'',
    strokeWidth: 10,
  };
  class ProgressSteps extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(ProgressSteps.defaults, props), ...mixins);
    }
    _config() {
      const {
        size,
        strokeColor,
        percent,
        strokeWidth,
        trailColor,
        steps,
        children,
      } = this.props;
      const current = Math.round(steps * (percent / 100));
      const stepWidth = size === "small" ? 2 : 14;
      const styledSteps = [];
      for (let i = 0; i < steps; i += 1) {
        styledSteps.push({
          classes: {
            [`${ProgressSteps._prefixClass}-steps-item`]: true,
            [`${ProgressSteps._prefixClass}-steps-item-active`]:
              i <= current - 1,
          },
          attrs: {
            style: {
              backgroundColor: i <= current - 1 ? strokeColor : trailColor,
              width: `${stepWidth}px`,
              height: `${strokeWidth}px`,
            },
          },
        });
      }
      this.setProps({
        classes: { [`${ProgressSteps._prefixClass}-steps-outer`]: true },
        children: [...styledSteps, children],
      });
    }
  }
  _defineProperty2(ProgressSteps, "_prefixClass", "nom-progress");
  ProgressSteps.defaults = { strokeWidth: 8, percent: 0 };
  class Progress extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Progress.defaults, props), ...mixins);
    }
    getPercentNumber() {
      const { percent, success } = this.props;
      const { percent: successPercent } = success;
      return parseInt(
        successPercent !== undefined
          ? successPercent.toString()
          : percent.toString(),
        10
      );
    }
    getProgressStatus() {
      const { status } = this.props;
      const successPercent = this.getPercentNumber();
      if (
        (status === undefined ||
          Progress._progressStatuses.indexOf(status) !== 0) &&
        successPercent >= 100
      ) {
        return "success";
      }
      return status || "normal";
    }
    renderProcessInfo(progressStatus) {
      const { showInfo, format, type, percent, infoWidth } = this.props;
      const successPercent = this.getPercentNumber();
      if (!showInfo) return null;
      let text;
      const textFormatter = format || ((percentNumber) => `${percentNumber}%`);
      const isLineType = type === "line";
      if (
        format ||
        (progressStatus !== "exception" && progressStatus !== "success")
      ) {
        text = textFormatter(
          validProgress(percent),
          validProgress(successPercent)
        );
      } else if (progressStatus === "exception") {
        text = isLineType
          ? { component: Icon, type: "close-circle" }
          : { component: Icon, type: "close" };
      } else if (progressStatus === "success") {
        text = isLineType
          ? { component: Icon, type: "check-circle" }
          : { component: Icon, type: "check" };
      }
      return {
        tag: "span",
        classes: { [`${Progress._prefixClass}-text`]: true },
        attrs: {
          title: typeof text === "string" ? text : undefined,
          style: {
            width: infoWidth ? `${infoWidth}px` : "",
            flex: infoWidth ? `0 0 ${infoWidth}px` : "",
          },
        },
        children: text,
      };
    }
    _config() {
      const {
        size,
        type,
        steps,
        showInfo,
        success,
        strokeColor,
        strokeLinecap,
        percent,
        strokeWidth,
        trailColor,
        gapDegree,
        width,
      } = this.props;
      const progressStatus = this.getProgressStatus();
      const progressInfo = this.renderProcessInfo(progressStatus);
      let children = {
        children: progressInfo,
        strokeColor: strokeColor,
        size,
        percent,
        strokeWidth,
        strokeLinecap,
        trailColor,
        success,
      };
      if (type === "line") {
        if (steps) {
          children = Object.assign({}, children, {
            strokeColor:
              typeof strokeColor === "string" ? strokeColor : undefined,
            component: ProgressSteps,
            steps,
          });
        } else {
          children = Object.assign({}, children, { component: ProgressLine });
        }
      } else if (type === "circle" || type === "dashboard") {
        children = Object.assign({}, children, {
          component: ProgressCircle,
          type,
          width,
          strokeLinecap,
          progressStatus: progressStatus,
          children: progressInfo,
          gapDegree,
        });
      } else {
        throw new Error(`Progress 不受支持的类型：${type}`);
      }
      this.setProps({
        classes: {
          [`${Progress._prefixClass}-${
            (type === "dashboard" && "circle") || (steps && "steps") || type
          }`]: true,
          [`${Progress._prefixClass}-status-${progressStatus}`]: true,
          [`${Progress._prefixClass}-show-info`]: showInfo,
          [`${Progress._prefixClass}-${size}`]: size,
        },
        children,
      });
    }
  }
  _defineProperty2(Progress, "_prefixClass", "nom-progress");
  _defineProperty2(Progress, "_progressStatuses", [
    "normal",
    "exception",
    "active",
    "success",
  ]);
  Progress.defaults = {
    type: "line", // 'line', 'circle', 'dashboard' // 类型，可选 line circle dashboard
    percent: 0, // 百分比
    infoWidth: null, // format?:undefined, // (percentNumber,successPercent) => `${percentNumber}%` 内容的模板函数
    // status:undefined, // 'normal', 'exception', 'active', 'success' // 状态，可选：success exception normal active(仅限 line)
    showInfo: true, // 是否显示进度数值或状态图标
    // null for different theme definition
    trailColor: null,
    size: "default", // 'default' ,'small' // strokeWidth:10,
    /**
     * type="line"
     *  进度条线的宽度，默认为10px，
     * type="circle"
     *  圆形进度条线的宽度，单位是进度条画布宽度的百分比 默认 6
     */ strokeLinecap: "round", //  'butt' | 'square' | 'round', // 进度条的样式 // width: number,
    // strokeColor: string |  { from: string; to: string; direction: string }, // 进度条的色彩，传入 object 时为渐变
    // trailColor: string, // 未完成的分段的颜色
    /**
     * type="circle" 圆形进度条画布宽度，单位 px 默认 132px
     * type="dashboard" 仪表盘进度条画布宽度，单位 px 默认 132px
     */ success: {}, //  { percent: number, strokeColor: string }, // 成功进度条相关配置
    // gapDegree: number,【type="dashboard"】 仪表盘进度条缺口角度，可取值 0 ~ 295默认75
    // gapPosition: 'top' | 'bottom' | 'left' | 'right', // 仪表盘进度条缺口位置 默认值 bottom
    // steps: number, // 【type="line"】进度条总共步数
  };
  Component.register(Progress);
  class RadioOptionList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        itemDefaults: {
          tag: "label",
          _config: function () {
            this.setProps({
              children: [
                { tag: "span", classes: { radio: true } }, // { tag: 'i' },
                {
                  tag: "span",
                  classes: { text: true },
                  children: this.props[
                    this.parent.parent.parent.parent.parent.props.fieldName.text
                  ],
                },
              ],
            });
          },
        },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.radioList = this.parent.parent;
      this.radioList.optionList = this;
    }
    _config() {
      const listProps = this.radioList.props;
      if (listProps.type === "radio") {
        this.setProps({ gutter: "x-md" });
      }
      this.setProps({
        attrs: { style: { overflow: isChrome49() ? "visible" : "" } },
        disabled: listProps.disabled,
        items: listProps.options,
        itemDefaults: listProps.optionDefaults,
        itemSelectable: { byClick: true },
        selectedItems: listProps.value,
        onItemSelectionChange: () => {
          this.radioList._onValueChange();
        },
      });
      super._config();
    }
  }
  class RadioList extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(RadioList.defaults, props), ...mixins);
    }
    _config() {
      const { fieldName } = this.props;
      this.setProps({
        optionDefaults: {
          key() {
            return this.props[fieldName.value];
          },
        },
      });
      this.setProps({
        optionList: { component: RadioOptionList, cols: this.props.cols },
      });
      this.setProps({ control: this.props.optionList });
      super._config();
    }
    getSelectedOption() {
      return this.optionList.getSelectedItem();
    }
    _getValueText(options, value) {
      const { valueOptions, fieldName } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      const selected =
        value !== undefined
          ? this._getOptionByValue(value)
          : this.getSelectedOption();
      if (selected !== null) {
        if (options.asArray === true) {
          return selected.props
            ? [selected.props[fieldName.text]]
            : [selected[fieldName.text]];
        }
        return selected.props
          ? selected.props[fieldName.text]
          : selected[fieldName.text];
      }
      return null;
    }
    _getValue(options) {
      const { valueOptions, fieldName } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      const selected = this.getSelectedOption();
      if (selected !== null) {
        if (options.asArray === true) {
          return [selected.props[fieldName.value]];
        }
        return selected.props[fieldName.value];
      }
      return null;
    }
    _setValue(value, options) {
      const { fieldName } = this.props;
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      if (value === null) {
        this.optionList.unselectAllItems({
          triggerSelectionChange: options.triggerChange,
        });
      } else {
        if (Array.isArray(value)) {
          value = value[0];
        }
        this.optionList.selectItem(function () {
          return this.props[fieldName.value] === value;
        });
      }
    }
    _disable() {
      if (this.firstRender === false) {
        this.optionList.disable();
      }
    }
    _enable() {
      if (this.firstRender === false) {
        this.optionList.enable();
      }
    }
    _getOptionByValue(value) {
      const { fieldName } = this.props;
      let option = null;
      const { options } = this.props;
      if (Array.isArray(value)) {
        value = value[0];
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i][fieldName.value] === value) {
          option = options[i];
          break;
        }
      }
      return option;
    }
  }
  RadioList.defaults = {
    options: [],
    uistyle: "radio",
    fieldName: { text: "text", value: "value" },
  };
  Component.register(RadioList);
  function getValidMax(value) {
    if (!isNumeric(value)) return 100;
    if (value <= 0) return 100;
    return value;
  }
  function getValidValue(val, max = 100) {
    if (!val || !isNumeric(val) || val < 0) return 0;
    if (val > max) return max;
    return val;
  }
  function getOffset(container, offset, max = 100) {
    let _container = container;
    if (!_container) {
      return null;
    }
    if (_container instanceof Component) {
      _container = container.element;
    }
    if (!(_container instanceof HTMLElement)) {
      return null;
    }
    const { left, width } = _container.getBoundingClientRect();
    let result = ((offset - left) * max) / width;
    result = Math.min(max, result);
    result = Math.max(0, result);
    return result;
  }
  class RateStarChild extends Component {
    constructor(props, ...mixins) {
      const defaults = { rateIcon: "" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.rate = this.parent.rate;
    }
  }
  Component.register(RateStarChild);
  class RateStar extends Component {
    constructor(props, ...mixins) {
      const defaults = { character: "", index: 0 };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.rate = this.parent.parent.field;
    }
    _config() {
      const { disabled } = this.rate.props;
      const { value, index, character } = this.props;
      const isFull = value >= index + 1;
      const isZero = value <= index;
      const rateIconProps = Component.normalizeIconProps("star");
      this.setProps({
        tag: "li",
        classes: {
          "nom-rate-star-full": isFull,
          "nom-rate-star-half": !isFull && !isZero,
          "nom-rate-star-zero": isZero,
        },
        children: [
          {
            component: RateStarChild,
            classes: { "nom-rate-star-first": true },
            children: character || rateIconProps,
            onClick: disabled ? null : this.handleClickRateStarFirst.bind(this),
          },
          {
            component: RateStarChild,
            classes: { "nom-rate-star-second": true },
            children: character || rateIconProps,
            onClick: disabled
              ? null
              : this.handleClickRateStarSecond.bind(this),
          },
        ],
      });
      super._config();
    } // 点击设置半颗星
    handleClickRateStarFirst() {
      const { allowHalf } = this.rate.props;
      const _newValue = this.props.index + (allowHalf ? 0.5 : 1);
      this._updateValue(_newValue);
    } // 点击设置整颗星
    handleClickRateStarSecond() {
      const _newValue = this.props.index + 1;
      this._updateValue(_newValue);
    }
    _updateValue(newValue = 0) {
      const { allowClear } = this.rate.props;
      const { value } = this.props; // 不能清除 && 值相等 -> 不做更新操作
      if (!allowClear && newValue === value) return; // 允许清除 && 值相等 -> newValue = 0
      if (allowClear && newValue === value) {
        newValue = 0;
      }
      this.rate.handleValueChange(newValue);
    }
  }
  Component.register(RateStar);
  class Rate extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Rate.defaults, props), ...mixins);
    }
    _config() {
      this.rate = this;
      const rateRef = this;
      this._initValue();
      this.setProps({
        control: {
          children: {
            tag: "ul",
            classes: { "nom-rate-content": true },
            _created() {
              rateRef._content = this;
            },
            _config() {
              const children = rateRef._getRateChildren();
              this.setProps({ children: children });
            }, // children: children,
          },
        },
      });
      super._config();
    }
    _initValue() {
      const { value, count, allowHalf } = this.props; // value值应在 [0, count]之间
      this.initValue = getValidValue(value, count); // 不允许半星则向下取取整
      if (!allowHalf) {
        this.initValue = Math.floor(this.initValue);
      }
      this.currentValue = this.initValue;
    }
    _getRateChildren() {
      const { count, character, tooltips } = this.props;
      return Array(count)
        .fill()
        .map((item, index) => {
          let char = character;
          if (isFunction(character)) {
            char = character({ index });
          }
          return {
            component: RateStar,
            character: char,
            value: this.currentValue,
            index,
            tooltip: tooltips && tooltips.length && tooltips[index],
          };
        });
    }
    handleValueChange(value) {
      this._setValue(value);
    }
    _getValue() {
      return this.tempValue;
    }
    _setValue(value) {
      const _value = value === null ? 0 : value;
      if (!isNumeric(_value) || _value < 0 || _value > this.props.count) return;
      this.tempValue = _value;
      if (_value !== this.oldValue) {
        super._onValueChange();
        this.oldValue = this.currentValue;
        this.currentValue = _value;
        this._content.update();
      }
    }
  }
  Rate.defaults = {
    allowClear: true,
    allowHalf: false,
    disable: false,
    rateIcon: "",
    value: null,
    disabled: false,
    count: 5,
    character: null,
    tooltips: null,
  };
  Component.register(Rate);
  const UnAuthorized = `#<svg width="251" height="294">
<g fill="none" fillRule="evenodd">
  <path
    d="M0 129.023v-2.084C0 58.364 55.591 2.774 124.165 2.774h2.085c68.574 0 124.165 55.59 124.165 124.165v2.084c0 68.575-55.59 124.166-124.165 124.166h-2.085C55.591 253.189 0 197.598 0 129.023"
    fill="#E4EBF7"
  />
  <path
    d="M41.417 132.92a8.231 8.231 0 1 1-16.38-1.65 8.231 8.231 0 0 1 16.38 1.65"
    fill="#FFF"
  />
  <path
    d="M38.652 136.36l10.425 5.91M49.989 148.505l-12.58 10.73"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    d="M41.536 161.28a5.636 5.636 0 1 1-11.216-1.13 5.636 5.636 0 0 1 11.216 1.13M59.154 145.261a5.677 5.677 0 1 1-11.297-1.138 5.677 5.677 0 0 1 11.297 1.138M100.36 29.516l29.66-.013a4.562 4.562 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 0 0 .005 9.126M111.705 47.754l29.659-.013a4.563 4.563 0 1 0-.004-9.126l-29.66.013a4.563 4.563 0 1 0 .005 9.126"
    fill="#FFF"
  />
  <path
    d="M114.066 29.503V29.5l15.698-.007a4.563 4.563 0 1 0 .004 9.126l-15.698.007v-.002a4.562 4.562 0 0 0-.004-9.122M185.405 137.723c-.55 5.455-5.418 9.432-10.873 8.882-5.456-.55-9.432-5.418-8.882-10.873.55-5.455 5.418-9.432 10.873-8.882 5.455.55 9.432 5.418 8.882 10.873"
    fill="#FFF"
  />
  <path
    d="M180.17 143.772l12.572 7.129M193.841 158.42L178.67 171.36"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    d="M185.55 171.926a6.798 6.798 0 1 1-13.528-1.363 6.798 6.798 0 0 1 13.527 1.363M204.12 155.285a6.848 6.848 0 1 1-13.627-1.375 6.848 6.848 0 0 1 13.626 1.375"
    fill="#FFF"
  />
  <path
    d="M152.988 194.074a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0zM225.931 118.217a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM217.09 153.051a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.42 0zM177.84 109.842a2.21 2.21 0 1 1-4.422 0 2.21 2.21 0 0 1 4.421 0zM196.114 94.454a2.21 2.21 0 1 1-4.421 0 2.21 2.21 0 0 1 4.421 0zM202.844 182.523a2.21 2.21 0 1 1-4.42 0 2.21 2.21 0 0 1 4.42 0z"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    stroke="#FFF"
    strokeWidth="2"
    d="M215.125 155.262l-1.902 20.075-10.87 5.958M174.601 176.636l-6.322 9.761H156.98l-4.484 6.449M175.874 127.28V111.56M221.51 119.404l-12.77 7.859-15.228-7.86V96.668"
  />
  <path
    d="M180.68 29.32C180.68 13.128 193.806 0 210 0c16.193 0 29.32 13.127 29.32 29.32 0 16.194-13.127 29.322-29.32 29.322-16.193 0-29.32-13.128-29.32-29.321"
    fill="#A26EF4"
  />
  <path
    d="M221.45 41.706l-21.563-.125a1.744 1.744 0 0 1-1.734-1.754l.071-12.23a1.744 1.744 0 0 1 1.754-1.734l21.562.125c.964.006 1.74.791 1.735 1.755l-.071 12.229a1.744 1.744 0 0 1-1.754 1.734"
    fill="#FFF"
  />
  <path
    d="M215.106 29.192c-.015 2.577-2.049 4.654-4.543 4.64-2.494-.014-4.504-2.115-4.489-4.693l.04-6.925c.016-2.577 2.05-4.654 4.543-4.64 2.494.015 4.504 2.116 4.49 4.693l-.04 6.925zm-4.53-14.074a6.877 6.877 0 0 0-6.916 6.837l-.043 7.368a6.877 6.877 0 0 0 13.754.08l.042-7.368a6.878 6.878 0 0 0-6.837-6.917zM167.566 68.367h-3.93a4.73 4.73 0 0 1-4.717-4.717 4.73 4.73 0 0 1 4.717-4.717h3.93a4.73 4.73 0 0 1 4.717 4.717 4.73 4.73 0 0 1-4.717 4.717"
    fill="#FFF"
  />
  <path
    d="M168.214 248.838a6.611 6.611 0 0 1-6.61-6.611v-66.108a6.611 6.611 0 0 1 13.221 0v66.108a6.611 6.611 0 0 1-6.61 6.61"
    fill="#5BA02E"
  />
  <path
    d="M176.147 248.176a6.611 6.611 0 0 1-6.61-6.61v-33.054a6.611 6.611 0 1 1 13.221 0v33.053a6.611 6.611 0 0 1-6.61 6.611"
    fill="#92C110"
  />
  <path
    d="M185.994 293.89h-27.376a3.17 3.17 0 0 1-3.17-3.17v-45.887a3.17 3.17 0 0 1 3.17-3.17h27.376a3.17 3.17 0 0 1 3.17 3.17v45.886a3.17 3.17 0 0 1-3.17 3.17"
    fill="#F2D7AD"
  />
  <path
    d="M81.972 147.673s6.377-.927 17.566-1.28c11.729-.371 17.57 1.086 17.57 1.086s3.697-3.855.968-8.424c1.278-12.077 5.982-32.827.335-48.273-1.116-1.339-3.743-1.512-7.536-.62-1.337.315-7.147-.149-7.983-.1l-15.311-.347s-3.487-.17-8.035-.508c-1.512-.113-4.227-1.683-5.458-.338-.406.443-2.425 5.669-1.97 16.077l8.635 35.642s-3.141 3.61 1.219 7.085"
    fill="#FFF"
  />
  <path
    d="M75.768 73.325l-.9-6.397 11.982-6.52s7.302-.118 8.038 1.205c.737 1.324-5.616.993-5.616.993s-1.836 1.388-2.615 2.5c-1.654 2.363-.986 6.471-8.318 5.986-1.708.284-2.57 2.233-2.57 2.233"
    fill="#FFC6A0"
  />
  <path
    d="M52.44 77.672s14.217 9.406 24.973 14.444c1.061.497-2.094 16.183-11.892 11.811-7.436-3.318-20.162-8.44-21.482-14.496-.71-3.258 2.543-7.643 8.401-11.76M141.862 80.113s-6.693 2.999-13.844 6.876c-3.894 2.11-10.137 4.704-12.33 7.988-6.224 9.314 3.536 11.22 12.947 7.503 6.71-2.651 28.999-12.127 13.227-22.367"
    fill="#FFB594"
  />
  <path
    d="M76.166 66.36l3.06 3.881s-2.783 2.67-6.31 5.747c-7.103 6.195-12.803 14.296-15.995 16.44-3.966 2.662-9.754 3.314-12.177-.118-3.553-5.032.464-14.628 31.422-25.95"
    fill="#FFC6A0"
  />
  <path
    d="M64.674 85.116s-2.34 8.413-8.912 14.447c.652.548 18.586 10.51 22.144 10.056 5.238-.669 6.417-18.968 1.145-20.531-.702-.208-5.901-1.286-8.853-2.167-.87-.26-1.611-1.71-3.545-.936l-1.98-.869zM128.362 85.826s5.318 1.956 7.325 13.734c-.546.274-17.55 12.35-21.829 7.805-6.534-6.94-.766-17.393 4.275-18.61 4.646-1.121 5.03-1.37 10.23-2.929"
    fill="#FFF"
  />
  <path
    d="M78.18 94.656s.911 7.41-4.914 13.078"
    stroke="#E4EBF7"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M87.397 94.68s3.124 2.572 10.263 2.572c7.14 0 9.074-3.437 9.074-3.437"
    stroke="#E4EBF7"
    strokeWidth=".932"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M117.184 68.639l-6.781-6.177s-5.355-4.314-9.223-.893c-3.867 3.422 4.463 2.083 5.653 4.165 1.19 2.082.848 1.143-2.083.446-5.603-1.331-2.082.893 2.975 5.355 2.091 1.845 6.992.955 6.992.955l2.467-3.851z"
    fill="#FFC6A0"
  />
  <path
    d="M105.282 91.315l-.297-10.937-15.918-.027-.53 10.45c-.026.403.17.788.515.999 2.049 1.251 9.387 5.093 15.799.424.287-.21.443-.554.431-.91"
    fill="#FFB594"
  />
  <path
    d="M107.573 74.24c.817-1.147.982-9.118 1.015-11.928a1.046 1.046 0 0 0-.965-1.055l-4.62-.365c-7.71-1.044-17.071.624-18.253 6.346-5.482 5.813-.421 13.244-.421 13.244s1.963 3.566 4.305 6.791c.756 1.041.398-3.731 3.04-5.929 5.524-4.594 15.899-7.103 15.899-7.103"
    fill="#5C2552"
  />
  <path
    d="M88.426 83.206s2.685 6.202 11.602 6.522c7.82.28 8.973-7.008 7.434-17.505l-.909-5.483c-6.118-2.897-15.478.54-15.478.54s-.576 2.044-.19 5.504c-2.276 2.066-1.824 5.618-1.824 5.618s-.905-1.922-1.98-2.321c-.86-.32-1.897.089-2.322 1.98-1.04 4.632 3.667 5.145 3.667 5.145"
    fill="#FFC6A0"
  />
  <path
    stroke="#DB836E"
    strokeWidth="1.145"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M100.843 77.099l1.701-.928-1.015-4.324.674-1.406"
  />
  <path
    d="M105.546 74.092c-.022.713-.452 1.279-.96 1.263-.51-.016-.904-.607-.882-1.32.021-.713.452-1.278.96-1.263.51.016.904.607.882 1.32M97.592 74.349c-.022.713-.452 1.278-.961 1.263-.509-.016-.904-.607-.882-1.32.022-.713.452-1.279.961-1.263.51.016.904.606.882 1.32"
    fill="#552950"
  />
  <path
    d="M91.132 86.786s5.269 4.957 12.679 2.327"
    stroke="#DB836E"
    strokeWidth="1.145"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M99.776 81.903s-3.592.232-1.44-2.79c1.59-1.496 4.897-.46 4.897-.46s1.156 3.906-3.457 3.25"
    fill="#DB836E"
  />
  <path
    d="M102.88 70.6s2.483.84 3.402.715M93.883 71.975s2.492-1.144 4.778-1.073"
    stroke="#5C2552"
    strokeWidth="1.526"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M86.32 77.374s.961.879 1.458 2.106c-.377.48-1.033 1.152-.236 1.809M99.337 83.719s1.911.151 2.509-.254"
    stroke="#DB836E"
    strokeWidth="1.145"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M87.782 115.821l15.73-3.012M100.165 115.821l10.04-2.008"
    stroke="#E4EBF7"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M66.508 86.763s-1.598 8.83-6.697 14.078"
    stroke="#E4EBF7"
    strokeWidth="1.114"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M128.31 87.934s3.013 4.121 4.06 11.785"
    stroke="#E4EBF7"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M64.09 84.816s-6.03 9.912-13.607 9.903"
    stroke="#DB836E"
    strokeWidth=".795"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M112.366 65.909l-.142 5.32s5.993 4.472 11.945 9.202c4.482 3.562 8.888 7.455 10.985 8.662 4.804 2.766 8.9 3.355 11.076 1.808 4.071-2.894 4.373-9.878-8.136-15.263-4.271-1.838-16.144-6.36-25.728-9.73"
    fill="#FFC6A0"
  />
  <path
    d="M130.532 85.488s4.588 5.757 11.619 6.214"
    stroke="#DB836E"
    strokeWidth=".75"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M121.708 105.73s-.393 8.564-1.34 13.612"
    stroke="#E4EBF7"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M115.784 161.512s-3.57-1.488-2.678-7.14"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M101.52 290.246s4.326 2.057 7.408 1.03c2.842-.948 4.564.673 7.132 1.186 2.57.514 6.925 1.108 11.772-1.269-.104-5.551-6.939-4.01-12.048-6.763-2.582-1.39-3.812-4.757-3.625-8.863h-9.471s-1.402 10.596-1.169 14.68"
    fill="#CBD1D1"
  />
  <path
    d="M101.496 290.073s2.447 1.281 6.809.658c3.081-.44 3.74.485 7.479 1.039 3.739.554 10.802-.07 11.91-.9.415 1.108-.347 2.077-.347 2.077s-1.523.608-4.847.831c-2.045.137-5.843.293-7.663-.507-1.8-1.385-5.286-1.917-5.77-.243-3.947.958-7.41-.288-7.41-.288l-.16-2.667z"
    fill="#2B0849"
  />
  <path
    d="M108.824 276.19h3.116s-.103 6.751 4.57 8.62c-4.673.624-8.62-2.32-7.686-8.62"
    fill="#A4AABA"
  />
  <path
    d="M57.65 272.52s-2.122 7.47-4.518 12.396c-1.811 3.724-4.255 7.548 5.505 7.548 6.698 0 9.02-.483 7.479-6.648-1.541-6.164.268-13.296.268-13.296H57.65z"
    fill="#CBD1D1"
  />
  <path
    d="M51.54 290.04s2.111 1.178 6.682 1.178c6.128 0 8.31-1.662 8.31-1.662s.605 1.122-.624 2.18c-1 .862-3.624 1.603-7.444 1.559-4.177-.049-5.876-.57-6.786-1.177-.831-.554-.692-1.593-.138-2.078"
    fill="#2B0849"
  />
  <path
    d="M58.533 274.438s.034 1.529-.315 2.95c-.352 1.431-1.087 3.127-1.139 4.17-.058 1.16 4.57 1.592 5.194.035.623-1.559 1.303-6.475 1.927-7.306.622-.831-4.94-2.135-5.667.15"
    fill="#A4AABA"
  />
  <path
    d="M100.885 277.015l13.306.092s1.291-54.228 1.843-64.056c.552-9.828 3.756-43.13.997-62.788l-12.48-.64-22.725.776s-.433 3.944-1.19 9.921c-.062.493-.677.838-.744 1.358-.075.582.42 1.347.318 1.956-2.35 14.003-6.343 32.926-8.697 46.425-.116.663-1.227 1.004-1.45 2.677-.04.3.21 1.516.112 1.785-6.836 18.643-10.89 47.584-14.2 61.551l14.528-.014s2.185-8.524 4.008-16.878c2.796-12.817 22.987-84.553 22.987-84.553l3-.517 1.037 46.1s-.223 1.228.334 2.008c.558.782-.556 1.117-.39 2.233l.39 1.784s-.446 7.14-.892 11.826c-.446 4.685-.092 38.954-.092 38.954"
    fill="#7BB2F9"
  />
  <path
    d="M77.438 220.434c1.146.094 4.016-2.008 6.916-4.91M107.55 223.931s2.758-1.103 6.069-3.862"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M108.459 220.905s2.759-1.104 6.07-3.863"
    stroke="#648BD8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M76.099 223.557s2.608-.587 6.47-3.346M87.33 150.82c-.27 3.088.297 8.478-4.315 9.073M104.829 149.075s.11 13.936-1.286 14.983c-2.207 1.655-2.975 1.934-2.975 1.934M101.014 149.63s.035 12.81-1.19 24.245M94.93 174.965s7.174-1.655 9.38-1.655M75.671 204.754c-.316 1.55-.64 3.067-.973 4.535 0 0-1.45 1.822-1.003 3.756.446 1.934-.943 2.034-4.96 15.273-1.686 5.559-4.464 18.49-6.313 27.447-.078.38-4.018 18.06-4.093 18.423M77.043 196.743a313.269 313.269 0 0 1-.877 4.729M83.908 151.414l-1.19 10.413s-1.091.148-.496 2.23c.111 1.34-2.66 15.692-5.153 30.267M57.58 272.94h13.238"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M117.377 147.423s-16.955-3.087-35.7.199c.157 2.501-.002 4.128-.002 4.128s14.607-2.802 35.476-.31c.251-2.342.226-4.017.226-4.017"
    fill="#192064"
  />
  <path
    d="M107.511 150.353l.004-4.885a.807.807 0 0 0-.774-.81c-2.428-.092-5.04-.108-7.795-.014a.814.814 0 0 0-.784.81l-.003 4.88c0 .456.371.82.827.808a140.76 140.76 0 0 1 7.688.017.81.81 0 0 0 .837-.806"
    fill="#FFF"
  />
  <path
    d="M106.402 149.426l.002-3.06a.64.64 0 0 0-.616-.643 94.135 94.135 0 0 0-5.834-.009.647.647 0 0 0-.626.643l-.001 3.056c0 .36.291.648.651.64 1.78-.04 3.708-.041 5.762.012.36.009.662-.279.662-.64"
    fill="#192064"
  />
  <path
    d="M101.485 273.933h12.272M102.652 269.075c.006 3.368.04 5.759.11 6.47M102.667 263.125c-.009 1.53-.015 2.98-.016 4.313M102.204 174.024l.893 44.402s.669 1.561-.224 2.677c-.892 1.116 2.455.67.893 2.231-1.562 1.562.893 1.116 0 3.347-.592 1.48-.988 20.987-1.09 34.956"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</g>
</svg>
`;
  const ServerError = `#<svg width="254" height="294">
<defs>
  <path d="M0 .335h253.49v253.49H0z" />
  <path d="M0 293.665h253.49V.401H0z" />
</defs>
<g fill="none" fillRule="evenodd">
  <g transform="translate(0 .067)">
    <mask fill="#fff" />
    <path
      d="M0 128.134v-2.11C0 56.608 56.273.334 125.69.334h2.11c69.416 0 125.69 56.274 125.69 125.69v2.11c0 69.417-56.274 125.69-125.69 125.69h-2.11C56.273 253.824 0 197.551 0 128.134"
      fill="#E4EBF7"
      mask="url(#b)"
    />
  </g>
  <path
    d="M39.989 132.108a8.332 8.332 0 1 1-16.581-1.671 8.332 8.332 0 0 1 16.58 1.671"
    fill="#FFF"
  />
  <path
    d="M37.19 135.59l10.553 5.983M48.665 147.884l-12.734 10.861"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    d="M40.11 160.816a5.706 5.706 0 1 1-11.354-1.145 5.706 5.706 0 0 1 11.354 1.145M57.943 144.6a5.747 5.747 0 1 1-11.436-1.152 5.747 5.747 0 0 1 11.436 1.153M99.656 27.434l30.024-.013a4.619 4.619 0 1 0-.004-9.238l-30.024.013a4.62 4.62 0 0 0 .004 9.238M111.14 45.896l30.023-.013a4.62 4.62 0 1 0-.004-9.238l-30.024.013a4.619 4.619 0 1 0 .004 9.238"
    fill="#FFF"
  />
  <path
    d="M113.53 27.421v-.002l15.89-.007a4.619 4.619 0 1 0 .005 9.238l-15.892.007v-.002a4.618 4.618 0 0 0-.004-9.234M150.167 70.091h-3.979a4.789 4.789 0 0 1-4.774-4.775 4.788 4.788 0 0 1 4.774-4.774h3.979a4.789 4.789 0 0 1 4.775 4.774 4.789 4.789 0 0 1-4.775 4.775"
    fill="#FFF"
  />
  <path
    d="M171.687 30.234c0-16.392 13.289-29.68 29.681-29.68 16.392 0 29.68 13.288 29.68 29.68 0 16.393-13.288 29.681-29.68 29.681s-29.68-13.288-29.68-29.68"
    fill="#FF603B"
  />
  <path
    d="M203.557 19.435l-.676 15.035a1.514 1.514 0 0 1-3.026 0l-.675-15.035a2.19 2.19 0 1 1 4.377 0m-.264 19.378c.513.477.77 1.1.77 1.87s-.257 1.393-.77 1.907c-.55.476-1.21.733-1.943.733a2.545 2.545 0 0 1-1.87-.77c-.55-.514-.806-1.136-.806-1.87 0-.77.256-1.393.806-1.87.513-.513 1.137-.733 1.87-.733.77 0 1.43.22 1.943.733"
    fill="#FFF"
  />
  <path
    d="M119.3 133.275c4.426-.598 3.612-1.204 4.079-4.778.675-5.18-3.108-16.935-8.262-25.118-1.088-10.72-12.598-11.24-12.598-11.24s4.312 4.895 4.196 16.199c1.398 5.243.804 14.45.804 14.45s5.255 11.369 11.78 10.487"
    fill="#FFB594"
  />
  <path
    d="M100.944 91.61s1.463-.583 3.211.582c8.08 1.398 10.368 6.706 11.3 11.368 1.864 1.282 1.864 2.33 1.864 3.496.365.777 1.515 3.03 1.515 3.03s-7.225 1.748-10.954 6.758c-1.399-6.41-6.936-25.235-6.936-25.235"
    fill="#FFF"
  />
  <path
    d="M94.008 90.5l1.019-5.815-9.23-11.874-5.233 5.581-2.593 9.863s8.39 5.128 16.037 2.246"
    fill="#FFB594"
  />
  <path
    d="M82.931 78.216s-4.557-2.868-2.445-6.892c1.632-3.107 4.537 1.139 4.537 1.139s.524-3.662 3.139-3.662c.523-1.046 1.569-4.184 1.569-4.184s11.507 2.615 13.6 3.138c-.001 5.23-2.317 19.529-7.884 19.969-8.94.706-12.516-9.508-12.516-9.508"
    fill="#FFC6A0"
  />
  <path
    d="M102.971 72.243c2.616-2.093 3.489-9.775 3.489-9.775s-2.492-.492-6.676-2.062c-4.708-2.092-12.867-4.771-17.575.982-9.54 4.41-2.062 19.93-2.062 19.93l2.729-3.037s-3.956-3.304-2.092-6.277c2.183-3.48 3.943 1.08 3.943 1.08s.64-2.4 3.6-3.36c.356-.714 1.04-2.69 1.44-3.872a1.08 1.08 0 0 1 1.27-.707c2.41.56 8.723 2.03 11.417 2.676.524.126.876.619.825 1.156l-.308 3.266z"
    fill="#520038"
  />
  <path
    d="M101.22 76.514c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.961.491.083.805.647.702 1.26M94.26 75.074c-.104.613-.585 1.044-1.076.96-.49-.082-.805-.646-.702-1.26.104-.613.585-1.044 1.076-.96.491.082.805.646.702 1.26"
    fill="#552950"
  />
  <path
    stroke="#DB836E"
    strokeWidth="1.063"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M99.206 73.644l-.9 1.62-.3 4.38h-2.24"
  />
  <path
    d="M99.926 73.284s1.8-.72 2.52.54"
    stroke="#5C2552"
    strokeWidth="1.117"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M81.367 73.084s.48-1.12 1.12-.72c.64.4 1.28 1.44.56 2s.16 1.68.16 1.68"
    stroke="#DB836E"
    strokeWidth="1.117"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M92.326 71.724s1.84 1.12 4.16.96"
    stroke="#5C2552"
    strokeWidth="1.117"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M92.726 80.604s2.24 1.2 4.4 1.2M93.686 83.164s.96.4 1.52.32M83.687 80.044s1.786 6.547 9.262 7.954"
    stroke="#DB836E"
    strokeWidth="1.063"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M95.548 91.663s-1.068 2.821-8.298 2.105c-7.23-.717-10.29-5.044-10.29-5.044"
    stroke="#E4EBF7"
    strokeWidth="1.136"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M78.126 87.478s6.526 4.972 16.47 2.486c0 0 9.577 1.02 11.536 5.322 5.36 11.77.543 36.835 0 39.962 3.496 4.055-.466 8.483-.466 8.483-15.624-3.548-35.81-.6-35.81-.6-4.849-3.546-1.223-9.044-1.223-9.044L62.38 110.32c-2.485-15.227.833-19.803 3.549-20.743 3.03-1.049 8.04-1.282 8.04-1.282.496-.058 1.08-.076 1.37-.233 2.36-1.282 2.787-.583 2.787-.583"
    fill="#FFF"
  />
  <path
    d="M65.828 89.81s-6.875.465-7.59 8.156c-.466 8.857 3.03 10.954 3.03 10.954s6.075 22.102 16.796 22.957c8.39-2.176 4.758-6.702 4.661-11.42-.233-11.304-7.108-16.897-7.108-16.897s-4.212-13.75-9.789-13.75"
    fill="#FFC6A0"
  />
  <path
    d="M71.716 124.225s.855 11.264 9.828 6.486c4.765-2.536 7.581-13.828 9.789-22.568 1.456-5.768 2.58-12.197 2.58-12.197l-4.973-1.709s-2.408 5.516-7.769 12.275c-4.335 5.467-9.144 11.11-9.455 17.713"
    fill="#FFC6A0"
  />
  <path
    d="M108.463 105.191s1.747 2.724-2.331 30.535c2.376 2.216 1.053 6.012-.233 7.51"
    stroke="#E4EBF7"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M123.262 131.527s-.427 2.732-11.77 1.981c-15.187-1.006-25.326-3.25-25.326-3.25l.933-5.8s.723.215 9.71-.068c11.887-.373 18.714-6.07 24.964-1.022 4.039 3.263 1.489 8.16 1.489 8.16"
    fill="#FFC6A0"
  />
  <path
    d="M70.24 90.974s-5.593-4.739-11.054 2.68c-3.318 7.223.517 15.284 2.664 19.578-.31 3.729 2.33 4.311 2.33 4.311s.108.895 1.516 2.68c4.078-7.03 6.72-9.166 13.711-12.546-.328-.656-1.877-3.265-1.825-3.767.175-1.69-1.282-2.623-1.282-2.623s-.286-.156-1.165-2.738c-.788-2.313-2.036-5.177-4.895-7.575"
    fill="#FFF"
  />
  <path
    d="M90.232 288.027s4.855 2.308 8.313 1.155c3.188-1.063 5.12.755 8.002 1.331 2.881.577 7.769 1.243 13.207-1.424-.117-6.228-7.786-4.499-13.518-7.588-2.895-1.56-4.276-5.336-4.066-9.944H91.544s-1.573 11.89-1.312 16.47"
    fill="#CBD1D1"
  />
  <path
    d="M90.207 287.833s2.745 1.437 7.639.738c3.456-.494 3.223.66 7.418 1.282 4.195.621 13.092-.194 14.334-1.126.466 1.242-.388 2.33-.388 2.33s-1.709.682-5.438.932c-2.295.154-8.098.276-10.14-.621-2.02-1.554-4.894-1.515-6.06-.234-4.427 1.075-7.184-.31-7.184-.31l-.181-2.991z"
    fill="#2B0849"
  />
  <path
    d="M98.429 272.257h3.496s-.117 7.574 5.127 9.671c-5.244.7-9.672-2.602-8.623-9.671"
    fill="#A4AABA"
  />
  <path
    d="M44.425 272.046s-2.208 7.774-4.702 12.899c-1.884 3.874-4.428 7.854 5.729 7.854 6.97 0 9.385-.503 7.782-6.917-1.604-6.415.279-13.836.279-13.836h-9.088z"
    fill="#CBD1D1"
  />
  <path
    d="M38.066 290.277s2.198 1.225 6.954 1.225c6.376 0 8.646-1.73 8.646-1.73s.63 1.168-.649 2.27c-1.04.897-3.77 1.668-7.745 1.621-4.347-.05-6.115-.593-7.062-1.224-.864-.577-.72-1.657-.144-2.162"
    fill="#2B0849"
  />
  <path
    d="M45.344 274.041s.035 1.592-.329 3.07c-.365 1.49-1.13 3.255-1.184 4.34-.061 1.206 4.755 1.657 5.403.036.65-1.622 1.357-6.737 2.006-7.602.648-.865-5.14-2.222-5.896.156"
    fill="#A4AABA"
  />
  <path
    d="M89.476 277.57l13.899.095s1.349-56.643 1.925-66.909c.576-10.267 3.923-45.052 1.042-65.585l-13.037-.669-23.737.81s-.452 4.12-1.243 10.365c-.065.515-.708.874-.777 1.417-.078.608.439 1.407.332 2.044-2.455 14.627-5.797 32.736-8.256 46.837-.121.693-1.282 1.048-1.515 2.796-.042.314.22 1.584.116 1.865-7.14 19.473-12.202 52.601-15.66 67.19l15.176-.015s2.282-10.145 4.185-18.871c2.922-13.389 24.012-88.32 24.012-88.32l3.133-.954-.158 48.568s-.233 1.282.35 2.098c.583.815-.581 1.167-.408 2.331l.408 1.864s-.466 7.458-.932 12.352c-.467 4.895 1.145 40.69 1.145 40.69"
    fill="#7BB2F9"
  />
  <path
    d="M64.57 218.881c1.197.099 4.195-2.097 7.225-5.127M96.024 222.534s2.881-1.152 6.34-4.034"
    stroke="#648BD8"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M96.973 219.373s2.882-1.153 6.34-4.034"
    stroke="#648BD8"
    strokeWidth="1.032"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M63.172 222.144s2.724-.614 6.759-3.496M74.903 146.166c-.281 3.226.31 8.856-4.506 9.478M93.182 144.344s.115 14.557-1.344 15.65c-2.305 1.73-3.107 2.02-3.107 2.02M89.197 144.923s.269 13.144-1.01 25.088M83.525 170.71s6.81-1.051 9.116-1.051M46.026 270.045l-.892 4.538M46.937 263.289l-.815 4.157M62.725 202.503c-.33 1.618-.102 1.904-.449 3.438 0 0-2.756 1.903-2.29 3.923.466 2.02-.31 3.424-4.505 17.252-1.762 5.807-4.233 18.922-6.165 28.278-.03.144-.521 2.646-1.14 5.8M64.158 194.136c-.295 1.658-.6 3.31-.917 4.938M71.33 146.787l-1.244 10.877s-1.14.155-.519 2.33c.117 1.399-2.778 16.39-5.382 31.615M44.242 273.727H58.07"
    stroke="#648BD8"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M106.18 142.117c-3.028-.489-18.825-2.744-36.219.2a.625.625 0 0 0-.518.644c.063 1.307.044 2.343.015 2.995a.617.617 0 0 0 .716.636c3.303-.534 17.037-2.412 35.664-.266.347.04.66-.214.692-.56.124-1.347.16-2.425.17-3.029a.616.616 0 0 0-.52-.62"
    fill="#192064"
  />
  <path
    d="M96.398 145.264l.003-5.102a.843.843 0 0 0-.809-.847 114.104 114.104 0 0 0-8.141-.014.85.85 0 0 0-.82.847l-.003 5.097c0 .476.388.857.864.845 2.478-.064 5.166-.067 8.03.017a.848.848 0 0 0 .876-.843"
    fill="#FFF"
  />
  <path
    d="M95.239 144.296l.002-3.195a.667.667 0 0 0-.643-.672c-1.9-.061-3.941-.073-6.094-.01a.675.675 0 0 0-.654.672l-.002 3.192c0 .376.305.677.68.669 1.859-.042 3.874-.043 6.02.012.376.01.69-.291.691-.668"
    fill="#192064"
  />
  <path
    d="M90.102 273.522h12.819M91.216 269.761c.006 3.519-.072 5.55 0 6.292M90.923 263.474c-.009 1.599-.016 2.558-.016 4.505M90.44 170.404l.932 46.38s.7 1.631-.233 2.796c-.932 1.166 2.564.7.932 2.33-1.63 1.633.933 1.166 0 3.497-.618 1.546-1.031 21.921-1.138 36.513"
    stroke="#648BD8"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M73.736 98.665l2.214 4.312s2.098.816 1.865 2.68l.816 2.214M64.297 116.611c.233-.932 2.176-7.147 12.585-10.488M77.598 90.042s7.691 6.137 16.547 2.72"
    stroke="#E4EBF7"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M91.974 86.954s5.476-.816 7.574-4.545c1.297-.345.72 2.212-.33 3.671-.7.971-1.01 1.554-1.01 1.554s.194.31.155.816c-.053.697-.175.653-.272 1.048-.081.335.108.657 0 1.049-.046.17-.198.5-.382.878-.12.249-.072.687-.2.948-.231.469-1.562 1.87-2.622 2.855-3.826 3.554-5.018 1.644-6.001-.408-.894-1.865-.661-5.127-.874-6.875-.35-2.914-2.622-3.03-1.923-4.429.343-.685 2.87.69 3.263 1.748.757 2.04 2.952 1.807 2.622 1.69"
    fill="#FFC6A0"
  />
  <path
    d="M99.8 82.429c-.465.077-.35.272-.97 1.243-.622.971-4.817 2.932-6.39 3.224-2.589.48-2.278-1.56-4.254-2.855-1.69-1.107-3.562-.638-1.398 1.398.99.932.932 1.107 1.398 3.205.335 1.506-.64 3.67.7 5.593"
    stroke="#DB836E"
    strokeWidth=".774"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M79.543 108.673c-2.1 2.926-4.266 6.175-5.557 8.762"
    stroke="#E59788"
    strokeWidth=".774"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M87.72 124.768s-2.098-1.942-5.127-2.719c-3.03-.777-3.574-.155-5.516.078-1.942.233-3.885-.932-3.652.7.233 1.63 5.05 1.01 5.206 2.097.155 1.087-6.37 2.796-8.313 2.175-.777.777.466 1.864 2.02 2.175.233 1.554 2.253 1.554 2.253 1.554s.699 1.01 2.641 1.088c2.486 1.32 8.934-.7 10.954-1.554 2.02-.855-.466-5.594-.466-5.594"
    fill="#FFC6A0"
  />
  <path
    d="M73.425 122.826s.66 1.127 3.167 1.418c2.315.27 2.563.583 2.563.583s-2.545 2.894-9.07 2.272M72.416 129.274s3.826.097 4.933-.718M74.98 130.75s1.961.136 3.36-.505M77.232 131.916s1.748.019 2.914-.505M73.328 122.321s-.595-1.032 1.262-.427c1.671.544 2.833.055 5.128.155 1.389.061 3.067-.297 3.982.15 1.606.784 3.632 2.181 3.632 2.181s10.526 1.204 19.033-1.127M78.864 108.104s-8.39 2.758-13.168 12.12"
    stroke="#E59788"
    strokeWidth=".774"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M109.278 112.533s3.38-3.613 7.575-4.662"
    stroke="#E4EBF7"
    strokeWidth="1.085"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M107.375 123.006s9.697-2.745 11.445-.88"
    stroke="#E59788"
    strokeWidth=".774"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M194.605 83.656l3.971-3.886M187.166 90.933l3.736-3.655M191.752 84.207l-4.462-4.56M198.453 91.057l-4.133-4.225M129.256 163.074l3.718-3.718M122.291 170.039l3.498-3.498M126.561 163.626l-4.27-4.27M132.975 170.039l-3.955-3.955"
    stroke="#BFCDDD"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M190.156 211.779h-1.604a4.023 4.023 0 0 1-4.011-4.011V175.68a4.023 4.023 0 0 1 4.01-4.01h1.605a4.023 4.023 0 0 1 4.011 4.01v32.088a4.023 4.023 0 0 1-4.01 4.01"
    fill="#A3B4C6"
  />
  <path
    d="M237.824 212.977a4.813 4.813 0 0 1-4.813 4.813h-86.636a4.813 4.813 0 0 1 0-9.626h86.636a4.813 4.813 0 0 1 4.813 4.813"
    fill="#A3B4C6"
  />
  <mask fill="#fff" />
  <path fill="#A3B4C6" mask="url(#d)" d="M154.098 190.096h70.513v-84.617h-70.513z" />
  <path
    d="M224.928 190.096H153.78a3.219 3.219 0 0 1-3.208-3.209V167.92a3.219 3.219 0 0 1 3.208-3.21h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.219 3.219 0 0 1-3.21 3.209M224.928 130.832H153.78a3.218 3.218 0 0 1-3.208-3.208v-18.968a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.21v18.967a3.218 3.218 0 0 1-3.21 3.208"
    fill="#BFCDDD"
    mask="url(#d)"
  />
  <path
    d="M159.563 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 120.546a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 120.546h-22.461a.802.802 0 0 1-.802-.802v-3.208c0-.443.359-.803.802-.803h22.46c.444 0 .803.36.803.803v3.208c0 .443-.36.802-.802.802"
    fill="#FFF"
    mask="url(#d)"
  />
  <path
    d="M224.928 160.464H153.78a3.218 3.218 0 0 1-3.208-3.209v-18.967a3.219 3.219 0 0 1 3.208-3.209h71.148a3.219 3.219 0 0 1 3.209 3.209v18.967a3.218 3.218 0 0 1-3.21 3.209"
    fill="#BFCDDD"
    mask="url(#d)"
  />
  <path
    d="M173.455 130.832h49.301M164.984 130.832h6.089M155.952 130.832h6.75M173.837 160.613h49.3M165.365 160.613h6.089M155.57 160.613h6.751"
    stroke="#7C90A5"
    strokeWidth="1.124"
    strokeLinecap="round"
    strokeLinejoin="round"
    mask="url(#d)"
  />
  <path
    d="M159.563 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M166.98 151.038a2.407 2.407 0 1 1 0-4.814 2.407 2.407 0 0 1 0 4.814M174.397 151.038a2.407 2.407 0 1 1 .001-4.814 2.407 2.407 0 0 1 0 4.814M222.539 151.038h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802M159.563 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M166.98 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M174.397 179.987a2.407 2.407 0 1 1 0-4.813 2.407 2.407 0 0 1 0 4.813M222.539 179.987h-22.461a.802.802 0 0 1-.802-.802v-3.209c0-.443.359-.802.802-.802h22.46c.444 0 .803.36.803.802v3.209c0 .443-.36.802-.802.802"
    fill="#FFF"
    mask="url(#d)"
  />
  <path
    d="M203.04 221.108h-27.372a2.413 2.413 0 0 1-2.406-2.407v-11.448a2.414 2.414 0 0 1 2.406-2.407h27.372a2.414 2.414 0 0 1 2.407 2.407V218.7a2.413 2.413 0 0 1-2.407 2.407"
    fill="#BFCDDD"
    mask="url(#d)"
  />
  <path
    d="M177.259 207.217v11.52M201.05 207.217v11.52"
    stroke="#A3B4C6"
    strokeWidth="1.124"
    strokeLinecap="round"
    strokeLinejoin="round"
    mask="url(#d)"
  />
  <path
    d="M162.873 267.894a9.422 9.422 0 0 1-9.422-9.422v-14.82a9.423 9.423 0 0 1 18.845 0v14.82a9.423 9.423 0 0 1-9.423 9.422"
    fill="#5BA02E"
    mask="url(#d)"
  />
  <path
    d="M171.22 267.83a9.422 9.422 0 0 1-9.422-9.423v-3.438a9.423 9.423 0 0 1 18.845 0v3.438a9.423 9.423 0 0 1-9.422 9.423"
    fill="#92C110"
    mask="url(#d)"
  />
  <path
    d="M181.31 293.666h-27.712a3.209 3.209 0 0 1-3.209-3.21V269.79a3.209 3.209 0 0 1 3.209-3.21h27.711a3.209 3.209 0 0 1 3.209 3.21v20.668a3.209 3.209 0 0 1-3.209 3.209"
    fill="#F2D7AD"
    mask="url(#d)"
  />
</g>
</svg>
`;
  const NotFound = `#<svg width="252" height="294">
<defs>
  <path d="M0 .387h251.772v251.772H0z" />
</defs>
<g fill="none" fillRule="evenodd">
  <g transform="translate(0 .012)">
    <mask fill="#fff" />
    <path
      d="M0 127.32v-2.095C0 56.279 55.892.387 124.838.387h2.096c68.946 0 124.838 55.892 124.838 124.838v2.096c0 68.946-55.892 124.838-124.838 124.838h-2.096C55.892 252.16 0 196.267 0 127.321"
      fill="#E4EBF7"
      mask="url(#b)"
    />
  </g>
  <path
    d="M39.755 130.84a8.276 8.276 0 1 1-16.468-1.66 8.276 8.276 0 0 1 16.468 1.66"
    fill="#FFF"
  />
  <path
    d="M36.975 134.297l10.482 5.943M48.373 146.508l-12.648 10.788"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    d="M39.875 159.352a5.667 5.667 0 1 1-11.277-1.136 5.667 5.667 0 0 1 11.277 1.136M57.588 143.247a5.708 5.708 0 1 1-11.358-1.145 5.708 5.708 0 0 1 11.358 1.145M99.018 26.875l29.82-.014a4.587 4.587 0 1 0-.003-9.175l-29.82.013a4.587 4.587 0 1 0 .003 9.176M110.424 45.211l29.82-.013a4.588 4.588 0 0 0-.004-9.175l-29.82.013a4.587 4.587 0 1 0 .004 9.175"
    fill="#FFF"
  />
  <path
    d="M112.798 26.861v-.002l15.784-.006a4.588 4.588 0 1 0 .003 9.175l-15.783.007v-.002a4.586 4.586 0 0 0-.004-9.172M184.523 135.668c-.553 5.485-5.447 9.483-10.931 8.93-5.485-.553-9.483-5.448-8.93-10.932.552-5.485 5.447-9.483 10.932-8.93 5.485.553 9.483 5.447 8.93 10.932"
    fill="#FFF"
  />
  <path
    d="M179.26 141.75l12.64 7.167M193.006 156.477l-15.255 13.011"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    d="M184.668 170.057a6.835 6.835 0 1 1-13.6-1.372 6.835 6.835 0 0 1 13.6 1.372M203.34 153.325a6.885 6.885 0 1 1-13.7-1.382 6.885 6.885 0 0 1 13.7 1.382"
    fill="#FFF"
  />
  <path
    d="M151.931 192.324a2.222 2.222 0 1 1-4.444 0 2.222 2.222 0 0 1 4.444 0zM225.27 116.056a2.222 2.222 0 1 1-4.445 0 2.222 2.222 0 0 1 4.444 0zM216.38 151.08a2.223 2.223 0 1 1-4.446-.001 2.223 2.223 0 0 1 4.446 0zM176.917 107.636a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM195.291 92.165a2.223 2.223 0 1 1-4.445 0 2.223 2.223 0 0 1 4.445 0zM202.058 180.711a2.223 2.223 0 1 1-4.446 0 2.223 2.223 0 0 1 4.446 0z"
    stroke="#FFF"
    strokeWidth="2"
  />
  <path
    stroke="#FFF"
    strokeWidth="2"
    d="M214.404 153.302l-1.912 20.184-10.928 5.99M173.661 174.792l-6.356 9.814h-11.36l-4.508 6.484M174.941 125.168v-15.804M220.824 117.25l-12.84 7.901-15.31-7.902V94.39"
  />
  <path
    d="M166.588 65.936h-3.951a4.756 4.756 0 0 1-4.743-4.742 4.756 4.756 0 0 1 4.743-4.743h3.951a4.756 4.756 0 0 1 4.743 4.743 4.756 4.756 0 0 1-4.743 4.742"
    fill="#FFF"
  />
  <path
    d="M174.823 30.03c0-16.281 13.198-29.48 29.48-29.48 16.28 0 29.48 13.199 29.48 29.48 0 16.28-13.2 29.48-29.48 29.48-16.282 0-29.48-13.2-29.48-29.48"
    fill="#1890FF"
  />
  <path
    d="M205.952 38.387c.5.5.785 1.142.785 1.928s-.286 1.465-.785 1.964c-.572.5-1.214.75-2 .75-.785 0-1.429-.285-1.929-.785-.572-.5-.82-1.143-.82-1.929s.248-1.428.82-1.928c.5-.5 1.144-.75 1.93-.75.785 0 1.462.25 1.999.75m4.285-19.463c1.428 1.249 2.143 2.963 2.143 5.142 0 1.712-.427 3.13-1.219 4.25-.067.096-.137.18-.218.265-.416.429-1.41 1.346-2.956 2.699a5.07 5.07 0 0 0-1.428 1.75 5.207 5.207 0 0 0-.536 2.357v.5h-4.107v-.5c0-1.357.215-2.536.714-3.5.464-.964 1.857-2.464 4.178-4.536l.43-.5c.643-.785.964-1.643.964-2.535 0-1.18-.358-2.108-1-2.785-.678-.68-1.643-1.001-2.858-1.001-1.536 0-2.642.464-3.357 1.43-.37.5-.621 1.135-.76 1.904a1.999 1.999 0 0 1-1.971 1.63h-.004c-1.277 0-2.257-1.183-1.98-2.43.337-1.518 1.02-2.78 2.073-3.784 1.536-1.5 3.607-2.25 6.25-2.25 2.32 0 4.214.607 5.642 1.894"
    fill="#FFF"
  />
  <path
    d="M52.04 76.131s21.81 5.36 27.307 15.945c5.575 10.74-6.352 9.26-15.73 4.935-10.86-5.008-24.7-11.822-11.577-20.88"
    fill="#FFB594"
  />
  <path
    d="M90.483 67.504l-.449 2.893c-.753.49-4.748-2.663-4.748-2.663l-1.645.748-1.346-5.684s6.815-4.589 8.917-5.018c2.452-.501 9.884.94 10.7 2.278 0 0 1.32.486-2.227.69-3.548.203-5.043.447-6.79 3.132-1.747 2.686-2.412 3.624-2.412 3.624"
    fill="#FFC6A0"
  />
  <path
    d="M128.055 111.367c-2.627-7.724-6.15-13.18-8.917-15.478-3.5-2.906-9.34-2.225-11.366-4.187-1.27-1.231-3.215-1.197-3.215-1.197s-14.98-3.158-16.828-3.479c-2.37-.41-2.124-.714-6.054-1.405-1.57-1.907-2.917-1.122-2.917-1.122l-7.11-1.383c-.853-1.472-2.423-1.023-2.423-1.023l-2.468-.897c-1.645 9.976-7.74 13.796-7.74 13.796 1.795 1.122 15.703 8.3 15.703 8.3l5.107 37.11s-3.321 5.694 1.346 9.109c0 0 19.883-3.743 34.921-.329 0 0 3.047-2.546.972-8.806.523-3.01 1.394-8.263 1.736-11.622.385.772 2.019 1.918 3.14 3.477 0 0 9.407-7.365 11.052-14.012-.832-.723-1.598-1.585-2.267-2.453-.567-.736-.358-2.056-.765-2.717-.669-1.084-1.804-1.378-1.907-1.682"
    fill="#FFF"
  />
  <path
    d="M101.09 289.998s4.295 2.041 7.354 1.021c2.821-.94 4.53.668 7.08 1.178 2.55.51 6.874 1.1 11.686-1.26-.103-5.51-6.889-3.98-11.96-6.713-2.563-1.38-3.784-4.722-3.598-8.799h-9.402s-1.392 10.52-1.16 14.573"
    fill="#CBD1D1"
  />
  <path
    d="M101.067 289.826s2.428 1.271 6.759.653c3.058-.437 3.712.481 7.423 1.031 3.712.55 10.724-.069 11.823-.894.413 1.1-.343 2.063-.343 2.063s-1.512.603-4.812.824c-2.03.136-5.8.291-7.607-.503-1.787-1.375-5.247-1.903-5.728-.241-3.918.95-7.355-.286-7.355-.286l-.16-2.647z"
    fill="#2B0849"
  />
  <path
    d="M108.341 276.044h3.094s-.103 6.702 4.536 8.558c-4.64.618-8.558-2.303-7.63-8.558"
    fill="#A4AABA"
  />
  <path
    d="M57.542 272.401s-2.107 7.416-4.485 12.306c-1.798 3.695-4.225 7.492 5.465 7.492 6.648 0 8.953-.48 7.423-6.599-1.53-6.12.266-13.199.266-13.199h-8.669z"
    fill="#CBD1D1"
  />
  <path
    d="M51.476 289.793s2.097 1.169 6.633 1.169c6.083 0 8.249-1.65 8.249-1.65s.602 1.114-.619 2.165c-.993.855-3.597 1.591-7.39 1.546-4.145-.048-5.832-.566-6.736-1.168-.825-.55-.687-1.58-.137-2.062"
    fill="#2B0849"
  />
  <path
    d="M58.419 274.304s.033 1.519-.314 2.93c-.349 1.42-1.078 3.104-1.13 4.139-.058 1.151 4.537 1.58 5.155.034.62-1.547 1.294-6.427 1.913-7.252.619-.825-4.903-2.119-5.624.15"
    fill="#A4AABA"
  />
  <path
    d="M99.66 278.514l13.378.092s1.298-54.52 1.853-64.403c.554-9.882 3.776-43.364 1.002-63.128l-12.547-.644-22.849.78s-.434 3.966-1.195 9.976c-.063.496-.682.843-.749 1.365-.075.585.423 1.354.32 1.966-2.364 14.08-6.377 33.104-8.744 46.677-.116.666-1.234 1.009-1.458 2.691-.04.302.211 1.525.112 1.795-6.873 18.744-10.949 47.842-14.277 61.885l14.607-.014s2.197-8.57 4.03-16.97c2.811-12.886 23.111-85.01 23.111-85.01l3.016-.521 1.043 46.35s-.224 1.234.337 2.02c.56.785-.56 1.123-.392 2.244l.392 1.794s-.449 7.178-.898 11.89c-.448 4.71-.092 39.165-.092 39.165"
    fill="#7BB2F9"
  />
  <path
    d="M76.085 221.626c1.153.094 4.038-2.019 6.955-4.935M106.36 225.142s2.774-1.11 6.103-3.883"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M107.275 222.1s2.773-1.11 6.102-3.884"
    stroke="#648BD8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M74.74 224.767s2.622-.591 6.505-3.365M86.03 151.634c-.27 3.106.3 8.525-4.336 9.123M103.625 149.88s.11 14.012-1.293 15.065c-2.219 1.664-2.99 1.944-2.99 1.944M99.79 150.438s.035 12.88-1.196 24.377M93.673 175.911s7.212-1.664 9.431-1.664M74.31 205.861a212.013 212.013 0 0 1-.979 4.56s-1.458 1.832-1.009 3.776c.449 1.944-.947 2.045-4.985 15.355-1.696 5.59-4.49 18.591-6.348 27.597l-.231 1.12M75.689 197.807a320.934 320.934 0 0 1-.882 4.754M82.591 152.233L81.395 162.7s-1.097.15-.5 2.244c.113 1.346-2.674 15.775-5.18 30.43M56.12 274.418h13.31"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M116.241 148.22s-17.047-3.104-35.893.2c.158 2.514-.003 4.15-.003 4.15s14.687-2.818 35.67-.312c.252-2.355.226-4.038.226-4.038"
    fill="#192064"
  />
  <path
    d="M106.322 151.165l.003-4.911a.81.81 0 0 0-.778-.815c-2.44-.091-5.066-.108-7.836-.014a.818.818 0 0 0-.789.815l-.003 4.906a.81.81 0 0 0 .831.813c2.385-.06 4.973-.064 7.73.017a.815.815 0 0 0 .842-.81"
    fill="#FFF"
  />
  <path
    d="M105.207 150.233l.002-3.076a.642.642 0 0 0-.619-.646 94.321 94.321 0 0 0-5.866-.01.65.65 0 0 0-.63.647v3.072a.64.64 0 0 0 .654.644 121.12 121.12 0 0 1 5.794.011c.362.01.665-.28.665-.642"
    fill="#192064"
  />
  <path
    d="M100.263 275.415h12.338M101.436 270.53c.006 3.387.042 5.79.111 6.506M101.451 264.548a915.75 915.75 0 0 0-.015 4.337M100.986 174.965l.898 44.642s.673 1.57-.225 2.692c-.897 1.122 2.468.673.898 2.243-1.57 1.57.897 1.122 0 3.365-.596 1.489-.994 21.1-1.096 35.146"
    stroke="#648BD8"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M46.876 83.427s-.516 6.045 7.223 5.552c11.2-.712 9.218-9.345 31.54-21.655-.786-2.708-2.447-4.744-2.447-4.744s-11.068 3.11-22.584 8.046c-6.766 2.9-13.395 6.352-13.732 12.801M104.46 91.057l.941-5.372-8.884-11.43-5.037 5.372-1.74 7.834a.321.321 0 0 0 .108.32c.965.8 6.5 5.013 14.347 3.544a.332.332 0 0 0 .264-.268"
    fill="#FFC6A0"
  />
  <path
    d="M93.942 79.387s-4.533-2.853-2.432-6.855c1.623-3.09 4.513 1.133 4.513 1.133s.52-3.642 3.121-3.642c.52-1.04 1.561-4.162 1.561-4.162s11.445 2.601 13.526 3.121c0 5.203-2.304 19.424-7.84 19.861-8.892.703-12.449-9.456-12.449-9.456"
    fill="#FFC6A0"
  />
  <path
    d="M113.874 73.446c2.601-2.081 3.47-9.722 3.47-9.722s-2.479-.49-6.64-2.05c-4.683-2.081-12.798-4.747-17.48.976-9.668 3.223-2.05 19.823-2.05 19.823l2.713-3.021s-3.935-3.287-2.08-6.243c2.17-3.462 3.92 1.073 3.92 1.073s.637-2.387 3.581-3.342c.355-.71 1.036-2.674 1.432-3.85a1.073 1.073 0 0 1 1.263-.704c2.4.558 8.677 2.019 11.356 2.662.522.125.871.615.82 1.15l-.305 3.248z"
    fill="#520038"
  />
  <path
    d="M104.977 76.064c-.103.61-.582 1.038-1.07.956-.489-.083-.801-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.644.698 1.254M112.132 77.694c-.103.61-.582 1.038-1.07.956-.488-.083-.8-.644-.698-1.254.103-.61.582-1.038 1.07-.956.488.082.8.643.698 1.254"
    fill="#552950"
  />
  <path
    stroke="#DB836E"
    strokeWidth="1.118"
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M110.13 74.84l-.896 1.61-.298 4.357h-2.228"
  />
  <path
    d="M110.846 74.481s1.79-.716 2.506.537"
    stroke="#5C2552"
    strokeWidth="1.118"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M92.386 74.282s.477-1.114 1.113-.716c.637.398 1.274 1.433.558 1.99-.717.556.159 1.67.159 1.67"
    stroke="#DB836E"
    strokeWidth="1.118"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M103.287 72.93s1.83 1.113 4.137.954"
    stroke="#5C2552"
    strokeWidth="1.118"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M103.685 81.762s2.227 1.193 4.376 1.193M104.64 84.308s.954.398 1.511.318M94.693 81.205s2.308 7.4 10.424 7.639"
    stroke="#DB836E"
    strokeWidth="1.118"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M81.45 89.384s.45 5.647-4.935 12.787M69 82.654s-.726 9.282-8.204 14.206"
    stroke="#E4EBF7"
    strokeWidth="1.101"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M129.405 122.865s-5.272 7.403-9.422 10.768"
    stroke="#E4EBF7"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M119.306 107.329s.452 4.366-2.127 32.062"
    stroke="#E4EBF7"
    strokeWidth="1.101"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M150.028 151.232h-49.837a1.01 1.01 0 0 1-1.01-1.01v-31.688c0-.557.452-1.01 1.01-1.01h49.837c.558 0 1.01.453 1.01 1.01v31.688a1.01 1.01 0 0 1-1.01 1.01"
    fill="#F2D7AD"
  />
  <path d="M150.29 151.232h-19.863v-33.707h20.784v32.786a.92.92 0 0 1-.92.92" fill="#F4D19D" />
  <path
    d="M123.554 127.896H92.917a.518.518 0 0 1-.425-.816l6.38-9.113c.193-.277.51-.442.85-.442h31.092l-7.26 10.371z"
    fill="#F2D7AD"
  />
  <path fill="#CC9B6E" d="M123.689 128.447H99.25v-.519h24.169l7.183-10.26.424.298z" />
  <path
    d="M158.298 127.896h-18.669a2.073 2.073 0 0 1-1.659-.83l-7.156-9.541h19.965c.49 0 .95.23 1.244.622l6.69 8.92a.519.519 0 0 1-.415.83"
    fill="#F4D19D"
  />
  <path
    fill="#CC9B6E"
    d="M157.847 128.479h-19.384l-7.857-10.475.415-.31 7.7 10.266h19.126zM130.554 150.685l-.032-8.177.519-.002.032 8.177z"
  />
  <path
    fill="#CC9B6E"
    d="M130.511 139.783l-.08-21.414.519-.002.08 21.414zM111.876 140.932l-.498-.143 1.479-5.167.498.143zM108.437 141.06l-2.679-2.935 2.665-3.434.41.318-2.397 3.089 2.384 2.612zM116.607 141.06l-.383-.35 2.383-2.612-2.397-3.089.41-.318 2.665 3.434z"
  />
  <path
    d="M154.316 131.892l-3.114-1.96.038 3.514-1.043.092c-1.682.115-3.634.23-4.789.23-1.902 0-2.693 2.258 2.23 2.648l-2.645-.596s-2.168 1.317.504 2.3c0 0-1.58 1.217.561 2.58-.584 3.504 5.247 4.058 7.122 3.59 1.876-.47 4.233-2.359 4.487-5.16.28-3.085-.89-5.432-3.35-7.238"
    fill="#FFC6A0"
  />
  <path
    d="M153.686 133.577s-6.522.47-8.36.372c-1.836-.098-1.904 2.19 2.359 2.264 3.739.15 5.451-.044 5.451-.044"
    stroke="#DB836E"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M145.16 135.877c-1.85 1.346.561 2.355.561 2.355s3.478.898 6.73.617"
    stroke="#DB836E"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M151.89 141.71s-6.28.111-6.73-2.132c-.223-1.346.45-1.402.45-1.402M146.114 140.868s-1.103 3.16 5.44 3.533M151.202 129.932v3.477M52.838 89.286c3.533-.337 8.423-1.248 13.582-7.754"
    stroke="#DB836E"
    strokeWidth="1.051"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M168.567 248.318a6.647 6.647 0 0 1-6.647-6.647v-66.466a6.647 6.647 0 1 1 13.294 0v66.466a6.647 6.647 0 0 1-6.647 6.647"
    fill="#5BA02E"
  />
  <path
    d="M176.543 247.653a6.647 6.647 0 0 1-6.646-6.647v-33.232a6.647 6.647 0 1 1 13.293 0v33.232a6.647 6.647 0 0 1-6.647 6.647"
    fill="#92C110"
  />
  <path
    d="M186.443 293.613H158.92a3.187 3.187 0 0 1-3.187-3.187v-46.134a3.187 3.187 0 0 1 3.187-3.187h27.524a3.187 3.187 0 0 1 3.187 3.187v46.134a3.187 3.187 0 0 1-3.187 3.187"
    fill="#F2D7AD"
  />
  <path
    d="M88.979 89.48s7.776 5.384 16.6 2.842"
    stroke="#E4EBF7"
    strokeWidth="1.101"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</g>
</svg>`;
  class Result extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Result.defaults, props), ...mixins);
    }
    renderIcon({ status, icon }) {
      const exceptionStatus = Object.keys(Result.ExceptionMap);
      if (exceptionStatus.includes(`${status}`)) {
        const svgComponent = Result.ExceptionMap[status];
        return {
          classes: { "nom-result-icon": true, "nom-result-image": true },
          children: svgComponent,
        };
      }
      let iconContent = Result.IconMap[status];
      if (icon) {
        if (isString(icon)) {
          iconContent = { component: "Icon", type: icon };
        } else {
          iconContent = icon;
        }
      }
      return {
        classes: { "nom-result-icon": true },
        children: Object.assign({ classes: { anticon: true } }, iconContent),
      };
    }
    _config() {
      const { status, title, subTitle, extra, icon, children } = this.props;
      this.setProps({
        classes: { [`nom-result-${status}`]: true },
        children: [
          this.renderIcon({ status, icon }),
          { classes: { "nom-result-title": true }, children: title },
          subTitle
            ? { classes: { "nom-result-subtitle": true }, children: subTitle }
            : null,
          extra
            ? { classes: { "nom-result-extra": true }, children: extra }
            : null,
          children
            ? { classes: { "nom-result-content": true }, children }
            : null,
        ],
      });
    }
  }
  Result.IconMap = {
    success: { component: "Icon", type: "check-circle" },
    error: { component: "Icon", type: "close-circle" },
    info: { component: "Icon", type: "info-circle" },
    warning: { component: "Icon", type: "exclamation-circle" },
  };
  Result.ExceptionMap = { 404: NotFound, 500: ServerError, 403: UnAuthorized };
  Result.defaults = {
    // icon: 'info',
    status: "info", //  '403' | '404' | '500'|'success'|'error'|'info'|'warning',
    // title: '',
    // subTitle:'',
    // extra:null,
    // children:null
  };
  Component.register(Result);
  class Row extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(Row);
  class Rows extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        wrap: false,
        items: [],
        itemDefaults: null,
        gutter: "md",
        childDefaults: { component: Row },
        showEmpty: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["gutter", "align", "justify"];
      const { items } = this.props;
      const children = [];
      if (Array.isArray(items) && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          item = Component.extendProps({}, this.props.itemDefaults, item);
          children.push({ component: Row, children: item });
        }
        this.setProps({ children: children });
      } else if (this.props.showEmpty) {
        if (isPlainObject(this.props.showEmpty)) {
          this.setProps({
            children: Object.assign(
              { component: "Empty" },
              this.props.showEmpty
            ),
          });
        } else {
          this.setProps({ children: { component: "Empty" } });
        }
      }
    }
  }
  Component.register(Rows);
  class SkeletonAvatar extends Avatar {
    constructor(props, ...mixins) {
      super(Component.extendProps(SkeletonAvatar.defaults, props), ...mixins);
    }
  }
  SkeletonAvatar.defaults = {};
  Component.register(SkeletonAvatar);
  class SkeletonImage extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(SkeletonImage.defaults, props), ...mixins);
    }
    _config() {
      const width = isNumeric(this.props.width)
        ? `${this.props.width}px`
        : this.props.width;
      const height = isNumeric(this.props.height)
        ? `${this.props.height}px`
        : this.props.height;
      let fontSize = "2.5rem";
      if (width || height) {
        const num = Math.max(parseInt(width, 10), parseInt(height, 10));
        if (num > 200) {
          fontSize = "4rem";
        }
        if (num > 400) {
          fontSize = "5rem";
        }
      }
      this.setProps({
        attrs: { style: { width: width, height: height, fontSize: fontSize } },
        children: { component: "Icon", type: "image" },
      });
    }
  }
  SkeletonImage.defaults = { width: null, height: null };
  Component.register(SkeletonImage);
  class SkeletonParagraph extends Component {
    constructor(props, ...mixins) {
      super(
        Component.extendProps(SkeletonParagraph.defaults, props),
        ...mixins
      );
    }
    _config() {
      this.setProps({ tag: "ul", children: this.getParagraph() });
    }
    getParagraph() {
      const rows = this.props.paragraph > 1 ? this.props.paragraph : 3;
      const list = [];
      for (let i = 0; i < rows; i++) {
        list.push({ tag: "li" });
      }
      return list;
    }
  }
  SkeletonParagraph.defaults = {};
  Component.register(SkeletonParagraph);
  class SkeletonTitle extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(SkeletonTitle.defaults, props), ...mixins);
    }
    _config() {
      const width = isNumeric(this.props.width)
        ? `${this.props.width}px`
        : this.props.width;
      this.setProps({ attrs: { style: { width: width, maxWidth: width } } });
    }
  }
  SkeletonTitle.defaults = {};
  Component.register(SkeletonTitle);
  class Skeleton extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Skeleton.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { type, cols, rows } = this.props;
      if (type) {
        const typeMap = {
          avatar: { component: SkeletonAvatar, size: this.props.size },
          title: { component: SkeletonTitle, width: this.props.width },
          paragraph: {
            component: SkeletonParagraph,
            paragraph: this.props.paragraph,
          },
          image: {
            component: SkeletonImage,
            width: this.props.width,
            height: this.props.height,
          },
        };
        this.setProps({
          children: typeMap[this.props.type],
          classes: { "nom-skeleton-single": true },
        });
      } else if (rows && cols) {
        this.setProps({
          children: {
            component: "Flex",
            gutter: "large",
            fills: true,
            rows: that.getCols(that.props.rows),
          },
        });
      } else if (rows || cols) {
        this.setProps({
          children: {
            component: "Flex",
            gutter: "large",
            fills: true,
            rows: that.props.rows ? that.getSkeleton(rows) : null,
            cols: that.props.cols ? that.getSkeleton(cols) : null,
          },
        });
      } else {
        this.setProps({ children: that.getSkeleton() });
      }
    }
    getCols(num) {
      if (!num) {
        num = 1;
      }
      const that = this;
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push({
          fills: true,
          gutter: "large",
          cols: that.getSkeleton(that.props.cols),
        });
      }
      return arr;
    }
    getSkeleton(num) {
      if (!num) {
        num = 1;
      }
      const { avatar, title, paragraph, image } = this.props;
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push({
          component: "Flex",
          gutter: "medium",
          cols: [
            avatar &&
              Object.assign({ component: SkeletonAvatar }, this.props.avatar),
            image &&
              Object.assign({ component: SkeletonImage }, this.props.image),
            {
              grow: true,
              children: [
                title && { component: SkeletonTitle },
                paragraph && {
                  component: SkeletonParagraph,
                  paragraph: this.props.paragraph,
                },
              ],
            },
          ],
        });
      }
      return arr;
    }
  }
  Component.mixin({
    _created: function () {
      if (this.props.skeleton && this.props.autoRender) {
        this.showSkeleton = true;
      }
    },
    _config: function () {
      if (this.showSkeleton && this.firstRender) {
        this.setProps({
          children: Object.assign(
            { component: "Skeleton" },
            this.props.skeleton
          ),
        });
        return false;
      }
    },
  });
  Skeleton.defaults = {
    type: null,
    avatar: false,
    title: true,
    paragraph: 3,
    image: false,
    cols: null,
    rows: null,
  };
  Component.register(Skeleton);
  class SlideCaptcha extends Component {
    constructor(props, ...mixins) {
      super(
        Component.extendProps(SlideCaptcha.defaults, props, {
          state: {
            // 记录开始滑动的时间
            startTime: new Date(), // 记录结束滑动的时间
            endTime: new Date(), // 当前是否正在移动中
            isMove: false, // 位置差(相当于页面浏览器最左端)
            poorX: 0, // 拖拽元素距离左边的距离
            distance: 0,
          },
        }),
        ...mixins
      );
    }
    dispatch(action) {
      let newState = {};
      switch (
        action.type // 重置
      ) {
        case "reset":
          newState = {
            // 记录开始滑动的时间
            startTime: new Date(), // 记录结束滑动的时间
            endTime: new Date(), // 当前是否正在移动中
            isMove: false, // 位置差(相当于页面浏览器最左端)
            poorX: 0, // 拖拽元素距离左边的距离
            distance: 0,
          };
          break; // 记录开始时间
        case "setStartTime":
          newState = { startTime: action.payload };
          break; // 记录结束时间
        case "setEndTime":
          newState = { endTime: action.payload };
          break; // 记录移动状态
        case "setMove":
          newState = { isMove: action.payload };
          break; // 记录位置差
        case "setPoorX":
          newState = { poorX: action.payload };
          break; // 设置拖拽元素距离左边的距离
        case "setDistance":
          newState = { distance: action.payload };
          break;
        case "change":
          newState = Object.assign({}, action.payload);
          break;
        default:
          throw new Error(
            `unsupport dispatch type:${action} in SlideCaptcha reducer`
          );
      }
      this.update({ state: Object.assign({}, newState) });
    }
    /**
     * 获取最大可拖拽宽度
     */ getMaxSlideWidth() {
      return this.props.width - 40;
    }
    defaultEvent(e) {
      e.preventDefault();
    }
    refresh() {
      this.props.onRefresh && this.props.onRefresh();
      this.dispatch({ type: "reset" });
    }
    /**
     * 鼠标/手指开始滑动
     * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
     */ dragStart(currentPageX) {
      const { state } = this.props;
      this.dispatch({
        type: "change",
        payload: {
          isMove: true,
          poorX: currentPageX - state.distance, // 当前位置减去已拖拽的位置作为位置差
          startTime: new Date(),
        },
      });
    }
    /**
     * 拖拽移动过程触发
     * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
     */ dragMoving(currentPageX) {
      const { state } = this.props;
      const distance = currentPageX - state.poorX; // 鼠标指针移动距离超过最大时清空事件
      const maxSlideWidth = this.getMaxSlideWidth();
      if (
        state.isMove &&
        distance !== state.distance &&
        distance >= 0 &&
        distance < maxSlideWidth
      ) {
        this.dispatch({ type: "change", payload: { distance } });
      }
    }
    /**
     * 拖拽结束触发
     * @param {*} currentPageX 当前所处位置距离浏览器最左边的位置
     */ dragEnd() {
      const that = this;
      const {
        state,
        validate,
        autoRefreshOnFail,
        onFinish,
        token,
        onFinishFailed,
      } = that.props; // 距离不能少于5 否则算没拖动
      if (!state.isMove || state.distance < 5) {
        that.dispatch({ type: "reset" });
        return true;
      }
      that.dispatch({ type: "setMove", payload: false });
      if (state.poorX === undefined) {
        return true;
      }
      that.dispatch({ type: "setEndTime", payload: new Date() });
      setTimeout(() => {
        // 调用远程进行校验
        validate &&
          validate({
            token: token,
            point: state.distance,
            timespan: Math.abs(Number(state.endTime) - Number(state.startTime)),
          })
            .then((result) => {
              onFinish && onFinish(result);
              return result;
            })
            .catch((err) => {
              if (onFinishFailed) {
                onFinishFailed(err, that.refresh);
              }
              if (autoRefreshOnFail) {
                that.refresh();
              }
            });
      });
    }
    handleMouseMove(e) {
      this.dragMoving(e.pageX);
    }
    handleMouseUp() {
      this.dragEnd();
    }
    handleRefreshCaptcha(e) {
      this.refresh();
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.stopImmediatePropagation && e.stopImmediatePropagation();
    }
    _config() {
      const {
        width,
        height,
        bgSrc,
        captchSrc,
        top,
        tip,
        refreshTitle,
        state,
      } = this.props;
      const that = this;
      this.setProps({
        attrs: { style: { height: `${height + 34}px`, width: `${width}px` } },
        children: [
          {
            tag: "div",
            attrs: {
              style: {
                width: `${width}px`,
                height: `${height}px`,
                background: "#e8e8e8",
              },
            },
            children: [
              {
                tag: "div",
                classes: { "captcha-img": true },
                attrs: {
                  style: {
                    backgroundImage: `url(${bgSrc})`,
                    width: `${width}px`,
                    height: `${height}px`,
                  },
                },
              },
              {
                tag: "div",
                classes: { "small-drag": true },
                attrs: {
                  style: {
                    backgroundImage: `url(${captchSrc})`,
                    top: `${top}px`,
                    left: `${state.distance}px`,
                  },
                },
              },
            ],
          },
          {
            tag: "div",
            classes: { drag: true },
            attrs: { style: { width: `${width}px` } },
            children: [
              {
                tag: "div",
                classes: { "drag-bg": true },
                attrs: { style: { width: `${state.distance}px` } },
              },
              {
                tag: "div",
                classes: { "drag-text": true },
                attrs: { style: { width: `${width}px` }, unselectable: "on" },
                children: tip,
              },
              {
                tag: "div",
                classes: { handler: true, "handler-bg": true },
                attrs: {
                  style: { left: `${state.distance}px` },
                  onmousedown: function (e) {
                    that.dragStart(e.pageX);
                  },
                },
              },
              {
                classes: { "refesh-btn": true },
                component: "Button",
                icon: "refresh",
                shape: "circle",
                type: "link",
                attrs: {
                  onmouseup: this.handleRefreshCaptcha,
                  style: { visibility: state.isMove ? "hidden" : "visible" },
                  title: refreshTitle,
                },
              },
            ],
          },
        ],
      });
    }
    _created() {
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseUp = this.handleMouseUp.bind(this);
      this.dragStart = this.dragStart.bind(this);
      this.dragEnd = this.dragEnd.bind(this);
      this.dragMoving = this.dragMoving.bind(this);
      this.handleRefreshCaptcha = this.handleRefreshCaptcha.bind(this);
      this.defaultEvent = this.defaultEvent.bind(this); // 移动鼠标、松开鼠标
      this.referenceElement.addEventListener(
        "mousemove",
        this.handleMouseMove,
        true
      );
      this.referenceElement.addEventListener("mouseup", this.handleMouseUp);
    }
    _remove() {
      this.referenceElement.removeEventListener(
        "mousemove",
        this.handleMouseMove,
        true
      );
      this.referenceElement.removeEventListener("mouseup", this.handleMouseUp);
    }
  }
  SlideCaptcha.defaults = {
    token: null,
    bgSrc: "",
    captchSrc: "",
    width: 300,
    height: 300,
    top: 0, // onRefresh:()=>{},
    // validate:()=>{},
    // onFinish:()=>{},
    // onFinishFailed:()=>{},
    refreshTitle: "换一张",
    tip: "向右滑动完成拼图",
    autoRefreshOnFail: true, // 失败后是否自动刷新图片
  };
  Component.register(SlideCaptcha);
  class Slider extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Slider.defaults, props), ...mixins);
    }
    _created() {
      const { value } = this.props; // 最大值不能小于或等于0，否则重置为默认值100
      const max = getValidMax();
      this.initValue = getValidValue(value, max);
      super._created();
    }
    _config() {
      const sliderRef = this;
      const { value, disable, showTip } = this.props;
      this._max = getValidMax(this.props.max);
      sliderRef._offset = getValidValue(value, this._max);
      this.setProps({
        control: {
          children: {
            classes: {
              "nom-slider-content": true,
              "nom-slider-content-disabled": disable,
            },
            _created() {
              sliderRef._bar = this;
            },
            onClick: disable
              ? null
              : ({ event }) => {
                  event.target.focus();
                  const _offset = getOffset(
                    sliderRef._bar,
                    event.clientX,
                    sliderRef._max
                  );
                  sliderRef.setValue(Math.round(_offset));
                },
            attrs: {
              tabindex: "0",
              onkeydown: sliderRef._handleKeyDown.bind(sliderRef),
            },
            children: [
              { classes: { "nom-slider-rail": true } },
              {
                classes: { "nom-slider-track": true },
                _created() {
                  sliderRef._track = this;
                },
                _config() {
                  // const { offset } = this.props
                  const offset = sliderRef.getValue();
                  const _offset = offset / sliderRef._max;
                  this.setProps({
                    attrs: { style: { left: 0, width: `${_offset * 100}%` } },
                  });
                },
              }, // {
              //   classes: {
              //     'nom-slider-step': true,
              //   },
              // },
              {
                classes: { "nom-slider-handle": true },
                _created() {
                  sliderRef._handler = this;
                },
                _config() {
                  const offset = sliderRef.getValue();
                  const _offset = offset / sliderRef._max;
                  const tip = isFalsy(offset) ? 0 : offset.toString();
                  let tooltip = showTip === false ? null : tip;
                  if (showTip && isFunction(showTip)) {
                    tooltip = showTip(tip);
                  }
                  this.setProps({
                    attrs: { style: { left: `${_offset * 100}%` } },
                    tooltip,
                  });
                },
              },
            ],
          },
        },
      });
      super._config();
    }
    _getValue() {
      return getValidValue(this._offset, this._max);
    }
    _setValue(value) {
      const _value = value === null ? 0 : value;
      if (!isNumeric(_value) || _value < 0 || _value > this.props.max) return;
      if (this._handler && _value !== this.oldValue) {
        this._offset = _value;
        this._handler.update();
        this._track.update();
        super._onValueChange();
        this.oldValue = this.currentValue;
        this.currentValue = _value;
      }
    }
    _handleKeyDown(e) {
      const { keyCode } = e;
      const value = this.getValue();
      if (keyCode === 38) {
        if (value <= this.props.max) {
          this.setValue(value + 1);
        }
      } else if (keyCode === 40) {
        if (value >= 0) {
          this.setValue(value - 1);
        }
      }
    }
  }
  Slider.defaults = { disable: false, max: 100 };
  Component.register(Slider);
  class StaticText extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(StaticText.defaults, props), ...mixins);
    }
    _config() {
      this.setProps({ control: { children: this.props.value } });
      super._config();
    }
    _setValue(value) {
      this.update({ value });
    }
    _getValue() {
      return this.props.value;
    }
  }
  StaticText.defaults = { value: null };
  Component.register(StaticText);
  const STATUS = {
    WAIT: "wait",
    PROCESS: "process",
    FINISH: "finish",
    ERROR: "error",
  };
  class Step extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Step.defaults, props), ...mixins);
    }
    _config() {
      // status wait process finish error
      const {
        status,
        title,
        subTitle,
        description,
        onChange,
        index,
        icon: i,
        iconRender,
      } = this.props;
      let icon;
      if (isFunction(iconRender)) {
        icon = iconRender();
      } else {
        icon = this._handleIcon();
      }
      this.setProps({
        classes: {
          [`nom-step-item-${status}`]: true,
          "nom-step-item-icon-render-mode": isFunction(iconRender),
        },
        children: {
          classes: { "nom-step-item-container": true },
          _config() {
            if (onChange) {
              this.setProps({
                attrs: { role: "button" },
                onClick: () => {
                  onChange(index);
                },
              });
            }
          },
          children: [
            { classes: { "nom-step-item-tail": true } },
            {
              classes: {
                "nom-step-item-icon": true,
                "nom-step-item-icon-customer": !!i || isFunction(iconRender),
                "nom-step-item-icon-whole-customer": isFunction(iconRender),
              },
              children: icon,
            },
            {
              classes: { "nom-step-item-content": true },
              children: [
                { classes: { "nom-step-item-title": true }, children: title },
                {
                  classes: { "nom-step-item-subtitle": true },
                  children: subTitle,
                },
                {
                  classes: { "nom-step-item-description": true },
                  children: description,
                },
              ],
            },
          ],
        },
      });
      super._config();
    }
    _handleIcon() {
      const { status, icon: i, index } = this.props; // const { WAIT, PROCESS, FINISH, ERROR } = STATUS
      const { FINISH, ERROR } = STATUS;
      if (i) {
        return Component.normalizeIconProps(i);
      }
      if (status === FINISH) {
        return {
          component: "Icon",
          type: "check",
          classes: { [`nom-step-${status}-icon`]: true },
        };
      }
      if (status === ERROR) {
        return {
          component: "Icon",
          type: "close",
          classes: { [`nom-step-${status}-icon`]: true },
        };
      }
      return {
        tag: "span",
        children: index + 1,
        classes: { [`nom-step-${status}-icon`]: true },
      };
    }
  }
  Step.defaults = {
    disabled: false,
    current: 0, // wait process finish error
    status: "wait",
    iconRender: null,
  };
  class Steps extends Component {
    constructor(props, ...mixins) {
      // active current
      super(Component.extendProps(Steps.defaults, props), ...mixins);
    }
    _config() {
      // const steps = this
      const { direction, current } = this.props;
      this._handleCurrent(current);
      this.setProps({
        tag: "div",
        classes: {
          "nom-steps-horizontal": direction === "horizontal",
          "nom-steps-vertical": direction === "vertical",
        },
      });
      this.setProps({ children: this._handleChild() });
      super._config();
    }
    _handleChild() {
      const { options, onChange } = this.props;
      if (!options || !Array.isArray(options) || options.length === 0)
        return [];
      return options.map((item, index) =>
        Object.assign({ status: this._getStatus(index, this.current) }, item, {
          index,
          component: Step,
          onChange: isFunction(onChange) ? onChange : undefined,
        })
      );
    }
    _getStatus(index, current) {
      const { WAIT, PROCESS, FINISH } = STATUS;
      if (index === current) return PROCESS;
      return index < current ? FINISH : WAIT;
    }
    _handleCurrent(cur) {
      let current = 0;
      if (isNumeric(cur)) current = parseInt(cur, 10);
      this.current = current;
    }
  }
  Steps.defaults = {
    direction: "horizontal",
    current: 0,
    options: [],
    onChange: null,
  };
  Component.register(Steps);
  class Switch extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Switch.defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { value, unselectedText, selectedText, animate } = this.props;
      this._propStyleClasses = ["size"];
      this.setProps({
        control: {
          tag: "button",
          classes: { "nom-switch-control": true, "nom-switch-active": !!value },
          attrs: {
            onclick: () => {
              if (that.props.disabled) {
                return false;
              }
              that._handleClick();
            },
          },
          children: [
            {
              tag: "input",
              _created() {
                that.ck = this;
              },
              attrs: {
                type: "checkbox",
                hidden: true,
                checked: value,
                onchange() {
                  that._onValueChange();
                  that.update({ value: !value });
                },
              },
            },
            {
              tag: "div",
              classes: {
                "nom-switch-el": true,
                "nom-switch-text": value,
                "nom-switch-indicator": !value,
                "nom-switch-text-left": value && animate,
                "nom-switch-indicator-left": !value && animate,
              },
              children: value ? selectedText : null,
            },
            {
              tag: "div",
              children: value ? null : unselectedText,
              classes: {
                "nom-switch-el": true,
                "nom-switch-text": !value,
                "nom-switch-indicator": value,
                "nom-switch-text-right": !value && animate,
                "nom-switch-indicator-right": value && animate,
              },
            }, // { tag: 'i' },
          ],
        },
      });
      super._config();
    }
    _handleClick() {
      if (this.ck) {
        this.ck.element.click();
      }
    }
    _getValue() {
      return this.ck.element.checked;
    }
    _setValue(value) {
      this.ck.element.checked = value === true;
    }
  }
  Switch.defaults = {
    unselectedText: "关",
    selectedText: "开",
    value: false,
    size: "small",
  };
  Component.register(Switch);
  class TabPanel extends Component {
    constructor(props, ...mixins) {
      const defaults = { hidden: true };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tabContent = this.parent;
      this.tabContent.panels[this.key] = this;
    }
    _config() {
      this.setProps({
        hidden: this.key !== this.tabContent.props.selectedPanel,
      });
    }
    _show() {
      if (this.tabContent.shownPanel === this) {
        return;
      }
      this.tabContent.shownPanel && this.tabContent.shownPanel.hide();
      this.tabContent.shownPanel = this;
      this.tabContent.props.selectedPanel = this.key;
    }
  }
  Component.register(TabPanel);
  class TabContent extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(TabContent.defaults, props), ...mixins);
    }
    _created() {
      this.panels = {};
      this.shownPanel = null;
    }
    _config() {
      const { panels } = this.props;
      const children = [];
      if (Array.isArray(panels) && panels.length > 0) {
        for (let i = 0; i < panels.length; i++) {
          let panel = panels[i];
          panel = Component.extendProps({}, this.props.panelDefaults, panel);
          children.push(panel);
        }
      }
      this.setProps({ children: children });
    }
    getPanel(param) {
      let retPanel = null;
      if (isString(param)) {
        return this.panels[param];
      }
      if (isFunction(param)) {
        for (const panel in this.panels) {
          if (this.panels.hasOwnProperty(panel)) {
            if (param.call(this.panels[panel]) === true) {
              retPanel = this.panels[panel];
              break;
            }
          }
        }
      }
      return retPanel;
    }
    showPanel(param) {
      const panel = this.getPanel(param);
      if (panel === null) {
        return false;
      }
      panel.show();
    }
  }
  TabContent.defaults = { panels: [], panelDefaults: { component: TabPanel } };
  Component.register(TabContent);
  class TabItem extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "a",
        url: null,
        icon: null,
        text: null,
        subtext: null,
        selectable: { byClick: true },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.firstShow = true;
    }
    _config() {
      const { icon, text, subtext } = this.props;
      this.setProps({
        attrs: { href: this.getItemUrl(this.props.url) },
        children: [
          icon && { component: "Icon", type: icon },
          text && { tag: "span", children: text },
          subtext && { tag: "span", children: subtext },
        ],
      });
    }
    _select() {
      setTimeout(() => {
        if (this.list.props.tabContent !== false) {
          const tabContent = this.list.getTabContent();
          tabContent.showPanel(this.key);
        }
        !this.list.firstSelect && this.list.triggerChange();
        this.list.firstSelect = false;
      }, 0);
    }
    getItemUrl(url) {
      if (url) {
        return url;
      }
      return "javascript:void(0);";
    }
  }
  Component.register(TabItem);
  class TabList extends List {
    constructor(props, ...mixins) {
      super(Component.extendProps(TabList.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.firstSelect = true;
    }
    _config() {
      this._addPropStyle("direction", "fit");
      this.setProps({ selectedItems: this.props.selectedTab });
      super._config();
    }
    getTabContent() {
      return this.props.tabContent.call(this);
    }
    selectTab(param, selectOptions) {
      this.selectItems(param, selectOptions);
    }
    triggerChange() {
      const selectedItem = this.getSelectedItem();
      if (this.props.parentTab) {
        this._callHandler(this.props.parentTab.props.onTabSelectionChange, {
          selectedItem: selectedItem,
          key: selectedItem.key,
        });
      } else {
        this._callHandler(this.props.onTabSelectionChange, {
          selectedItem: selectedItem,
          key: selectedItem.key,
        });
      }
    }
  }
  TabList.defaults = {
    itemDefaults: { component: TabItem },
    tabContent: null,
    uistyle: "plain",
    itemSelectable: { byClick: true, scrollIntoView: false },
    onTabSelectionChange: null,
    disabledItems: [],
  };
  Component.register(TabList);
  class Tabs extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Tabs.defaults, props), ...mixins);
    }
    _config() {
      this._addPropStyle("fit");
      const that = this;
      const tabItems = [];
      const tabPanles = [];
      const { tabs, uistyle, disabledItems } = this.props;
      let { selectedTab } = this.props;
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        const key = tab.key || `tab${i}`;
        tab.item.key = key;
        tab.panel.key = key;
        tabItems.push(tab.item);
        tabPanles.push(tab.panel);
      }
      if (selectedTab === undefined) {
        selectedTab = tabItems[0] && tabItems[0].key;
      }
      this.setProps({
        tabList: {
          component: TabList,
          name: "tabList",
          items: tabItems,
          uistyle: uistyle,
          selectedTab: selectedTab,
          disabledItems: disabledItems,
          _created: function () {
            this.tabs = that;
            that.tabList = this;
          },
          tabContent: function () {
            return that.tabContent;
          },
          parentTab: this,
        },
        tabContent: {
          component: TabContent,
          panels: tabPanles,
          _created: function () {
            that.tabContent = this;
          },
        },
      });
      if (this.props.tools) {
        this.setProps({
          children: [
            {
              component: "Cols",
              fit: true,
              strechIndex: 0,
              gutter: "xs",
              items: [
                this.props.tabList,
                this.props.tools
                  ? {
                      classes: { "nom-tabs-tools": true },
                      children: isFunction(this.props.tools)
                        ? this.props.tools()
                        : this.props.tools,
                    }
                  : null,
              ],
            },
            this.props.tabContent,
          ],
        });
      } else {
        this.setProps({
          children: [this.props.tabList, this.props.tabContent],
        });
      }
    }
    getSelectedTab() {
      return this.tabList.getSelectedItem();
    }
    selectTab(key) {
      return this.tabList.selectItem(key);
    }
    updatePanel(key, newPanelProps) {
      const panel = this.tabContent.getPanel(key);
      panel.update(newPanelProps);
    }
  }
  Tabs.defaults = {
    tabs: [], // selectedTab: 'tab0',
    uistyle: "plain", // hat,card,line,pill
    onTabSelectionChange: null,
    disabledItems: [],
    tools: null,
  };
  Component.register(Tabs);
  class Tag extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Tag.defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["size", "color"];
      const {
        icon,
        rightIcon,
        text,
        type,
        overflowCount,
        removable,
      } = this.props;
      const number = this.props.number === 0 ? "0" : this.props.number;
      const that = this;
      if (icon || rightIcon) {
        this.setProps({ classes: { "p-with-icon": true } });
      }
      if (type === "round") {
        this.setProps({ classes: { "u-shape-round": true } });
      }
      this.setProps({
        classes: {
          "nom-tag-pointer": !!this.props.onClick || this.props.removable,
        },
        children: {
          component: "Flex",
          align: "center",
          cols: [
            Component.normalizeIconProps(icon),
            {
              children: {
                classes: { "nom-tag-content": true },
                children: text,
                attrs: {
                  style: {
                    maxWidth: this.props.maxWidth
                      ? `${this.props.maxWidth}px`
                      : null,
                  },
                },
              },
            },
            number && {
              tag: "span",
              children: number > overflowCount ? `${overflowCount}+` : number,
            },
            Component.normalizeIconProps(rightIcon),
            removable &&
              Component.normalizeIconProps({
                type: "times",
                classes: {
                  "nom-tag-remove": true,
                  "nom-tag-remove-basic": !that.props.styles,
                },
                onClick: function ({ event }) {
                  nomui.utils.isFunction(that.props.removable) &&
                    that.props.removable(that.props.key);
                  that.hasOwnProperty("props") &&
                    that.props.onRemove &&
                    that._callHandler(that.props.onRemove, {
                      key: that.props.key,
                    });
                  event.stopPropagation();
                },
              }),
          ],
        },
      });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
  Tag.defaults = {
    key: null,
    tag: "span",
    type: "square",
    color: null,
    text: null,
    icon: null,
    number: null,
    overflowCount: 99,
    removable: false,
    size: "sm",
    maxWidth: null,
  };
  Component.register(Tag);
  class TimelineItem extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(TimelineItem.defaults, props), ...mixins);
    }
    _config() {
      const { dot, color, label, pending, children } = this.props;
      this.setProps({
        classes: {
          "nom-timeline-item": true,
          "nom-timeline-item-pending": pending,
        },
        children: [
          label && {
            tag: "div",
            classes: { "nom-timeline-item-label": true },
            children: label,
          },
          { tag: "div", classes: { "nom-timeline-item-tail": true } },
          {
            tag: "div",
            classes: {
              "nom-timeline-item-head": true,
              "nom-timeline-item-head-custom": !!dot,
              [`nom-timeline-item-head-${color}`]: true,
            },
            attrs: {
              style: {
                "border-color": /blue|red|green|gray/.test(color || "")
                  ? undefined
                  : color,
              },
            },
            children: [dot],
          },
          {
            tag: "div",
            classes: { "nom-timeline-item-content": true },
            children,
          },
        ],
      });
    }
  }
  TimelineItem.defaults = {
    tag: "li",
    color: "blue", // 指定圆圈颜色 blue, red, green, gray，或自定义的色值
    dot: null, // 自定义时间轴点
    label: null, // 设置标签
    pending: false, // 是否是幽灵节点
    children: null, // 内容
  };
  Component.register(TimelineItem);
  class Timeline extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Timeline.defaults, props), ...mixins);
    }
    _getPositionClass(ele, index) {
      const { mode } = this.props;
      if (mode === "alternate") {
        return index % 2 === 0
          ? `nom-timeline-item-left`
          : `nom-timeline-item-right`;
      }
      if (mode === "left") {
        return `nom-timeline-item-left`;
      }
      if (mode === "right") {
        return `nom-timeline-item-right`;
      }
      if (ele.props && ele.props.position === "right") {
        return `nom-timeline-item-right`;
      }
      return "";
    }
    _config() {
      const { reverse, pending, mode, pendingDot, items } = this.props;
      const that = this;
      const hasLabelItem = items && items.some((item) => item && item.label); // 生成pending节点
      const pendingItem = pending
        ? {
            component: TimelineItem,
            pending: !!pending,
            dot: pendingDot || { component: "Icon", type: "loading" },
            children: typeof pending === "boolean" ? null : pending,
          }
        : null; // 获取position
      const children = [];
      if (Array.isArray(items) && items.length > 0) {
        const timeLineItems = [...items];
        if (pendingItem) {
          timeLineItems.push(pendingItem);
        }
        if (reverse) {
          timeLineItems.reverse();
        }
        const itemsCount = timeLineItems.length;
        const lastCls = "nom-timeline-item-last";
        for (let i = 0; i < timeLineItems.length; i++) {
          const ele = timeLineItems[i];
          const positionCls = that._getPositionClass(ele, i);
          const pendingClass = i === itemsCount - 2 ? lastCls : "";
          const readyClass = i === itemsCount - 1 ? lastCls : "";
          children.push(
            Object.assign({ component: TimelineItem }, ele, {
              classes: Object.assign({}, ele.classes, {
                [!reverse && !!pending ? pendingClass : readyClass]: true,
                [positionCls]: true,
              }),
            })
          );
        }
      }
      this.setProps({
        classes: {
          [`nom-timeline-pending`]: !!pending,
          [`nom-timeline-reverse`]: !!reverse,
          [`nom-timeline-${mode}`]: !!mode && !hasLabelItem,
          [`nom-timeline-label`]: hasLabelItem,
        },
        children,
      });
    }
  }
  Timeline.defaults = {
    tag: "ul",
    mode: "left", // 通过设置 mode 可以改变时间轴和内容的相对位置 left | alternate | right
    pending: false, // 指定最后一个幽灵节点是否存在或内容,也可以是一个自定义的子元素
    // 当最后一个幽灵节点存在時，指定其时间图点
    pendingDot: { component: "Icon", type: "loading" },
    reverse: false, // 节点排序
    items: null, // 子元素项列表
  };
  Component.register(Timeline);
  class TimePickerList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        gutter: "xs",
        cols: 1,
        min: "00",
        max: "59",
        scrollIntoView: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.scroller = this.parent;
      this.timeWrapper = this.parent.parent.parent.parent.parent;
      this.pickerControl = this.timeWrapper.parentPopup.pickerControl;
      this.pickerControl.timeList[this.props.type] = this;
    }
    _config() {
      let items = [];
      const that = this;
      const { _isHourOverRange, _isMinuteOverRange } = this.pickerControl;
      const { type } = this.props;
      this.props.min = this.pickerControl.timeRange[this.props.type][0];
      this.props.max = this.pickerControl.timeRange[this.props.type][1];
      if (type === "hour") {
        items = this.pickerControl.getHour();
      } else if (type === "minute") {
        items = this.pickerControl.getMinute();
      } else if (type === "second") {
        items = this.pickerControl.getSecond();
      }
      this.setProps({
        styles: { padding: "3px" },
        items: items,
        itemSelectable: {
          multiple: false,
          byClick: true,
          scrollIntoView: { block: "start", scrollMode: "always" },
        },
        itemDefaults: {
          _config: function () {
            const key = this.props.key; // hour超出: 禁用 minute和second || minute超出: 禁用 second
            const disabledOverRange =
              (type !== "hour" && _isHourOverRange) ||
              (type === "second" && _isMinuteOverRange);
            this.setProps({
              disabled:
                key < that.props.min ||
                key > that.props.max ||
                disabledOverRange,
            });
          },
        },
        onItemSelectionChange: () => {
          this.onChange();
        },
      });
      super._config();
    }
    onChange() {
      this.setTime();
    }
    setTime() {
      const key = this.getSelectedItem().key || "00";
      this.pickerControl.setTime({ type: this.props.type, value: key });
    }
    resetTime() {
      const _val = this.pickerControl.getValue();
      if (_val) {
        const t = _val.split(":");
        if (this.props.type === "hour") {
          this.selectItem(t[0], { triggerSelectionChange: false });
        } else if (this.props.type === "minute") {
          this.selectItem(t[1], { triggerSelectionChange: false });
        } else {
          this.selectItem(t[2], { triggerSelectionChange: false });
        }
      } else {
        this.unselectAllItems();
      }
    }
    refresh() {
      this.update();
    }
  }
  class TimePickerWrapper extends Component {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.parentPopup = this.parent.parent.parent;
      this.pickerControl = this.parentPopup.pickerControl;
    }
    _config() {
      const that = this;
      const noStep =
        !that.pickerControl.props.hourStep &&
        !that.pickerControl.props.minuteStep &&
        !that.pickerControl.props.secondStep;
      const nowInRange =
        (!(
          that.pickerControl.props.minTime &&
          that.pickerControl.props.minTime >
            new Date().format(that.pickerControl.props.format)
        ) &&
          !(
            that.pickerControl.props.maxTime &&
            that.pickerControl.props.maxTime <
              new Date().format(that.pickerControl.props.format)
          )) ||
        (!that.pickerControl.props.minTime &&
          !that.pickerControl.props.maxTime);
      this.setProps({
        children: {
          component: "Rows",
          gutter: null,
          items: [
            {
              component: "Cols",
              gutter: null,
              classes: { "timepicker-group": true },
              fills: true,
              align: "stretch",
              children: [
                {
                  hidden: !this.pickerControl.props.format.includes("HH"),
                  children: { component: TimePickerList, type: "hour" },
                },
                {
                  hidden: !this.pickerControl.props.format.includes("mm"),
                  children: { component: TimePickerList, type: "minute" },
                },
                {
                  hidden: !this.pickerControl.props.format.includes("ss"),
                  children: { component: TimePickerList, type: "second" },
                },
              ],
            },
            {
              component: "Cols",
              justify: "between",
              hidden: !that.pickerControl.defaultValue && !noStep,
              attrs: {
                style: { padding: "5px", "border-top": "1px solid #ddd" },
              },
              items: [
                noStep && {
                  component: "Button",
                  size: "small",
                  text: "此刻",
                  disabled: !nowInRange,
                  onClick: function () {
                    that.pickerControl.setNow();
                    that.pickerControl.popup.hide();
                    that.pickerControl.handleChange();
                  },
                },
                that.pickerControl.props.defaultValue && {
                  component: "Button",
                  size: "small",
                  text: "重置",
                  onClick: function () {
                    that.pickerControl.popup.hide();
                    that.pickerControl.handleChange();
                    that.pickerControl.defaultValue =
                      that.pickerControl.props.defaultValue;
                  },
                },
              ],
            },
          ],
        },
      });
    }
  }
  Component.register(TimePickerWrapper);
  class TimePickerPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.pickerControl = this.opener.parent.parent;
    }
    _config() {
      this.setProps({
        children: {
          component: Layout,
          body: { children: { component: TimePickerWrapper } },
        },
      });
      super._config();
    }
  }
  Component.register(TimePickerPopup);
  class TimePicker extends Textbox {
    constructor(props, ...mixins) {
      super(Component.extendProps(TimePicker.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.defaultValue = this.props.value;
      this.timeList = []; // this.confirm = false
      this.empty = !this.props.value;
      this.minTime = { hour: "00", minute: "00", second: "00" };
      this.maxTime = { hour: "23", minute: "59", second: "59" };
      this.time = { hour: "00", minute: "00", second: "00" };
      if (this.props.value) {
        const t = this.props.value.split(":");
        this.time.hour = t[0] || "00";
        this.time.minute = t[1] || "00";
        this.time.second = t[2] || "00";
      }
      this.defaultTime = this.time;
      this.hasPopup = false;
    }
    _config() {
      if (this.props.minTime) {
        const time = new Date(`2000 ${this.props.minTime}`);
        this.minTime = {
          hour: this.getDoubleDigit(time.getHours()),
          minute: this.getDoubleDigit(time.getMinutes()),
          second: this.getDoubleDigit(time.getSeconds()),
        };
      }
      if (this.props.maxTime) {
        const time = new Date(`2000 ${this.props.maxTime}`);
        this.maxTime = {
          hour: this.getDoubleDigit(time.getHours()),
          minute: this.getDoubleDigit(time.getMinutes()),
          second: this.getDoubleDigit(time.getSeconds()),
        };
      }
      this.timeRange = {
        hour: [this.minTime.hour, this.maxTime.hour],
        minute: ["00", "59"],
        second: ["00", "59"],
      };
      this._calcTimeRangeByTime();
      this.setProps({
        leftIcon: "clock",
        clearProps: {
          component: "Icon",
          type: "times",
          classes: { "nom-field-clear-handler": true },
          hidden: !this.props.allowClear || this.props.disabled,
          onClick: (args) => {
            if (this.props.disabled) return false;
            this.clearTime();
            args.event && args.event.stopPropagation();
          },
        },
      });
      super._config();
    }
    _rendered() {
      const that = this;
      this.popup = new TimePickerPopup({
        trigger: this.control,
        onHide: () => {
          that.getValue() !== that.defaultValue && that.handleChange();
        },
        onShow: () => {
          this.defaultValue = this.props.value;
          this.resetList();
        },
      });
    }
    getHour() {
      const hour = [];
      if (this.props.hourStep) {
        hour.push({ key: "00", children: "00" });
        for (let i = 0; i < 24; i++) {
          if ((i + 1) % this.props.hourStep === 0 && i !== 23) {
            hour.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return hour;
      }
      for (let i = 0; i < 24; i++) {
        hour.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return hour;
    }
    getMinute() {
      const minute = [];
      if (this.props.minuteStep) {
        minute.push({ key: "00", children: "00" });
        for (let i = 0; i < 60; i++) {
          if ((i + 1) % this.props.minuteStep === 0 && i !== 59) {
            minute.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return minute;
      }
      for (let i = 0; i < 60; i++) {
        minute.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return minute;
    }
    getSecond() {
      const second = [];
      if (this.props.secondStep) {
        second.push({ key: "00", children: "00" });
        for (let i = 0; i < 60; i++) {
          if ((i + 1) % this.props.secondStep === 0 && i !== 59) {
            second.push({
              key: this.getDoubleDigit(i + 1),
              children: this.getDoubleDigit(i + 1),
            });
          }
        }
        return second;
      }
      for (let i = 0; i < 60; i++) {
        second.push({
          key: this.getDoubleDigit(i),
          children: this.getDoubleDigit(i),
        });
      }
      return second;
    }
    setTime(data) {
      this.time[data.type] = data.value;
      if (this.time.hour <= this.minTime.hour) {
        this.time.hour = this.minTime.hour;
        if (this.time.minute <= this.minTime.minute) {
          this.time.minute = this.minTime.minute;
        }
        if (this.time.minute <= this.minTime.minute) {
          if (this.time.second <= this.minTime.second) {
            this.time.second = this.minTime.second;
          }
        }
      }
      if (this.time.hour >= this.maxTime.hour) {
        this.time.hour = this.maxTime.hour;
        if (this.time.minute >= this.maxTime.minute) {
          this.time.minute = this.maxTime.minute;
        }
        if (this.time.minute >= this.maxTime.minute) {
          if (this.time.second >= this.maxTime.second) {
            this.time.second = this.maxTime.second;
          }
        }
      }
      this.checkTimeRange();
      const result = new Date(
        "2000",
        "01",
        "01",
        this.time.hour,
        this.time.minute,
        this.time.second
      ).format(this.props.format);
      this.setValue(result);
      this.resetList();
    }
    clearTime() {
      this.setValue(null);
      this.empty = true;
      this.time = { hour: "00", minute: "00", second: "00" };
      this.resetList();
      this.popup.hide();
    }
    setNow() {
      const c = new Date().format("HH:mm:ss");
      const t = c.split(":");
      this.time.hour = t[0];
      this.time.minute = t[1];
      this.time.second = t[2];
      this.checkTimeRange();
      this.setValue(c.format(this.props.format));
      this.empty = false;
      this.resetList();
      this.popup.hide();
    }
    resetList() {
      const that = this;
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].resetTime();
      });
    }
    handleChange() {
      this.props.onChange && this._callHandler(this.props.onChange);
    }
    _onBlur() {
      if (
        this.getValue() &&
        !Date.isValid(this.getValue(), this.props.format)
      ) {
        this.clearTime();
      }
      super._onBlur();
    }
    showPopup() {
      this.popup.show();
    }
    getDoubleDigit(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return `${num}`;
    }
    checkTimeRange() {
      const that = this;
      const beforeHourFlag = this._isHourOverRange;
      const beforeMinuteFlag = this._isMinuteOverRange;
      const { hour, minute, second } = this.timeRange;
      const beforeTimeRangeStr = `${hour}-${minute}-${second}`;
      this._calcTimeRangeByTime();
      this.empty = false;
      const { hour: aHour, minute: aMinute, second: aSecond } = this.timeRange;
      const afterTimeRangeStr = `${aHour}-${aMinute}-${aSecond}`;
      let needRefreshList = []; // timeRange 发生变化, 所有list更新
      if (afterTimeRangeStr !== beforeTimeRangeStr) {
        needRefreshList = ["hour", "minute", "second"];
      } else if (beforeHourFlag !== this._isHourOverRange) {
        // hourOverRange变化，分和秒更新
        needRefreshList = ["minute", "second"];
      } else if (beforeMinuteFlag !== this._isMinuteOverRange) {
        // minuteOverRange变化, 秒更新
        needRefreshList = ["second"];
      }
      needRefreshList.forEach(function (key) {
        that.timeList[key].refresh();
      });
    } // 重新计算timeRange 和 overRange
    _calcTimeRangeByTime() {
      const { time, timeRange, minTime, maxTime } = this;
      this._isHourOverRange =
        time.hour < minTime.hour || time.hour > maxTime.hour;
      this._isMinuteOverRange =
        (time.hour === minTime.hour && time.minute < minTime.minute) ||
        (time.hour === maxTime.hour && time.minute > maxTime.minute);
      if (time.hour <= minTime.hour) {
        timeRange.hour = [minTime.hour, maxTime.hour];
        timeRange.minute = [minTime.minute, "59"];
        if (time.minute <= minTime.minute) {
          timeRange.second = [minTime.second, "59"];
        } else {
          timeRange.second = ["00", "59"];
        }
      } else if (time.hour >= maxTime.hour) {
        timeRange.minute = ["00", maxTime.minute];
        if (time.minute >= maxTime.minute) {
          timeRange.second = ["00", maxTime.second];
        } else {
          timeRange.second = ["00", "59"];
        }
      } else {
        timeRange.minute = timeRange.second = ["00", "59"];
      }
    }
  }
  TimePicker.defaults = {
    allowClear: true,
    value: null,
    format: "HH:mm:ss",
    hourStep: null,
    minuteStep: null,
    secondStep: null,
    readonly: false,
    placeholder: null,
    showNow: true,
    minTime: null,
    maxTime: null,
  };
  Component.register(TimePicker);
  class TimeRangePicker extends Group {
    constructor(props, ...mixins) {
      super(Component.extendProps(TimeRangePicker.defaults, props), ...mixins);
    }
    _created() {
      super._created();
    }
    _config() {
      const that = this;
      const {
        format,
        hourStep,
        minuteStep,
        secondStep,
        allowClear,
        minTime,
        maxTime,
        required,
        requiredMessage,
        rules,
        startPickerProps,
        endPickerProps,
        disabled,
      } = this.props;
      this.setProps({
        inline: true,
        fields: [
          Object.assign(
            {
              component: "TimePicker",
              name: that.props.fieldName.start,
              ref: (c) => {
                that.startPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              format,
              hourStep,
              minuteStep,
              secondStep,
              allowClear,
              disabled,
              minTime,
              maxTime,
              required,
              requiredMessage,
              rules,
            },
            startPickerProps
          ),
          { component: "StaticText", value: "-" },
          Object.assign(
            {
              component: "TimePicker",
              name: that.props.fieldName.end,
              placeholder: "结束时间",
              ref: (c) => {
                that.endPicker = c;
              },
              onChange: function (args) {
                that.checkRange(args.sender.name);
              },
              format,
              hourStep,
              minuteStep,
              secondStep,
              allowClear,
              disabled,
              minTime,
              maxTime,
              required,
              requiredMessage,
              rules,
            },
            endPickerProps
          ),
        ],
      });
      super._config();
    }
    _getValueText() {
      const val = this.getValue();
      return `${
        val[this.props.fieldName.start]
      } - ${val[this.props.fieldName.end]}`;
    }
    handleChange() {
      this.props.onChange && this._callHandler(this.props.onChange);
    }
    checkRange(type) {
      const that = this;
      const active =
        type === this.props.fieldName.start ? this.startPicker : this.endPicker;
      const opposite =
        type === this.props.fieldName.start ? this.endPicker : this.startPicker;
      if (active.getValue()) {
        if (active.name === that.props.fieldName.start) {
          opposite.update({ minTime: active.getValue() });
          if (opposite.getValue() && opposite.getValue() < active.getValue()) {
            opposite.clearTime();
            opposite.focus();
            opposite.showPopup();
          } else if (!opposite.getValue()) {
            opposite.focus();
            that.props.autoPopupEnd && opposite.showPopup();
          }
        } else if (
          opposite.getValue() &&
          opposite.getValue() > active.getValue()
        ) {
          opposite.clearTime();
        }
      }
      if (active.getValue() && opposite.getValue()) {
        that.handleChange();
      }
    }
  }
  TimeRangePicker.defaults = {
    allowClear: true,
    value: null,
    format: "HH:mm:ss",
    hourStep: 0,
    minuteStep: 0,
    secondStep: 0,
    readonly: true,
    placeholder: null,
    autoPopupEnd: true,
    showNow: true,
    onChange: null,
    fieldName: { start: "start", end: "end" },
    flatValue: true,
    startPickerProps: { placeholder: "开始时间" },
    endPickerProps: { placeholder: "结束时间" },
  };
  Component.register(TimeRangePicker);
  class TreeSelectPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = { animate: true };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.selectControl = this.opener.parent.parent;
    }
    _config() {
      const that = this;
      const { nodeSelectable, nodeCheckable } = that.props;
      const {
        searchable,
        options,
        treeDataFields,
        flatOptions,
        multiple,
        initExpandLevel,
      } = this.selectControl.props;
      this.setProps({
        attrs: {
          style: { width: `${this.selectControl.control.offsetWidth()}px` },
        },
        children: {
          component: Layout,
          header: searchable
            ? {
                children: {
                  component: Textbox,
                  placeholder: searchable.placeholder,
                  _created: (inst) => {
                    this.selectControl.searchBox = inst;
                  },
                  onValueChange: ({ newValue }) => {
                    this.timer && clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                      const loading = new nomui.Loading({
                        container: this.selectControl.tree.parent,
                      });
                      const result = searchable.filter({
                        inputValue: newValue,
                        options: options,
                      });
                      if (result && result.then) {
                        return result
                          .then((value) => {
                            this.selectControl.tree.update({
                              initExpandLevel: newValue ? -1 : initExpandLevel, // 搜索时展开节点层级
                              data: value,
                            }); // 更新 optionsMap
                            this.selectControl.getOptionsMap();
                            loading && loading.remove();
                          })
                          .catch(() => {
                            loading && loading.remove();
                          });
                      }
                      loading && loading.remove();
                      result &&
                        this.selectControl.tree.update({
                          initExpandLevel: newValue ? -1 : initExpandLevel, // 搜索时展开节点层级
                          data: result,
                        });
                    }, 300);
                  },
                },
              }
            : null,
          body: {
            children: {
              component: "Tree",
              expandable: { byIndicator: true },
              data: clone$1(options),
              dataFields: treeDataFields,
              flatData: flatOptions,
              multiple,
              nodeSelectable,
              nodeCheckable,
              initExpandLevel,
              _created: function () {
                that.selectControl.tree = this;
              },
            },
          },
        },
      });
      super._config();
    }
    animateHide() {
      if (!this.element) return false;
      let animateName;
      if (this.element.getAttribute("offset-y") !== "0") {
        animateName = "nom-tree-select-animate-bottom-hide";
      } else {
        animateName = "nom-tree-select-animate-top-hide";
      }
      this.addClass(animateName);
      setTimeout(() => {
        if (!this.element) return false;
        this.hide();
        this.removeClass(animateName);
      }, 160);
    }
    _rendered() {
      this.removeClass("nom-layer-animate-show");
      this.selectControl.props.animate &&
        this.props.animate &&
        this.animateInit();
      if (this.selectControl.props.animate && !this.props.animate) {
        this.props.animate = true;
      }
    }
    animateInit() {
      if (!this.element) return false;
      if (this.element.getAttribute("offset-y") !== "0") {
        this.addClass("nom-tree-select-animate-bottom-show");
      } else {
        this.addClass("nom-tree-select-animate-top-show");
      }
    }
    _show() {
      super._show();
      this.selectControl.searchBox && this.selectControl.searchBox.focus();
      this.removeClass("nom-layer-animate-show");
      this.selectControl.props.animate &&
        this.props.animate &&
        this.animateInit();
    }
  }
  Component.register(TreeSelectPopup);
  class TreeSelect extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(TreeSelect.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.items = [];
      if (this.props.treeCheckable) {
        this.props.multiple = true;
      }
      this.tempValue = this.props.value;
    }
    _config() {
      this.getOptionsMap();
      const children = this._getContentChildren();
      this.setProps({ control: { disabled: this.props.disabled, children } });
      super._config();
    }
    _enable() {
      this.control.props.disabled = false;
    }
    _disable() {
      this.control.props.disabled = true;
    }
    _rendered() {
      this.popup = new TreeSelectPopup({
        trigger: this.control,
        nodeCheckable: this.props.multiple && this._getPopupNodeCheckable(),
        onShow: () => {
          if (this.props.disabled) {
            this.popup.hide();
          }
          if (!this.props.multiple) {
            this.tree.update({
              nodeSelectable: this._getPopupNodeSelectable(),
            });
            const _value = this.getValue();
            if (_value !== null || _value !== undefined) {
              this.tree.expandTo(_value);
            }
          }
        },
      });
      this._valueChange({ newValue: this.currentValue });
    } // 存一份 {key: optionItem} 的数据
    getOptionsMap() {
      this.optionMap = this.getList();
    } // 树结构扁平化为数组数据
    getList() {
      const { treeDataFields } = this.props;
      let { options } = this.props;
      const optionMap = {};
      function mapTree(data, parentKey) {
        return data.forEach(function (item) {
          const _fieldKey = treeDataFields.key;
          const _fieldText = treeDataFields.text;
          const _parentKey = treeDataFields.parentKey;
          const _children = treeDataFields.children;
          optionMap[item[_fieldKey]] = {
            key: item[_fieldKey],
            [_fieldKey]: item[_fieldKey],
            [_fieldText]: item[_fieldText],
            [_parentKey]: parentKey,
          };
          if (item[_children] && item[_children].length > 0) {
            mapTree(item[_children], item[_fieldKey]);
          }
        });
      } // popup中的tree组件，options从其中获取
      if (this.tree) {
        options = this.tree.getData();
      }
      mapTree(options);
      return optionMap;
    }
    _getContentChildren() {
      const { showArrow, placeholder, allowClear, animate } = this.props;
      const that = this;
      const children = [];
      this._normalizeSearchable(); // _content: 所选择的数据的展示
      children.push({
        classes: { "nom-tree-select-content": true },
        _created() {
          that._content = this;
        },
        children: this._getContentBadges(),
      }); // placeholder
      if (isString(placeholder)) {
        children.push({
          _created() {
            that.placeholder = this;
          },
          classes: { "nom-tree-select-placeholder": true },
          children: placeholder,
        });
      } // 箭头
      if (showArrow) {
        children.push({
          component: Icon,
          type: "down",
          classes: { "nom-tree-select-arrow": true },
        });
      }
      if (allowClear) {
        children.push({
          component: Icon,
          type: "times",
          classes: {
            "nom-tree-select-clear": true,
            "nom-field-clear-handler": true,
          },
          hidden: true,
          ref: (c) => {
            this.clearIcon = c;
          },
          onClick: (args) => {
            if (this.props.disabled) {
              return;
            }
            this._setValue(null);
            this.props.allowClear && this.clearIcon.hide();
            animate && this.popup && this.popup.animateHide();
            !animate && this.popup && this.popup.hide();
            args.event && args.event.stopPropagation();
          },
        });
      }
      return children;
    }
    _normalizeSearchable() {
      const { searchable } = this.props;
      if (searchable) {
        this.setProps({
          searchable: Component.extendProps(
            {
              placeholder: null,
              filter: ({ inputValue, options }) => {
                if (!inputValue) return options;
                const {
                  key,
                  text,
                  parentKey,
                  children,
                } = this.props.treeDataFields; // 1.先遍历一次 将结果符合搜索条件的结果(包含其祖先)放至 filteredMap中
                const reg = new RegExp(inputValue, "i");
                const filteredMap = new Map();
                ((target) =>
                  Object.keys(target).map((key) => [key, target[key]]))(
                  this.optionMap
                ).forEach(([optKey, optValue]) => {
                  // 判断输入关键字 和 option的text
                  if (reg.test(optValue[text])) {
                    filteredMap.set(
                      optKey,
                      Object.assign({}, optValue, { __filterNode: true })
                    ); // 将搜索结果的祖先节点都加入 filteredMap 中
                    let optParentKey = optValue[parentKey];
                    while (optParentKey) {
                      const parent = this.optionMap[optParentKey]; // parent 符合搜索条件(已经在map中)则不重新 set
                      if (!filteredMap.get(optParentKey)) {
                        filteredMap.set(optParentKey, parent);
                      }
                      optParentKey = parent && parent[parentKey];
                    }
                  }
                }); // 从 filteredMap 中取出满足的options(包含祖先和孩子节点)的值
                function getFileterOptions(list) {
                  const res = [];
                  list.forEach((opt) => {
                    const filterOpt = filteredMap.get(opt[key]);
                    if (filterOpt) {
                      const obj = Object.assign({}, opt);
                      if (filterOpt.__filterNode)
                        obj.__filterNode = filterOpt.__filterNode; // 递归判断children
                      // 没有符合搜索条件的, 则直接使用原children
                      if (opt[children]) {
                        const _children = getFileterOptions(opt[children]);
                        obj[children] = _children.length
                          ? _children
                          : opt[children];
                      }
                      res.push(obj);
                    }
                  });
                  return res;
                }
                return getFileterOptions(options);
              },
            },
            searchable
          ),
        });
      }
    }
    _getContentBadges() {
      const { treeDataFields, maxTagCount, maxTagWidth } = this.props;
      if (!isNullish(this.currentValue) && !Array.isArray(this.currentValue)) {
        this.currentValue = [this.currentValue];
      }
      const { currentValue } = this;
      const items = [];
      const that = this;
      let num = 0;
      if (currentValue && currentValue.length) {
        num = currentValue.length - maxTagCount;
        currentValue.forEach((curValue, idx) => {
          const curOption = this.optionMap[curValue];
          if (curOption) {
            items.push({
              component: "Tag",
              type: "square",
              size: "xs",
              classes: {
                "nom-tree-select-tag-hidden":
                  maxTagCount > 0 && idx > maxTagCount,
              },
              attrs: { style: { cursor: "default" } },
              maxWidth: maxTagWidth,
              text: curOption[treeDataFields.text],
              key: curOption[treeDataFields.key],
              removable:
                that.props.multiple &&
                maxTagCount > 0 &&
                idx < maxTagCount &&
                function (param) {
                  that._setValue(
                    currentValue.filter(function (k) {
                      return k !== param;
                    })
                  );
                },
            });
          }
        });
      }
      if (maxTagCount > 0 && items.length > maxTagCount) {
        const overList = items.slice(maxTagCount, items.length);
        items[maxTagCount] = Object.assign({}, items[maxTagCount - 1], {
          classes: { "nom-tree-select-overtag-trigger": true },
          text: `+${num}`,
          removable: false,
          popup: {
            triggerAction: "hover",
            align: "top center",
            classes: { "nom-tree-select-extra-tags": true },
            children: {
              component: "List",
              gutter: "sm",
              itemDefaults: {
                key() {
                  return this.props[that.props.treeDataFields.value];
                },
                _config: function () {
                  this.setProps({
                    tag: "span",
                    onClick: (args) => {
                      args.event.stopPropagation();
                    },
                    attrs: {
                      title: this.props[that.props.treeDataFields.text],
                    },
                    children: [
                      {
                        tag: "span",
                        classes: { "nom-tree-select-item-content": true },
                        attrs: {
                          style: { maxWidth: `${that.props.maxTagWidth}px` },
                        },
                        children: this.props[that.props.treeDataFields.text],
                      },
                    ],
                  });
                },
              },
              items: overList,
            },
          },
        });
      }
      return items;
    } // 弹窗的nodeSelectable的配置
    _getPopupNodeSelectable() {
      const { multiple, treeSelectable } = this.props;
      const { currentValue } = this;
      if (multiple) return false;
      return Component.extendProps(
        { onlyleaf: this.props.onlyleaf },
        treeSelectable,
        {
          selectedNodeKey: currentValue && currentValue[0],
          onNodeSelect: ({ nodeData }) => {
            this._setValue([nodeData.key]);
          },
        }
      );
    } // 弹窗的nodeCheckable的配置
    _getPopupNodeCheckable() {
      const { multiple, treeCheckable } = this.props;
      const { currentValue } = this;
      if (!multiple && !treeCheckable) return false; // 多选则展示复选框
      return Component.extendProps(
        { onlyleaf: this.props.onlyleaf },
        treeCheckable,
        {
          checkedNodeKeys: currentValue,
          onCheckChange: () => {
            const checkedKeys = this.tree.getCheckedNodeKeys();
            this._setValue(checkedKeys);
          },
        }
      );
    }
    _setValue(value, options) {
      this.tempValue = value;
      if (options === false) {
        options = { triggerChange: false };
      } else {
        options = extend$1({ triggerChange: true }, options);
      }
      if (options.triggerChange) {
        this._onValueChange();
      } else {
        this.currentValue = this.tempValue;
        if (this.placeholder) {
          isNullish(this.currentValue)
            ? this.placeholder.show()
            : this.placeholder.hide();
        }
      }
      this._content.update({ children: this._getContentBadges() }); // 多选: 每次setValue后更新选中状态
      if (this.props.multiple) {
        this.popup.update({
          nodeCheckable: this._getPopupNodeCheckable(),
          animate: false,
        });
      } else {
        // 单选: 点击后即关闭popup,在onShow中更新
        this.props.animate && this.popup.animateHide();
        !this.props.animate && this.popup.hide();
      }
    } // getValue时根据选中的节点返回
    _getValue() {
      if (this.props.multiple === false) {
        if (Array.isArray(this.tempValue)) {
          return this.tempValue[0];
        }
      }
      return this.tempValue;
    }
    getValueText() {
      const { treeDataFields } = this.props;
      const arr = [];
      const v = this.getValue();
      if (isString(v)) {
        arr.push(this.optionMap[v][treeDataFields.text]);
      } else if (Array.isArray(v)) {
        v.forEach((n) => {
          arr.push(this.optionMap[n][treeDataFields.text]);
        });
      }
      return arr.toString();
    }
    _valueChange(changed) {
      const { newValue } = changed; // 空数组 || null || undefined
      const isNewValueClear =
        (Array.isArray(newValue) && !newValue.length) || isNullish(newValue);
      if (this.props.allowClear) {
        // newValue为空 ? icon隐藏 : 展示清空icon
        isNewValueClear ? this.clearIcon.hide() : this.clearIcon.show();
      }
      if (this.placeholder) {
        isNewValueClear ? this.placeholder.show() : this.placeholder.hide();
      }
    }
  }
  TreeSelect.defaults = {
    options: [],
    allowClear: false,
    placeholder: "请选择", // tree的select事件的配置
    treeSelectable: {},
    multiple: false, // 复选框模式，即为多选
    treeCheckable: false,
    maxTagWidth: 120,
    maxTagCount: -1,
    treeDataFields: {
      key: "value",
      text: "text",
      children: "children",
      parentKey: "parentKey",
    },
    onlyleaf: false,
    showArrow: true,
    initExpandLevel: -1,
  };
  Component.register(TreeSelect);
  const DEFAULT_ACCEPT =
    "image/*,application/msword,application/pdf,application/x-rar-compressed,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.ms-works,application/zip,audio/*,video/*,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/csv";
  function getUUID() {
    return `nom-upload-${Math.random().toString().substr(2)}`;
  } // export function getDate(timestamp) {
  //   if (isNumeric(timestamp) && POSITIVE_INTEGER.test(timestamp.toString())) {
  //     const date = new Date(timestamp)
  //     const month = date.getMonth() + 1
  //     const day = date.getDate()
  //     return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
  //   }
  //   return null
  // }
  function isValidDate(date) {
    if (date === null || date === undefined) return null;
    let _date = date;
    if (!isDate(_date)) {
      _date = new Date(_date);
    }
    return !Number.isNaN(_date.getTime());
  }
  function getDate(d, format = "yyyy-MM-dd") {
    if (!isValidDate(d)) return null;
    const _date = isDate(d) ? d : new Date(d); // return isString(d) ? formatDate(d, format) : d.format(format)
    return _date.format(format);
  }
  function getFileSize(number) {
    if (!isNumeric(number)) {
      return "NA bytes";
    }
    if (number < 1024) {
      return `${number} bytes`;
    }
    if (number > 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(2)} KB`;
    }
    if (number > 1048576) {
      return `${(number / 1048576).toFixed(2)} MB`;
    }
  }
  function isPromiseLike(promiseLike) {
    return (
      promiseLike !== null &&
      (typeof promiseLike === "object" || typeof promiseLike === "function") &&
      typeof promiseLike.then === "function"
    );
  }
  function isBlobFile(file) {
    const ft = Object.prototype.toString.call(file);
    return ft === "[object File]" || ft === "[object Blob]";
  }
  function getFileFromList(file, fileList) {
    return fileList.find((e) => e.uuid === file.uuid);
  }
  function cloneFileWithInfo(file) {
    return Object.assign({}, file, {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
      uuid: file.uuid,
      percent: 0,
      originFile: file,
    });
  }
  function removeFile(file, fileList) {
    const remains = fileList.filter((item) => item.uuid !== file.uuid);
    if (remains.lenth === fileList.length) {
      return null;
    }
    return remains;
  }
  class FileItem extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(FileItem.defaults, props), ...mixins);
    }
    _created() {
      this._uploader = this.parent.parent.parent.parent;
    }
    _config() {
      const that = this;
      const {
        file,
        onRemove,
        allowUpdate,
        extraAction,
        customizeInfo,
      } = this.props;
      const { uuid, status } = file;
      const _info = isFunction(customizeInfo)
        ? customizeInfo(file)
        : this._handleDefaultCustomizeInfo(file);
      if (uuid) {
        let imgDisplay = {};
        if (status === "error") {
          imgDisplay = {
            children: [
              {
                component: "Icon",
                type: "file-error",
                classes: { "file-img": true },
              },
            ],
          };
        } else {
          imgDisplay =
            status === "done"
              ? this.renderUploadedFile(file)
              : {
                  children: [
                    {
                      component: "Icon",
                      type: "loading",
                      classes: { "file-img": true },
                    },
                  ],
                };
        }
        const actions = [];
        if (onRemove) {
          actions.push({
            tag: "a",
            children: onRemove.text || "删除",
            attrs: {
              href: "javascript:void(0)",
              onclick: (e) => {
                e.preventDefault();
                status !== "removing" &&
                  onRemove.action({ sender: that._uploader, file });
              },
            },
          });
        }
        if (allowUpdate) {
          actions.push({
            tag: "a",
            children: "更新",
            onClick() {
              that._uploader._handleUpdate({ file });
            },
          });
        }
        if (Array.isArray(extraAction) && extraAction.length > 0) {
          extraAction.forEach(({ text, action }) => {
            const children = isFunction(text) ? text(file) : text;
            if (!isNullish(children)) {
              actions.push({
                tag: "a",
                children,
                attrs: {
                  href: "javascript:void(0)",
                  onclick: (e) => {
                    e.preventDefault();
                    isFunction(action) &&
                      action({ sender: that._uploader, file });
                  },
                },
              });
            }
          });
        }
        this.setProps({
          tag: "div",
          children: [
            {
              tag: "div",
              _config() {
                this.setProps({ children: [Object.assign({}, imgDisplay)] });
                this.setProps({ classes: { "upload-img-container": true } });
              },
            },
            {
              tag: "div",
              _config() {
                this.setProps({
                  children: [
                    {
                      // tag: 'div',
                      _config() {
                        this.setProps({ children: _info });
                      },
                    },
                    {
                      // tag: 'div',
                      _config() {
                        this.setProps({
                          classes: {
                            "upload-opt-btn": true,
                            "upload-opt-removing": status === "removing",
                          },
                        });
                      },
                      children: actions,
                    },
                  ],
                });
                this.setProps({ classes: { "upload-info-container": true } });
              },
            },
          ],
        });
        this.setProps({ classes: { "u-flex-row": true } });
      }
    }
    renderUploadedFile(file) {
      // const { name } = file
      const renderer = this.props.renderer;
      if (isFunction(renderer)) {
        return Object.assign({}, renderer(file), {
          classes: { "file-img": true },
        });
      }
      return { component: "Icon", type: "file", classes: { "file-img": true } };
    }
    _handleDefaultCustomizeInfo(file) {
      if (!file) return null;
      const { name, size, uploadTime } = file;
      return [
        {
          tag: "span",
          children: [
            { tag: "a", children: name, classes: { "upload-file-name": true } },
          ],
        },
        { tag: "span", children: getFileSize(size) },
        {
          tag: "span",
          children: `更新日期 : ${
            getDate(uploadTime) ? getDate(uploadTime) : "NA"
          }`,
          classes: { "upload-file-update": true, "u-border-left ": true },
        },
      ];
    }
  }
  FileItem.defaults = { disabled: false, file: null };
  class FileList extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(FileList.defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.uploaderControl = this.parent.parent.parent.control;
      this.uploaderControl.list = this;
    }
    _config() {
      const {
        files,
        onRemove,
        allowUpdate,
        extraAction,
        initializing,
        renderer,
        customizeInfo,
      } = this.props;
      const children = [];
      if (Array.isArray(files) && files.length > 0) {
        files.forEach((file) => {
          children.push({
            component: FileItem,
            file,
            onRemove,
            allowUpdate,
            extraAction,
            renderer,
            customizeInfo,
          });
        });
      }
      if (initializing) {
        this.setProps({
          tag: "div",
          children: {
            component: "Icon",
            type: "loading",
            classes: { "file-img": true },
          },
        });
      } else {
        this.setProps({ tag: "div", children });
      }
    }
  }
  FileList.defaults = { disabled: false, files: null };
  function getError(option, xhr) {
    const msg = `Can't ${option.method} ${option.action} ${xhr.status}`;
    const err = new Error(msg);
    return Object.assign({}, err, {
      status: xhr.status,
      method: option.method,
      url: option.action,
    });
  }
  function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  }
  function upload(option) {
    const xhr = new XMLHttpRequest();
    if (option.onProgress && xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = (e.loaded / e.total) * 100;
        }
        option.onProgress(e);
      };
    }
    const formData = new FormData();
    if (option.data) {
      Object.keys(option.data).forEach((key) => {
        const value = option.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, option.data[key]);
      });
    }
    if (option.file instanceof Blob) {
      formData.append(option.filename, option.file, option.file.name);
    } else {
      formData.append(option.filename, option.file);
    }
    xhr.onerror = function error(e) {
      option.onError(e);
    };
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(option, xhr), getBody(xhr));
      }
      return option.onSuccess(getBody(xhr), xhr);
    };
    xhr.open(option.method, option.action, true);
    if (option.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }
    const headers = option.headers || {};
    if (headers["X-Requested-With"] !== null) {
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    }
    Object.keys(headers).forEach((header) => {
      if (headers[header] !== null) {
        xhr.setRequestHeader(header, headers[header]);
      }
    });
    xhr.send(formData);
    return {
      abort() {
        xhr.abort();
      },
    };
  }
  class Uploader extends Field {
    constructor(props, ...mixins) {
      super(Component.extendProps(Uploader.defaults, props), ...mixins);
      this.reqs = {};
      this.onChange.bind(this);
      this._changeUploadMode.bind(this);
    }
    _created() {
      // this.fileList = this.props.fileList || this.props.defaultFileList
      this._updateFile = null;
      this._updateFileIcon = [];
      super._created();
    }
    _config() {
      const that = this; // const { disabled, accept, button: cButton, multiple, files } = this.props;
      const {
        disabled,
        accept,
        button,
        multiple,
        extraAction,
        display,
        allowUpdate,
        onRemove,
        renderer,
        customizeInfo,
        actionRender,
        showList,
      } = this.props;
      const customTrigger = actionRender || button;
      this.fileList = this.props.fileList || this.props.defaultFileList;
      if (this.fileList && this.fileList.length > 0) {
        this.fileList = showList ? this.fileList : this.fileList.slice(-1);
      }
      this.acceptList = accept ? this.getAcceptList() : "";
      let initializing = true;
      if (isPromiseLike(that.fileList)) {
        that.fileList.then((fs) => {
          initializing = false;
          that.fileList = fs;
          if (!disabled && this.customTrigger) {
            that.customTrigger.enable();
          }
          that.list &&
            that.list.update({ initializing: false, files: this.fileList });
        });
      } else {
        initializing = false;
      }
      const children = [];
      const defaultButtonProps = {
        component: "Button",
        text: "上传",
        icon: "upload",
      };
      const inputUploader = {
        tag: "input",
        hidden: true,
        _created() {
          that.inputFile = this;
        },
        attrs: {
          type: "file",
          multiple: multiple,
          accept: accept || DEFAULT_ACCEPT,
          onchange: that._onChange.bind(that),
          onclick: (e) => {
            e.stopPropagation();
          },
        },
      };
      children.push(inputUploader);
      let triggerButton = customTrigger;
      if (!triggerButton && triggerButton !== false)
        triggerButton = defaultButtonProps;
      const defaults = {
        disabled: disabled || initializing, // disabled,
        ref: (c) => {
          that.customTrigger = c;
        },
        attrs: {
          onclick() {
            that._handleClick();
          },
          onKeyDown(e) {
            that._onKeyDowne(e);
          },
        },
      };
      if (triggerButton !== false) {
        if (isFunction(customTrigger)) {
          triggerButton = customTrigger();
        }
        triggerButton = Component.extendProps(defaults, triggerButton);
        children.push(triggerButton);
      }
      if (showList) {
        if (display) {
          if (initializing || (this.fileList && this.fileList.length > 0)) {
            children.push({
              component: FileList,
              classes: { "nom-file-list-only": triggerButton === false },
              ref: (c) => {
                that.list = c;
              },
              initializing,
              files:
                display === "replace" && !multiple
                  ? this.fileList.slice(-1)
                  : this.fileList,
              renderer,
              onRemove:
                onRemove &&
                isFunction(onRemove.action) &&
                Object.assign({}, onRemove, {
                  action: that.handleRemove.bind(that),
                }),
              allowUpdate,
              extraAction,
              customizeInfo,
            });
          }
        }
      } else if (this.fileList && this.fileList.length) {
        if (
          this.fileList[0].status === "uploading" &&
          !this._updateFileIcon.includes("loading")
        ) {
          triggerButton.children.push({
            component: "Icon",
            type: "loading",
            classes: { "file-loading-img": true },
          });
          this._updateFileIcon.push("loading");
        } else if (
          this.fileList[0].status === "done" &&
          !this._updateFileIcon.includes("close-circle")
        ) {
          triggerButton.tooltip = "重新上传可完成覆盖。";
          this._updateFileIcon.push("close-circle");
          this._updateFileIcon.splice(this._updateFileIcon.indexOf("error"), 1);
          this.deleteIcon("loading", triggerButton);
        } else if (
          this.fileList[0].status === "error" &&
          !this._updateFileIcon.includes("error")
        ) {
          this.deleteIcon("loading", triggerButton);
          new nomui.Message({ content: "上传失败！", type: "error" });
        }
        if (this.fileList[0].status !== "uploading") {
          this._updateFileIcon.splice(
            this._updateFileIcon.indexOf("loading"),
            1
          );
        }
      } else {
        this.deleteIcon("close-circle", triggerButton);
      }
      this.setProps({ control: { children } });
      super._config();
    }
    deleteIcon(name, file) {
      this._updateFileIcon.splice(this._updateFileIcon.indexOf(name), 1);
      const index = file.children.findIndex((element) => element.type === name);
      if (index > 0) file.children.splice(index, 1);
    }
    getAcceptList() {
      if (this.props.accept) {
        return this.props.accept
          .replace("image/*", ".jpg,.png,.gif,.jpeg,.jp2,.jpe,.bmp,.tif,.tiff")
          .replace("video/*", ".3gpp,.mp2,.mp3,.mp4,.mpeg,.mpg")
          .replace("audio/*", ".3gpp,.ac3,.asf,.au,.mp2,.mp3,.mp4,.ogg");
      }
    }
    checkType(file) {
      if (!this.props.accept) {
        return true;
      }
      if (!file || !file.name) {
        return false;
      }
      const { name } = file;
      const type = name.substring(name.lastIndexOf(".")).toLowerCase();
      if (this.acceptList.toLowerCase().includes(type)) {
        return true;
      }
      return false;
    }
    _onChange(e) {
      const { files } = e.target;
      const uploadedFiles = this.fileList;
      this.uploadFiles(files, uploadedFiles);
    }
    uploadFiles(files, uploadedFiles) {
      // 转为数组
      let fileList = Array.from(files);
      const uploadedFileList = Array.from(uploadedFiles);
      if (this._updateFile) {
        fileList = fileList.map((e) => {
          e.uuid = this._updateFile;
          e.uploadTime = new Date().getTime();
          return e;
        });
        uploadedFiles.map((file) => {
          if (file.uuid === this._updateFile) {
            const f = fileList[0] || [];
            f.uuid = this._updateFile;
            return f;
          }
          return file;
        });
      } else {
        fileList = fileList.map((e) => {
          if (!e.uuid) {
            e.uuid = getUUID();
          }
          e.uploadTime = new Date().getTime();
          return e;
        });
      }
      fileList.forEach((file) => {
        this.upload(file, [...uploadedFileList, ...fileList]);
      });
    }
    upload(file, fileList) {
      const beforeUpload = this.props.beforeUpload;
      if (!this.checkType(file)) {
        new nomui.Alert({ title: "不支持此格式，请重新上传。" });
        return;
      }
      if (!beforeUpload) {
        Promise.resolve().then(() => this.post(file));
        return;
      }
      const before = beforeUpload(file, fileList);
      if (this.inputFile && this.inputFile.element)
        this.inputFile.element.value = "";
      if (isPromiseLike(before)) {
        before.then((pFile) => {
          if (isBlobFile(pFile)) {
            this.post(pFile);
            return;
          }
          this.post(file);
        });
      } else if (before !== false) {
        Promise.resolve().then(() => {
          this.post(file);
        });
      }
    }
    post(file) {
      if (!this.rendered) {
        return;
      }
      const that = this;
      const { props } = this;
      new Promise((resolve) => {
        const actionRet = this.props.action;
        resolve(isFunction(actionRet) ? actionRet(file) : actionRet);
      }).then((action) => {
        const { data, method, headers, withCredentials } = props;
        const option = {
          action,
          data,
          file,
          filename: props.name,
          method,
          headers,
          withCredentials,
          onProgress: (e) => {
            that.onProgress(e, file);
          },
          onSuccess: (ret, xhr) => {
            that.onSuccess(ret, file, xhr);
          },
          onError: (err, ret) => {
            that.onError(err, ret, file);
          },
        };
        this.onStart(file);
        this.reqs[file.uuid] = upload(option);
        this._updateFile = null;
        this._changeUploadMode();
      });
    }
    onChange(info) {
      // 更新列表
      this.fileList = info.fileList;
      const { onChange: onChangeProp } = this.props;
      this.update({ fileList: [...info.fileList] });
      if (this.customTrigger) {
        const disableBtn = this.fileList.some((file) =>
          ["removing", "uploading", "updating"].includes(file.status)
        );
        if (!this.props.disabled) {
          disableBtn
            ? this.customTrigger.disable()
            : this.customTrigger.enable();
        }
      }
      if (onChangeProp) {
        onChangeProp(
          Object.assign({}, info, {
            sender: this,
            fileList: [...this.fileList],
          })
        );
      }
    }
    onStart(file) {
      const uploadFile = cloneFileWithInfo(file);
      uploadFile.status = this._updateFile ? "updating" : "uploading"; // 这里要改
      const nextFileList = Array.from(this.fileList);
      const findIndex = nextFileList.findIndex(
        (f) => f.uuid === uploadFile.uuid
      );
      if (findIndex === -1) {
        nextFileList.push(uploadFile);
      } else {
        nextFileList[findIndex] = uploadFile;
      }
      this.onChange({ file: uploadFile, fileList: nextFileList });
    }
    onProgress(e, file) {
      const uploadingFile = getFileFromList(file, this.fileList);
      if (!uploadingFile) {
        return;
      }
      uploadingFile.percent = e.percent;
      this.onChange({
        event: e,
        file: uploadingFile,
        fileList: [...this.fileList],
      });
    }
    onSuccess(response, file, xhr) {
      try {
        if (typeof response === "string") {
          response = JSON.parse(response);
        }
      } catch (e) {
        /* do nothing */
      }
      const uploadFile = getFileFromList(file, this.fileList);
      if (!uploadFile) {
        return;
      }
      uploadFile.response = response;
      uploadFile.status = "done";
      uploadFile.xhr = xhr;
      this.onChange({ file: uploadFile, fileList: [...this.fileList] });
    }
    onError(error, response, file) {
      const uploadFile = getFileFromList(file, this.fileList);
      if (!uploadFile) {
        return;
      }
      uploadFile.error = error;
      uploadFile.status = "error";
      uploadFile.response = response;
      this.onChange({ file: uploadFile, fileList: [...this.fileList] });
    }
    handleRemove({ sender, file }) {
      const {
        onRemove: { action },
      } = this.props; // removing
      file.status = "removing";
      this.fileList = this.fileList.map((f) =>
        f.uuid === file.uuid ? Object.assign({}, f, { status: "removing" }) : f
      );
      this.onChange({ file, fileList: this.fileList });
      Promise.resolve(
        isFunction(action) ? action({ sender, file }) : action
      ).then((ret) => {
        if (ret === false) {
          return;
        }
        const remainsFileList = removeFile(file, this.fileList);
        if (remainsFileList) {
          file.status = "removed";
          this.fileList = remainsFileList;
          if (this.reqs[file.uuid]) {
            this.reqs[file.uuid].abort();
            delete this.reqs[file.uuid];
          }
        }
        this.onChange({ file, fileList: remainsFileList });
      });
    }
    _handleUpdate({ file }) {
      if (file && file.uuid) {
        this._updateFile = file.uuid;
      }
      this._changeUploadMode();
      this._handleClick(file);
    }
    _changeUploadMode() {
      if (this.inputFile && this.inputFile.element) {
        if (this._updateFile) {
          this.inputFile.element.multiple = false;
        } else {
          this.inputFile.element.multiple = this.props.multiple;
        }
      }
    }
    _handleClick() {
      if (this.inputFile) {
        this.inputFile.element.click();
      }
    }
    _onkeyDown(e) {
      if (e.eky === "Enter") {
        this._handleClick();
      }
    }
    _getValue() {
      const _val = isNotEmptyArray(this.fileList)
        ? this.fileList.filter(({ status }) => status === "done")
        : null;
      return isNotEmptyArray(_val) ? _val : null;
    }
  }
  Uploader.defaults = {
    // 测试地址
    action: "",
    disabled: false,
    beforeUpload: null,
    button: null,
    defaultFileList: [],
    multiple: false,
    name: "file",
    display: true,
    data: {}, // request option
    method: "post",
    headers: {},
    withCredentials: false,
    allowUpdate: false,
    onRemove: null,
    renderer: null,
    extraAction: [],
    customizeInfo: null,
    actionRender: null,
    showList: true,
  };
  Component.register(Uploader);
  /**
   * nomui的插件机制
   * @param {install:(nomui)=>{}} plugin
   * @description plugin必须包含一个install对象
   */ function use(plugin) {
    plugin.install(this);
  }
  exports.Alert = Alert;
  exports.Anchor = Anchor;
  exports.AnchorContent = AnchorContent;
  exports.App = App;
  exports.AutoComplete = AutoComplete;
  exports.Avatar = Avatar;
  exports.AvatarGroup = AvatarGroup;
  exports.BackTop = BackTop;
  exports.Badge = Badge;
  exports.Breadcrumb = Breadcrumb;
  exports.Button = Button;
  exports.Caption = Caption;
  exports.Carousel = Carousel;
  exports.Cascader = Cascader;
  exports.Checkbox = Checkbox;
  exports.CheckboxList = CheckboxList;
  exports.CheckboxTree = CheckboxTree;
  exports.Collapse = Collapse;
  exports.Cols = Cols;
  exports.Component = Component;
  exports.Confirm = Confirm;
  exports.Container = Container;
  exports.Countdown = Countdown;
  exports.DatePicker = DatePicker;
  exports.DateRangePicker = DateRangePicker;
  exports.Divider = Divider;
  exports.Drawer = Drawer;
  exports.Dropdown = Dropdown;
  exports.Ellipsis = Ellipsis;
  exports.Empty = Empty;
  exports.Field = Field;
  exports.Flex = Flex;
  exports.Form = Form;
  exports.Grid = Grid;
  exports.Group = Group;
  exports.GroupGrid = GroupGrid;
  exports.GroupList = GroupList;
  exports.Icon = Icon;
  exports.Image = Image;
  exports.Layer = Layer;
  exports.Layout = Layout;
  exports.List = List;
  exports.ListItemMixin = ListItemMixin;
  exports.Loading = Loading;
  exports.MaskInfo = MaskInfo;
  exports.MaskInfoField = MaskInfoField;
  exports.Menu = Menu;
  exports.Message = Message;
  exports.Modal = Modal;
  exports.MultilineTextbox = MultilineTextbox;
  exports.Navbar = Navbar;
  exports.Notification = Notification;
  exports.NumberSpinner = NumberSpinner;
  exports.Numberbox = Numberbox;
  exports.Pager = Pager;
  exports.Panel = Panel;
  exports.PartialDatePicker = PartialDatePicker;
  exports.PartialDateRangePicker = PartialDateRangePicker;
  exports.Password = Password;
  exports.Popconfirm = Popconfirm;
  exports.Popup = Popup;
  exports.Progress = Progress;
  exports.RadioList = RadioList;
  exports.Rate = Rate;
  exports.Result = Result;
  exports.Router = Router;
  exports.Rows = Rows;
  exports.Scrollbar = Scrollbar;
  exports.Select = Select;
  exports.Skeleton = Skeleton;
  exports.SlideCaptcha = SlideCaptcha;
  exports.Slider = Slider;
  exports.Spinner = Spinner;
  exports.StaticText = StaticText;
  exports.Statistic = Statistic;
  exports.Steps = Steps;
  exports.Switch = Switch;
  exports.Table = Table;
  exports.Tabs = Tabs;
  exports.Tag = Tag;
  exports.Textbox = Textbox;
  exports.TimePicker = TimePicker;
  exports.TimeRangePicker = TimeRangePicker;
  exports.Timeline = Timeline;
  exports.Toolbar = Toolbar;
  exports.Tooltip = Tooltip;
  exports.Tree = Tree;
  exports.TreeSelect = TreeSelect;
  exports.Uploader = Uploader;
  exports.n = n$1;
  exports.use = use;
  exports.utils = index$1;
  Object.defineProperty(exports, "__esModule", { value: true });
});
