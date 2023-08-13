const express = require("express");
const handleMessage = require('../services/telegram/message');
const line_handleMessage = require('../services/line/message');
const crypto = require('crypto');

require('dotenv').config();
const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/telegram-webhook', (req, res) => {

    console.log('Telegram Message received...')
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
        console.log('Line Message Received...');
        console.log(req.body);

        line_handleMessage(req.body.events);

        res.sendStatus(200);
    } else {

        console.warn('Invalid LINE signature');
        res.sendStatus(403);

    }
})

app.listen(PORT, () => {

    console.log("Server is running on Port: ", PORT);

})
