const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const acsecure = require('koa-acsecure');

const app = new Koa();

app.use(bodyParser());

app.use(acsecure('myAppId', 'myAppToken'));

app.use(ctx => {
  ctx.body = { message: 'ok' };
});

app.listen(8080);