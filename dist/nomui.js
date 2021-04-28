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
 *       nomui v1.0.0-alpha.16
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
  "use strict"; // Events
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
    if (isFunction$1(receiver)) {
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
  function isFunction$1(func) {
    return Object.prototype.toString.call(func) === "[object Function]";
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
    if (isPlainObject(from)) {
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
  function formatDate(date, format) {
    if (!date) {
      return null;
    }
    let mydate = null;
    if (typeof date === "string") {
      const arr = date
        .replace(/\d+(?=-[^-]+$)/, function (a) {
          return parseInt(a, 10) - 1;
        })
        .match(/\d+/g);
      mydate = new Date(...arr);
    } else if (typeof date === "number") {
      mydate = new Date(date);
    }
    return new Date(mydate).format(format);
  }
  var index$1 = { extend: extend$1, isFunction };
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
      };
      this.props = Component.extendProps(defaults, props);
      this.parent = null;
      this.root = null;
      this.rendered = false;
      this.mixins = [];
      this.firstRender = true;
      this._propStyleClasses = [];
      mixins && this._mixin(mixins);
      if (this.props.key) {
        this.key = this.props.key;
        if (isFunction(this.props.key)) {
          this.key = this.props.key.call(this, this);
        }
      }
      if (this.key === undefined || this.key === null) {
        this.key = `__key${++keySeq}`;
      }
      this.referenceComponent =
        this.props.reference instanceof Component
          ? this.props.reference
          : this.props.reference.component;
      if (this.referenceComponent) {
        if (this.props.placement === "append") {
          this.parent = this.referenceComponent;
        } else {
          this.parent = this.referenceComponent.parent;
        }
      }
      if (this.parent === null) {
        this.root = this;
      } else {
        this.root = this.parent.root;
      }
      if (this.props.ref) {
        this.props.ref(this);
      }
      this.componentType = this.__proto__.constructor.name;
      this.referenceElement =
        this.props.reference instanceof Component
          ? this.props.reference.element
          : this.props.reference;
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
      isFunction(this._created) && this._created();
      this._callMixin("_created");
      this.props._created && this.props._created.call(this, this);
    }
    _created() {}
    config() {
      this._setExpandableProps();
      this.props._config && this.props._config.call(this, this);
      this._callMixin("_config");
      isFunction(this._config) && this._config();
      this._setExpandableProps();
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
      this.firstRender = false;
    }
    _rendered() {} // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
    remove() {
      const el = this._removeCore();
      this.parent && this.parent.removeChild(this);
      el.parentNode.removeChild(el);
    }
    update(props) {
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
      while (this.element.firstChild) {
        if (this.element.firstChild.component) {
          this.element.firstChild.component.remove();
        } else {
          this.element.removeChild(this.element.firstChild);
        }
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
          this.appendChild(children[i]);
        }
      } else {
        this.appendChild(children);
      }
    }
    _removeCore() {
      this.emptyChildren();
      const el = this.element;
      isFunction(this.props._remove) && this.props._remove.call(this, this);
      this._callMixin("_remove");
      isFunction(this._remove) && this._remove();
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
      for (let i = 0; i < MIXINS.length; i++) {
        const mixin = MIXINS[i];
        mixin[hookType] && mixin[hookType].call(this, this);
      }
      for (let i = 0; i < this.mixins.length; i++) {
        const mixin = this.mixins[i];
        mixin[hookType] && mixin[hookType].call(this, this);
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
        isFunction(this._unselect) && this._unselect();
        if (unselectOption.triggerUnselect === true) {
          this._callHandler(this.props.onUnselect, null, unselectOption.event);
        }
        if (unselectOption.triggerSelectionChange === true) {
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
            t.show && t.show();
          });
        } else {
          expandTarget.show && expandTarget.show();
        }
      } // if (!this.props.expandable.byIndicator) {
      this._expandIndicator && this._expandIndicator.expand(); // }
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
            t.hide && t.hide();
          });
        } else {
          expandTarget.hide && expandTarget.hide();
        }
      } //  if (!this.props.expandable.byIndicator) {
      this._expandIndicator && this._expandIndicator.collapse(); // }
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
      const { indicator, byIndicator } = this.props.expandable;
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
        classes.push(`nom-${hyphenate(componentTypeClass)}`);
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
      } /* if (expandable.byIndicator) {
        const indicator = this._expandIndicator
        indicator._on('click', (event) => {
          this.toggleExpand()
          event.stopPropagation()
        })
      } */
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
      if (expandable && expandable.byClick === true) {
        this.toggleExpand();
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
  function getOffset(elem) {
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
        offset: hasOffset ? getOffset(element) : { left: 0, top: 0 },
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
    });
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
      const defaults = { type: "", tag: "i" };
      super(Component.extendProps(defaults, props), ...mixins);
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
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>`,
    cat
  );
  Icon.add(
    "ellipsis",
    `<svg viewBox="64 64 896 896" focusable="false" data-icon="ellipsis" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg>`,
    cat
  );
  Icon.add(
    "eye",
    `<svg t="1610611013413" class="icon" viewBox="0 0 1603 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6374" width="1em" height="1em"><path d="M1439.175 502.814c-115.521-233.355-352.825-384.097-616.997-384.097-259.691-0.005-493.642 145.659-611.326 372.903-2.359 4.465-3.744 9.761-3.744 15.379 0 5.406 1.282 10.511 3.557 15.029 115.433 233.162 352.737 383.907 616.905 383.907 259.697 0 493.646-145.659 611.331-372.907 2.359-4.465 3.744-9.761 3.744-15.379 0-5.406-1.282-10.511-3.557-15.029zM827.575 839.278c-232.958 0-442.764-129.694-549.788-331.936 108.743-196.761 315.477-321.972 544.393-321.972 232.958 0 442.764 129.699 549.788 331.94-108.743 196.761-315.483 321.972-544.393 321.972zM952.959 642.373c33.654-34.619 52.858-81.01 52.858-130.373 0-103.084-83.211-186.644-185.849-186.644-102.641 0-185.849 83.561-185.849 186.644s83.206 186.644 185.849 186.644c14.662 0 26.548-11.937 26.548-26.663 0-14.722-11.885-26.661-26.548-26.661-73.319 0-132.749-59.689-132.749-133.319s59.431-133.319 132.749-133.319c73.314 0 132.745 59.689 132.745 133.319 0 35.301-13.68 68.366-37.751 93.123-4.671 4.809-7.55 11.38-7.55 18.623 0 7.469 3.061 14.223 7.998 19.075 4.777 4.693 11.327 7.588 18.553 7.588 7.449 0 14.181-3.078 18.991-8.031z" p-id="6375"></path></svg>`,
    cat
  );
  Icon.add(
    "pin",
    `<svg t="1615376474037" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3895" width="1em" height="1em"><path d="M631.637333 178.432a64 64 0 0 1 19.84 13.504l167.616 167.786667a64 64 0 0 1-19.370666 103.744l-59.392 26.304-111.424 111.552-8.832 122.709333a64 64 0 0 1-109.098667 40.64l-108.202667-108.309333-184.384 185.237333-45.354666-45.162667 184.490666-185.344-111.936-112.021333a64 64 0 0 1 40.512-109.056l126.208-9.429333 109.44-109.568 25.706667-59.306667a64 64 0 0 1 84.181333-33.28z m-25.450666 58.730667l-30.549334 70.464-134.826666 135.04-149.973334 11.157333 265.408 265.6 10.538667-146.474667 136.704-136.874666 70.336-31.146667-167.637333-167.765333z" p-id="3896"></path></svg>`,
    cat
  );
  Icon.add(
    "sort",
    `<svg t="1616635066835" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9750" width="1em" height="1em"><path d="M804.57143 621.714286q0 14.848-10.825143 25.746286l-256 256q-10.825143 10.825143-25.746286 10.825143t-25.746286-10.825143l-256-256q-10.825143-10.825143-10.825143-25.746286t10.825143-25.746286 25.746286-10.825143l512 0q14.848 0 25.746286 10.825143t10.825143 25.746286zM804.57143 402.285714q0 14.848-10.825143 25.746286t-25.746286 10.825143l-512 0q-14.848 0-25.746286-10.825143t-10.825143-25.746286 10.825143-25.746286l256-256q10.825143-10.825143 25.746286-10.825143t25.746286 10.825143l256 256q10.825143 10.825143 10.825143 25.746286z"  fill="currentColor" p-id="9751"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-down",
    `<svg t="1616635159124" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10028" width="1em" height="1em"><path d="M804.571184 621.714286q0 14.848-10.825143 25.746286l-256 256q-10.825143 10.825143-25.746286 10.825143t-25.746286-10.825143l-256-256q-10.825143-10.825143-10.825143-25.746286t10.825143-25.746286 25.746286-10.825143l512 0q14.848 0 25.746286 10.825143t10.825143 25.746286z" fill="currentColor" p-id="10029"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-up",
    `<svg t="1616635124506" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9889" width="1em" height="1em"><path d="M804.571671 402.285714q0 14.848-10.825143 25.746286t-25.746286 10.825143l-512 0q-14.848 0-25.746286-10.825143t-10.825143-25.746286 10.825143-25.746286l256-256q10.825143-10.825143 25.746286-10.825143t25.746286 10.825143l256 256q10.825143 10.825143 10.825143 25.746286z" fill="currentColor" p-id="9890"></path></svg>`,
    cat
  );
  Icon.add(
    "sort-right",
    `<svg t="1618369427378" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4408" width="1em" height="1em"><path d="M718.848 512L307.2 926.72V96.768l411.648 415.232z" p-id="4409"></path></svg>`,
    cat
  );
  Icon.add(
    "setting",
    `<svg t="1615863726011" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3943" width="1em" height="1em"><path d="M785.183686 139.674311c-14.716642-25.494575-50.839308-46.344043-80.272592-46.344044H326.227815c-29.433284 0-65.55595 20.849468-80.272592 46.344044L56.618935 467.614608c-14.716642 25.494575-14.716642 67.193511 0 92.688087l189.336288 327.951c14.716642 25.494575 50.839308 46.344043 80.272592 46.344043h378.683279c29.433284 0 65.55595-20.849468 80.272592-46.344043L974.530677 560.302695c14.716642-25.494575 14.716642-67.193511 0-92.688087L785.183686 139.674311zM741.932814 813.332609c-14.716642 25.494575-50.839308 46.344043-80.272593 46.344043H369.478688c-29.433284 0-65.55595-20.849468-80.272592-46.344043l-146.074712-253.019211c-14.716642-25.494575-14.716642-67.193511 0-92.688087L289.206096 214.595397c14.716642-25.494575 50.839308-46.344043 80.272592-46.344043H661.660221c29.433284 0 65.55595 20.849468 80.272593 46.344043l146.096118 253.019211c14.716642 25.494575 14.716642 67.193511 0 92.688087L741.932814 813.332609z" fill="#3E3A39" p-id="3944"></path><path d="M515.574806 358.743567c-85.731129 0-155.225788 69.494659-155.225787 155.225787s69.494659 155.225788 155.225787 155.225788 155.225788-69.494659 155.225788-155.225788-69.494659-155.225788-155.225788-155.225787z m0 235.519786c-44.278362 0-80.304701-36.026339-80.304701-80.304702s36.026339-80.304701 80.304701-80.304701 80.304701 36.026339 80.304701 80.304701-36.026339 80.304701-80.304701 80.304702z" fill="currentColor" p-id="3945"></path></svg>`,
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
    `<svg t="1610503666305" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2041" width="1em" height="1em"><path d="M572.16 512l183.466667-183.04a42.666667 42.666667 0 1 0-60.586667-60.586667L512 451.84l-183.04-183.466667a42.666667 42.666667 0 0 0-60.586667 60.586667l183.466667 183.04-183.466667 183.04a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586667 0l183.04-183.466667 183.04 183.466667a42.666667 42.666667 0 0 0 60.586667 0 42.666667 42.666667 0 0 0 0-60.586667z" p-id="2042"></path></svg>`,
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
  /* common */ cat = "Common";
  Icon.add(
    "upload",
    `<svg t="1609828633664" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1558" width="1em" height="1em"><path d="M883.6 926.7H140.4c-42.1 0-76.4-35.9-76.4-80V577.8c0-22.1 17.9-40 40-40s40 17.9 40 40v268.9h736V577.8c0-22.1 17.9-40 40-40s40 17.9 40 40v268.9c0 44.1-34.3 80-76.4 80z" fill="#2C2C2C" p-id="1559"></path><path d="M512 744.2c-22.1 0-40-17.9-40-40V104.6c0-22.1 17.9-40 40-40s40 17.9 40 40v599.6c0 22.1-17.9 40-40 40z" fill="#2C2C2C" p-id="1560"></path><path d="M320 335.9c-10.2 0-20.5-3.9-28.3-11.7-15.6-15.6-15.6-40.9 0-56.6L481.6 77.8c4.5-4.5 13.9-13.9 30.4-13.9 10.6 0 20.8 4.2 28.3 11.7l192 192c15.6 15.6 15.6 40.9 0 56.6s-40.9 15.6-56.6 0L512 160.5 348.3 324.2c-7.8 7.8-18.1 11.7-28.3 11.7z" fill="#2C2C2C" p-id="1561"></path></svg>`,
    cat
  );
  /* Loading */ cat = "Loading";
  Icon.add(
    "loading",
    `<svg width="1em" height="1em" viewBox="0 0 50 50" style="enable-background: new 0 0 50 50" xml:space="preserve"><path fill='#4263eb' d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(275.098 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>`,
    cat
  );
  /* FileType */ cat = "FileType";
  Icon.add(
    "default",
    `<svg t="1609743512982" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26933" width="1em" height="1em"><path d="M0 0h1024v1024H0z" fill="#D8D8D8" fill-opacity="0" p-id="26934"></path><path d="M553.356 187.733L768 402.823v342.649c0 40.719-33.01 73.728-73.728 73.728H329.728c-40.719 0-73.728-33.01-73.728-73.728v-484.01c0-40.72 33.01-73.729 73.728-73.729h223.628z" fill="#DBDFE7" p-id="26935"></path><path d="M549.85 187.733L768 405.883v3.717H644.437c-54.291 0-98.304-44.012-98.304-98.304V187.733h3.716z" fill="#C0C4CC" p-id="26936"></path></svg>`,
    cat
  );
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
      const defaults = {
        title: "",
        subtitle: "",
        icon: null,
        image: null,
        titleLevel: 5,
      };
      const tagProp = props.href ? { tag: "a" } : {};
      super(Component.extendProps(defaults, props, tagProp), ...mixins);
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
        gutter: "md",
        childDefaults: { component: Col },
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
          children.push({ component: Col, children: item });
        }
        this.setProps({ children: children });
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
    config() {
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
      const defaults = {
        header: null,
        body: null,
        footer: null,
        uistyle: "default", // splitline,outline,card,bordered,plain
        startAddons: [],
        endAddons: [],
        fit: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
    },
    _config: function () {
      this.setProps({ classes: { "nom-modal-content": true } });
    },
  };
  class ModalDialog extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Panel } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      const modal = (this.modal = this.parent);
      const { content } = this.modal.props;
      if (isString(content)) {
        require([content], (contentConfig) => {
          let props = contentConfig;
          if (isFunction(props)) {
            props = contentConfig.call(this, modal);
          }
          props = Component.extendProps(
            this._getDefaultPanelContent(props),
            props
          );
          this.update({
            children: n$1(null, props, null, [ModalContentMixin]),
          });
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
      });
      const { okText, cancelText } = modal.props;
      return {
        component: Panel,
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
              {
                component: "Button",
                styles: { color: "primary" },
                text: okText,
                onClick: () => {
                  modal._handleOk();
                },
              },
              {
                component: "Button",
                text: cancelText,
                onClick: () => {
                  modal._handleCancel();
                },
              },
            ],
          },
        },
      };
    }
    _config() {
      const { content } = this.modal.props;
      if (isPlainObject(content)) {
        const contentProps = Component.extendProps(
          this._getDefaultPanelContent(content),
          content
        );
        this.setProps({
          children: n$1(null, contentProps, null, [ModalContentMixin]),
        });
      }
    }
  }
  Component.register(ModalDialog);
  class Modal extends Component {
    constructor(props, ...mixins) {
      const defaults = {
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
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this._scoped = true;
      this.bodyElem = document.body;
    }
    _config() {
      this.setProps({ children: { component: ModalDialog } });
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
      this.remove();
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
  Component.register(Modal);
  class Button extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "button",
        text: null,
        icon: null,
        rightIcon: null,
        type: null, // null(default) primary,dashed,text,link
        ghost: false,
        danger: false,
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
      const { icon, text, rightIcon, href, target } = this.props;
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
      if (href) {
        this.setProps({
          tag: "a",
          attrs: { href: href, target: target || "_self" },
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
        styles: { color: "primary" },
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
      const defaults = {
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
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(Alert);
  class Route {
    constructor(defaultPath) {
      const that = this;
      this.hash = window.location.hash;
      if (!this.hash) {
        this.hash = `#${defaultPath}`;
      }
      this.path = this.hash.substring(1);
      this.paths = [null, null, null];
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
      this.$app.lastLevel++;
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
        this.$app.lastLevel = this.level + 1;
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
      const level = this.level;
      const element = this.element;
      const defaultPath = this.props.defaultPath;
      const { paths } = this.$app.currentRoute;
      const that = this;
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
          });
        } else {
          routerProps.view = viewPropsOrRouterPropsFunc;
        }
        if (isString(routerProps.title)) {
          document.title = routerProps.title;
        }
        const extOptions = { reference: element, placement: "replace" };
        const viewOptions = Component.extendProps(routerProps.view, extOptions);
        this.currentView = Component.create(viewOptions, {
          _rendered: function () {
            that.element = this.element;
          },
        });
        delete this.props._created;
        delete this.props._rendered;
        delete this.props._config;
        delete this.props._remove;
        this.setProps(routerProps);
        this._callRendered();
      });
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
    }
    _config() {
      this.setProps({ children: { component: Router } });
      if (this.props.isFixedLayout === true) {
        document.documentElement.setAttribute("class", "app");
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
      console.info(JSON.stringify(route));
      let changedLevel = null;
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
        attrs: {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            userSelect: "none",
            opacity: 0.1,
            background: "#000",
          },
        },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({ attrs: { style: { zIndex: this.props.zIndex } } });
      if (this.referenceElement === document.body) {
        this.setProps({ attrs: { style: { position: "fixed" } } });
      }
    }
  }
  Component.register(LayerBackdrop);
  class Layer extends Component {
    constructor(props, ...mixins) {
      const defaults = {
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
      super(Component.extendProps(defaults, props), ...mixins);
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
    }
    _rendered() {
      const that = this;
      this.addRel(this.element);
      if (this.props.backdrop) {
        this.backdrop = new LayerBackdrop({
          zIndex: this._zIndex - 1,
          reference: this.props.reference,
        });
        if (this.props.closeOnClickBackdrop) {
          this.backdrop._on("click", function (e) {
            if (e.target !== e.currentTarget) {
              return;
            }
            that.remove();
          });
        }
      }
    }
    _show() {
      const { props } = this;
      this.setPosition();
      this._docClickHandler();
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
          props.position.of = props.alignTo;
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
  Component.register(Layer);
  class Tooltip extends Layer {
    constructor(props, ...mixins) {
      const defaults = {
        trigger: null,
        align: "top",
        alignOuter: true,
        closeOnClickOutside: true,
        autoRender: false,
        hidden: false,
        styles: { color: "black" },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this._showHandler = this._showHandler.bind(this);
      this._hideHandler = this._hideHandler.bind(this);
      this._onOpenerFocusinHandler = this._onOpenerFocusinHandler.bind(this);
      this._onOpenerFocusoutHandler = this._onOpenerFocusoutHandler.bind(this);
      this._openerFocusing = false;
      this.opener = this.props.trigger;
      this.props.alignTo = this.opener.element;
      this.showTimer = null;
      this.hideTimer = null;
      this.delay = 100;
      this.addRel(this.opener.element);
      this._bindHover();
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
      if (this._openerFocusing === true) {
        return;
      }
      clearTimeout(this.showTimer);
      this.showTimer = null;
      if (this.props.hidden === false) {
        this.hideTimer = setTimeout(() => {
          this.hide();
        }, this.delay);
      }
    }
    _show() {
      super._show();
      this._off("mouseenter");
      this._on("mouseenter", function () {
        clearTimeout(this.hideTimer);
      });
      this._off("mouseleave", this._hideHandler);
      this._on("mouseleave", this._hideHandler);
    }
  }
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
            Component.extendProps({}, this.props.tooltip),
            { trigger: this }
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
        return !isEmpty(value) ? Number(value) >= ruleValue : true;
      },
      message: "输入值不能小于 {0}",
    },
    max: {
      validate: function (value, ruleValue) {
        return !isEmpty(value) ? Number(value) <= ruleValue : true;
      },
      message: "输入值不能大于 {0}",
    },
    range: {
      validate: function (value, ruleValue) {
        return !isEmpty(value)
          ? Number(value) >= ruleValue[0] && Number(value) <= ruleValue[1]
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
        return !isEmpty(value) ? /^1[3|4|5|7|8][0-9]{9}$/.test(value) : true;
      },
      message: "请输入正确的手机号",
    },
    func: {
      validate: function (value, ruleValue) {
        if (!isEmpty(value) && isFunction(ruleValue)) {
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
  var FieldActionMixin = {
    _created: function () {
      this.field = this.parent;
      this.field.action = this;
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
  var ControlActionMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlAction = this;
    },
  };
  var ControlBeforeMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlBefore = this;
    },
  };
  var ControlAfterMixin = {
    _created: function () {
      this.field = this.parent.field;
      this.field.controlAfter = this;
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
      } = this.field.props;
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
            Component.extendProps(control, {
              classes: { "nom-control": true },
            }),
            null,
            [ControlMixin]
          ),
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
  let nameSeq = 0;
  class Field extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        label: null,
        labelAlign: "right",
        invalidTipAlign: "top right",
        value: null,
        flatValue: false,
        span: null,
        notShowLabel: false,
        rules: [],
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
        this.name = `__field${++nameSeq}`;
      }
      this.group = this.props.__group || null;
      if (this.parent && this.parent.__isControl === true) {
        this.group = this.parent.field;
      }
      this.rootField = this.group === null ? this : this.group.rootField;
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
        rules,
        action,
      } = this.props;
      const showLabel =
        notShowLabel === false && label !== undefined && label !== null;
      if (required === true) {
        rules.unshift({ type: "required", message: requiredMessage });
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
        };
        if (Array.isArray(action)) {
          actionProps = Component.extendProps(actionProps, { items: action });
        } else {
          actionProps = Component.extendProps(actionProps, action);
        }
      }
      this.setProps({
        children: [
          labelProps,
          { component: FieldContent, value: this.props.value },
          actionProps && n$1(actionProps, [FieldActionMixin]),
        ],
      });
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
        : null;
    }
    validate() {
      this.validateTriggered = true;
      return this._validate();
    }
    _validate() {
      const { rules, disabled, hidden } = this.props;
      if (disabled || hidden) {
        return true;
      }
      const value = this._getRawValue ? this._getRawValue() : this.getValue();
      if (Array.isArray(rules) && rules.length > 0) {
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
        this.errorTip = new Tooltip({
          trigger: this,
          reference: this.content,
          styles: { color: "danger" },
          children: message,
        });
        if (this.element.contains(document.activeElement)) {
          this.errorTip.show();
        }
      } else {
        this.errorTip.update({ children: message });
      }
    }
    focus() {
      isFunction(this._focus) && this._focus();
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
  }
  Object.defineProperty(Field.prototype, "fields", {
    get: function () {
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
      const defaults = {
        leftIcon: null,
        rightIcon: null,
        autofocus: false,
        placeholder: null,
        value: null,
        htmlType: "text",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { leftIcon, rightIcon, placeholder, value, htmlType } = this.props;
      let leftIconProps = Component.normalizeIconProps(leftIcon);
      if (leftIconProps != null) {
        leftIconProps = Component.extendProps(leftIconProps, {
          classes: { "nom-textbox-left-icon": true },
        });
      }
      let rightIconProps = Component.normalizeIconProps(rightIcon);
      if (rightIconProps != null) {
        rightIconProps = Component.extendProps(rightIconProps, {
          classes: { "nom-textbox-right-icon": true },
        });
      }
      const inputProps = {
        component: Input,
        name: "input",
        attrs: { value: value, placeholder: placeholder, type: htmlType },
        _created: function () {
          this.textbox = that;
          this.textbox.input = this;
        },
      };
      this.setProps({
        classes: {
          "p-with-left-icon": !!leftIcon,
          "p-with-right-icon": !!rightIcon,
        },
        control: {
          children: [
            inputProps,
            leftIcon && leftIconProps,
            rightIcon && rightIconProps,
          ],
        },
      });
      super._config();
    }
    getText() {
      return this.input.getText();
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
      this.input.setText(value);
      const newValue = this.getValue();
      if (options.triggerChange) {
        if (newValue !== this.oldValue) {
          super._onValueChange();
        }
      }
      this.oldValue = this.currentValue;
      this.currentValue = newValue;
    }
    focus() {
      this.input.focus();
    }
    blur() {
      this.input.blur();
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
  Component.register(Textbox);
  class Empty extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        description: "暂无数据",
        image: Empty.PRESENTED_IMAGE_DEFAULT,
        imageStyle: {},
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
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
  Component.register(Empty);
  class LayoutHeader extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutHeader);
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
  class LayoutSider extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutSider);
  class LayoutAsider extends Component {
    // constructor(props, ...mixins) {
    //   super(props)
    // }
  }
  Component.register(LayoutAsider);
  class Layout extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        header: null,
        body: null,
        footer: null,
        sider: null,
        asider: null,
        fit: true,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  var ListItemMixin = {
    _created: function () {
      this.wrapper = this.parent;
      this.wrapper.item = this;
      this.list = this.wrapper.list;
      this.list.itemRefs[this.key] = this;
    },
    _config: function () {
      const { onSelect, onUnselect } = this.props;
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
        selected: selectedItems.indexOf(this.key) !== -1,
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
      const defaults = { tag: "li", item: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.list = this.parent.list;
    }
    _config() {
      this._addPropStyle("span");
      const { item, span } = this.props;
      const { itemDefaults } = this.list.props;
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
  Component.register(ListItemWrapper);
  class ListContent extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "ul" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.list = this.parent;
      this.list.content = this;
    }
    _config() {
      this._addPropStyle("gutter", "line", "align", "justify", "cols");
      const { items, wrappers, wrapperDefaults } = this.list.props;
      const children = [];
      if (Array.isArray(wrappers) && wrappers.length > 0) {
        for (let i = 0; i < wrappers.length; i++) {
          let wrapper = wrappers[i];
          wrapper = Component.extendProps(
            {},
            { component: ListItemWrapper },
            wrapperDefaults,
            wrapper
          );
          children.push(wrapper);
        }
      } else if (Array.isArray(items) && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          children.push({ component: ListItemWrapper, item: items[i] });
        }
      }
      this.setProps({ children: children, childDefaults: wrapperDefaults });
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
      return this.selectItems(this.getChildren(), selectOption);
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
    appendItem(itemProps) {
      itemProps = Component.extendProps({}, this.props.itemDefaults, itemProps);
      const itemWrapperProps = { component: ListItemWrapper, item: itemProps };
      this.appendChild(itemWrapperProps);
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
  Component.register(ListContent);
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
  class List extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "div",
        items: [],
        itemDefaults: {},
        selectedItems: null,
        itemSelectable: {
          multiple: false,
          byClick: false,
          scrollIntoView: true,
        },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.itemRefs = {};
      this.selectedItem = null;
    }
    _config() {
      this._addPropStyle("gutter", "line", "align", "justify", "cols");
      this.setProps({ children: { component: ListContent } });
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
      if (this.props.itemSelectable.scrollIntoView) {
        this.scrollTo(item);
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
      const children = this.content.getChildren();
      for (let i = 0; i < children.length; i++) {
        const { item } = children[i];
        if (item.props.selected) {
          selectedItems.push(item);
        }
      }
      return selectedItems;
    }
    appendItem(itemProps) {
      this.content.appendItem(itemProps);
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
    scrollTo(param) {
      const item = this.getItem(param);
      if (item) {
        scrollIntoView(item.wrapper.element, {
          behavior: "smooth",
          scrollMode: "if-needed",
        });
      }
    }
    scrollToSelected() {
      if (this.selectedItem) {
        this.scrollTo(this.selectedItem);
      }
    }
  }
  Component.register(List);
  var AutoCompleteListItemMixin = {
    _config: function () {
      const { onSelect, onUnselect } = this.props;
      this.setProps({
        selectable: {
          byClick: true,
          canRevert: this.list.autoCompleteControl.props.multiple === false,
        },
        onSelect: () => {
          const { autoCompleteControl } = this.list; // const selectProps = selectControl.props
          // const autoCompleteProps = autoCompleteControl.props
          const autoCompleteOption = {
            value: this.props.value, // text: this.props.text,
            option: this.props,
          };
          autoCompleteControl.input.update(autoCompleteOption);
          autoCompleteControl.popup.hide(); // if (selectProps.multiple === false) {
          //   selectControl.selectedSingle.update(selectedOption)
          //   selectControl.popup.hide()
          // } else {
          //   selectControl.selectedMultiple.appendItem(selectedOption)
          // }
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          // const { selectControl } = this.list
          // const selectProps = selectControl.props
          // if (selectProps.multiple === true) {
          //   selectControl.selectedMultiple.removeItem(this.key)
          // }
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
            this.setProps({ children: this.props.value });
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
      const { optionDefaults, value, options } = this.props;
      this.setProps({
        items: options || [],
        itemDefaults: n$1(null, optionDefaults, null, [
          AutoCompleteListItemMixin,
        ]),
        itemSelectable: { multiple: false, byClick: true },
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
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.autoCompleteControl = this.opener.field;
    }
    _config() {
      const { options } = this.props;
      if (options && options.length) {
        this.setProps({
          attrs: {
            style: {
              width: `${this.autoCompleteControl.control.offsetWidth()}px`,
            },
          },
          children: {
            component: Layout,
            body: {
              children: {
                component: AutoCompleteList,
                options: this.props.options,
              },
            },
          },
        });
      } else {
        this.setProps({
          attrs: {
            style: {
              width: `${this.autoCompleteControl.control.offsetWidth()}px`,
            },
          },
          children: {
            component: Layout,
            styles: { padding: 2 },
            body: { children: { component: Empty } },
          },
        });
      }
      super._config();
    }
  }
  class AutoComplete extends Textbox {
    constructor(props, ...mixins) {
      const defaults = {
        options: [],
        debounce: true,
        interval: 300,
        filterOption: (value, options) =>
          options.filter((o) => o.value.includes(value)),
        allowClear: true, // rightIcon: {
        //   compoent: 'Icon',
        //   type: 'close',
        //   hidden: true,
        //   onClick({ event }) {
        //     event.stopPropagation()
        //   },
        // },
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
    }
    _rendered() {
      this.input && this._init();
      this.popup && this.popup.remove();
      this.popup = new AutoCompletePopup({
        trigger: this.control,
        options: this.props.options,
      });
    }
    _remove() {
      this.timer && clearTimeout(this.timer);
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
      });
      this.input.element.addEventListener("compositionstart", function () {
        autoComplete.capsLock = true;
      });
      this.input.element.addEventListener("compositionend", function () {
        autoComplete.capsLock = false;
        autoComplete._handleSearch(this.value);
      });
    }
    _getValue() {
      return super._getValue();
    }
    _setValue(value, options) {
      super._setValue(value, options);
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
      const { onSearch, filterOption, options } = this.props;
      isFunction(filterOption) &&
        this.popup.update({ options: filterOption(txt, options) });
      isFunction(onSearch) && onSearch(txt);
    }
  }
  Component.register(AutoComplete);
  class Avatar extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "span",
        size: "default",
        alt: "图片",
        gap: 4, // 字符类型距离左右两侧边界单位像素
        text: null, // 文本
        icon: null, // 图标
        src: null, // 图片地址
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { text, icon, src, alt } = this.props;
      this._propStyleClasses = ["size"];
      if (src) {
        this.setProps({
          classes: { "avatar-image": true },
          children: [{ tag: "img", attrs: { src, alt } }],
        });
      } else if (icon) {
        this.setProps({ children: [Component.normalizeIconProps(icon)] });
      } else {
        this.setProps({
          children: [
            text && {
              tag: "span",
              classes: { "nom-avatar-string": true },
              children: text,
            },
          ],
        });
      }
    }
    _setScale() {
      const { gap, src, icon } = this.props;
      if (src || icon) {
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
    _rendered() {
      this._setScale();
    }
  }
  Component.register(Avatar);
  class AvatarGroup extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "div",
        size: "default", // 通过设置 mode 可以改变时间轴和内容的相对位置 left | alternate | right
        maxCount: null, // 显示的最大头像个数
        maxPopoverPlacement: "top", // 多余头像气泡弹出位置
        items: [], // 子元素项列表
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(AvatarGroup);
  class Badge extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        key: null,
        tag: "span",
        type: "round",
        text: null,
        icon: null,
        number: null,
        overflowCount: 99,
        size: "xs",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["size", "color"];
      const { icon, text, type, number, overflowCount } = this.props;
      if (icon) {
        this.setProps({ classes: { "p-with-icon": true } });
      }
      if (type === "round") {
        this.setProps({ classes: { "u-shape-round": true } });
      } else if (type === "dot") {
        if (number > 0) {
          this.setProps({ classes: { "p-with-number": true } });
        }
      }
      this.setProps({
        children: [
          Component.normalizeIconProps(icon),
          text && { tag: "span", children: text },
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
  Component.register(Badge);
  class CascaderList extends Component {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.cascaderControl = this.parent.parent.parent.cascaderControl;
      this.cascaderControl.optionList = this;
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
    }
    getMenuItems(menu, currentVal) {
      const cascaderList = this;
      if (!menu) {
        return null;
      }
      return {
        tag: "ul",
        classes: { "nom-cascader-menu": true },
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
              },
              onClick: () => {
                cascaderList.cascaderControl._itemSelected(item.key);
              },
              children: [
                { tag: "span", children: item.label },
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
            children: [{ tag: "span", children: item.label }],
          };
        }),
      };
    }
  }
  class CascaderPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = {};
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
  }
  Component.register(CascaderPopup);
  class Cascader extends Field {
    constructor(props, ...mixins) {
      const defaults = {
        options: [],
        showArrow: true,
        separator: " / ",
        fieldsMapping: { label: "label", value: "value", children: "children" },
        valueType: "cascade",
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
              item.element.scrollIntoView({
                behavior: "auto",
                scrollMode: "if-needed",
              });
            });
          }
        },
      });
      this._valueChange({ newValue: this.currentValue });
    } // _created() {
    //   super._created()
    //   const { value, options, fieldsMapping } = this.props
    //   this.internalOption = JSON.parse(JSON.stringify(options))
    //   this.handleOptions(this.internalOption, fieldsMapping)
    //   this.flatItems(this.internalOption)
    //   this.initValue = isFunction(value) ? value() : value
    //   this.selectedOption = []
    //   this.handleOptionSelected(this.initValue)
    //   this.currentValue = this.initValue
    //   this.checked = true
    // }
    _config() {
      const cascader = this;
      const children = [];
      const { showArrow, placeholder, separator, valueType } = this.props;
      const { value, options, fieldsMapping } = this.props;
      this.internalOption = JSON.parse(JSON.stringify(options));
      this.handleOptions(this.internalOption, fieldsMapping);
      this.flatItems(this.internalOption);
      this.initValue = isFunction(value) ? value() : value;
      this.selectedOption = [];
      this.handleOptionSelected(this.initValue);
      this.currentValue = this.initValue;
      this.checked = true;
      children.push({
        classes: { "nom-cascader-content": true },
        _created() {
          cascader.content = this;
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
          if (this.selectedOption.length === 0) return;
          this.selectedOption = [];
          this.checked = true;
          this.popup.update({ popMenu: this.getSelectedMenu() });
          this._onValueChange();
        },
      });
      this.setProps({
        control: { children },
        attrs: {
          onmouseover() {
            cascader.close.show();
            showArrow && cascader.down.hide();
          },
          onmouseleave() {
            showArrow && cascader.down.show();
            cascader.close.hide();
          },
        },
      });
      super._config();
    }
    _itemSelected(selectedKey, isLeaf = false) {
      if (!this.items) return;
      this.selectedOption = [];
      let recur = this.items.get(selectedKey);
      while (recur) {
        this.selectedOption.unshift(recur);
        recur = this.items.get(recur.pid);
      }
      this.checked = isLeaf;
      const selectedItem = this.items.get(selectedKey);
      if (!selectedItem) return;
      if (this.checked && this.triggerChange(selectedItem.value)) {
        this._onValueChange();
      }
      this.popup.update({ popMenu: this.getSelectedMenu() });
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
      this.content && this.content.update();
      this.popup && this.popup.hide();
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
    _setValue(value) {
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
    }
    handleOptions(options, fieldsMapping) {
      const {
        key: keyField,
        label: labelField,
        value: valueField,
        children: childrenField,
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
      const { valueType } = this.props;
      this.checked = false;
      const oldCheckedOption = this.selectedOption;
      this.selectedOption = [];
      if (!value) this.checked = true;
      if (!this.items || this.items.size === 0) return;
      if (valueType === "single") {
        for (const v of this.items.values()) {
          if (v.leaf && v.value === value) {
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
      if (this.content) this.content.update();
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
  Component.register(Cascader);
  class Checkbox extends Field {
    constructor(props, ...mixins) {
      const defaults = { text: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
            { tag: "span" },
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
  Component.register(Checkbox);
  var OptionListMixin = {
    _created: function () {
      this.checkboxList = this.parent.parent;
      this.checkboxList.optionList = this;
    },
    _config: function () {
      const { itemSelectionChange } = this.props;
      const listProps = this.checkboxList.props;
      this.setProps({
        disabled: listProps.disabled,
        items: listProps.options,
        itemDefaults: listProps.optionDefaults,
        itemSelectable: {
          byClick: true,
          multiple: true,
          scrollIntoView: false,
        },
        selectedItems: listProps.value,
        onItemSelectionChange: () => {
          this.checkboxList._onValueChange();
          this._callHandler(itemSelectionChange);
        },
      });
    },
  };
  class OptionList$1 extends List {
    constructor(props, ...mixins) {
      const defaults = {
        gutter: "x-md",
        itemDefaults: {
          tag: "label",
          _config: function () {
            this.setProps({
              children: [
                { tag: "span", classes: { checkbox: true } },
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
      const defaults = { options: [] };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        optionDefaults: {
          key: function () {
            return this.props.value;
          },
        },
      });
      this.setProps({ optionList: { component: OptionList$1 } });
      this.setProps({ control: this.props.optionList });
      super._config();
    }
    getSelectedOptions() {
      return this.optionList.getSelectedItems();
    }
    _getValue() {
      const selected = this.getSelectedOptions();
      if (selected !== null && Array.isArray(selected) && selected.length > 0) {
        const vals = selected.map(function (item) {
          return item.props.value;
        });
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
          return item.props ? item.props.text : item.text;
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
        this.optionList.unselectAllItems({
          triggerSelectionChange: options.triggerChange,
        });
      }
      this.optionList.selectItem(
        function () {
          return this.props.value === value;
        },
        { triggerSelectionChange: options.triggerChange }
      );
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
  Component.register(CheckboxList);
  class CollapseItem extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        key: null,
        title: null,
        content: null,
        collapsed: true,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { key, title, content, collapsed } = this.props;
      const that = this;
      this.setProps({
        children: [
          {
            tag: "div",
            classes: { "nom-collapse-item-title": true },
            styles: { padding: "3px" },
            key: key,
            children: [
              Object.assign(
                {},
                Component.normalizeIconProps(
                  collapsed
                    ? that.parent.props.icon.default
                    : that.parent.props.icon.open
                ),
                {
                  onClick: function () {
                    if (!that.parent.props.iconOnly) return;
                    that.setProps({ collapsed: collapsed !== true });
                    that.parent.setProps({ activeKey: that.props.key });
                    that.update(collapsed);
                  },
                }
              ),
              { tag: "span", children: title },
            ],
            onClick: function () {
              if (that.parent.props.iconOnly) return;
              that.setProps({ collapsed: collapsed !== true });
              that.parent.setProps({ activeKey: that.props.key });
              that.update(collapsed);
            },
          },
          {
            tag: "div",
            classes: { "nom-collapse-item-content": true },
            styles: { padding: "3px" },
            hidden: collapsed,
            children: content,
          },
        ],
      });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
  Component.register(CollapseItem);
  class Collapse extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        activeKey: 1,
        items: null,
        bordered: false,
        icon: { default: "right", open: "up" },
        iconOnly: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { activeKey, bordered } = this.props; // const that = this
      const items = this.props.items.map(function (item) {
        return {
          component: CollapseItem,
          key: item.key,
          title: item.title,
          content: item.content,
          collapsed: activeKey !== item.key,
          classes: { "nom-collapse-bordered": !!bordered },
        };
      });
      this.setProps({ children: items });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
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
        styles: { color: "primary" },
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
      const defaults = {
        icon: "question-circle",
        title: null,
        description: null,
        action: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(Confirm);
  class Container extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        fluid: false, // type: null,
        breakpoint: null,
      };
      super(Component.extendProps(defaults, props), mixins);
    }
    _config() {
      this._addPropStyle("breakpoint", "fluid");
    }
  }
  Component.register(Container);
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
      }
    }
  }
  Component.register(Rows);
  var SelectListItemMixin = {
    _config: function () {
      const { onSelect, onUnselect } = this.props;
      this.setProps({
        selectable: {
          byClick: true,
          canRevert: this.list.selectControl.props.multiple === true,
        },
        onSelect: () => {
          const { selectControl } = this.list;
          const selectProps = selectControl.props;
          const selectedOption = {
            text: this.props.text,
            value: this.props.value,
            option: this.props,
          };
          if (selectProps.multiple === false) {
            selectControl.selectedSingle.update(selectedOption);
            selectControl.popup.hide();
          } else {
            selectControl.selectedMultiple.appendItem(selectedOption);
          }
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          const { selectControl } = this.list;
          const selectProps = selectControl.props;
          if (selectProps.multiple === true) {
            selectControl.selectedMultiple.removeItem(this.key);
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
        options,
        optionDefaults,
        value,
        multiple,
        filterOption,
      } = this.selectControl.props;
      const { text } = this.props;
      const { checked, checkedOption } = this.selectControl;
      let filterStr = checked ? checkedOption && checkedOption.text : text; // null或undefined处理
      filterStr = filterStr || "";
      const filterOptions = showSearch && filterOption(filterStr, options);
      this.setProps({
        items: showSearch ? filterOptions : options,
        itemDefaults: n$1(null, optionDefaults, null, [SelectListItemMixin]),
        itemSelectable: { multiple: multiple, byClick: true },
        selectedItems: showSearch
          ? checkedOption && checkedOption.value
          : value,
        onItemSelectionChange: () => {
          this.selectControl._onValueChange();
        },
      });
      super._config();
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
      this.setProps({
        attrs: {
          style: { width: `${this.selectControl.control.offsetWidth()}px` },
        },
        children: {
          component: Layout,
          body: { children: { component: SelectList } },
        },
      });
      super._config();
    }
  }
  Component.register(SelectPopup);
  class Select extends Field {
    constructor(props, ...mixins) {
      const defaults = {
        options: [],
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
          component: List,
          itemDefaults: {
            _config: function () {
              this.setProps({ tag: "span", children: this.props.text });
            },
          },
          gutter: "md",
        },
        multiple: false,
        showArrow: true,
        minItemsForSearch: 20,
        filterOption: (text, options) =>
          options.filter((o) => o.text.indexOf(text) >= 0),
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const {
        multiple,
        showArrow,
        placeholder,
        disabled,
        showSearch,
      } = this.props;
      const children = [];
      this.setProps({
        selectedSingle: {
          _created() {
            that.selectedSingle = this;
          },
        },
        selectedMultiple: {
          itemDefaults: {
            key() {
              return this.props.value;
            },
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
      this.setProps({
        control: {
          attrs: { style: { cursor: "text" } },
          disabled: disabled,
          children: children,
        },
        onClick: () => {
          showSearch && this.selectedSingle.element.focus();
        },
      });
      super._config();
    }
    _rendered() {
      const { value } = this.props;
      this.popup = new SelectPopup({
        trigger: this.control,
        onShow: () => {
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
          this.selectedMultiple.update({ items: selValueOptions });
          this.currentValue = selValueOptions.map(function (item) {
            return item.value;
          });
        } else {
          this.selectedMultiple.unselectAllItems();
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
          this.selectedSingle.emptyChildren();
        }
      }
    }
    selectOption(option) {
      this.optionList.selectItem(option);
    }
    selectOptions(options) {
      this.optionList.selectItems(options);
    }
    getSelectedOption() {
      if (!this.optionList) {
        return null;
      }
      if (this.props.multiple === false) {
        return this.optionList.getSelectedItem();
      }
      return this.optionList.getSelectedItems();
    }
    _getOptionsByValue(value) {
      if (this.props.multiple === false) {
        return this._getOption(value);
      }
      return this._getOptions(value);
    }
    _getValueText(options, value) {
      const { valueOptions } = this.props;
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
            return item.props ? item.props.text : item.text;
          });
          return vals;
        }
        if (options.asArray === true && !Array.isArray(selected)) {
          return selected.props ? [selected.props.text] : [selected.text];
        }
        if (!Array.isArray(selected)) {
          return selected.props ? selected.props.text : selected.text;
        }
      }
      return null;
    }
    _getValue(options) {
      const { valueOptions, showSearch } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      if (!this.optionList) {
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
            return item.props.value;
          });
          return vals;
        }
        if (options.asArray === true && !Array.isArray(selected)) {
          return [selected.props.value];
        }
        if (!Array.isArray(selected)) {
          return selected.props.value;
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
        const selectedOption = this.props.options.find(
          (e) => e.value === value
        );
        if (selectedOption) {
          this.checked = true;
          this.checkedOption = selectedOption;
          this.updateSearchPopup(selectedOption && selectedOption.text);
          this._directSetValue(value);
        }
      }
      if (this.optionList) {
        this.optionList.unselectAllItems({ triggerSelectionChange: false });
        this.selectOptions(value, {
          triggerSelectionChange: options.triggerChange,
        });
      } else {
        this._directSetValue(value);
        if (options.triggerChange) {
          this._onValueChange();
        }
      }
    }
    _getOption(value) {
      let option = null;
      const { options } = this.props;
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
    _valueChange(changed) {
      if (this.placeholder) {
        if (
          (Array.isArray(changed.newValue) && changed.newValue.length === 0) ||
          changed.newValue === null ||
          changed.newValue === undefined
        ) {
          this.placeholder.show();
        } else {
          this.placeholder.hide();
        }
      }
      if (this.props.showSearch) {
        const selectedOption = this.props.options.find(
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
  }
  Component.register(Select);
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
  };
  class DateTimePickerList extends List {
    constructor(props, ...mixins) {
      const defaults = { gutter: "sm", cols: 1, min: "00", max: "59" };
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
      const selected = [];
      const that = this;
      this.props.min = this.pickerControl.timeRange[this.props.type][0];
      this.props.max = this.pickerControl.timeRange[this.props.type][1];
      if (this.props.type === "hour") {
        items = this.pickerControl.getHour();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.hour);
      } else if (this.props.type === "minute") {
        items = this.pickerControl.getMinute();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.minute);
      } else if (this.props.type === "second") {
        items = this.pickerControl.getSecond();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.second);
      }
      this.setProps({
        styles: { padding: "3px" },
        items: items,
        itemSelectable: { multiple: false, byClick: true },
        attrs: { style: { position: "relative" } },
        selectedItems: selected,
        itemDefaults: {
          _config: function () {
            const key = this.props.key;
            if (key < that.props.min || key > that.props.max) {
              this.setProps({ disabled: true });
            }
          },
        },
        onItemSelectionChange: () => {
          this.onChange();
        },
      });
      super._config();
    }
    onChange() {
      this.scrollToKey();
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
          // this.selectItem(t[0])
          this.update({ selectedItems: t[0] });
        } else if (this.props.type === "minute") {
          // this.selectItem(t[1])
          this.update({ selectedItems: t[1] });
        } else {
          // this.selectItem(t[2])
          this.update({ selectedItems: t[2] });
        }
      } else {
        this.unselectAllItems();
      }
    }
    refresh() {
      const selected = [];
      this.getSelectedItem() && selected.push(this.getSelectedItem().props.key);
      this.props.selectedItems = selected;
      this.update();
      this.scrollToKey();
    }
    scrollToKey() {
      // const top = this.getSelectedItem() ? this.getSelectedItem().element.offsetTop - 3 : 0
      // this.scroller.element.scrollTop = top
      this.scrollToSelected();
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
        minValue: "10:10:10",
        maxValue: "20:20:20",
        onValueChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.datePicker = this.parent.parent.parent.opener.parent.parent;
      this.datePicker.timePicker = this;
      this.defaultValue = this.props.value;
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
      if (this.props.startTime) {
        const time = new Date(`2000 ${this.props.startTime}`);
        this.minTime = {
          hour: this.getDoubleDigit(time.getHours()),
          minute: this.getDoubleDigit(time.getMinutes()),
          second: this.getDoubleDigit(time.getSeconds()),
        };
      } else if (this.props.minTime) {
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
      this.onShow();
      super._config();
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
      this.timeText.update({ children: c });
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
      this.defaultValue = null;
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].resetTime();
      });
      this.timeText.update({ children: "" });
    }
    onShow() {
      const that = this;
      this.timeText && this.timeText.update({ children: this.defaultValue });
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].scrollToKey();
      });
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
      if (that.time.hour <= that.minTime.hour) {
        that.timeRange.hour = [that.minTime.hour, that.maxTime.hour];
        that.timeRange.minute = [that.minTime.minute, "59"];
        if (that.time.minute <= that.minTime.minute) {
          that.timeRange.second = [that.minTime.second, "59"];
        } else {
          that.timeRange.second = ["00", "59"];
        }
      } else if (that.time.hour >= that.maxTime.hour) {
        that.timeRange.minute = ["00", that.maxTime.minute];
        if (that.time.minute >= that.maxTime.minute) {
          that.timeRange.second = ["00", that.maxTime.second];
        } else {
          that.timeRange.second = ["00", "59"];
        }
      } else {
        that.timeRange.minute = that.timeRange.second = ["00", "59"];
      }
      this.empty = false;
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].refresh();
      });
    }
  }
  Component.register(TimePickerPanel);
  class DatePicker extends Textbox {
    constructor(props, ...mixins) {
      const defaults = {
        format: "yyyy-MM-dd",
        disabledTime: null,
        minDate: null,
        maxDate: null,
        yearRange: [50, 20],
        showTime: false,
        allowClear: true,
        onChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.dateInfo = null;
      this.todayItem = null;
      this.startTime = null;
    }
    _config() {
      this.props.value = formatDate(this.props.value, this.props.format);
      const { value, format, disabled } = this.props;
      let currentDate =
        value !== null ? Date.parseString(value, format) : new Date();
      if (!currentDate) {
        currentDate = new Date();
      }
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const that = this;
      const minTime =
        this.props.showTime && this.props.minDate
          ? new Date(this.props.minDate).format(
              this.props.showTime.format || "HH:mm:ss"
            )
          : "00:00:00";
      this.startTime = minTime;
      this.props.minDate = new Date(this.props.minDate).format("yyyy-MM-dd");
      this.setProps({
        leftIcon: "calendar",
        rightIcon: {
          component: "Icon",
          type: "times",
          hidden: !this.props.allowClear,
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
              that.props.showTime && that.timePicker.onShow();
            },
            onHide: () => {
              that.onPopupHide();
            },
            classes: {
              "nom-date-picker-popup": true,
              "nom-date-picker-with-time": this.props.showTime,
            },
            triggerAction: "click",
            children: {
              component: "Cols",
              items: [
                {
                  component: Rows,
                  attrs: { style: { width: "260px" } },
                  items: [
                    {
                      component: Cols,
                      justify: "between",
                      fills: true,
                      items: [
                        {
                          component: Select,
                          value: year,
                          options: this._getYears(),
                          onValueChange: (changed) => {
                            year = changed.newValue;
                            that.days.update({
                              items: that._getDays(year, month),
                            });
                          },
                        },
                        {
                          component: Select,
                          value: month,
                          options: this._getMonths(),
                          onValueChange: function (changed) {
                            month = changed.newValue;
                            that.days.update({
                              items: that._getDays(year, month),
                            });
                          },
                        },
                      ],
                    },
                    {
                      component: Cols,
                      items: ["日", "一", "二", "三", "四", "五", "六"],
                      fills: true,
                      gutter: null,
                      itemDefaults: { styles: { text: "center" } },
                    },
                    {
                      component: List,
                      _created: function () {
                        that.days = this;
                      },
                      gutter: "sm",
                      cols: 7,
                      selectedItems: `${year}-${month}-${day}`,
                      itemSelectable: { byClick: true },
                      items: this._getDays(year, month),
                      itemDefaults: {
                        key: function () {
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
                            new Date(date).isBefore(
                              new Date(that.props.minDate)
                            )
                          ) {
                            isDisabled = true;
                          }
                          if (
                            that.props.maxDate &&
                            new Date(date).isAfter(new Date(that.props.maxDate))
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
                          if (that.props.minDate && that.props.showTime) {
                            const myday = parseInt(
                              new Date(that.props.minDate).format("d"),
                              10
                            );
                            if (myday === args.sender.props.day) {
                              that.timePicker.update({
                                startTime: that.startTime,
                              });
                            } else if (myday < args.sender.props.day) {
                              that.timePicker.update({ startTime: "00:00:00" });
                            }
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
                  attrs: {
                    style: {
                      "border-left": "1px solid #ddd",
                      "padding-left": "5px",
                    },
                  },
                  onValueChange: (data) => {
                    this.handleTimeChange(data);
                  },
                  startTime: minTime,
                },
              ],
            },
          },
        },
      });
      super._config();
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
      let lastDayCount = this._getDaysInMonth(year, month);
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
    handleTimeChange(param) {
      if (!this.days.getSelectedItem()) {
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
      this.setValue(null);
      this.days && this.days.unselectAllItems();
      this.props.showTime && this.timePicker && this.timePicker.resetList();
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
      if (!Date.isValid(this.getValue(), this.props.format)) {
        this.input.setText(null);
      }
      super._onBlur();
    }
  }
  Component.register(DatePicker);
  class Group extends Field {
    constructor(props, ...mixins) {
      const defaults = { fields: [], fieldDefaults: { component: Field } };
      super(Component.extendProps(defaults, props), ...mixins);
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
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.getValue && this._needHandleValue(field, options)) {
          const fieldValue = field.getValue();
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
      options = extend$1({ ignoreDisabled: true, ignoreHidden: true }, options);
      for (let i = 0; i < this.fields.length; i++) {
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
    validate() {
      const invalids = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.validate) {
          const valResult = field.validate();
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
      if (field._autoName) {
        return false;
      }
      if (options.ignoreDisabled && disabled === true) {
        return false;
      }
      if (options.ignoreHidden && hidden === true) {
        return false;
      }
      return true;
    }
  }
  Component.register(Group);
  class DateRangePicker extends Group {
    constructor(props, ...mixins) {
      const defaults = {
        format: "yyyy-MM-dd",
        disabledTime: null,
        minDate: null,
        maxDate: null,
        yearRange: [50, 20],
        showTime: false,
        allowClear: true,
        onChange: null,
        fieldName: { start: "start", end: "end" },
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      } = this.props;
      this.setProps({
        inline: true,
        fields: [
          {
            component: "DatePicker",
            name: that.props.fieldName.start,
            placeholder: "开始日期",
            ref: (c) => {
              that.startPicker = c;
            },
            onChange: function (args) {
              that.checkRange(args.sender.name);
            },
            format,
            allowClear,
            minDate,
            maxDate,
            yearRange,
            showTime,
          },
          { component: "StaticText", value: "-" },
          {
            component: "DatePicker",
            name: that.props.fieldName.end,
            placeholder: "结束日期",
            ref: (c) => {
              that.endPicker = c;
            },
            onChange: function (args) {
              that.checkRange(args.sender.name);
            },
            format,
            allowClear,
            minDate,
            maxDate,
            yearRange,
            showTime,
          },
        ],
      });
      super._config();
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
          opposite.update({ minDate: active.getValue() });
          if (opposite.getValue() && opposite.getValue() < active.getValue()) {
            opposite.clearTime();
            opposite.focus();
            opposite.showPopup();
          } else if (!opposite.getValue()) {
            opposite.focus();
            opposite.showPopup();
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
  Component.register(DateRangePicker);
  class Divider extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        type: "horizontal",
        orientation: "center", // dashed:true,
        // plan:true,
        // children:
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(Divider);
  class Dropdown extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "span",
        triggerAction: "click",
        rightIcon: "down",
        split: false,
        onClick: null,
        items: [],
        size: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
          popup: {
            triggerAction: triggerAction,
            classes: { "nom-dropdown-popup": true },
            ref: (c) => {
              that.popup = c;
            },
            children: {
              component: "Menu",
              itemDefaults: {
                styles: { hover: { color: "primary" } },
                size: size,
              },
              items: items,
            },
            onClick: (args) => {
              args.sender.hide();
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
    _rendered() {}
  }
  Component.register(Dropdown);
  class Ellipsis extends Component {
    constructor(props, ...mixins) {
      const defaults = { text: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        children: {
          classes: { "nom-ellipsis-inner": true },
          children: this.props.text ? this.props.text : this.props.children,
        },
      });
    }
  }
  Component.mixin({
    _config: function () {
      if (this.props.ellipsis === true && this.parent.componentType !== "Tr") {
        this.setProps({ classes: { "nom-ellipsis-block": true } });
      }
    },
  });
  Component.register(Ellipsis);
  class Form extends Group {
    constructor(props, ...mixins) {
      const defaults = { labelAlign: "top" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
  }
  Component.register(Form);
  class Spinner extends Component {
    constructor(props, ...mixins) {
      const defaults = { spinning: true };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { spinning } = this.props;
      this.setProps({ classes: { "p-type-border": spinning } });
    }
  }
  Component.register(Spinner);
  class Loading extends Layer {
    constructor(props, ...mixins) {
      const defaults = {
        align: "center",
        container: document.body,
        backdrop: true,
        collision: "none",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        reference: this.props.container,
        alignTo: this.getElement(this.props.container),
        children: { component: Spinner },
      });
      if (this.props.container instanceof Component) {
        this.props.container.addClass("nom-loading-container");
      } else {
        this.props.container.component.addClass("nom-loading-container");
      }
      super._config();
    }
    _remove() {
      if (this.props.container instanceof Component) {
        this.props.container.removeClass("nom-loading-container");
      } else {
        this.props.container.component.removeClass("nom-loading-container");
      }
      super._remove();
    }
  }
  Component.register(Loading);
  class Td extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "td", data: null, column: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.tr = this.parent;
      this.table = this.tr.table;
    }
    _config() {
      const { level, isLeaf, data: rowData } = this.tr.props;
      const { column } = this.props;
      const { treeConfig } = this.table.props;
      let spanProps = null;
      let children = this.props.data;
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
        if (!isLeaf) {
          this.setProps({
            expanded:
              treeConfig.initExpandLevel === -1 ||
              treeConfig.initExpandLevel > level,
            expandable: {
              byClick: true,
              target: () => {
                return rowData.children.map((subrowData) => {
                  return this.table.grid.rowsRefs[
                    subrowData[this.table.props.keyField]
                  ];
                });
              },
              indicator: {
                component: "Icon",
                classes: { "nom-tr-expand-indicator": true },
                expandable: {
                  expandedProps: { type: "down" },
                  collapsedProps: { type: "right" },
                },
              },
            },
          });
        }
        children = [
          {
            tag: "span",
            attrs: {
              style: { paddingLeft: `${level * treeConfig.indentSize + 20}px` },
            },
          },
          !isLeaf && this.getExpandableIndicatorProps(),
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
        (this.table.props.ellipsis === "both" ||
          this.table.props.ellipsis === "body") &&
        this.props.column.ellipsis !== false;
      const showTitle =
        ((this.table.hasGrid && this.table.grid.props.showTitle) ||
          this.table.props.showTitle) &&
        this.props.column.showTitle !== false;
      this.setProps({
        children: children,
        attrs: {
          colspan: colSpan,
          rowspan: rowSpan,
          "data-field": this.props.column.field,
          title:
            (isString(children) || isNumeric(children)) &&
            (isEllipsis || showTitle)
              ? children
              : null,
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
    _rendered() {
      if (this.props.column.fixed === "left") {
        this._setStyle({ left: `${this.element.offsetLeft}px` });
      } else if (this.props.column.fixed === "right") {
        this._setStyle({
          right: `${
            this.parent.element.offsetWidth -
            this.element.offsetLeft -
            this.element.offsetWidth
          }px`,
        });
      }
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
  Component.register(ExpandedTr);
  class ColGroupCol extends Component {
    constructor(props, ...mixins) {
      const defaults = { tag: "col", column: {} };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.table = this.parent.table;
      this.table.colRefs[this.props.column.field] = this;
    }
    _config() {
      const { width } = this.props.column;
      let widthPx = null;
      if (width) {
        widthPx = `${width}px`;
      }
      this.setProps({
        attrs: {
          style: { width: widthPx },
          "data-field": this.props.column.field || null,
        },
      });
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
      this.columns = this.table.props.columns;
      this.colList = [];
      this.hasColumnGroup = false;
    }
    _config() {
      const children = [];
      if (Array.isArray(this.columns)) {
        this.colList = [];
        children.push(...this.createCols(this.columns));
      }
      this.table.colLength = children.length;
      if (
        this.table.parent.componentType === "GridHeader" &&
        this.table.parent.parent.props.frozenHeader
      ) {
        children.push({ component: ColGroupCol, column: { width: 17 } });
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
      this.table = this.tbody.table;
      this.tdList = [];
      if (this.table.hasGrid && this.props.data[this.table.props.keyField]) {
        this.table.grid.rowsRefs[
          this.props.data[this.table.props.keyField]
        ] = this;
      }
    }
    _config() {
      const columns = this.table.props.columns;
      const { data, level } = this.props;
      const grid = this.table.grid;
      const children = [];
      let hidden = false;
      if (grid) {
        const { treeConfig } = grid.props;
        hidden =
          treeConfig.initExpandLevel !== -1 &&
          treeConfig.initExpandLevel < level;
      }
      if (Array.isArray(columns)) {
        this.TdList = [];
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
    }
    _show() {
      if (this.firstRender) {
        return;
      }
      const { data: rowData } = this.props;
      if (Array.isArray(rowData.children)) {
        rowData.children.forEach((subrowData) => {
          if (this._expanded) {
            const row = this.table.grid.getRow(subrowData);
            row && row.show && row.show();
          }
        });
      }
    }
    _hide() {
      if (this.firstRender) {
        return;
      }
      const { data: rowData } = this.props;
      if (Array.isArray(rowData.children)) {
        rowData.children.forEach((subrowData) => {
          const row = this.table.grid.getRow(subrowData);
          row && row.hide && row.hide();
        });
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
    }
    _config() {
      const { data = [], rowDefaults, keyField } = this.table.props;
      const rows = [];
      this._getRows(data, rows, 0, 0);
      let props = {
        children: rows,
        childDefaults: Component.extendProps(
          {
            component: Tr,
            key: function () {
              return this.props.data[keyField];
            },
          },
          rowDefaults
        ),
      };
      if (!rows.length) {
        props = {
          component: Tr,
          children: {
            tag: "Td",
            attrs: {
              colspan: this.table.colLength,
              style: { padding: "25px 0" },
            },
            children: { component: "Empty" },
          },
        };
      }
      this.setProps(props);
    }
    _getRows(data, rows, index, level) {
      const curLevel = level;
      for (const item of data) {
        rows.push({
          component: Tr,
          data: item,
          index: index++,
          level: curLevel,
          isLeaf: !(item.children && item.children.length > 0),
        });
        if (item.children && item.children.length > 0) {
          this._getRows(item.children, rows, index, curLevel + 1);
        }
      }
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
    }
    _config() {
      const that = this;
      let sortIcon = "sort";
      if (this.props.column.sortDirection === "asc") {
        sortIcon = "sort-up";
      }
      if (this.props.column.sortDirection === "desc") {
        sortIcon = "sort-down";
      }
      const headerProps = {
        tag: "span",
        children: this.props.column.header || this.props.column.title,
      };
      if (that.props.column.sortable && that.props.column.colSpan > 0) {
        headerProps.onClick = function () {
          that.onSortChange();
        };
      }
      const children = [
        headerProps,
        this.props.column.sortable &&
          this.props.column.colSpan > 0 && {
            component: "Icon",
            type: sortIcon,
            onClick: function () {
              that.onSortChange();
            },
          },
        that.table.hasGrid &&
          that.table.grid.props.allowFrozenCols && {
            component: "Icon",
            type: "pin",
            onClick: function () {
              // that.table.grid.handlePinClick(that.props.column)
            },
          },
        that.table.hasGrid &&
          that.table.grid.props.columnResizable &&
          this.props.column.resizable !== false &&
          this.props.column.colSpan === 1 && {
            component: "Icon",
            ref: (c) => {
              that.resizer = c;
            },
            type: "resize-handler",
            classes: { "nom-table-resize-handler": true },
            onClick: function () {
              // that.table.grid.handlePinClick(that.props.column)
            },
          },
      ];
      const isEllipsis =
        (this.table.props.ellipsis === "both" ||
          this.table.props.ellipsis === "header") &&
        this.props.column.ellipsis !== false;
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
          "nom-table-ellipsis": isEllipsis,
        },
        attrs: {
          colspan: this.props.column.colSpan,
          rowspan: this.props.column.rowSpan,
        },
      });
    }
    _rendered() {
      if (this.props.column.fixed === "left") {
        this._setStyle({ left: `${this.element.offsetLeft}px` });
      } else if (this.props.column.fixed === "right") {
        this._setStyle({
          right: `${
            this.parent.element.offsetWidth -
            this.element.offsetLeft -
            this.element.offsetWidth
          }px`,
        });
      }
      this.resizer && this.handleResize();
    }
    handleResize() {
      const resizer = this.resizer.element;
      const that = this;
      resizer.onmousedown = function (evt) {
        const startX = evt.clientX;
        that.lastDistance = 0;
        document.onmousemove = function (e) {
          const endX = e.clientX;
          const moveLen = endX - startX;
          const distance = moveLen - that.lastDistance;
          that.table.grid.resizeCol({
            field: that.props.column.field,
            distance: distance,
          });
          that.lastDistance = moveLen;
        };
      };
      document.onmouseup = function () {
        document.onmousemove = null;
      };
    }
    onSortChange() {
      const that = this;
      if (that.props.column.sortDirection === "asc") {
        that.update({
          column: Object.assign({}, that.props.column, {
            sortDirection: "desc",
          }),
        });
      } else if (that.props.column.sortDirection === "desc") {
        that.update({
          column: Object.assign({}, that.props.column, { sortDirection: null }),
        });
      } else {
        that.update({
          column: Object.assign({}, that.props.column, {
            sortDirection: "asc",
          }),
        });
      }
      that.table.grid.handleSort(that.props.column);
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
      const children = [];
      for (let i = 0; i < arr.length; i++) {
        children.push({ component: TheadTr, columns: arr[i] });
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
      const defaults = {
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
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.colRefs = [];
      this.hasGrid =
        this.parent.componentType === "GridHeader" ||
        this.parent.componentType === "GridBody";
      if (this.hasGrid) {
        this.grid = this.parent.parent;
        this.parent.table = this;
      }
      this.hasRowGroup = false;
    }
    _config() {
      this._propStyleClasses = ["line", "bordered"];
      const isStriped =
        (this.hasGrid && this.grid.props.striped === true) ||
        this.props.striped === true ||
        false;
      if (this.hasGrid) {
        this.props.ellipsis = this.grid.props.ellipsis;
      }
      this.setProps({
        tag: "table",
        classes: { "nom-table-striped": isStriped },
        children: [
          { component: ColGroup },
          this.props.onlyBody !== true && { component: Thead },
          this.props.onlyHead !== true && { component: Tbody },
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
  }
  Component.register(Table);
  class GridBody extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Table } };
      super(Component.extendProps(defaults, props), ...mixins);
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
        },
        attrs: {
          onscroll: () => {
            const { scrollLeft } = this.element;
            this.grid.header.element.scrollLeft = scrollLeft;
          },
        },
      });
    }
    resizeCol(data) {
      const col = this.table.colRefs[data.field];
      const tdWidth = this.table.element.rows[0].cells[col.props.index]
        .offsetWidth;
      const colWidth = col.props.column.width || tdWidth;
      let result = colWidth + data.distance;
      if (result < 60) {
        result = 60;
      }
      col.update({ column: { width: result } });
    }
  }
  Component.register(GridBody);
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
            this.props.target.body.element.scrollLeft = scrollLeft;
          },
        },
        children: {
          classes: { "nom-scrollbar-inner": true },
          attrs: { style: { width: size.innerWidth } },
        },
      });
    }
    show() {
      this.props.hidden && this.update({ hidden: false });
    }
    hide() {
      !this.props.hidden && this.update({ hidden: true });
    }
  }
  Component.register(Scrollbar);
  class GridHeader extends Component {
    constructor(props, ...mixins) {
      const defaults = { children: { component: Table } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.grid = this.parent;
      this.grid.header = this;
    }
    _config() {
      this.setProps({
        children: {
          columns: this.grid.props.columns,
          data: this.grid.data,
          attrs: { style: { minWidth: `${this.grid.minWidth}px` } },
          onlyHead: true,
          line: this.props.line,
        },
      });
    }
    _rendered() {
      const that = this;
      if (!this.grid.props.sticky) {
        return;
      }
      if (!this.scrollbar) {
        this.scrollbar = new Scrollbar({ target: this.grid });
      }
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
      }
    }
    _onPageScroll() {
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
      if (gRect.top < pRect.top && gRect.top + gRect.height > pRect.top) {
        this.element.style.transform = `translateY(${
          pRect.top - gRect.top - 2
        }px)`;
      }
      if (gRect.height > pRect.height) {
        if (
          gRect.top > pRect.height ||
          gRect.top + gRect.height - 17 < pRect.height + pRect.top
        ) {
          this.scrollbar.hide();
        } else {
          this.scrollbar.show();
        }
      } else {
        this.scrollbar.hide();
      }
    }
    resizeCol(data) {
      const col = this.table.colRefs[data.field];
      const tdWidth = this.table.element.rows[0].cells[col.props.index]
        .offsetWidth;
      const colWidth = col.props.column.width || tdWidth;
      let result = colWidth + data.distance;
      if (result < 60) {
        result = 60;
      }
      col.update({ column: { width: result } });
    }
  }
  Component.register(GridHeader);
  class GridSettingPopup extends Layer {
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
        styles: { shadow: "sm", rounded: "md" },
        children: {
          component: "Panel",
          uistyle: "card",
          fit: true,
          header: { caption: { title: "列设置" } },
          body: {
            children: {
              component: "Tree",
              showline: true,
              data: that.grid.originColumns,
              nodeCheckable: {
                checkedNodeKeys: that.grid.props.visibleColumns
                  ? that.getMappedColumns(that.grid.props.visibleColumns)
                  : that.grid.getMappedColumns(),
              },
              multiple: true,
              leafOnly: false,
              sortable: true,
              ref: (c) => {
                this.tree = c;
              },
              dataFields: { text: "title", key: "field" },
            },
          },
          footer: {
            children: {
              component: "Cols",
              gutter: "sm",
              items: [
                {
                  component: "Button",
                  text: "确定",
                  onClick: function () {
                    const list = that.tree.getCheckedNodesData();
                    that.grid.handleColumnsSetting(list);
                  },
                },
                {
                  component: "Button",
                  text: "取消",
                  onClick: () => {
                    this.hide();
                  },
                },
              ],
            },
          },
        },
      });
      super._config();
    }
    _rendered() {
      const wh = window.innerHeight;
      const mh = this.element.offsetHeight;
      if (mh + 50 > wh) {
        this.element.style.height = `${wh - 100}px`;
      }
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
  }
  Component.register(GridSettingPopup);
  class Grid extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Grid.defaults, props), ...mixins);
    }
    _created() {
      this.minWidth = 0;
      this.lastSortField = null;
      this.rowsRefs = {};
      this.checkedRowRefs = {};
      this.originColumns = this.props.columns;
      if (
        this.props.columnsCustomizable &&
        this.props.columnsCustomizable.selected
      ) {
        this.props.visibleColumns = this.props.columnsCustomizable.selected;
      }
    }
    _config() {
      const that = this;
      this._propStyleClasses = ["bordered"];
      const { line, rowDefaults, frozenLeftCols, frozenRightCols } = this.props;
      this._processCheckableColumn();
      this._processExpandableColumn();
      if (this.props.visibleColumns) {
        this.props.columns = this.props.visibleColumns;
      }
      if (frozenLeftCols || frozenRightCols) {
        const rev = this.props.columns.length - frozenRightCols;
        const c = this.props.columns.map(function (n, i) {
          if (i + 1 < frozenLeftCols) {
            return Object.assign({}, { fixed: "left" }, n);
          }
          if (i + 1 === frozenLeftCols) {
            return Object.assign({}, { fixed: "left", lastLeft: true }, n);
          }
          if (i === rev) {
            return Object.assign({}, { fixed: "right", firstRight: true }, n);
          }
          if (i > rev) {
            return Object.assign({}, { fixed: "right" }, n);
          }
          return n;
        });
        this.props.columns = c;
      }
      this._calcMinWidth();
      this.setProps({
        classes: { "m-frozen-header": this.props.frozenHeader },
        children: [
          this.props.columnsCustomizable && {
            children: {
              component: "Button",
              icon: "setting",
              size: "small",
              type: "text",
              classes: { "nom-grid-setting": true },
              tooltip: "列设置",
              onClick: () => {
                that.showSetting();
              },
            },
          },
          { component: GridHeader, line: line },
          { component: GridBody, line: line, rowDefaults: rowDefaults },
        ],
      });
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
      if (
        this.props.autoMergeColumns &&
        this.props.autoMergeColumns.length > 0
      ) {
        this.autoMergeCols();
      }
    }
    getColumns() {
      return this.props.columns;
    }
    loading() {
      this.loadingInst = new Loading({ container: this.parent });
    }
    getMappedColumns() {
      const arr = [];
      function mapColumns(data) {
        data.forEach(function (item) {
          if (item.children) {
            mapColumns(item.children);
          }
          arr.push(item.field);
        });
      }
      mapColumns(this.originColumns);
      return arr;
    }
    setSortDirection(sorter) {
      const c = this.getColumns().map(function (item) {
        if (item.field === sorter.field) {
          return Object.assign({}, item, {
            sortDirection: sorter.sortDirection,
          });
        }
        return Object.assign({}, item, { sortDirection: null });
      });
      this.update({ columns: c });
    }
    handleSort(sorter) {
      const key = sorter.field;
      if (!sorter.sortDirection) return;
      if (isFunction(sorter.sortable)) {
        let arr = [];
        if (this.lastSortField === key) {
          arr = this.props.data.reverse();
        } else {
          arr = this.props.data.sort(sorter.sortable);
        }
        this.setSortDirection(sorter);
        this.update({ data: arr });
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
      return Object.keys(this.checkedRowRefs).map((key) => {
        return this.checkedRowRefs[key];
      });
    }
    getCheckedRowKeys() {
      return Object.keys(this.checkedRowRefs).map((key) => {
        return this.checkedRowRefs[key].key;
      });
    }
    checkAllRows(options) {
      Object.keys(this.rowsRefs).forEach((key) => {
        this.rowsRefs[key] && this.rowsRefs[key].check(options);
      });
    }
    uncheckAllRows(options) {
      Object.keys(this.rowsRefs).forEach((key) => {
        this.rowsRefs[key] && this.rowsRefs[key].uncheck(options);
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
        const allRowsLength = Object.keys(this.rowsRefs).length;
        if (allRowsLength === checkedRowsLength) {
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
      this.popup = new GridSettingPopup({
        align: "center",
        alignTo: window,
        grid: this,
      });
    }
    handleColumnsSetting(params) {
      const tree = params;
      const that = this;
      that.props.visibleColumns = params;
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
      this.props.columnsCustomizable.callback &&
        this._callHandler(this.props.columnsCustomizable.callback(tree));
      this.update({ columns: tree });
      this.popup.hide();
    }
    _processCheckableColumn() {
      const grid = this;
      const { rowCheckable, columns } = this.props;
      if (rowCheckable) {
        if (columns.filter((item) => item.isChecker).length > 0) {
          return;
        }
        let normalizedRowCheckable = rowCheckable;
        if (!isPlainObject(rowCheckable)) {
          normalizedRowCheckable = {};
        }
        const { checkedRowKeys = [] } = normalizedRowCheckable;
        const checkedRowKeysHash = {};
        checkedRowKeys.forEach((rowKey) => {
          checkedRowKeysHash[rowKey] = true;
        });
        columns.unshift({
          width: 50,
          isChecker: true,
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
          cellRender: ({ row, rowData }) => {
            if (checkedRowKeysHash[row.key] === true) {
              grid.checkedRowRefs[grid.getKeyValue(rowData)] = row;
            }
            return {
              component: Checkbox,
              plain: true,
              _created: (inst) => {
                row._checkboxRef = inst;
              },
              value: checkedRowKeysHash[row.key] === true,
              onValueChange: (args) => {
                if (args.newValue === true) {
                  row._check();
                  row._onCheck();
                  grid._onRowCheck(row);
                } else {
                  row._uncheck();
                  row._onUncheck();
                  grid._onRowUncheck(row);
                }
                grid.changeCheckAllState();
              },
            };
          },
        });
        this.setProps({ columns: columns });
      }
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
    resizeCol(data) {
      this.header && this.header.resizeCol(data);
      this.body && this.body.resizeCol(data);
    }
    _processExpandableColumn() {
      const { rowExpandable, columns } = this.props;
      if (rowExpandable) {
        if (columns.filter((item) => item.isTreeMark).length > 0) {
          return;
        }
        columns.unshift({
          width: 50,
          isTreeMark: true,
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
        });
        this.setProps({ columns: columns });
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
    } // handlePinClick(data) {
    //   const { columns } = this.props
    //   const arr = columns.filter(function (item) {
    //     return item.field === data.field
    //   })
    // }
  }
  Grid.defaults = {
    columns: [],
    data: [],
    frozenHeader: false,
    frozenLeftCols: null,
    frozenRightCols: null,
    allowFrozenCols: false,
    onSort: null,
    keyField: "id",
    treeConfig: {
      childrenField: "children",
      treeNodeColumn: null,
      initExpandLevel: -1,
      indentSize: 16,
    },
    columnsCustomizable: false,
    autoMergeColumns: null,
    visibleColumns: null,
    columnResizable: false,
    striped: false,
    showTitle: false,
    ellipsis: false,
    sticky: false,
  };
  Component.register(Grid);
  class GroupList extends Group {
    constructor(props, ...mixins) {
      const defaults = { fieldDefaults: { component: Group } };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { groupDefaults, value, addDefaultValue } = this.props;
      const extGroupDefaults = Component.extendProps(groupDefaults, {
        _config: function () {
          const group = this;
          this.setProps({
            action: [
              {
                component: "Button",
                text: "移除",
                onClick: () => {
                  group.remove();
                  that._onValueChange();
                },
              },
            ],
          });
        },
      });
      const groups = [];
      if (Array.isArray(value)) {
        value.forEach(function (item) {
          groups.push(Component.extendProps(extGroupDefaults, { value: item }));
        });
      }
      this.setProps({
        fields: groups,
        fieldDefaults: extGroupDefaults,
        controlAction: [
          {
            component: "Button",
            type: "dashed",
            text: "添加",
            span: 12,
            block: true,
            onClick: () => {
              extGroupDefaults.value = isFunction(addDefaultValue)
                ? addDefaultValue.call(this)
                : addDefaultValue;
              that.appendField(extGroupDefaults);
              that._onValueChange();
            },
          },
        ],
      });
      super._config();
    }
    getValue() {
      const value = [];
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i];
        if (field.getValue) {
          const fieldValue = field.getValue();
          value.push(fieldValue);
        }
      }
      return value;
    }
    setValue(value) {
      if (Array.isArray(value)) {
        for (let i = 0; i < this.fields.length; i++) {
          const field = this.fields[i];
          if (field.setValue) {
            field.setValue(value[i]);
          }
        }
      }
    }
  }
  Component.register(GroupList);
  class MaskInfo extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "span",
        type: null,
        text: null,
        mask: true,
        icon: true,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
          Component.normalizeIconProps({
            type: "eye",
            onClick: function () {
              that.handleClick();
            },
          }),
        textNode,
      ];
      this.setProps({ children: children });
    }
    _rendered() {
      if (this.props.mask && !this.props.icon) {
        this.tooltip = new nomui.Tooltip({
          trigger: this,
          children: "点击显示完整信息",
        });
      }
    }
    handleClick() {
      this.props.mask = false;
      this.update(this.props.mask);
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
      else if (type === "mail") {
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
  Component.register(MaskInfo);
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
      let indicatorIconType = "down";
      if (menuProps.direction === "horizontal" && this.level > 0) {
        indicatorIconType = "right";
      }
      if (menuProps.direction === "horizontal") {
        this.setProps({ indicator: { expandable: false } });
      }
      this.setProps({
        indicator: {
          type: indicatorIconType,
          classes: { "nom-menu-toggler": true },
          _created() {
            this.parent.indicator = this;
          },
        },
        selectable: { byClick: menuProps.itemSelectable.byClick },
        expandable: {
          byClick: !this.isLeaf,
          target: function () {
            return this.wrapper.submenu;
          },
        },
        attrs: {
          href: this.getItemUrl(this.props.url),
          style: {
            paddingLeft:
              menuProps.direction === "vertical"
                ? `${(this.level + 1) * menuProps.indent}rem`
                : null,
          },
        },
        onSelect: () => {
          if (menu.selectedItem !== null) menu.selectedItem.unselect();
          menu.selectedItem = this;
          this._callHandler(onSelect);
        },
        onUnselect: () => {
          if (menu.selectedItem === this) menu.selectedItem = null;
          this._callHandler(onUnselect);
        },
      });
      this.setProps({
        children: [
          this.props.icon && {
            component: "Icon",
            type: this.props.icon,
            classes: { "nom-menu-item-icon": true },
          },
          {
            component: Component,
            tag: "span",
            classes: { text: true },
            children: this.props.text,
          },
          this.props.subtext && {
            component: Component,
            tag: "span",
            classes: { subtext: true },
            children: this.props.subtext,
          },
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
    }
    _config() {
      const that = this;
      const children =
        Array.isArray(this.props.items) &&
        this.props.items.map(function (item) {
          return {
            component: "MenuItemWrapper",
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
      } else if (this.parent instanceof Component.components.MenuSub) {
        this.menu = this.parent.menu;
        this.parentWrapper = this.parent.wrapper;
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
        menuProps.itemExpandable.initExpandLevel >= this.level;
      this.setProps({ submenu: menuProps.submenu });
      this.setProps({
        submenu: {
          component: MenuSub,
          name: "submenu",
          items: this.props.item.items,
          hidden: !expanded,
        },
      });
      if (menuProps.direction === "horizontal" && !this.isLeaf) {
        let reference = document.body;
        if (this.level > 0) {
          reference = this;
        }
        let align = "bottom left";
        if (this.level > 0) {
          align = "right top";
        }
        this.setProps({ submenu: { wrapper: that } });
        this.setProps({
          item: {
            popup: {
              triggerAction: "hover",
              align: align,
              reference: reference,
              children: this.props.submenu,
            },
          },
        });
      }
      this.setProps({
        children: [
          this.props.item,
          !this.isLeaf &&
            menuProps.direction === "vertical" &&
            this.props.submenu,
        ],
      });
    }
  }
  Component.register(MenuItemWrapper);
  class Menu extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "ul",
        items: [],
        itemDefaults: { component: MenuItem },
        itemSelectable: { onlyleaf: false, byClick: false },
        itemExpandable: { expandSingle: true, initExpandLevel: -1 },
        indent: 1.5,
        direction: "vertical",
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.itemRefs = [];
      this.selectedItem = null;
    }
    _config() {
      this._addPropStyle("direction");
      const that = this;
      const children = this.props.items.map(function (item) {
        return {
          component: MenuItemWrapper,
          item: Component.extendProps({}, that.props.itemDefaults, item),
        };
      });
      this.setProps({ children: children });
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
      this.scrollTo(item);
      return item;
    }
    selectToItem(param) {
      this.expandToItem(param);
      this.selectItem(param);
      this.scrollTo(param);
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
  Component.register(Menu);
  class Message extends Layer {
    constructor(props, ...mixins) {
      const defaults = {
        type: null,
        icon: null,
        content: null,
        duration: 2,
        closeToRemove: true,
        position: { my: "center center", at: "center center", of: window },
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      this.setProps({ content: { classes: { "nom-message-content": true } } });
      this.setProps({ children: [iconProps, this.props.content] });
      super._config();
    }
    close() {
      this.remove();
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
            this.multilineTextbox.trigger("blur");
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
      const defaults = {
        autofocus: false,
        autoSize: false, // boolean|{minRows:number,maxRows:number}
        placeholder: null,
        value: null,
        maxLength: null,
        rows: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const {
        autoSize,
        value,
        placeholder,
        autofocus,
        rows,
        maxLength,
      } = this.props;
      this.setProps({
        control: {
          children: {
            component: Textarea,
            autoSize,
            attrs: { value, placeholder, autofocus, rows, maxLength },
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
  Component.register(MultilineTextbox);
  class NavbarCaption extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaption);
  class NavbarCaptionBefore extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaptionBefore);
  class NavbarCaptionAfter extends Component {
    // constructor(props, ...mixins) {
    //   super(props, ...mixins)
    // }
  }
  Component.register(NavbarCaptionAfter);
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
      const defaults = { caption: null, nav: null, tools: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
      const defaults = Object.assign(
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
      super(Component.extendProps(defaults, props), ...mixins);
    }
    static open(config) {
      const curInsance = Notification.NOMUI_NOTIFICATION_INSTANCES[config.key];
      if (!curInsance) {
        return new nomui.Notification(config);
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
    _getMarginStyle() {
      const { top, right, bottom, left } = this.props;
      const aligns = this.props.align.split(" ");
      const style = { transform: "" };
      aligns.forEach((align) => {
        switch (align) {
          case "top":
            style.transform += `translateY(${top}px) `;
            break;
          case "right":
            style.transform += `translateX(-${right}px) `;
            break;
          case "bottom":
            style.transform += `translateY(-${bottom}px) `;
            break;
          case "left":
            style.transform += `translateX(${left}px) `;
            break;
        }
      });
      style.transform = style.transform.trim();
      return style;
    }
    close() {
      this.timer && clearTimeout(this.timer);
      const { key } = this.props;
      delete Notification.NOMUI_NOTIFICATION_INSTANCES[key];
      this.props.onClose && this.props.onClose();
      this.remove();
    }
    _config() {
      const that = this;
      this._propStyleClasses = ["type"];
      const {
        align,
        alignTo,
        styles,
        attrs = {},
        icon,
        type,
        closeIcon,
        title,
        btn,
        description,
      } = this.props;
      const style = this._getMarginStyle();
      this.setProps({
        // fixed: true,
        closeToRemove: true,
        alignOuter: true,
        align,
        alignTo,
        styles,
        attrs: Object.assign({}, attrs, {
          style: Object.assign({}, style, attrs.style),
        }),
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
  }
  _defineProperty2(Notification, "NOMUI_NOTIFICATION_DEFAULTS", {
    align: "right top",
    duration: 4500,
    bottom: 24,
    top: 24,
    left: 24,
    right: 24,
  });
  _defineProperty2(Notification, "NOMUI_NOTIFICATION_INSTANCES", {});
  Component.register(Notification);
  class Numberbox extends Textbox {
    constructor(props, ...mixins) {
      const defaults = { min: null, max: null, precision: -1 };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { precision = -1 } = this.props;
      const rules = [];
      if (precision === -1) {
        rules.push({ type: "number" });
      }
      if (this.props.precision === 0) {
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
      this.setProps({ rules: rules });
      super._config();
    }
    _getValue() {
      const { precision = -1 } = this.props;
      let numberValue = null;
      const textValue = this.input.getText();
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
      if (notRound === undefined) {
        notRound = false;
      }
      let f = parseFloat(val);
      if (Number.isNaN(f)) {
        return;
      }
      if (notRound === true) {
        f = Math.floor(val * 10 ** precision) / 10 ** precision;
      } else {
        f = Math.round(val * 10 ** precision) / 10 ** precision;
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
      const defaults = {
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
      super(Component.extendProps(defaults, props), ...mixins);
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
          value: numberSpinner._format(value),
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
              numberSpinner.setValue(formatterStr);
            },
          },
        }
      );
      const spinner = numberSpinner._handleSpinnerIcon();
      this.setProps({ control: { children: [inputProps, ...spinner] } });
      super._config();
    }
    _getValue() {
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
    _setValue(value) {
      const { max, min } = this._getLimit();
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
      const formatValue = this._format(value);
      this.input && this.input.setText(formatValue);
    }
    getText() {
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
            tag: "span",
            _created(c) {
              numberSpinner.iconContainer = c;
            },
            classes: { [`nom-textbox-${align}-icon-container`]: true },
            children: [
              {
                component: "Icon",
                type: "up",
                onClick(args) {
                  numberSpinner._handlePlus(args);
                },
              },
              {
                component: "Icon",
                type: "down",
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
      let value = this._getValue();
      if (isNil(value)) return;
      value = Number(value);
      if (!this._formatter) this._initNumberFormat();
      const displayValue = this._format(value + step);
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
      let value = this._getValue();
      if (isNil(value)) return;
      value = Number(value);
      if (!this._formatter) this._initNumberFormat(); // currency 格式化之后不是数字了
      const displayValue = this._format(value - step);
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
  Component.register(NumberSpinner);
  class Pager extends Component {
    constructor(props, ...mixins) {
      super(Component.extendProps(Pager.defaults, props), ...mixins);
    }
    _config() {
      const pager = this;
      this.setProps({
        children: {
          component: "Cols",
          justify: "between",
          items: [
            {
              component: List,
              gutter: "md",
              items: pager.getPageItems(),
              itemDefaults: {
                tag: "a",
                key() {
                  return this.props.pageNumber;
                },
                _config: function () {
                  this.setProps({ children: `${this.props.text}` });
                },
              },
              itemSelectable: { byClick: true, scrollIntoView: false },
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
            },
            {
              component: "Cols",
              gutter: "xs",
              items: [
                { children: `共有数据${this.props.totalCount}条` },
                {
                  component: "Select",
                  value: pager.props.pageSize || 10,
                  onValueChange: (data) => {
                    pager.props.pageSize = data.newValue;
                    pager._onPageChange();
                  },
                  options: [
                    { text: "10条/页", value: 10 },
                    { text: "20条/页", value: 20 },
                    { text: "30条/页", value: 30 },
                    { text: "40条/页", value: 40 },
                    { text: "50条/页", value: 50 },
                  ],
                },
              ],
            },
          ],
        },
      });
    }
    _onPageChange() {
      this._callHandler(this.props.onPageChange, this.getPageParams());
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
      const interval = this._getInterval();
      const pageCount = this._getPageCount(); // 产生"Previous"-链接
      if (props.texts.prev && (pageIndex > 1 || props.prevShowAlways)) {
        items.push({
          pageNumber: pageIndex - 1,
          text: props.texts.prev,
          classes: { prev: true },
        });
      } // 产生起始点
      if (interval[0] > 1 && props.edgeItemCount > 0) {
        const end = Math.min(props.edgeItemCount, interval[0] - 1);
        for (let i = 1; i <= end; i++) {
          items.push({ pageNumber: i, text: i, classes: "" });
        }
        if (props.edgeItemCount < interval[0] - 1 && props.texts.ellipse) {
          items.push({
            pageNumber: null,
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
            pageNumber: null,
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
      } // 产生 "Next"-链接
      if (props.texts.next && (pageIndex < pageCount || props.nextShowAlways)) {
        items.push({
          pageNumber: pageIndex + 1,
          text: props.texts.next,
          classes: { next: true },
        });
      }
      return items;
    }
  }
  Pager.defaults = {
    pageIndex: 1,
    pageSize: 10,
    totalCount: 0,
    displayItemCount: 5,
    edgeItemCount: 1,
    prevShowAlways: true,
    nextShowAlways: true,
    texts: { prev: "上一页", next: "下一页", ellipse: "..." },
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
      const defaults = {
        yearRange: [50, 20],
        mode: "year",
        allowClear: true,
        onChange: null,
        placeholder: "选择年份",
        value: null,
        minDate: null,
        maxDate: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      const { disabled, placeholder } = this.props;
      const that = this;
      this.setProps({
        leftIcon: "calendar",
        rightIcon: {
          component: "Icon",
          type: "times",
          hidden: !this.props.allowClear,
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
            classes: { "nom-partial-date-picker-popup": true },
            styles: { padding: "1" },
            attrs: { style: { width: "auto", height: "240px" } },
            triggerAction: "click",
            onShow: () => {
              if (!that.getValue()) {
                that.yearPicker.scrollTo(new Date().format("yyyy"));
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
              component: "Cols",
              gutter: null,
              fills: true,
              align: "stretch",
              children: [
                {
                  children: {
                    component: "List",
                    items: that._getYear(),
                    itemSelectable: { multiple: false, byClick: true },
                    gutter: "sm",
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
                    itemSelectable: { multiple: false, byClick: true },
                    gutter: "sm",
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
                    itemSelectable: { multiple: false, byClick: true },
                    gutter: "sm",
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
                  hidden: !this.year,
                  children: {
                    component: "List",
                    items: that._getWeek("2010"),
                    itemSelectable: { multiple: false, byClick: true },
                    gutter: "sm",
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
      } // 计算一年中的每一周都是从几号到几号
      // 第一周为1月1日到 本年的 第一个周日
      // 第二周为 本年的 第一个周一 往后推到周日
      // 以此类推 再往后推52周。。。
      // 如果最后一周在12月31日之前，则本年有垮了54周，反之53周
      // 12月31 日不论是周几，都算为本周的最后一天
      // 参数年份 ，函数返回一个数组，数组里的对象包含 这一周的开始日期和结束日期
      function whichWeek(year) {
        const d = new Date(parseInt(year, 10), 0, 1);
        while (d.getDay() !== 1) {
          d.setDate(d.getDate() + 1);
        }
        const arr = [];
        const longnum = d.setDate(d.getDate());
        if (longnum > +new Date(parseInt(year, 10), 0, 1)) {
          const obj = yearDay(+new Date(year, 0, 1) / 1000);
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
        if (lastStr < +new Date(parseInt(year, 10) + 1, 0, 1)) {
          const obj = yearDay(lastStr / 1000 + 86400);
          obj.last = yearDay(
            +new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400
          );
          arr.push(obj);
        } else {
          arr[arr.length - 1].last = yearDay(
            +new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400
          );
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
    clearTime() {
      this.year = null;
      this.quarter = null;
      this.month = null;
      this.week = null;
      this.setValue(null);
    }
    handleYearChange(key) {
      this.year = key;
      let noUpdate = false;
      if (this.hasRange) {
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
        this.setValue(null);
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
      switch (this.props.mode) {
        case "year":
          this.year && this.setValue(this.year);
          break;
        case "quarter":
          this.year &&
            this.quarter &&
            this.setValue(`${this.year} ${this.quarter}季度`);
          break;
        case "month":
          this.year &&
            this.month &&
            this.setValue(
              new Date(`${this.year}-${this.month}`).format("yyyy-MM")
            );
          break;
        case "week":
          this.year &&
            this.week &&
            this.setValue(`${this.year} ${this.week}周`);
          break;
      }
    }
    resolveValue() {
      const v = this.getValue();
      const year = this.props.mode === "year" ? v : v.substring(0, 4);
      const after =
        this.props.mode === "year"
          ? null
          : Math.abs(parseInt(v.substring(4), 10));
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
  Component.register(PartialDatePicker);
  class PartialDateRangePicker extends Group {
    constructor(props, ...mixins) {
      const defaults = {
        mode: "year",
        minDate: null,
        maxDate: null,
        yearRange: [50, 20],
        allowClear: true,
        onChange: null,
        fieldName: { start: "start", end: "end" },
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
    }
    _config() {
      const that = this;
      const { allowClear, minDate, maxDate, yearRange, mode } = this.props;
      this.setProps({
        inline: true,
        fields: [
          {
            component: "PartialDatePicker",
            name: that.props.fieldName.start,
            placeholder: "开始日期",
            ref: (c) => {
              that.startPicker = c;
            },
            onChange: function (args) {
              that.checkRange(args.sender.name);
            },
            allowClear,
            minDate,
            maxDate,
            yearRange,
            mode,
          },
          { component: "StaticText", value: "-" },
          {
            component: "PartialDatePicker",
            name: that.props.fieldName.end,
            placeholder: "结束日期",
            ref: (c) => {
              that.endPicker = c;
            },
            onChange: function (args) {
              that.checkRange(args.sender.name);
            },
            allowClear,
            minDate,
            maxDate,
            yearRange,
            mode,
          },
        ],
      });
      super._config();
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
          opposite.update({ minDate: active.getValue() });
          if (opposite.getValue() && opposite.getValue() < active.getValue()) {
            opposite.clearTime();
            opposite.focus();
            opposite.showPopup();
          } else if (!opposite.getValue()) {
            opposite.focus();
            opposite.showPopup();
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
  Component.register(PartialDateRangePicker);
  class Password extends Textbox {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.realValue = "";
    }
    _config() {
      const that = this;
      const { onValueChange } = this.props;
      this.setProps({
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
              const middle = fake.join("").replace(/\*/g, "").split("");
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
          that.setValue(pass ? pass.replace(/./g, "*") : null); // 让光标回到正确位置
          if (pass && start < pass.length) {
            that.input.element.selectionStart = start;
            that.input.element.selectionEnd = start;
          }
          that._callHandler(onValueChange);
        },
      });
      super._config();
    }
    _getValue() {
      if (!this.realValue || this.realValue === "") {
        return null;
      }
      return this.realValue;
    }
  }
  Component.register(Password);
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
      const defaults = {
        width: 120, // strokeWidth:6
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  class ProgressLine extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        // steps:100,
        // strokeColor:'',
        strokeWidth: 10,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  class ProgressSteps extends Component {
    constructor(props, ...mixins) {
      const defaults = { strokeWidth: 8, percent: 0 };
      super(Component.extendProps(defaults, props), ...mixins);
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
  class Progress extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        type: "line", // 'line', 'circle', 'dashboard' // 类型，可选 line circle dashboard
        percent: 0, // 百分比
        // format?:undefined, // (percentNumber,successPercent) => `${percentNumber}%` 内容的模板函数
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
      super(Component.extendProps(defaults, props), ...mixins);
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
      const { showInfo, format, type, percent } = this.props;
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
        attrs: { title: typeof text === "string" ? text : undefined },
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
  Component.register(Progress);
  class OptionList extends List {
    constructor(props, ...mixins) {
      const defaults = {
        itemDefaults: {
          tag: "label",
          _config: function () {
            this.setProps({
              children: [
                { tag: "span", classes: { radio: true } },
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
        disabled: listProps.disabled,
        items: listProps.options,
        itemDefaults: listProps.optionDefaults,
        itemSelectable: { byClick: true, scrollIntoView: false },
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
      const defaults = { options: [], uistyle: "radio" };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this.setProps({
        optionDefaults: {
          key() {
            return this.props.value;
          },
        },
      });
      this.setProps({ optionList: { component: OptionList } });
      this.setProps({ control: this.props.optionList });
      super._config();
    }
    getSelectedOption() {
      return this.optionList.getSelectedItem();
    }
    _getValueText(options, value) {
      const { valueOptions } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      const selected =
        value !== undefined
          ? this._getOptionByValue(value)
          : this.getSelectedOption();
      if (selected !== null) {
        if (options.asArray === true) {
          return selected.props ? [selected.props.text] : [selected.text];
        }
        return selected.props ? selected.props.text : selected.text;
      }
      return null;
    }
    _getValue(options) {
      const { valueOptions } = this.props;
      options = extend$1({ asArray: false }, valueOptions, options);
      const selected = this.getSelectedOption();
      if (selected !== null) {
        if (options.asArray === true) {
          return [selected.props.value];
        }
        return selected.props.value;
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
        this.optionList.unselectAllItems({
          triggerSelectionChange: options.triggerChange,
        });
      } else {
        if (Array.isArray(value)) {
          value = value[0];
        }
        this.optionList.selectItem(function () {
          return this.props.value === value;
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
      let option = null;
      const { options } = this.props;
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
  }
  Component.register(RadioList);
  class SlideCaptcha extends Component {
    constructor(props, ...mixins) {
      const defaults = {
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
      super(
        Component.extendProps(defaults, props, {
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
  Component.register(SlideCaptcha);
  class StaticText extends Field {
    constructor(props, ...mixins) {
      const defaults = { value: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(StaticText);
  const STATUS = {
    WAIT: "wait",
    PROCESS: "process",
    FINISH: "finish",
    ERROR: "error",
  };
  class Step extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        disabled: false,
        current: 0, // wait process finish error
        status: "wait",
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      } = this.props;
      const icon = this._handleIcon();
      this.setProps({
        classes: { [`nom-step-item-${status}`]: true },
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
                "nom-step-item-icon-customer": !!i,
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
  class Steps extends Component {
    constructor(props, ...mixins) {
      // active current
      const defaults = {
        direction: "horizontal",
        current: 0,
        options: [],
        onChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(Steps);
  class Switch extends Field {
    constructor(props, ...mixins) {
      const defaults = {
        unselectedText: "关",
        selectedText: "开",
        value: false,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const that = this;
      const { value, unselectedText, selectedText } = this.props;
      this._propStyleClasses = ["size"];
      this.setProps({
        control: {
          tag: "button",
          classes: { "nom-switch-control": true, "nom-switch-active": !!value },
          attrs: {
            onclick: () => {
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
              },
            },
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
      const defaults = { panels: [], panelDefaults: { component: TabPanel } };
      super(Component.extendProps(defaults, props), ...mixins);
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
        const tabContent = this.list.getTabContent();
        tabContent.showPanel(this.key);
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
      const defaults = {
        itemDefaults: { component: TabItem },
        tabContent: null,
        uistyle: "plain",
        itemSelectable: { byClick: true },
        onTabSelectionChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      if (this.parent.componentType && this.parent.componentType === "Tabs") {
        this._callHandler(this.parent.props.onTabSelectionChange);
      } else {
        this._callHandler(this.props.onTabSelectionChange);
      }
    }
  }
  Component.register(TabList);
  class Tabs extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tabs: [], // selectedTab: 'tab0',
        uistyle: "plain", // hat,card,line,pill
        onTabSelectionChange: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._addPropStyle("fit");
      const that = this;
      const tabItems = [];
      const tabPanles = [];
      const { tabs, uistyle } = this.props;
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
          _created: function () {
            this.tabs = that;
            that.tabList = this;
          },
          tabContent: function () {
            return that.tabContent;
          },
        },
        tabContent: {
          component: TabContent,
          panels: tabPanles,
          _created: function () {
            that.tabContent = this;
          },
        },
      });
      this.setProps({ children: [this.props.tabList, this.props.tabContent] });
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
  Component.register(Tabs);
  class Tag extends Component {
    constructor(props, ...mixins) {
      const defaults = {
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
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      this._propStyleClasses = ["size", "color"];
      const { icon, text, type, number, overflowCount, removable } = this.props;
      const that = this;
      if (icon) {
        this.setProps({ classes: { "p-with-icon": true } });
      }
      if (type === "round") {
        this.setProps({ classes: { "u-shape-round": true } });
      }
      this.setProps({
        children: [
          Component.normalizeIconProps(icon),
          text && { tag: "span", children: text },
          number && {
            tag: "span",
            children: number > overflowCount ? `${overflowCount}+` : number,
          },
          removable &&
            Component.normalizeIconProps({
              type: "times",
              classes: {
                "nom-tag-remove": true,
                "nom-tag-remove-basic": !that.props.styles,
              },
              onClick: function () {
                that.props.removable(that.props.key);
              },
            }),
        ],
      });
    }
    _disable() {
      this.element.setAttribute("disabled", "disabled");
    }
  }
  Component.register(Tag);
  class TimelineItem extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "li",
        color: "blue", // 指定圆圈颜色 blue, red, green, gray，或自定义的色值
        dot: null, // 自定义时间轴点
        label: null, // 设置标签
        pending: false, // 是否是幽灵节点
        children: null, // 内容
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(TimelineItem);
  class Timeline extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        tag: "ul",
        mode: "left", // 通过设置 mode 可以改变时间轴和内容的相对位置 left | alternate | right
        pending: false, // 指定最后一个幽灵节点是否存在或内容,也可以是一个自定义的子元素
        // 当最后一个幽灵节点存在時，指定其时间图点
        pendingDot: { component: "Icon", type: "loading" },
        reverse: false, // 节点排序
        items: null, // 子元素项列表
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
  Component.register(Timeline);
  class TimePickerList extends List {
    constructor(props, ...mixins) {
      const defaults = { gutter: "sm", cols: 1, min: "00", max: "59" };
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
      const selected = [];
      const that = this;
      this.props.min = this.pickerControl.timeRange[this.props.type][0];
      this.props.max = this.pickerControl.timeRange[this.props.type][1];
      if (this.props.type === "hour") {
        items = this.pickerControl.getHour();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.hour);
      } else if (this.props.type === "minute") {
        items = this.pickerControl.getMinute();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.minute);
      } else if (this.props.type === "second") {
        items = this.pickerControl.getSecond();
        !this.pickerControl.empty &&
          selected.push(this.pickerControl.time.second);
      }
      this.setProps({
        styles: { padding: "3px" },
        items: items,
        itemSelectable: { multiple: false, byClick: true },
        selectedItems: selected,
        itemDefaults: {
          _config: function () {
            const key = this.props.key;
            if (key < that.props.min || key > that.props.max) {
              this.setProps({ disabled: true });
            }
          },
        },
        onItemSelectionChange: () => {
          this.onChange();
        },
      });
      super._config();
    }
    onChange() {
      this.scrollToKey();
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
          // this.selectItem(t[0])
          this.update({ selectedItems: t[0] });
        } else if (this.props.type === "minute") {
          // this.selectItem(t[1])
          this.update({ selectedItems: t[1] });
        } else {
          // this.selectItem(t[2])
          this.update({ selectedItems: t[2] });
        }
      } else {
        this.unselectAllItems();
      }
    }
    refresh() {
      const selected = [];
      this.getSelectedItem() && selected.push(this.getSelectedItem().props.key);
      this.props.selectedItems = selected;
      this.update();
      this.scrollToKey();
    }
    scrollToKey() {
      // const top = this.getSelectedItem() ? this.getSelectedItem().element.offsetTop - 3 : 0
      // this.scroller.element.scrollTop = top
      this.scrollToSelected();
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
      const defaults = {
        allowClear: true,
        value: null,
        format: "HH:mm:ss",
        hourStep: null,
        minuteStep: null,
        secondStep: null,
        readonly: true,
        placeholder: null,
        showNow: true,
        minTime: null,
        maxTime: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      this.setProps({
        leftIcon: "clock",
        rightIcon: {
          type: "times",
          hidden: !this.props.allowClear,
          onClick: (args) => {
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
          Object.keys(this.timeList).forEach(function (key) {
            that.timeList[key].scrollToKey();
          });
        },
      }); // if (!this.hasPopup) {
      //   this.popup = new TimePickerPopup({
      //     trigger: this.control,
      //     onHide: () => {
      //       !this.hidden && that.getValue() !== that.defaultValue && that.handleChange()
      //       this.hidden = true
      //     },
      //     onShow: () => {
      //       this.hidden = false
      //       // this.confirm = false
      //       Object.keys(this.timeList).forEach(function (key) {
      //         that.timeList[key].scrollToKey()
      //       })
      //     },
      //   })
      // }
      // this.hasPopup = true
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
      if (that.time.hour <= that.minTime.hour) {
        that.timeRange.hour = [that.minTime.hour, that.maxTime.hour];
        that.timeRange.minute = [that.minTime.minute, "59"];
        if (that.time.minute <= that.minTime.minute) {
          that.timeRange.second = [that.minTime.second, "59"];
        } else {
          that.timeRange.second = ["00", "59"];
        }
      } else if (that.time.hour >= that.maxTime.hour) {
        that.timeRange.minute = ["00", that.maxTime.minute];
        if (that.time.minute >= that.maxTime.minute) {
          that.timeRange.second = ["00", that.maxTime.second];
        } else {
          that.timeRange.second = ["00", "59"];
        }
      } else {
        that.timeRange.minute = that.timeRange.second = ["00", "59"];
      }
      this.empty = false;
      Object.keys(this.timeList).forEach(function (key) {
        that.timeList[key].refresh();
      });
    }
  }
  Component.register(TimePicker);
  class TimeRangePicker extends Group {
    constructor(props, ...mixins) {
      const defaults = {
        allowClear: true,
        value: null,
        format: "HH:mm:ss",
        hourStep: 0,
        minuteStep: 0,
        secondStep: 0,
        readonly: true,
        placeholder: null,
        showNow: true,
        onChange: null,
        fieldName: { start: "start", end: "end" },
      };
      super(Component.extendProps(defaults, props), ...mixins);
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
      } = this.props;
      this.setProps({
        inline: true,
        fields: [
          {
            component: "TimePicker",
            name: that.props.fieldName.start,
            placeholder: "开始时间",
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
            minTime,
            maxTime,
          },
          { component: "StaticText", value: "-" },
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
            minTime,
            maxTime,
          },
        ],
      });
      super._config();
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
            opposite.showPopup();
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
  Component.register(TimeRangePicker);
  class Toolbar extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        type: "default",
        visibleItems: 2,
        gutter: "sm",
        size: null,
        items: [],
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { items, type, gutter, size, visibleItems } = this.props;
      const before = items.slice(0, visibleItems).map((item) => {
        return Object.assign(
          { component: "Button", type: type, size: size },
          item
        );
      });
      const dropdowns = {
        component: "Dropdown",
        rightIcon: "ellipsis",
        items: items.slice(visibleItems),
        type: type,
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
  Component.register(Toolbar);
  class TreeNodeContent extends Component {
    constructor(props, ...mixins) {
      const defaults = { text: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.node = this.parent;
      this.node.content = this;
      this.level = this.node.level;
      this.tree = this.node.tree;
    }
    _config() {
      const { text, icon, tools } = this.node.props;
      const { initExpandLevel, nodeCheckable } = this.tree.props;
      const expanded = initExpandLevel === -1 || initExpandLevel > this.level;
      const tree = this.tree;
      this.setProps({
        expanded,
        expandable: {
          byIndicator: true,
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
              expandedProps: { type: "down" },
              collapsedProps: { type: "right" },
            },
          },
        },
        selectable: { byClick: this.tree.props.nodeSelectable.byClick },
        selected:
          this.tree.props.nodeSelectable.selectedNodeKey === this.node.key,
        attrs: { style: { paddingLeft: `${this.level * 16}px` } },
        onSelect: () => {
          if (tree.selectedNode !== null) tree.selectedNode.unselect();
          tree.selectedNode = this.node;
          tree._onNodeSelect({ node: this.node });
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
              Component.normalizeIconProps(tools)
            ),
        ],
        onClick: () => {
          this.tree._onNodeClick({ node: this.node });
        },
      });
    }
    _getCheckbox() {
      return {
        component: Checkbox,
        plain: true,
        classes: { "nom-tree-node-checkbox": true },
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
        },
      };
    }
  }
  Component.register(TreeNodeContent);
  class TreeNode extends Component {
    constructor(props, ...mixins) {
      const defaults = { nodes: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
      this.isLeaf = !nodes && !childrenData;
      if (Array.isArray(nodes) || Array.isArray(childrenData)) {
        children.push({ component: "TreeNodes", nodes, childrenData });
      }
      this.setProps({ children });
      if (this.tree.props.nodeCheckable) {
        this.setProps({
          checked: this.tree.checkedNodeKeysHash[this.key] === true,
        });
      }
    }
    check(checkOptions = { checkCheckbox: true }) {
      const { checked } = this.props;
      if (checked === true) {
        return;
      }
      const { checkCheckbox } = checkOptions;
      this.parentNode && this.parentNode.check();
      if (checkCheckbox === true) {
        this.checkboxRef.setValue(true, { triggerChange: false });
      }
      this.props.checked = true;
    }
    uncheck(uncheckOptions = { uncheckCheckbox: true }) {
      const { checked } = this.props;
      if (checked === false) {
        return;
      }
      const { uncheckCheckbox } = uncheckOptions;
      uncheckCheckbox &&
        this.checkboxRef.setValue(false, { triggerChange: false });
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].uncheck();
      });
      this.props.checked = false;
    }
    isChecked() {
      return this.props.checked === true;
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
  Component.register(TreeNode);
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
  class TreeNodes extends Component {
    constructor(props, ...mixins) {
      const defaults = { nodes: null, childrenData: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
              node.props.childrenData = data.children;
            }
          },
        },
        this.tree.props.nodeDefaults
      );
      this.setProps({ children: nodesProps, childDefaults });
    }
    _rendered() {
      const { sortable } = this.tree.props;
      if (sortable !== false) {
        new Sortable(this.element, {
          group: this.key,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
        });
      }
    }
    iterateNodes() {}
  }
  Component.register(TreeNodes);
  class Tree extends Component {
    constructor(props, ...mixins) {
      const defaults = {
        nodes: null,
        nodeDefaults: {},
        nodeSelectable: {
          onlyleaf: false,
          byClick: true,
          selectedNodeKey: null,
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
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      this.nodeRefs = {};
      this.selectedNode = null;
    }
    _config() {
      this.nodeRefs = {};
      this.selectedNode = null;
      const { nodes, data, flatData, nodeCheckable } = this.props;
      if (flatData === true) {
        this.setProps({ data: this._toTreeData(data) });
      }
      if (nodeCheckable) {
        this.setProps({
          nodeCheckable: Component.extendProps(
            {
              cascadeCheckParent: true,
              cascadeUncheckChildren: true,
              cascade: false,
              checkedNodeKeys: [],
            },
            nodeCheckable
          ),
        });
        this.checkedNodeKeysHash = {};
        this.props.nodeCheckable.checkedNodeKeys.forEach((key) => {
          this.checkedNodeKeysHash[key] = true;
        });
      }
      this.setProps({
        children: {
          component: TreeNodes,
          nodes,
          childrenData: this.props.data,
        },
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
        childNodeData.children = this.getData(getOptions, childNode);
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
          this.getCheckedNodeKeys(getOptions, checkedNodeKeys, childNode);
        }
      });
      return checkedNodeKeys;
    }
    getCheckedNodesData(getOptions, node) {
      getOptions = getOptions || {};
      node = node || this;
      const checkedNodesData = [];
      const childNodes = node.getChildNodes();
      childNodes.forEach((childNode) => {
        if (childNode.isChecked() === true) {
          const childNodeData = Object.assign({}, childNode.props.data);
          checkedNodesData.push(childNodeData);
          childNodeData.children = this.getCheckedNodesData(
            getOptions,
            childNode
          );
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
      node.select();
    }
    _onNodeClick(args) {
      this._callHandler("onNodeClick", args);
    }
    _onNodeSelect(args) {
      const { onNodeSelect } = this.props.nodeSelectable;
      this._callHandler(onNodeSelect, args);
    }
    _toTreeData(arrayData) {
      const { key, parentKey, children } = this.props.dataFields;
      if (!key || key === "" || !arrayData) return [];
      if (Array.isArray(arrayData)) {
        const r = [];
        const tmpMap = [];
        arrayData.forEach((item) => {
          tmpMap[item[key]] = item;
        });
        arrayData.forEach((item) => {
          tmpMap[item[key]] = item;
          if (tmpMap[item[parentKey]] && item[key] !== item[parentKey]) {
            if (!tmpMap[item[parentKey]][children])
              tmpMap[item[parentKey]][children] = [];
            tmpMap[item[parentKey]][children].push(item);
          } else {
            r.push(item);
          }
        });
        return r;
      }
      return [arrayData];
    }
  }
  Component.register(Tree);
  class TreeSelectPopup extends Popup {
    constructor(props, ...mixins) {
      const defaults = {};
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.selectControl = this.opener.parent.parent.parent;
    }
    _config() {
      const that = this;
      this.setProps({
        attrs: { style: { width: `${this.selectControl.offsetWidth()}px` } },
        children: {
          component: Layout,
          body: {
            children: {
              component: "Tree",
              treeData: that.selectControl.props.treeData,
              selectedNodes: that.props.selectedNodes,
              multiple: that.selectControl.props.multiple,
              leafOnly: that.selectControl.props.leafOnly,
              onCheck: function (data) {
                that.selectControl.setValue(data);
              },
              _created: function () {
                that.selectControl.tree = this;
              },
            },
          },
        },
      });
      super._config();
    }
  }
  Component.register(TreeSelectPopup);
  class TreeSelect extends Field {
    constructor(props, ...mixins) {
      const defaults = {
        treeData: null,
        multiple: true,
        leafOnly: false,
        showArrow: true,
        selectedNodes: null,
      };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _created() {
      super._created();
      this.items = [];
    }
    _config() {
      const { showArrow, selectedNodes } = this.props;
      const items = [];
      const that = this;
      if (typeof selectedNodes === "string") {
        const temp = [];
        temp.push(selectedNodes);
        that.props.selectedNodes = temp;
      }
      if (selectedNodes) {
        that.getList().forEach(function (item) {
          that.props.selectedNodes.forEach(function (key) {
            if (key === item.key) {
              items.push({
                component: "Tag",
                type: "round",
                size: "xs",
                text: item.title,
                key: item.key,
                removable: function (param) {
                  that.props.selectedNodes = that.props.selectedNodes.filter(
                    function (k) {
                      return k !== param;
                    }
                  );
                  that.update(that.props.selectedNodes);
                },
              });
            }
          });
        });
      }
      let children = [];
      const badges = { children: items };
      if (showArrow) {
        children = [
          badges,
          {
            component: Icon,
            type: "down",
            _created: function () {
              that.arrow = this;
            },
            classes: { "nom-tree-select-arrow": true },
          },
        ];
      }
      this.setProps({ control: { children: children } });
      super._config();
    }
    _rendered() {
      this.popup = new TreeSelectPopup({
        trigger: this.arrow,
        selectedNodes: this.props.selectedNodes,
      });
    }
    getList() {
      const list = [];
      function mapTree(data) {
        return data.forEach(function (item) {
          list.push({ key: item.value, title: item.title, value: item.value });
          if (item.children && item.children.length > 0) {
            mapTree(item.children);
          }
        });
      }
      mapTree(this.props.treeData);
      return list;
    }
    setValue(data) {
      this.props.selectedNodes = data.items;
      this.update(this.props.selectedNodes);
    }
    _getValue() {
      return this.props.selectedNodes;
    }
  }
  Component.register(TreeSelect); // 正整数
  const POSITIVE_INTEGER = /^[1-9]\d*$/;
  const DEFAULT_ACCEPT =
    "image/*,application/msword,application/pdf,application/x-rar-compressed,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.ms-works,application/zip,audio/*,video/*,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/csv";
  function getUUID() {
    return `nom-upload-${Math.random().toString().substr(2)}`;
  }
  function getDate(timestamp) {
    if (isNumeric(timestamp) && POSITIVE_INTEGER.test(timestamp.toString())) {
      const date = new Date(timestamp);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${
        day > 9 ? day : `0${day}`
      }`;
    }
    return null;
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
      const defaults = { disabled: false, file: null };
      super(Component.extendProps(defaults, props), ...mixins);
    }
    _config() {
      const { file, onRemove, extraAction } = this.props;
      const { name, size, uploadTime, uuid, status } = file;
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
                status !== "removing" && onRemove.action(e, file);
              },
            },
          });
        }
        if (Array.isArray(extraAction) && extraAction.length > 0) {
          extraAction.forEach(({ text, action }) => {
            actions.push({
              tag: "a",
              children: text,
              attrs: {
                href: "javascript:void(0)",
                onclick: (e) => {
                  e.preventDefault();
                  isFunction(action) && action(e, file);
                },
              },
            });
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
                      tag: "div",
                      _config() {
                        this.setProps({
                          children: [
                            {
                              tag: "span",
                              children: [
                                {
                                  tag: "a",
                                  children: name,
                                  _config() {
                                    this.setProps({
                                      classes: { "upload-file-name": true },
                                    });
                                  }, // attrs: {
                                  //   href: 'javascript:void(0)',
                                  //   onclick: (e) => {
                                  //     e.preventDefault()
                                  //     if (isFunction(onPreview)) onPreview(file)
                                  //   },
                                  // },
                                },
                              ],
                            },
                            { tag: "span", children: getFileSize(size) },
                            {
                              tag: "span",
                              children: `更新日期 : ${
                                getDate(uploadTime) ? getDate(uploadTime) : "NA"
                              }`,
                              _config() {
                                this.setProps({
                                  classes: {
                                    "upload-file-update": true,
                                    "u-border-left ": true,
                                  },
                                });
                              },
                            },
                          ],
                        });
                      },
                    },
                    {
                      tag: "div",
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
      return {
        component: "Icon",
        type: "default",
        classes: { "file-img": true },
      }; // const suffix = getFileExtension(name)
      // if (fileType.has(suffix)) {
      //   return {
      //     component: 'Icon',
      //     type: suffix,
      //     classes: {
      //       'file-img': true,
      //     },
      //   }
      // }
      // return {
      //   component: 'Icon',
      //   type: 'default',
      //   classes: {
      //     'file-img': true,
      //   },
      // }
    }
  }
  class FileList extends Component {
    constructor(props, ...mixins) {
      const defaults = { disabled: false, files: null };
      super(Component.extendProps(defaults, props), ...mixins);
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
        extraAction,
        initializing,
        renderer,
      } = this.props;
      const children = [];
      if (Array.isArray(files) && files.length > 0) {
        files.forEach((file) => {
          children.push({
            component: FileItem,
            file,
            onRemove,
            extraAction,
            renderer,
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
      const defaults = {
        // 测试地址
        action: "",
        disabled: false,
        beforeUpload: null,
        button: null,
        defaultFileList: [],
        multiple: true,
        name: "file",
        display: true,
        data: {}, // request option
        method: "post",
        headers: {},
        withCredentials: false,
        onRemove: null,
        renderer: null,
        extraAction: [],
      };
      super(Component.extendProps(defaults, props), ...mixins);
      this.reqs = {};
    }
    _created() {
      this.fileList = this.props.defaultFileList;
    }
    _config() {
      const that = this; // const { disabled, accept, button: cButton, multiple, files } = this.props;
      const {
        disabled,
        accept,
        button: cButton,
        multiple,
        extraAction,
        display,
        onRemove,
        renderer,
      } = this.props;
      let initializing = true;
      if (isPromiseLike(that.fileList)) {
        that.fileList.then((fs) => {
          initializing = false;
          that.fileList = fs;
          if (!disabled && this.button) {
            that.button._enable();
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
      let button = cButton;
      if (!button && button !== false) button = defaultButtonProps;
      if (button !== false) {
        button = Object.assign({}, button, {
          disabled: disabled || initializing, // disabled,
          ref: (c) => {
            that.button = c;
          },
          attrs: {
            onclick() {
              that._handleClick();
            },
            onKeyDown(e) {
              that._onKeyDowne(e);
            },
          },
        });
        children.push(button);
      } // if (display && files && files.length > 0) {
      //   console.log('display')
      //   children.push({
      //     component: FileList,
      //     initializing,
      //     files,
      //     onRemove: this.handleRemove.bind(that),
      //     extraAction,
      //   })
      // }
      if (display) {
        if (initializing || (this.fileList && this.fileList.length > 0)) {
          children.push({
            component: FileList,
            classes: { "nom-file-list-only": button === false },
            ref: (c) => {
              that.list = c;
            },
            initializing,
            files: this.fileList,
            renderer,
            onRemove:
              onRemove &&
              isFunction(onRemove.action) &&
              Object.assign({}, onRemove, {
                action: that.handleRemove.bind(that),
              }),
            extraAction,
          });
        }
      }
      this.setProps({ control: { children } });
      super._config();
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
      fileList = fileList.map((e) => {
        if (!e.uuid) {
          e.uuid = getUUID();
        }
        e.uploadTime = new Date().getTime();
        return e;
      });
      fileList.forEach((file) => {
        this.upload(file, [...uploadedFileList, ...fileList]);
      });
    }
    upload(file, fileList) {
      const beforeUpload = this.props.beforeUpload;
      if (!beforeUpload) {
        Promise.resolve().then(() => this.post(file));
        return;
      }
      const before = beforeUpload(file, fileList);
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
      });
    }
    onChange(info) {
      // 更新列表
      this.fileList = info.fileList;
      const { onChange: onChangeProp } = this.props;
      this.update({ fileList: [...info.fileList] });
      if (this.button) {
        const disableBtn = this.fileList.some((file) =>
          ["removing", "uploading"].includes(file.status)
        );
        if (!this.props.disabled) {
          disableBtn ? this.button._disable() : this.button._enable();
        }
      }
      if (onChangeProp) {
        onChangeProp(Object.assign({}, info, { fileList: [...this.fileList] }));
      }
    }
    onStart(file) {
      const uploadFile = cloneFileWithInfo(file);
      uploadFile.status = "uploading"; // 这里要改
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
    handleRemove(e, file) {
      const {
        onRemove: { action },
      } = this.props; // removing
      file.status = "removing";
      this.fileList = this.fileList.map((f) =>
        f.uuid === file.uuid ? Object.assign({}, f, { status: "removing" }) : f
      );
      this.onChange({ file, fileList: this.fileList });
      Promise.resolve(isFunction(action) ? action(e, file) : action).then(
        (ret) => {
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
        }
      );
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
  }
  Component.register(Uploader);
  exports.Alert = Alert;
  exports.App = App;
  exports.AutoComplete = AutoComplete;
  exports.Avatar = Avatar;
  exports.AvatarGroup = AvatarGroup;
  exports.Badge = Badge;
  exports.Button = Button;
  exports.Caption = Caption;
  exports.Cascader = Cascader;
  exports.Checkbox = Checkbox;
  exports.CheckboxList = CheckboxList;
  exports.Collapse = Collapse;
  exports.Cols = Cols;
  exports.Component = Component;
  exports.Confirm = Confirm;
  exports.Container = Container;
  exports.DatePicker = DatePicker;
  exports.DateRangePicker = DateRangePicker;
  exports.Divider = Divider;
  exports.Dropdown = Dropdown;
  exports.Ellipsis = Ellipsis;
  exports.Empty = Empty;
  exports.Field = Field;
  exports.Form = Form;
  exports.Grid = Grid;
  exports.Group = Group;
  exports.GroupList = GroupList;
  exports.Icon = Icon;
  exports.Layer = Layer;
  exports.Layout = Layout;
  exports.List = List;
  exports.ListItemMixin = ListItemMixin;
  exports.Loading = Loading;
  exports.MaskInfo = MaskInfo;
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
  exports.Popup = Popup;
  exports.Progress = Progress;
  exports.RadioList = RadioList;
  exports.Router = Router;
  exports.Rows = Rows;
  exports.Scrollbar = Scrollbar;
  exports.Select = Select;
  exports.SlideCaptcha = SlideCaptcha;
  exports.Spinner = Spinner;
  exports.StaticText = StaticText;
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
  exports.util = index$1;
  Object.defineProperty(exports, "__esModule", { value: true });
});
