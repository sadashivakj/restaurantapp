/*
server.js
- require express, body-parser, path
- reservation array

DONE - index.html
- css - jumbotron
- show waitlist object
- show table link
- view tables link
- make reservation link

tables.html
- css - jumbotron
- two panels - tables & wait list

DONE - reservations.html
- css - jumbotron
- form
- handles reservations, pass to server

DONE - github repo
heroku deployment
*/

// Dependencies
// =============================================================

var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================

var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Reservations Data
// =============================================================

var tables = [];
var waitlist = [];

// Routing
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// View tables route
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Make reservation route
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// View all JSON table objects
app.get("/api/tables", function(req, res) {

	for (var i = 0; i < tables.length; i++) {
		res.json(tables[i]);
	}

});

// View all JSON waitlist objects
app.get("/api/waitlist", function(req,res){

	for (var i = 0; i <waitlist.length; i++) {
		res.json(waitlist[i]);
	}

});

// POST - get the new reservations from the client side



// Start listening
// =============================================================
app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT + ".");
});
