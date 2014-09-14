var articles = require('services/collections').articles
  , comments = require('services/collections').comments
  , db = require('services/collections').db
  , users = require('services/collections').users

function clearDb () {
  return articles.remove({})
  .then(function () {
    return comments.remove({});
  })
  .then(function () {
    return users.remove({});
  });
}

if (!module.parent) {
  clearDb().then(function () {
    db.close();
  });
}

module.exports = clearDb;
