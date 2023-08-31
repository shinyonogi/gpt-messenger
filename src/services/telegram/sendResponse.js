const { axios, SEND_MESSAGE_URL} = require('../../configuration/config')


const sendResponse = async (replyMessage) => {
    try {
        const response = await axios.post(SEND_MESSAGE_URL, replyMessage)
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};

module.exports = sendResponse;
