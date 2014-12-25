//An example of using events

var test = require('tape')
var elle = require('../')

var css = require('dom-css')
var body = document.body

test("accepts double click", function(t) {
    var btn = elle('double-click to continue test')
    
    btn.appendTo(document.body).css({
        position: 'absolute',
        background: 'gray',
        color: 'white',
        top: 20,
        left: 20,
        width: 150,
        height: 100,
        cursor: 'pointer'
    })
    btn.css('left', 40)

    t.plan(2)

    btn.on('mousedown', function(ev) {
        ev.preventDefault()
    })

    btn.once('click', function(ev) {
        t.ok(ev instanceof MouseEvent, 'got click') 
    })

    btn.on('dblclick', function(ev) {
        btn.remove()
        t.ok(ev instanceof MouseEvent, 'got dblclick') 
    })
})
