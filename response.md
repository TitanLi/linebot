# response user

## auto response text
linebot.responseText()

| property   | Type   | Description                               |
| -----------|:------:| :-----------------------------------------|
| events     | Object | JSON(requestHandle)                       |
| resObject  | Object |JSON(Key:user message,Value:response text) |

return request-promise
### use
``` javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    await linebot.responseText(events,resObject);
});
```
### example
``` javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    await linebot.responseText(events,{
                                '哈囉':'你好阿',
                                '晚安':'晚安'
                              });
});
```
