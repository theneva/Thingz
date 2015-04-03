var router = require('express').Router();

router.get('/env', function (req, res) {
    return res.json([
        'hi',
        'there'
    ]);
});

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/things', require('./things'));
router.use('/locations', require('./locations'));

module.exports = router;
