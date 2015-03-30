var router = require('express').Router();
var jwt = require('jwt-simple');

var jwtSecret = require('../secrets').jwt;

router.get('/', function (req, res) {
    res.send(jwt.encode({username: 'theneva'}, jwtSecret));
});

router.post('/', function (req, res) {
    var loginAttempt = req.body;

    if (!loginAttempt || !loginAttempt.username || !loginAttempt.password) {
        return res.status(401).send('Request must contain {username, password}');
    }

    if (loginAttempt.username !== 'theneva'
        || loginAttempt.password !== '1234') {
        return res.status(401).send('Wrong username or password');
    }

    var payload = {
        username: 'Theneva',
        fullName: 'Martin Lehmann'
    };

    return res.send(jwt.encode(payload, jwtSecret));
});

module.exports = router;
