var test = require('tape')
  , delegate = require('./index')
  , ever = require('ever')
  , selector = require('cssauron-html')
  , root

function setup() {

  document.body.innerHTML = "<div id=\"dom\">\n\t<a id=\"link_one\" rel=\"lol\" href=\"#\">one</a>\n\t<div>\n\t\t<span><a rel=\"lol\" id=\"link_two\" href=\"#\">two</a></span>\n\t</div>\n</div>\n"
  root = document.getElementById('dom')
}

test('test that delegated listeners are triggered', function(t) {
  setup()

  var link_two = document.getElementById('link_two')

  t.plan(1)
  delegate(ever(root), selector('[rel=lol]'))
    .on('click', function(ev) {
      t.ok(this === link_two)
      t.end()
    })

  ever(link_two).emit('click', {canBubble: true})
  ever(link_two.parentNode).emit('click', {canBubble: true})
})

