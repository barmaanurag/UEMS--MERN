import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  semester: number;
  attendance: number;
  payment: string;
  type: string;
  registered: boolean;
}

const ExamRegistration = () => {
  const [filters, setFilters] = useState({
    semester: 'all',
    type: 'all',
    payment: 'all',
    registered: 'all'
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
  const registerStudent = async (id: string) => {
    try {
      await axios.post(`http://localhost:8000/students/register/${id}`, { registered: true });
      fetchStudents(); // Refresh the list after registration
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  /**  Bulk Register Students */
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
                onChange={(e) =>
                  setFilters({ ...filters, [filterKey]: e.target.value })
                }
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Roll Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Attendance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.rollNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.semester}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.attendance}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.payment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.registered ? 'Yes' : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!student.registered && (
                      <button
                        onClick={() => registerStudent(student.id)}
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
