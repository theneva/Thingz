var mongoose = require('mongoose');

var url = 'mongodb://localhost/thingz';
mongoose.connect(url, function(err) {
    if (err) return console.log(err);
    console.log('Connected to MongoDB!');
});

module.exports = mongoose;
