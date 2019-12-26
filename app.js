const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//使用.env檔的參數
const dotenv = require('dotenv').load();
const linebot = require('./lib/linebot.js');

const app = new koa();
const router = Router();
const channelSecret = process.env.channelSecret;
const lineBotToken = process.env.lineBotToken;

app.use(bodyParser());

router.post('/webhooks',async (ctx, next) => {

});

app
  .use(linebot.middleware(channelSecret))
  .use(router.routes());

const server = app.listen(process.env.PORT || 8080, function() {
    const port = server.address().port;
        console.log("App now running on port", port);
});