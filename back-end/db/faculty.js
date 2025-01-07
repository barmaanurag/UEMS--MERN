const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    faculty_id: { type: String, required: true, unique: true }, // Unique faculty identifier
    name: { type: String, required: true }, // Faculty name
    email: { type: String, required: true, unique: true }, // Faculty email (unique)
    department: { type: String, required: true }, // Department of the faculty
    phone: { type: String, required: true }, // Contact number
    designation: { type: String, required: true }, // Job title (e.g., Professor, Lecturer)
    courses: [
        { type: String, ref: 'Course' }, // Reference to courses taught by faculty
    ],
    hire_date: { type: Date, default: Date.now }, // Date of joining
});

module.exports = mongoose.model('Faculty', FacultySchema);
