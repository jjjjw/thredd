var app = require('server')
  , articles = require('services/articles')
  , articlesColl = require('services/collections/articles')
  , db = require('services/collections/db')
  , helpers = require('server/helpers')
  , sinon = require('sinon')
  , test = require('tap').test
  ;

var request = require('supertest').agent(app.listen());

test('/articles/nonexisting', function (tap) {
  request.get('/articles/nonexisting').end(function (err, response) {
    tap.ok(response.status === 404, 'is 404');
    tap.ok(response.text === 'No bacon', 'has no bacon');
    tap.end();
  });
});

test('/articles/existing', function (tap) {
  articles.post({
    body: 'bacon'
    , title: 'title'
  })
  .then(function (article) {
    request.get('/articles/' + article.id).end(function (err, response) {
      tap.ok(response.status === 200, 'is 200');
      tap.ok(response.text.indexOf('bacon') >= -1, 'has bacon');
      articlesColl.remove({}).then(function () {
        db.close();
        tap.end();
      });
    });
  });
});
