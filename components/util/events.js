// Events
// -----------------
// Thanks to:
//  - https://github.com/documentcloud/backbone/blob/master/backbone.js
//  - https://github.com/joyent/node/blob/master/lib/events.js

// Regular expression used to split event strings
const eventSplitter = /\s+/

// A module that can be mixed in to *any object* in order to provide it
// with custom events. You may bind with `on` or remove with `off` callback
// functions to an event; `trigger`-ing an event fires all callbacks in
// succession.
//
//     var object = new Events();
//     object.on('expand', function(){ alert('expanded'); });
//     object.trigger('expand');
//
function Events() {}

// Bind one or more space separated events, `events`, to a `callback`
// function. Passing `"all"` will bind the callback to all events fired.
Events.prototype.on = function (events, callback, context) {
  if (!callback) return this

  const cache = this.__events || (this.__events = {})
  events = events.split(eventSplitter)

  let event
  let list
  while ((event = events.shift())) {
    list = cache[event] || (cache[event] = [])
    list.push(callback, context)
  }

  return this
}

Events.prototype.once = function (events, callback, context) {
  const that = this
  const cb = function () {
    that.off(events, cb)
    callback.apply(context || that, arguments)
  }
  return this.on(events, cb, context)
}

// Remove one or many callbacks. If `context` is null, removes all callbacks
// with that function. If `callback` is null, removes all callbacks for the
// event. If `events` is null, removes all bound callbacks for all events.
Events.prototype.off = function (events, callback, context) {
  let cache
  let event
  let list
  let i

  // No events, or removing *all* events.
  if (!(cache = this.__events)) return this
  if (!(events || callback || context)) {
    delete this.__events
    return this
  }

  events = events ? events.split(eventSplitter) : Object.keys(cache)

  // Loop through the callback list, splicing where appropriate.
  while ((event = events.shift())) {
    list = cache[event]
    if (!list) continue

    if (!(callback || context)) {
      delete cache[event]
      continue
    }

    for (i = list.length - 2; i >= 0; i -= 2) {
      if (!((callback && list[i] !== callback) || (context && list[i + 1] !== context))) {
        list.splice(i, 2)
      }
    }
  }

  return this
}

// Trigger one or many events, firing all bound callbacks. Callbacks are
// passed the same arguments as `trigger` is, apart from the event name
// (unless you're listening on `"all"`, which will cause your callback to
// receive the true name of the event as the first argument).
Events.prototype.trigger = function (events) {
  let cache
  let event
  let all
  let list
  let i
  let len
  const rest = []
  let returned = true
  if (!(cache = this.__events)) return this

  events = events.split(eventSplitter)

  // Fill up `rest` with the callback arguments.  Since we're only copying
  // the tail of `arguments`, a loop is much faster than Array#slice.
  for (i = 1, len = arguments.length; i < len; i++) {
    rest[i - 1] = arguments[i]
  }

  // For each event, walk through the list of callbacks twice, first to
  // trigger the event, then to trigger any `"all"` callbacks.
  while ((event = events.shift())) {
    // Copy callback lists to prevent modification.
    if ((all = cache.all)) all = all.slice()
    if ((list = cache[event])) list = list.slice()

    // Execute event callbacks except one named "all"
    if (event !== 'all') {
      returned = triggerEvents(list, rest, this) && returned
    }

    // Execute "all" callbacks.
    returned = triggerEvents(all, [event].concat(rest), this) && returned
  }

  return returned
}

Events.prototype.emit = Events.prototype.trigger

// Helpers
// -------

let { keys } = Object

if (!keys) {
  keys = function (o) {
    const result = []

    for (const name in o) {
      if (o.hasOwnProperty(name)) {
        result.push(name)
      }
    }
    return result
  }
}

// Mix `Events` to object instance or Class function.
Events.mixTo = function (receiver) {
  const proto = Events.prototype

  if (isFunction(receiver)) {
    for (const key in proto) {
      if (proto.hasOwnProperty(key)) {
        receiver.prototype[key] = proto[key]
      }
    }
    Object.keys(proto).forEach(function (key) {
      receiver.prototype[key] = proto[key]
    })
  } else {
    const event = new Events()
    for (const key in proto) {
      if (proto.hasOwnProperty(key)) {
        copyProto(key, event)
      }
    }
  }

  function copyProto(key, event) {
    receiver[key] = function () {
      proto[key].apply(event, Array.prototype.slice.call(arguments))
      return this
    }
  }
}

// Execute callbacks
function triggerEvents(list, args, context) {
  let pass = true

  if (list) {
    let i = 0
    const l = list.length
    const a1 = args[0]
    const a2 = args[1]
    const a3 = args[2]
    // call is faster than apply, optimize less than 3 argu
    // http://blog.csdn.net/zhengyinhui100/article/details/7837127
    switch (args.length) {
      case 0:
        for (; i < l; i += 2) {
          pass = list[i].call(list[i + 1] || context) !== false && pass
        }
        break
      case 1:
        for (; i < l; i += 2) {
          pass = list[i].call(list[i + 1] || context, a1) !== false && pass
        }
        break
      case 2:
        for (; i < l; i += 2) {
          pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass
        }
        break
      case 3:
        for (; i < l; i += 2) {
          pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass
        }
        break
      default:
        for (; i < l; i += 2) {
          pass = list[i].apply(list[i + 1] || context, args) !== false && pass
        }
        break
    }
  }
  // trigger will return false if one of the callbacks return false
  return pass
}

function isFunction(func) {
  return Object.prototype.toString.call(func) === '[object Function]'
}

export { Events }
