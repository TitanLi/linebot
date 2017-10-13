var linebot = require('linebot');
var express = require('express');
var account = require('./account.json');

var bot = linebot({
    channelId: account.channelId,
    channelSecret: account.channelSecret,
    channelAccessToken: account.channelAccessToken
});

var msg;
bot.on('message', function(event) {
  msg=event.message.text;
  console.log(event); //把收到訊息的 event 印出來看看
  if(msg=='哈囉'){
    event.reply({ type: 'text', text: '哈囉' });
  }else if(msg=='今天天氣如何'){
    event.reply({ type: 'text', text: '很舒服' });
  }
});

const app = express();
const linebotParser = bot.parser();

app.post('/', linebotParser);
app.get('/msg',function(req,res){
  res.send(msg);
});

// //因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換

var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
