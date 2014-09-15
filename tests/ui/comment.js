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
      , replies: [{
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
  var commentHtml = React.renderComponentToString(comment);
  tap.ok(commentHtml.indexOf('bodycat') > -1, 'renders attribute');
  tap.ok(commentHtml.indexOf('namecat') > -1, 'renders attribute');
  tap.ok(commentHtml.indexOf('replycat') > -1, 'renders attribute');
  tap.end();
});
