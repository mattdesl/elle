var inherits = require('inherits')
var domify = require('domify')
var insert = require('insert')
var css = require('dom-css')
var attr = require('./lib/attr')
var html = require('./lib/html')
var classes = require('dom-classes')

module.exports = Elle
function Elle(element) {
    if (!(this instanceof Elle))
        return new Elle(element)
    this[0] = toElement(element) || document.createElement('div')
}

//for a jQuery like array dereference we will inherit from Array
inherits(Elle, Array)

var Proto = Elle.prototype

//getters/setters
Object.defineProperty(Proto, 'view', {
    get: function() {
        return this[0]
    },
    enumerable: true,
    configurable: true
})


//misc utils
Proto.css = wrap(css)
Proto.html = property(html)
Proto.attr = property(attr, 1)

//class mixins
Proto.hasClass = function(name) {
    return classes.has(this[0], name)
}

;['remove', 'add', 'toggle']
    .forEach(function(name) {
        Proto[name+'Class'] = wrap(classes[name])
    })

//mixin inserts
;['remove', 'prepend', 'append', 
  'before', 'after', 'replace']
    .forEach(function(name) {
        Proto[name] = wrap(insert[name], toElement)
    })

//mixin inserts with a target
Proto.appendTo = wrapTarget(insert.append)
Proto.prependTo = wrapTarget(insert.prepend)
Proto.insertBefore = wrapTarget(insert.before)
Proto.insertAfter = wrapTarget(insert.after)

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
function property(fn, expected) {
    return function(...args) {
        var a = [this[0], ...args]
        var ret = fn(...a)
        return args.length===(expected|0) ? ret : this
    }
}

//for insert/remove/etc
function wrapTarget(fn) {
    return function(target) {
        fn(toElement(target), this[0])
        return this
    }
}

function toElement(e) {
    if (typeof e === 'string')
        return domify(e)
    else if (e && e.view && e.view.nodeType)
        return e.view
    return e
}