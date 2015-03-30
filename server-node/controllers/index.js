var router = require('express').Router();

router.get('/env', function (req, res) {
    return res.json([
        'hi',
        'there'
    ]);
});

router.use('/sessions', require('./sessions'));

module.exports = router;
