var coll = require('services/collections').comments
  , comments = require('services/comments')
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('comments.get(query)', function (tap) {
  comments.post({
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }).then(function (newComment) {
    return comments.get(newComment.id);
  }).then(function (results) {
    var fetchedComment = results[0];
    tap.ok(fetchedComment, 'gets a comment');
    return coll.remove({});
  }).then(function () {
    tap.end();
  }, function (err) {
    console.log(err);
  });
});

test('comments.getForArticles(article)', function (tap) {
  var articleId = coll.id().toString();
  comments.post({
    article: articleId
    , body: 'bodycat'
    , user : 'idcat'
  }).then(function (newComment) {
    return comments.getForArticles({
      id: articleId
    });
  }).then(function (comments) {
    tap.ok(comments, 'gets comments');
    tap.ok(comments[0].body === 'bodycat', 'gets the relevant comments');
    return coll.remove({});
  }).then(function () {
    tap.end();
  }, function (err) {
    console.log(err);
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
