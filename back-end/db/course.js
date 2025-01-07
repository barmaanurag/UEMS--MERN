const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    course_id: { type: String, required: true, unique: true },
    course_name: { type: String, required: true },
    course_code: { type: String, required: true },
    faculty_id: { type: String, required: true },
});

module.exports = mongoose.model('Course', CourseSchema);

