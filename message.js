const info = require('./info');
const telegram_api_key = info.telegram_api_key;
const open_ai_api_key = info.open_ai_api_key;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: open_ai_api_key,
});

const axios = require('axios');

const openai = new OpenAIApi(configuration);

/*
const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
})
*/

const TOKEN = telegram_api_key;
const text = "hello :)"

const BASE_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const sendMessage = async (chat_id) => {

    console.log("Sending Message...")
    console.log(`To ${chat_id}`)

    const CHAT_ID = chat_id;

    try {
        const response = await axios.post(BASE_URL, {
        chat_id: CHAT_ID,
        text: text
        });

        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = sendMessage;
