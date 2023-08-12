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

const { saveMessage, saveUser, saveResponse } = require('./db');
//const saveMessage = require('./db');

//Create ChatCompletion using OpenAI API and send via the telegram Bot
const sendMessage = async (chat_id, content) => {

    const CHAT_ID = chat_id;
    const CONTENT = content;

    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: CONTENT }],
    });

    const MESSAGE = chat_completion.data.choices[0].message.content;

    console.log("Sending Message...")
    console.log(`To ${CHAT_ID}`)

    saveResponse(CHAT_ID, MESSAGE)

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

//Handle Received Message. This method will be called first whenever Bot receives a message.
const handleMessage = (received_Message) => {

    const CONTENT = String(received_Message.message.text);

    const USER = {
        CHAT_ID : received_Message.message.chat.id,
        FIRST_NAME : received_Message.message.chat.first_name,
        LAST_NAME : received_Message.message.chat.last_name,
        LANGUAGE_CODE : received_Message.message.from.language_code
    };

    //For Debugging
    /*
    console.log(received_Message);
    console.log(USER);
    console.log(CONTENT)
    */

    saveUser(USER);
    saveMessage(USER, CONTENT);
    sendMessage(USER.CHAT_ID, CONTENT);

}


module.exports = handleMessage;
