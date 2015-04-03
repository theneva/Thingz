var router = require('express').Router();
var jwt = require('jwt-simple');

var jwtSecret = require('../secrets').jwt;
var User = require('../models/user');
var Location = require('../models/location');

router.get('/', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);
        return res.json(user.locations);
    });
});

router.post('/', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);

        var location = new Location(req.body);
        user.locations.unshift(location);

        user.save(function (err) {
            if (err) return next(err);
            return res.status(201).json(location);
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);

        user.locations.pull(req.params.id);
        user.save(function(err) {
            if (err) return next(err);
            return res.status(204).send();
        });
    });
});

module.exports = router;
