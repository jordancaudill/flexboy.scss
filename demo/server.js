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
	let styleString = "$flexboy: (md: 1280px, lg: 1600px); $flexboyContainers: (default: 600px, md: 900px, lg: 1200px);@import '../flexboy.scss';#parent {";
	if (req.query.extend.length > 0) {
		styleString += "@extend " + decodeURIComponent(req.query.extend) + ";";
	}
	styleString += "};"
	sass.render({
		data: styleString,
		outputStyle: 'compressed',
		includePaths: ['../flexboy.scss']
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		if (result) {
			res.status(200).end(result.css);
		}
		res.status(400).send();
	});
});
app.use("/js", express.static(__dirname + "/dist/js"));
app.use("/css", express.static(__dirname + "/dist/css"));
app.get("/*", (req, res) => {
	res.sendFile("./dist/index.html", { root: __dirname });
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

