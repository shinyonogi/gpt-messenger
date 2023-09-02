const completion = require('../gpt/completion');
const autoReply = require('../../botflow/autoreply');
const fetchAllMessages =  require('../../database/fetchAllMessages');
const typingResponse = require('./typingResponse');


const generateResponse = async ( chatId, receivedMessage ) => {

    let responseBody;
    let responseMessage;

    typingResponse(chatId);

    responseBody = await autoReply(chatId);
    const replyMessageEmpty = Object.keys(responseBody).length === 0;
    if (replyMessageEmpty) {
        let allMessages = await fetchAllMessages(chatId);
        //allMessages.unshift({role : 'user', content : receivedMessage});
        responseMessage = await completion(allMessages);
        console.log("@generateResponse, Reply Message: " + responseMessage);
        responseBody = {
            chat_id : chatId,
            text: responseMessage
        };
    }else {
        responseMessage = responseBody.text;
    }

    return {responseBody: responseBody, responseMessage: responseMessage};

}

module.exports = generateResponse;
