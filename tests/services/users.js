var users = require('threads/services/users')
  coll = require('threads/collections/users')
  , db = require('threads/collections/db')
  , test = require('tap').test
  ;

test('users.get(query)', function (tap) {
  users.post({
    name: 'namecat'
  }).then(function (newUser) {
    return users.get({
      _id: newUser._id
    });
  }).then(function (results) {
    var fetchedUser = results[0];
    tap.ok(fetchedUser, 'gets a comment');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('users.post(validObj)', function (tap) {
  users.post({
    name: 'namecat'
  }).then(function (newUser) {
    tap.ok(newUser, 'creates a comment');
    tap.ok(newUser.id, 'creates an id');
    return coll.remove({});
  }).then(function () {
    tap.end();
  });
});

test('users.post(invalidObj)', function (tap) {
  users.post({}).then(function () {
    tap.notOk(true, 'should not be valid');
  }, function (err) {
    tap.ok(err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY', 'invalid');
    return coll.remove({});
  }).then(function () {
    db.close();
    tap.end();
  });
});
