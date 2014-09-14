var article = require('schemas/article')
  , comment = require('schemas/comment')
  , draft4 = require('schemas/draft4')
  , test = require('tap').test
  , user = require('schemas/user')
  , ZSchema = require('z-schema')
  ;

test('schemas', function (tap) {
  var validator = new ZSchema();
  tap.ok(validator.validateSchema([article, draft4, comment, user]), 'all schemas valid');
  tap.end();
});
