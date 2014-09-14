var coll = require('services/collections').users
  , db = require('services/collections').db
  , test = require('tap').test
  , users = require('services/users')
  ;

test('users.get(query)', function (tap) {
  users.post({
    name: 'namecat'
  })
  .then(function (newUser) {
    return users.get(newUser[0].id);
  })
  .then(function (results) {
    var fetchedUser = results[0];
    tap.ok(fetchedUser, 'gets a user');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});


test('users.post(validObj)', function (tap) {
  users.post({
    name: 'namecat'
  })
  .then(function (newUser) {
    tap.ok(newUser, 'creates a comment');
    tap.ok(newUser[0].id, 'creates an id');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('users.post(invalidObj)', function (tap) {
  users.post({}).then(function () {
    tap.notOk(true, 'should not be valid');
  }, function (err) {
    tap.ok(err.code === 'OBJECT_MISSING_REQUIRED_PROPERTY', 'invalid');
    return coll.remove({});
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});
