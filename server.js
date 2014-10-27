var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var myitems = require('./items');

var mongoose = require('mongoose');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
}));

// gets all items, ie http GET localhost:5000
app.get('/', myitems.retrieveAll);

// gets a single item, ie the second item http GET localhost:5000/id
app.get('/:id', myitems.retrieveOne);

// adds and item, ie http --form POST localhost:5000 item='oranges'
app.post('/', myitems.create);

// updates an item, ie http --form PUT localhost:5000/id item='chocolate'
app.put('/:id', myitems.update);

// deletes an item, ie http DELETE localhost:5000/id
app.delete('/:id', myitems.delete);

var port = process.env.PORT || 5000;
app.listen(port, function () {
	console.log('listening on '+port);
});

var env = process.env.NODE_ENV || 'development'
if(env === 'production'){
 dburi = 'mongodb://artariq:chitral@ds047040.mongolab.com:47040/rushiesmongodb';
} else{
 dburi = 'mongodb://127.0.0.1:27017/mydb';
 console.log('connected to local db');
}

mongoose.connect(dburi);

var db = mongoose.connection;
db.on('error', function callback () {
    console.error('connection error');
});
db.once('open', function callback () {
    console.error('connection success');
});

