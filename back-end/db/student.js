const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    course_id: { type: String, required: true },
    attendance: { type: Number, default: 0 },
    registration_date: { type: Date, default: Date.now },
    status: { type: String, default: 'active' },
    semester: { type: String, required: true },
    exam_type: { type: String , required: true},
});

module.exports = mongoose.model('Student', StudentSchema);
