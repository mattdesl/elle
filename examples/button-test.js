var Button = require('./elle-button')

function effect(obj, color) {
    return () => { obj.css('background', color) }
}

require('domready')(function() {
    var button = Button()

    button.css({
            position: 'absolute',
            top: 20,
            left: 20,
            cursor: 'pointer',
            width: 100,
            height: 20,
            padding: 20,
            background: 'lightGray'
        })
        .appendTo(document.body)
        .on('down', ev => { ev.preventDefault() })
        .on('hover', effect(button, 'blue'))
        .on('leave', effect(button, 'lightGray'))
        .on('click', ev => { console.log("Hello!") })
    
    //yup.. that's our original element
    console.log(button.view instanceof Element)
})