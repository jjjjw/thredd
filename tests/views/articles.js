var articlesView = require('views/articles')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , test = require('tap').test
  ;

test('.articlesView()', function (tap) {
  var articleId;
  astroturf()
  .then(function (article) {
    articleId = article;
    return articlesView(article);
  })
  .then(function (html) {
    tap.ok(html.indexOf('href="/articles/' + articleId) > -1, 'adds links to articles');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
