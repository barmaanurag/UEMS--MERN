/*
  # Admin Dashboard Schema

  1. New Tables
    - `students`
      - Basic student information
      - Attendance tracking
      - Payment status
    - `exam_registrations`
      - Registration records
      - Payment status
      - Retest information
    - `exams`
      - Exam schedule
      - Hall assignments
      - Faculty assignments
    - `exam_results`
      - Student results
      - Moderation status
    - `error_logs`
      - User reported issues
      - Priority tracking
    - `notifications`
      - System notifications
      - User notifications

  2. Security
    - Enable RLS on all tables
    - Policies for admin access
*/

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  roll_number TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  semester INTEGER NOT NULL,
  attendance_percentage DECIMAL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Exam Registrations table
CREATE TABLE IF NOT EXISTS exam_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  semester INTEGER NOT NULL,
  is_retest BOOLEAN DEFAULT false,
  payment_status TEXT DEFAULT 'pending',
  payment_amount DECIMAL NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  exam_date TIMESTAMPTZ NOT NULL,
  hall_number TEXT NOT NULL,
  faculty_assigned TEXT NOT NULL,
  invigilator TEXT NOT NULL,
  semester INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Exam Results table
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  exam_id uuid REFERENCES exams(id),
  marks INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  is_moderated BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Error Logs table
CREATE TABLE IF NOT EXISTS error_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type TEXT NOT NULL,
  user_id uuid NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'low',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id uuid,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admin full access on students"
  ON students FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Admin full access on exam_registrations"
  ON exam_registrations FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Admin full access on exams"
  ON exams FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Admin full access on exam_results"
  ON exam_results FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Admin full access on error_logs"
  ON error_logs FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Admin full access on notifications"
  ON notifications FOR ALL TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO students (roll_number, name, semester, attendance_percentage)
VALUES 
  ('2024001', 'John Doe', 6, 85),
  ('2024002', 'Jane Smith', 6, 78),
  ('2024003', 'Bob Wilson', 4, 92);

INSERT INTO exam_registrations (student_id, semester, payment_status, payment_amount)
SELECT id, semester, 'paid', 1000
FROM students
WHERE attendance_percentage > 75;

INSERT INTO exams (subject_code, subject_name, exam_date, hall_number, faculty_assigned, invigilator, semester)
VALUES 
  ('CS301', 'Database Systems', now() + interval '7 days', 'H101', 'Dr. Smith', 'Prof. Johnson', 6),
  ('CS302', 'Computer Networks', now() + interval '9 days', 'H102', 'Dr. Brown', 'Prof. Davis', 6);