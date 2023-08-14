const line = require('@line/bot-sdk');
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios');
const crypto = require('crypto');

const express = require("express");
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('dotenv').config();
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const TOKEN = process.env.TELEGRAM_TOKEN

const LINE_CONFIG = {
    channelAccessToken: LINE_ACCESS_TOKEN,
    channelSecret: LINE_CHANNEL_SECRET
};
const bot = new line.Client(LINE_CONFIG);

const OPENAI_CONFIGURATION = new Configuration({
    apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(OPENAI_CONFIGURATION);

const SEND_MESSAGE_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

module.exports = {
    openai: openai,
    bot: bot,
    axios: axios,
    app: app,
    PORT: PORT,
    crypto: crypto,
    SEND_MESSAGE_URL: SEND_MESSAGE_URL,
    TOKEN: TOKEN,
    CHANNEL_SECRET: LINE_CHANNEL_SECRET
}
