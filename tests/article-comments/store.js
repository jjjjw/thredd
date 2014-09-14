var React = require('react')
  , request = require('superagent')
  , sinon = require('sinon')
  , test = require('tap').test
  ;

var els = [];
var evs = [];
var dispatches = [];

GLOBAL.document = {
  getElementById: function () {
    var stub = {
      addEventListener: function (ev, cb) {
        evs.push({
          ev: ev
          , cb: cb
        });
      }
      , dispatchEvent: function (ev) {
        dispatches.push(ev);
      }
    };
    els.push(stub);
    return stub;
  }
};

test('commentEntered', function (tap) {
  var store = require('article-comments/javascripts/store');
  store('articlecat', [], []);

  var commentEntered = evs[0];
  tap.ok(commentEntered.ev === 'commentEntered', 'listens for commentEntered');

  sinon.stub(request, 'post', function (path) {
    tap.ok(path === '/comments', 'posts to comments');
    return {
      send: function (comment) {
        console.log(comment)
        tap.ok(comment.article === 'articlecat', 'has data');
        tap.ok(comment.body === 'bodycat', 'has data');
        tap.ok(comment.parent === 'parentcat', 'has data');
        tap.ok(comment.user === '54111be98ca49e6f95b202c2', 'invents a user');

        return {
          end: function (cb) {
            cb(null, {body: [comment]});
          }
        }
      }
    }
  })

  GLOBAL.CustomEvent = function (ev, data) {
    tap.ok(ev === 'storeUpdated', 'signals an update');
    tap.ok(data.detail.comments.length, 'adds the comment');
    this.name = ev;
  };

  commentEntered.cb({
    detail: {
      body: 'bodycat'
      , parent: 'parentcat'
    }
  });

  GLOBAL.CustomEvent = null;
  request.post.restore();

  tap.ok(dispatches.length, 'dispatched an event');
  tap.ok(dispatches[0].name === 'storeUpdated', 'signals store updated');

  els = [];
  evs = [];
  dispatches = [];

  tap.end();
});
