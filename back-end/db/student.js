const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true }, // Custom student_id field
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    attendance: { type: Number, default: 0 },
    registration_date: { type: Date, default: Date.now },
    status: { type: String, default: 'active' },
});

module.exports = mongoose.model('Student', StudentSchema);
