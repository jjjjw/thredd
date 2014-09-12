var Actions = require('ui/comment-actions')
  , React = require('react')
  , test = require('tap').test
  ;

test('new Actions()', function (tap) {
  tap.ok(React.isValidClass(Actions), 'is React Class');
  tap.end();
});

test('Actions html', function (tap) {
  var actions = new Actions();
  var actionsHTML = React.renderComponentToString(actions);
  tap.ok(actionsHTML.indexOf('reply') > -1, 'renders reply');
  tap.end();
});
