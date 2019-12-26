// sticker list
// https://developers.line.biz/media/messaging-api/sticker_list.pdf
const request = require('request-promise');
module.exports = {
    sticker: (events, lineBotToken, packageId, stickerId) => {
        let replyToken = events[0].replyToken;
        let options = {
            method: 'POST',
            uri: 'https://api.line.me/v2/bot/message/reply',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${lineBotToken}`
            },
            body: {
                replyToken: replyToken,
                messages: [{
                    "type": "sticker",
                    "packageId": packageId,
                    "stickerId": stickerId
                }]
            },
            json: true
        }
        return request(options);
    }
}