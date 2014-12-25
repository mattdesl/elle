# elle

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A DOM utility that wraps a few common features in a chainable structure. Targets modern browsers.

- construct from string template (see [domify](https://www.npmjs.com/package/domify))
- set CSS styling (see [dom-css](https://www.npmjs.com/package/dom-css))
- insertion/removal (see [insert](https://www.npmjs.com/package/insert))
- add/remove classes (see [dom-classes](https://www.npmjs.com/package/dom-classes))
- aliases for `innerHTML`, `setAttribute/getAttribute` and `parentNode`

Other features are left up to the user to implement or extend (see [examples/](examples/)). 

The main purpose is to provide a thin layer for other components/frameworks to build on. 

## example

Basic example:

```js
require('elle')(document.body)
  .css({
    background: 'black',
    margin: 20,                  //auto-px'd 
    fontSmoothing: 'antialiased' //vendor-prefixed
  })
  .append('<div><a href="#">click</a></div>')
```

Another example:

```js
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
```

## overview

- manipulation
  - `append`
  - `prepend`
  - `before`
  - `after`
  - `insertBefore`
  - `insertAfter`
  - `appendTo`
  - `prependTo`
  - `parent`
- classes
  - `hasClass` returns true if the element has the class
  - `addClass` adds a class 
  - `removeClass` removes a class
  - `toggleClass` toggles a class on/off
- misc
  - `css` - applies dom style with [dom-css](https://www.npmjs.com/package/dom-classes)
  - `attr` - getter/setter for `setAttribute`
  - `html` - getter/setter for `innerHTML`

## Usage

[![NPM](https://nodei.co/npm/elle.png)](https://nodei.co/npm/elle/)

#### `e = elle([opt])`

Creates a new element wrapper with the given options. If nothing is given, the element will default to an empty `<div>`.

If a string is specified, it will create a different type depending on the contents. e.g.

- `"some text"` results in a Text node
- `"<div>text</div>"` results in a `<div>` with a Text node
- `"<div></div><div></div>"` results in a DocumentFragment

You can also pass an element (like `document.body` etc) into the constructor to operate on that. 

#### `e.view`

Returns the underlying DOM node for this wrapper. You can also access the node with array dereference, as in: 

```js
elle(document.body)[0] === document.body
```

#### `e.append(content)`
#### `e.prepend(content)`
#### `e.before(content)`
#### `e.after(content)`

Inserts `content` (which can be an element, or a string, or an array of elements/strings) into the wrapped element. Returns this for chaining.

#### `e.insertBefore(target)`
#### `e.insertAfter(target)`
#### `e.appendTo(target)`
#### `e.prependTo(target)`

Inserts the wrapped target into the specified `target` element. Returns this for chaining.

#### `e.remove()`

Removes this element from its parent. Returns this for chaining.

#### `e.parent()`

Returns the parentNode for the wrapped element.

#### `e.hasClass(name)`

Returns true if the element contains the given class. Uses a fallback for non-classList browsers.

#### `e.addClass(name)`
#### `e.toggleClass(name)`
#### `e.removeClass(name)`

Adds/removes/toggles a single class by string name.

If a `RegExp` is given to `removeClass`, it will remove all classes that match.

#### `e.css(map)`
#### `e.css(name, value)`

Applies styling with [dom-css](https://www.npmjs.com/package/dom-classes). You can provide an object of `name:value` pairs, or specify each property `name` and `value` individually. 

#### `e.html([value])`

A getter/setter for `innerHTML`. If `value` is a string, it will set `innerHTML` (returning this for chaining), otherwise it will return the current value. 

#### `e.attr(name[, value])`

A getter/setter for `setAttribute`. If two arguments are provided, this will call `setAttribute` (returning this for chaining). If only one argument is provided, it will return the value of `getAttribtue`. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/elle/blob/master/LICENSE.md) for details.
