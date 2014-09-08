var test = require('tap').test
  , transforms = require('services/transforms')
  ;

test('transforms.threadify(null)', function (tap) {
  var thread = transforms.threadify();
  tap.ok(thread.length === 0, 'has no comments');
  tap.end();
});

test('transforms.threadify([])', function (tap) {
  var thread = transforms.threadify([]);
  tap.ok(thread.length === 0, 'has no comments');
  tap.end();
});

test('transforms.threadify(commentsList)', function (tap) {
  var thread = transforms.threadify([{
    createdAt: 1
    , id: 'parentcat'
  }, {
    createdAt: 2
    , id: 'childcat'
    , parent: 'parentcat'
  }]);
  tap.ok(thread.length === 1, 'has comments');
  tap.ok(thread[0].id === 'parentcat', 'has a top level comment');
  tap.ok(thread[0].thread[0].id === 'childcat', 'has a reply level comment');
  tap.end();
});
