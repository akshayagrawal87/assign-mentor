const express = require("express");

const router = express.Router();

const mentor = require("../models/mentor");

router.get("/", async (req, res) => {
	try {
		const mentors = await mentor.find();
		res.json(mentors);
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

router.patch("/", async (req, res) => {
	try {
		const post = await mentor.findOneAndUpdate(
			{ mentorId: req.body.mentorId },
			{ $push: { students: req.body.students } },
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
