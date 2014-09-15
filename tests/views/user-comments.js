var userComments = require('views/user-comments')
  , astroturf = require('../../bin/astroturf')
  , clearDb = require('../../bin/clear-db')
  , db = require('services/collections').db
  , helpers = require('views/helpers')
  , test = require('tap').test
  ;

test('.userComments()', function (tap) {
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
    return userComments(userId);
  })
  .then(function (data) {
    tap.ok(data.commentsHtml, 'adds the user\'s comments');
    return clearDb();
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack)
  });
});
