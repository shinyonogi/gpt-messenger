const getStepNumber = require('../../database/getStepNumber');

const handleCallback = async ( chatId, callbackBody ) => {

    let step = await getStepNumber(chatId);

    if (step === 0) {

    }

}
