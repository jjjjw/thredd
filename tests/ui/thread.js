var Thread = require('ui/thread').Thread
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
      , user: 'idcat'
    },{
      body: 'bodycat'
      , id: 'a2'
      , user: 'idcat'
    }]
    , depth: 0
    , users: {
      idcat: {
        name: 'namecat'
      }
    }
  });
  var threadHtml = React.renderComponentToString(thread);
  tap.ok(threadHtml.indexOf('bodycat') > -1, 'renders attribute');
  tap.ok(threadHtml.indexOf('namecat') > -1, 'renders attribute');
  tap.ok(threadHtml.indexOf('thread-depth-0') > -1, 'renders depth');
  tap.end();
});
