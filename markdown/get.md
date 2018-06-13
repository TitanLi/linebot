# get
`userId` 可以在 post /webhooks ctx.request.body.events.source.userId 取得
***
## get profile

| property   | Type   | Description |
| -----------|:------:| :-----------|
| userId     | String | user id     |

**return** request-promise

**需測試**
``` javascript
router.get('/getProfile',async (ctx) => {
    let getProfile = await linebot.getProfile(userId);
    ctx.body = getProfile;
});
```
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```