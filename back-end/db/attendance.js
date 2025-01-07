const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    attendance_id: { type: String, required: true, unique: true }, // Add attendance_id field
    student_id: { type: String, required: true },
    exam_id: { type: String, required: true },
    status: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
