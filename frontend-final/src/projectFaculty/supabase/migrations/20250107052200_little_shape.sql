/*
  # Initial Schema Setup for Faculty Portal

  1. New Tables
    - subjects
      - id (uuid, primary key)
      - name (text)
      - professor_id (uuid, foreign key)
      - created_at (timestamp)
    
    - question_papers
      - id (uuid, primary key)
      - subject_id (uuid, foreign key)
      - status (text)
      - file_url (text)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - grades
      - id (uuid, primary key)
      - student_id (uuid)
      - subject_id (uuid, foreign key)
      - marks (integer)
      - created_at (timestamp)
      - updated_at (timestamp)
    
    - review_requests
      - id (uuid, primary key)
      - student_id (uuid)
      - subject_id (uuid, foreign key)
      - current_marks (integer)
      - reason (text)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create subjects table
CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  professor_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create question_papers table
CREATE TABLE question_papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id),
  status text NOT NULL DEFAULT 'draft',
  file_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create grades table
CREATE TABLE grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  subject_id uuid REFERENCES subjects(id),
  marks integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create review_requests table
CREATE TABLE review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  subject_id uuid REFERENCES subjects(id),
  current_marks integer NOT NULL,
  reason text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Professors can access their subjects"
  ON subjects
  FOR ALL
  TO authenticated
  USING (auth.uid() = professor_id);

CREATE POLICY "Professors can access their question papers"
  ON question_papers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = question_papers.subject_id
      AND subjects.professor_id = auth.uid()
    )
  );

CREATE POLICY "Professors can access their grades"
  ON grades
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = grades.subject_id
      AND subjects.professor_id = auth.uid()
    )
  );

CREATE POLICY "Professors can access their review requests"
  ON review_requests
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM subjects
      WHERE subjects.id = review_requests.subject_id
      AND subjects.professor_id = auth.uid()
    )
  );