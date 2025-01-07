const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    marks_id: { type: String, required: true, unique: true }, // Custom marks ID
    student_id: { type: String, required: true },
    exam_id: { type: String, required: true },
    marks: { type: Number, required: true },
    moderated: { type: Boolean, default: false },
});

module.exports = mongoose.model('Result', ResultSchema);
