var elle = require('../')
var test = require('tape').test

var body = document.body

test('common methods', function(t) {
    var btn = elle()

    btn.appendTo(body)
    t.equal(body.contains(btn.view), true, 'appendTo()')

    btn.attr('data-foo', '25')
    t.equal(btn.attr('data-foo'), '25', 'attr() setter/getter')

    btn.append('foo', 'bar')
    t.equal(btn.html(), 'foobar', 'append() text')

    btn.html('')
    btn.append('<span>baz</span>')
    t.equal(btn.html(), '<span>baz</span>', 'append() html string')

    var btn2 = elle('<a href="#">blank</a>')
    btn.html('')
    btn.append(btn2[0])
    t.equal(btn.html(), '<a href="#">blank</a>', 'append() element')
    
    btn.remove()
    t.equal(body.contains(btn.view), false, 'remove()')
    t.end()
})