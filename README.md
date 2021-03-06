# linebot
> 若要使用library請使用Branch:stable/linebot-library

API模式：
![LINE Developers](https://github.com/TitanLi/linebot/blob/master/public/picture/api.png)

## Send push message API
> POST https://api.line.me/v2/bot/message/push

## Send reply message
> POST https://api.line.me/v2/bot/message/reply

## webhooks body
```javascript
[ 
    { 
        "type": "message",
        "replyToken": "2dd9d92d08204ab6b5628d95d49abebc",
        "source": { 
            "userId": "Ue1ed1792dfbdbd4ed43f91ad295apple",
            "type": "user" 
            },
        "timestamp": 1577346740883,
        "mode": "active",
        "message": { 
            "type": "text", 
            "id": "11148713329452", 
            "text": "apple" 
            } 
    }
]
```

## 使用Koa2建立LINE-Bot Server
所需套件
* ``crypto``
* ``request``
* ``request-promise``
* ``fs``
* ``需將lib資料夾及.env檔案複製至專案目錄之下，並更改.env（channelSecret、lineBotToken)``
* ``將package.json dependencies 所需套件及版本複製至專案內部的package.json``

koa2 framework 建立Server 並加入LINE-Bot Middleware
``` javascript
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

router.post('/webhooks', async (ctx, next) => {

});

app
    .use(linebot.middleware(channelSecret))
    .use(router.routes());

const server = app.listen(process.env.PORT || 8080, function () {
    const port = server.address().port;
    console.log("App now running on port", port);
});
```

## 功能
### 1. auto response text
<img src="https://github.com/TitanLi/linebot/blob/master/public/picture/text.jpeg" height="280px" alt="LINE auto response text" >

#### example
```javascript
const responseText = require('./lib/example/responseText.js');
router.post('/webhooks', async (ctx, next) => {
    let events = ctx.request.body.events;
    data = await responseText.responseText(events, lineBotToken, {
        '哈囉': '你好阿',
        '晚安': '晚安'
    });
    ctx.body = data;
});
```

### 2. sticker
[sticker list](https://developers.line.biz/media/messaging-api/sticker_list.pdf)

<img src="https://github.com/TitanLi/linebot/blob/master/public/picture/sticker.jpeg" height="280px" alt="LINE sticker" >

#### example
```javascript
const sticker = require('./lib/example/sticker.js');
router.post('/webhooks', async (ctx, next) => {
    let events = ctx.request.body.events;
    data = await sticker.sticker(events, lineBotToken, 11537, 52002734);
    ctx.body = data;
});
```

### 3. image
| property            | Description       |
| --------------------| :-----------------|
| originalContentUrl  | https images url<br>Max: 4096 x 4096<br>Max: 1 MB|
| previewImageUrl     | https images url<br>Max: 240 x 240<br>Max: 1 MB  |

<img src="https://github.com/TitanLi/linebot/blob/master/public/picture/image.jpeg" height="280px" alt="LINE image" >

#### example
```javascript
const image = require('./lib/example/image.js');
router.post('/webhooks', async (ctx, next) => {
    let events = ctx.request.body.events;
    data = await image.image(events, lineBotToken, "https://i.imgur.com/slkvDvQ.jpg", "https://i.imgur.com/8206ST0.png");
    ctx.body = data;
});
```

### 4. confirm
<img src="https://github.com/TitanLi/linebot/blob/master/public/picture/confirm.jpeg" height="280px" alt="LINE confirm" >

#### example
```javascript
const confirm = require('./lib/example/confirm.js');
router.post('/webhooks',async (ctx, next) => {
    let events = ctx.request.body.events;
    data = await confirm.confirm(events,lineBotToken);
    ctx.body = data;
});
```

### 5. richMenu
<img src="https://github.com/TitanLi/linebot/blob/master/public/picture/richMenu.jpeg" height="400px" alt="LINE richMenu" >

#### example
```javascript
const richMenu = require('./lib/example/richMenu.js');
router.get('/create', async (ctx) => {
    //create rich menu
    let createDefaultRichMenu = await richMenu.createRichMenu(lineBotToken);
    let richMenuId = createDefaultRichMenu.richMenuId;
    console.log(richMenuId);
    // upload rich menu image
    let uploadRichMenuImageData = await richMenu.uploadRichMenuImage(richMenuId, `${__dirname}/public/img/test.png`, lineBotToken);
    console.log(uploadRichMenuImageData);
    // Set default rich menu
    let setDefaultRichMenuData = await richMenu.setDefaultRichMenu(richMenuId, lineBotToken);
    ctx.body = setDefaultRichMenuData;
});
```

### 6. URL

<div align="center">
    <img src="https://github.com/TitanLi/linebot/blob/master/public/picture/url_demo.jpeg" height="400px" alt="LINE URL Demo" >
    <img src="https://github.com/TitanLi/linebot/blob/master/public/picture/url1.jpeg" height="400px" alt="LINE URL1" >
    <img src="https://github.com/TitanLi/linebot/blob/master/public/picture/url2.jpeg" height="400px" alt="LINE URL2" >
</div>

#### example
```javascript
const url = require('./lib/example/url.js');
router.post('/webhooks', async (ctx, next) => {
    let events = ctx.request.body.events;
    data = await url.url(events, lineBotToken);
    ctx.body = data;
});
```