const CourseSchema = {
    course_id: ObjectId, // course_id
    course_name: String,
    course_code: String,
    faculty_id: ObjectId, // Reference to Users (faculty)
  };
  