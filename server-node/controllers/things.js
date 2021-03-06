var router = require('express').Router();
var jwt = require('jwt-simple');
var _ = require('lodash');

var User = require('../models/user');
var jwtSecret = require('../secrets').jwt;

var Thing = require('../models/thing');

router.get('/', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findById(tokenUser._id, function (err, user) {
        if (err) return next(err);
        return res.json(user.things);
    });
});

router.get('/:id', function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findById(tokenUser._id, function (err, user) {
        var thing = _.find(user.things, function (thing) {
            return thing._id == req.params.id;
        });

        return res.json(thing);
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

        var thing = new Thing(req.body);
        user.things.unshift(thing);

        user.save(function (err) {
            if (err) return next(err);
            return res.status(201).json(thing);
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

        user.things.pull(req.params.id);
        user.save(function(err) {
            if (err) return next(err);
            return res.status(204).send();
        });
    });
});

module.exports = router;
