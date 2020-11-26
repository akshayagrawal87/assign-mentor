const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const studentRoute = require("./routes/studentRoute");

const mentorRoute = require("./routes/mentorRoute");

const port = process.env.PORT || 4000;

require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("Connected");
});

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/student", studentRoute);

app.use("/mentor", mentorRoute);

app.get("/", (req, res) => {
	res.send("We are home");
});

app.listen(port);
