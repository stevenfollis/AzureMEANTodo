//Our server application (nodeJS)

	//Set Up the server==============
	var express = require('express'),
	app 		= express(),
	mongoose 	= require('mongoose'),
	port 		= process.env.PORT || 8080,
	database	= require('./config/database');

	//Express Configuration =================

	mongoose.connect(database.url);

	app.configure(function() {
		app.use(express.static(__dirname + '/public'));
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		app.use(express.methodOverride()); //simulate DELETE and PUT
	});

	require('./app/routes.js')(app);
	
	//Start the server and listen for requests
	app.listen(port);
	console.log("App Listening on Port: " + port);