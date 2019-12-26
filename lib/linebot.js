const crypto = require('crypto');

const middleware = function (channelSecret) {
  /*
    line bot middleware 處理
    過慮訊息是否由line developers發出請求
    ctx.url = '/webhooks'
    ctx.method=='POST'
    result =>
      true ctx.status = 200
      false ctx.ststus = 401
  */
  return async (ctx, next) => {
    const koaRequest = ctx.request;
    const hash = crypto
      .createHmac('sha256', channelSecret)
      .update(JSON.stringify(koaRequest.body))
      .digest('base64');
    if (ctx.url == '/webhooks' && ctx.method == 'POST') {
      if (koaRequest.headers['x-line-signature'] === hash) {
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

module.exports = { middleware: middleware };