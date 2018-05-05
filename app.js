const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
// const co = require('co');
const dotenv = require('dotenv').load();
// 送 Request 用 ( 也要安裝 request package )
const request = require('request-promise');
// 載入 crypto ，等下要加密
const crypto = require('crypto');

const app = new koa();
const router = Router();

const channelSecret = "54695245827351a6d0ca224daaf8290a";

app.use(logger());
app.use(bodyparser());

router.get('/',async (ctx) => {
  ctx.body = "ok";
});

app
  .use(router.routes())
  .use(async (ctx, next) => {
    const koaRequest = ctx.request;
    const hash = crypto
                      .createHmac('sha256', channelSecret)
                      .update(JSON.stringify(koaRequest.body))
                      .digest('base64');
    if ( koaRequest.headers['x-line-signature'] === hash ) {
        // User 送來的訊息
        userMessages = ctx.request.body.events[0];
        ctx.status = 200;
      } else {
        ctx.body = 'Unauthorized! Channel Serect and Request header aren\'t the same.';
        ctx.status = 401;
      }
    await next();
  });
//因為 koa 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
