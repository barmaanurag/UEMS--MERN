const mongoose = require('mongoose');

const QuestionPaperSchema = new mongoose.Schema({
    paper_id: { type: String, required: true, unique: true }, // Custom paper ID
    exam_id: { type: String, required: true },
    faculty_id: { type: String, required: true },
    status: { type: String, required: true },
    version: { type: String },
});

module.exports = mongoose.model('QuestionPaper', QuestionPaperSchema);
