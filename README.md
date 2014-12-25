# elle

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A DOM utility that wraps a few common features:

- construct from string template (see [domify](https://www.npmjs.com/package/domify))
- set CSS styling (see [dom-css](https://www.npmjs.com/package/dom-css))
- insertion/removal (see [insert](https://www.npmjs.com/package/insert))
- add/remove classes (see [dom-classes](https://www.npmjs.com/package/dom-classes))
- chainable `html()` getter/setter for `innerHTML`
- chainable `attr()` getter/setter for `setAttribute`

Other features are left up to the user to implement or extend (see [examples/](examples/)). 

## example

Basic example:

```js
require('elle')(document.body)
  .css({
    margin: 20,
    background: 'black',
    fontSmoothing: 'antialiased' //vendor-prefixed !
  })
  .append('<div><a href="#">click</a></div>')
```

Another example:

```js
var elle = require('elle')

//style and append text content to the body
elle(document.body)
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
    .appendTo(document.body)

//creates a Text node and DocumentFragment
var text = elle('text node').element
var frag = elle('<div>a</div><div>document fragment</div>').element

//attach the nodes to the body
elle(document.body)
  .append(text)
  .append(frag)
```

## overview

- manipulation
  - append
  - prepend
  - before
  - after
  - insertBefore
  - insertAfter
  - appendTo
  - prependTo
- classes
  - `hasClass` returns true if the element has the class
  - `addClass` adds a class 
  - `removeClass` removes a class
  - `toggleClass` toggles a class on/off
- misc
  - css - applies dom style with [dom-css](https://www.npmjs.com/package/dom-classes)
  - attr - getter/setter for `setAttribute`
  - html - getter/setter for `innerHTML`

## Usage

[![NPM](https://nodei.co/npm/elle.png)](https://nodei.co/npm/elle/)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/elle/blob/master/LICENSE.md) for details.
