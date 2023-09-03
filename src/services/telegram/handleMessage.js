const saveResponse = require('../../database/saveResponse');
const saveReceivedMessage = require('../../database/saveReceivedMessage');
const saveUser = require('../../database/saveUser');
const generateResponse = require('./generateResponse');
const sendResponse = require('./sendResponse');
const handleCallback = require('./handleCallback');


const handleMessage = async ( requestBody ) => {

    if (requestBody.message) {
        const receivedMessage = String(requestBody.message.text);
        const chatId = requestBody.message.chat.id;
        const user = {
            chatId : chatId,
            firstName : requestBody.message.chat.first_name,
            lastName : requestBody.message.chat.last_name,
            languageCode : requestBody.message.from.language_code
        };
        const userExist = await saveUser(user);
        saveReceivedMessage(user, receivedMessage);

        const responseGenerated = await generateResponse(chatId, receivedMessage);
        const responseBody = responseGenerated.responseBody;
        sendResponse(responseBody);

        const responseMessage = responseGenerated.responseMessage;
        saveResponse(chatId, responseMessage);

    }else if (requestBody.callback_query) {
        const chatId = requestBody.callback_query.from.id;
        handleCallback(chatId, requestBody.callback_query);
    }

};

module.exports = handleMessage;
