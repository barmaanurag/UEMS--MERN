import React from 'react';
import { FileDown, CheckCircle, AlertCircle } from 'lucide-react';

function Grades() {
  const semesters = [
    {
      id: 1,
      name: 'Fall 2023',
      status: 'final',
      subjects: [
        { name: 'Database Management', grade: 'A', credits: 4 },
        { name: 'Software Engineering', grade: 'A-', credits: 4 },
        { name: 'Computer Networks', grade: 'B+', credits: 3 },
      ],
      gpa: 3.8
    },
    {
      id: 2,
      name: 'Spring 2024',
      status: 'moderated',
      subjects: [
        { name: 'Operating Systems', grade: 'B+', credits: 4 },
        { name: 'Web Development', grade: 'A', credits: 3 },
        { name: 'Data Structures', grade: 'A-', credits: 4 },
      ],
      gpa: 3.7
    }
  ];

  return (
    <div className="space-y-6">
      {semesters.map((semester) => (
        <div key={semester.id} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold text-gray-800">{semester.name}</h3>
              {semester.status === 'final' ? (
                <span className="flex items-center text-sm text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Final
                </span>
              ) : (
                <span className="flex items-center text-sm text-orange-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Moderated
                </span>
              )}
            </div>
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              <FileDown className="h-5 w-5" />
              <span>Download Result</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {semester.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subject.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subject.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="bg-gray-50 px-4 py-2 rounded">
              <span className="text-sm font-medium text-gray-600">Semester GPA: </span>
              <span className="text-sm font-semibold text-gray-900">{semester.gpa}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Grades;