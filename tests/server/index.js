var app = require('server')
  , articles = require('services/articles')
  , articlesColl = require('services/collections').articles
  , db = require('services/collections').db
  , helpers = require('server/helpers')
  , test = require('tap').test
  , usersColl = require('services/collections').users
  ;

var request = require('supertest').agent(app.listen());

test('/', {skip: true}, function (tap) {
  // TODO
});

test('/articles', {skip: true}, function (tap) {
  // TODO
});

test('/articles/nonexisting', function (tap) {
  request.get('/articles/' + articlesColl.id()).end(function (err, response) {
    tap.ok(response.status === 404, 'is 404');
    tap.ok(response.text === 'Not Found', 'not found');
    tap.end();
  });
});

test('/articles/existing', function (tap) {
  articles.post({
    body: 'bacon'
    , title: 'title'
  })
  .then(function (article) {
    request.get('/articles/' + article[0].id).end(function (err, response) {
      tap.ok(response.status === 200, 'is 200');
      tap.ok(response.text.indexOf('bacon') >= -1, 'has bacon');
      articlesColl.remove({}).then(function () {
        tap.end();
      });
    });
  });
});

test('/comments/', function (tap) {
  request.post('/comments/').send({
    article: 'articlecat'
    , body: 'bodycat'
    , user: 'usercat'
  }).end(function (err, response) {
    var comment = response.body[0];
    tap.ok(response.status === 200, 'is 200');
    tap.ok(comment.body === 'bodycat', 'has body');
    tap.ok(comment.id, 'has id');
    tap.notOk(comment._id, 'has no _id');
    usersColl.remove({}).then(function () {
        db.close();
        tap.end();
      });
    });
});

test('/user/existing', {skip: true}, function (tap) {
  // TODO
});

test('/user/notexisting', {skip: true}, function (tap) {
  // TODO
});

test('/user/existing/comments', {skip: true}, function (tap) {
  // TODO
});

test('/user/notexisting/comments', {skip: true}, function (tap) {
  // TODO
});
