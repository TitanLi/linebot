# response user
## auto response carousel template
linebot.responseCarouselTemplate()

| property              | Type   | Description                               |
| ----------------------|:------:|:------------------------------------------|
| events                | Object | JSON(requestHandle)                       |
| altText               | String | user received message                     |
| thumbnailImageUrl     | Object | user received image url<br>-Image URL (Max: 1000 characters)<br>-HTTPS<br>-JPEG or PNG<br>-Aspect ratio: 1:1.51<br>-Max width: 1024px<br>-Max: 1 MB|
| imageBackgroundColor  | Object | user received image background color      |
| title                 | Object | user received title<br>-Max: 40 characters|
| text                  | Object | user received message text<br>-Max: 120 characters (no image or title)<br>-Max: 60 characters |
| defaultAction         | Object | Action when image is tapped<br>-set for the entire image, title, and text area|
| actions               | Object | Action when tapped<br>-Max: 3              |

**return** request-promise

**success response** {}

### use
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
    await linebot.responseCarouselTemplate( 
                                            events,
                                            altText,
                                            [thumbnailImageUrl1,thumbnailImageUrl2],
                                            [imageBackgroundColor1,imageBackgroundColor2],
                                            [title1,title2],
                                            [text1,text2],
                                            [defaultAction1,defaultAction2],
                                            [actions1,actions2]
                                        );
});
```

### example
```javascript
router.post('/webhooks',async (ctx) => {
    let events = linebot.requestHandle(ctx);
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
    await linebot.responseCarouselTemplate( 
                                            events,
                                            altText,
                                            [thumbnailImageUrl1,thumbnailImageUrl2],
                                            [imageBackgroundColor1,imageBackgroundColor2],
                                            [title1,title2],
                                            [text1,text2],
                                            [defaultAction1,defaultAction2],
                                            [actions1,actions2]
                                        );
});
```