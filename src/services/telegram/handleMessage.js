const { saveReceivedMessage, saveUser } = require('../../database/db');
const generateResponse = require('./generateResponse');
const sendResponse = require('./sendResponse');


const handleMessage = async ( requestBody ) => {
    const receivedMessage = String(requestBody.message.text);
    const chatId = requestBody.message.chat.id;
    const user = {
        chatId : chatId,
        firstName : requestBody.message.chat.first_name,
        lastName : requestBody.message.chat.last_name,
        languageCode : requestBody.message.from.language_code
    };

    saveUser(user);
    saveReceivedMessage(user, receivedMessage);

    const response = await generateResponse(chatId, receivedMessage);
    sendResponse(response);
};

module.exports = handleMessage;
