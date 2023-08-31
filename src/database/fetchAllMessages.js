const { db } = require('../configuration/config');


const fetchAllMessages = async ( chatId ) => {
    const messagesRef = db.collection('users').doc(String(chatId)).collection('messages').orderBy('timestamp', 'desc');

    try {
        const snapshot = await messagesRef.get();
        if (snapshot.empty) {
            console.log('No matching documents found.');
            return [];
        }

        let messages = [];
        snapshot.forEach(doc => {
            messages.push({ role: doc.data().role, content: doc.data().content});
        });

        return messages;

    } catch (error) {
      console.error("Error fetching messages: ", error);
    }
};

module.exports = fetchAllMessages;
