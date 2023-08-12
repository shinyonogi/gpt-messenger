var admin = require("firebase-admin");

var serviceAccount = require('./webhook-chatbot-65815-firebase-adminsdk-bnyih-ba13430a8b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const saveUser = (user) => {

    console.log("In saveUser section...");

    const CHAT_ID = user.CHAT_ID;

    const userRef = db.collection('users').doc(String(CHAT_ID));

    userRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
            console.log('User already exists!');
        }else {
            console.log('User does not exist. Creating new...');

            userRef.set({
                first_name : user.FIRST_NAME,
                last_name : user.LAST_NAME,
                language_code : user.LANGUAGE_CODE
            })
        }
    }).catch(error => {
        console.error("Error checking user existence: ", error);
    });
};

const saveMessage = (user, content) => {

    const CHAT_ID = user.CHAT_ID;

    const userRef = db.collection('users').doc(String(CHAT_ID));
    const messagesRef = userRef.collection('messages');

    const MESSAGE = {
        role : "user",
        to : "system",
        content : content,
        timestamp : new Date()
    };

    console.log("In the save Message section...");
    //console.log(user);
    //console.log(content);
    messagesRef.add(MESSAGE)
        .then(docRef => {
            console.log('Message stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });
};

const saveResponse = (chat_id, response) => {

    const userRef = db.collection('users').doc(String(chat_id));
    const messagesRef = userRef.collection('messages');

    const SAVE_MESSAGE = {
        role : "system",
        to : "user",
        content : response,
        timestamp : new Date()
    };

    messagesRef.add(SAVE_MESSAGE)
        .then(docRef => {
            console.log('Message stored with ID: ', docRef.id);
        })
        .catch(error => {
            console.log('Error adding message: ', error);
        });
}


module.exports = {
    saveUser,
    saveMessage,
    saveResponse
};
