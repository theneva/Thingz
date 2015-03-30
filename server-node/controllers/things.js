var router = require('express').Router();
var jwt = require('jwt-simple');

var db = require('../models/user');
var jwtSecret = require('../secrets').jwt;

router.get('/', function(req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        return res.status(401).send('No token supplied');
    }

    var tokenUser = jwt.decode(token, jwtSecret);
    
    db.findById(tokenUser._id, function(err, user) {
        if (err) return next(err);
        return res.json(user.things);
    });
});

module.exports = router;
