//This is an example of extending elle via
//prototype, and using pure DOM events for on/off/once
var elle = require('../')
var events = require('dom-events')
var inherits = require('inherits')

module.exports = ElleEvented
function ElleEvented(opt) {
    if (!(this instanceof ElleEvented)) 
        return new ElleEvented(opt)
    elle.call(this, opt)
}

inherits(ElleEvented, elle)

//mixin events
;['on', 'off', 'once'].forEach(name => {
    ElleEvented.prototype[name] = wrap(events[name]) 
})

function wrap(fn) {
    return function(name, listener, capture) {
        fn(this.view, name, listener, capture)
        return this
    }
}