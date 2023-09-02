const { axios, TOKEN } = require('../../configuration/config');

const typingResponse = ( chatId ) => {

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

};

module.exports = typingResponse;
