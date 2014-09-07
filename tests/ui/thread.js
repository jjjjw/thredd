var Thread = require('threads/ui/thread').Thread
  , React = require('react')
  , test = require('tap').test
  ;

test('new Thread()', function (tap) {
  tap.ok(React.isValidClass(Thread), 'is React Class');
  tap.end();
});

test('thread html', function (tap) {
  var thread = new Thread({
    comments: [{
      body: 'bodycat'
      , id: 'a1'
      , user: 'usercat'
    },{
      body: 'bodycat'
      , id: 'a2'
      , user: 'usercat'
    }]
  });
  var threadHTML = React.renderComponentToString(thread);
  tap.ok(threadHTML.indexOf('bodycat') > -1, 'renders attribute');
  tap.ok(threadHTML.indexOf('usercat') > -1, 'renders attribute');
  tap.end();
});
