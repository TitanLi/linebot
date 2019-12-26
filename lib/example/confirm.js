const request = require('request-promise');
module.exports = {
    confirm: (replyToken,lineBotToken) => {
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
                    "type": "template",
                    "altText": "分享好友",
                    "template": {
                        "type": "confirm",
                        "text": "是否分享官方帳號資訊給好友",
                        "actions": [
                            {
                                "type": "uri",
                                "label": "yes",
                                "uri": "line://nv/recommendOA/@mlk4006r"
                            },
                            {
                                "type": "message",
                                "label": "no",
                                "text": `No`
                            }
                        ]
                    }
                }]
            },
            json: true
        }
        return request(options);
    }
}