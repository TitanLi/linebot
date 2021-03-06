# send
`userId` 可以在 post /webhooks ctx.request.body.events.source.userId 取得
***

### send imagemap(開發中)

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
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```


***
## send carousel template
| property              | Type   | Description |
| ----------------------|:------:| :-----------|
| userId                | String | user id     |
| altText               | String | user received message    |
| thumbnailImageUrl     | Object | user received image url<br>-Image URL (Max: 1000 characters)<br>-HTTPS<br>-JPEG or PNG<br>-Aspect ratio: 1:1.51<br>-Max width: 1024px<br>-Max: 1 MB|
| imageBackgroundColor  | Object | user received image background color   |
| title                 | Object | user received title<br>-Max: 40 characters   |
| text                  | Object | user received message text<br>-Max: 120 characters (no image or title)<br>-Max: 60 characters   |
| defaultAction         | Object | Action when image is tapped<br>-set for the entire image, title, and text area   |
| actions               | Object | Action when tapped<br>-Max: 3   |

**return** request-promise

**success response** {}

#### use:
```javascript
router.get('/sendCarouselTemplate',async (ctx) => {
    let data = await linebot.sendCarouselTemplate(userId,
                                                  altText,
                                                  [thumbnailImageUrl1,thumbnailImageUrl2],
                                                  [imageBackgroundColor1,imageBackgroundColor2],
                                                  [title1,title2],
                                                  [text1,text2],
                                                  [defaultAction1,defaultAction2],
                                                  [actions1,actions2]);
    ctx.body = data;
})
```

#### example:
```javascript
router.get('/sendCarouselTemplate',async (ctx) => {
    let altText = '選單開啟';
    let thumbnailImageUrl1 = 'https://media.istockphoto.com/photos/grey-squirrel-yawning-picture-id473012660?k=6&m=473012660&s=612x612&w=0&h=opzkOsCuudeI_l83My-WdfTiru2mpuwZMpVomymwC9c=';
    let thumbnailImageUrl2 = 'https://cdn.free.com.tw/blog/wp-content/uploads/2014/08/Placekitten480-g.jpg'; 
    let imageBackgroundColor1 = "#FFFFFF";
    let imageBackgroundColor2 = "#FFFFFF";
    let title1 = 'this is menu1';
    let title2 = 'this is menu2';    
    let text1 = 'description1';
    let text2 = 'description2';    
    let defaultAction1 = {
                         "type": "uri",
                         "label": "View detail",
                         "uri": "https://developers.line.me/en/docs/messaging-api/reference/#image"
                       };
    let actions1 = [
                   {
                     "type": "postback",
                     "label": "Buy1",
                     "data":"action=buy&itemid=111",
                     "text": "Buy"
                    },
                   {
                     "type": "postback",
                     "label": "Add to cart1",
                     "data":"action=buy&itemid=111",
                     "text": "Add"
                    },
                   {
                     "type": "uri",
                     "label": "View detail1",
                     "uri": "https://developers.line.me/en/docs/messaging-api/reference/#image"
                    }
                  ];
    let defaultAction2 = {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "https://developers.line.me/en/docs/messaging-api/reference/#image"
                  };
    let actions2 = [
              {
                "type": "postback",
                "label": "Buy2",
                "data":"action=buy&itemid=111",
                "text": "Buy"
               },
              {
                "type": "postback",
                "label": "Add to cart2",
                "data":"action=buy&itemid=111",
                "text": "Add"
               },
              {
                "type": "uri",
                "label": "View detail2",
                "uri": "https://developers.line.me/en/docs/messaging-api/reference/#image"
               }
             ];
    let data = await linebot.sendCarouselTemplate(userId,
                                                  altText,
                                                  [thumbnailImageUrl1,thumbnailImageUrl2],
                                                  [imageBackgroundColor1,imageBackgroundColor2],
                                                  [title1,title2],
                                                  [text1,text2],
                                                  [defaultAction1,defaultAction2],
                                                  [actions1,actions2]);
    ctx.body = data;
})
```
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```

***
## send image carousel template
| property              | Type   | Description |
| ----------------------|:------:| :-----------|
| userId                | String | user id     |
| altText               | String | user received message    |
| imageUrl     | Object | user received image url<br>-Image URL (Max: 1000 characters)<br>-HTTPS<br>-JPEG or PNG<br>-Aspect ratio: 1:1.51<br>-Max width: 1024px<br>-Max: 1 MB|
| action                | Object | {
                                      "type": "postback",
                                      "label": "Buy",
                                      "data": "action=buy&itemid=111"
                                    }

                                    {
                                      "type": "message",
                                      "label": "Yes",
                                      "text": "yes"
                                    }

                                    {
                                      "type": "uri",
                                      "label": "View detail",
                                      "uri": "http://example.com/page/222"
                                    }   |

**return** request-promise

**success response** {}

#### use:
```javascript
router.get('/sendCarouselTemplate',async (ctx) => {
    let data = await linebot.sendCarouselTemplate(userId,
                                                  altText,
                                                  [imageUrl1,imageUrl2],
                                                  [actionObject1,actionObject2]);
    ctx.body = data;
})
```

#### example:
```javascript
router.get('/',async (ctx) => {
    let data = await linebot.sendImageCarouselTemplate(
      userId,
      'image carousel template',
      ['https://i.imgur.com/9MnIR3R.png','https://i.imgur.com/slkvDvQ.jpg','https://i.imgur.com/W4tV1PY.png'],
      [{
        "type": "postback",
        "label": "Buy",
        "data": "action=buy&itemid=111"
      },
      {
        "type": "message",
        "label": "Yes",
        "text": "yes"
      },
      {
        "type": "uri",
        "label": "View detail",
        "uri": "https://hackmd.io/FoYeXL5aTWaAhkOwE3G0uQ"
      }]);
    ctx.body = data+'\n'+test;
});
```
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```

***

## send location message
| property              | Type   | Description |
| ----------------------|:------:| :-----------|
| userId                | String | user id     |
| title                 | String | title text  |
| address               | String | address text|
| latitude              | Int    | latitude    |
| longitude             | Int    | longitude   |

**return** request-promise

**success response** {}

```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendLocationMessage = (userId,title,address,latitude,longitude);
    ctx.body = data;
});

```
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```
example
```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendLocationMessage(USER_ID,'國立臺中科技大學','台中市北區三民路三段129號',24.150075,120.683921);
    ctx.body = data;
});
```

***

## send confirm template
| property              | Type   | Description |
| ----------------------|:------:| :-----------|
| userId                | String | user id     |
| altText               | String | alt text    |
| text                  | String | message     |

**return** request-promise

**success response** {}

```javascript
router.get('/send',async (ctx) => {
  let data = await linebot.sendConfirmTemplate(userId,altText,text);
  ctx.body = data;
});
```
userId取得方式
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    userId = events.sourceUserId;
});
```
example
```javascript
router.get('/send',async (ctx) => {
    let data = await linebot.sendConfirmTemplate(USER_ID,'購買詢問','確定要購買嗎？');
    ctx.body = data;
});
```