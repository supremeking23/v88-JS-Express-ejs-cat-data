// Load the express module and store it in the variable express (Where do you thin this come from)
var express = require("express");

var app = express();

// import data from data.js
var cats_array = require("./data/data");

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// app.use(express.static("static"));

// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// This sets the location where express will look for the ejs views
app.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

app.get("/", function (req, res) {
	res.render("index", { cats: cats_array });
});

app.get("/cat/:id", function (req, res) {
	// res.send(req.params);
	let cat;
	for (let i = 0; i < cats_array.length; i++) {
		if (cats_array[i].id == req.params.id) {
			cat = cats_array[i];
			break;
		}
	}
	res.render("cat_detail", { cat: cat });
});

app.listen(8000, function () {
	console.log("server is listening to 8000");
});
