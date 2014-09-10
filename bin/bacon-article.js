#!/usr/bin/env node
var articles = require('services/articles')
  , comments = require('services/comments')
  , bacon = require('baconipsum')
  , db = require('services/collections').db
  , users = require('services/users')
  ;

(function () {
  var article = {
    body: '<p>' + bacon(250).replace('\n', '<p>')
    , title: bacon(5)
  }
  , user1
  , user2
  ;

  // TODO: lol, i.e. batch posts
  articles.post(article)
  .then(function (newArticle) {
    article = newArticle;
    return users.post({
      name: 'Fry'
    });
  })
  .then(function (newUser) {
    console.log(newUser);
    user1 = newUser;
    return users.post({
      name: 'Babe'
    });
  })
  .then(function (newUser) {
    console.log(newUser);
    user2 = newUser;
    return users.post({
      name: 'Winston Churchill'
    });
  })
  .then(function (newUser) {
    console.log(newUser);
    user3 = newUser;
    return comments.post({
      article: article.id
      , body: bacon(10)
      , user: user1.id
    });
  })
  .then(function (newComment) {
    console.log(newComment);
    return comments.post({
      article: article.id
      , body: bacon(5)
      , parent: newComment.id
      , user: user2.id
    });
  })
  .then(function (newComment) {
    console.log(newComment);
    return comments.post({
      article: article.id
      , body: bacon(5)
      , user: user3.id
    });
  })
  .then(function (newComment) {
    console.log(newComment);
    db.close();
    console.log(article)
    console.log('Navigate to /articles/' + article.id);
  });
})();
