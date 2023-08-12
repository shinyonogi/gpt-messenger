var admin = require("firebase-admin");

var serviceAccount = require('./webhook-chatbot-65815-firebase-adminsdk-bnyih-ba13430a8b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const saveUser = async (user) => {

    console.log(user);

    const CHAT_ID = user.CHAT_ID;

    const userRef = db.collection('users').doc(CHAT_ID);

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
}

module.exports = saveUser;
