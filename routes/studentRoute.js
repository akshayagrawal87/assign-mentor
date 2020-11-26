const express = require("express");

const router = express.Router();

const student = require("../models/student");

router.get("/", async (req, res) => {
	try {
		const students = await student.find();
		res.json(students);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	console.log(req.body);

	const newStudent = new student({
		studentId: req.body.studentId,
		name: req.body.name,
		class: req.body.class,
		age: req.body.age,
		mentor: req.body.mentor,
	});

	try {
		const savedStudent = await newStudent.save();
		res.json(savedStudent);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/:studentId", async (req, res) => {
	try {
		const find = await student.findOne({ studentId: req.params.studentId });
		res.json(find);
	} catch (err) {
		res.json({ message: err });
	}
});

router.patch("/", async (req, res) => {
	try {
		const post = await student.findOneAndUpdate(
			{ stduentId: req.body.stduentId },
			{ mentor: req.body.mentor },
			null,
			function (err, docs) {
				if (err) {
					console.log(err);
				} else {
					console.log("Original Doc : ", docs);
				}
			}
		);

		res.json(post);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
