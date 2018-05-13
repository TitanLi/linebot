# library

所需套件
* ``crypto``
* ``request``
* ``request-promise``
* ``fs``


使用方法
``` javascript
const lineBot = require('./lib/linebot.js');
const linebot = new lineBot(channelSecret,lineBotToken);
```


Middleware
``` javascript
const koa = require('koa');
const Router = require('koa-router');
const lineBot = require('./lib/linebot.js');
const linebot = new lineBot(channelSecret,lineBotToken);
const app = new koa();
const router = Router();

app
  .use(linebot.middleware())
  .use(router.routes());
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
{
  'replyToken' : replyToken, @string
  'type' : type, @string
  'sourceType' : sourceType, @string
  'sourceUserId' : sourceUserId, @string
  'messageType' : messageType, @string
  'messageText' : messageText @string
}
```
``` javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
});
```
