const { fetchAllMessages } = require('../../database/db');
const { axios, TOKEN } = require('../../configuration/config')
const completion = require('../gpt/completion');
const autoReply = require('../../botflow/autoreply');

const generateResponse = async ( chatId, receivedMessage ) => {
    let replyBody;

    axios.post(`https://api.telegram.org/bot${TOKEN}/sendChatAction`, {
        chat_id: chatId,
        action: 'typing'
        })
        .then(response => {
        console.log('Typing action sent:', response.data);
        })
        .catch(error => {
        console.error('Error sending typing action:', error);
    });

    let allMessages = await fetchAllMessages(chatId);
    allMessages.unshift({role : 'user', content : receivedMessage})


    let replyMessage = autoReply(chatId);
    const replyMessageEmpty = Object.keys(replyMessage).length === 0;

    if (replyMessageEmpty) {
        replyMessage = await completion(allMessages);
        console.log(replyMessage);
        replyBody = {
            chat_id : chatId,
            text: replyMessage
        };
    }else {
        replyBody = replyMessage;
    }

    return [replyBody, replyMessage];

}

module.exports = generateResponse;
