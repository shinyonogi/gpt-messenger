const { db } = require('../configuration/config');

const saveMotivation = ( chatId, motivationLevel ) => {

    const userRef = db.collection('users').doc(String(chatId));

    userRef.set({
        motivation_level: motivationLevel
    }, { merge: true })

}

module.exports = saveMotivation;
