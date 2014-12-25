var elle = require('../')
var test = require('tape').test


test('constructor methods', function(t) {
        
    var e = elle()
    t.equal(e.html(), '', 'empty html')
    t.ok(/div/i.test(e[0].tagName), 'creates a div')
    
    e = elle(document.body)
    t.equal(e[0], document.body, 'accepts elements')

    var body = elle(document.body)
    e = elle(body)
    t.equal(e[0], document.body, 'accepts elle object')
    
    e = elle('text')
    t.ok(e[0] instanceof Text, 'creates a Text node')
    t.equal(e[0].nodeValue, 'text', 'string is text node')

    e = elle('<span></span><div></div>')
    t.ok(e[0] instanceof DocumentFragment, 'creates a DocumentFragment')
    t.end()
})