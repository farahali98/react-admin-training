const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "admin",
	database: "tinaportfolio",
});

db.connect((err, res) => {
	if (!err) {
		console.log("connected!");
	} else {
		console.log(err);
	}
});

app.get("/admin/Abouts", (req, res) => {
	db.query("SELECT * FROM abouts", (err, result) => {
		if (err) {
			console.log("unexpected error: " + err.message);
			return res.status(500, err.message);
		}
		res.json(result);
	});
});

app.put("/admin/Abouts/edit/:id", (req, res) => {
	const id = req.params.id;
	const data = req.body;
	db.query(
		"UPDATE abouts SET about = ? WHERE id = ?",
		[data, id],
		(err, result) => {
			if (err) {
				console.log(err.message);
			}
			res.json(result);
		}
	);

	// return res.redirect("/admin");
});

app.get("/admin/Abouts/check/:id", (req, res) => {
	const id = req.params.id;
	// console.log(typeof id);
	db.query("SELECT * FROM abouts WHERE id = ?", [id], (err, result) => {
		if (err) {
			console.log("error", err.message);
			return res.status(500, err.message);
		}
		return res.status(200).json(result);
	});
});

app.listen("4000", () => {
	console.log("listening on port : 4000");
});
