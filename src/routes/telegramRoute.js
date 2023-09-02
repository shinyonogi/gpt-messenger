const { router } = require('../configuration/config');
const handleMessage = require('../services/telegram/handleMessage');

router.post('/telegram-webhook', (req, res) => {

    console.log('Telegram Message received...')
    console.log(req.body);

    handleMessage(req.body)

    res.status(200).send('OK');

});

module.exports = router;

