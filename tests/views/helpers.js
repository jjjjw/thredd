var articlesColl = require('services/collections').articles
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , helpers = require('views/helpers')
  , test = require('tap').test
  ;

test('.getArticleData(goodId)', function (tap) {
  astroturf()
  .then(function (article) {
    return helpers.getArticleData(article);
  })
  .then(function (data) {
    tap.ok(data.article, 'gets article');
    tap.ok(data.comments, 'gets comments');
    tap.ok(data.users, 'gets users');
    tap.ok(data.article instanceof Object, 'gets article');
    tap.ok(data.comments instanceof Array, 'gets comments');
    tap.ok(data.users instanceof Array, 'gets users');
    return clearDb();
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('.getArticleData(badId)', function (tap) {
  helpers.getArticleData(articlesColl.id())
  .then(function (data) {
  }, function (err) {
    tap.ok(err.status === 404, 'sets 404');
    tap.end();
  });
});

test('.getUserCommentsData(goodId)', function (tap) {
  astroturf()
  .then(function (article) {
    return helpers.getArticleData(article);
  })
  .then(function (data) {
    return helpers.getUserCommentsData(data.users[0].id);
  })
  .then(function (data) {
    tap.ok(data.comments, 'gets comments');
    tap.ok(data.users, 'gets users');
    tap.ok(data.comments instanceof Array, 'gets comments');
    tap.ok(data.users instanceof Array, 'gets users');
    return clearDb();
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});

test('.getUserCommentsData(badId)', function (tap) {
  helpers.getUserCommentsData(articlesColl.id())
  .then(function (data) {
  }, function (err) {
    db.close();
    tap.ok(err.status === 404, 'sets 404');
    tap.end();
  });
});
