// main app component for bb
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const Bulletin = require("./util/bulletin");


// Setup the public assets to live in the assets folder
app.use(express.static("assets"));
// Set the default view engine to EJS, which means
// we don't have to specify ".ejs" in render paths
app.set("view engine", "ejs");
// Configure your app to correctly interpret POST
// request bodies. The urlencoded one handles HTML
// <form> POSTs. The json one handles jQuery POSTs.
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


function renderMessages(res, body) {
	Bulletin.getAll()
		.then(function(title) {
			res.render("main", {
				title: title,
				body: body,
			});
		});
}


app.get("/", function(req, res) {
	renderMessages(res);
});

app.get("/add", function(req, res) {
	res.render("add", {
		title: req.body.title,
		body: req.body.body,
	});
});


app.post("/", function(req, res) {
	if (req.body.title === "") {
		res.redirect("/error?msg=please%20enter%20title&tt=&bd=");
		return;
	}
	else if (req.body.body === "") {
		res.redirect("/error?msg=please%20enter%20body&bd=&tt=");
		return;
	}
	Bulletin.add([req.body.title, req.body.body])
		.then(function() {
			renderMessages(res, "Saved " + req.body.title);
		})
		.catch(function(err) {
			console.error(err);
		});
});


app.get("/error", function(req, res) {
	res.render("error");
});


const port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Listening at http://localhost:" + port);
});
