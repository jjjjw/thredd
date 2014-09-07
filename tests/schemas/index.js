var article = require('threads/schemas/article')
  , comment = require('threads/schemas/comment')
  , draft4 = require('threads/schemas/draft4')
  , test = require('tap').test
  , user = require('threads/schemas/user')
  , ZSchema = require('z-schema')
  ;

test('schemas', function (tap) {
  var validator = new ZSchema();
  tap.ok(validator.validateSchema([article, draft4, comment, user]), 'all schemas valid');
  tap.end();
});
