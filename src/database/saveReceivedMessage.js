const { db } = require('../configuration/config');


const saveReceivedMessage = ( user, receivedMessage ) => {

    const userRef = db.collection('users').doc(String(user.chatId));
    const messagesRef = userRef.collection('messages');
    const messageToSave = {
        role : "user",
        to : "system",
        content : receivedMessage,
        timestamp : new Date()
    };

    messagesRef.add(messageToSave)
        .then(docRef => {
            console.log('Received Message stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });

};

module.exports = saveReceivedMessage;
