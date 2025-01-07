const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
    error_id: { type: String, required: true, unique: true }, // Custom error ID
  
    student_id: { type: String},
    error_type: { type: String, required: true },
    error_description: { type: String },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ErrorLog', ErrorLogSchema);
