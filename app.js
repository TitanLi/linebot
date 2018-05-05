const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
// const co = require('co');
const dotenv = require('dotenv').load();
// 送 Request 用 ( 也要安裝 request package )
const request = require('request-promise');
// 載入 crypto ，等下要加密
// const crypto = require('crypto');
// 使用linebot library
const lineBot = require('./lib/linebot.js');

const app = new koa();
const router = Router();
//lineBot library 實作
const channelSecret = process.env.channelSecret;
const linebot = new lineBot(channelSecret);

app.use(logger());
app.use(bodyparser());

router.get('/',async (ctx) => {
  ctx.body = "ok";
});

app
  .use(linebot.middleware())
  .use(router.routes());
//因為 koa 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
