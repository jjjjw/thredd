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
  })
  .then(function (newComment) {
    return comments.get(newComment[0].id);
  })
  .then(function (results) {
    var fetchedComment = results[0];
    tap.ok(fetchedComment, 'gets a comment');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('comments.getForArticles(ids)', function (tap) {
  var articleId = coll.id().toString();
  comments.post({
    article: articleId
    , body: 'bodycat'
    , user : 'idcat'
  })
  .then(function (newComment) {
    return comments.getForArticles(articleId);
  })
  .then(function (comments) {
    tap.ok(comments, 'gets comments');
    tap.ok(comments[0].body === 'bodycat', 'gets the relevant comments');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('comments.getForUsers(ids)', function (tap) {
  var userId = coll.id().toString();
  comments.post({
    article: 'articlecat'
    , body: 'bodycat'
    , user : userId
  })
  .then(function (newComment) {
    return comments.getForUsers(userId);
  })
  .then(function (comments) {
    tap.ok(comments, 'gets comments');
    tap.ok(comments[0].body === 'bodycat', 'gets the relevant comments');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('comments.post(validObj)', function (tap) {
  comments.post({
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  })
  .then(function (newComment) {
    tap.ok(newComment, 'creates a comment');
    tap.ok(newComment[0].id, 'creates an id');
    tap.ok(newComment[0].createdAt, 'adds createdAt info');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('comments.post([validObj])', function (tap) {
  comments.post([{
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }, {
    article: 'idcat'
    , body: 'bodycat'
    , user : 'idcat'
  }])
  .then(function (newComment) {
    tap.ok(newComment.length === 2, 'creates both');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('comments.post(invalidObj)', function (tap) {
  tap.throws(comments.post.bind(this, {}));
  db.close();
  tap.end();
});
