var articles = require('services/collections/articles')
  , comments = require('services/collections/comments')
  , db = require('services/collections/db')
  , users = require('services/collections/users')

articles.remove({})
.then(function () {
  return comments.remove({});
})
.then(function () {
  return users.remove({});
})
.then(function () {
  db.close();
  console.log('articles cleared')
});
