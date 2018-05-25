# send
`userId` 可以在 post /webhooks ctx.request.body.events.source.userId 取得
***
## send text
| property   | Type   | Description |
| -----------|:------:| :-----------|
| userId     | String | user id     |
| text       | String | message     |

**return** request-promise

**success response**  {}

``` javascript
router.get('/send',async (ctx) => {
  let data = await linebot.sendText(userId,text);
  ctx.body = data;
});
```
***
## send sticker
[sticker_list]( https://developers.line.me/media/messaging-api/sticker_list.pdf)

| property   | Type   | Description |
| -----------|:------:| :-----------|
| userId     | String | user id     |
| packageId  | Int    | STKPKGID    |
| stickerId  | Int    | stickerId   |

**return** request-promise

**success response** {}

```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendSticker(userId,packageId,stickerId);
    ctx.body = data;
});
```
***
## send image
| property            | Type   | Description       |
| --------------------|:------:| :-----------------|
| userId              | String | user id           |
| originalContentUrl  | Int    | https images url<br>JPEG<br>Max: 1024 x 1024<br>Max: 1 MB|
| previewImageUrl     | Int    | https images url<br>JPEG<br>Max: 240 x 240<br>Max: 1 MB  |

**return** request-promise

**success response** {}

```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendImage(userId,originalContentUrl,previewImageUrl);
    ctx.body = data;
});
```
***
## send video
| property            | Type   | Description       |
| --------------------|:------:| :-----------------|
| userId              | String | user id           |
| originalContentUrl  | Int    | https video url<br>mp4<br>Max: 1 minute<br>Max: 10 MB |
| previewImageUrl     | Int    | https images url<br>JPEG<br>Max: 240 x 240<br>Max: 1 MB |

**return** request-promise

**success response** {}

```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendVideo(userId,originalContentUrl,previewImageUrl);
    ctx.body = data;
});

```