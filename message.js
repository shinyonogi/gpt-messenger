const INFO = require('./info');
const TOKEN = INFO.Telegram_TOKEN;
const SEND_MESSAGE_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const OPENAI_API_KEY = INFO.OPENAI_API_KEY;
const OPENAI_URL = "https://api.openai.com/v1/engines/davinci-codex/completions";

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const axios = require('axios');


const sendMessage = async (chat_id) => {

    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "What is your name?" }],
    });

    const MESSAGE = chat_completion.data.choices[0].message.content;

    const CHAT_ID = chat_id;

    console.log("Sending Message...")
    console.log(`To ${CHAT_ID}`)

    try {
        const response = await axios.post(SEND_MESSAGE_URL, {
        chat_id: CHAT_ID,
        text: MESSAGE
        });

        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = sendMessage;
