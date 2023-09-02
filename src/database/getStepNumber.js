const { db } = require('../configuration/config');


const getStepNumber = async ( chatId ) => {

    console.log("@getStepNumer: ChatID: " + chatId);
    const userRef = db.collection('users').doc(String(chatId));
    console.log(userRef);

    try {
        const snapshot = await userRef.get();
        if (snapshot.empty) {
            console.log("User Not found!");
        }else {
            return snapshot.data().step_nr;
        }
    } catch (error) {
        console.log("Error getting document:", error);
    }

}

module.exports = getStepNumber;
