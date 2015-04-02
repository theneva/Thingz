var router = require('express').Router();
var bcrypt = require('bcrypt');

var User = require('../models/user');

router.get('/', function (req, res) {
    User.find(function (err, users) {
        res.json(users);
    });
});

router.post('/', function (req, res, next) {
    if (!req.body
        || !req.body.username
        || !req.body.password) {
        return res.status(412).send('Request must at least contain {username, password}');
    }

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) return next(err);
        if (user) {
            return res.status(412).send('A user with the username "' + req.body.username + '" already exists');
        }

        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if (err) return next(err);

            delete req.body.password;
            var newUser = new User(req.body);

            newUser.password = hash;
            newUser.things = [];

            newUser.save(function (err) {
                if (err) return next(err);
                return res.status(201).json(newUser);
            });
        });
    });
});

module.exports = router;
