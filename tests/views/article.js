var articleView = require('views/article')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('.articleView(goodId)', function (tap) {
  astroturf()
  .then(function (article) {
    return articleView(article);
  })
  .then(function (html) {
    tap.ok(html.indexOf('"js-init-data" data-json="{') > -1, 'adds init data');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
