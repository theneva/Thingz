var db = require('../db');
var Thing = require('./thing');

var User = db.model('User', {
    username: {type: String, required: true},
    password: {type: String, required: true},
    fullName: {type: String},
    things: {type: [Thing.schema]},
    createdAt: {type: Date, default: Date.now}
});

module.exports = User;
