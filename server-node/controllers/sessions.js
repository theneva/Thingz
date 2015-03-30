var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');

var User = require('../models/user');

var jwtSecret = require('../secrets').jwt;

router.get('/', function (req, res) {
    res.send(jwt.encode({username: 'theneva'}, jwtSecret));
});

router.post('/', function (req, res, next) {
    var loginAttempt = req.body;

    if (!loginAttempt || !loginAttempt.username || !loginAttempt.password) {
        return res.status(401).send('Request must contain {username, password}');
    }

    User.findOne({username: loginAttempt.username}, function(err, user) {
        if (!user) {
            return res.status(401).send('Wrong username or password');
        }

        bcrypt.compare(loginAttempt.password, user.password, function(err, success) {
            if (err) return next(err);

            if (!success) {
                return res.status(401).send('Wrong username or password');
            }

            delete user.password;
            delete user.things;
            return res.send(jwt.encode(user, jwtSecret));
        });
    });
});

module.exports = router;
