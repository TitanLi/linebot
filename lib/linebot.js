const crypto = require('crypto');

module.exports = function(channelSecret){
  this.channelSecret = channelSecret;
  this.middleware = () => {
    return async (ctx, next) => {
      const koaRequest = ctx.request;
      const hash = crypto
                        .createHmac('sha256', channelSecret)
                        .update(JSON.stringify(koaRequest.body))
                        .digest('base64');
      if(ctx.url=='/webhooks'){
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
};
