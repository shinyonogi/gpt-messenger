const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const { saveMessage, saveUser, saveResponse, fetchAllMessages } = require('../../database/db');
const crypto = require('crypto');
const line = require('@line/bot-sdk');

require('dotenv').config();
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const LINE_CONFIG = {
    channelAccessToken: LINE_ACCESS_TOKEN,
    channelSecret: LINE_CHANNEL_SECRET
};
const bot = new line.Client(LINE_CONFIG);

const OPENAI_CONFIGURATION = new Configuration({
    apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(OPENAI_CONFIGURATION);


const line_handleMessage = (received_Message) => {

    const replyToken = received_Message[0].replyToken;
    console.log(replyToken)

    bot.replyMessage(replyToken, { type:'text', text: '息してる？'})

}

module.exports = line_handleMessage;
