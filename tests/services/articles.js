var articles = require('services/articles')
  , coll = require('services/collections').articles
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('articles.get(id)', function (tap) {
  articles.post({
    title: 'idcat'
    , body: 'bodycat'
  })
  .then(function (newArticles) {
    return articles.get(newArticles[0].id);
  })
  .then(function (results) {
    var existingArticle = results[0];
    tap.ok(existingArticle, 'fetches an article');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('articles.post(validObj)', function (tap) {
  articles.post({
    title: 'idcat'
    , body: 'bodycat'
  })
  .then(function (newArticle) {
    tap.ok(newArticle, 'creates a comment');
    tap.ok(newArticle[0].id, 'creates an id');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('articles.post(invalidObj)', function (tap) {
  tap.throws(articles.post.bind(this, {
    body : 'bodycat'
  }));
  db.close();
  tap.end();
});
