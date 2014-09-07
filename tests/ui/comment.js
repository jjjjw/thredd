var Comment = require('threads/ui/thread').Comment
  , React = require('react')
  , test = require('tap').test
  ;

test('new Comment()', function (tap) {
  tap.ok(React.isValidClass(Comment), 'is React Class');
  tap.end();
});

test('comment html', function (tap) {
  var comment = new Comment({
    body: 'bodycat'
    , user: 'idcat'
    , children: [{
      body: 'replycat'
      , user: 'usercat '
    }]
  });
  var commentHTML = React.renderComponentToString(comment);
  tap.ok(commentHTML.indexOf('bodycat') > -1, 'renders attribute');
  tap.ok(commentHTML.indexOf('idcat') > -1, 'renders attribute');
  tap.ok(commentHTML.indexOf('replycat') > -1, 'renders attribute');
  tap.end();
});
