var app = require('server')
  , articles = require('services/articles')
  , articlesColl = require('services/collections').articles
  , commentsColl = require('services/collections').comments
  , db = require('services/collections').db
  , test = require('tap').test
  , users = require('services/users')
  , usersColl = require('services/collections').users
  ;

var request = require('supertest').agent(app.listen());

test('/', function (tap) {
  request.get('/').end(function (err, response) {
    tap.ok(response.status === 302, 'is 302');
    tap.ok(response.headers.location === '/articles', 'redirects to articles');
    tap.end();
  });
});

test('/articles', function (tap) {
  articles.post({
    body: 'bacon'
    , title: 'title'
  })
  .then(function (article) {
    request.get('/articles').end(function (err, response) {
      tap.ok(response.status === 200, 'is 200');
      tap.ok(response.text.indexOf('Articles') >= -1, 'has title');
      tap.ok(response.text.indexOf('bacon') >= -1, 'has bacon');
      articlesColl.remove({}).then(function () {
        tap.end();
      });
    });
  });
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
    commentsColl.remove({}).then(function () {
      tap.end();
    });
  })
});

test('/users/existing', function (tap) {
  users.post({
    name: 'Fry'
  })
  .then(function (user) {
    var userId = user[0].id;
    return new Promise(function (resolve, reject) {
      request.get('/users/' + userId).end(function (err, response) {
        tap.ok(response.status === 302, 'is 302');
        tap.ok(response.headers.location === '/users/' + userId + '/comments', 'redirects to user comments');
        usersColl.remove({}).then(resolve);
      });
    })
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err);
  });
});

test('/user/notexisting', function (tap) {
  request.get('/user/' + usersColl.id()).end(function (err, response) {
    tap.ok(response.status === 404, 'is 404');
    tap.ok(response.text === 'Not Found', 'not found');
    tap.end();
  });
});

test('/user/existing/comments', function (tap) {
  users.post({
    name: 'Fry'
  })
  .then(function (user) {
    var userId = user[0].id;
    return new Promise(function (resolve, reject) {
      request.get('/users/' + userId + '/comments').end(function (err, response) {
        tap.ok(response.status === 200, 'is 200');
        tap.ok(response.text.indexOf('Fry\'s Comments') >= -1, 'has title');
        usersColl.remove({}).then(resolve);
      });
    })
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err);
  });
});

test('/user/notexisting/comments', function (tap) {
  request.get('/user/' + usersColl.id() + '/comments/').end(function (err, response) {
    tap.ok(response.status === 404, 'is 404');
    tap.ok(response.text === 'Not Found', 'not found');
    db.close();
    tap.end();
  });
});
