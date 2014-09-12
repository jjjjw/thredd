var astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , helpers = require('server/helpers')
  , test = require('tap').test
  ;

test('.getArticleData', function (tap) {
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
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
