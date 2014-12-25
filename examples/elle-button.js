//This is an example of extending elle
//using EventEmitter instead of pure DOM events.

//This is useful when you want full control
//over the emitter and want to expose an
//end-user API that may not match DOM event names
var elle = require('../')
var events = require('dom-events')
var Emitter = require('events/')
var mixin = require('xtend/mutable')

var targets = [
    'mousedown', 
    'mouseup', 
    'click',
    'mouseleave',
    ['mouseover', 'hover']
]

//Returns an elle with 'on', 'once', 'off'
//events: down, up, click, hover, leave
module.exports = function(opt) {
    var ret = elle(opt)

    //mixin the emitter prototype and construct it
    mixin(ret, Emitter.prototype)
    ret.off = ret.removeListener.bind(ret)
    Emitter.call(ret)

    //Here we might want to do some more complex
    //event routing, e.g. catching relative mouse
    //offsets or normalizing touch/mouse events
    targets.forEach(wrap(ret))

    return ret
}

function wrap(obj) {
    return function(domEvent) {
        var emitName = domEvent
        if (Array.isArray(domEvent)) {
            emitName = domEvent[1]
            domEvent = domEvent[0]
        }
        else if (domEvent.indexOf('mouse') !== -1)
            emitName = domEvent.slice('mouse'.length)

        events.on(obj.view, domEvent, (ev) => {
            obj.emit(emitName, ev)
        })
    }
}