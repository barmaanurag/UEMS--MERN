const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const connectDB = require('./db/dbConnection');
const jwt = require('jsonwebtoken');
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

// ** User Routes **

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
// User login
// Admin login only
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if (username === 'virat' && password === '90516897') {
            const token = jwt.sign({ role: 'admin', username }, 'yourSecretKey', { expiresIn: '1h' });
            return res.status(200).json({
                success: true,
                message: 'Admin login successful',
                token,
                redirectUrl: 'https://nimble-biscochitos-9bb123.netlify.app/', // Updated URL
            });
        }
        if (username === 'jaisu' && password === '79800255') {
            const token = jwt.sign({ role: 'admin', username }, 'yourSecretKey', { expiresIn: '1h' });
            return res.status(200).json({
                success: true,
                message: 'Admin login successful',
                token,
                redirectUrl: 'https://nimble-biscochitos-9bb123.netlify.app/', // Updated URL
            });
        }

        return res.status(401).json({ success: false, error: 'Invalid username or password' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ success: false, error: 'Login failed', details: error.message });
    }
});



// ** Student Routes **

// Add a Student
app.post('/add-student', async (req, res) => {
    const { username, password, ...otherData } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Username and password are required' });
    }

    try {
        const existingStudent = await Student.findOne({ username });
        if (existingStudent) {
            return res.status(400).json({ success: false, error: 'Student username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const student = new Student({ username, password: hashedPassword, ...otherData });
        await student.save();

        res.status(201).json({ success: true, message: 'Student added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add student', details: error.message });
    }
});

app.post('/student-login', async (req, res) => {
    const { username, password } = req.body;

    // Check if both username and password are provided
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    try {
        // Hardcode the username and password for this scenario
        if (username === 'johndoe' && password === 'password123') {
            return res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during student login:', error.message);
        res.status(500).json({ success: false, message: 'Login failed', details: error.message });
    }
});

// Login endpoint
// Backend Route
app.post('/faculty-login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded username and password
    if (username === 'mark johnson' && password === 'mark7524') {
        return res.status(200).json({
            success: true,
            message: 'Login successful!',
            redirectUrl: 'https://gilded-pastelito-b67253.netlify.app/'
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password.',
        });
    }
});


// ** Faculty Routes **
app.post('/add-faculty', async (req, res) => {
    try {
        const faculty = new Faculty(req.body);
        await faculty.save();
        res.status(201).json({ success: true, message: 'Faculty added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add faculty', details: error.message });
    }
});

// ** Course Routes **
app.post('/add-course', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json({ success: true, message: 'Course added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add course', details: error.message });
    }
});

// ** Exam Registration **
app.post('/add-exam-registration', async (req, res) => {
    try {
        const examRegistration = new ExamRegistration(req.body);
        await examRegistration.save();
        res.status(201).json({ success: true, message: 'Exam registration added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add exam registration', details: error.message });
    }
});

// ** Review **
app.post('/add-review', async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json({ success: true, message: 'Review added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add review', details: error.message });
    }
});

// ** Result **
app.post('/add-result', async (req, res) => {
    try {
        const result = new Result(req.body);
        await result.save();
        res.status(201).json({ success: true, message: 'Result added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add result', details: error.message });
    }
});

// ** Question Paper **
app.post('/add-question', async (req, res) => {
    try {
        const questionPaper = new QuestionPaper(req.body);
        await questionPaper.save();
        res.status(201).json({ success: true, message: 'Question paper added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add question paper', details: error.message });
    }
});

// ** Exam Schedule **
app.post('/add-examschedule', async (req, res) => {
    try {
        const examSchedule = new ExamSchedule(req.body);
        await examSchedule.save();
        res.status(201).json({ success: true, message: 'Exam schedule added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add exam schedule', details: error.message });
    }
});

// ** Attendance **
app.post('/add-attendance', async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json({ success: true, message: 'Attendance added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add attendance', details: error.message });
    }
});

// ** Admit Card **
app.post('/add-admitcard', async (req, res) => {
    try {
        const admitCard = new AdmitCard(req.body);
        await admitCard.save();
        res.status(201).json({ success: true, message: 'Admit card added successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to add admit card', details: error.message });
    }
});

// ** Error Logging **
app.post('/log-error', async (req, res) => {
    try {
        const errorLog = new ErrorLog(req.body);
        await errorLog.save();
        res.status(201).json({ success: true, message: 'Error logged successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to log error', details: error.message });
    }
});
/** 
 * API: Fetch Students with Filters 
 * Filters: semester, type, payment, registered
 */
app.get('/students', async (req, res) => {
    try {
        const { semester, type, payment, registered } = req.query;

        // Build filters dynamically based on query parameters
        let filters = {};
        if (semester && semester !== 'all') filters.semester = semester;
        if (type && type !== 'all') filters.type = type;
        if (payment && payment !== 'all') filters.payment = payment;
        if (registered && registered !== 'all') filters.registered = registered === 'true';

        // Fetch students based on filters
        const students = await Student.find(filters, {
            student_id: 1,
            username: 1,
            email: 1,
            course_id: 1,
            semester: 1,
            attendance: 1,
            payment: 1,
            type: 1,
            registered: 1,
            registration_date: 1,
            status: 1,
        });

        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch students',
            details: error.message,
        });
    }
});



/**
 * API: Update Single Student Registration Status
 */
app.post('/students/register/student_id', async (req, res) => {
    try {
        const { id } = req.params;
        const { registered } = req.body;

        if (registered === undefined) {
            return res.status(400).json({ success: false, error: 'Registration status is required' });
        }

        // Prepare update data
        const updateData = {
            registered,
        };

        // If registering the student, set the registration date
        if (registered) {
            updateData.registration_date = new Date();
        }

        // Update the student's record
        const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
            new: true, // Return the updated document
        });

        if (!updatedStudent) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Student registration status updated successfully',
            data: updatedStudent, // Return updated student data
        });
    } catch (error) {
        console.error('Error updating student registration:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to update student registration',
            details: error.message,
        });
    }
});

/**
 * API: Bulk Register Students Based on Filters
 */
app.post('/students/register-bulk', async (req, res) => {
    try {
        const { semester, type, payment } = req.body;

        let filters = {};
        if (semester && semester !== 'all') filters.semester = semester;
        if (type && type !== 'all') filters.type = type;
        if (payment && payment !== 'all') filters.payment = payment;

        // Update matched students and set the registration date
        const updatedStudents = await Student.updateMany(filters, {
            registered: true,
            registration_date: new Date(), // Set registration date for matched students
        });

        // Fetch all updated students for response
        const students = await Student.find(filters);

        res.status(200).json({
            success: true,
            message: 'Bulk registration completed successfully',
            data: students, // Return list of updated students
        });
    } catch (error) {
        console.error('Error during bulk registration:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to register students in bulk',
            details: error.message,
        });
    }
});
// *Admit Card Routes*

/// Fetch Admit Cards with Student Data
app.get('/api/admit-cards', async (req, res) => {
    try {
        const admitCards = await AdmitCard.aggregate([
            {
                $lookup: {
                    from: 'students', // Reference to the students collection
                    localField: 'student_id', // Field in AdmitCard
                    foreignField: 'student_id', // Field in Student
                    as: 'studentDetails', // Merged data alias
                },
            },
            {
                $unwind: '$studentDetails', // Flatten the student details array
            },
        ]);

        res.status(200).json({ success: true, data: admitCards });
    } catch (error) {
        console.error('Error fetching admit cards:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});


// ** Connect to Database **
connectDB();

// ** Start the Server **
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
