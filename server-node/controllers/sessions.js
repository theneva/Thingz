var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('hi');
});

module.exports = router;
