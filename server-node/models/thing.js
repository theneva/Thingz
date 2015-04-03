var db = require('../db');

var Thing = db.model('Thing', {
    name: {type: String, required: true},
    location: String,
    description: String,
    imageUrl: String,
    createdAt: {type: Date, default: Date.now}
});

module.exports = Thing;
