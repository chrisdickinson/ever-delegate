# ever-delegate

DOM event delegation, a la jQuery's `el.on('click', 'selector > selector')` method.

```javascript

var ever = require('ever')
  , sel = require('cssauron-html')
  , delegate = require('ever-delegate')


delegate(ever(document.body), sel('a[href^=/]'))
  .on('click', function(ev) {
    console.log(this)   // <-- the <a> element selected by the above
  })

```

# api

### delegate(event emitter, filterFunction) -> delegate event emitter

Create a delegate event emitter. Works with any event emitter that
emits DOM event objects.

`filterFunction` is a function that takes one argument -- a node --
and returns whether or not that node should be considered a match or
not. This is compatible with [the `matchesSelector` spec](https://developer.mozilla.org/en-US/docs/DOM/Element.mozMatchesSelector) (available as `webkitMatchesSelector` or 
`mozMatchesSelector`). It's also compatible with [CSSauron selectors](https://github.com/chrisdickinson/cssauron-html).

# license

MIT 
