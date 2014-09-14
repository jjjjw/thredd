#!/usr/bin/env node
var articles = require('services/articles')
  , commentsSvc = require('services/comments')
  , bacon = require('baconipsum')
  , db = require('services/collections').db
  , Showdown = require('showdown')
  , usersSvc = require('services/users')
  ;

var converter = new Showdown.converter();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/randoms
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function astroturf () {
  var article = {
    body: converter.makeHtml(bacon(250))
    , title: bacon(getRandomInt(1, 5))
  };

  var users = ['Babe', 'Fry', 'Wilbur', 'Winston Churchill'].map(function (name) {
    return {
      name: name
    };
  });

  function getComments (article, users) {
    var comments = [];
    for (var i = getRandomInt(3, 10); i >= 0; i--) {
      comments.push({
        article: article
        , body: bacon(getRandomInt(5, 20))
        , user: users[getRandomInt(0, users.length - 1)]
      });
    };
    return comments;
  }

  function getReplies (article, users, parent) {
    return getComments(article, users).map(function (comment) {
      comment.parent = parent;
      return comment;
    });
  }

  function postReplies (article, users, parents) {
    var replies = [];
    parents.forEach(function (comment) {
      if (getRandomInt(0, 1) === 0) {
        return;
      }
      replies = replies.concat(getReplies(article, users, comment.id));
    });
    return commentsSvc.post(replies);
  }

  var articleId;
  var userIds = [];
  var parentIds = [];

  return articles.post(article)
  .then(function (article) {
    articleId = article[0].id;
    return usersSvc.post(users);
  })
  .then(function (users) {
    userIds = users.map(function (user) {
      return user.id;
    });
    var comments = getComments(articleId, userIds);
    return commentsSvc.post(comments);
  })
  .then(function (parents) {
    return postReplies(articleId, userIds, parents);
  })
  .then(function (parents) {
    return postReplies(articleId, userIds, parents);
  })
  .then(function () {
    return articleId;
  }, function (err) {
    console.log(err.stack);
  });
};

if (!module.parent) {
  astroturf().then(function () {
    db.close();
  });
}

module.exports = astroturf;
