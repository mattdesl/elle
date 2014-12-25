var inherits = require('inherits')
var domify = require('domify')
var events = require('dom-events')
var insert = require('insert')
var css = require('dom-css')
var attr = require('./lib/attr')

module.exports = Elle
function Elle(element) {
    if (!(this instanceof Elle))
        return new Elle(element)

    this[0] = typeof element === 'string' 
        ? domify(element)
        : document.createElement('div')
}

//for a jQuery like array dereference we will inherit from Array
inherits(Elle, Array)

//getters/setters
Object.defineProperty(Elle.prototype, 'element', {
    get: function() {
        return this[0]
    }
})

//mixin events
;['on', 'once', 'off'].forEach(function(name) {
    Elle.prototype[name] = wrap(events[name])
})

//other mixins
Elle.prototype.css = wrap(css)
Elle.prototype.attr = wrapGetter(attr)

//mixin inserts
;['remove', 'prepend', 'append', 'before', 'after']
    .forEach(function(name) {
        Elle.prototype[name] = wrap(insert[name], toElement)
    })

Elle.prototype.replace = wrap(insert.replace)

//mixin inserts with a target
Elle.prototype.appendTo = wrapTarget(insert.append)
Elle.prototype.prependTo = wrapTarget(insert.prepend)
Elle.prototype.insertBefore = wrapTarget(insert.before)
Elle.prototype.insertAfter = wrapTarget(insert.after)

//always returns this for chaining
function wrap(fn, map) {
    return function(...args) {
        if (map) 
            args = args.map(map)
        var a = [this[0], ...args]
        fn(...a)
        return this
    }
}

//single argument --> return value
function wrapGetter(fn) {
    return function(...args) {
        var a = [this[0], ...args]
        var ret = fn(...a)
        return args.length===1 ? ret : this
    }
}

//for insert/remove/etc
function wrapTarget(fn) {
    return function(target) {
        fn(target, this[0])
        return this
    }
}

function toElement(e) {
    return typeof e === 'string' ? domify(e) : e
}