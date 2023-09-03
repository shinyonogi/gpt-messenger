const getStepNumber = require('../../database/getStepNumber');
const saveMotivation = require('../../database/saveMotivation');

const handleCallback = async ( chatId, callbackBody ) => {

    let step = await getStepNumber(chatId);
    console.log("@handleCallback, Step Nr: " + step);

    if (step === 1) {
        console.log("In step 0");
        const motivationLevel = callbackBody.data;
        saveMotivation(chatId, motivationLevel);
    }else if (step === 2) {
        console.log("In step 1");
    }else if (step === 3) {
        console.log("In step 2");
    }

}

module.exports = handleCallback;
