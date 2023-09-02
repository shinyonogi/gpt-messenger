const { db } = require('../configuration/config');


const saveResponse = ( chatId, response ) => {

    const userRef = db.collection('users').doc(String(chatId));
    const messagesRef = userRef.collection('messages');
    const messageToSave = {
        role : "system",
        to : "user",
        content : response,
        timestamp : new Date()
    };

    messagesRef.add(messageToSave)
        .then(docRef => {
            console.log('Response stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });

}

module.exports = saveResponse;
