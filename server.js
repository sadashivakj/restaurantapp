// Dependencies
// =============================================================

var express = require("express");
var bodyParser = require("body-parser");
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

	res.json(tables);

});

// View all JSON waitlist objects
app.get("/api/waitlist", function(req,res){

	res.json(waitlist);

});

//clear both array objects and send the empty arrays back to html page when "Clear Table" link is clicked
app.get("/clearTables", function(req,res){
	tables = [];
	waitlist = [];
	res.json(tables);
	res.json(waitlist);
});

// POST - get the new reservations from the client side
app.post("/api/new", function(req,res){

	var newReserve = req.body;

  	// newReserve.routeName = newReserve.customerId.replace(/\s+/g, "").toLowerCase();

  	console.log(newReserve);

  	if (tables.length > 5) {

  		waitlist.push(newReserve);
      res.json(waitlist);
  	}
  	else {

  		tables.push(newReserve);
      res.json(tables);
  	}

  	// res.json(tables);
   //  res.json(waitlist);

});



// Start listening
// =============================================================
app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT + ".");
});
