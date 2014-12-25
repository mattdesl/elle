var elle = require('../')
var test = require('tape').test

var css = require('dom-css')
var body = document.body

test('common methods', function(t) {
    var btn = elle()

    btn.appendTo(body)
    t.equal(body.contains(btn.element), true, 'appendTo()')

    btn.attr('data-foo', '25')
    t.equal(btn.attr('data-foo'), '25', 'attr() setter/getter')

    btn.append('foo', 'bar')
    t.equal(btn.element.innerHTML, 'foobar', 'append() text')

    btn.element.innerHTML = ''
    btn.append('<span>baz</span>')
    t.equal(btn.element.innerHTML, '<span>baz</span>', 'append() html string')

    var btn2 = elle('<a href="#">blank</a>')
    btn.element.innerHTML = ''
    btn.append(btn2[0])
    t.equal(btn.element.innerHTML, '<a href="#">blank</a>', 'append() element')
    
    btn.remove()
    t.end()
    t.equal(body.contains(btn.element), false, 'remove()')
})