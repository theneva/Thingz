var router = require('express').Router();
var jwt = require('jwt-simple');

var db = require('../models/user');
var jwtSecret = require('../secrets').jwt;

var Thing = require('../models/thing');

router.get('/', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    db.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);
        return res.json(user.things);
    });
});

router.post('/', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    db.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);

        var thing = new Thing(req.body);
        user.things.push(thing);

        user.save(function (err) {
            if (err) return next(err);
            return res.status(201).json(thing);
        });

    });
});

module.exports = router;
