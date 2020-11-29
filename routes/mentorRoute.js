const express = require("express");

const router = express.Router();

const mentor = require("../models/mentor");

const student = require("../models/student");

router.get("/", async (req, res) => {
	try {
		const mentors = await mentor.find();
		res.json(mentors);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/allotment", async (req, res) => {
	try {
		let mentorAlloted = [];

		const mentors = await mentor.find();

		for (let a of mentors) {
			//console.log(a.students);
			let studentName = [];
			for (let i = 0; i < a.students.length; i++) {
				if (a.students[i] !== null) {
					const find = await student.findOne({ studentId: a.students[i] });
					if (find !== null) {
						console.log(find.name);
						studentName.push(find.name);
					}
				}
			}

			mentorAlloted.push({
				mentor: a.name,
				subject: a.subject,
				studentNames: studentName,
			});
		}

		res.json(mentorAlloted);
	} catch (err) {
		res.json({ message: err });
	}
});

router.post("/", async (req, res) => {
	console.log(req.body);

	const newMentor = new mentor({
		mentorId: req.body.mentorId,
		name: req.body.name,
		subject: req.body.subject,
		age: req.body.age,
		students: req.body.students,
	});

	try {
		const savedMentor = await newMentor.save();
		res.json(savedMentor);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get("/:mentorId", async (req, res) => {
	try {
		const find = await mentor.findOne({ mentorId: req.params.mentorId });
		res.json(find);
	} catch (err) {
		res.json({ message: err });
	}
});

router.patch("/update", async (req, res) => {
	try {
		// let doc = await mentor.findOneAndUpdate(
		// 	{ mentorId: req.body.mentorId },
		// 	{ $push: { students: req.body.students } },
		// 	{
		// 		new: true,
		// 	}
		let doc = await mentor.findOneAndUpdate(
			{ name: req.body.mentor },
			{ $push: { students: req.body.students } },
			{ new: true }
		);
		res.json(doc);
	} catch (err) {
		res.json({ message: err });
	}
});

module.exports = router;
