var router = require('express').Router();
var jwt = require('jwt-simple');

var jwtSecret = require('../secrets').jwt;

router.get('/', function(req, res) {
    var token = req.header('x-auth');

    return res.send(token);
});

module.exports = router;
