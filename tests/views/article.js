var article = require('views/article')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('.article(goodId)', function (tap) {
  astroturf()
  .then(function (articleId) {
    return article(articleId);
  })
  .then(function (data) {
    tap.ok(data.initJSON, 'adds init data');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
