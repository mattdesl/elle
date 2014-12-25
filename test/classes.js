var elle = require('../')
var test = require('tape').test

var body = document.body

test('constructor methods', function(t) {
    var div = document.createElement('div')
    div.className = 'foo'
    var e = elle(div)

    t.equal(e.hasClass('foo'), true, 'hasClass')
    t.equal(e.hasClass('bar'), false, 'hasClass')
    e.addClass('bar')
    t.equal(e.hasClass('bar'), true, 'addClass')
    
    e.toggleClass('foo')
    t.equal(e.hasClass('foo'), false, 'toggleClass (1)')
    e.toggleClass('foo')
    t.equal(e.hasClass('foo'), true, 'toggleClass (2)')

    e.removeClass('foo')
    t.equal(e.hasClass('foo'), false, 'removeClass')

    t.end()
})