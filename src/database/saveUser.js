const { db } = require('../configuration/config');


const saveUser = async ( user ) => {

    const userRef = db.collection('users').doc(String(user.chatId));

    await userRef.get().then(docSnapshot => {
        if (docSnapshot.exists) {
            console.log('User already exists!');
            return true;
        }else {
            console.log('User does not exist. Creating new...');
            userRef.set({
                first_name : user.firstName,
                last_name : user.lastName,
                language_code : user.languageCode,
                step_nr: 0,
            })
            return false;
        }
    }).catch(error => {　
        console.error("Error checking user existence: ", error);
    });

};

module.exports = saveUser;
