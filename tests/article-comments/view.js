var React = require('react')
  , sinon = require('sinon')
  , test = require('tap').test
  ;

var els = [];

GLOBAL.document = {
  getElementById: function () {
    var stub = sinon.stub();
    els.push(stub);
    return stub;
  }
};

test('.render(article, comments, users)', function (tap) {
  var view = require('article-comments/javascripts/view');
  sinon.stub(React, 'renderComponent');
  view.render('', [], []);
  tap.ok(React.renderComponent.callCount === 2, 'two components');
  tap.ok(els.length === 3, 'three elements');

  React.renderComponent.restore();
  els = [];
  tap.end();
});
