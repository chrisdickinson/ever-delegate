module.exports = delegate

var parents = require('ancestors')

function delegate(ever, filter) {
  var root = ever.element
    , new_ee = Object.create(ever)

  new_ee.on = function(name, fn, useCapture) {
    intercept.__original__ = fn
    ever.on.call(new_ee, name, intercept, useCapture)

    function intercept(event) {
      var tripped_until = false

      if(filter(event.target)) {
        return fn.call(event.target, event)
      } else if((p = parents(event.target, until)).length) {
        return fn.call(p[0], event)
      }

      function until(node) {
        if(node === root) {
          tripped_until = true
        }
        return !tripped_until && filter(node)
      }
    }
  }

  new_ee.addListener = new_ee.on

  // since we've wrapped all listeners in a new callback,
  // removing listeners has to go through the list of listeners
  // and see if any of them have an `__original__` property of that
  // listener.
  new_ee.removeListener = function(name, listener, useCapture) {
    if(!this._events) this._events = {}
    var xs = this.listeners(type)
    for(var i = 0, len = xs.length; i < len; ++i) {
      if(xs[i].__original__ === listener) {
        return ever.removeListener.call(new_ee, name, xs[i], useCapture)
      }
    }
  }

  return new_ee
}
