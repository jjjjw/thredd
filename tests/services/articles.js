var articles = require('services/articles')
  coll = require('services/collections/articles')
  , db = require('services/collections/db')
  , test = require('tap').test
  ;

test('articles.generateArticle()', function (tap) {
  articles.generateArticle().then(function (newArticle) {
    tap.ok(newArticle, 'creates a comment');
    tap.ok(newArticle.id, 'creates an id');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('articles.get({ _id: nonexistingId })', function (tap) {
  articles.get({ _id: coll.id()}).then(function (results) {
    tap.ok(results[0].id, 'generates a new article if none exists');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('articles.get({ _id: existingId })', function (tap) {
  articles.post({
    title: 'idcat'
    , body: 'bodycat'
  }).then(function (newArticle) {
    return articles.get({
      _id: newArticle._id
    });
  }).then(function (results) {
    var existingArticle = results[0];
    tap.ok(existingArticle, 'fetches an article');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('articles.post(validObj)', function (tap) {
  articles.post({
    title: 'idcat'
    , body: 'bodycat'
  }).then(function (newArticle) {
    tap.ok(newArticle, 'creates a comment');
    tap.ok(newArticle.id, 'creates an id');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('articles.post(invalidObj)', function (tap) {
  articles.post({
    body : 'bodycat'
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
