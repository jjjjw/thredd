var articles = require('views/articles')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('.articles()', function (tap) {
  var articleId;
  astroturf()
  .then(function (article) {
    articleId = article;
    return articles();
  })
  .then(function (articles) {
    tap.ok(articles.articles[0], 'fetches all articles');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
