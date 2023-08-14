const message = {
    type: 'template',
    altText: 'ボタンテンプレートです',
    template: {
        type: 'buttons',
        thumbnailImageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLuW2xcJlrbLdQDiw-wTCsElgoQIvbaXRZ40pCZX9vxYuLh1W3njnzZ_SZddy3nVpXeTDZqdKX6rI-MQBECmDwL80RPHDA4d5_lBe89Z8YTbBw9LSlnkTYFbKFmLvObN6tMyyCx7kPVQiMVILHoqH-ze4DDH1n6tf6PIo06l_6w95xdmZ40m7X7Bzx9g/s664/rennai_kaeruka.png',
        title: 'タイトル',
        text: '選択してください',
        actions: [
            {
                type: 'postback',
                label: 'ボタン1',
                data: 'action=button1'
            },
            {
                type: 'postback',
                label: 'ボタン2',
                data: 'action=button2'
            }
        ]
    }
};

//client.pushMessage(USER_ID, message);
