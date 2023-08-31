const saveResponse = require('../../database/saveResponse');
const saveReceivedMessage = require('../../database/saveReceivedMessage');
const saveUser = require('../../database/saveUser');
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

    const responseGenerated = await generateResponse(chatId, receivedMessage);
    const responseBody = responseGenerated[0];
    sendResponse(responseBody);

    const responseMessage = responseGenerated[1];
    saveResponse(chatId, receivedMessage);
};

module.exports = handleMessage;
