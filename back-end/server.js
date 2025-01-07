const express = require('express');
const router = express.Router();
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

/** 
 * API: Fetch Students with Filters 
 * Filters: semester, type, payment, registered
 */
app.get('/students', async (req, res) => {
    try {
        const { semester, type, payment, registered } = req.query;

        let filters = {};
        if (semester && semester !== 'all') filters.semester = semester;
        if (type && type !== 'all') filters.type = type;
        if (payment && payment !== 'all') filters.payment = payment;
        if (registered && registered !== 'all') filters.registered = registered === 'true';

        const students = await Student.find(filters);
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error('Error fetching students:', error.message);
        res.status(500).json({ success: false, error: 'Failed to fetch students', details: error.message });
    }
});

/**
 * API: Update Single Student Registration Status
 */
app.post('/students/register/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { registered } = req.body;

        if (registered === undefined) {
            return res.status(400).json({ success: false, error: 'Registration status is required' });
        }

        // If registration is successful, set the registration date
        const updateData = {
            registered,
        };

        // If student is registered, update the registration date
        if (registered) {
            updateData.registration_date = new Date();
        }

        await Student.findByIdAndUpdate(id, updateData);

        res.status(200).json({ success: true, message: 'Student registration status updated successfully' });
    } catch (error) {
        console.error('Error updating student registration:', error.message);
        res.status(500).json({ success: false, error: 'Failed to update student registration', details: error.message });
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

        // Update the students and set the registration date
        await Student.updateMany(filters, {
            registered: true,
            registration_date: new Date(),  // Set registration date for all matched students
        });

        res.status(200).json({ success: true, message: 'Bulk registration completed successfully' });
    } catch (error) {
        console.error('Error during bulk registration:', error.message);
        res.status(500).json({ success: false, error: 'Failed to register students in bulk', details: error.message });
    }
});

// **Admit Card Routes**

// Fetch Admit Cards with Student Data
app.get('/api/admit-cards', async (req, res) => {
    try {
      const admitCards = await AdmitCard.aggregate([
        {
          $lookup: {
            from: 'students', // The collection name for students
            localField: 'student_id',
            foreignField: 'student_id',
            as: 'studentDetails',
          },
        },
      ]);
  
      res.status(200).json({ success: true, data: admitCards });
    } catch (error) {
      console.error('Error fetching admit cards:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  // Create a New Admit Card
  app.post('/api/admit-cards', async (req, res) => {
      const { student_id, exam_id } = req.body;
    
      try {
          // Check if the student exists
          const student = await Student.findOne({ student_id });
          if (!student) {
              return res.status(404).json({ success: false, message: 'Student not found' });
          }
    
          // Generate a unique admit card ID
          const admit_card_id = `AC-${student_id}-${Date.now()}`;
    
          // Create a new Admit Card
          const newAdmitCard = new AdmitCard({
              admit_card_id,
              student_id,
              exam_id,
              verification_status: false,
          });
    
          await newAdmitCard.save();
          res.status(201).json({ success: true, data: newAdmitCard });
      } catch (error) {
          console.error('Error creating admit card:', error);
          res.status(500).json({ success: false, message: 'Server Error' });
      }
  });

// **Connect to Database**
connectDB();

// **Start the Server**
app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`);
});
