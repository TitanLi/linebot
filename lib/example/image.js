const request = require('request-promise');
module.exports = {
    image: (events, lineBotToken, originalContentUrl, previewImageUrl) => {
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
                    "type": "image",
                    "originalContentUrl": originalContentUrl,
                    "previewImageUrl": previewImageUrl
                }]
            },
            json: true
        }
        return request(options);
    }
}