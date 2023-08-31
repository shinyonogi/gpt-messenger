const { router, crypto, CHANNEL_SECRET } = require('../configuration/config');
const line_handleMessage = require('../services/line/message');


router.post('/line-webhook', (req, res) => {
    const signature = crypto
        .createHmac('SHA256', CHANNEL_SECRET)
        .update(JSON.stringify(req.body))
        .digest('base64');

    if (signature === req.headers['x-line-signature']) {
        console.log('Valid LINE signature');
        console.log('Line Message Received...');
        console.log(req.body);

        line_handleMessage(req.body.events);

        res.sendStatus(200).send('OK');
    } else {
        console.warn('Invalid LINE signature');

        res.sendStatus(403);
    }
});

module.exports = router;
