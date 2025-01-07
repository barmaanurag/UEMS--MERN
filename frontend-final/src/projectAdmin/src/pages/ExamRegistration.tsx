import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';

interface Student {
  student_id: string;
  username: string;
  password: string;
  email: string;
  course_id: string;
  attendance: number;
  registration_date: Date;
  status: string;
  semester: string;
}

const ExamRegistration = () => {
  const [filters, setFilters] = useState({
    semester: 'all',
    type: 'all',
    payment: 'all',
    registered: 'all',
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  /** Fetch Students Based on Filters */
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/students', {
        params: filters,
      });
      setStudents(response.data.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  /** Register Single Student */
  const registerStudent = async (student_id: string) => {
    if (!student_id) {
      console.error('Invalid student ID');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/students/register/${student_id}`);
      fetchStudents(); // Refresh the list after registration
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  /** Bulk Register Students */
  const bulkRegister = async () => {
    try {
      await axios.post('http://localhost:8000/students/register-bulk', {
        semester: filters.semester,
        type: filters.type,
        payment: filters.payment,
      });
      fetchStudents(); // Refresh the list after bulk registration
    } catch (error) {
      console.error('Error during bulk registration:', error);
    }
  };

  /** Handle Filter Change */
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>, filterKey: string) => {
    setFilters({ ...filters, [filterKey]: e.target.value });
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Exam Registration</h2>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-6">
          {['semester', 'type', 'payment', 'registered'].map((filterKey) => (
            <div key={filterKey} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2 capitalize">
                {filterKey}
              </label>
              <select
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={(filters as any)[filterKey]}
                onChange={(e) => handleFilterChange(e, filterKey)}
              >
                <option value="all">All</option>
                {filterKey === 'semester' && (
                  <>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                  </>
                )}
                {filterKey === 'type' && (
                  <>
                    <option value="regular">Regular</option>
                    <option value="retest">Retest</option>
                  </>
                )}
                {filterKey === 'payment' && (
                  <>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </>
                )}
                {filterKey === 'registered' && (
                  <>
                    <option value="true">Registered</option>
                    <option value="false">Not Registered</option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>

        {/* Bulk Register Button */}
        <button
          onClick={bulkRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-200"
        >
          Register All Filtered Students
        </button>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.student_id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.course_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.attendance}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.semester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(student.registration_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.status !== 'registered' && (
                      <button
                        onClick={() => registerStudent(student.student_id)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                      >
                        Register
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExamRegistration;
