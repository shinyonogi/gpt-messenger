const completion = require('../gpt/completion');
const autoReply = require('../../botflow/autoreply');
const fetchAllMessages =  require('../../database/fetchAllMessages');
const typingResponse = require('./typingResponse');


const generateResponse = async ( chatId, receivedMessage ) => {
    let replyBody;

    typingResponse(chatId);


    // Problem hier!
    let replyMessage = autoReply(chatId);
    const replyMessageEmpty = Object.keys(replyMessage).length === 0;
    if (replyMessageEmpty) {
        let allMessages = await fetchAllMessages(chatId);
        allMessages.unshift({role : 'user', content : receivedMessage});
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
