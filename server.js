var articleView = require('threads/views/article')
  , koa = require('koa')
  , route = require('koa-route')
  ;

var app = koa();

app.use(route.get('/articles/:id', function *(id) {
  this.body = yield articleView(id);
}));

app.listen(parseInt(process.env.PORT, 10));
console.log('listening on port ' + process.env.PORT);
