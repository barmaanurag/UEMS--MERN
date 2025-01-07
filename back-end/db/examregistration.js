const mongoose = require('mongoose');

const ExamRegistrationSchema = new mongoose.Schema({
    registration_id: { type: String, required: true, unique: true }, // Custom registration ID
    student_id: { type: String, required: true },
    exam_id: { type: String, required: true },
    registration_date: { type: Date, default: Date.now },
    payment_status: { type: String, required: true },
});

module.exports = mongoose.model('ExamRegistration', ExamRegistrationSchema);
