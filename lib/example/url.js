const request = require('request-promise');
module.exports = {
    url: (events,lineBotToken) => {
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
                    "type": "template",
                    "altText": "URL顯示",
                    "template": {
                        "type": "confirm",
                        "text": "URL顯示分為兩種",
                        "actions": [
                            {
                                "type": "uri",
                                "label": "第一種",
                                "uri": "https://www.youtube.com/watch?v=kMMYxFdER4M"
                            },
                            {
                                "type": "uri",
                                "label": "第二種",
                                "uri": "line://app/1545550801-NO0DrP3k"
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