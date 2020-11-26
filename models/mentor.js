const mongoose = require("mongoose");

const student = require("./student");

const mentorSchema = mongoose.Schema({
	mentorId: {
		type: Number,
		required: true,
	},
	name: { type: String, required: true },
	subject: String,
	age: Number,
	students: { type: [Number], default: null },
});

module.exports = mongoose.model("mentor", mentorSchema);
