const crypto = require('crypto');
const request = require('request-promise');

module.exports = function(channelSecret,lineBotToken){
  this.channelSecret = channelSecret;
  this.lineBotToken = lineBotToken;

  this.requireHandle = (ctx) => {
    let userMessages = ctx.request.body.events;
    if(ctx.status == 200){
      let replyToken,type,sourceType,sourceUserId,messageType,messageText;
      userMessages.map(function(item, index, array){
        replyToken = item.replyToken;
        type = item.type;
        sourceType = item.source.sourceType;
        sourceUserId = item.source.userId;
        messageType = item.message.messageType;
        messageText = item.message.text;
      });
      return {
        'replyToken' : replyToken,
        'type' : type,
        'sourceType' : sourceType,
        'sourceUserId' : sourceUserId,
        'messageType' : messageType,
        'messageText' : messageText
      }
    }else {
      return false;
    }
  }

  this.middleware = () => {
    return async (ctx, next) => {
      const koaRequest = ctx.request;
      const hash = crypto
                        .createHmac('sha256', channelSecret)
                        .update(JSON.stringify(koaRequest.body))
                        .digest('base64');
      if(ctx.url=='/webhooks' && ctx.method=='POST'){
        if ( koaRequest.headers['x-line-signature'] === hash ) {
          // User 送來的訊息
          ctx.status = 200;
        } else {
          ctx.body = 'Unauthorized! Channel Serect and Request header aren\'t the same.';
          ctx.status = 401;
        }
      }
      await next();
    }
  };

  this.responseText = (events,resObject) => {
    if (events) {
      console.log(events);
      let data = events.messageText;
      console.log(data);
      let options = {
              method: 'POST',
              uri: 'https://api.line.me/v2/bot/message/reply',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lineBotToken}`
              },
              body: {
                replyToken: events.replyToken,
                messages: [{
                    type: "text",
                    text: resObject[data]
                  }]
              },
              json: true
            }
      return request(options);
    }else{
      ctx.body = "hash error";
    }
  };

  this.getProfile = (userId) => {
    let options = {
            uri: 'https://api.line.me/v2/bot/profile/'+userId,
            headers: {
              'Authorization': `Bearer ${lineBotToken}`
            }
          }
    return request(options);
  }
};
