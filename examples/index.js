require('domready')(function() {
    var elle = require('../')

    //style and append text content to the body
    var body = elle(document.body)
      .css('margin', 20)
      .append('some, ', 'text')
    
    //creates a bare <div> with some styles
    //then attach it to the body
    elle()
        .addClass('foobar')
        .css({
          width: 20,
          height: 20,
          background: 'blue'
        })
        .appendTo(body)

    //creates a Text node and DocumentFragment
    var text = elle('text node')
    var frag = elle('<div>a</div><div>document fragment</div>')

    //attach the nodes to the body
    elle(body)
      .append(text)
      .append(frag)
})