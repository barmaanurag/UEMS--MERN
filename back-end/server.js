const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const connectDB = require('./db/dbConnection');

// Import all schemas
const User = require('./db/user');
const Student = require('./db/student');
const Faculty = require('./db/faculty');
const Course = require('./db/course');
const Attendance = require('./db/attendance');
const AdmitCard = require('./db/admitCard');
const ExamSchedule = require('./db/examSchedule');
const ExamRegistration = require('./db/examRegistration');
const ErrorLog = require('./db/errorLog');
const QuestionPaper = require('./db/question');
const Result = require('./db/result');
const Review = require('./db/review');

// Initialize express app
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// **Routes**

// User Registration
app.post('/register', async (req, res) => {
    const { username, password, name, email, university } = req.body;

    if (!username || !password || !name || !email || !university) {
        return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Username already exists. Please choose a different username.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, name, email, university });
        await user.save();

        res.status(201).json({ success: true, message: 'Registration Successful' });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ success: false, error: 'Unable to Register', details: err.message });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, error: 'Login failed', details: error.message });
    }
});

// Add a Student
app.post('/add-student', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ success: true, message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add student', details: error.message });
    }
});

// Add a Faculty
app.post('/add-faculty', async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        await faculty.save();
        res.status(201).json({ success: true, message: 'Faculty added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add faculty', details: error.message });
    }
});

// Add a Course
app.post('/add-course', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ success: true, message: 'Course added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add course', details: error.message });
    }
});

// Add Exam Registration
app.post('/add-exam-registration', async (req, res) => {
    try {
        const examRegistration = new ExamRegistration(req.body);
        await examRegistration.save();
        res.status(201).json({ success: true, message: 'Exam registration added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add exam registration', details: error.message });
    }
});

// Add Review
app.post('/add-review', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add review', details: error.message });
    }
});

// Add Result
app.post('/add-result', async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();
        res.status(201).json({ success: true, message: 'Result added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add result', details: error.message });
    }
});

// Add Question Paper
app.post('/add-question', async (req, res) => {
    try {
        const questionPaper = new QuestionPaper(req.body);
        await questionPaper.save();
        res.status(201).json({ success: true, message: 'Question paper added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add question paper', details: error.message });
    }
});

// Add Exam Schedule
app.post('/add-examschedule', async (req, res) => {
    try {
        const examSchedule = new ExamSchedule(req.body);
        await examSchedule.save();
        res.status(201).json({ success: true, message: 'Exam schedule added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add exam schedule', details: error.message });
    }
});

// Add Attendance
app.post('/add-attendance', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json({ success: true, message: 'Attendance added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add attendance', details: error.message });
    }
});

// Add Admit Card
app.post('/add-admitcard', async (req, res) => {
    try {
        const admitCard = new AdmitCard(req.body);
        await admitCard.save();
        res.status(201).json({ success: true, message: 'Admit card added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add admit card', details: error.message });
    }
});

// Log an Error
app.post('/log-error', async (req, res) => {
    try {
        const errorLog = new ErrorLog(req.body);
        await errorLog.save();
        res.status(201).json({ success: true, message: 'Error logged successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to log error', details: error.message });
    }
});

// **Connect to Database**
connectDB();

// **Start the Server**
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
