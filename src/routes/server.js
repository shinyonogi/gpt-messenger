const { app, PORT } = require('../configuration/config');
const telegramRoute = require('./telegramRoute');
const lineRoute = require('./lineRoute');


app.use('/', telegramRoute);
app.use('/', lineRoute);

app.listen(PORT, () => {
    console.log("Server is running on Port: ", PORT);
})
