var article = require('services/schemas/article')
  , comment = require('services/schemas/comment')
  , draft4 = require('services/schemas/draft4')
  , test = require('tap').test
  , user = require('services/schemas/user')
  , ZSchema = require('z-schema')
  ;

test('schemas', function (tap) {
  var validator = new ZSchema();
  tap.ok(validator.validateSchema([article, draft4, comment, user]), 'all schemas valid');
  tap.end();
});
