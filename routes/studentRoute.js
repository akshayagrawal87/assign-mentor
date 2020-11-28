const express = require("express");

const router = express.Router();

const student = require("../models/student");

const mentor = require("../models/mentor");

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

router.patch("/update", async (req, res) => {
	try {
		const find = await student.findOne({ studentId: req.body.studentId });

		let mentorChange = await mentor.findOneAndUpdate(
			{ name: find.mentor },
			{ $pull: { students: req.body.studentId } },
			{
				new: true,
			}
		);

		let studentDoc = await student.findOneAndUpdate(
			{ studentId: req.body.studentId },
			{ mentor: req.body.mentor },
			{
				new: true,
			}
		);

		let mentorDoc = await mentor.findOneAndUpdate(
			{ name: req.body.mentor },
			{ $push: { students: req.body.studentId } },
			{
				new: true,
			}
		);

		res.json({ studentDoc, mentorDoc, mentorChange });
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
