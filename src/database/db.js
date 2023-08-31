const { db } = require('../configuration/config');


const saveUser = ( user ) => {
    const userRef = db.collection('users').doc(String(user.chatId));

    userRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
            console.log('User already exists!');
        }else {
            console.log('User does not exist. Creating new...');
            userRef.set({
                first_name : user.firstName,
                last_name : user.lastName,
                language_code : user.languageCode
            })
        }
    }).catch(error => {　
        console.error("Error checking user existence: ", error);
    });
};

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
            console.log('Message stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });
};

const saveResponse = async ( chatId, response ) => {
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
            console.log('Message stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });
}

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


module.exports = {
    saveUser,
    saveReceivedMessage,
    saveResponse,
    fetchAllMessages
};
