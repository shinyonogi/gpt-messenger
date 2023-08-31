const { saveMessage, saveUser, saveResponse, fetchAllMessages } = require('../../database/db');
const { axios, openai, TOKEN, SEND_MESSAGE_URL} = require('../../configuration/config')
const completion = require('../gpt/completion');
const autoReply = require('../../botflow/autoreply');


const sendMessage = async (chat_id, content) => {

    axios.post(`https://api.telegram.org/bot${TOKEN}/sendChatAction`, {
        chat_id: chat_id,
        action: 'typing'
        })
        .then(response => {
        console.log('Typing action sent:', response.data);
        })
        .catch(error => {
        console.error('Error sending typing action:', error);
    });

    let ALL_MESSAGES = await fetchAllMessages(chat_id);
    ALL_MESSAGES.unshift({role : 'user', content: content})


    /*
    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: ALL_MESSAGES.slice(0, 20).reverse()
    });
    const MESSAGE = chat_completion.data.choices[0].message.content;
    */
    let MESSAGE = autoReply( chat_id );

    if (MESSAGE === "") {
        MESSAGE = await completion(ALL_MESSAGES);
        const REPLYMESSAGE = { chat_id: chat_id, text: MESSAGE}
        console.log(MESSAGE);
        saveResponse(chat_id, MESSAGE)
        try {
            const response = await axios.post(SEND_MESSAGE_URL, REPLYMESSAGE);
            console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }else {
        const REPLYMESSAGE = MESSAGE;
        const keyboard = {
            inline_keyboard: [
                [{ text: 'ボタン1', callback_data: 'data1' }],
                [{ text: 'ボタン2', callback_data: 'data2' }]
            ]
        };
        try {
            const response = await axios.post(SEND_MESSAGE_URL, {chat_id: chat_id, text: MESSAGE, reply_markup: keyboard});
            console.log('Message sent:', response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }

    }

}


const handleMessage = (received_Message) => {

    const CONTENT = String(received_Message.message.text);

    const USER = {
        CHAT_ID : received_Message.message.chat.id,
        FIRST_NAME : received_Message.message.chat.first_name,
        LAST_NAME : received_Message.message.chat.last_name,
        LANGUAGE_CODE : received_Message.message.from.language_code
    };

    saveUser(USER);
    saveMessage(USER, CONTENT);
    sendMessage(USER.CHAT_ID, CONTENT);

}


module.exports = handleMessage;
