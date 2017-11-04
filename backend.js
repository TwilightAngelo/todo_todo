global.__base = __dirname + '/';
global.config = require(__base + '/config.js');

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

app.use(cors());

mongoose.connect(config.mongoConnectionString);
mongoose.connection.on('error', () => {
	console.log('DB connectoin error');
});
mongoose.connection.once('open', (callback) => {
	console.log('DB connection estabilished');
});

app.use(bodyParser.json());
app.use('/', require(__base + 'routes/groups.js'));
app.use('/tasks', require(__base + 'routes/tasks.js'));

app.listen(config.port, function() {
	console.log('Im online');
})