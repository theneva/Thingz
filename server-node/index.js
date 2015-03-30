var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 1234;

app.use('/', express.static(__dirname + '/../angular/public'));
app.use(bodyParser.json());

app.use('/api', require('./controllers'));

app.listen(port, function () {
    console.log('thingz server listening on port: ' + port);
});
