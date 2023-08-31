const { openai } = require('../../configuration/config');

const completion = async (　ALL_MESSAGES　) => {
    const behavior = "あなたは今から常にギャル口調で喋ってください。";
    const context = [{"role":"system", "content": behavior}];
    const messageToGpt = [...context, ...ALL_MESSAGES.slice(0, 20).reverse()];
    console.log(messageToGpt);

    const chat_completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageToGpt
    });
    const MESSAGE = chat_completion.data.choices[0].message.content;

    return MESSAGE;
}

module.exports = completion;
