var Editor = require('ui/editor')
  , React = require('react')
  , test = require('tap').test
  ;

test('new Editor()', function (tap) {
  tap.ok(React.isValidClass(Editor), 'is React Class');
  tap.end();
});

test('Editor html', function (tap) {
  var editor = new Editor();
  var editorHTML = React.renderComponentToString(editor);
  tap.ok(editorHTML.indexOf('textarea') > -1, 'renders textarea');
  tap.end();
});

test('focuses iff there is a parent', {skip: true } ,function (tap) {
  // TODO: browser tests
});

test('displays errors', {skip: true } ,function (tap) {
  // TODO: browser tests
});
