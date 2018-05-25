# rich
## create rich menu
| property    | Type    | Description                                                     |
| ------------|:-------:| :---------------------------------------------------------------|
| width       | Int     | width of the rich menu displayed in the chat                    |
| height      | Int     | height of the rich menu displayed in the chat                   |
| selected    | Boolean | true to display the rich menu by default. Otherwise, false      |
| chatBarText | String  | Text displayed in the chat bar Max: 14 characters               |
| boundsX     | Int     | Horizontal position relative to the top-left corner of the area |
| boundsY     | Int     | Vertical position relative to the top-left corner of the area   |
| boundsWidth | Int     | Width of the area                                               |
| boundsHeight| Int     | Height of the area                                              |
| actionType  | String  | postback or message or uri or datetimepicker                    |
| actionLabel | String  | Label for the action:<br>-Required for templates other than image carousel. Max: 20 characters<br>-Optional for image carousel templates. Max: 12 characters<br>-Optional for rich menus. Spoken when the accessibility feature is enabled on the client device. Max: 20 characters<br>-Supported on LINE iOS version 8.2.0 and later|
| actionText  | String  | Text sent when the action is performed Max: 300 characters      |

**return** request-promise

**response**  {"richMenuId":"richmenu-3def666bec52cfab832c01ffe5xxxxxx"}

#### use:
```javascript
router.get('/create',async (ctx) => {
    //create rich menu
    let richMenu = await linebot.createRichMenu(width,height,selected,chatBarText,boundsX,boundsY,boundsWidth,boundsHeight,actionType,actionLabel,actionText);
    richMenuId = richMenu.richMenuId;
    ctx.body = richMenuId;
});
```

#### example:
```javascript
router.get('/create',async (ctx) => {
    //create rich menu
    let richMenu = await linebot.createRichMenu(2500,1686,true,'chatBarText',0,0,2500,1686,'message','Yes','Yes apple');
    richMenuId = richMenu.richMenuId;
    ctx.body = richMenuId;
});
```

***
## upload rich menu image
| property    | Type   | Description         |
| ------------|:------:| :-------------------|
| richMenuId  | String | richMenu id         |
| picturePath | String | upload picture path |

**return** request-promise

**success response** {}

#### use:
```javascript
router.get('/create',async (ctx) => {
    let uploadRichMenuImage = await linebot.uploadRichMenuImage(richMenuId,picturePath);

    ctx.body = uploadRichMenuImage;
});
```

#### example:
```javascript
router.get('/create',async (ctx) => {
    let uploadRichMenuImage = await linebot.uploadRichMenuImage(richMenu.richMenuId,`${__dirname}/public/picture/asd.png`);

    ctx.body = uploadRichMenuImage;
});
```

***
## rich menu to user
| property   | Type   | Description  |
| -----------|:------:| :------------|
| userId     | String | user id      |
| richMenuId | String | rich menu id |

**return** request-promise

**success response** {}

```javascript
router.get('/richmenutouser',async (ctx) => {
    //link rich menu to user
    let linkRichMenuToUser = await linebot.linkRichMenuToUser(userId,richMenuId);
    ctx.body = linkRichMenuToUser;
});
```

***
## get rich menu list
| property   | Type   | Description  |
| -----------|:------:| :------------|
| userId     | String | user id      |
| richMenuId | String | rich menu id |

**return** request-promise

**response** JSON.stringify()

```javascript
router.get('/getRichMenuList',async (ctx) => {
    let getRichMenuList = await linebot.getRichMenuList();
    let richmenus = JSON.parse(getRichMenuList).richmenus;
    ctx.body = richmenus;
});
```

***
## delete rich menu
| property   | Type   | Description  |
| -----------|:------:| :------------|
| richMenuId | String | rich menu id |

**return** request-promise

**success response** {}

#### use:
```javascript
router.delete('/delete',async (ctx) => {
    deleteRichMenu = await linebot.deleteRichMenu(richmenus);
    ctx.body = deleteRichMenu;
});
```

#### example:
```javascript
router.delete('/delete',async (ctx) => {
    //get rich menu list
    let getRichMenuList = await linebot.getRichMenuList();
    let richmenus = JSON.parse(getRichMenuList).richmenus;
    let deleteRichMenu;
    //delete all rich menu
    for(let i=0;i<richmenus.length;i++){
      deleteRichMenu = await linebot.deleteRichMenu(richmenus[i].richMenuId);
    }
    ctx.body = deleteRichMenu;
});
```