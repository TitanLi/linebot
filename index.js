var linebot = require('linebot');
var express = require('express');
var request = require('request');
var co = require('co');
var account = require('./account.json');

var bot = linebot({
    channelId: account.channelId,
    channelSecret: account.channelSecret,
    channelAccessToken: account.channelAccessToken
});

var msg;
var data;

bot.on('message', function(event) {
  msg=event.message.text;
  console.log(event); //把收到訊息的 event 印出來看看
  if(msg=='哈囉'){
    event.reply({ type: 'text', text: '哈囉' });
  }else if(msg=='淡水天氣如何'){
    var event = event;
    request('https://works.ioa.tw/weather/api/weathers/50.json', function (error, response, body) {
      data = JSON.parse(body);
      if(data.specials.length != 0){
        event.reply({ type: 'text', text: '天氣：'+data.desc+'\n溫度：'+data.temperature+'\n體感溫度：'+data.felt_air_temp+'\n溼度：'+data.humidity+'\n雨量：'+data.rainfall+'\n\n\n特別預報：'+'\n標題：'+data.specials[0].title+'\n狀態：'+data.specials[0].status+'\n敘述：'+data.specials[0].desc});
      }else{
        event.reply({ type: 'text', text: '天氣：'+data.desc+'\n溫度：'+data.temperature+'\n體感溫度：'+data.felt_air_temp+'\n溼度：'+data.humidity+'\n雨量：'+data.rainfall});
      }
    });
  }else if(msg=='台中天氣如何' || msg=='臺中天氣如何'){
    var event = event;
    request('https://works.ioa.tw/weather/api/weathers/116.json', function (error, response, body) {
      data = JSON.parse(body);
      if(data.specials.length != 0){
        event.reply({ type: 'text', text: '天氣：'+data.desc+'\n溫度：'+data.temperature+'\n體感溫度：'+data.felt_air_temp+'\n溼度：'+data.humidity+'\n雨量：'+data.rainfall+'\n\n\n特別預報：'+'\n標題：'+data.specials[0].title+'\n狀態：'+data.specials[0].status+'\n敘述：'+data.specials[0].desc});
      }else{
        event.reply({ type: 'text', text: '天氣：'+data.desc+'\n溫度：'+data.temperature+'\n體感溫度：'+data.felt_air_temp+'\n溼度：'+data.humidity+'\n雨量：'+data.rainfall});
      }
    });
  }else if(msg =='晚安'){
    event.reply({ type: 'text', text: '晚安' });
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
