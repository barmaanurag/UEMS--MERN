const mongoose = require('mongoose');

const AdmitCardSchema = new mongoose.Schema({
    admit_card_id: { type: String, required: true, unique: true }, // Add admit_card_id field
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    exam_id: { type: mongoose.Schema.Types.ObjectId, ref: 'ExamSchedule', required: true },
    issue_date: { type: Date, default: Date.now },
    verification_status: { type: Boolean, default: false },
});

module.exports = mongoose.model('AdmitCard', AdmitCardSchema);
