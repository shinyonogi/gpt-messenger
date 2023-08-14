const { saveMessage, saveUser, saveResponse, fetchAllMessages } = require('../../database/db');
const { openai, bot} = require('../../configuration/config');


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

    switch (received_Message[0].type) {
        case 'postback':

            //Handling postback messages
            console.log('Postback message received');

            break;

        case 'message':

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

            break;

        default:
            console.log('Neither postback nor message!');
    }
}

module.exports = line_handleMessage;
