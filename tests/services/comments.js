var coll = require('threads/collections/comments')
  , comments = require('threads/services/comments')
  , db = require('threads/collections/db')
  , test = require('tap').test
  ;

test('comments.get(query)', function (tap) {
  comments.post({
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }).then(function (newComment) {
    return comments.get({
      _id: newComment._id
    });
  }).then(function (results) {
    var fetchedComment = results[0];
    tap.ok(fetchedComment, 'gets a comment');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('comments.getThread(article)', function (tap) {
  comments.post({
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }).then(function (newComment) {
    return comments.getThread({
      id: 'idcat'
    });
  }).then(function (thread) {
    tap.ok(thread, 'creates a thread');
    tap.ok(thread[0].body === 'bodycat', 'threadifies the relevant comments');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('comments.post(validObj)', function (tap) {
  comments.post({
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }).then(function (newComment) {
    tap.ok(newComment, 'creates a comment');
    tap.ok(newComment.id, 'creates an id');
    tap.ok(newComment.createdAt, 'adds createdAt info');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('comments.post(invalidObj)', function (tap) {
  comments.post({
    article: 'idcat'
    , user : 'idcat'
  }).then(function () {
    tap.notOk(true, 'should not be valid');
  }, function (err) {
    tap.ok(err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY', 'invalid');
    return coll.remove({});
  }).then(function () {
    db.close();
    tap.end();
  });
});

test('comments.threadify(null)', function (tap) {
  var thread = comments.threadify();
  tap.ok(thread.length === 0, 'has no comments');
  tap.end();
});

test('comments.threadify([])', function (tap) {
  var thread = comments.threadify([]);
  tap.ok(thread.length === 0, 'has no comments');
  tap.end();
});

test('comments.threadify(commentsList)', function (tap) {
  var thread = comments.threadify([{
    createdAt: 1
    , id: 'parentcat'
  }, {
    createdAt: 2
    , id: 'childcat'
    , parent: 'parentcat'
  }]);
  tap.ok(thread.length === 1, 'has comments');
  tap.ok(thread[0].id === 'parentcat', 'has a top level comment');
  tap.ok(thread[0].children[0].id === 'childcat', 'has a reply level comment');
  tap.end();
});
