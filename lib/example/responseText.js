const request = require('request-promise');
module.exports = {
    responseText: (events, lineBotToken, resObject) => {
            let message = events[0].message.text;
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
                        type: "text",
                        text: resObject[message]
                    }]
                },
                json: true
            }
            return request(options);
    }
}