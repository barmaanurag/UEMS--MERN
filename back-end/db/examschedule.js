const mongoose = require('mongoose');

const ExamScheduleSchema = new mongoose.Schema({
    exam_id: { type: String, required: true, unique: true }, // Custom exam ID
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    exam_date: { type: Date, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
    exam_venue: { type: String, required: true },
    seating_arrangement: { type: String },
    invigilator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('ExamSchedule', ExamScheduleSchema);
