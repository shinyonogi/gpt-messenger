const getStepNumber = require('../../database/getStepNumber');

const handleCallback = async ( chatId, callbackBody ) => {

    let step = await getStepNumber(chatId);
    console.log("@handleCallback, Step Nr: " + step);

    if (step === 0) {
        console.log("In step 0");
    }else if (step === 1) {
        console.log("In step 1");
    }else if (step === 2) {
        console.log("In step 2");
    }

}

module.exports = handleCallback;
