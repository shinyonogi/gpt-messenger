const completion = require('../gpt/completion');
const autoReply = require('../../botflow/autoreply');
const fetchAllMessages =  require('../../database/fetchAllMessages');
const typingResponse = require('./typingResponse');


const generateResponse = async ( chatId, receivedMessage ) => {
    let replyBody;
    let replyMessage;

    typingResponse(chatId);

    replyBody = await autoReply(chatId);
    const replyMessageEmpty = Object.keys(replyBody).length === 0;
    if (replyMessageEmpty) {
        let allMessages = await fetchAllMessages(chatId);
        //allMessages.unshift({role : 'user', content : receivedMessage});
        replyMessage = await completion(allMessages);
        console.log("@generateResponse, Reply Message: " + replyMessage);
        replyBody = {
            chat_id : chatId,
            text: replyMessage
        };
    }else {
        replyMessage = replyBody.text;
    }

    return [replyBody, replyMessage];
}

module.exports = generateResponse;
