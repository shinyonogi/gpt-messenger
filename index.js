const express = require("express");
const bodyParser = require("body-parser");

const info = require('./info');
const telegram_api_key = info.telegram_api_key;
const open_ai_api_key = info.open_ai_api_key;

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: open_ai_api_key,
});
const openai = new OpenAIApi(configuration);

/*
const chat_completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
})
*/

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', () => {
    console.log('Test Succeed');
})

app.post('/telegram-webhook', (req, res) => {
    console.log(req.body);

    res.status(200).send('OK');
})

app.listen(PORT, () => {
    console.log("Server is running on Port 3000");
})
