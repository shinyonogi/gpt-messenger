const getStepNumber = require('../database/getStepNumber');

const autoReply = async ( chatId　) => {

    let reply;
    let keyboard;
    let step = await getStepNumber(chatId);
    console.log("@autoReply, StepNr: " + step);

    if (step === 0) {
        reply = 'How high is your academic goal this semester?';
    } else if (step === 1) {
        reply = 'What grades are you aiming in your courses?';
    } else {
        return {};
    }

    if (step === 0) {
        keyboard = {
            inline_keyboard: [
                [{ text: 'High', callback_data: 'high' }],
                [{ text: 'Middle', callback_data: 'middle' }],
                [{ text: 'Low', callback_data: 'low' }]
            ]
        };
    }else if (step === 1) {
        keyboard = {
            inline_keyboard : [
                [{ text: 'Should be 1!', callback_data: '1'}],
                [{ text: 'Around 2.0', callback_data: '2'}],
                [{ text: 'Around 3.0', callback_data: '3'}],
                [{ text: 'Just pass (4.0 is enough)', callback_data: '4'}]
            ]
        }
    }

    const replyMessage = {chat_id: chatId, text: reply, reply_markup: keyboard}
    return replyMessage;

};

module.exports = autoReply;
