var db = require('../db');

var Location = db.model('Location', {
    name: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = Location;
