// https://developers.line.biz/en/docs/messaging-api/using-rich-menus/
const crypto = require('crypto');
const request = require('request-promise');
const fs = require('fs');
const createRichMenu = (lineBotToken) => {
    let options = {
        method: 'POST',
        uri: 'https://api.line.me/v2/bot/richmenu',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${lineBotToken}`
        },
        body: {
            "size": {
                "width": 2500,
                "height": 843
            },
            "selected": false,
            "name": "Nice richmenu",
            "chatBarText": "Tap here",
            "areas": [
                {
                    "bounds": {
                        "x": 0,
                        "y": 0,
                        "width": 833,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "1"
                    }
                },
                {
                    "bounds": {
                        "x": 833,
                        "y": 0,
                        "width": 833,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "2"
                    }
                },
                {
                    "bounds": {
                        "x": 1666,
                        "y": 0,
                        "width": 834,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "3"
                    }
                },
                {
                    "bounds": {
                        "x": 0,
                        "y": 422,
                        "width": 833,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "4"
                    }
                },
                {
                    "bounds": {
                        "x": 833,
                        "y": 422,
                        "width": 833,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "5"
                    }
                },
                {
                    "bounds": {
                        "x": 1666,
                        "y": 422,
                        "width": 834,
                        "height": 421
                    },
                    "action": {
                        "type": "message",
                        "text": "6"
                    }
                }
            ]
        },
        json: true
    };
    return request(options);
}

// Image format: JPEG or PNG
// Image size (pixels): 2500x1686, 2500x843, 1200x810, 1200x405, 800x540, 800x270
// Maximum file size: 1 MB
const uploadRichMenuImage = (richMenuId, picturePath, lineBotToken) => {
    let readStream = fs.createReadStream(picturePath);
    let stats = fs.statSync(picturePath);
    console.log(picturePath);
    console.log(stats);
    let fileSizeInBytes = stats["size"];
    let options = {
        method: 'POST',
        uri: `https://api.line.me/v2/bot/richmenu/${richMenuId}/content`,
        headers: {
            'Authorization': `Bearer ${lineBotToken}`,
            'Content-Type': 'image/png',
            'Content-Length': fileSizeInBytes
        },
        body: readStream,
        encoding: null
    };
    console.log(options);
    return request(options);
}

const setDefaultRichMenu = (richMenuId, lineBotToken) => {
    let options = {
        method: 'POST',
        uri: `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${lineBotToken}`
        },
        body: {},
        json: true
    };
    return request(options);
}

module.exports = {
    createRichMenu: createRichMenu,
    uploadRichMenuImage: uploadRichMenuImage,
    setDefaultRichMenu: setDefaultRichMenu
}