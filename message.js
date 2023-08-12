const INFO = require('./info');
const TOKEN = INFO.Telegram_TOKEN;
const API_KEY = INFO.OPENAI_API_KEY;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: API_KEY
});
const openai = new OpenAIApi(configuration);

const axios = require('axios');

/*
const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
})
*/

const sendMessage = async (chat_id) => {

    const CHAT_ID = chat_id;
    const SEND_MESSAGE_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    console.log("Sending Message...")
    console.log(`To ${CHAT_ID}`)

    try {
        const response = await axios.post(SEND_MESSAGE_URL, {
        chat_id: CHAT_ID,
        text: 'Hello World!'
        });

        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = sendMessage;
