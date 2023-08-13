const express = require("express");
const handleMessage = require('./message')

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/telegram-webhook', (req, res) => {

    console.log(req.body);
    handleMessage(req.body)

    res.status(200).send('OK');

})

app.listen(PORT, () => {

    console.log("Server is running on Port: ", PORT);

})
