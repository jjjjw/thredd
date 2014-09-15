var test = require('tap').test
  , transforms = require('transforms')
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
  var testObj = {
    createdAt: 2
    , id: 'parentcat'
  };
  var thread = transforms.threadify([
    testObj
  , { createdAt: 3
    , id: 'childcat'
    , parent: 'parentcat'
  }, {
    createdAt: 1
    , id: 'lastcat'
  }]);
  tap.ok(thread.length === 2, 'has comments');
  tap.ok(thread[0].id === 'parentcat', 'has a top level comment');
  tap.ok(thread[0].replies[0].id === 'childcat', 'has a reply level comment');
  tap.ok(thread[1].id === 'lastcat', 'orders from most newest to oldest');
  tap.ok(thread[0] !== testObj, 'clones the comments');
  tap.end();
});
