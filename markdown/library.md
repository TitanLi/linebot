# library

所需套件
* ``crypto``
* ``request``
* ``request-promise``
* ``fs``
* ``需將lib資料夾及.env檔案複製至專案目錄之下，並更改.env（channelSecret、lineBotToken)``
* ``將package.json dependencies 所需套件及版本複製至專案內部的package.json``

使用方法
``` javascript
const lineBot = require('./lib/linebot.js');
const linebot = new lineBot(channelSecret,lineBotToken);
```

koa2 Middleware
``` javascript
const koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
//使用.env檔的參數
const dotenv = require('dotenv').load();
const Linebot = require('./lib/linebot.js');
const linebot = new Linebot(process.env.channelSecret,process.env.lineBotToken);

const app = new koa();
const router = Router();

app.use(bodyParser());

router.post('/webhooks',async (ctx, next) => {

});

app
  .use(linebot.middleware())
  .use(router.routes());

var server = app.listen(process.env.PORT || 8080, function() {
    var port = server.address().port;
      console.log("App now running on port", port);
});
```
***
## line developers
需要Webhook URL
``` javascript
router.post('/webhooks',async (ctx) => {

});
```
## line developers post request Handle
分解ctx.request.body.events
```
return Object
  message:
    {
      'type' : type, @string
      'replyToken' : replyToken, @string
      'sourceUserId' : sourceUserId, @string
      'sourceType' : sourceType, @string
      'messageType' : messageType, @string
      'messageText' : messageText @string
    }

    postback:
    {
      'type' : type, @string
      'replyToken' : replyToken, @string
      'sourceUserId' : sourceUserId, @string
      'sourceType' : sourceType, @string
      'postbackData' : postbackData, @string
    }
```
``` javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
});
```
