var Comment = require('ui/thread').Comment
  , React = require('react')
  , test = require('tap').test
  ;

test('new Comment()', function (tap) {
  tap.ok(React.isValidClass(Comment), 'is React Class');
  tap.end();
});

test('comment html', function (tap) {
  var comment = new Comment({
    comment: {
      body: 'bodycat'
      , user: 'idcat'
      , thread: [{
        body: 'replycat'
        , user: 'idcat'
      }]
    }
    , users: {
      idcat: {
        name: 'namecat'
      }
    }
  });
  var commentHTML = React.renderComponentToString(comment);
  tap.ok(commentHTML.indexOf('bodycat') > -1, 'renders attribute');
  tap.ok(commentHTML.indexOf('namecat') > -1, 'renders attribute');
  tap.ok(commentHTML.indexOf('replycat') > -1, 'renders attribute');
  tap.end();
});
