(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.nomui = {}));
}(this, (function (exports) { 'use strict';

  String.prototype.trim = function (characters) {
    return this.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
  };

  String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str);
    return reg.test(this)
  };

  String.prototype.trimEnd = function (characters) {
    return this.replace(new RegExp(characters + '+$', 'g'), '')
  };

  String.prototype.prepend = function (character) {
    if (this[0] !== character) {
      return (character + this).toString()
    }
    else {
      return this.toString()
    }
  };

  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   *
   * @param {*} obj
   * @return {Boolean}
   */

  var toString = Object.prototype.toString;
  var OBJECT_STRING = '[object Object]';
  function isPlainObject(obj) {
    if (Object.prototype.toString.call(obj) !== OBJECT_STRING) {
      return false;
    }

    const prototype = Object.getPrototypeOf(obj);
    return prototype === null || prototype === Object.prototype;
  }

  function isString(obj) { //判断对象是否是字符串
    return Object.prototype.toString.call(obj) === "[object String]";
  }

  function isFunction(val) {
    return toString.call(val) === '[object Function]'
  }

  /**
   * Hyphenate a camelCase string.
   *
   * @param {String} str
   * @return {String}
   */

  var hyphenateRE = /([^-])([A-Z])/g;
  function hyphenate(str) {
    return str
      .replace(hyphenateRE, '$1-$2')
      .replace(hyphenateRE, '$1-$2')
      .toLowerCase()
  }

  function extend() {
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

  function clone(from) {
    if (isPlainObject(from)) {
      return JSON.parse(JSON.stringify(from));
    }
    else {
      return from;
    }
  }

  function accessProp(options, key) {
    if (typeof key === "string") {

      // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
      var parts = key.split(".");
      var curOption;
      key = parts.shift();
      if (parts.length) {
        curOption = options[key];
        for (let i = 0; i < parts.length - 1; i++) {
          curOption[parts[i]] = curOption[parts[i]] || {};
          curOption = curOption[parts[i]];
        }
        key = parts.pop();
        return curOption[key] === undefined ? null : curOption[key]
      }
      else {
        return options[key] === undefined ? null : options[key]
      }
    }
  }

  function pathCombine() {
    var path = '';
    var args = Array.from(arguments);

    args.forEach(function (item, index) {
      if (index > 0) {
        path += '/' + item.trim('/');
      }
      else {
        path += item.trimEnd('/');
      }
    });

    return path
  }

  var uppercaseRegex = /[A-Z]/g;
  function toLowerCase(capital) { return "-" + capital.toLowerCase() }
  function normalizeKey(key) {
    return key[0] === "-" && key[1] === "-" ? key :
      key === "cssFloat" ? "float" :
        key.replace(uppercaseRegex, toLowerCase)
  }

  function isNumeric(val) {
    var num = Number(val),
      type = typeof val;
    return val != null && type != 'boolean' &&
      (type != 'string' || val.length) &&
      !isNaN(num) && isFinite(num) || false;
  }

  // Events
  // -----------------
  // Thanks to:
  //  - https://github.com/documentcloud/backbone/blob/master/backbone.js
  //  - https://github.com/joyent/node/blob/master/lib/events.js


  // Regular expression used to split event strings
  var eventSplitter = /\s+/;


  // A module that can be mixed in to *any object* in order to provide it
  // with custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = new Events();
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  function Events() {
  }


  // Bind one or more space separated events, `events`, to a `callback`
  // function. Passing `"all"` will bind the callback to all events fired.
  Events.prototype.on = function (events, callback, context) {
      var cache, event, list;
      if (!callback) return this

      cache = this.__events || (this.__events = {});
      events = events.split(eventSplitter);

      while (event = events.shift()) {
          list = cache[event] || (cache[event] = []);
          list.push(callback, context);
      }

      return this
  };

  Events.prototype.once = function (events, callback, context) {
      var that = this;
      var cb = function () {
          that.off(events, cb);
          callback.apply(context || that, arguments);
      };
      return this.on(events, cb, context)
  };

  // Remove one or many callbacks. If `context` is null, removes all callbacks
  // with that function. If `callback` is null, removes all callbacks for the
  // event. If `events` is null, removes all bound callbacks for all events.
  Events.prototype.off = function (events, callback, context) {
      var cache, event, list, i;

      // No events, or removing *all* events.
      if (!(cache = this.__events)) return this
      if (!(events || callback || context)) {
          delete this.__events;
          return this
      }

      events = events ? events.split(eventSplitter) : keys(cache);

      // Loop through the callback list, splicing where appropriate.
      while (event = events.shift()) {
          list = cache[event];
          if (!list) continue

          if (!(callback || context)) {
              delete cache[event];
              continue
          }

          for (i = list.length - 2; i >= 0; i -= 2) {
              if (!(callback && list[i] !== callback ||
                  context && list[i + 1] !== context)) {
                  list.splice(i, 2);
              }
          }
      }

      return this
  };


  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  Events.prototype.trigger = function (events) {
      var cache, event, all, list, i, len, rest = [], returned = true;
      if (!(cache = this.__events)) return this

      events = events.split(eventSplitter);

      // Fill up `rest` with the callback arguments.  Since we're only copying
      // the tail of `arguments`, a loop is much faster than Array#slice.
      for (i = 1, len = arguments.length; i < len; i++) {
          rest[i - 1] = arguments[i];
      }

      // For each event, walk through the list of callbacks twice, first to
      // trigger the event, then to trigger any `"all"` callbacks.
      while (event = events.shift()) {
          // Copy callback lists to prevent modification.
          if (all = cache.all) all = all.slice();
          if (list = cache[event]) list = list.slice();

          // Execute event callbacks except one named "all"
          if (event !== 'all') {
              returned = triggerEvents(list, rest, this) && returned;
          }

          // Execute "all" callbacks.
          returned = triggerEvents(all, [event].concat(rest), this) && returned;
      }

      return returned
  };

  Events.prototype.emit = Events.prototype.trigger;


  // Helpers
  // -------

  var keys = Object.keys;

  if (!keys) {
      keys = function (o) {
          var result = [];

          for (var name in o) {
              if (o.hasOwnProperty(name)) {
                  result.push(name);
              }
          }
          return result
      };
  }

  // Mix `Events` to object instance or Class function.
  Events.mixTo = function (receiver) {
      var proto = Events.prototype;

      if (isFunction$1(receiver)) {
          for (var key in proto) {
              if (proto.hasOwnProperty(key)) {
                  receiver.prototype[key] = proto[key];
              }
          }
          Object.keys(proto).forEach(function (key) {
              receiver.prototype[key] = proto[key];
          });
      }
      else {
          var event = new Events;
          for (var key in proto) {
              if (proto.hasOwnProperty(key)) {
                  copyProto(key);
              }
          }
      }

      function copyProto(key) {
          receiver[key] = function () {
              proto[key].apply(event, Array.prototype.slice.call(arguments));
              return this
          };
      }
  };

  // Execute callbacks
  function triggerEvents(list, args, context) {
      var pass = true;

      if (list) {
          var i = 0, l = list.length, a1 = args[0], a2 = args[1], a3 = args[2];
          // call is faster than apply, optimize less than 3 argu
          // http://blog.csdn.net/zhengyinhui100/article/details/7837127
          switch (args.length) {
              case 0: for (; i < l; i += 2) { pass = list[i].call(list[i + 1] || context) !== false && pass; } break;
              case 1: for (; i < l; i += 2) { pass = list[i].call(list[i + 1] || context, a1) !== false && pass; } break;
              case 2: for (; i < l; i += 2) { pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass; } break;
              case 3: for (; i < l; i += 2) { pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass; } break;
              default: for (; i < l; i += 2) { pass = list[i].apply(list[i + 1] || context, args) !== false && pass; } break;
          }
      }
      // trigger will return false if one of the callbacks return false
      return pass;
  }

  function isFunction$1(func) {
      return Object.prototype.toString.call(func) === '[object Function]'
  }

  let components = {};
  let mixins = [];

  class Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'div',
              reference: document.body,
              placement: 'append',
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
                  unselectedProps: null
              },
              expandable: {
                  byClick: false,
                  byHover: false,
                  target: null,
                  expandedProps: false,
                  collapsedProps: false
              }
          };
          this.props = Component.extendProps(defaults, props);

          this.parent = null;
          this.children = [];
          this.root = null;
          this.rendered = false;
          this.scope = null;
          this.refs = {};
          this.mixins = [];
          this._scoped = false;

          this._propStyleClasses = [];

          mixins && this._mixin(mixins);

          if (this.props.key) {
              this.key = this.props.key;
              if (isFunction(this.props.key)) {
                  this.key = this.props.key.call(this);
              }
          }

          this.referenceComponent = this.props.reference instanceof Component ? this.props.reference : this.props.reference.component;
          if (this.referenceComponent) {
              if (this.props.placement === 'append') {
                  this.parent = this.referenceComponent;
              }
              else {
                  this.parent = this.referenceComponent.parent;
              }
          }

          if (this.parent === null) {
              this.root = this;
              this.scope = this.root;
          }
          else {
              this.root = this.parent.root;
              this.scope = this.parent._scoped ? this.parent : this.parent.scope;

          }

          if (this.props.ref && this.scope) {
              this.scope.refs[this.props.ref] = this;
          }

          if (this.props.methods) {
              for (var method in this.props.methods) {
                  if (this.props.methods.hasOwnProperty(method)) {
                      this[method] = this.props.methods[method];
                  }
              }
          }

          this.componentType = this.__proto__.constructor.name;
          this.referenceElement = this.props.reference instanceof Component ? this.props.reference.element : this.props.reference;

          this.create();
          if (this.props.autoRender === true) {
              this.config();
              this.render();
          }
      }

      create() {
          this._onClickToggleExpand = this._onClickToggleExpand.bind(this);
          this._onClickToggleSelect = this._onClickToggleSelect.bind(this);
          this._onClickHandler = this._onClickHandler.bind(this);

          isFunction(this._create) && this._create();
          this._callMixin('_create');
          this.props._create && this.props._create.call(this);
      }

      config() {
          this.props._config && this.props._config.call(this);
          this._callMixin('_config');
          isFunction(this._config) && this._config();
          this._setExpandableProps();
          this._setStatusProps();
      }

      render() {
          if (this.rendered === true) {
              this.emptyChildren();
          }
          else {
              this._mountElement();
          }

          this._handleAttrs();
          this._handleStyles();
          this._handleEvents();

          this._renderChildren();

          this.props.disabled === true && isFunction(this._disable) && this._disable();
          this.props.selected === true && isFunction(this._select) && this._select();
          this.props.hidden === false && isFunction(this._show) && this._show();

          isFunction(this._render) && this._render();
          this._callMixin('_render');
          isFunction(this.props._render) && this.props._render.call(this);

          this.rendered = true;
      }

      // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
      remove() {
          let el = this._removeCore();
          this.parent && this.parent.removeChild(this);
          el.parentNode.removeChild(el);
      }

      update(props) {
          this.setProps(props);
          this._off();
          this.off();
          this.config();
          this.render();
      }

      emptyChildren() {
          while (this.element.firstChild) {
              if (this.element.firstChild.component) {
                  this.element.firstChild.component.remove();
              }
              else {
                  this.element.removeChild(this.element.firstChild);
              }
          }
      }

      offsetWidth() {
          return this.element.offsetWidth
      }

      _mountElement() {
          var placement = this.props.placement;
          this.referenceElement = this.props.reference instanceof Component ? this.props.reference.element : this.props.reference;
          this.element = document.createElement(this.props.tag);
          this.element.component = this;
          if (placement === 'append') {
              this.referenceElement.appendChild(this.element);
          }
          else if (placement === 'replace') {
              if (this.referenceComponent) {
                  this.referenceComponent._removeCore();
                  this.parent && this.parent.replaceChild(this.referenceComponent, this);
              }
              this.referenceElement.parentNode.replaceChild(this.element, this.referenceElement);
          }
      }

      getComponent(componentOrElement) {
          return componentOrElement instanceof Component ? componentOrElement : componentOrElement.component
      }

      getElement(componentOrElement) {
          return componentOrElement instanceof Component ? componentOrElement.element : componentOrElement
      }

      _renderChildren() {
          var children = this.props.children;
          if (Array.isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                  var child = children[i];
                  this.appendChild(child, this.props.childDefaults);
              }
          }
          else if (isPlainObject(children) || isFunction(children)) {
              this.appendChild(children);
          }
          else if (isString(children) || isNumeric(children)) {
              this.element.innerHTML = children;
          }
      }

      _removeCore() {
          this.emptyChildren();
          let el = this.element;
          isFunction(this._remove) && this._remove();
          this._callMixin('_remove');
          this._off();
          this.off();

          for (var p in this) {
              if (this.hasOwnProperty(p)) {
                  delete this[p];
              }
          }

          return el
      }

      _callMixin(hookType) {
          for (let i = 0; i < mixins.length; i++) {
              let mixin = mixins[i];
              mixin[hookType] && mixin[hookType].call(this);
          }
          for (let i = 0; i < this.mixins.length; i++) {
              let mixin = this.mixins[i];
              mixin[hookType] && mixin[hookType].call(this);
          }
      }

      removeChild(childInstance) {
          for (var i = 0; i < this.children.length; i++) {
              if (this.children[i] === childInstance) {
                  delete this.children[i];
                  this.children.splice(i, 1);
              }
          }
      }

      replaceChild(oldChild, newChild) {
          for (var i = 0; i < this.children.length; i++) {
              if (this.children[i] === oldChild) {
                  delete this.children[i];
                  this.children[i] = newChild;
              }
          }
      }

      setProps(newProps) {
          this.props = Component.extendProps(this.props, newProps);
      }

      appendChild(childProps, childDefaults) {
          if (!childProps) {
              return
          }
          var props = childProps;
          let mixins = [];
          if (isString(props)) {
              this.element.innerHTML = props;
              return
          }
          if (isFunction(childProps)) {
              let fnResult = childProps.call(this);
              props = fnResult.props;
              mixins = fnResult.mixins;
          }
          if (isPlainObject(childProps)) {
              if (childProps.props && childProps.mixins) {
                  props = childProps.props;
                  mixins = childProps.mixins;
              }
          }
          if (childDefaults !== null && childDefaults !== undefined) {
              props = Component.extendProps({}, childDefaults, props);
          }
          if (props) {
              props.component = props.component || Component;
              props.reference = this.element;
              props.placement = 'append';

              this.children.push(Component.create(props, ...mixins));
          }
      }

      disable() {
          if (!this.rendered || this.props.disabled === true) {
              return
          }

          this.props.disabled = true;
          this.addClass('s-disabled');
          isFunction(this._disable) && this._disable();
      }

      enable() {
          if (!this.rendered || this.props.disabled === false) {
              return
          }

          this.props.disabled = false;
          this.removeClass('s-disabled');
          isFunction(this._enable) && this._enable();
      }

      show() {
          if (!this.rendered) {
              this.setProps({ hidden: false });
              this.config();
              this.render();
              return
          }

          if (this.props.hidden === false) {
              return
          }

          this.props.hidden = false;
          this.removeClass('s-hidden');
          isFunction(this._show) && this._show();
          this.trigger('show');
      }

      _triggerShow() {
          isFunction(this._show) && this._show();
          this.trigger('show');
      }

      hide() {
          if (!this.rendered || this.props.hidden === true) {
              return
          }

          this.props.hidden = true;
          this.addClass('s-hidden');
          isFunction(this._hide) && this._hide();
          this.trigger('hide');
      }

      select(selectOption) {
          if (!this.rendered) {
              return
          }

          selectOption = extend(
              {
                  triggerSelect: true,
                  triggerSelectionChange: true
              },
              selectOption
          );
          if (this.props.selected === false) {
              this.props.selected = true;
              this.addClass('s-selected');
              isFunction(this._select) && this._select();
              selectOption.triggerSelect === true && this.trigger('select');
              selectOption.triggerSelectionChange === true && this.trigger('selectionChange');

              return true
          }
          else {
              return false
          }
      }

      unselect(unselectOption) {
          if (!this.rendered) {
              return
          }

          unselectOption = extend(
              {
                  triggerUnselect: true,
                  triggerSelectionChange: true
              },
              unselectOption
          );
          if (this.props.selected === true) {
              this.props.selected = false;
              this.removeClass('s-selected');
              isFunction(this._unselect) && this._unselect();

              if (unselectOption.triggerUnselect === true) {
                  this.trigger('unselect');
              }

              if (unselectOption.triggerSelectionChange === true) {
                  this.trigger('selectionChange');
              }

              return true
          }
          else {
              return false
          }
      }

      toggleSelect() {
          if (!this.rendered) return
          this.props.selected === true ? this.unselect() : this.select();
      }

      expand() {
          if (!this.rendered) return
          if (this.props.expanded === true) return

          this.props.expanded = true;
          this.addClass('s-expanded');
          var expandTarget = this._getExpandTarget();
          if (expandTarget !== null && expandTarget !== undefined) {
              expandTarget.show();
          }
          var expandedProps = this.props.expandable.expandedProps;
          if (expandedProps) {
              this.update(expandedProps);
          }
          isFunction(this._expand) && this._expand();
      }

      collapse() {
          if (!this.rendered) return
          if (this.props.expanded === false) return
          this.props.expanded = false;
          this.removeClass('s-expanded');
          var expandTarget = this._getExpandTarget();
          if (expandTarget !== null && expandTarget !== undefined) {
              expandTarget.hide();
          }
          isFunction(this._collapse) && this._collapse();
          var collapsedProps = this.props.expandable.collapsedProps;
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
          var expandable = this.props.expandable;
          if (isPlainObject(expandable)) {
              if (this.props.expanded) {
                  if (expandable.expandedProps) {
                      this.setProps(expandable.expandedProps);
                  }
              }
              else {
                  if (expandable.collapsedProps) {
                      this.setProps(expandable.collapsedProps);
                  }
              }
          }
      }

      _setStatusProps() {
          var props = this.props;

          this.setProps({
              classes: {
                  's-disabled': props.disabled,
                  's-selected': props.selected,
                  's-hidden': props.hidden,
                  's-expanded': props.expanded,
              }
          });
      }

      _getExpandTarget() {
          var target = this.props.expandable.target;
          if (target === undefined || target === null) {
              return null
          }
          if (target instanceof Component) {
              return target
          }
          else if (isString(target)) {
              return this.getScopedComponent(target)
          }
          else if (isFunction(target)) {
              return target.call(this)
          }
      }

      getScopedComponent(name) {
          var scope = scope;
          if (scope) {
              return scope.refs[name]
          }
      }

      getChildren() {
          var children = [];
          for (var i = 0; i < this.element.childNodes.length; i++) {
              children.push(this.element.childNodes[i].component);
          }
          return children
      }

      _handleAttrs() {
          for (var name in this.props.attrs) {
              var value = this.props.attrs[name];
              if (value == null) continue
              if (name === 'style') {
                  this._setStyle(value);
              }
              else if (name[0] === "o" && name[1] === "n") {
                  this._on(name.slice(2), value);
              }
              else if (name !== 'list' && name !== 'tagName' && name !== 'form' && name !== 'type' && name !== 'size' && name in this.element) {
                  this.element[name] = value == null ? '' : value;
              }
              else {
                  this.element.setAttribute(name, value);
              }
          }
      }

      _handleStyles() {
          var props = this.props;

          var classes = [];

          var componentTypeClasses = this._getComponentTypeClasses(this);
          for (var i = 0; i < componentTypeClasses.length; i++) {
              var componentTypeClass = componentTypeClasses[i];
              classes.push('nom-' + hyphenate(componentTypeClass));
          }

          if (props.type) {
              this._propStyleClasses.push('type');
          }
          for (var i = 0; i < this._propStyleClasses.length; i++) {
              var modifier = this._propStyleClasses[i];
              var modifierVal = this.props[modifier];
              if (modifierVal !== null && modifierVal !== undefined) {
                  if (modifierVal === true) {
                      classes.push('p-' + modifier);
                  }
                  else if (typeof modifierVal === 'string' || typeof modifierVal === 'number') {
                      classes.push('p-' + hyphenate(modifier) + '-' + modifierVal);
                  }
              }
          }

          if (isPlainObject(props.classes)) {
              for (var className in props.classes) {
                  if (props.classes.hasOwnProperty(className) && props.classes[className] == true) {
                      classes.push(className);
                  }
              }
          }

          var styles = props.styles;
          if (isPlainObject(styles)) {
              addStylesClass(styles);
          }

          function addStylesClass(styles, className) {
              className = className || '';
              if (isPlainObject(styles)) {
                  for (var style in styles) {
                      if (styles.hasOwnProperty(style)) {
                          addStylesClass(styles[style], className + '-' + style);
                      }
                  }
              }
              else if (Array.isArray(styles)) {
                  for (var i = 0; i < styles.length; i++) {
                      if (isString(styles[i])) {
                          classes.push('u' + className + '-' + styles[i]);
                      }
                  }
              }
              else if (isString(styles)) {
                  classes.push('u' + className + '-' + styles);
              }
          }

          if (classes.length) {
              var classNames = classes.join(' ');
              this.element.setAttribute('class', classNames);
          }
      }

      _handleEvents() {
          var props = this.props;
          var events = this.props.events;
          for (var event in events) {
              if (events.hasOwnProperty(event)) {
                  if (event === 'click') {
                      this._on('click', this._onClickHandler);
                  }
                  this.on(event, events[event]);
              }
          }

          if (props.selectable && props.selectable.byClick) {
              this._on('click', this._onClickToggleSelect);
          }

          if (props.expandable && props.expandable.byClick) {
              this._on('click', this._onClickToggleExpand);
          }
      }

      _onClickHandler(e) {
          this.trigger('click', e);
      }

      _onClickToggleSelect() {
          this.toggleSelect();
      }

      _onClickToggleExpand() {
          this.toggleExpand();
      }

      _setStyle(style) {
          var element = this.element;
          if (typeof style !== "object") {
              // New style is a string, let engine deal with patching.
              element.style.cssText = style;
          } else {
              // `old` is missing or a string, `style` is an object.
              element.style.cssText = "";
              // Add new style properties
              for (var key in style) {
                  var value = style[key];
                  if (value != null) element.style.setProperty(normalizeKey(key), String(value));
              }
          }
      }

      _getComponentTypeClasses(instance) {
          var classArray = [];
          var ctor = instance.constructor;

          while (ctor && ctor.name != 'Component') {
              classArray.unshift(ctor.name);
              ctor = ctor.__proto__.prototype.constructor;
          }

          return classArray
      }

      _on(event, callback) {
          var cache, list;
          /*if (context) {
              callback = callback.bind(context)
          }
          else {
              callback = callback.bind(this)
          }*/
          cache = this.__htmlEvents || (this.__htmlEvents = {});
          list = cache[event] || (cache[event] = []);
          list.push(callback);

          this.element.addEventListener(event, callback, false);
      }

      _off(event, callback) {
          var cache, list, i;

          // No events, or removing *all* events.
          if (!(cache = this.__htmlEvents)) return this
          if (!(event || callback)) {
              for (var key in this.__htmlEvents) {
                  if (this.__htmlEvents.hasOwnProperty(key)) {
                      var list = this.__htmlEvents[key];
                      if (!list) continue
                      for (i = list.length - 1; i >= 0; i -= 1) {
                          this.element.removeEventListener(key, list[i], false);
                      }
                  }
              }
              delete this.__htmlEvents;
              return this
          }

          list = cache[event];
          if (!list) return

          if (!callback) {
              delete cache[event];
              return
          }

          for (i = list.length - 1; i >= 0; i -= 1) {
              if (list[i] === callback) {
                  list.splice(i, 1);
                  this.element.removeEventListener(event, callback, false);
              }
          }
      }

      _trigger(eventName) {
          let event = new Event(eventName);
          this.element.dispatchEvent(event);
      }

      _mixin(mixins) {
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

          return new componentType(componentProps, ...mixins)
      }

      static register(component) {
          components[component.name] = component;
      }

      static extendProps(out) {
          out = out || {};

          for (var i = 1; i < arguments.length; i++) {
              var obj = arguments[i];

              if (!obj) continue

              for (var key in obj) {
                  // Prevent Object.prototype pollution
                  // Prevent never-ending loop
                  if (key === "__proto__" || out === obj[key]) {
                      continue
                  }
                  if (obj.hasOwnProperty(key) && isPlainObject(obj[key])) {
                      out[key] = Component.extendProps(out[key], obj[key]);
                  }
                  else if (obj[key] !== undefined) {
                      out[key] = obj[key];
                  }
              }
          }

          return out
      }

      static mixin(mixin) {
          mixins.push(mixin);
      }
  }

  Component.normalizeTemplateProps = function (props) {
      if (props === null || props === undefined) {
          return null
      }
      var templateProps = {};
      if (isString(props)) {
          templateProps.children = props;
      }
      else {
          templateProps = props;
      }

      return templateProps
  };

  Component.components = components;
  Component.mixins = mixins;

  Object.assign(Component.prototype, Events.prototype);

  class Route {
      constructor(defaultPath) {
          var that = this;

          this.hash = location.hash;
          if (!this.hash) {
              this.hash = "#" + defaultPath;
          }
          this.path = this.hash.substring(1);
          this.paths = [null, null, null];
          this.query = {};
          this.queryStr = '';
          var queryIndex = this.hash.indexOf('?');

          if (this.hash.length > 1) {
              if (queryIndex > -1) {
                  this.path = this.hash.substring(1, queryIndex);

                  var paramStr = this.queryStr = this.hash.substring(queryIndex + 1);
                  var paramArr = paramStr.split('&');

                  paramArr.forEach(function (e) {
                      var item = e.split('='),
                          key,
                          val;
                      key = item[0];
                      val = item[1];
                      if (key !== '') {
                          that.query[key] = decodeURIComponent(val);
                      }
                  });
              }
          }

          var pathArr = this.path.split('!');

          this.maxLevel = pathArr.length - 1;

          if (pathArr.length <= 3) {
              pathArr.forEach(function (path, index) {
                  that.paths[index] = path;
              });
          }
      }
  }

  class View extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              defaultPath: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      render() {
          this._mountElement();
          this.$app.routeView(this.$app.lastLevel, this.element, this.props.defaultPath);
      }

  }

  Component.register(View);

  Object.defineProperty(Component.prototype, '$view', {
      get: function () {
          let cur = this;
          while (cur) {
              if (cur.__isView === true) {
                  return cur
              }
              else {
                  cur = cur.parent;
              }
          }
          return cur
      }
  });

  var ViewMixin = {
      _create: function () {
          this.viewLevel = this.$app.lastLevel;
          this.$app.lastLevel++;
          this._scoped = true;
          this.__isView = true;
      },
      _remove: function () {
          delete this.$app.views[this.viewLevel];
      }
  };

  class App extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'body',
              placement: 'replace',
              defaultPath: '!',
              viewsDir: '/',
              isFixedLayout: true,
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.lastLevel = 0;
          this.previousRoute = null;
          this.currentRoute = new Route(this.props.defaultPath);

          this.views = {};

          Object.defineProperty(Component.prototype, '$app', {
              get: function () { return this.root; }
          });

          Object.defineProperty(Component.prototype, 'route', {
              get: function () { return this.$app.currentRoute; }
          });
      }

      _config() {
          this.setProps({
              children: { component: View }
          });

          if (this.props.isFixedLayout === true) {
              document.documentElement.setAttribute('class', 'app');
          }
      }

      _render() {
          var that = this;
          window.addEventListener('hashchange', function () {
              that.handleRoute();
          });
      }

      handleRoute() {
          var route = new Route();
          console.info(JSON.stringify(route));

          var changedLevel = null;
          var queryChanged = false;

          this.previousRoute = this.currentRoute;
          this.currentRoute = route;

          if (this.previousRoute !== null) {
              var currentRoutePaths = this.currentRoute.paths;
              var previousRoutePaths = this.previousRoute.paths;

              if (currentRoutePaths[0] !== previousRoutePaths[0]) {
                  changedLevel = 0;
              }
              else if (currentRoutePaths[1] !== previousRoutePaths[1]) {
                  changedLevel = 1;
              }
              else if (currentRoutePaths[2] !== previousRoutePaths[2]) {
                  changedLevel = 2;
              }
              else if ((this.previousRoute.queryStr || '') !== this.currentRoute.queryStr) {
                  queryChanged = true;
              }
          }

          for (var i = 0; i <= this.currentRoute.maxLevel; i++) {
              var view = this.views[i];
              view.trigger('hashChange');
              if (queryChanged) {
                  view.trigger('queryChange');
              }
              if (i === changedLevel - 1) {
                  view.trigger('subpathChange');
              }
              if (i === changedLevel) {
                  this.lastLevel = i;
                  this.routeView(i, view.element);
                  break
              }
          }
      }

      routeView(level, element, defaultPath) {
          if (defaultPath) {
              if (!this.currentRoute.paths[level]) {
                  this.currentRoute.paths[level] = defaultPath;
              }
          }

          var url = this.getRouteUrl(level);
          url = pathCombine(this.props.viewsDir, url) + '.js';

          require([url], (viewOptions) => {
              if (viewOptions.documentTitle) {
                  document.title = viewOptions.documentTitle;
              }
              var extOptions = {
                  reference: element,
                  placement: 'replace',
              };
              viewOptions = Component.extendProps(viewOptions, extOptions);
              this.views[level] = Component.create(viewOptions, ViewMixin);
          });
      }

      getRouteUrl(level) {
          var paths = this.currentRoute.paths;
          var maxLevel = this.currentRoute.maxLevel;
          var path = paths[level];

          if (level < maxLevel) {
              path = pathCombine(path, '_layout');
          }

          path = prefix(path, level);

          function prefix(path, level) {
              if (level === 0) {
                  return path;
              }
              if (path[0] !== '/') {
                  path = pathCombine(paths[level - 1], path);
                  return prefix(path, level - 1)
              }
              else {
                  return path
              }
          }

          return path
      }
  }

  Component.register(App);

  class Spinner extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              type: 'border'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }
  }

  Component.register(Spinner);

  class Row extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(Row);

  class Rows extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              wrap: false,
              items: [],
              itemDefaults: null,
              gutter: 'md',
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this._propStyleClasses = ['gutter', 'align', 'justify'];
          let items = this.props.items;
          var children = [];
          if (Array.isArray(items) && items.length > 0) {
              for (var i = 0; i < items.length; i++) {
                  let item = items[i];
                  item = Component.extendProps({}, this.props.itemDefaults, item);
                  children.push({ component: Row, children: item });
              }
          }

          this.setProps({
              children: children
          });
      }
  }

  Component.register(Rows);

  class Col extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(Col);

  class Cols extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              wrap: false,
              items: [],
              itemDefaults: null,
              gutter: 'md',
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this._propStyleClasses = ['gutter', 'align', 'justify', 'fills'];
          let items = this.props.items;
          var children = [];
          if (Array.isArray(items) && items.length > 0) {
              for (var i = 0; i < items.length; i++) {
                  let item = items[i];
                  item = Component.extendProps({}, this.props.itemDefaults, item);
                  children.push({ component: Col, children: item });
              }
          }

          this.setProps({
              children: children
          });
      }
  }

  Component.register(Cols);

  class Container extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              fluid: false,
              type: null
          };

          super(Component.extendProps(defaults, props), mixins);
      }
  }

  Component.register(Container);

  let zIndex = 6666;

  function getzIndex() {
      zIndex++;
      return ++zIndex
  }

  var cachedScrollbarWidth,
      max = Math.max,
      abs = Math.abs,
      rhorizontal = /left|center|right/,
      rvertical = /top|center|bottom/,
      roffset = /[\+\-]\d+(\.[\d]+)?%?/,
      rposition = /^\w+/,
      rpercent = /%$/;

  function getOffsets(offsets, width, height) {
      return [
          parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
          parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)
      ];
  }

  function parseCss(element, property) {
      return parseInt(getComputedStyle(element)[property], 10) || 0;
  }

  function isWindow(obj) {
      return obj != null && obj === obj.window;
  }

  function getScrollTop(el) {
      var hasScrollTop = 'scrollTop' in el;
      return hasScrollTop
          ? el.scrollTop
          : isWindow(el)
              ? el.pageYOffset
              : el.defaultView.pageYOffset;
  }

  function getScrollLeft(el) {
      var hasScrollLeft = 'scrollLeft' in el;
      return hasScrollLeft
          ? el.scrollLeft
          : isWindow(el)
              ? el.pageXOffset
              : el.defaultView.pageXOffset;
  }

  function getOffsetParent(el) {
      return el.offsetParent || el
  }
  function setOffset(elem, coordinates) {
      var parentOffset = getOffsetParent(elem).getBoundingClientRect(),
          props = {
              top: coordinates.top - parentOffset.top,
              left: coordinates.left - parentOffset.left
          };

      if (getComputedStyle(elem)['position'] == 'static') props['position'] = 'relative';
      elem.style.top = props.top + 'px';
      elem.style.left = props.left + 'px';
      elem.style.position = props.position;
  }

  function getOffset(elem) {
      if (document.documentElement !== elem && !document.documentElement.contains(elem))
          return { top: 0, left: 0 }
      var obj = elem.getBoundingClientRect();
      return {
          left: obj.left + window.pageXOffset,
          top: obj.top + window.pageYOffset,
          width: Math.round(obj.width),
          height: Math.round(obj.height)
      }
  }

  function getDimensions(elem) {
      if (elem.nodeType === 9) {
          return {
              width: elem.documentElement.scrollWidth,
              height: elem.documentElement.scrollHeight,
              offset: { top: 0, left: 0 }
          };
      }
      if (isWindow(elem)) {
          return {
              width: elem.innerWidth,
              height: elem.innerHeight,
              offset: { top: elem.pageYOffset, left: elem.pageXOffset }
          };
      }
      if (elem.preventDefault) {
          return {
              width: 0,
              height: 0,
              offset: { top: elem.pageY, left: elem.pageX }
          };
      }
      var elemOffset = elem.getBoundingClientRect();
      return {
          width: elem.offsetWidth,
          height: elem.offsetHeight,
          offset: {
              left: elemOffset.left + window.pageXOffset,
              top: elemOffset.top + window.pageYOffset
          }
      };
  }

  let positionTool = {
      scrollbarWidth: function () {
          if (cachedScrollbarWidth !== undefined) {
              return cachedScrollbarWidth;
          }

          const scrollDiv = document.createElement('div');
          scrollDiv.className = 'modal-scrollbar-measure';
          document.body.appendChild(scrollDiv);
          const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
          return (cachedScrollbarWidth = scrollbarWidth)
      },
      getScrollInfo: function (within) {
          var overflowX = within.isWindow || within.isDocument ? "" :
              getComputedStyle(within.element)['overflowX'],
              overflowY = within.isWindow || within.isDocument ? "" :
                  getComputedStyle(within.element)['overflowY'],
              hasOverflowX = overflowX === "scroll" ||
                  (overflowX === "auto" && within.width < within.element.scrollWidth),
              hasOverflowY = overflowY === "scroll" ||
                  (overflowY === "auto" && within.height < within.element.scrollHeight);
          return {
              width: hasOverflowY ? positionTool.scrollbarWidth() : 0,
              height: hasOverflowX ? positionTool.scrollbarWidth() : 0
          };
      },
      getWithinInfo: function (element) {
          var withinElement = element || window,
              isElemWindow = isWindow(withinElement),
              isDocument = !!withinElement && withinElement.nodeType === 9,
              hasOffset = !isElemWindow && !isDocument;
          return {
              element: withinElement,
              isWindow: isElemWindow,
              isDocument: isDocument,
              offset: hasOffset ? getOffset(element) : { left: 0, top: 0 },
              scrollLeft: getScrollLeft(withinElement),
              scrollTop: getScrollTop(withinElement),
              width: isWindow ? withinElement.innerWidth : withinElement.offsetWidth,
              height: isWindow ? withinElement.innerHeight : withinElement.offsetHeight
          };
      }
  };



  let positionFns = {
      fit: {
          left: function (position, data) {
              var within = data.within,
                  withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
                  outerWidth = within.width,
                  collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                  overLeft = withinOffset - collisionPosLeft,
                  overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
                  newOverRight;

              // Element is wider than within
              if (data.collisionWidth > outerWidth) {

                  // Element is initially over the left side of within
                  if (overLeft > 0 && overRight <= 0) {
                      newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
                          withinOffset;
                      position.left += overLeft - newOverRight;

                      // Element is initially over right side of within
                  } else if (overRight > 0 && overLeft <= 0) {
                      position.left = withinOffset;

                      // Element is initially over both left and right sides of within
                  } else {
                      if (overLeft > overRight) {
                          position.left = withinOffset + outerWidth - data.collisionWidth;
                      } else {
                          position.left = withinOffset;
                      }
                  }

                  // Too far left -> align with left edge
              } else if (overLeft > 0) {
                  position.left += overLeft;

                  // Too far right -> align with right edge
              } else if (overRight > 0) {
                  position.left -= overRight;

                  // Adjust based on position and margin
              } else {
                  position.left = max(position.left - collisionPosLeft, position.left);
              }
          },
          top: function (position, data) {
              var within = data.within,
                  withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
                  outerHeight = data.within.height,
                  collisionPosTop = position.top - data.collisionPosition.marginTop,
                  overTop = withinOffset - collisionPosTop,
                  overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
                  newOverBottom;

              // Element is taller than within
              if (data.collisionHeight > outerHeight) {

                  // Element is initially over the top of within
                  if (overTop > 0 && overBottom <= 0) {
                      newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
                          withinOffset;
                      position.top += overTop - newOverBottom;

                      // Element is initially over bottom of within
                  } else if (overBottom > 0 && overTop <= 0) {
                      position.top = withinOffset;

                      // Element is initially over both top and bottom of within
                  } else {
                      if (overTop > overBottom) {
                          position.top = withinOffset + outerHeight - data.collisionHeight;
                      } else {
                          position.top = withinOffset;
                      }
                  }

                  // Too far up -> align with top
              } else if (overTop > 0) {
                  position.top += overTop;

                  // Too far down -> align with bottom edge
              } else if (overBottom > 0) {
                  position.top -= overBottom;

                  // Adjust based on position and margin
              } else {
                  position.top = max(position.top - collisionPosTop, position.top);
              }
          }
      },
      flip: {
          left: function (position, data) {
              var within = data.within,
                  withinOffset = within.offset.left + within.scrollLeft,
                  outerWidth = within.width,
                  offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
                  collisionPosLeft = position.left - data.collisionPosition.marginLeft,
                  overLeft = collisionPosLeft - offsetLeft,
                  overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
                  myOffset = data.my[0] === "left" ?
                      -data.elemWidth :
                      data.my[0] === "right" ?
                          data.elemWidth :
                          0,
                  atOffset = data.at[0] === "left" ?
                      data.targetWidth :
                      data.at[0] === "right" ?
                          -data.targetWidth :
                          0,
                  offset = -2 * data.offset[0],
                  newOverRight,
                  newOverLeft;

              if (overLeft < 0) {
                  newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                      outerWidth - withinOffset;
                  if (newOverRight < 0 || newOverRight < abs(overLeft)) {
                      position.left += myOffset + atOffset + offset;
                  }
              } else if (overRight > 0) {
                  newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                      atOffset + offset - offsetLeft;
                  if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
                      position.left += myOffset + atOffset + offset;
                  }
              }
          },
          top: function (position, data) {
              var within = data.within,
                  withinOffset = within.offset.top + within.scrollTop,
                  outerHeight = within.height,
                  offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
                  collisionPosTop = position.top - data.collisionPosition.marginTop,
                  overTop = collisionPosTop - offsetTop,
                  overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
                  top = data.my[1] === "top",
                  myOffset = top ?
                      -data.elemHeight :
                      data.my[1] === "bottom" ?
                          data.elemHeight :
                          0,
                  atOffset = data.at[1] === "top" ?
                      data.targetHeight :
                      data.at[1] === "bottom" ?
                          -data.targetHeight :
                          0,
                  offset = -2 * data.offset[1],
                  newOverTop,
                  newOverBottom;
              if (overTop < 0) {
                  newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                      outerHeight - withinOffset;
                  if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
                      position.top += myOffset + atOffset + offset;
                  }
              } else if (overBottom > 0) {
                  newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                      offset - offsetTop;
                  if (newOverTop > 0 || abs(newOverTop) < overBottom) {
                      position.top += myOffset + atOffset + offset;
                  }
              }
          }
      },
      flipfit: {
          left: function () {
              positionFns.flip.left.apply(this, arguments);
              positionFns.fit.left.apply(this, arguments);
          },
          top: function () {
              positionFns.flip.top.apply(this, arguments);
              positionFns.fit.top.apply(this, arguments);
          }
      }
  };

  function position(elem, options) {
      if (!options || !options.of) {
          return;
      }

      // Make a copy, we don't want to modify arguments
      options = extend({}, options);

      var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
          target = options.of,
          within = positionTool.getWithinInfo(options.within),
          scrollInfo = positionTool.getScrollInfo(within),
          collision = (options.collision || "flip").split(" "),
          offsets = {};

      dimensions = getDimensions(target);
      if (target.preventDefault) {

          // Force left top to allow flipping
          options.at = "left top";
      }
      targetWidth = dimensions.width;
      targetHeight = dimensions.height;
      targetOffset = dimensions.offset;

      // Clone to reuse original targetOffset later
      basePosition = extend({}, targetOffset);

      // Force my and at to have valid horizontal and vertical positions
      // if a value is missing or invalid, it will be converted to center
      ["my", "at"].forEach(
          function (item, i) {
              var pos = (options[item] || "").split(" "),
                  horizontalOffset,
                  verticalOffset;

              if (pos.length === 1) {
                  pos = rhorizontal.test(pos[0]) ?
                      pos.concat(["center"]) :
                      rvertical.test(pos[0]) ?
                          ["center"].concat(pos) :
                          ["center", "center"];
              }
              pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
              pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

              // Calculate offsets
              horizontalOffset = roffset.exec(pos[0]);
              verticalOffset = roffset.exec(pos[1]);
              offsets[item] = [
                  horizontalOffset ? horizontalOffset[0] : 0,
                  verticalOffset ? verticalOffset[0] : 0
              ];

              // Reduce to just the positions without the offsets
              options[item] = [
                  rposition.exec(pos[0])[0],
                  rposition.exec(pos[1])[0]
              ];
          }
      );

      // Normalize collision option
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

      atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
      basePosition.left += atOffset[0];
      basePosition.top += atOffset[1];

      var collisionPosition,
          elemWidth = elem.offsetWidth,
          elemHeight = elem.offsetHeight,
          marginLeft = parseCss(elem, "marginLeft"),
          marginTop = parseCss(elem, "marginTop"),
          collisionWidth = elemWidth + marginLeft + parseCss(elem, "marginRight") +
              scrollInfo.width,
          collisionHeight = elemHeight + marginTop + parseCss(elem, "marginBottom") +
              scrollInfo.height,
          position = extend({}, basePosition),
          myOffset = getOffsets(offsets.my, elem.offsetWidth, elem.offsetHeight);

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

      collisionPosition = {
          marginLeft: marginLeft,
          marginTop: marginTop
      };

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
                  elem: elem
              });
          }
      });

      setOffset(elem, position);
  }

  class LayerBackdrop extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              zIndex: 2,
              attrs: {
                  style: {
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      userSelect: 'none',
                      opacity: 0.1,
                      background: '#000'
                  }
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              attrs: {
                  style: {
                      zIndex: this.props.zIndex
                  }
              }
          });

          if (this.referenceElement === document.body) {
              this.setProps({
                  attrs: {
                      style: {
                          position: 'fixed'
                      }
                  }
              });
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
              collision: 'flipfit',

              closeOnClickOutside: false,
              closeToRemove: false,

              position: null,

              hidden: false,

              backdrop: false,
              closeOnClickBackdrop: false,
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.relativeElements = [];
          this._onDocumentMousedown = this._onDocumentMousedown.bind(this);
          this._onWindowResize = this._onWindowResize.bind(this);
      }

      _config() {
          if (this.props.placement === 'replace') {
              this.props.position = null;
          }
          this._normalizePosition();
          this._zIndex = getzIndex();
          this.setProps({
              attrs: {
                  style: {
                      zIndex: this._zIndex
                  }
              }
          });
          if (this.props.align) {
              this.setProps({
                  attrs: {
                      style: {
                          position: this.props.fixed ? 'fixed' : 'absolute',
                          left: 0,
                          top: 0
                      }
                  }
              });
          }
      }

      _render() {
          let that = this;

          this.addRel(this.element);
          if (this.props.backdrop) {
              this.backdrop = new LayerBackdrop({
                  zIndex: this._zIndex - 1,
                  reference: this.props.reference
              });

              if (this.props.closeOnClickBackdrop) {
                  this.backdrop._on('click', function (e) {
                      if (e.target !== e.currentTarget) {
                          return
                      }
                      that.remove();
                  });
              }
          }
      }

      _show() {
          var props = this.props;

          this.setPosition();
          this._docClickHandler();

          if (props.align) {
              window.removeEventListener('resize', this._onWindowResize, false);
              window.addEventListener('resize', this._onWindowResize, false);
          }
      }

      _hide(forceRemove) {
          window.removeEventListener('resize', this._onWindowResize, false);
          document.removeEventListener('mousedown', this._onDocumentMousedown, false);

          if (forceRemove === true || this.props.closeToRemove) {
              this.element.remove();
          }
      }

      _remove() {
          window.removeEventListener('resize', this._onWindowResize, false);
          document.removeEventListener('mousedown', this._onDocumentMousedown, false);

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
          for (var i = 0; i < this.relativeElements.length; i++) {
              var el = this.relativeElements[i];
              if (el === e.target || el.contains(e.target)) {
                  return;
              }
          }

          var closestLayer = e.target.closest('.nom-layer');
          if (closestLayer !== null) {
              var idx = closestLayer.component._zIndex;
              if (idx < this._zIndex) {
                  this.hide();
              }
          }
          else {
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
          var that = this;
          if (that.props.closeOnClickOutside) {
              document.addEventListener('mousedown', this._onDocumentMousedown, false);
          }
      }

      _normalizePosition() {
          var props = this.props;

          if (props.align) {
              props.position = {
                  of: window, collision: props.collision, within: props.within
              };

              if (props.alignTo) {
                  props.position.of = props.alignTo;
              }

              if (props.alignTo && props.alignOuter === true) {
                  var arr = props.align.split(' ');
                  if (arr.length === 1) {
                      arr[1] = 'center';
                  }

                  var myArr = ['center', 'center'];
                  var atArr = ['center', 'center'];

                  if (arr[1] === 'left') {
                      myArr[0] = 'left';
                      atArr[0] = 'left';
                  }
                  else if (arr[1] === 'right') {
                      myArr[0] = 'right';
                      atArr[0] = 'right';
                  }
                  else if (arr[1] === 'top') {
                      myArr[1] = 'top';
                      atArr[1] = 'top';
                  }
                  else if (arr[1] === 'bottom') {
                      myArr[1] = 'bottom';
                      atArr[1] = 'bottom';
                  }

                  if (arr[0] === 'top') {
                      myArr[1] = 'bottom';
                      atArr[1] = 'top';
                  }
                  else if (arr[0] === 'bottom') {
                      myArr[1] = 'top';
                      atArr[1] = 'bottom';
                  }
                  else if (arr[0] === 'left') {
                      myArr[0] = 'right';
                      atArr[0] = 'left';
                  }
                  else if (arr[0] === 'right') {
                      myArr[0] = 'left';
                      atArr[0] = 'right';
                  }

                  props.position.my = myArr[0] + ' ' + myArr[1];
                  props.position.at = atArr[0] + ' ' + atArr[1];
              }
              else {
                  var rhorizontal = /left|center|right/;
                  var rvertical = /top|center|bottom/;
                  var pos = props.align.split(' ');
                  if (pos.length === 1) {
                      pos = rhorizontal.test(pos[0]) ?
                          pos.concat(["center"]) :
                          rvertical.test(pos[0]) ?
                              ["center"].concat(pos) :
                              ["center", "center"];
                  }
                  pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
                  pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";

                  props.position.my = pos[0] + ' ' + pos[1];
                  props.position.at = pos[0] + ' ' + pos[1];
              }
          }
      }
  }

  Component.register(Layer);

  class Message extends Layer {
      constructor(props, ...mixins) {
          const defaults = {
              type: null,
              icon: null,
              content: null,
              commands: null,
              duration: 2,
              closeToRemove: true,
              showClose: false,
              position: {
                  my: "center center",
                  at: "center center",
                  of: window
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          const iconMap = {
              info: 'info',
              success: 'success',
              error: 'warn',
              warning: 'warn'
          };

          var icon = this.props.icon || iconMap[this.props.type];
          this.props.content = Component.normalizeTemplateProps(this.props.content);
          this.setProps({
              content: {
                  classes: {
                      'nom-message-content': true
                  }
              }
          });
          this.setProps({
              children:[
                  Component.normalizeIconProps(icon),
                  this.props.content,
                  this.props.showClose && { component: 'Button', icon: 'close' }
              ]
          });
      }

      _render() {
          var that = this, props = this.props;

          if (props.duration) {
              setTimeout(function () {
                  that.close();
              }, 1000 * props.duration);
          }
      }
  }

  Component.register(Message);

  class Popup extends Layer {
      constructor(props, ...mixins) {
          const defaults = {
              trigger: null,
              triggerAction: 'click',
              align: 'bottom left',
              alignOuter: true,

              closeOnClickOutside: true,
              placement: 'append',

              autoRender: false,
              hidden: true,

              type: 'default'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          super._create();

          this._showHandler = this._showHandler.bind(this);
          this._hideHandler = this._hideHandler.bind(this);
          this._onOpenerClickHandler = this._onOpenerClickHandler.bind(this);

          this.opener = this.props.trigger;
          this.props.alignTo = this.opener.element;
          this.showTimer = null, this.hideTimer = null;
          this.addRel(this.opener.element);
          this._bindTrigger();
      }

      _bindTrigger() {
          var triggerAction = this.props.triggerAction;
          if (triggerAction === 'click') {
              this._bindClick();
          } else {
              this._bindHover();
          }
      }

      _bindClick() {
          this.opener._on('click', this._onOpenerClickHandler);
      }

      _bindHover() {
          this.opener._on('mouseenter', this._showHandler);
          this.opener._on('mouseleave', this._hideHandler);
      }

      _onOpenerClickHandler() {
          this.toggleHidden();
      }

      _showHandler() {
          clearTimeout(this.hideTimer);
          this.hideTimer = null;
          this.showTimer = setTimeout(() => {
              this.show();
          }, this.delay);
      }

      _hideHandler() {
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
          if (this.props.triggerAction === 'hover') {
              this._off('mouseenter');
              this._on('mouseenter', () => {
                  clearTimeout(this.hideTimer);
              });
              this._off('mouseleave');
              this._on('mouseleave', this._hideHandler);
          }
      }
  }

  Component.mixin({
      _render: function () {
          if (this.props.popup) {
              this.props.popup.trigger = this;
              this.popup = new Popup(this.props.popup);
          }
      }
  });

  Component.register(Popup);

  class Tooltip extends Layer {
      constructor(props, ...mixins) {
          const defaults = {
              trigger: null,
              align: 'top',
              alignOuter: true,

              closeOnClickOutside: true,

              autoRender: false,
              hidden: false,

              styles: {
                  color: 'black'
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          super._create();

          this._showHandler = this._showHandler.bind(this);
          this._hideHandler = this._hideHandler.bind(this);
          this._onOpenerFocusinHandler = this._onOpenerFocusinHandler.bind(this);
          this._onOpenerFocusoutHandler = this._onOpenerFocusoutHandler.bind(this);

          this._openerFocusing = false;
          this.opener = this.props.trigger;
          this.props.alignTo = this.opener.element;
          this.showTimer = null, this.hideTimer = null;
          this.delay = 100;
          this.addRel(this.opener.element);
          this._bindHover();
      }

      _remove() {
          this.opener._off('mouseenter', this._showHandler);
          this.opener._off('mouseleave', this._hideHandler);
          this.opener._off('focusin', this._onOpenerFocusinHandler);
          this.opener._off('focusout', this._onOpenerFocusoutHandler);

          this._off('mouseenter');
          this._off('mouseleave');
          clearTimeout(this.showTimer);
          this.showTimer = null;
          clearTimeout(this.hideTimer);
          this.hideTimer = null;
          super._remove();
      }

      _bindHover() {
          this.opener._on('mouseenter', this._showHandler);
          this.opener._on('mouseleave', this._hideHandler);
          this.opener._on('focusin', this._onOpenerFocusinHandler);
          this.opener._on('focusout', this._onOpenerFocusoutHandler);
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
              return
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
          this._off('mouseenter');
          this._on('mouseenter', function () {
              clearTimeout(this.hideTimer);
          });
          this._off('mouseleave', this._hideHandler);
          this._on('mouseleave', this._hideHandler);
      }
  }

  Component.mixin({
      _render: function () {
          if (this.props.tooltip) {
              if (isString(this.props.tooltip)) {
                  this.tooltip = new Tooltip({ trigger: this, children: this.props.tooltip });
              }
              else {
                  this.tooltip = new Tooltip(Component.extendProps({}, this.props.tooltip), { trigger: this });
              }
          }
      }
  });

  Component.register(Tooltip);

  class Loading extends Layer {
      constructor(props, ...mixins) {
          const defaults = {
              align: 'center',
              container: document.body,
              backdrop: true,
              collision: 'none',
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              reference: this.props.container,
              alignTo: this.getElement(this.props.container),
              children: {
                  component: Spinner
              }
          });

          if (this.props.container instanceof Component) {
              this.props.container.addClass('nom-loading-container');
          }
          else {
              this.props.container.component.addClass('nom-loading-container');
          }

          super._config();
      }

      _remove() {
          if (this.props.container instanceof Component) {
              this.props.container.removeClass('nom-loading-container');
          }
          else {
              this.props.container.component.removeClass('nom-loading-container');
          }

          super._remove();
      }
  }

  Component.register(Loading);

  class ModalHeader extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              icon: null,
              image: null,
              title: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.modalContent = this.parent;
          this.modal = this.modalContent.modal;
      }

      _config() {
          var that = this;

          this.setProps({
              children: [
                  { tag: 'h5', children: this.props.title },
                  {
                      component: 'Button', 
                      icon: 'close',                     
                      attrs: {
                          onclick: function () {
                              that.modal.close();
                          }
                      }
                  }
              ]
          });
      }
  }

  Component.register(ModalHeader);

  class ModalBody extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(ModalBody);

  class ModalFooter extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(ModalFooter);

  class ModalContent extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              header: { component: ModalHeader },
              body: { component: ModalBody },
              footer: { component: ModalFooter }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.modal = this.parent.modal;
      }

      _config() {
          this.setProps({
              tag: 'div',
              children: [
                  this.props.header,
                  this.props.body,
                  this.props.footer
              ]
          });
      }
  }

  Component.register(ModalContent);

  class ModalDialog extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              children: { component: ModalContent }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.modal = this.parent;
      }

      _config() {
          if (isString(this.props.content)) {
              this.setProps({
                  component: 'view',
                  url: this.props.content,
                  view: {
                      component: ModalContent
                  }
              });
          }
      }
  }

  Component.register(ModalDialog);

  class Modal extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              content: {},
              closeOnClickOutside: false
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.bodyElem = document.body;
      }

      _config() {
          this.setProps({
              children: {
                  component: ModalDialog,
                  children: this.props.content
              }
          });
      }

      _show() {
          this.setzIndex();
          this.checkScrollbar();
          this.setScrollbar();
      }

      close(result) {
          var that = this;

          if (!this.rendered) {
              return;
          }

          if (this.element === undefined) {
              return;
          }

          if (result !== undefined) {
              that.returnValue = result;
          }

          var modalCount = this.bodyElem.modalCount;
          if (modalCount) {
              modalCount--;
              this.bodyElem.modalCount = modalCount;
              if (modalCount === 0) {
                  this.resetScrollbar();
              }
          }

          this.trigger('close', { result: result });
          this.remove();
      }

      setzIndex() {
          this.element.style.zIndex = getzIndex();
      }

      checkScrollbar() {
          var fullWindowWidth = window.innerWidth;
          this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
          this.scrollbarWidth = positionTool.scrollbarWidth();
      }
  }

  Component.register(Modal);

  class AlertContent extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              title: null,
              description: null,
              icon: null,
              type: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          var title = this.props.title;
          if (isString(title)) {
              title = {
                  children: this.props.title
              };
          }
          var description = this.props.description;
          if (isString(description)) {
              description = {
                  children: this.props.description
              };
          }
          this.setProps({
              children: [
                  title,
                  description
              ]
          });
      }
  }

  Component.register(AlertContent);

  class Alert extends Modal {
      constructor(props, ...mixins) {
          const defaults = {
              type: 'default',
              icon: null,
              title: null,
              description: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              children: {
                  component: ModalDialog,
                  children: {
                      component: AlertContent,
                      type: this.props.type,
                      icon: this.props.icon,
                      title: this.props.title,
                      description: this.props.description
                  }
              }
          });
      }
  }

  Component.register(Alert);

  class LayoutHeader extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(LayoutHeader);

  class LayoutBody extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(LayoutBody);

  class LayoutFooter extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(LayoutFooter);

  class LayoutSider extends Component {
      constructor(props, ...mixins) {
          super(props);
      }
  }

  Component.register(LayoutSider);

  class Layout extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              header: null,
              body: null,
              footer: null,
              sider: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps(
              {
                  tag: 'div',
                  header: this.props.header && { component: LayoutHeader },
                  body: this.props.body && { component: LayoutBody },
                  footer: this.props.footer && { component: LayoutFooter },
                  sider: this.props.sider && { component: LayoutSider }
              }
          );

          if (this.props.sider) {
              this.setProps({
                  classes: {
                      'p-has-sider': true
                  },
                  children: [
                      this.props.sider && this.props.sider,
                      this.props.body && this.props.body
                  ]
              });
          }
          else {
              this.setProps({
                  children: [
                      this.props.header && this.props.header,
                      this.props.body && this.props.body,
                      this.props.footer && this.props.footer
                  ]
              });
          }
      }
  }

  Component.register(Layout);

  class Cssicon extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              type: '',
              tag: 'i'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          var classes = {};
          classes['icon-' + this.props.type] = true;

          this.setProps({
              classes: classes
          });
      }
  }

  Component.register(Cssicon);

  class Icon extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              border: false,
              background: false,
              iconPrefix: 'icon',
              tag: 'span',
              box: true,
              i: {
                  component: Cssicon
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              children: [
                  {
                      component: Cssicon,
                      type: this.props.type
                  }
              ]
          });
      }
  }

  Component.normalizeIconProps = function (props) {
      if (props === null || props === undefined) {
          return null
      }
      var iconProps = {};
      if (isString(props)) {
          iconProps.type = props;
      }
      else if (isPlainObject(props)) {
          iconProps = props;
      }
      else {
          return null
      }
      iconProps.component = Icon;

      return iconProps
  };

  Component.register(Icon);

  class Caption extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              title: '',
              subtitle: '',
              icon: null,
              image: null,
              titleLevel: 5
          };

          let tagProp = props.href ? { tag: 'a' } : {};

          super(Component.extendProps(defaults, props, tagProp), ...mixins);
      }

      _config() {
          let { title, subtitle, icon, image, href, titleLevel } = this.props;
          let children = [];
          if (image) {
              children.push({ tag: 'img', attrs: { src: image } });
          }
          else if (icon) {
              children.push(Component.normalizeIconProps(icon));
          }
          let titleTag = `h${titleLevel}`;
          children.push({
              tag: titleTag,
              classes: {
                  'nom-caption-title': true
              },
              children: [
                  title,
                  subtitle && { tag: 'small', children: subtitle }
              ]
          });
          if (href) {
              this.setProps({ attrs: { href: href } });
          }
          this.setProps({
              children: children
          });
      }
  }

  Component.register(Caption);

  class NavbarCaption extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(NavbarCaption);

  class NavbarNav extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(NavbarNav);

  class NavbarTools extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(NavbarTools);

  class Navbar extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              caption: null,
              nav: null,
              tools: null,
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      config() {
          let { caption, nav, tools } = this.props;
          let toolsProps;
          let captionProps = caption ? Component.extendProps({ component: Caption, titleLevel: 3 }, caption) : null;
          let navProps = nav ? Component.extendProps({ component: Cols }, nav) : null;
          if (Array.isArray(tools)) {
              toolsProps = { component: Cols, items: tools };
          }
          else if (isPlainObject(tools)) {
              toolsProps = Component.extendProps({ component: Cols }, tools);
          }

          this.setProps({
              children: [
                  captionProps && { component: NavbarCaption, children: captionProps },
                  navProps && { component: NavbarNav, children: navProps },
                  toolsProps && { component: NavbarTools, children: toolsProps },
              ]
          });
      }
  }

  Component.register(Navbar);

  var ListItemMixin = {
      _create: function () {
          this.wrapper = this.parent;
          this.wrapper.item = this;
          this.list = this.wrapper.list;
          this.list.itemRefs[this.key] = this;
      },
      _config: function () {
          var listProps = this.list.props;
          var selectedItems = this.list.selectedItems !== null
              ? Array.isArray(listProps.selectedItems)
                  ? listProps.selectedItems
                  : [listProps.selectedItems]
              : [];

          this.on('select', function () {
              if (listProps.itemSelectable.multiple === false) {
                  listProps.selectedItems = this.key;
                  if (this.list.selectedItem !== null) {
                      this.list.selectedItem.unselect({ triggerSelectionChange: false });
                  }
                  this.list.selectedItem = this;
              }
          });
          this.on('unselect', function () {
              if (listProps.selectedItems === this.key) {
                  listProps.selectedItems = null;
              }
              if (this.list.selectedItem === this) {
                  this.list.selectedItem = null;
              }
          });
          this.on('selectionChange', function () {
              this.list.trigger('itemSelectionChange');
          });

          this.setProps({
              selected: selectedItems.indexOf(this.key) !== -1,
              selectable: {
                  byClick: listProps.itemSelectable.byClick,
                  canRevert: listProps.itemSelectable.multiple === true
              }
          });
      },
      _render: function () {
          var listProps = this.list.props;
          if (listProps.itemSelectable.multiple === false) {
              if (this.props.selected) {
                  this.list.selectedItem = this;
              }
          }
      },
      _remove: function () {
          delete this.list.itemRefs[this.key];
      }
  };

  class ListItemWrapper extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'li',
              item: {},
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this._propStyleClasses = ['span'];
          this.list = this.parent;
      }

      _config() {
          this.setProps({
              selectable: false,
              children: {
                  props: this.props.item,
                  mixins: [ListItemMixin]
              }
          });
      }
  }

  Component.register(ListItemWrapper);

  class List extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'ul',
              items: [],
              itemDefaults: {},

              selectedItems: null,

              itemSelectable: {
                  multiple: false,
                  byClick: false
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.itemRefs = {};
          this.selectedItem = null;
      }

      _config() {
          this._propStyleClasses = ['gutter', 'line', 'align', 'justify', 'cols'];
          let { items, itemDefaults, wrappers, wrapperDefaults } = this.props;
          var children = [];
          if (Array.isArray(wrappers) && wrappers.length > 0) {
              for (var i = 0; i < wrappers.length; i++) {
                  let wrapper = wrappers[i];
                  wrapper = Component.extendProps({}, { component: ListItemWrapper }, wrapperDefaults, wrapper);
                  children.push(wrapper);
              }
          }
          else if (Array.isArray(items) && items.length > 0) {
              for (var i = 0; i < items.length; i++) {
                  var item = items[i];
                  item = Component.extendProps({}, itemDefaults, item);
                  children.push({ component: ListItemWrapper, item: item });
              }
          }

          this.setProps({
              children: children
          });
      }

      getItem(param) {
          var retItem = null;

          if (isFunction(param)) {
              for (var key in this.itemRefs) {
                  if (this.itemRefs.hasOwnProperty(key)) {
                      if (param.call(this.itemRefs[key]) === true) {
                          retItem = this.itemRefs[key];
                          break
                      }
                  }
              }
          }
          else {
              return this.itemRefs[param]
          }

          return retItem
      }

      selectItem(param, selectOption) {
          var item = this.getItem(param);
          item && item.select(selectOption);
      }

      selectItems(param, selectOption) {
          selectOption = extend(
              {
                  triggerSelect: true,
                  triggerSelectionChange: true
              },
              selectOption
          );
          var itemSelectionChanged = false;
          param = Array.isArray(param) ? param : [param];
          for (var i = 0; i < param.length; i++) {
              itemSelectionChanged = this.selectItem(param[i], { triggerSelect: selectOption.triggerSelect, triggerSelectionChange: false }) || itemSelectionChanged;
          }
          if (selectOption.triggerSelectionChange === true && itemSelectionChanged) {
              this.trigger('itemSelectionChange');
          }
          return itemSelectionChanged
      }

      selectAllItems(selectOption) {
          return this.selectItems(this.getChildren(), selectOption)
      }

      unselectItem(param, unselectOption) {
          unselectOption = extend(
              {
                  triggerUnselect: true,
                  triggerSelectionChange: true
              },
              unselectOption
          );
          var item = this.getItem(param);
          item && item.unselect(unselectOption);
      }

      unselectItems(param, unselectOption) {
          unselectOption = extend(
              {
                  triggerUnselect: true,
                  triggerSelectionChange: true
              },
              unselectOption
          );
          var itemSelectionChanged = false;
          if (Array.isArray(param)) {
              for (var i = 0; i < param.length; i++) {
                  itemSelectionChanged = this.unselectItem(param[i], { triggerUnselect: unselectOption.triggerUnselect, triggerSelectionChange: false }) || itemSelectionChanged;
              }
          }
          if (unselectOption.triggerSelectionChange && itemSelectionChanged) {
              this.trigger('itemSelectionChange');
          }
          return itemSelectionChanged;
      }

      unselectAllItems(unselectOption) {
          return this.unselectItems(this.getChildren(), unselectOption)
      }

      getAllItems() {
          var items = [];
          var children = this.getChildren();
          for (var i = 0; i < children.length; i++) {
              var itemWrapper = children[i];
              items.push(itemWrapper.item);
          }
          return items
      }

      getSelectedItem() {
          return this.selectedItem
      }

      getSelectedItems() {
          var selectedItems = [];
          var children = this.getChildren();
          for (var i = 0; i < children.length; i++) {
              var item = children[i].item;
              if (item.props.selected) {
                  selectedItems.push(item);
              }
          }
          return selectedItems
      }

      appendItem(itemProps) {
          itemProps = Component.extendProps({}, this.props.itemDefaults, itemProps);
          var itemWrapperProps = { component: ListItemWrapper, item: itemProps };
          this.appendChild(itemWrapperProps);
      }

      removeItem(param) {
          var item = this.getItem(param);
          if (item !== null) {
              item.wrapper.remove();
          }
      }

      removeItems(param) {
          if (Array.isArray(param)) {
              for (var i = 0; i < param.length; i++) {
                  this.removeItem(param[i]);
              }
          }
      }
  }

  Component.register(List);

  class TabItem extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'a',
              url: null,
              icon: null,
              text: null,
              subtext: null,
              selectable: {
                  byClick: true
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          let { icon, text, subtext } = this.props;
          this.setProps({
              attrs: {
                  href: this.getItemUrl(this.props.url)
              },
              children: [
                  icon && { component: 'Icon', type: icon },
                  text && { tag: 'span', children: text },
                  subtext && { tag: 'span', children: subtext }
              ]
          });
      }

      _select() {
          let tabContent = this.list.getTabContent();
          tabContent.showPanel(this.key);
      }

      getItemUrl(url) {
          if (url) {
              return url
          }
          else {
              return 'javascript:void(0);'
          }
      }
  }

  Component.register(TabItem);

  class TabList extends List {
      constructor(props, ...mixins) {
          const defaults = {
              itemDefaults: {
                  component: TabItem
              },
              tabContent: null,
              type: 'horizontal',
              itemSelectable: {
                  byClick: true
              },
              gutter: 'md'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      getTabContent() {
          return this.props.tabContent.call(this)
      }
  }

  Component.register(TabList);

  class TabPanel extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              hidden: true
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.tabContent = this.parent;
          this.tabContent.panels[this.key] = this;
      }

      _config() {
          this.setProps({
              hidden: this.key !== this.tabContent.props.selectedPanel
          });
      }

      _show() {
          this.tabContent.shownPanel && this.tabContent.shownPanel.hide();
          this.tabContent.shownPanel = this;
      }
  }

  Component.register(TabPanel);

  class TabContent extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              panels: [],
              panelDefaults: { component: TabPanel }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.panels = {};
          this.shownPanel = null;
      }

      _config() {
          var panels = this.props.panels;
          var children = [];
          if (Array.isArray(panels) && panels.length > 0) {
              for (var i = 0; i < panels.length; i++) {
                  var panel = panels[i];
                  panel = Component.extendProps({}, this.props.panelDefaults, panel);
                  children.push(panel);
              }
          }

          this.setProps({
              children: children
          });
      }

      getPanel(param) {
          var retPanel = null;

          if (isString(param)) {
              return this.panels[param]
          }
          else if (isFunction(param)) {
              for (var panel in this.panels) {
                  if (this.panels.hasOwnProperty(panel)) {
                      if (param.call(this.panels[panel]) === true) {
                          retPanel = this.panels[panel];
                          break
                      }
                  }
              }
          }

          return retPanel
      }

      showPanel(param) {
          var panel = this.getPanel(param);
          if (panel === null) {
              return false
          }
          panel.show();
      }
  }

  Component.register(TabContent);

  class Tabs extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tabs: [],
              selectedTab: 0
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          var that = this;
          var tabItems = [];
          var tabPanles = [];
          for (var i = 0; i < this.props.tabs.length; i++) {
              var tab = this.props.tabs[i];
              tab.item.key = tab.item.key || 'tab' + i;
              tab.panel.key = tab.panel.key || 'tab' + i;
              tabItems.push(tab.item);
              tabPanles.push(tab.panel);
          }

          this.setProps({
              tabList: {
                  component: TabList,
                  name: 'tabList',
                  items: tabItems,
                  selectedItems: this.props.selectedTab,
                  tabContent: function () {
                      return that.tabContent;
                  }
              },
              tabContent: {
                  component: TabContent,
                  panels: tabPanles,
                  _create: function () {
                      that.tabContent = this;
                  }
              }
          });

          this.setProps({
              children: [
                  this.props.tabList,
                  this.props.tabContent
              ]
          });
      }
  }

  Component.register(Tabs);

  class Pager extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              pageIndex: 1,
              pageSize: 10,
              totalCount: 0,
              displayItemCount: 5,
              edgeItemCount: 1,

              prevShowAlways: true,
              nextShowAlways: true,

              texts: {
                  prev: '上一页',
                  next: '下一页',
                  ellipse: "..."
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          var pager = this;

          this.setProps({
              children: {
                  component: List,
                  gutter: 'md',
                  items: pager.getPageItems(),
                  itemDefaults: {
                      tag: 'a',
                      key() {
                          return this.props.pageNumber
                      },
                      _config: function () {
                          this.setProps({
                              children: this.props.text + ''
                          });
                      },
                  },
                  itemSelectable: {
                      byClick: true
                  },
                  selectedItems: pager.props.pageIndex,
                  events: {
                      itemSelectionChange: function () {
                          pager.props.pageIndex = this.selectedItem.props.pageNumber;
                          pager.trigger("pageChange", {
                              pageIndex: pager.props.pageIndex,
                              pageSize: pager.props.pageSize,
                          });
                      }
                  }
              }
          });
      }

      /**
      * 极端分页的起始和结束点，取决于pageIndex 和 displayItemCount.
      * @返回 {数组(Array)}
      */
      _getInterval() {
          var props = this.props;
          var pageIndex = props.pageIndex;
          var displayItemHalf = Math.floor(props.displayItemCount / 2);
          var pageCount = this._getPageCount();
          var upper_limit = pageCount - props.displayItemCount;
          var start = pageIndex > displayItemHalf ? Math.max(Math.min(pageIndex - displayItemHalf, upper_limit), 1) : 1;
          var end = pageIndex > displayItemHalf ? Math.min(pageIndex + displayItemHalf, pageCount) : Math.min(props.displayItemCount, pageCount);
          return [start, end]
      }

      _getPageCount() {
          return Math.ceil(this.props.totalCount / this.props.pageSize)
      }

      getPageItems() {
          var items = [];
          var props = this.props;
          if (props.totalCount === 0) {
              return items
          }
          var pageIndex = props.pageIndex;
          var interval = this._getInterval();
          var pageCount = this._getPageCount();

          // 产生"Previous"-链接
          if (props.texts.prev && (pageIndex > 1 || props.prevShowAlways)) {
              items.push({
                  pageNumber: pageIndex - 1,
                  text: props.texts.prev,
                  classes: { 'prev': true }
              });
          }
          // 产生起始点
          if (interval[0] > 1 && props.edgeItemCount > 0) {
              var end = Math.min(props.edgeItemCount, interval[0] - 1);
              for (var i = 1; i <= end; i++) {
                  items.push({
                      pageNumber: i,
                      text: i,
                      classes: ''
                  });
              }
              if (props.edgeItemCount < interval[0] - 1 && props.texts.ellipse) {
                  items.push({
                      pageNumber: null,
                      text: props.texts.ellipse,
                      classes: { 'space': true },
                      space: true
                  });
              }
          }

          // 产生内部的那些链接
          for (var i = interval[0]; i <= interval[1]; i++) {
              items.push({
                  pageNumber: i,
                  text: i,
                  classes: ''
              });
          }
          // 产生结束点
          if (interval[1] < pageCount && props.edgeItemCount > 0) {
              if (pageCount - props.edgeItemCount > interval[1] && props.texts.ellipse) {
                  items.push({
                      pageNumber: null,
                      text: props.texts.ellipse,
                      classes: { 'space': true },
                      space: true
                  });
              }
              var begin = Math.max(pageCount - props.edgeItemCount + 1, interval[1]);
              for (var i = begin; i <= pageCount; i++) {
                  items.push({
                      pageNumber: i,
                      text: i,
                      classes: ''
                  });
              }

          }
          // 产生 "Next"-链接
          if (props.texts.next && (pageIndex < pageCount || props.nextShowAlways)) {
              items.push({
                  pageNumber: pageIndex + 1,
                  text: props.texts.next,
                  classes: { 'next': true },
              });
          }

          return items
      }
  }

  Component.register(Pager);

  class PanelHeaderCaption extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(PanelHeaderCaption);

  class PanelHeaderNav extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(PanelHeaderNav);

  class PanelHeaderTools extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(PanelHeaderTools);

  class PanelHeader extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              caption: null,
              nav: null,
              tools: null,
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      config() {
          let { caption, nav, tools } = this.props;
          let toolsProps;
          let captionProps = caption ? Component.extendProps({ component: Caption }, caption) : null;
          let navProps = nav ? Component.extendProps({ component: Cols }, nav) : null;
          if (Array.isArray(tools)) {
              toolsProps = { component: Cols, items: tools };
          }
          else if (isPlainObject(tools)) {
              toolsProps = Component.extendProps({ component: Cols }, tools);
          }

          this.setProps({
              children: [
                  captionProps && { component: PanelHeaderCaption, children: captionProps },
                  navProps && { component: PanelHeaderNav, children: navProps },
                  toolsProps && { component: PanelHeaderTools, children: toolsProps },
              ]
          });
      }
  }

  Component.register(PanelHeader);

  class PanelBody extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(PanelBody);

  class PanelFooter extends Component {
      constructor(props, ...mixins) {
          super(props, ...mixins);
      }
  }

  Component.register(PanelFooter);

  class Panel extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              header: null,
              body: null,
              footer: null,
              type: 'default',
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          let { header, body, footer } = this.props;
          let footerProps;
          let headerProps = Component.extendProps({ component: PanelHeader }, header);
          let bodyProps = Component.extendProps({ component: PanelBody }, body);
          if (footer) {
              footerProps = Component.extendProps({ component: PanelFooter }, footer);
          }

          this.setProps({
              children: [
                  headerProps,
                  bodyProps,
                  footerProps,
              ]
          });
      }
  }

  Component.register(Panel);

  class MenuItem extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'a',
              url: null,
              icon: null,
              text: null,
              subtext: null,
              indicator: {
                  component: 'Icon',
                  expandable: {
                      expandedProps: {
                          type: 'arrow-up'
                      },
                      collapsedProps: {
                          type: 'arrow-down'
                      }
                  },
                  type: 'arrow-down'
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
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
      }

      _config() {
          var menu = this.menu, menuProps = menu.props;

          var indicatorIconType = 'arrow-down';
          if (menuProps.type === 'horizontal' && this.level > 0) {
              indicatorIconType = 'arrow-right';
          }


          if (menuProps.type === 'horizontal') {
              this.setProps({
                  indicator: {
                      expandable: false
                  }
              });
          }

          this.setProps({
              indicator: {
                  type: indicatorIconType,
                  classes: { 'nom-menu-toggler': true },
                  _create() {
                      this.parent.indicator = this;
                  }
              },
              expandable: {
                  byClick: !this.isLeaf,
                  target: function () {
                      return this.wrapper.submenu
                  },
              },
              attrs: {
                  href: this.getItemUrl(this.props.url),
                  style: {
                      paddingLeft: menuProps.type === 'vertical' ? (this.level + 1) * menuProps.indent + 'rem' : null
                  }
              },
              events: {
                  select() {
                      if (menu.selectedItem !== null) menu.selectedItem.unselect();
                      menu.selectedItem = this;
                  },
                  unselect() {
                      if (menu.selectedItem === this) menu.selectedItem = null;
                  }
              }
          });

          this.setProps({
              children: [
                  this.props.icon && { component: 'icon', type: this.props.icon },
                  { component: Component, tag: 'span', classes: { 'text': true }, children: this.props.text },
                  this.props.subtext && { component: Component, tag: 'span', classes: { 'subtext': true }, children: this.props.subtext },
                  this.props.indicator && !this.isLeaf && this.props.indicator
              ]
          });
      }

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
          else {
              return 'javascript:void(0);'
          }
      }
  }

  Component.register(MenuItem);

  class MenuSub extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'ul',
              itemDefaults: {
                  component: 'menu-item'
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.wrapper = this.props.wrapper || this.parent;
          this.wrapper.submenu = this;
          this.menu = this.wrapper.menu;
          this.props.itemDefaults = this.menu.props.itemDefaults;
      }

      _config() {
          var that = this;

          var children = Array.isArray(this.props.items) && this.props.items.map(function (item) {
              return {
                  component: 'MenuItemWrapper',
                  item: Component.extendProps({}, that.props.itemDefaults, item),
                  items: item.items
              }
          });

          var typeClass = 'nom-menu-' + this.menu.props.type;
          var classes = {};
          classes[typeClass] = true;
          this.setProps({
              classes: classes,
              children: children
          });
      }
  }

  Component.register(MenuSub);

  class MenuItemWrapper extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'li',
              item: {
                  component: MenuItem
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.isLeaf = false;
          this.level = 0;
          this.parentWrapper = null;

          if (this.parent instanceof Component.components['Menu']) {
              this.menu = this.parent;
          }
          else if (this.parent instanceof Component.components['MenuSub']) {
              this.menu = this.parent.menu;
              this.parentWrapper = this.parent.wrapper;
          }

          if (this.parentWrapper) {
              this.level = this.parentWrapper.level + 1;
          }

          this.isLeaf = !Array.isArray(this.props.item.items) || this.props.item.items.length < 1;
      }

      _config() {
          var that = this;
          var menu = this.menu, menuProps = menu.props;
          var expanded = menuProps.type === 'horizontal' || menuProps.itemExpandable.initExpandLevel >= this.level;

          this.setProps({
              submenu: menuProps.submenu
          });

          this.setProps({
              submenu: {
                  component: MenuSub,
                  name: 'submenu',
                  items: this.props.item.items,
                  hidden: !expanded
              }
          });

          if (menuProps.type === 'horizontal' && !this.isLeaf) {
              var reference = document.body;
              if (this.level > 0) {
                  reference = this;
              }
              var align = 'bottom left';
              if (this.level > 0) {
                  align = 'right top';
              }

              this.setProps({
                  submenu: {
                      wrapper: that
                  }
              });

              this.setProps({
                  item: {
                      popup: {
                          triggerAction: 'hover',
                          align: align,
                          reference: reference,
                          children: this.props.submenu,
                      }
                  }
              });
          }

          this.setProps({
              children: [
                  this.props.item,
                  (!this.isLeaf && menuProps.type === 'vertical') && this.props.submenu
              ]
          });
      }
  }

  Component.register(MenuItemWrapper);

  class Menu extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'ul',
              items: [],
              itemDefaults: {
                  component: MenuItem
              },
              itemSelectable: {
                  onlyleaf: false
              },
              itemExpandable: {
                  expandSingle: true,
                  initExpandLevel: -1
              },

              indent: 1.5,

              type: 'vertical'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.itemRefs = [];
          this.selectedItem = null;
      }

      _config() {
          var that = this;
          var children = this.props.items.map(function (item) {
              return { component: MenuItemWrapper, item: Component.extendProps({}, that.props.itemDefaults, item) }
          });

          this.setProps({
              children: children
          });
      }

      getItem(param) {
          var retItem = null;

          if (isFunction(param)) {
              for (var key in this.itemRefs) {
                  if (this.itemRefs.hasOwnProperty(key)) {
                      if (param.call(this.itemRefs[key]) === true) {
                          retItem = this.itemRefs[key];
                          break
                      }
                  }
              }
          }
          else {
              return this.itemRefs[param] || null
          }

          return retItem
      }

      selectItem(param, selectOption) {
          var item = this.getItem(param);
          if (item === null || item === undefined) {
              return false
          }
          return item.select(selectOption)
      }

      unselectItem(param, unselectOption) {
          unselectOption = extend(
              {
                  triggerUnselect: true,
                  triggerSelectionChange: true
              },
              unselectOption
          );
          var item = this.getItem(param);
          if (item === null) {
              return false
          } else {
              return item.unselect(unselectOption)
          }
      }

      getSelectedItem() {
          return this.selectedItem
      }

      expandToItem(param) {
          var item = this.getItem(param);
          if (item !== null) {
              var p = item.parentItem;
              while (p) {
                  p.expand();
                  p = p.parentItem;
              }
          }
      }
  }

  Component.register(Menu);

  class Button extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'button',
              text: null,
              icon: null,
              rightIcon: null,
              hoverable: true,
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this._propStyleClasses = ['size'];
          let { icon, text, rightIcon, href } = this.props;

          if (icon || rightIcon) {
              this.setProps({
                  classes: {
                      'p-with-icon': true
                  }
              });
          }

          this.setProps({
              children: [
                  Component.normalizeIconProps(icon),
                  text && { tag: 'span', children: text },
                  Component.normalizeIconProps(rightIcon)
              ]
          });

          if (href) {
              this.setProps({
                  tag: 'a',
                  attrs: {
                      href: href
                  }
              });
          }
      }

      _disable() {
          this.element.setAttribute('disabled', 'disabled');
      }
  }

  Component.register(Button);

  class ColGroupCol extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'col',
              column: {}
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          let { width } = this.props.column;
          let widthPx = null;
          if (width) {
              widthPx = width + 'px';
          }
          this.setProps({
              attrs: {
                  style: {
                      width: widthPx
                  }
              }
          });
      }
  }

  Component.register(ColGroupCol);

  class ColGroup extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'colgroup'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.table = this.parent;
          this.columns = this.table.props.columns;
      }

      _config() {
          let children = [];

          if (Array.isArray(this.columns)) {
              children = this.columns.map(function (column) {
                  return {
                      component: ColGroupCol,
                      name: column.field,
                      column: column
                  }
              });
          }

          this.setProps({
              children: children
          });
      }
  }

  Component.register(ColGroup);

  class Th extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'th',
              column: {}
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.tr = this.parent;
          this.table = this.tr.table;
      }

      _config() {
          let children = this.props.column.header || this.props.column.title;

          this.setProps({
              children
          });
      }
  }

  Component.register(Th);

  class TheadTr extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'tr'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.thead = this.parent;
          this.table = this.thead.table;
      }

      _config() {
          var columns = this.table.props.columns;

          var children = Array.isArray(columns)
              && columns.map(function (column) {
                  return {
                      component: Th,
                      column: column
                  }
              });

          this.setProps({
              children: children
          });
      }
  }

  Component.register(TheadTr);

  class Thead extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'thead'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.table = this.parent;
      }

      _config() {
          this.setProps({
              children: [
                  { component: TheadTr }
              ]
          });
      }
  }

  Component.register(Thead);

  class Td extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'td',
              data: null,
              column: {}
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              children: this.props.data
          });
      }
  }

  Component.register(Td);

  class Tr extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'tr',
              data: {}
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.tbody = this.parent;
          this.table = this.tbody.table;
      }

      _config() {
          var columns = this.table.props.columns;
          var data = this.props.data;

          var children = Array.isArray(columns)
              && columns.map(function (column) {
                  return {
                      component: Td,
                      name: column.field,
                      column: column,
                      data: accessProp(data, column.field)
                  }
              });

          this.setProps({
              key: data[this.table.props.keyField],
              children: children
          });
      }
  }

  Component.register(Tr);

  class Tbody extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'tbody'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.table = this.parent;
      }

      _config() {
          var data = this.table.props.data;
          var children = Array.isArray(data)
              && data.map(function (rowData) {
                  return {
                      component: Tr,
                      data: rowData
                  }
              });

          this.setProps({
              children
          });
      }
  }

  Component.register(Tbody);

  class Table extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'table',
              columns: [],
              row: {},
              onlyHead: false,
              onlyBody: false,
              keyField: 'id'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              tag: 'table',
              children: [
                  { component: ColGroup },
                  this.props.onlyBody !== true && { component: Thead },
                  this.props.onlyHead !== true && { component: Tbody }
              ]
          });
      }

      _render() {
          this.loadingInst && this.loadingInst.remove();
      }

      loading() {
          this.loadingInst = new Loading({
              container: this.parent
          });
      }
  }

  Component.register(Table);

  class GridHeader extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              children: { component: Table }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.grid = this.parent;
          this.grid.header = this;
      }

      _config() {
          this.setProps({
              children: {
                  columns: this.grid.props.columns,
                  data: this.grid.data,
                  attrs: {
                      style: {
                          minWidth: this.grid.minWidth + 'px'
                      }
                  },
                  onlyHead: true
              }
          });
      }
  }

  Component.register(GridHeader);

  class GridBody extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              children: { component: Table }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.grid = this.parent;
          this.grid.body = this;
      }

      _config() {
          this.setProps({
              children: {
                  columns: this.grid.props.columns,
                  data: this.grid.props.data,
                  attrs: {
                      style: {
                          minWidth: this.grid.minWidth + 'px'
                      }
                  },
                  onlyBody: true
              },
              attrs: {
                  onscroll: () => {
                      var scrollLeft = this.element.scrollLeft;
                      this.grid.header.element.scrollLeft = scrollLeft;
                  }
              }
          });
      }
  }

  Component.register(GridBody);

  class Grid extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              columns: [],
              data: [],
              frozenHeader: false
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.minWidth = 0;
      }

      _config() {
          this._calcMinWidth();

          this.setProps({
              classes: {
                  'm-frozen-header': this.props.frozenHeader
              },
              children: [
                  { component: GridHeader },
                  { component: GridBody }
              ]
          });
      }

      _calcMinWidth() {
          this.minWidth = 0;
          var props = this.props;
          for (var i = 0; i < props.columns.length; i++) {
              var column = props.columns[i];
              if (column.width) {
                  this.minWidth += column.width;
              }
              else {
                  this.minWidth += 120;
              }
          }
      }

      loading() {
          this.body && this.body.loading();
      }
  }

  Component.register(Grid);

  let RuleManager = {};
  RuleManager.ruleTypes = {
      required: {
          validate: function (value) {
              return !isEmpty(value);
          },
          message: "必填"
      },
      number: {
          validate: function (value) {
              return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
          },
          message: "请输入有效的数字"
      },
      digits: {
          validate: function (value) {
              return /^\d+$/.test(value);
          },
          message: "只能输入数字"
      },
      regex: {
          validate: function (value, ruleValue) {
              return new RegExp(ruleValue.pattern, ruleValue.attributes).test(value);
          }
      },
      email: {
          validate: function (value) {
              return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
          },
          message: "请输入有效的 Email 地址"
      },
      url: {
          validate: function (value) {
              return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
          },
          message: "请输入有效的 URL"
      },
      min: {
          validate: function (value, ruleValue) {
              value = Number(value);
              return value >= ruleValue;
          },
          message: '输入值不能小于 {0}'
      },
      max: {
          validate: function (value, ruleValue) {
              value = Number(value);
              return value <= ruleValue;
          },
          message: '输入值不能大于 {0}'
      },
      range: {
          validate: function (value, ruleValue) {
              value = Number(value);
              return value >= ruleValue[0] && value <= ruleValue[1];
          },
          message: "输入值必须介于 {0} 和 {1} 之间"
      },
      minlength: {
          validate: function (value, ruleValue) {
              var length = 0;
              if (Array.isArray(value)) {
                  length = value.length;
              }
              else {
                  length = value.trim().length;
              }

              return length >= ruleValue;
          },
          message: '不能少于 {0} 个字'
      },
      maxlength: {
          validate: function (value, ruleValue) {
              var length = 0;
              if (Array.isArray(value)) {
                  length = value.length;
              }
              else {
                  length = value.trim().length;
              }

              return length <= ruleValue;
          },
          message: '不能多于 {0} 个字'
      },
      rangelength: {
          validate: function (value, ruleValue) {
              var length = 0;
              if (Array.isArray(value)) {
                  length = value.length;
              }
              else {
                  length = value.trim().length;
              }

              return ruleValue[0] <= length && length <= ruleValue[1];
          },
          message: '输入字数在 {0} 个到 {1} 个之间'
      },
      remote: {
          validate: function (value, ruleValue) {
              var data = {};
              data[ruleValue[1]] = value;
              var response = $.ajax({ url: ruleValue[0], dataType: "json", data: data, async: false, cache: false, type: "post" }).responseText;
              return response === "true";
          }, message: "Please fix this field"
      },
      date: {
          validate: function (value, ruleValue) {
              return true;
          },
          message: "请输入有效的日期格式."
      },
      identifier: {
          validate: function (value) {
              return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value);
          },
          message: '只能输入字母、数字、下划线且必须以字母开头'
      },
      phoneNumber: {
          validate: function (value) {
              return /^1[3|4|5|7|8][0-9]{9}$/.test(value);
          },
          message: '请输入正确的手机号'
      },
      func: {
          validate: function (value, ruleValue) {
              if (isFunction(ruleValue)) {
                  return ruleValue(value);
              }
          }
      }
  };

  RuleManager.validate = function (rules, controlValue) {
      for (var i = 0; i < rules.length; i++) {
          var checkResult = checkRule(rules[i], controlValue);
          if (checkResult !== true) {
              return checkResult;
          }
      }

      return true;
  };

  function isEmpty(val) {
      return val === undefined || val === null || val === '' || (Array.isArray(val) && !val.length);
  }

  function checkRule(ruleSettings, controlValue) {
      var rule = RuleManager.ruleTypes[ruleSettings.type];

      if (rule) {
          var ruleValue = ruleSettings.value || null;
          if (!rule.validate(controlValue, ruleValue)) {
              var message = ruleSettings.message || rule.message;
              if (ruleValue !== null) {
                  if (!Array.isArray(ruleValue)) {
                      ruleValue = [ruleValue];
                  }
                  for (var i = 0; i < ruleValue.length; i++) {
                      message = message.replace(new RegExp("\\{" + i + "\\}", "g"), ruleValue[i]);
                  }
              }
              return message;
          }
      }
      return true;
  }

  class Control extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              rules: [],
              required: false,
              requiredMessage: "必填"
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.initValue = null;
          this.oldValue = null;
          this.currentValue = null;

          if (this.props.value !== undefined) {
              this.initValue = clone(this.props.value);
          }
      }

      _config() {
          if (this.props.required === true) {
              this.props.rules.unshift({ type: 'required', message: this.props.requiredMessage });
          }
      }

      getValue() {
          let value = isFunction(this._getValue) ? this._getValue() : null;
          return value
      }

      setValue(value) {
          isFunction(this._setValue) && this._setValue(value);
      }

      validate() {
          this.validateTriggered = true;
          return this._validate()
      }

      _validate() {
          let { rules } = this.props;
          if (Array.isArray(rules) && rules.length > 0) {
              var validationResult = RuleManager.validate(rules, this.getValue());

              if (validationResult === true) {
                  this.removeClass('s-invalid');
                  this.trigger('valid');
                  if (this.errorTip) {
                      this.errorTip.remove();
                      delete this.errorTip;
                  }
                  return true
              }
              else {
                  this.addClass('s-invalid');
                  this.trigger('invalid', validationResult);
                  this._invalid(validationResult);
                  return this
              }
          }

          return true
      }

      _invalid(message) {
          if (!this.errorTip) {
              this.errorTip = new Tooltip({
                  trigger: this,
                  styles: {
                      color: 'danger',
                  },
                  children: message
              });

              if (this.element.contains(document.activeElement)) {
                  this.errorTip.show();
              }
          }
          else {
              this.errorTip.update({
                  children: message
              });
          }
      }

      // 派生的控件子类内部适当位置调用
      _onValueChange() {
          var that = this;
          this.oldValue = clone(this.currentValue);
          this.currentValue = clone(this.getValue());
          this.props.value = this.currentValue;

          var changed = {
              name: this.props.name,
              oldValue: this.oldValue,
              newValue: this.currentValue,
          };

          setTimeout(function () {
              that.trigger("valueChange", changed);
              console.log(changed);
              if (that.validateTriggered) {
                  that._validate();
              }
          }, 0);
      }
  }

  Component.register(Control);

  class Input extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'input',
              attrs: {
                  type: 'text',
                  autocomplete: 'off'
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.textbox = this.parent;
          this.textbox.input = this;
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
                  },
                  oncompositionstart: () => {
                      this.capsLock = true;
                  },
                  oncompositionend: () => {
                      this.capsLock = false;
                      this.element.dispatchEvent(new Event('input'));
                  }
              },
          });
      }

      _render() {
          if (this.textbox.props.autofocus === true) {
              this.focus();
          }
      }

      getText() {
          return this.element.value
      }

      setText(text) {
          this.element.value = text;
      }

      focus() {
          this.element.focus();
      }
  }

  class Textbox extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              leftIcon: null,
              rightIcon: null,
              autofocus: false,
              placeholder: null,
              value: null,
              htmlType: 'text'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          let { leftIcon, rightIcon, placeholder, value, htmlType } = this.props;

          let leftIconProps = Component.normalizeIconProps(leftIcon);
          if (leftIconProps != null) {
              Component.extendProps(leftIconProps, { classes: { 'nom-textbox-left-icon': true } });
          }

          let rightIconProps = Component.normalizeIconProps(rightIcon);
          if (rightIconProps != null) {
              Component.extendProps(rightIconProps, { classes: { 'nom-textbox-right-icon': true } });
          }

          let inputProps = {
              component: Input,
              name: 'input',
              attrs: {
                  value: value,
                  placeholder: placeholder,
                  type: htmlType
              }
          };

          this.setProps({
              tag: 'div',
              classes: {
                  'p-with-left-icon': !!leftIcon,
                  'p-with-right-icon': !!rightIcon
              },
              children: [
                  inputProps,
                  leftIcon && leftIconProps,
                  rightIcon && rightIconProps
              ]
          });

          super._config();
      }

      getText() {
          return this.input.getText()
      }

      _getValue() {
          var inputText = this.getText();
          if (inputText === '') {
              return null
          }
          return inputText
      }

      _setValue(value) {
          this.input.setText(value);
          let newValue = this.getValue();
          if (newValue != this.oldValue) {
              super._onValueChange();
          }
          this.oldValue = this.currentValue;
          this.currentValue = newValue;
      }

      focus() {
          this.input.focus();
      }
  }

  Component.register(Textbox);

  class Textarea extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              tag: 'textarea',
              attrs: {
                  autocomplete: 'off'
              }
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.multilineTextbox = this.parent;
          this.multilineTextbox.textarea = this;

          this.capsLock = false;
      }

      _config() {
          this.setProps({
              attrs: {
                  'oninput'() {
                      if (!this.capsLock) {
                          this.multilineTextbox._onValueChange();
                      }
                  },
                  'oncompositionstart'() {
                      this.capsLock = true;
                  },
                  'oncompositionend'() {
                      this.capsLock = false;
                      this.element.trigger('input');
                  },
                  'onblur'() {
                      this.multilineTextbox.trigger("blur");
                  }
              }
          });
      }

      _render() {
          if (this.multilineTextbox.props.autofocus === true) {
              this.focus();
          }
      }

      getText() {
          return this.element.value
      }

      setText(text) {
          this.element.value = text;
      }

      focus() {
          this.element.focus();
      }
  }

  Component.register(Textarea);

  class MultilineTextbox extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              autofocus: false,
              placeholder: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          this.setProps({
              tag: 'div',
              textarea: {
                  component: Textarea,
                  attrs: {
                      placeholder: this.props.placeholder
                  }
              }
          });

          this.setProps({
              children: this.props.textarea
          });
      }

      getText() {
          return this.textarea.getText()
      }

      _getValue() {
          var inputText = this.getText();
          if (inputText === '') {
              return null
          }
          return inputText
      }

      _setValue(value) {
          this.textarea.setText(value);
      }

      focus() {
          this.textarea.focus();
      }
  }

  Component.register(MultilineTextbox);

  class Numberbox extends Textbox {
      constructor(props, ...mixins) {
          const defaults = {
              min: null,
              max: null,
              precision: 0
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          var rules = [];

          if (this.props.precision === 0) {
              rules.push({
                  type: 'regex',
                  value: {
                      pattern: '^(\\-|\\+)?(0|[1-9][0-9]*)$'
                  },
                  message: '请输入整数'
              });
          }
          if (this.props.precision > 0) {
              rules.push({
                  type: 'regex',
                  value: {
                      pattern: '^(\\-|\\+)?(0|[1-9][0-9]*)(\\.\\d{' + this.props.precision + '})$'
                  },
                  message: '请输入 ' + this.props.precision + ' 位小数'
              });
          }
          if (this.props.min) {
              rules.push({
                  type: 'min',
                  value: this.props.min
              });
          }
          if (this.props.max) {
              rules.push({
                  type: 'max',
                  value: this.props.max
              });
          }

          this.setProps({ rules: rules });
      }

      _getValue() {
          var data = this.input.getText();
          data = parseFloat(data).toFixed(this.props.precision);
          if (isNaN(data)) {
              data = null;
          }
          return data
      }
  }

  Component.register(Numberbox);

  class Checkbox extends Control {    
      constructor(props, ...mixins) {
          const defaults = {
              text: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          var that = this;
          this.setProps({
              children: {
                  tag: 'label',
                  children: [
                      {
                          tag: 'input',
                          attrs: {
                              type: 'checkbox',
                              onchange() {
                                  that._onValueChange();
                              }
                          },
                          _create() {
                              that.input = this;
                          },
                      },
                      { tag: 'span' },
                      { tag: 'span', children: this.props.text }
                  ]
              }
          });
      }

      _getValue() {
          return this.input.element.checked
      }

      _setValue(value) {
          this.input.element.checked = value === true;
      }
  }

  Component.register(Checkbox);

  var OptionListMixin = {
      _create: function () {
          this.radioList = this.parent;
          this.radioList.optionList = this;
      },
      _config: function () {
          let listProps = this.radioList.props;
          this.setProps({
              items: listProps.options,
              itemDefaults: listProps.optionDefaults,
              itemSelectable: {
                  byClick: true
              },
              selectedItems: listProps.value,
              events: {
                  itemSelectionChange: () => {
                      this.radioList._onValueChange();
                  }
              }
          });
      }
  };

  class OptionList extends List {
      constructor(props, ...mixins) {
          const defaults = {
              gutter: 'x-md',
              itemDefaults: {
                  tag: 'label',
                  _config: function () {
                      this.setProps({
                          children: [
                              {
                                  tag: 'span',
                                  classes: {
                                      'radio': true,
                                  },
                              },
                              {
                                  tag: 'span',
                                  classes: {
                                      'text': true,
                                  },
                                  children: this.props.text,
                              },
                          ],
                      });
                  }
              }
          };

          super(Component.extendProps(defaults, props), OptionListMixin, ...mixins);
      }
  }

  class RadioList extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              options: [],
              type: 'radio'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          this.setProps({
              optionDefaults: {
                  key() {
                      return this.props.value
                  }
              }
          });

          this.setProps({
              optionList: {
                  component: OptionList
              }
          });

          this.setProps({
              children: this.props.optionList
          });
      }

      getSelectedOption() {
          return this.optionList.getSelectedItem()
      }

      _getValue() {
          var selected = this.getSelectedOption();
          if (selected !== null) {
              return selected.props.value
          }
          else {
              return null
          }
      }

      _setValue(value) {
          this.optionList.selectItem(function () {
              return this.props.value === value
          });
      }
  }

  Component.register(RadioList);

  var OptionListMixin$1 = {
      _create: function () {
          this.checkboxList = this.parent;
          this.checkboxList.optionList = this;
      },
      _config: function () {
          let listProps = this.checkboxList.props;
          this.setProps({
              items: listProps.options,
              itemDefaults: listProps.optionDefaults,
              itemSelectable: {
                  byClick: true,
                  multiple: true
              },
              selectedItems: listProps.value,
              events: {
                  itemSelectionChange: () => {
                      this.checkboxList._onValueChange();
                  }
              }
          });
      }
  };

  class OptionList$1 extends List {
      constructor(props, ...mixins) {
          const defaults = {
              gutter: 'x-md',
              itemDefaults: {
                  tag: 'label',
                  _config: function () {
                      this.setProps({
                          children: [
                              {
                                  tag: 'span',
                                  classes: {
                                      'checkbox': true,
                                  },
                              },
                              {
                                  tag: 'span',
                                  classes: {
                                      'text': true,
                                  },
                                  children: this.props.text,
                              },
                          ],
                      });
                  }
              }
          };

          super(Component.extendProps(defaults, props), OptionListMixin$1, ...mixins);
      }
  }

  class CheckboxList extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              options: [],
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          this.setProps({
              optionDefaults: {
                  key: function () {
                      return this.props.value;
                  }
              }
          });

          this.setProps({
              optionList: {
                  component: OptionList$1,
              }
          });

          this.setProps({
              children: this.props.optionList
          });
      }

      getSelectedOptions() {
          return this.optionList.getSelectedItems()
      }

      _getValue() {
          var selected = this.getSelectedOptions();
          if (selected !== null && Array.isArray(selected)) {
              var vals = selected.map(function (item) {
                  return item.props.value
              });

              return vals
          }
          else {
              return null
          }
      }

      _setValue(value) {
          this.optionList.selectItem(function () {
              return this.props.value === value
          });
      }
  }

  Component.register(CheckboxList);

  class Select extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              options: [],
              optionDefaults: {
                  _config: function () {
                      this.setProps({
                          children: this.props.text
                      });
                  }
              },
              selectedSingle: {
                  _config: function () {
                      this.setProps({
                          children: this.props.text
                      });
                  }
              },
              selectedMultiple: {
                  component: List,
                  itemDefaults: {
                      _config: function () {
                          this.setProps({
                              tag: 'span',
                              children: this.props.text
                          });
                      }
                  },
                  styles: {
                      flex: 'row',
                      gap: 'sm'
                  }
              },
              arrow: {
                  type: 'arrow-down'
              },
              multiple: false,
              showArrow: true,
              minItemsForSearch: 20
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          super._config();

          var that = this;

          this.setProps({
              selectedSingle: {
                  _create() {
                      that.selectedSingle = this;
                  }
              },
              selectedMultiple: {
                  itemDefaults: {
                      key() {
                          return this.props.value;
                      }
                  },
                  _create() {
                      that.selectedMultiple = this;
                  }
              },
              optionDefaults: {
                  key() {
                      return this.props.value;
                  },
                  selectable: {
                      byClick: true,
                      canRevert: true
                  },
                  events: {
                      select() {
                          var selectedOption = { text: this.props.text, value: this.props.value };
                          if (that.props.multiple === false) {
                              that.selectedSingle.update(selectedOption);
                              that.popup.hide();
                          }
                          else {
                              that.selectedMultiple.appendItem(selectedOption);
                          }
                      },
                      unselect() {
                          if (that.props.multiple === true) {
                              that.selectedMultiple.removeItem(this.key);
                          }
                      }
                  }
              }
          });

          var children = this.props.multiple ? this.props.selectedMultiple : this.props.selectedSingle;

          this.setProps({
              children: children,
              popup: {
                  children: {
                      component: List,
                      cols: 1,
                      _create() {
                          that.optionList = this;
                      },
                      items: this.props.options,
                      itemDefaults: this.props.optionDefaults,
                      itemSelectable: {
                          multiple: that.props.multiple,
                          byClick: true
                      },
                      classes: {
                          'nom-select-list': true
                      },
                      events: {
                          itemSelectionChange() {
                              that._onValueChange();
                          }
                      }
                  },
                  _config() {
                      this.setProps({
                          attrs: {
                              style: {
                                  width: that.offsetWidth() + 'px'
                              }
                          }
                      });
                  },
              }
          });
      }

      selectOption(option) {
          this.optionList.selectItem(option);
      }

      selectOptions(options) {
          this.optionList.selectItems(options);
      }

      getSelectedOption() {
          if (this.props.multiple === false) {
              return this.optionList.getSelectedItem()
          }
          else {
              return this.optionList.getSelectedItems()
          }
      }

      _getValue() {
          var selected = this.getSelectedOption();
          if (selected !== null) {
              if (Array.isArray(selected)) {
                  var vals = selected.map(function (item) {
                      return item.props.value
                  });

                  return vals
              }
              else {
                  return selected.props.value
              }
          }
          else {
              return null
          }
      }

      _setValue(value) {
          this.optionList.unselectAllItems({ triggerSelectionChange: false });
          this.selectOptions(value);
      }

      appendOption() {

      }
  }

  Component.register(Select);

  class TimePicker extends Control {
      constructor(props, ...mixins) {

      }

      _getTimeData(count) {
          var data = [];
          for (i = 0; i < count; i++) {
              var val = i + '';
              if (i < 10) {
                  val = '0' + i;
              }
              data.push({
                  text: val,
                  value: val
              });
          }
          
          return data
      }
  }

  class DatePicker extends Textbox {
      constructor(props, ...mixins) {
          const defaults = {

          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          this.setProps({
              rightIcon: 'check'
          });

          this.setProps({
              popup: {
                  triggerAction: 'click',
                  attrs: {
                      style: {
                          width: '300px'
                      }
                  },
                  children: {
                      component: Rows,
                      items: [
                          {
                              component: Cols,
                              justify: 'between',
                              fills: true,
                              items: [
                                  {
                                      component: Select,
                                      options: this._getYears()
                                  },
                                  {
                                      component: Select,
                                      options: this._getMonths()
                                  }
                              ]
                          }
                      ]
                  }
              }
          });

          super._config();
      }

      _getYears() {
          let years = [],
              thisYear = new Date().getFullYear();

          for (let i = thisYear + 20; i > thisYear - 30; i--) {
              years.push({
                  text: i,
                  value: i
              });
          }

          return years;
      }

      _getMonths() {
          let months = [];

          for (let i = 1; i < 13; i++) {
              months.push({
                  text: i,
                  value: i
              });
          }

          return months;
      }

      /* 求XX年XX月1号是星期几 */
      _getFirstDayOfMonth(year, month) {
          return new Date(year, month, 1).getDay();
      }

      /* 求XX年XX月有多少天 */
      _getDaysInMonth(year, month) {
          return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
      }

      _daylightSavingAdjust(date) {
          if (!date) {
              return null;
          }
          date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
          return date;
      }
  }

  Component.register(DatePicker);

  class FieldLabel extends Component {
      constructor(props, ...mixins) {
          super(props);
      }

      _create() {
          this.field = this.parent;
      }

      _config() {
          this.setProps({
              children: {
                  tag: 'label',
                  classes: {
                      'nom-label': true
                  },
                  children: this.field.props.label
              }
          });
      }
  }

  Component.register(FieldLabel);

  var ControlMixin = {
      _create: function () {
          this.field = this.parent.field;
          this.field.control = this;
          this.form = this.field.form;
      },
      _config: function () {
          this.on('valueChange', function () {
              this.field.trigger('valueChange');
          });
      }
  };

  class FieldControl extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              control: {}
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.field = this.parent;
      }

      _config() {
          this.setProps({
              control: {
                  value: this.props.value
              }
          });
          this.setProps({
              control: this.field.props.control
          });

          this.setProps({
              children: function () {
                  return {
                      props: this.props.control,
                      mixins: [ControlMixin]
                  }
              }
          });
      }
  }

  Component.register(FieldControl);

  class Field extends Component {
      constructor(props, ...mixins) {
          const defaults = {
              label: '',
              labelAlign: 'right',
              invalidTipAlign: 'top right',
              control: {},
              value: null
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _create() {
          this.form = this.parent;
      }

      _config() {
          var classes = {};
          if (this.props.label !== null && this.props.label !== undefined) {
              classes['m-label-' + this.props.labelAlign] = true;
          }

          this.on('valueChange', function () {
              this.form.trigger('valueChange');
          });

          this.setProps({
              classes: classes,
              children: [
                  { component: FieldLabel },
                  { component: FieldControl, value: this.props.value }
              ]
          });
      }

      getValue() {
          if (this.control.getValue) {
              return this.control.getValue()
          }
          else {
              return null
          }
      }

      setValue(value) {
          if (this.control.setValue) {
              this.control.setValue(value);
          }
      }

      validate() {
          if (this.control.validate) {
              return this.control.validate()
          }
          else {
              return true
          }
      }

      focus() {
          this.control.focus && this.control.focus();
      }
  }

  Component.register(Field);

  class Form extends Control {
      constructor(props, ...mixins) {
          const defaults = {
              fields: [],
              fieldDefaults: {
                  component: Field
              },

              value: {},

              inline: false,
              striped: false,
              bordered: false,
              splitline: false,

              space: 'md',
              size: 'md'
          };

          super(Component.extendProps(defaults, props), ...mixins);
      }

      _config() {
          var children = [];
          for (var i = 0; i < this.props.fields.length; i++) {
              var field = this.props.fields[i];
              if (isPlainObject(this.props.value)) {
                  if (field.value === null || field.value === undefined) {
                      field.value = this.props.value[field.name];
                  }
              }
              children.push(field);
          }
          this.setProps({
              children: children,
              childDefaults: this.props.fieldDefaults
          });
      }

      getValue() {
          let value = {};
          for (let i = 0; i < this.children.length; i++) {
              let field = this.children[i];
              if (field.getValue && field.props.name) {
                  value[field.props.name] = field.getValue();
              }
          }
          return value
      }

      setValue(value) {
          for (let i = 0; i < this.children.length; i++) {
              let field = this.children[i];
              if (field.setValue && field.props.name) {
                  field.setValue(value[field.props.name]);
              }
          }
      }

      validate() {
          let invalids = [];
          for (let i = 0; i < this.children.length; i++) {
              let field = this.children[i];
              if (field.validate) {
                  let valResult = field.validate();

                  if (valResult !== true) {
                      invalids.push(field);
                  }
              }
          }

          if (invalids.length > 0) {
              invalids[0].focus();
          }

          return invalids.length === 0
      }
  }

  Component.register(Form);

  exports.Alert = Alert;
  exports.App = App;
  exports.Button = Button;
  exports.Caption = Caption;
  exports.Checkbox = Checkbox;
  exports.CheckboxList = CheckboxList;
  exports.Cols = Cols;
  exports.Component = Component;
  exports.Container = Container;
  exports.Cssicon = Cssicon;
  exports.DatePicker = DatePicker;
  exports.Field = Field;
  exports.Form = Form;
  exports.Grid = Grid;
  exports.Icon = Icon;
  exports.Layer = Layer;
  exports.Layout = Layout;
  exports.List = List;
  exports.ListItemMixin = ListItemMixin;
  exports.Loading = Loading;
  exports.Menu = Menu;
  exports.Message = Message;
  exports.Modal = Modal;
  exports.MultilineTextbox = MultilineTextbox;
  exports.Navbar = Navbar;
  exports.Numberbox = Numberbox;
  exports.Pager = Pager;
  exports.Panel = Panel;
  exports.Popup = Popup;
  exports.RadioList = RadioList;
  exports.Rows = Rows;
  exports.Select = Select;
  exports.Spinner = Spinner;
  exports.Table = Table;
  exports.Tabs = Tabs;
  exports.Textbox = Textbox;
  exports.TimePicker = TimePicker;
  exports.Tooltip = Tooltip;
  exports.View = View;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
