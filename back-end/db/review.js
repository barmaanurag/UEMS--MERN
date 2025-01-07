const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    review_id: { type: String, required: true, unique: true },
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamSchedule', required: true },
    marks_id: { type: String, required: true },  // marks_id as String (not ObjectId)
    review_date: { type: Date, default: Date.now },
    status: { type: String, required: true },
    comments: { type: String },
    resolved_date: { type: Date },
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Review', ReviewSchema);
