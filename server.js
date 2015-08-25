// Setup server
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');

// Setup MongoDB (via Mongoose)
mongoose.connect(database.url);

// Setup Express
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride()); //simulate DELETE and PUT
});

require('./app/routes.js')(app);

// Start the server and listen for requests
app.listen(port);
console.log("App Listening on Port: " + port);