const express = require("express");
const compression = require("compression");
const http = require("http");
const app = express();
const port = 8080;
const sass = require('node-sass');

app.use(compression());

app.get("/healthcheck", (req, res) => {
	res.status(200).send();
});

app.get("/style.css", (req, res) => {
	let styleString = "$breakPoints: (0, 1280, 1600);$breakPointNames: ('', 'md', 'lg');$containerWidths: (600, 900, 1200);@import '../lib/_flex.scss';#parent {";
	if (req.query.extend) {
		styleString += "@extend " + decodeURIComponent(req.query.extend) + ";";
	}
	styleString += "}"
	sass.render({
		data: styleString,
		outputStyle: 'compressed',
		includePaths: ['../lib/_flex.scss']
	}, function (err, result) {
		if (err) {
			res.status(400).end(err);
		}
		if (result) {
			res.status(200).end(result.css);
		}
		res.status(400).end();
	});
});
app.get("/demo.css", (req, res) => {
	res.sendFile("./demo.css", { root: __dirname });
});
app.get("/demo.js", (req, res) => {
	res.sendFile("./demo.js", { root: __dirname });
});
app.get("/*", (req, res) => {
	res.sendFile("./index.html", { root: __dirname });
});

let server = http.createServer(app).listen(port, () => {
	console.log(
		"App running on port " +
		port
	);
});
server.on("error", err => {
	console.log(err);
});

