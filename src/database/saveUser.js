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

module.exports = saveUser;
