const sendMessage = require('./message');

const express = require("express");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/telegram-webhook', (req, res) => {

    console.log(req.body);

    const conversation_id = req.body.message.chat.id;
    sendMessage(conversation_id);

    res.status(200).send('OK');
})

app.listen(PORT, () => {
    console.log("Server is running on Port 3000");
})
