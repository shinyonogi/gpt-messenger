const axios = require('axios');
const line = require('@line/bot-sdk');

const { Configuration, OpenAIApi } = require("openai");
const { saveMessage, saveUser, saveResponse, fetchAllMessages } = require('../../database/db');

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


const line_sendMessage = async (chat_id, content, reply_token) => {

    let ALL_MESSAGES = await fetchAllMessages(chat_id);
    ALL_MESSAGES.unshift({role : 'user', content: content})

    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: ALL_MESSAGES.slice(0, 20).reverse()
    });
    const MESSAGE = chat_completion.data.choices[0].message.content;

    saveResponse(chat_id, MESSAGE)

    try {
        bot.replyMessage(reply_token, { type:'text', text: MESSAGE});
        console.log('Line Message sent.');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

const line_handleMessage = (received_Message) => {

    const CONTENT = received_Message[0].message.text;

    const REPLY_TOKEN = received_Message[0].replyToken;

    const USER = {
        CHAT_ID : received_Message[0].source.userId,
        FIRST_NAME : null,
        LAST_NAME : null,
        LANGUAGE_CODE : null
    };

    saveUser(USER);
    saveMessage(USER, CONTENT);
    line_sendMessage(USER.CHAT_ID, CONTENT, REPLY_TOKEN);
}

module.exports = line_handleMessage;
