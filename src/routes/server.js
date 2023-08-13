const express = require("express");
const handleMessage = require('../services/telegram/message');
require('dotenv').config();
const crypto = require('crypto');
const line = require('@line/bot-sdk');


const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
console.log(process.env.LINE_ACCESS_TOKEN);

const config = {
    channelAccessToken: process.env.LINE_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET
};

const bot = new line.Client(config);

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/telegram-webhook', (req, res) => {

    console.log(req.body);
    handleMessage(req.body)

    res.status(200).send('OK');

});


app.post('/line-webhook', (req, res) => {

    const signature = crypto
        .createHmac('SHA256', CHANNEL_SECRET)
        .update(JSON.stringify(req.body))
        .digest('base64');

    if (signature === req.headers['x-line-signature']) {
        console.log('Valid LINE signature');
        const events = req.body.events;

        console.log('Showing events...');
        console.log(events);

        const replyToken = events[0].replyToken;
        console.log(replyToken)

        bot.replyMessage(replyToken, { type:'text', text: '息してる？'})

        res.sendStatus(200);
    } else {
        console.warn('Invalid LINE signature');
        res.sendStatus(403);
    }
})

app.listen(PORT, () => {

    console.log("Server is running on Port: ", PORT);

})
