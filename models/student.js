const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
	studentId: {
		type: Number,
		required: true,
		index: { unique: true },
	},
	name: { type: String, required: true },
	class: Number,
	age: Number,
	mentor: { type: String, default: null },
});

module.exports = mongoose.model("student", studentSchema);
