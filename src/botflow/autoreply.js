const autoReply = ( chatId　) => {
    let replyMessage = {};
    const step = -1;

    if (step === 0) {
        reply = 'What are your academic goals this semester?';
    }else if (step === 1) {
        reply = 'What grades are you aiming in your courses?';
    }

    if (step !== -1) {
        const keyboard = {
            inline_keyboard: [
                [{ text: 'ボタン1', callback_data: 'data1' }],
                [{ text: 'ボタン2', callback_data: 'data2' }]
            ]
        };
        replyMessage = {chat_id: chat_id, text: reply, reply_markup: keyboard}
    }

    return replyMessage;
}

module.exports = autoReply;
