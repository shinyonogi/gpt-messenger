const { db } = require('../configuration/config');

const updateStepNumber = ( chatId, stepNr ) => {

    const userRef = db.collection('users').doc(String(chatId));

    userRef.update({
        step_nr: stepNr
    }).then(() => {
        console.log("Document succesfully updated!");
    }).catch((error) => {
        console.log("Error Updating Step Nr: " + error);
    });

}

module.exports = updateStepNumber;
