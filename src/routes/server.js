const { app, PORT } = require('../configuration/config');
const telegramRoute = require('./telegramRoute');
//const lineRoute = require('./lineRoute'); Currently Unavaiblable


app.use('/', telegramRoute);
//app.use('/', lineRoute); Currently Unavailable

app.listen(PORT, () => { console.log("Server is running on Port: ", PORT); })
