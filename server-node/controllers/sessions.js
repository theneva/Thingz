var router = require('express').Router();
var jwt = require('jwt-simple');

var jwtSecret = require('../secrets').jwt;

router.get('/', function(req, res) {
    res.send(jwt.encode({username: 'theneva'}, jwtSecret));
});

module.exports = router;
