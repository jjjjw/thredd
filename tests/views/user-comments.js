var userCommentsView = require('views/user-comments')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , helpers = require('views/helpers')
  , test = require('tap').test
  ;

test('.userCommentsView()', function (tap) {
  var commentBody;
  astroturf()
  .then(function (article) {
    return helpers.getArticleData(article);
  })
  .then(function (data) {
    var userId = data.users[0].id;
    commentBody = data.comments.reduce(function (body, comment) {
      if (comment.user === userId) {
        return comment.body;
      }
      return body;
    }, '');
    return userCommentsView(userId);
  })
  .then(function (html) {
    console.log(commentBody, html)
    tap.ok(html.indexOf(commentBody) > -1, 'adds the user\'s comments');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
