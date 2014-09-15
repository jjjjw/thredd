var React = require('react')
  , test = require('tap').test
  , User = require('ui/user')
  ;

test('new User()', function (tap) {
  tap.ok(React.isValidClass(User), 'is React Class');
  tap.end();
});

test('user html', function (tap) {
  var user = new User();
  var userHtml = React.renderComponentToString(user);
  tap.ok(userHtml.indexOf('Anonymous') > -1, 'defaults to anonymous');
  tap.end();
});
