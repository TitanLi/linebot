const koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
// const co = require('co');
const dotenv = require('dotenv').load();
// 送 Request 用 ( 也要安裝 request package )
const request = require('request-promise');
// 載入 crypto ，等下要加密
// const crypto = require('crypto');
// const serve = require('koa-static');
// 使用linebot library
const lineBot = require('./lib/linebot.js');

const app = new koa();
const router = Router();
//lineBot library 實作
const channelSecret = process.env.channelSecret;
const lineBotToken = process.env.lineBotToken;
const linebot = new lineBot(channelSecret,lineBotToken);

var userId = 'Ue1ed1792dfbdbd4ed43f91ad295bbc9d';
var richMenuId = '';

app.use(logger());
app.use(bodyparser());
// app.use(serve(__dirname+'/public/picture'));

router.get('/',async (ctx) => {
  let data = await linebot.getProfile(userId);
  ctx.body = data;
});

router.post('/webhooks',async (ctx) => {
  let events = linebot.requestHandle(ctx);
  userId = events.sourceUserId;
  await linebot.responseText(events,{
                              '哈囉':'你好阿',
                              '晚安':'晚安'
                             });
});

router.get('/create',async (ctx) => {
    //create rich menu
    let richMenu = await linebot.createRichMenu(2500,1686,true,'chatBarText',0,0,2500,1686,'message','Yes','Yes apple');
    richMenuId = richMenu.richMenuId;
    //upload rich menu image
    let uploadRichMenuImage = await linebot.uploadRichMenuImage(richMenu.richMenuId,`${__dirname}/public/picture/asd.png`);

    ctx.body = uploadRichMenuImage;
});

router.get('/richmenutouser',async (ctx) => {
    //link rich menu to user
    let linkRichMenuToUser = await linebot.linkRichMenuToUser(userId,richMenuId);
    ctx.body = linkRichMenuToUser;
});

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

app
  .use(linebot.middleware())
  .use(router.routes());
//因為 koa 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
