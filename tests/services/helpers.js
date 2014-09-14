var coll = require('services/collections').db.get('helpers')
  , db = require('services/collections').db
  , test = require('tap').test
  , schema = require('schemas/user')
  , helpers = require('services/helpers')
  ;

test('findById', function (tap) {
  coll.insert({'a': 1})
  .then(function (res) {
    return helpers.findById(res[0]._id.toString(), coll);
  })
  .then(function (res) {
    tap.ok(res.length, 'gets results');
    tap.ok(res[0].a === 1, 'gets by id');
    tap.ok(res[0].id, 'has id');
    tap.notOk(res[0]._id, 'no _id');
    console.log(res)
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('findByField', function (tap) {
  coll.insert({'a': 1})
  .then(function (res) {
    return helpers.findByField('a', 1, coll);
  })
  .then(function (res) {
    tap.ok(res.length, 'gets results');
    tap.ok(res[0].a === 1, 'gets by field');
    tap.ok(res[0].id, 'has id');
    tap.notOk(res[0]._id, 'no _id');
    return coll.remove({});
  })
  .then(function () {
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});

test('validateAndSave', function (tap) {
  helpers.validateAndSave({'name': 'a'}, schema, coll)
  .then(function (res) {
    tap.ok(res.length, 'inserts');
    tap.ok(res[0].name === 'a', 'has props');
    tap.ok(res[0].id, 'populates id');
    return coll.remove({});
  })
  .then(function () {
    db.close();
    tap.end();
  }, function (err) {
    console.log(err.stack);
  });
});
