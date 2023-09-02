const { db } = require('../configuration/config');


const getStepNumber = async ( chatId ) => {

    const userRef = db.collection('users').doc(String(chatId));

    try {
        const snapshot = await userRef.get();
        if (snapshot.empty) {
            console.log("User Not found!");
        }else {
            return snapshot.data().step_nr;
        }
    } catch (error) {
        console.log("Error getting document:", error);
        //DB currently does not return a value if the user is not initiated! -> TypeError
        //Potential solution: If TypeError ocurrs, assume user is initiated and has step_nr of 0
        if (error instanceof TypeError) {
            return 0;
        }
    }

}

module.exports = getStepNumber;
